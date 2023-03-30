module.exports = (sequelize, dataTypes) => {

  let alias = 'UsuarioEliminado';
  let cols = {

    id: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    motivo: {
      type: dataTypes.STRING(100),
      allowNull: false
    },
    nombre: {
      type: dataTypes.STRING(100),
      allowNull: false
    },
    apellido: {
      type: dataTypes.STRING(100),
      allowNull: false
    },
    usuario_eliminado: {
      type: dataTypes.STRING(100),
      allowNull: false
    },

  };
  let config = {
    tableName: 'usuario_eliminado',
    timestamps: false,
    createdAt: 'created_at',
    // updatedAt: 'updated_at',
    // deletedAt: false
  }
  const UsuarioEliminado = sequelize.define(alias, cols, config);

  UsuarioEliminado.associate = function (models) {

  }

  return UsuarioEliminado
}