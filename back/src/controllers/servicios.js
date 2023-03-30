const db = require("../database/models");
const Servicio = db.Servicio;
const { Op } = require("sequelize");

const getServicio = async (req, res) => {
  let servicioId = req.params.id;
  try {
    const servicio = await Servicio.findOne({
      where: {
        borrado: {
          [Op.eq]: "0",
        },
        id: servicioId,
      },
    });

    if (servicio == null) {
      return res.status(400).json({ mensaje: "servicio no encontrado" });
    }

    return res.status(200).json({
      servicio,
    });
  } catch (error) {
    return res.status(400).json({ mensaje: error });
  }
};

const getAllServicios = async (req, res) => {
  try {
    const servicios = await Servicio.findAll({
      where: {
        borrado: {
          [Op.eq]: "0",
        },
      },
    });
    return res.status(200).json({
      servicios,
    });
  } catch (error) {
    return res.status(400).json({ mensaje: error });
  }
};



const addNewServicio = async (req, res) => {
  const { siglas, tipoServicio } = req.body;
  if (!siglas || !tipoServicio) {
    return res.status(400).json({ mensaje: "faltan datos" });
  }

  try {
    await Servicio.create({
      siglas,
      tipo_servicio: tipoServicio,
    });

    return res.status(200).json({
      mensaje: "servicio creado correctamente",
    });
  } catch (error) {
    return res.status(400).json({ mensaje: error });
  }
};

const updateServicio = async (req, res) => {
  let servicioId = req.params.id;
  try {
   const { siglas, tipoServicio } = req.body;
    if (!siglas || !tipoServicio) {
      return res.status(400).json({ mensaje: "faltan datos" });
    }

    const servicioEncontrado = await Servicio.findOne({
      where: {
        borrado: {
          [Op.eq]: "0",
        },
        id: servicioId,
      },
    });

    if (servicioEncontrado == null) {
      return res.status(400).json({ mensaje: "servicio no encontrado" });
    }

    const dataACambiar = {};

 


    
    if (siglas != null) dataACambiar.siglas = siglas;
    if (tipoServicio != null) dataACambiar.tipo_servicio = tipoServicio;

    if (Object.keys(dataACambiar).length === 0) {
      return res
        .status(400)
        .json({ mensaje: "se require al menos un dato a modificar" });
    }

    await Servicio.update(dataACambiar, {
      where: {
        id: servicioId,
      },
    });

    return res.status(200).json({
      mensaje: "servicio modificado",
    });
  } catch (error) {
    return res.status(400).json({ mensaje: error });
  }
};

const deleteServicio = async (req, res) => {
  let servicioId = req.params.id;

  try {
    const servicioEncontrado = await Servicio.findOne({
      where: {
        borrado: {
          [Op.eq]: "0",
        },
        id: servicioId,
      },
    });

    if (servicioEncontrado == null) {
      return res.status(400).json({ mensaje: "servicio no encontrado" });
    }

    const resultado = await Servicio.update(
      { borrado: "1" },
      {
        where: {
          id: servicioId,
        },
      }
    );

    if (resultado[0] === 0) {
      return res.status(400).json({
        mensaje: "no se pudo borrar",
      });
    }

    return res.status(200).json({
      mensaje: "servicio borrado",
    });
  } catch (error) {
    return res.status(400).json({ mensaje: error });
  }
};

module.exports = {
  getAllServicios,
  addNewServicio,
  deleteServicio,
  getServicio,
  updateServicio,
};
