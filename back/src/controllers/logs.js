const db = require("../database/models");
const LogsRegistros = db.RegistroAdministrativoLog;
const LogsUsuarios = db.UsuarioLog;
const { Op, Sequelize } = require("sequelize");
const moment = require("moment");
const ExcelJs = require("exceljs");

const getLogs = async (req, res) => {
  //nota: estos son los query parameters para filtrar
  //req.query.fechaInicio
  //req.query.fechaFin
  //req.query.interno
  //req.query.empresaId
  try {
    // let mesActual = moment().add(-1, "month");
    // let mesMenosUno = moment().add(-1, "month");
    const tresDiasAtras = moment()
      .tz("America/Argentina/Buenos_Aires")
      .add(-2, "days");
    // .format("YYYY-MM-DD");

    // let diaAyer = diaHoy;
    // let hora = diaHoy.format("HH:mm");
    let customWhere = {};

    Object.assign(
      customWhere,
      req.query.fechaInicio && req.query.fechaFin
        ? {
            createdAt: {
              [Op.between]: [req.query.fechaInicio, req.query.fechaFin],
            },
          }
        : {
            // createdAt: {
            //   [Op.gte]: tresDiasAtras,
            // },
          },
      req.query.interno ? { interno: req.query.interno } : null,
      req.query.empresaId ? { empresa_id: req.query.empresaId } : null
    );

    // let mesMenosUno = mesActual.format("YYYY/MM/DD");

    let page = 0;
    let size = 100;

    const pageAsNumber = Number.parseInt(req.query.page);
    const sizeAsNumber = Number.parseInt(req.query.size);

    if (!Number.isNaN(pageAsNumber) && pageAsNumber > 0) {
      page = pageAsNumber;
    }
    if (!Number.isNaN(sizeAsNumber) && sizeAsNumber > 0 && sizeAsNumber < 100) {
      size = sizeAsNumber;
    }
    let registros = await LogsRegistros.findAndCountAll({
      limit: size,
      offset: page * size,
      include: [
        "registro_empresa",
        "registro_plataforma",
        "registro_estado",
        "registro_servicio",
        "registro_usuario",
        "registro_operacion",
      ],
      // order: [["createdAt"], ["id_registro"]],
      order: [["createdAt", "DESC"]],
      where: customWhere,
      raw: true,
      nest: true,
    });
    registros.rows.forEach((registro) => {
      registro.hora_ingreso = modifyHours(registro.hora_ingreso);
      registro.hora_salida = modifyHours(registro.hora_salida);
      // let hourSplit = registro.createdAt.toLocaleString().split(", ");
      registro.createdAt = moment(registro.createdAt).format(
        "YYYY-MM-DD HH:mm"
      );
    });

    return res
      .status(200)
      .json({ registros, paginasTotales: Math.ceil(registros.count / size) });
  } catch (error) {
    // console.log(error);
    return res.status(400).json({ error });
  }
};

const getLogsOfMonthAndYear = async (req, res) => {
  const month = req.query.month;
  const year = req.query.year;
  try {
    let registros = await LogsRegistros.findAll({
      include: [
        "registro_empresa",
        "registro_plataforma",
        "registro_estado",
        "registro_servicio",
        "registro_usuario",
        "registro_operacion",
      ],
      order: [["createdAt", "ASC"]],
      where: {
        [Op.and]: [
          Sequelize.where(
            Sequelize.fn("MONTH", Sequelize.col("createdAt")),
            month
          ),
          Sequelize.where(
            Sequelize.fn("YEAR", Sequelize.col("createdAt")),
            year
          ),
        ],
      },
      raw: true,
      nest: true,
    });

    let respuesta = [];

    // console.log(registros.length);

    if (registros.length === 0) {
      return res.status(404).json({ mensaje: "no hay logs en ese mes" });
    }

    registros.forEach((registro) => {
      let nuevoRegistro = {};
nuevoRegistro.id_registro = registro.id;
      nuevoRegistro.id = registro.id_registro;
      nuevoRegistro.createdAt = moment(registro.createdAt).format(
        "YYYY-MM-DD HH:mm"
      );
      nuevoRegistro.usuario = registro.registro_usuario.usuario;
      nuevoRegistro.operacion = registro.registro_operacion.tipo_operacion;
      nuevoRegistro.empresa = registro.registro_empresa.empresa;
      nuevoRegistro.destino = registro.destino;
      nuevoRegistro.fecha_ingreso = registro.fecha_ingreso;
      nuevoRegistro.hora_ingreso = modifyHours(registro.hora_ingreso);
      nuevoRegistro.interno = registro.interno;
      nuevoRegistro.servicio = registro.registro_servicio.siglas;
      nuevoRegistro.fecha_salida = registro.fecha_salida;
      nuevoRegistro.hora_salida = modifyHours(registro.hora_salida);
      nuevoRegistro.plataforma = registro.registro_plataforma.plataforma;
      nuevoRegistro.estado = registro.registro_estado.tipo;
      // nuevoRegistro.interurbano = registro.interurbano;
      if (registro.interurbano !== null) {
        if (registro.interurbano === "L") {
          nuevoRegistro.interurbano = "Llegada";
        } else {
          nuevoRegistro.interurbano = "Salida";
        }
      } else {
        nuevoRegistro.interurbano = "";
      }
      respuesta.push(nuevoRegistro);
    });

    const workbook = new ExcelJs.Workbook();
    const worksheet = workbook.addWorksheet("Logs mensuales");
    worksheet.columns = [
      { header: "REGISTRO ID", key: "id_registro", width: 10 },
      { header: "Nº TICKET", key: "id", width: 10 },
      { header: "CREACIÓN DEL REGISTRO", key: "createdAt", width: 25 },
      { header: "USUARIO", key: "usuario", width: 20 },
      { header: "OPERACIÓN", key: "operacion", width: 20 },
      { header: "EMPRESA", key: "empresa", width: 20 },
      { header: "DESTINO/ORIGEN/SERVICIO", key: "destino", width: 25 },
      { header: "FECHA DE INGRESO", key: "fecha_ingreso", width: 20 },
      { header: "HORARIO DE INGRESO", key: "hora_ingreso", width: 20 },
      { header: "INTERNO", key: "interno", width: 10 },
      { header: "SERVICIO", key: "servicio", width: 10 },
      { header: "FECHA DE SALIDA", key: "fecha_salida", width: 20 },
      { header: "HORARIO DE SALIDA", key: "hora_salida", width: 20 },
      { header: "PLAT", key: "plataforma", width: 20 },
      { header: "ESTADO", key: "estado", width: 25 },
      { header: "INTERURBANO", key: "interurbano", width: 15 },
    ];

    worksheet.addRows(respuesta);
    // await workbook.xlsx.writeFile("logs_mensuales.xlsx");

    var fileName = "logs.xlsx";

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader("Content-Disposition", "attachment; filename=" + fileName);

    return workbook.xlsx.write(res).then(function () {
      res.status(200).end();
    });

    // return res.status(200).json({ registros } );
    return res.status(200).json({});
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error });
  }
};

const getLogsUsuarios = async (req, res) => {
  try {
    let usuarios = await LogsUsuarios.findAll({
      order: [["createdAt", "DESC"]],
      raw: true,
      nest: true,
    });

    usuarios.forEach((usuario) => {
      let hourSplit = usuario.createdAt.toLocaleString().split(", ");
      usuario.createdAt = `${hourSplit[0]} ${hourSplit[1].slice(0, -3)}`;
    });

    return res.status(200).json({ usuarios });
  } catch (error) {
    return res.status(400).json({ error });
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
  getLogs,
  getLogsOfMonthAndYear,
  getLogsUsuarios,
};
