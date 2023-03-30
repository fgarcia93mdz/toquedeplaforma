const db = require("../database/models");
const Marquesina = db.Marquesina;
const { Op } = require("sequelize");
const getMarquesinas = async (req, res) => {
  try {
    let marquesinas = await Marquesina.findAll({});
    return res.status(200).json({ marquesinas });
  } catch (error) {
    return res.status(400).json({ error });
  }
};

const getMarquesinaHabilitada = async (req, res) => {
  try {
    let marquesina = await Marquesina.findOne({
      where: { estado: 1 },
      attributes: ["texto"],
    });
    return res.status(200).json({ marquesina });
  } catch (error) {
    return res.status(400).json({ error });
  }
};


const deleteMarquesina = async (req, res) => {
  const marquesinaId = parseInt(req.params.marquesinaId);
  try {
    const deleted = await Marquesina.destroy({
      where: {
        id: marquesinaId,
      },
    });
    return res.status(200).json({
      borrado: deleted === 1 ? "Exitoso" : "No se pudo borrar",
    });
  } catch (error) {
    return res.status(400).json({ error });
  }
};

const editMarquesina = async (req, res) => {
  const marquesinaId = parseInt(req.params.marquesinaId);
  const dataACambiar = {};

  const { texto, estado } = req.body;

  if (texto != null) {
    dataACambiar.texto = texto;
    dataACambiar.usuarios_id = req.usuario.id;
  }
  if (estado != null) dataACambiar.estado = estado;

  if (Object.keys(dataACambiar).length === 0) {
    return res
      .status(400)
      .json({ mensaje: "Se require al menos un dato a modificar" });
  }

  try {
    const modificar = await Marquesina.update(dataACambiar, {
      where: {
        id: marquesinaId,
      },
    });

    if (modificar[0] === 0) {
      return res.status(400).json({ error: "No se pudo modificar marquesina" });
    }

    if (modificar[0] === 1 && dataACambiar.estado === 1) {
      await Marquesina.update(
        { estado: 0 },
        {
          where: {
            id: {
              [Op.not]: marquesinaId,
            },
          },
        }
      );
    }

    return res.status(200).json({
      modificar,
    });
  } catch (error) {
    return res.status(400).json({ error: "No se pudo modificar marquesina" });
  }
};

const addMarquesina = async (req, res) => {
  const { texto } = req.body;
  if (!texto) {
    return res.status(400).json({ mensaje: "falta texto de marquesina" });
  }
  const usuarios_id = req.usuario.id;
  console.log(usuarios_id, texto);
  try {
    const crear = await Marquesina.create({ usuarios_id, texto });
    return res.status(200).json({});
  } catch (error) {
    return res.status(400).json({ error: "No se pudo crear marquesina" });
  }
};

module.exports = {
  getMarquesinas,
  getMarquesinaHabilitada,
  deleteMarquesina,
  editMarquesina,
  addMarquesina,
};
