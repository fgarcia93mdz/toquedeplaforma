const db = require("../database/models");
const RegistroTorre = db.RegistroAdministrativo;
const Empresa = db.Empresa;
const Servicio = db.Servicio;
const Plataforma = db.Plataforma;
const Estado = db.Estado;
const Tipo_tv = db.Tipo_tv;
const { Op } = require("sequelize");
const moment = require("moment");
const tieneCampoNull = require("../../public/js/tieneCampoNull");

const addInforme = async (req, res) => {
  //informes es rol 5
  //seguridad es rol 4

  try {
    const data = req.body;
    const { id: usuarios_id, rol } = req.usuario;

    // if (tieneCampoNull(dataAIngresar)) {
    //   return res.status(400).json({ mensaje: "faltan datos" });
    // }

    const {
      fecha_ingreso,
      hora_ingreso,
      interno,
      empresa_id,
      servicios_id,
      estado_id,
      destino,
      tipo_tv_id,
      interurbano,
    } = data;

    if (
      !fecha_ingreso ||
      !hora_ingreso ||
      !interno ||
      !empresa_id ||
      !servicios_id ||
      !estado_id ||
      !destino ||
      !tipo_tv_id
    ) {
      return res.status(400).json({ mensaje: "faltan datos" });
    }

    const dataAingresar = {
      fecha_ingreso,
      hora_ingreso: modifyHours(hora_ingreso),
      interno,
      empresa_id,
      servicios_id,
      estado_id,
      destino,
      usuarios_id,
      tipo_tv_id,
      interurbano,
    };

    // if (rol === 5) {
    //   const { fecha_salida, hora_salida, plataformas_id, tipo_tv_id } = data;

    //   if (!fecha_salida || !hora_salida || !tipo_tv_id || !plataformas_id) {
    //     return res.status(400).json({ mensaje: "faltan datos" });
    //   }

    //   dataAingresar.fecha_salida = fecha_salida;
    //   dataAingresar.hora_salida = hora_salida;
    //   dataAingresar.plataformas_id = plataformas_id;
    //   dataAingresar.tipo_tv_id = tipo_tv_id;
    // }
    soloLSoNull(dataAingresar.interurbano);
    await RegistroTorre.create(dataAingresar);

    return res.status(200).json({
      mensaje: "informe generado correctamente",
    });
  } catch (error) {
    return res.status(400).json({ mensaje: "error al generar ingreso" });
  }
};

const soloLSoNull = (interurbano) => {
  if (typeof interurbano === "string") {
    if (
      interurbano.toUpperCase() !== "L" &&
      interurbano.toUpperCase() !== "S"
    ) {
      interurbano = null;
    } else {
      interurbano = interurbano.toUpperCase();
    }
  }

  if (interurbano === undefined || typeof interurbano === "number") {
    interurbano = null;
  }
  return interurbano;
};

const getDataDropdown = async (req, res) => {
  try {
    const { rol } = req.usuario;

    const empresas = await Empresa.findAll({
      where: {
        borrado: {
          [Op.eq]: "0",
        },
      },
      order: [["empresa", "ASC"]],
    });
    const tipo_tv = await Tipo_tv.findAll();
    const plataformas = await Plataforma.findAll({
      where: {
        borrado: {
          [Op.eq]: "0",
        },
        disponible: {
          [Op.eq]: "1",
        },
      },
    });
    const servicios = await Servicio.findAll({
      where: {
        borrado: {
          [Op.eq]: "0",
        },
      },
    });
    let estados = await Estado.findAll();

    if (rol === 4) {
      //esto es para que solo muestre "ingresando y servicio sin plataforma"
      let estadosDisponibles = [];
      for (let estado of estados) {
        if (estado.id === 2 || estado.id === 3) {
          estadosDisponibles.push(estado);
        }
      }
      estados = estadosDisponibles;
    }
    respuesta = { empresas, servicios, estados, tipo_tv, plataformas };
    return res.status(200).json({ ...respuesta });
  } catch (error) {
    return res.status(400).json({ mensaje: error });
  }
};

const informesListadoSeparadosPorEstado = async (req, res) => {
  try {
    let diaHoy = moment().add(-2, "days");
    let diaAyer = diaHoy;
    let hora = diaHoy.format("HH:mm");
    let ingresos = await RegistroTorre.findAll({
      include: [
        "registro_empresa",
        "registro_plataforma",
        "registro_estado",
        "registro_tipo_tv",
        "registro_servicio",
      ],
      order: [
        ["fecha_ingreso", "DESC"],
        ["hora_ingreso", "DESC"],
      ],
      where: {
        fecha_ingreso: {
          [Op.gte]: diaAyer,
        },
      },
    });
    const respuesta = {
      fueraDePlataforma: [],
      enPlataforma: [],
      ingresando: [],
      ingresandoSeguridad: [],
    };

    ingresos.forEach((ingreso) => {
      const data = {
        id: ingreso.id,
        fecha_ingreso: ingreso.fecha_ingreso,
        horario_ingreso: modifyHours(ingreso.hora_ingreso),
        destino: ingreso.destino,
        interno: ingreso.interno,
        empresa: ingreso.registro_empresa.dataValues.empresa,
        servicio: ingreso.registro_servicio.dataValues.tipo_servicio,
        plataforma: ingreso.registro_plataforma?.dataValues?.plataforma,
        estado: ingreso.registro_estado.dataValues.tipo,
        fecha_salida: ingreso.fecha_salida,
        horario_salida: modifyHours(ingreso.hora_salida),
        tipo_tv: ingreso.registro_tipo_tv.dataValues.tipo,
        interurbano: ingreso.interurbano,
      };

      if (ingreso.estado_id === 2) {
        respuesta.ingresando.push(data);
      }
      if (ingreso.estado_id === 1) {
        respuesta.enPlataforma.push(data);
      }

      if (ingreso.estado_id === 4) {
        respuesta.fueraDePlataforma.push(data);
      }
      if (
        ingreso.estado_id === 1 ||
        ingreso.estado_id === 2 ||
        ingreso.estado_id === 3 ||
        ingreso.estado_id === 4
      ) {
        respuesta.ingresandoSeguridad.push(data);
      }
    });
    console.log(respuesta);
    return res.status(200).json({
      respuesta,
    });
  } catch (error) {
    console.log("error informes controller:", error);
    return res.status(400).json({ mensaje: error });
  }
};

const informesListado = async (req, res) => {
  try {
    let diaHoy = moment();
    let diaAyer = diaHoy.add(-1, "days");
    let hora = diaHoy.format("HH:mm");

    let ingresos = await RegistroTorre.findAll({
      include: [
        "registro_empresa",
        "registro_plataforma",
        "registro_estado",
        "registro_tipo_tv",
      ],
      order: [["fecha_ingreso"], ["hora_salida"]],
    });

    const respuesta = [];

    console.log("ingresos controller:", ingresos);

    ingresos.forEach((ingreso) => {
      respuesta.push({
        id: ingreso.id,
        destino: ingreso.destino,
        interno: ingreso.interno,
        empresa: ingreso.registro_empresa.dataValues.empresa,
        horario_salida: modifyHours(ingreso.hora_salida),
        plataforma: ingreso.registro_plataforma?.dataValues?.plataforma,
        estado: ingreso.registro_estado.dataValues.tipo,
        interurbano: ingreso.interurbano,
      });
    });

    return res.status(200).json({
      respuesta,
      hora,
    });
  } catch (error) {
    return res.status(400).json({ mensaje: error });
  }
};

const informesListadoPorRangoDeFechas = async (req, res) => {
  try {
    let { fechaDesde, fechaHasta } = req.query;
    let diaHoy = moment();
    let hora = diaHoy.format("HH:mm");

    if (
      fechaDesde.match(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/) ===
        null ||
      fechaHasta.match(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/) ===
        null
    ) {
      return res.status(400).json({ mensaje: "Error de fechas" });
    }

    fechaDesde = new Date(fechaDesde);
    fechaHasta = new Date(fechaHasta);

    let ingresos = await RegistroTorre.findAll({
      include: [
        "registro_empresa",
        "registro_plataforma",
        "registro_estado",
        "registro_tipo_tv",
        "registro_servicio",
      ],
      where: {
        fecha_ingreso: {
          [Op.lte]: fechaHasta,
          [Op.gte]: fechaDesde,
        },
      },
      order: [["hora_salida", "DESC"]],
    });

    const respuesta = [];

    ingresos.forEach((ingreso) => {
      respuesta.push({
        id: ingreso.id,
        fecha_ingreso: ingreso.fecha_ingreso,
        hora_ingreso: modifyHours(ingreso.hora_ingreso),
        destino: ingreso.destino,
        interno: ingreso.interno,
        empresa: ingreso.registro_empresa?.dataValues?.empresa,
        fecha_saldia: ingreso.hora_salida,
        hora_salida: modifyHours(ingreso.hora_salida),
        plataforma: ingreso.registro_plataforma?.dataValues?.plataforma,
        estado: ingreso.registro_estado?.dataValues?.tipo,
        servicio: ingreso.registro_servicio?.dataValues?.siglas,
        interurbano: ingreso.interurbano,
      });
    });

    return res.status(200).json({
      respuesta,
      hora,
    });
  } catch (error) {
    return res.status(400).json({ mensaje: error });
  }
};

const getInforme = async (req, res) => {
  try {
    const ingresoId = req.params.id;
    const diaHoy = moment();

    console.log(ingresoId);

    const ingresos = await RegistroTorre.findByPk(ingresoId, {
      include: [
        "registro_empresa",
        "registro_servicio",
        "registro_plataforma",
        "registro_estado",
        "registro_tipo_tv",
      ],
      // where: {
      //   id: ingresoId,
      // },
    });

    if (!ingresos) {
      return res.status(404).json({
        mensaje: "informe no encontrado",
      });
    }

    ingresos.dataValues.hora_ingreso = modifyHours(
      ingresos.dataValues.hora_ingreso
    );
    ingresos.dataValues.hora_salida = modifyHours(
      ingresos.dataValues.hora_salida
    );
    const empresa = await Empresa.findAll();
    const servicio = await Servicio.findAll();
    const plataforma = await Plataforma.findAll();
    const estado = await Estado.findAll();

    return res.status(200).json({
      ingresos,
      diaHoy,
      empresa,
      servicio,
      plataforma,
      estado,
      ingresoId,
    });
  } catch (error) {
    return res.status(400).json({ mensaje: error });
  }
};

const modificarInforme = async (req, res) => {
  try {
    const { id: usuario } = req.usuario;
    let ingresoId = req.params.id;
    const dataACambiar = {};

    const {
      estado_id: estado,
      destino,
      fecha_salida,
      hora_salida,
      plataformas_id: plataforma,
      fecha_ingreso,
      hora_ingreso,
      interno,
      empresa_id: empresa,
      servicios_id: servicio,
      tipo_tv,
      interurbano,
    } = req.body;

    // console.log("req.body:", req.body);

    const encontrado = await RegistroTorre.findOne({
      where: {
        id: ingresoId,
      },
    });

    if (encontrado != null) {
      //casos que no son contemplados
      // si toda la data es repetida con lo que ya esta en la base de datos
      if (estado != null) dataACambiar.estado_id = estado;
      if (destino != null) dataACambiar.destino = destino;
      if (fecha_salida != null) dataACambiar.fecha_salida = fecha_salida;
      if (hora_salida != null)
        dataACambiar.hora_salida = modifyHours(hora_salida);
      if (plataforma != null) dataACambiar.plataformas_id = plataforma;
      if (fecha_ingreso != null) dataACambiar.fecha_ingreso = fecha_ingreso;
      if (hora_ingreso != null)
        dataACambiar.hora_ingreso = modifyHours(hora_ingreso);
      if (interno != null) dataACambiar.interno = interno;
      if (tipo_tv != null) dataACambiar.tipo_tv_id = tipo_tv;
      if (empresa != null) dataACambiar.empresa_id = empresa;
      if (servicio != null) dataACambiar.servicios_id = servicio;
      if (usuario != null) dataACambiar.usuarios_id = usuario;
      if (interurbano !== undefined)
        dataACambiar.interurbano = soloLSoNull(interurbano);

      if (Object.keys(dataACambiar).length === 0) {
        return res
          .status(400)
          .json({ mensaje: "Se require al menos un dato a modificar" });
      }

      const modificacion = await RegistroTorre.update(dataACambiar, {
        where: {
          id: ingresoId,
        },
      });

      // console.log(modificacion);
      return res.status(200).json({ mensaje: "Modificacion exitosa" });
    } else {
      return res.status(400).json({ mensaje: "Informe no encontrado" });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({ mensaje: "Consulte administrador" });
  }
};

const modifyHours = (hour) => {
  if (hour) {
    let hourArray = hour.split(":");
    return `${hourArray[0]}:${hourArray[1]}`;
  } else {
    return null;
  }
};

module.exports = {
  informesListado,
  getInforme,
  modificarInforme,
  addInforme,
  getDataDropdown,
  informesListadoSeparadosPorEstado,
  informesListadoPorRangoDeFechas,
};
