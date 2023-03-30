module.exports = (sequelize, dataTypes) => {

    let alias = 'Operacion';
    let cols = {
      id: {
        type: dataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      tipo_operacion: {
        type: dataTypes.STRING(45),
        allowNull: false,
      }
    };
    let config = {
      tableName: 'operacion',
      timestamps: false
    }
    const Operacion = sequelize.define(alias, cols, config);
  
    Operacion.associate = function (models) {

      Operacion.hasMany(models.RegistroAdministrativoLog, {
        as: "registro_operacion",
        foreignKey: "operacion_id",
      });
    }
  
    return Operacion
  }