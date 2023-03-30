module.exports = (sequelize, dataTypes) => {
  let alias = "Usuario";
  let cols = {
    id: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: dataTypes.STRING(45),
      allowNull: false,
    },
    apellido: {
      type: dataTypes.STRING(45),
      allowNull: false,
    },
    usuario: {
      type: dataTypes.STRING(45),
      allowNull: false,
    },
    password: {
      type: dataTypes.STRING(200),
      allowNull: false,
    },
    roles_id: dataTypes.BIGINT(11),
    estado_password: dataTypes.BIGINT(2),
  };
  let config = {
    tableName: "usuarios",
    timestamps: false,
    // createdAt: 'created_at',
    // updatedAt: 'updated_at',
    // deletedAt: false
  };
  const Usuario = sequelize.define(alias, cols, config);

  Usuario.associate = function (models) {
    Usuario.belongsTo(models.Rol, {
      as: "rol_usuario",
      foreignKey: "roles_id",
    });

    Usuario.hasMany(models.RegistroAdministrativo, {
      as: "registro_usuario",
      foreignKey: "usuarios_id",
    });
    Usuario.hasMany(models.Marquesina, {
     as: "marquesina_usuarios",
      foreignKey: "usuarios_id",
    });
  };

  return Usuario;
};
