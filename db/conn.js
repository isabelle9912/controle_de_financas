const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("postgres://control_finance_iy4e_user:42ptrfU2jx9MDDwaIfHhtxrbWdBnIrwp@dpg-cnqju36n7f5s7387ssl0-a/control_finance_iy4e");

try {
  sequelize.authenticate();
  console.log("Conectado com o banco!");
} catch (error) {
  console.log(`Não foi possível conecta: ${error}`);
}

module.exports = sequelize;
