var express = require('express');
var router = express.Router();
const multer = require('multer');
const path = require('path');
const { body } = require('express-validator');

// ************ MULTER ************

const storage = multer.diskStorage({

  destination: function (req, file, cb) {
    cb(null, 'public/img/equipos')
  },

  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname)
    cb(null, file.fieldname + '-' + uniqueSuffix)

    // const name = file.originalname
    // cb(null, name)

  }

})
// Se usa para cargar de fotos 
const upload = multer({
  storage: storage
});
//Validaciones para el formulario 
const validations = [
  body("nombre").notEmpty().withMessage('Tienes que escribir un nombre'),
  body("apellido").notEmpty().withMessage('Tienes que escribir un apellido'),
  body("usuario").notEmpty().withMessage('Tienes que escribir un usuario'),
  body("rol").notEmpty().withMessage('Tienes que seleccionar una opcion'),
];


// Llamado al controlador
const ControllerInicioUsuario = require('../controllers/inicio')

/* Home con inicio de sesion */
router.get('/', ControllerInicioUsuario.inicio)
router.post('/ingresoUsuario', ControllerInicioUsuario.login);

// Pre ingreso para saber roles 
router.get('/ingreso', ControllerInicioUsuario.redirect);
router.get('/logout', ControllerInicioUsuario.logout);
router.get('/ingreso/sector', ControllerInicioUsuario.redirectRole);

// Area de Recursos humanos
router.get('/ingreso/sector/recursosHumanos/', ControllerInicioUsuario.rrhh);
router.get('/ingreso/sector/recursosHumanos/:id/nuevoUsuario', validations, ControllerInicioUsuario.nuevoUsuario);
// Nuevo Usuario
router.post('/ingreso/sector/recursosHumanos/:id/nuevoUsuario/agregarUsuario', validations, ControllerInicioUsuario.agregarUsuario);
// Eliminar Usuario
router.get('/ingreso/sector/recursosHumanos/eliminarUsuario/:id', ControllerInicioUsuario.confirmarEliminar);
router.post('/ingreso/sector/recursosHumanos/eliminarUsuario/:id', ControllerInicioUsuario.eliminarUsuario);
// Modificar Usuario
router.get('/ingreso/sector/recursosHumanos/modificarUsuario/:id', ControllerInicioUsuario.modificarUsuario);
router.post('/ingreso/sector/recursosHumanos/modificarUsuario/:id', ControllerInicioUsuario.confirmarModificar);

// Cambiar contraseña
router.get('/ingreso/sector/:id/cambiarClave', validations, ControllerInicioUsuario.viejaContraseña);
router.post('/ingreso/sector/:id/cambioDeClave', validations, ControllerInicioUsuario.cambiarClave);

// Formulario de seguridad
router.get('/ingreso/sector/seguridad', ControllerInicioUsuario.informe);
router.post('/ingreso/sector/seguridad/:id/registroInforme', ControllerInicioUsuario.registroInforme);
router.get('/ingreso/sector/seguridad/ingresos', ControllerInicioUsuario.ingresos);

// Supervisor
router.get('/ingreso/sector/supervisor', ControllerInicioUsuario.supervisor)
router.get('/ingreso/sector/supervisor/empresa', ControllerInicioUsuario.empresa)

// Informes
router.get('/ingreso/informes/listadoDeIngresos', ControllerInicioUsuario.informesListado);
router.get('/ingreso/informes/:id/ingresoAModificar', ControllerInicioUsuario.ingresoAModificar);
router.post('/ingreso/informes/:id/modificarIngreso', ControllerInicioUsuario.modificarIngreso);
router.post('/ingreso/informes/:id/modificarEgreso', ControllerInicioUsuario.modificarEgreso);




module.exports = router;
