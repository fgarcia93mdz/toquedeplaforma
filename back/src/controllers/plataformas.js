const db = require("../database/models");
const Plataforma = db.Plataforma;
const { Op } = require("sequelize");

const getPlataforma = async (req, res) => {
  let plataformaId = req.params.id;
  try {
    const plataforma = await Plataforma.findOne({
      where: {
        borrado: {
          [Op.eq]: "0",
        },
        id: plataformaId,
      },
    });

    if (plataforma == null) {
      return res.status(400).json({ mensaje: "plataforma no encontrada" });
    }

    return res.status(200).json({
      plataforma,
    });
  } catch (error) {
    return res.status(400).json({ mensaje: error });
  }
};

const getAllPlataformas = async (req, res) => {
  try {
    const plataformas = await Plataforma.findAll({
      where: {
        borrado: {
          [Op.eq]: "0",
        },
      },
    });
    return res.status(200).json({
      plataformas,
    });
  } catch (error) {
    return res.status(400).json({ mensaje: error });
  }
};

const addNewPlataforma = async (req, res) => {
  const { plataforma, serviciosId } = req.body;
  if (!plataforma || !serviciosId) {
    return res.status(400).json({ mensaje: "faltan datos" });
  }

  try {
    await Plataforma.create({
      plataforma,
      servicios_id: serviciosId,
    });

    return res.status(200).json({
      mensaje: "plataforma creada correctamente",
    });
  } catch (error) {
    return res.status(400).json({ mensaje: error });
  }
};

const updatePlataforma = async (req, res) => {
  let plataformaId = req.params.id;
  try {
    const { plataforma, serviciosId } = req.body;
    if (!plataforma || !serviciosId) {
      return res.status(400).json({ mensaje: "faltan datos" });
    }

    const plataformaEncontrada = await Plataforma.findOne({
      where: {
        borrado: {
          [Op.eq]: "0",
        },
        id: plataformaId,
      },
    });

    if (plataformaEncontrada == null) {
      return res.status(400).json({ mensaje: "plataforma no encontrada" });
    }

    const dataACambiar = {};

    if (plataforma != null) dataACambiar.plataforma = plataforma;
    if (serviciosId != null) dataACambiar.servicios_id = serviciosId;

    if (Object.keys(dataACambiar).length === 0) {
      return res
        .status(400)
        .json({ mensaje: "se require al menos un dato a modificar" });
    }

    await Plataforma.update(dataACambiar, {
      where: {
        id: plataformaId,
      },
    });

    return res.status(200).json({
      mensaje: "plataforma modificada",
    });
  } catch (error) {
    return res.status(400).json({ mensaje: error });
  }
};

const deletePlataforma = async (req, res) => {
  let plataformaId = req.params.id;

  try {
    const plataformaEncontrada = await Plataforma.findOne({
      where: {
        borrado: {
          [Op.eq]: "0",
        },
        id: plataformaId,
      },
    });

    if (plataformaEncontrada == null) {
      return res.status(400).json({ mensaje: "plataforma no encontrada" });
    }

    const resultado = await Plataforma.update(
      { borrado: "1" },
      {
        where: {
          id: plataformaId,
        },
      }
    );

    if (resultado[0] === 0) {
      return res.status(400).json({
        mensaje: "no se pudo borrar",
      });
    }

    return res.status(200).json({
      mensaje: "plataforma borrada",
    });
  } catch (error) {
    return res.status(400).json({ mensaje: error });
  }
};

module.exports = {
  getAllPlataformas,
  addNewPlataforma,
  deletePlataforma,
  getPlataforma,
  updatePlataforma,
};
