var express = require('express');
var router = express.Router();
const {
  register,
  changePassword,
  modifyUser,
  deleteUser,
  getDataUserInfoToModify,
  getDataInfoToCreateNewUser,
  getAllUsers,
  resetPassword,
} = require("../controllers/users");
const { authenticateToken } = require("../middlewares/authenticateToken.js");
const verifyRoles = require("../middlewares/verifyRoles");
const ROLES = require("../config/roles");

router.post('/register', register)
//falta agregar middleware de roles
//data para el front
// POST localhost:8080/users/register
// {
//   "nombre": "ntest",
//   "apellido": "atest",
//   "usuario": "utest",
//   "password": "ptest",
//   "rol": "3"
// }

router.get("/", authenticateToken, getAllUsers);

router.get("/getUser/:id", authenticateToken, getDataUserInfoToModify);
//devuelve información del usuario a modificar + la lista de roles disponibles para el dropdown
// GET localhost:8080/users/getUser/:id
// HEADERS
// authorization "Bearer token..."


router.get("/new", authenticateToken, getDataInfoToCreateNewUser);
// devuelve la lista de roles disponibles para crear un nuevo usuario
// GET localhost:8080/users/new
// HEADERS
// authorization "Bearer token..."

router.post("/resetPassword", authenticateToken, resetPassword)

router.post("/changePassword", authenticateToken, changePassword);
//data para el front
// POST localhost:8080/users/changePassword
// {
//   "password":"ptest",
//   "nuevaClave":"ptest1"
// }
// HEADERS
// authorization "Bearer token..."

router.patch("/modifyUser/:id", authenticateToken, modifyUser);
//falta agregar middleware de roles
//6 seria el user id a editar
// PATCH localhost:8080/users/modifyUser/6
//NOTA: no es necesario que tenga los 4 campos, solo los que va a modificar , tipo si solo quiere modificar nombre en el json va solo nombre
// BODY
// {
//   "nombre": "ntest222234a23111",
//   "apellido": "atest22223",
//   "usuario": "utest222223",
//   "rol": "1"
// }
// HEADERS
// authorization "Bearer token..."

router.delete("/deleteUser/:id", authenticateToken, deleteUser);
//falta agregar middleware de roles
//2 seria el user id a eliminar
//DELETE localhost:8080/users/deleteUser/2
// BODY
// {
//   "motivo":"porque si"
// }
// HEADERS
// authorization "Bearer token..."

module.exports = router;
