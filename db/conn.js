require("dotenv").config();
const dbHost = process.env.DB_HOST;
const dbName = process.env.DB_NAME;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;

const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  dialect: "postgres",
  ssl: true,
  dialectOptions: {
    /*
    ssl: {
      require: true,
      rejectUnauthorized: false, // Para resolver erros de certificado SSL
    },
    
    */
    ssl: false, // Desabilita SSL
  },
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Conectado com o banco!");
  } catch (error) {
    console.error(`Não foi possível conectar: ${error}`);
  }
})();

module.exports = sequelize;
