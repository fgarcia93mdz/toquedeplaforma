const db = require("../database/models");
const Interurbano = db.Interurbano;
const { Op } = require("sequelize");

const getInterurbano = async (req, res) => {
  let interurbanoId = req.params.id;
  try {
    const interurbano = await Interurbano.findOne({
      include: [
        { association: "empresa" },
        { association: "plataforma_desde" },
        { association: "plataforma_hasta" },
      ],
      where: {
        borrado: {
          [Op.eq]: "0",
        },
        id: interurbanoId,
      },
    });

    if (interurbano == null) {
      return res.status(400).json({ mensaje: "Interurbano no encontrado" });
    }

    return res.status(200).json({ interurbano });
  } catch (error) {
    return res.status(400).json({ error });
  }
};

const getAllInterurbanos = async (req, res) => {
  try {
    const interurbanos = await Interurbano.findAll({
      include: [
        { association: "empresa" },
        { association: "plataforma_desde" },
        { association: "plataforma_hasta" },
      ],
    });

    return res.status(200).json({ interurbanos });
  } catch (error) {
    return res.status(400).json({ error });
  }
};

const deleteInterurbano = async (req, res) => {
  let interurbanoId = req.params.id;
  try {
    const deleted = await Interurbano.destroy({
      where: {
        id: interurbanoId,
      },
    });

    return res.status(200).json({
      borrado: deleted === 1 ? "Exitoso" : "No se pudo borrar",
    });
  } catch (error) {
    return res.status(400).json({ error });
  }
};

const updateInterurbano = async (req, res) => {
  const { empresa_id, desde, hasta } = req.body;
  const interurbanoId = parseInt(req.params.id);

  const dataACambiar = {};

  empresa_id !== undefined ? (dataACambiar.empresa_id = empresa_id) : null;
  desde !== undefined ? (dataACambiar.desde = desde) : null;
  hasta !== undefined ? (dataACambiar.hasta = hasta) : null;

  if (Object.keys(dataACambiar).length === 0) {
    return res
      .status(400)
      .json({ mensaje: "Se require al menos un dato a modificar" });
  }

  try {
    console.log(empresa_id);
    if (empresa_id !== undefined) {
      const encontrado = await Interurbano.findOne({
        where: {
          empresa_id,
        },
      });

      if (encontrado !== null) {
        return res
          .status(400)
          .json({ mensaje: "ya existe rango para ese interurbano" });
      }
    }

    const modificar = await Interurbano.update(dataACambiar, {
      where: {
        id: interurbanoId,
      },
    });

    return res.status(200).json({
      modificar,
    });
  } catch (error) {
    return res.status(400).json({ error: "No se pudo modificar" });
  }
};

const addInterurbano = async (req, res) => {
  const { empresa_id, desde, hasta } = req.body;
  if (!empresa_id || !desde || !hasta) {
    return res.status(400).json({ mensaje: "faltan datos" });
  }
  try {
    const encontrado = await Interurbano.findOne({
      where: {
        empresa_id,
      },
    });

    if (encontrado !== null) {
      return res
        .status(400)
        .json({ mensaje: "ya existe rango para ese interurbano" });
    }

    await Interurbano.create({
      empresa_id,
      desde,
      hasta,
    });

    return res.status(200).json({
      mensaje: "rango para interurbano creado correctamente",
    });
  } catch (error) {
    return res
      .status(400)
      .json({ mensaje: "no se pudo crear rango para ese interurbano" });
  }
};

module.exports = {
  getAllInterurbanos,
  getInterurbano,
  deleteInterurbano,
  updateInterurbano,
  addInterurbano,
};
