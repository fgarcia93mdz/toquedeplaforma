var express = require("express");
var router = express.Router();
const {
  getAllEmpresas,
  addNewEmpresa,
  deleteEmpresa,
  getEmpresa,
  updateEmpresa,
} = require("../controllers/empresas");
const { authenticateToken } = require("../middlewares/authenticateToken.js");
const verifyRoles = require("../middlewares/verifyRoles");

const path = require("path");

const fileFilter = function (req, file, cb) {
  const extension = path.extname(file.originalname).toLowerCase();
  const mimetyp = file.mimetype;
  if (
    extension === ".jpg" ||
    extension === ".jpeg" ||
    extension === ".png" ||
    mimetyp === "image/png" ||
    mimetyp === "image/jpg" ||
    mimetyp === "image/jpeg"
  ) {
    return cb(null, true);
  }
  return cb(null, false);
};
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, `../../empresas_img/`));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const multerUpload = multer({ storage: storage, fileFilter: fileFilter });
//NOTA: fijarse que roles puede hacer que cosa y usar el middleware veryfyRoles
const ROLES = require("../config/roles");

router.get("/listado", authenticateToken, getAllEmpresas);
//falta agregar middleware de roles
//GET localhost:8080/empresas/listado
//authorization Bearer token...

router.get("/:id", authenticateToken, getEmpresa);
router.post(
  "/nueva",
  authenticateToken,
  multerUpload.single("imagen"),
  addNewEmpresa
);
//falta agregar middleware de roles
//POST localhost:8080/empresas/nueva
//FORM
//empresa = "Empresa falsa 123"
//siglas = "EF"
//cuit = "53-32523325"
//FILES
//imagen = la imagen
//authorization Bearer token...

router.patch(
  "/:id",
  authenticateToken,
  multerUpload.single("imagen"),
  updateEmpresa
);
//PATCH localhost:8080/empresas/:id
//FORM
//empresa = "Empresa falsa 123"
//siglas = "EF"
//cuit = "53-32523325"
//FILES
//imagen = la imagen
//authorization Bearer token...

router.delete("/:id", authenticateToken, deleteEmpresa);

module.exports = router;
