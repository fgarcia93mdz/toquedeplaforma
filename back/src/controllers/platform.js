/*  == PLATFORM CONTROLLER == */

//NO CONFUNDIR CON PLATAFORMAS.JS
//NO CONFUNDIR CON PLATAFORMAS.JS
//NO CONFUNDIR CON PLATAFORMAS.JS
//NO CONFUNDIR CON PLATAFORMAS.JS

const path = require("path");
const fs = require("fs");
const { Op } = require("sequelize");

let db = require("../database/models");
let sequelize = require("sequelize");
const RegistroTorre = db.RegistroAdministrativo;
const moment = require("moment");

const platformController = {
  locals: function (req, res) {},

  arrivals: function (req, res) {
    const diaHoy = moment().add(-2, "days");
    const diaAyer = diaHoy;
    // console.log("?");
    let registroArribos = db.RegistroAdministrativo.findAll({
      include: [
        { association: "registro_empresa" },
        { association: "registro_estado" },
        { association: "registro_servicio" },
        { association: "registro_tipo_tv" },
        { association: "registro_plataforma" },
      ],
      order: [["hora_ingreso", "DESC"]],
      where: {
        [Op.and]: [
          { tipo_tv_id: 1 },
          {
            fecha_ingreso: {
              [Op.gt]: diaAyer,
            },
          },
          {
            estado_id: 1,
          },
          {
            plataformas_id: {
              [Op.gt]: 1,
            },
          },
        ],
      },
    });

    registroArribos
      .then((data) => {
        data.forEach((element) => {
          if (element.hora_ingreso) {
            element.hora_ingreso = modifyHours(element.hora_ingreso);
          }
          if (element.hora_salida) {
            element.hora_salida = modifyHours(element.hora_salida);
          }
        });
        res.json(data);
      })
      .catch((error) => console.log("error", error));
  },

  departures: function (req, res) {
    const diaHoy = moment().add(-2, "days");
    const diaAyer = diaHoy;
    let registroPartidas = db.RegistroAdministrativo.findAll({
      include: [
        { association: "registro_empresa" },
        { association: "registro_estado" },
        { association: "registro_servicio" },
        { association: "registro_tipo_tv" },
        { association: "registro_plataforma" },
      ],
      order: [["hora_salida", "DESC"]],
      where: {
        [Op.and]: [
          { tipo_tv_id: 2 },
          {
            fecha_salida: {
              [Op.gt]: diaAyer,
            },
          },
          {
            estado_id: 1,
          },
          {
            plataformas_id: {
              [Op.gt]: 1,
            },
          },
        ],
      },
    });

    registroPartidas
      .then((data) => {
        data.forEach((element) => {
          if (element.hora_ingreso) {
            element.hora_ingreso = modifyHours(element.hora_ingreso);
          }
          if (element.hora_salida) {
            element.hora_salida = modifyHours(element.hora_salida);
          }
        });
        res.json(data);
      })
      .catch((error) => console.log(error));
  },

  createTicket: function (req, res) {
    // const userLogged = req.session.userLogged;
    // let usuario = Usuario.findOne({
    //   where: {
    //     id: 2,
    //   },
    // });
    // RegistroTorre.create({
    //     fecha_ingreso: req.body.fecha_ingreso,
    //     hora_ingreso: req.body.hora_ingreso,
    //     interno: req.body.interno,
    //     empresa_id: req.body.empresa_id,
    //     servicios_id: req.body.servicios_id,
    //     usuarios_id: req.body.usuarios_id,
    //     estado_id: req.body.estado_id,
    //     destino: req.body.destino,
    //     plataformas_id: req.body.plataformas_id
    // }).then(() => {
    //     return res.json('exito');
    // }).catch( err => console.log(err))
  },
};

const modifyHours = (hour) => {
  if (hour) {
    let hourArray = hour.split(":");
    return `${hourArray[0]}:${hourArray[1]}`;
  } else {
    return null;
  }
};

module.exports = platformController;
