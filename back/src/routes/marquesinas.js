var express = require("express");
var router = express.Router();
const {
  getMarquesinas,
  getMarquesinaHabilitada,
  deleteMarquesina,
  editMarquesina,
  addMarquesina,
} = require("../controllers/marquesinas");
const { authenticateToken } = require("../middlewares/authenticateToken.js");
const verifyRoles = require("../middlewares/verifyRoles");

//NOTA: fijarse que roles puede hacer que cosa y usar el middleware veryfyRoles
const ROLES = require("../config/roles");

router.get("/", authenticateToken, getMarquesinas);
router.get("/marquesina", getMarquesinaHabilitada);
router.delete("/:marquesinaId", authenticateToken, deleteMarquesina);
router.patch("/:marquesinaId", authenticateToken, editMarquesina);
//json con campos texto o estado (0 o 1), al menos un campo
router.post("/", authenticateToken, addMarquesina);
//json con campo texto

module.exports = router;
