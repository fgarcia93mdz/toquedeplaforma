module.exports = {
  development: {
    username: "root",
    password: "",
    database: "torreter_db",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  //Usar esta cuando se hace modificaciones en el back para que pegue a la base de datos, hay que sacar el '_servidor'
  development_servidor: {
    username: "torreter",
    password: "003689Fgg$",
    database: "torreter_db",
    host: "127.0.0.1",
    dialect: "mysql",
  },

  production: {
    username: "root",
    password: "root",
    database: "database_production",
    host: "127.0.0.1",
    dialect: "mysql",
  },
};
