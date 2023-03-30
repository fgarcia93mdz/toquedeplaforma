module.exports = (sequelize, dataTypes) => {
  let alias = "Marquesina";
  let cols = {
    id: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    texto: {
      type: dataTypes.STRING(200),
      allowNull: false,
    },
    usuarios_id: dataTypes.BIGINT(11),
    estado: dataTypes.BIGINT(2),
  };
  let config = {
    tableName: "marquesina",
    timestamps: false,
    createdAt: "created_at",
  };
  const Marquesina = sequelize.define(alias, cols, config);

  Marquesina.associate = function (models) {
    Marquesina.belongsTo(models.Usuario, {
      as: "usuario_id",
      foreignKey: "usuarios_id",
    });
  };

  return Marquesina;
};
