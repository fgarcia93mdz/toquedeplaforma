module.exports = (sequelize, dataTypes) => {
  let alias = "RegistroAdministrativoLog";
  let cols = {
    id: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    fecha_ingreso: {
      type: dataTypes.DATE,
      allowNull: false,
    },
    hora_ingreso: {
      type: dataTypes.TIME,
      allowNull: false,
    },
    interno: {
      type: dataTypes.INTEGER,
    },
    fecha_salida: {
      type: dataTypes.DATE,
    },
    hora_salida: {
      type: dataTypes.TIME,
    },
    destino: {
      type: dataTypes.STRING(45),
    },
    empresa_id: dataTypes.BIGINT(11),
    usuarios_id: dataTypes.BIGINT(11),
    id_registro: dataTypes.BIGINT(11),
    operacion_id: dataTypes.BIGINT(11),
    servicios_id: dataTypes.BIGINT(11),
    usuarios_id: dataTypes.BIGINT(11),
    operacion_id: dataTypes.BIGINT(11),
    plataformas_id: {
      type: dataTypes.BIGINT(11),
      allowNull: true,
    },
    estado_id: dataTypes.BIGINT(11),
    interurbano: {
      type: dataTypes.STRING(1),
    },
    createdAt: {
      type: dataTypes.DATE,
    },
  };
  let config = {
    tableName: "registro_administrativo_log",
    timestamps: false,
    createdAt: "created_at",
  };
  const RegistroAdministrativoLog = sequelize.define(alias, cols, config);

  RegistroAdministrativoLog.associate = function (models) {
    RegistroAdministrativoLog.belongsTo(models.Empresa, {
      as: "registro_empresa",
      foreignKey: "empresa_id",
    });

    RegistroAdministrativoLog.belongsTo(models.Estado, {
      as: "registro_estado",
      foreignKey: "estado_id",
    });

    RegistroAdministrativoLog.belongsTo(models.Usuario, {
      as: "registro_usuario",
      foreignKey: "usuarios_id",
    });

    RegistroAdministrativoLog.belongsTo(models.Servicio, {
      as: "registro_servicio",
      foreignKey: "servicios_id",
    });

    RegistroAdministrativoLog.belongsTo(models.Plataforma, {
      as: "registro_plataforma",
      foreignKey: "plataformas_id",
    });

    RegistroAdministrativoLog.belongsTo(models.Operacion, {
      as: "registro_operacion",
      foreignKey: "operacion_id",
    });
  };

  return RegistroAdministrativoLog;
};
