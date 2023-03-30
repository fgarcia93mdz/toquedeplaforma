module.exports = (sequelize, dataTypes) => {

  let alias = 'Empresa';
  let cols = {
    id: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    empresa: {
      type: dataTypes.STRING(45),
      allowNull: false
    },
    siglas: {
      type: dataTypes.STRING(10),
      allowNull: false
    },
    img: {
      type: dataTypes.STRING(200),
    },
    cuit: {
      type: dataTypes.STRING(100),
      allowNull: false
    },
    borrado: dataTypes.BIGINT(2),
  };

  let config = {
    tableName: 'empresa',
    timestamps: false
  }

  const Empresa = sequelize.define(alias, cols, config);

  Empresa.associate = function (models) {

    Empresa.hasMany(models.RegistroAdministrativo, {
      as: "registro_empresa",
      foreignKey: "empresa_id"
    })
    Empresa.hasMany(models.Interurbano, {
      as: "interurbano_empresa",
      foreignKey: "empresa_id",
    });
  }

  return Empresa
}