var express = require("express");
var router = express.Router();
const {
  getLogs,
  getLogsUsuarios,
  getLogsOfMonthAndYear,
} = require("../controllers/logs");
const { authenticateToken } = require("../middlewares/authenticateToken.js");
const verifyRoles = require("../middlewares/verifyRoles");

//NOTA: fijarse que roles puede hacer que cosa y usar el middleware veryfyRoles
const ROLES = require("../config/roles");

router.get("/", authenticateToken, getLogs);
router.get("/month", getLogsOfMonthAndYear);
router.get("/usuarios", authenticateToken, getLogsUsuarios);

module.exports = router;
