const jwt = require('jsonwebtoken');

require("dotenv").config();

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization']
  // console.log(authHeader);
  //el token viene asi "Bearer token..."
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) return res.status(401).json({mensaje:"falta token"})

  jwt.verify(token, process.env.TOKEN_SECRET , (err, usuario) => {
    if (err) return res.status(403).json({err});

    req.usuario = usuario
    next()
  })

  
}

module.exports = { authenticateToken };