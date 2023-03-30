const jwt = require("jsonwebtoken");
const db = require("../database/models");
const Rol = db.Rol;
const { Op } = require("sequelize");
const Usuario = db.Usuario;
const EliminarUsuario = db.UsuarioEliminado;
const bcryptjs = require("bcryptjs");

const getAllUsers = async (req, res) => {
  const { rol } = req.usuario;
  try {
    let usuarios = await Usuario.findAll({
      include: [{ association: "rol_usuario" }],
    });

    if (rol !== 1) {
      //esto es para que solo el admin pueda ver otros usuarios admin
      let UsuariosDisponibles = [];
      for (let usuario of usuarios) {
        if (usuario.roles_id !== 1) {
          UsuariosDisponibles.push(usuario);
        }
      }
      usuarios = UsuariosDisponibles;
    }
    return res.status(200).json({ usuarios });
  } catch (error) {
    return res.status(400).json({ error });
  }
};

const register = async (req, res) => {
  try {
    const { nombre, apellido, usuario, password, rol } = req.body;
    if (!nombre || !apellido || !usuario || !password || !rol) {
      return res.status(400).json({ mensaje: "faltan datos" });
    }

    const encontrado = await Usuario.findOne({
      where: { usuario: usuario },
    });
    if (encontrado !== null) {
      return res.status(400).json({ mensaje: "el usuario ya existe" });
    }

    await Usuario.create({
      nombre,
      apellido,
      usuario,
      password: bcryptjs.hashSync(password, 10),
      roles_id: rol,
      estado_password: 0,
    });
    return res.status(200).json({ mensaje: "usuario creado exitosamente" });
  } catch (error) {
    return res.status(400).json({ error });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { id, motivo } = req.body;

    if (!id || !motivo) {
      return res.status(400).json({ mensaje: "faltan datos" });
    }

    const usuarioEncontrado = await Usuario.findOne({ where: { id } });

    if (usuarioEncontrado === null) {
      return res
        .status(400)
        .json({ mensaje: "no se encontro usuario con esa id" });
    }

    if (req.usuario.rol === 2 && usuarioEncontrado.roles_id === 1) {
      return res
        .status(400)
        .json({ mensaje: "no tienes permisos para resetear la contraseña de ese usuario" });
    }

    //TODO: guardar el motivo del reseteo en algún lado.

    await Usuario.update(
      {
        password: bcryptjs.hashSync("1234", 10),
        estado_password: 0,
      },
      {
        where: { id },
      }
    );
    return res.status(200).json({ mensaje: "clave reseteada exitosamente" });
  } catch (error) {
    return res.status(400).json({ error });
  }
};

const changePassword = async (req, res) => {
  try {
    //el token llega acá validado, hay que sacar el id del req.usuario
    const { id } = req.usuario;

    const { password, nuevaClave } = req.body;
    if (!password || !nuevaClave) {
      return res.status(400).json({ mensaje: "faltan datos" });
    }

    const project = await Usuario.findOne({ where: { id } });

    if (project === null) {
      return res
        .status(400)
        .json({ mensaje: "no se encontro usuario con esa id" });
    }
    let isOkPassword = bcryptjs.compareSync(password, project.password);

    if (isOkPassword == false) {
      return res.status(400).json({ mensaje: "la contraseña es invalida" });
    }

    await Usuario.update(
      {
        password: bcryptjs.hashSync(nuevaClave, 10),
        estado_password: 1,
      },
      {
        where: { id },
      }
    );
    return res.status(200).json({ mensaje: "clave cambiada exitosamente" });
  } catch (error) {
    return res.status(400).json({ mensaje: error });
  }
};

const deleteUser = async (req, res) => {
  //tenemos que poner el middleware para que solo puedan eliminar si tienen permiso.
  try {
    const usuarioAEliminar = parseInt(req.params.id);

    const usuario = await Usuario.findOne({
      where: {
        id: usuarioAEliminar,
      },
    });

    if (usuario != null) {
      const eliminado = await Usuario.destroy({
        where: {
          id: usuarioAEliminar,
        },
        force: true,
      });

      if (eliminado != null) {
        await EliminarUsuario.create({
          nombre: usuario.nombre,
          apellido: usuario.apellido,
          motivo: req.body.motivo,
          usuario_eliminado: usuario.usuario,
        });
        return res
          .status(200)
          .json({ mensaje: "usuario eliminado correctamente" });
      }
    } else {
      return res.status(400).json({ mensaje: "no existe el usuario" });
    }
  } catch (error) {
    return res.status(400).json({ mensaje: error });
  }
};

const getDataInfoToCreateNewUser = async (req, res) => {
  try {
    const roles = await Rol.findAll({
      where: {
        borrado: {
          [Op.eq]: "0",
        }
      },
  });
    let rolesDisponibles = [];
    for (let rol of roles) {
      if (rol.id !== 1) {
        rolesDisponibles.push(rol);
      }
    }
    return res.status(200).json({ rolesDisponibles });
  } catch (error) {
    return res.status(400).json({ mensaje: "error al obtener info de roles" });
  }
};

const getDataUserInfoToModify = async (req, res) => {
  try {
    const usuario = await Usuario.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (usuario !== null) {
      const usuarioAEnviar = {
        id: usuario.id,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        usuario: usuario.usuario,
        rol: usuario.roles_id
      };
      const roles = await Rol.findAll();
      let rolesDisponibles = [];
      for (let rol of roles) {
        if (rol.id !== 1) {
          rolesDisponibles.push(rol);
        }
      }
      respuesta = { usuarioAEnviar, rolesDisponibles };
      return res.status(200).json({ ...respuesta });
    } else {
      return res.status(400).json({ mensaje: "usuario no existe" });
    }
  } catch (error) {
    return res.status(400).json({
      mensaje: "error a la hora de obtener data para modificar usuario",
    });
  }
};

const modifyUser = async (req, res) => {
  const { id, rol: rol_auth } = req.usuario;
  const usuarioAModificar = parseInt(req.params.id);

  const { nombre, apellido, usuario, rol } = req.body;

  const dataACambiar = {};

  try {
    let encontrado = await Usuario.findOne({
      where: {
        id: usuarioAModificar,
      },
    });

    if (encontrado != null) {
      //casos que no son contemplados :toda la data es repetida con lo que ya esta en la base de datos

      // solo se controla que el usuario sea rrhh porque el auth de roles solo permite que lleguen admins y rrhh
      if (rol_auth === 2 && id !== encontrado.id) {
        if (encontrado.roles_id === 1 || encontrado.roles_id === 2) {
          return res
            .status(400)
            .json({ mensaje: "no tienes permiso para modificar este usuario" });
        }
      }

      if (nombre != null) dataACambiar.nombre = nombre;
      if (apellido != null) dataACambiar.apellido = apellido;
      if (usuario != null) dataACambiar.usuario = usuario;
      if (rol != null) dataACambiar.roles_id = rol;

      if (Object.keys(dataACambiar).length === 0) {
        return res
          .status(400)
          .json({ mensaje: "falta proporcionar datos a modificar" });
      }
      await Usuario.update(dataACambiar, {
        where: {
          id: usuarioAModificar,
        },
      });
      return res
        .status(200)
        .json({ mensaje: "usuario modificado correctamente" });
    } else {
      return res
        .status(400)
        .json({ mensaje: "no existe el usuario a modificar" });
    }
  } catch (error) {
    return res
      .status(400)
      .json({ mensaje: "error a la hora de modificar usuario" });
  }
};

module.exports = {
  register,
  changePassword,
  modifyUser,
  deleteUser,
  getDataUserInfoToModify,
  getDataInfoToCreateNewUser,
  getAllUsers,
  resetPassword,
};
