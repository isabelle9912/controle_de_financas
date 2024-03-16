const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("control_finance_59w0", "control_finance_59w0_user", "hCx67oP297zfcB5EJPDAmxlPJsi40ung", {
  host: "dpg-cnqqp521hbls73dse8hg-a",
  dialect: "postgres",
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
