module.exports = (sequelize, dataTypes) => {
  let alias = "Interurbano";
  let cols = {
    id: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    empresa_id: dataTypes.BIGINT(11),
    desde: dataTypes.BIGINT(11),
    hasta: dataTypes.BIGINT(11),
  };
  let config = {
    tableName: "interurbanos",
    timestamps: false,
  };
  const Interurbano = sequelize.define(alias, cols, config);

  Interurbano.associate = function (models) {
    Interurbano.belongsTo(models.Plataforma, {
      as: "plataforma_desde",
      foreignKey: "desde",
    });
    Interurbano.belongsTo(models.Plataforma, {
      as: "plataforma_hasta",
      foreignKey: "hasta",
    });
    Interurbano.belongsTo(models.Empresa, {
      as: "empresa",
      foreignKey: "empresa_id",
    });
  };

  return Interurbano;
};
