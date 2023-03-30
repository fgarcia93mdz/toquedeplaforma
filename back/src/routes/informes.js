var express = require("express");
var router = express.Router();
const {
  informesListado,
  getInforme,
  modificarInforme,
  addInforme,
  getDataDropdown,
  informesListadoSeparadosPorEstado,
  informesListadoPorRangoDeFechas,
} = require("../controllers/informes");
const { authenticateToken } = require("../middlewares/authenticateToken.js");
const verifyRoles = require("../middlewares/verifyRoles");

//NOTA: fijarse que roles puede hacer que cosa y usar el middleware veryfyRoles
const ROLES = require("../config/roles");


router.post("/nuevo", authenticateToken, addInforme);
//para los roles seguridad e informes
//los usuarios que pueden crear informes son el de seguridad de torre (no puede agregar plataformas_id, fecha_salida y hora salida) y informes que agrega todos los campos
//para que el sistema sepa si es seguridad o tiene un rol con mas permisos se verifican los roles del token, si es 5 es informes por ejemplo
//si no es usuario rol informe puede ahorrarse esos 3 campos porque igual no los va a guardar en la base de datos
//falta agregar middleware de roles para que solo seguridad e informes puedan acceder a la ruta
//POST localhost:8080/informes/nuevo
//authorization Bearer token...
//JSON
// {
//   "fecha_ingreso": "2022-11-16",
//   "hora_ingreso": "16:51",
//   "interno": "4",
//   "empresa_id": "2",
//   "servicios_id": "2",
//   "estado_id": "1",
//   "destino": "AAAAAA2",
//   "plataformas_id": "2",
//   "fecha_salida": "2022-12-12",
//   "hora_salida": "12:22"
// }



router.get("/dataDropdown", authenticateToken, getDataDropdown);
//para los roles rol seguridad y informes
//rol informes tiene los drowpdown completos

//falta agregar middleware de roles
//GET localhost:8080/informes/dataDropdown
//authorization Bearer token...
//devuelve toda la data necesaria para rellenar los dropdown

router.get(
  "/listado",
  informesListado
);
//para el rol seguridad
//falta agregar middleware de roles
//GET localhost:8080/informes/listado
//authorization Bearer token...

router.get("/listadoFechas",informesListadoPorRangoDeFechas);
//GET localhost:8080/informes/listadoFechas
//QUERY PARAMETERS
//fechaDesde 2022-12-12
//fechaHasta 2022-12-15

router.get(
  "/listadoSeparado",
  authenticateToken, informesListadoSeparadosPorEstado
);
//para el rol informes
//GET localhost:8080/informes/listadoSeparado
//authorization Bearer token...

router.get("/:id", authenticateToken, getInforme);
//para el rol informes
//falta agregar middleware de roles
//GET localhost:8080/informes/2
//authorization Bearer token...

router.patch("/modificar/:id", authenticateToken, modificarInforme);
//para el rol informes
//falta agregar middleware de roles
//PATCH localhost:8080/informes/modificar/2
//authorization Bearer token...
//JSON (al menos uno de estos campos)
// {
//   "fecha_ingreso": "2022-11-16",
//   "hora_ingreso": "16:51",
//   "interno": "4",
//   "empresa_id": "2",
//   "servicios_id": "2",
//   "estado_id": "1",
//   "destino": "BBBB",
//   "plataformas_id": "2",
//   "fecha_salida": "2022-12-12",
//   "hora_salida": "12:22"
// }




module.exports = router;
