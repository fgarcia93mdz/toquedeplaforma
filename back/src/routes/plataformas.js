var express = require("express");
var router = express.Router();
const {
  getPlataforma,
  getAllPlataformas,
  addNewPlataforma,
  updatePlataforma,
  deletePlataforma,
} = require("../controllers/plataformas");
const { authenticateToken } = require("../middlewares/authenticateToken.js");
const verifyRoles = require("../middlewares/verifyRoles");

//NOTA: fijarse que roles puede hacer que cosa y usar el middleware veryfyRoles
const ROLES = require("../config/roles");

router.get("/listado", authenticateToken, getAllPlataformas);
//GET localhost:8080/plataformas/listado
//authorization Bearer token...

router.get("/:id", authenticateToken, getPlataforma);
//GET localhost:8080/plataformas/
//authorization Bearer token...

router.post("/nueva", authenticateToken, addNewPlataforma);
//POST localhost:8080/plataformas/nueva
//JSON
//{
//   "plataforma" : "plataforma",
//         "serviciosId" : "6"
// }
//authorization Bearer token...

router.patch("/:id", authenticateToken, updatePlataforma);
//PATCH localhost:8080/plataformas/4
//JSON
//{
//   "plataforma" : "plataforma",
//         "serviciosId" : "6"
// }

router.delete("/:id", authenticateToken, deletePlataforma);

module.exports = router;
