const db = require("../database/models");
const Empresa = db.Empresa;
const { Op } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { empresa } = require("./inicio");

const getEmpresa = async (req, res) => {
  let empresaId = req.params.id;
  try {
    const empresa = await Empresa.findOne({
      where: {
        borrado: {
          [Op.eq]: "0",
        },
        id: empresaId,
      },
    });

    if (empresa == null) {
      return res.status(400).json({ mensaje: "Empresa no encontrada" });
    }

    if (empresa.img !== null) {
      //producción
      //empresa.img = "https://torreterminalmdz.ar/api/" + empresa.img;
      //desarrollo
      empresa.img = req.protocol + "://" + req.get("host") + "/" + empresa.img;
    }

    return res.status(200).json({
      empresa,
    });
  } catch (error) {
    return res.status(400).json({ mensaje: error });
  }
};

const updateEmpresa = async (req, res) => {
  let empresaId = req.params.id;
  try {
    const empresaEncontrada = await Empresa.findOne({
      where: {
        borrado: {
          [Op.eq]: "0",
        },
        id: empresaId,
      },
    });

    if (empresaEncontrada == null) {
      return res.status(400).json({ mensaje: "Empresa no encontrada" });
    }

    const dataACambiar = {};

    const { empresa, siglas, cuit } = req.body;
    if (empresa != null && empresa != "") dataACambiar.empresa = empresa;
    if (siglas != null && siglas != "") dataACambiar.siglas = siglas;
    if (req.file?.filename != undefined && req.file?.filename != "")
      dataACambiar.img = req.file?.filename;
    if (cuit != null && cuit != "") dataACambiar.cuit = cuit;

    if (Object.keys(dataACambiar).length === 0) {
      return res
        .status(400)
        .json({ mensaje: "Se require al menos un dato a modificar" });
    }

    await Empresa.update(dataACambiar, {
      where: {
        id: empresaId,
      },
    });

    if (req.file?.filename != undefined) {
      fs.unlinkSync(
        path.join(__dirname, `../../empresas_img/${empresaEncontrada.img}`)
      );
    }

    return res.status(200).json({
      mensaje: "Empresa modificada",
    });
  } catch (error) {
    return res.status(400).json({ mensaje: error });
  }
};

const getAllEmpresas = async (req, res) => {
  try {
    const empresas = await Empresa.findAll({
      where: {
        borrado: {
          [Op.eq]: "0",
        },
      },
      order: [["empresa", "ASC"]],
    });
    // console.log(empresas);
    empresas.forEach((empresa) => {
      if (empresa.img !== null) {
        //producción
        //empresa.img = "https://torreterminalmdz.ar/api/" + empresa.img;
        //desarrollo
        empresa.img =
          req.protocol + "://" + req.get("host") + "/" + empresa.img;
      }
    });
    return res.status(200).json({
      empresas,
    });
  } catch (error) {
    return res.status(400).json({ mensaje: error });
  }
};

const addNewEmpresa = async (req, res) => {
  const { empresa, siglas, cuit } = req.body;
  if (!empresa || !siglas || !cuit) {
    return res.status(400).json({ mensaje: "faltan datos" });
  }
  let img = "empresas-sin-imagen-1.png";

  if (req.file?.filename !== undefined) {
    img = req.file?.filename;
  }

  try {
    await Empresa.create({
      empresa: req.body.empresa,
      siglas: req.body.siglas,
      img,
      cuit: req.body.cuit,
    });

    return res.status(200).json({
      mensaje: "empresa creada correctamente",
    });
  } catch (error) {
    return res.status(400).json({ mensaje: error });
  }
};

const deleteEmpresa = async (req, res) => {
  let empresaId = req.params.id;

  try {
    await Empresa.update(
      { borrado: "1" },
      {
        where: {
          id: empresaId,
        },
      }
    );

    return res.status(200).json({
      mensaje: "empresa borrada",
    });
  } catch (error) {
    return res.status(400).json({ mensaje: error });
  }
};

module.exports = {
  getAllEmpresas,
  addNewEmpresa,
  deleteEmpresa,
  getEmpresa,
  updateEmpresa,
};
