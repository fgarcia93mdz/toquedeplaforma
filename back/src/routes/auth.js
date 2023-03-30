const express = require('express')
const router = express.Router()
const { authenticateToken } = require("../middlewares/authenticateToken.js");
const { login, logout } = require("../controllers/auth.js");

router.post('/login', login);
//data para el front
// POST http://localhost:8080/auth/login
// {
//   "email":"utest",
//   "password":"ptest"
// }

router.get('/logout',authenticateToken, logout);
// GET http://localhost:8080/auth/logout

module.exports = router;