const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("postgres://control_finance_9s7j_user:Y4YAhJgT326wnnJnbzaUCCxQLQrhZtiU@dpg-cnqishsf7o1s73cj54eg-a/control_finance_9s7j");

try {
  sequelize.authenticate();
  console.log("Conectado com o banco!");
} catch (error) {
  console.log(`Não foi possível conecta: ${error}`);
}

module.exports = sequelize;
