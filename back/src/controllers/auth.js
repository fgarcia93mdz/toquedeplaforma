const jwt = require("jsonwebtoken");
const db = require("../database/models");
const Usuario = db.Usuario;
const UsuarioLog = db.UsuarioLog;
const bcryptjs = require("bcryptjs");
require("dotenv").config();

generateAccessToken = (usuario) => {
  return jwt.sign(usuario, process.env.TOKEN_SECRET);
};

const login = async (req, res) => {
  try {
    
    const userToLogin = await Usuario.findOne({
      where: {
        usuario: req.body.email,
      },
    });
    // console.log(userToLogin);
    if (userToLogin) {
      let isOkPassword = bcryptjs.compareSync(
        req.body.password,
        userToLogin.password
      );
      //  console.log(userToLogin.dataValues, "!");
      if (isOkPassword) {
        const usuario = {
          nombre: userToLogin.dataValues.nombre,
          apellido: userToLogin.dataValues.apellido,
          usuario: userToLogin.dataValues.usuario,
          rol: userToLogin.dataValues.roles_id,
          id: userToLogin.dataValues.id,
          estado_password: userToLogin.dataValues.estado_password,
        };
        const token = generateAccessToken(usuario);
       
       const logLogin = await UsuarioLog.create({
         usuario_log: req.body.email,
         tipo_de_estado: "Ingreso",
       });
        return res.status(200).json(token);
      } else {
        return res
          .status(400)
          .json({ mensaje: "contraseña incorrecta" });
      }
    } else {
      return res.status(400).json({ mensaje: "usuarioincorrecto" });
    }
  } catch (error) {
    return res.status(400).json({ mensaje: error });
  };

};

const logout = async (req, res) => {
  const timestamp = req.usuario.iat * 1000;
  let ingreso = new Date(timestamp);
  try {
    const logLogout = await UsuarioLog.create({
      usuario_log: req.usuario.usuario,
      tipo_de_estado: "Egreso",
    });

    return res.status(200).json({ mensaje: "deslogeado" });
  } catch (error) {
    return res.status(400).json({ mensaje: error });
  }
};

module.exports = { login, logout };
