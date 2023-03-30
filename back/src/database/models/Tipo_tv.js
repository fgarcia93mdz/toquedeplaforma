module.exports = (sequelize, dataTypes) => {

    let alias = 'Tipo_tv';
    let cols = {
      id: {
        type: dataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      tipo: {
        type: dataTypes.STRING(45),
        allowNull: false
      },
    };

    let config = {
      tableName: 'tipo_tv',
      timestamps: false
    }
    const Tipo_tv = sequelize.define(alias, cols, config);
  
    Tipo_tv.associate = function (models) {
  
      Tipo_tv.hasMany(models.RegistroAdministrativo, {
        as: "tipo_tv_registro",
        foreignKey: "tipo_tv_id"
      })

    }
  
    return Tipo_tv
  }