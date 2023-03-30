var express = require("express");
var router = express.Router();
const {
  getAllInterurbanos,
  addInterurbano,
  deleteInterurbano,
  getInterurbano,
  updateInterurbano,
} = require("../controllers/interurbano");
const { authenticateToken } = require("../middlewares/authenticateToken.js");
const verifyRoles = require("../middlewares/verifyRoles");

//NOTA: fijarse que roles puede hacer que cosa y usar el middleware veryfyRoles
const ROLES = require("../config/roles");

router.get("/", getAllInterurbanos);
// "/interurbanos/"
router.get("/:id", authenticateToken, getInterurbano);
// "/interurbanos/:id"
router.post("/", authenticateToken, addInterurbano);
router.patch("/:id", authenticateToken, updateInterurbano);
router.delete("/:id", authenticateToken, deleteInterurbano);

module.exports = router;
