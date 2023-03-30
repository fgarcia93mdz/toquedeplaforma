module.exports = (sequelize, dataTypes) => {

    let alias = 'Servicio';
    let cols = {
      id: {
        type: dataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      siglas: {
        type: dataTypes.STRING(45),
        allowNull: false,
      },
      tipo_servicio: {
        type: dataTypes.STRING(45),
        allowNull: false,
      },
      borrado: dataTypes.BIGINT(2),
    };
    let config = {
      tableName: 'servicios',
      timestamps: false
    }
    const Servicio = sequelize.define(alias, cols, config);
  
    Servicio.associate = function (models) {
  
      Servicio.hasMany(models.RegistroAdministrativo,{
        as: "registro_servicio",
        foreignKey: "servicios_id"
      })

      Servicio.hasMany(models.Plataforma,{
        as: "plataforma_servicio",
        foreignKey: "servicios_id"
      })

    }
  
    return Servicio
  }