require("dotenv").config();
const dbHost = process.env.PGHOST;
const dbName = process.env.PGDATABASE;
const dbUser = process.env.PGUSER;
const dbPassword = process.env.PGPASSWORD;

const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  dialect: "postgres",
  ssl: true,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // Para resolver erros de certificado SSL
    },
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
