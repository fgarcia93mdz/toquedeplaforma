var express = require("express");
var router = express.Router();
const {
  getServicio,
  getAllServicios,
  addNewServicio,
  updateServicio,
  deleteServicio,
} = require("../controllers/servicios");
const { authenticateToken } = require("../middlewares/authenticateToken.js");
const verifyRoles = require("../middlewares/verifyRoles");

//NOTA: fijarse que roles puede hacer que cosa y usar el middleware veryfyRoles
const ROLES = require("../config/roles");

router.get("/listado", authenticateToken, getAllServicios);
//GET localhost:8080/servicios/listado
//authorization Bearer token...

router.get("/:id", authenticateToken, getServicio);
//GET localhost:8080/servicios/:id
//authorization Bearer token...

router.post("/nueva", authenticateToken, addNewServicio);
//POST localhost:8080/servicios/nueva
//JSON
//{
//   "siglas" : "WQNEQW",
//         "tipoServicio" : "Servicio prueba"
// }
//authorization Bearer token...

router.patch("/:id", authenticateToken, updateServicio);
//PATCH localhost:8080/servicios/:id
//JSON
//{
//   "siglas" : "WQNEQW",
//         "tipoServicio" : "Servicio prueba"
// }
//authorization Bearer token...

router.delete("/:id", authenticateToken, deleteServicio);
//authorization Bearer token...

module.exports = router;
