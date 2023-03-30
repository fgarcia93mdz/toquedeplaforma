const fs = require('fs');
const path = require('path');
const {
  Op
} = require("sequelize");
const {
  Sequelize
} = require('sequelize');
// Validaciones
const {
  validationResult
} = require('express-validator');

// encriptacion de la contraseña
const bcryptjs = require('bcryptjs');

// Llamado a la base de datos 
const db = require('../database/models')
//Fecha actual 
const date = require('../../public/js/fechaActualMenosUnDia')
// Hora actual
const horaActual = require('../../public/js/horaActual')
// Modelo de DB
const Usuario = db.Usuario;
const Rol = db.Rol;
const Empresa = db.Empresa;
const Servicio = db.Servicio;
const Plataforma = db.Plataforma;
const Estado = db.Estado;
const RegistroTorre = db.RegistroAdministrativo
const EliminarUsuario = db.UsuarioEliminado
const UsuarioLog = db.UsuarioLog


// Login
const ControllerInicioUsuario = {
  inicio: (req, res, next) => {
    res.render("index", {});
  },
  // Se inicia el procesos de login (ingreso) donde se busca al usuario en la base de datos, se hace una comparacion de contrasena encriptada y segun el resultado se redirecciona o se devuelve valores con el error
  //VIEJO
  login: (req, res, next) => {
    user = req.body.email
    UsuarioLog.create({
        usuario_log: user,
        tipo_de_estado: 'Ingreso',
    }).then(() => {
    Usuario.findOne({
      where: {
        usuario: req.body.email,
      },
    }).then((userToLogin) => {
      if (userToLogin) {
        let isOkPassword = bcryptjs.compareSync(
          req.body.password,
          userToLogin.password
        );

        if (isOkPassword) {
          delete userToLogin.password;
          req.session.userLogged = userToLogin;

          if (req.body.recordarPlayer) {
            res.cookie("userEmail", req.body.email, {
              maxAge: 1000 * 60 * 60,
            });
          }
        
            return res.redirect("/ingreso");
          

        }

        return res.render("index", {
          errors: {
            password: {
              msg: "Error en tu contraseña",
            },
          },
        });
      }

      return res.render("index", {
        errors: {
          email: {
            msg: "No se encuentra registrado este usuario",
          },
        },
      });
    });
    })
  },
  //VIEJO
  logout: (req, res) => {
    const userLogged = req.session.userLogged;
    UsuarioLog.create({
      usuario_log: userLogged.usuario,
      tipo_de_estado: 'Egreso',
    }).then(() => {
      res.clearCookie("userEmail");
      req.session.destroy();
      return res.redirect("/");
    });
  },

  // Direccionamos al usuario a la pagina de ingreso, donde se valida su rol.
  //VIEJO
  redirect: (req, res) => {
    const userLogged = req.session.userLogged;
    res.render("usuarios/welcome", {
      userLogged,
    });
  },
  //VIEJO
  redirectRole: (req, res) => {
    const userLogged = req.session.userLogged;

    if (userLogged.roles_id === 1) {
      res.send("Hola, estas ingresando al área de Administración");
    } else if (userLogged.roles_id === 2) {
      res.redirect("/ingreso/sector/recursosHumanos");
    } else if (userLogged.roles_id === 3) {
      res.redirect("/ingreso/sector/supervisor");
    } else if (userLogged.roles_id === 4) {
      res.redirect("/ingreso/sector/seguridad");
    } else if (userLogged.roles_id === 5) {
      res.redirect("/ingreso/informes/listadoDeIngresos");
    } else {
      res.send("No tienes permiso para ingresar a esta vista");
    }
  },
  rrhh: (req, res) => {
    const userLogged = req.session.userLogged;
    let usuario = Usuario.findOne({
      where: {
        id: userLogged.id,
      },
    });
    let usuarios = Usuario.findAll({
      include: ["rol_usuario"],
    });
    Promise.all([usuarios, usuario]).then(([usuarios, usuario]) => {
      res.render("usuarios/recursosHumanos", {
        userLogged,
        usuarios,
        usuario,
      });
    });
  },
  //VIEJO
  nuevoUsuario: (req, res) => {
    const userId = req.params.id;
    let usuario = Usuario.findOne({
      where: {
        id: userId,
      },
    });
    let roles = Rol.findAll({
      where: {
        id: {
          [Op.gt]: 1,
        },
      },
    });
    Promise.all([usuario, roles]).then(([usuario, roles]) => {
      res.render("usuarios/nuevoUsuario", {
        userId,
        usuario,
        roles,
      });
    });
  },
  //VIEJO
  agregarUsuario: (req, res) => {
    let roles = Rol.findAll();
    const userLogged = req.session.userLogged;
    let usuario = Usuario.findOne({
      where: {
        id: userLogged.id,
      },
    });
    Promise.all([roles, usuario]).then(([roles, usuario]) => {
      const resultValidation = validationResult(req);
      if (resultValidation.errors.length > 0) {
        return res.render("usuarios/nuevoUsuario", {
          errors: resultValidation.mapped(),
          oldData: req.body,
          roles,
          usuario,
        });
      }
    });
    let usuarioDB = Usuario.findOne({
      where: {
        usuario: req.body.usuario,
      },
    }).then((userInDB) => {
      let roles = Rol.findAll();
      const userLogged = req.session.userLogged;
      let usuario = Usuario.findOne({
        where: {
          id: userLogged.id,
        },
      });
      Promise.all([usuarioDB, roles, usuario]).then(
        ([usuarioDB, roles, usuario]) => {
          if (userInDB != null) {
            return res.render("usuarios/nuevoUsuario", {
              errors: {
                usuario: {
                  msg: "Este usuario ya está registrado, intenta con otro",
                },
              },
              oldData: req.body,
              roles,
              usuarioDB,
              usuario,
            });
          } else {
            Usuario.create({
              nombre: req.body.nombre,
              apellido: req.body.apellido,
              usuario: req.body.usuario,
              password: bcryptjs.hashSync(req.body.password, 10),
              roles_id: req.body.rol,
              estado_password: 0,
            }).then(() => {
              return res.redirect("/ingreso/sector/recursosHumanos");
            });
          }
        }
      );
    });
  },
  //VIEJO
  cambiarClave: (req, res) => {
    const userLogged = req.session.userLogged;

    if (userLogged) {
      let isOkPassword = bcryptjs.compareSync(
        req.body.password,
        userLogged.password
      );

      if (isOkPassword == true) {
        Usuario.update(
          {
            password: bcryptjs.hashSync(req.body.nuevaClave, 10),
            estado_password: 1,
          },
          {
            where: {
              id: userLogged.id,
            },
          }
        ).then(() => {
          return res.redirect("/ingreso");
        });
      }
    }
  },
  viejaContraseña: (req, res) => {
    const userLogged = req.session.userLogged;
    let usuario = Usuario.findOne({
      where: {
        id: userLogged.id,
      },
    });
    Promise.all([usuario]).then(([usuario]) => {
      res.render("usuarios/cambiarClave", {
        usuario,
      });
    });
  },
  //VIEJO
  modificarUsuario: (req, res) => {
    const userLogged = req.session.userLogged;
    let usuario = Usuario.findOne({
      where: {
        id: userLogged.id,
      },
    });
    let usuarios = Usuario.findOne({
      include: ["rol_usuario"],
      where: {
        id: req.params.id,
      },
    });
    let roles = Rol.findAll({
      where: {
        id: {
          [Op.gt]: 1,
        },
      },
    });
    Promise.all([usuarios, usuario, roles]).then(
      ([usuarios, usuario, roles]) => {
        res.render("formularios/modificarUsuario", {
          userLogged,
          usuarios,
          usuario,
          roles,
        });
      }
    );
  },
  //VIEJO
  confirmarModificar: (req, res) => {
    const userLogged = req.session.userLogged;
    const usuarioModificado = req.params.id;
    Usuario.update(
      {
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        usuario: req.body.usuario,
        roles_id: req.body.rol,
      },
      {
        where: {
          id: usuarioModificado,
        },
      }
    ).then(() => {
      return res.redirect("/ingreso/sector/recursosHumanos");
    });
  },
  //VIEJO
  confirmarEliminar: (req, res) => {
    const userLogged = req.session.userLogged;
    const usuarioId = req.params.id;
    let usuario = Usuario.findOne({
      where: {
        id: userLogged.id,
      },
    });
    let usuarios = Usuario.findOne({
      where: {
        id: usuarioId,
      },
    });

    Promise.all([usuarios, usuario]).then(([usuarios, usuario]) => {
      res.render("formularios/confirmarEliminar", {
        userLogged,
        usuarios,
        usuario,
      });
    });
  },
  //VIEJO
  eliminarUsuario: (req, res) => {
    const userLogged = req.session.userLogged;
    const usuarioId = req.params.id;
    let usuario = Usuario.findOne({
      where: {
        id: userLogged.id,
      },
    });
    let usuario_eliminado = Usuario.findOne({
      where: {
        id: usuarioId,
      },
    });
    Promise.all([usuarioId, usuario, usuario_eliminado])
      .then(([usuarioId, usuario, usuario_eliminado]) => {
        EliminarUsuario.create({
          nombre: usuario.nombre,
          apellido: usuario.apellido,
          motivo: req.body.motivo,
          usuario_eliminado: usuario_eliminado.usuario,
        });
      })
      .then(() => {
        const usuarioId = req.params.id;
        Usuario.destroy({
          where: {
            id: usuarioId,
          },
          force: true,
        });
      }).then(() => {
        return res.redirect("/ingreso/sector/recursosHumanos");
      });
  },
  registroInforme: (req, res) => {
    const userLogged = req.session.userLogged;
    let usuario = Usuario.findOne({
      where: {
        id: userLogged.id,
      },
    });


    let empresa = Empresa.findAll();
    let servicio = Servicio.findAll();
    let plataforma = Plataforma.findAll();
    let estado = Estado.findAll();
    Promise.all([usuario, empresa, servicio, plataforma, estado])
      .then(([usuario, empresa, servicio, plataforma, estado]) => {
        const resultValidation = validationResult(req);
        if (resultValidation.errors.length > 0) {
          return res.render("formularios/seguridad", {
            errors: resultValidation.mapped(),
            oldData: req.body,
            usuario,
            empresa,
            servicio,
            plataforma,
            estado,
          });
        }
      })
      .then(() => {
        RegistroTorre.create({
          fecha_ingreso: req.body.fecha,
          hora_ingreso: req.body.hora,
          interno: req.body.interno,
          empresa_id: req.body.empresa,
          servicios_id: req.body.servicio,
          usuarios_id: req.body.usuario,
          plataformas_id: 1,
          estado_id: req.body.estado,
          destino: req.body.destino,
        }).then(() => {
          return res.redirect("/ingreso/sector/seguridad");
        });
      });
  },
  informe: (req, res) => {
    const userLogged = req.session.userLogged;
    let usuario = Usuario.findOne({
      where: {
        id: userLogged.id,
      },
    });

    let empresas = Empresa.findAll();
    let servicio = Servicio.findAll();
    let plataforma = Plataforma.findAll();
    let estado = Estado.findAll();
    Promise.all([usuario, empresas, servicio, plataforma, estado]).then(
      ([usuario, empresas, servicio, plataforma, estado]) => {
        res.render("formularios/seguridad", {
          usuario,
          empresas,
          servicio,
          plataforma,
          estado,
        });
      }
    );
  },
  ingresos: (req, res) => {
    let diaHoy = date;
    const userLogged = req.session.userLogged;
    let usuario = Usuario.findOne({
      where: {
        id: userLogged.id,
      },
    });
    let ingresos = RegistroTorre.findAll({
      include: [
        "registro_empresa",
        "registro_servicio",
        "registro_plataforma",
        "registro_estado",
      ],
      where: {
        fecha_ingreso: {
          [Op.gt]: diaHoy,
        },
      },
      order: [["id", "DESC"]],
    });
    Promise.all([usuario, ingresos]).then(([usuario, ingresos]) => {
      res.render("usuarios/listadoDeIngresos", {
        usuario,
        ingresos,
      });
    });
  },

  // Comienza la parte de supervisor, la cual es la que manipula los datos que se van a agregar a las tablas de uso de la torre
  supervisor: (req, res) => {
    const userLogged = req.session.userLogged;
    let usuario = Usuario.findOne({
      where: {
        id: userLogged.id,
      },
    });
    let usuarios = Usuario.findAll({
      include: ["rol_usuario"],
    });

    let hora = horaActual;
    let empresas = Empresa.findAll({
      include: [],
    });
    let servicio = Servicio.findAll();
    let plataforma = Plataforma.findAll();
    let estado = Estado.findAll();
    Promise.all([
      usuarios,
      usuario,
      empresas,
      servicio,
      plataforma,
      estado,
      hora,
    ]).then(
      ([usuarios, usuario, empresas, servicio, plataforma, estado, hora]) => {
        res.render("usuarios/supervisor", {
          usuarios,
          usuario,
          empresas,
          servicio,
          plataforma,
          estado,
          hora,
        });
      }
    );
  },
  empresa: (req, res) => {
    const userLogged = req.session.userLogged;
    let usuario = Usuario.findOne({
      where: {
        id: userLogged.id,
      },
    });
    let hora = horaActual;
    let empresa = Empresa.findAll();
    let servicio = Servicio.findAll();
    let plataforma = Plataforma.findAll();
    let estado = Estado.findAll();
    Promise.all([usuario, empresa, servicio, plataforma, estado, hora]).then(
      ([usuario, empresa, servicio, plataforma, estado, hora]) => {
        res.render("formularios/empresa", {
          usuario,
          empresa,
          servicio,
          plataforma,
          estado,
          hora,
        });
      }
    );
  },
  informesListado: (req, res) => {
    let diaHoy = date;
    let hora = horaActual;

    const userLogged = req.session.userLogged;
    let usuario = Usuario.findOne({
      where: {
        id: userLogged.id,
      },
    });
    let ingresos = RegistroTorre.findAll({
      include: [
        "registro_empresa",
        "registro_servicio",
        "registro_plataforma",
        "registro_estado",
      ],
      where: {
        fecha_ingreso: {
          [Op.gt]: diaHoy,
        },
      },
      order: [["hora_salida", "DESC"]],
    });
    Promise.all([usuario, ingresos, hora]).then(([usuario, ingresos, hora]) => {
      res.render("formularios/listadoParaInformes", {
        usuario,
        ingresos,
        hora,
      });
    });
  },
  ingresoAModificar: (req, res) => {
    let ingresoId = req.params.id;
    let diaHoy = date;

    const userLogged = req.session.userLogged;
    let usuario = Usuario.findOne({
      where: {
        id: userLogged.id,
      },
    });
    let ingresos = RegistroTorre.findAll({
      include: [
        "registro_empresa",
        "registro_servicio",
        "registro_plataforma",
        "registro_estado",
      ],
      where: {
        id: ingresoId,
      },
    });
    let empresa = Empresa.findAll();
    let servicio = Servicio.findAll();
    let plataforma = Plataforma.findAll();
    let estado = Estado.findAll();
    Promise.all([
      usuario,
      ingresos,
      diaHoy,
      empresa,
      servicio,
      plataforma,
      estado,
      ingresoId,
    ]).then(
      ([
        usuario,
        ingresos,
        diaHoy,
        empresa,
        servicio,
        plataforma,
        estado,
        ingresoId,
      ]) => {
        res.render("formularios/modificarIngreso", {
          usuario,
          ingresos,
          diaHoy,
          empresa,
          servicio,
          plataforma,
          estado,
          ingresoId,
        });
      }
    );
  },
  modificarIngreso: (req, res) => {
    const userLogged = req.session.userLogged;
    let ingresoId = req.params.id;
    let usuario = Usuario.findOne({
      where: {
        id: userLogged.id,
      },
    });
    RegistroTorre.update(
      {
        estado_id: req.body.estado,
        destino: req.body.detino,
        fecha_salida: req.body.fecha_salida,
        hora_salida: req.body.hora_salida,
        plataformas_id: req.body.plataforma,
      },
      {
        where: {
          id: ingresoId,
        },
      }
    ).then(() => {
      return res.redirect("/ingreso/informes/listadoDeIngresos");
    });
  },
  modificarEgreso: (req, res) => {
    const userLogged = req.session.userLogged;
    let ingresoId = req.params.id;
    let usuario = Usuario.findOne({
      where: {
        id: userLogged.id,
      },
    });
    RegistroTorre.update(
      {
        estado_id: 4,
      },
      {
        where: {
          id: ingresoId,
        },
      }
    ).then(() => {
      return res.redirect("/ingreso/informes/listadoDeIngresos");
    });
  },
};



module.exports = ControllerInicioUsuario