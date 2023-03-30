const userTerminal = require('../middlewares/UserTerminal')

function userLogged(req, res, next) {


  res.locals.isLogged = false;

  let emailInCookie = req.cookies.userEmail;
  let userCookie = userTerminal.findByField('usuario', emailInCookie);


  if (userCookie) {

    req.session.userLogged = userCookie;
  }

  if (req.session.userLogged) {
    res.locals.isLogged = true;
    res.locals.userLogged = req.session.userLogged;
  }

  next();
}


module.exports = userLogged