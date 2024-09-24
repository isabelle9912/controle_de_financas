// Modules for ORM and MODELS
const { where } = require("sequelize");
const Deal = require("../models/Deal");
const User = require("../models/User");
const axios = require("axios");

module.exports = class DealController {
  //static async showDeals(req, res) {
  //  res.render("deals/home");
  //}

  static async gerarGraficoMes(req, res) {
    // Pegar o id do usuário logado
    const id = Number(req.session.userid);

    // Obter o mês mandado pela url nas querys
    const month = req.query.month;

    // Faz requisição no data base com base no usuário logado e o mês
    const dealsData = await Deal.findAll({ where: { UserId: id, month } });

    // Formatando os dados
    const mappedDeals = dealsData.map((deal) => ({
      id: deal.id,
      title: deal.title,
      type: deal.type,
      value: deal.value,
      day: deal.day,
      month: deal.month,
      year: deal.year,
      category: deal.category,
    }));

    // Ver os dado formatados
    console.log("Dados enviados para o Flask:", mappedDeals);

    try {
      // Fazendo requisição na api python enviandos os dados do data base
      const response = await axios.post(
        "http://localhost:5000/GerarGraficoCategorias",
        mappedDeals
      );

      // Obtendo os dados retornados pela api python
      const imageBase64 = response.data.image;

      // Enviando o código da imagem para a página
      res.render("graphic/graphicMonth", { grafico: imageBase64 });
    } catch (error) {
      console.error("Erro ao gerar gráfico:", error);
      res.status(500).send("Erro ao gerar gráfico");
    }
  }

  static async showDealGrafic(req, res) {
    const id = Number(req.session.userid);

    const dealsData = await Deal.findAll({ where: { UserId: id } });

    const mappedDeals = dealsData.map((deal) => ({
      month: deal.month,
      value: deal.value,
    }));

    console.log("Dados enviados para o Flask:", mappedDeals); // Verificar estrutura dos dados

    try {
      const response = await axios.post(
        "http://localhost:5000/gerarGrafico",
        mappedDeals
      );

      const imageBase64 = response.data.image;
      res.render("graphic/graphicView", { grafico: imageBase64 });
    } catch (error) {
      console.error("Erro ao gerar gráfico:", error);
      res.status(500).send("Erro ao gerar gráfico");
    }
  }

  static async showDeal(req, res) {
    const id = Number(req.params.id);

    const deal = await Deal.findOne({ where: { id } });

    console.log(deal.dataValues);

    res.render("deals/deal", { deal: deal.dataValues });
  }

  // show the deals for one user
  static async dashboard(req, res) {
    const id = Number(req.session.userid);

    const { month, year, category } = req.query;

    try {
      let deals;
      let selectedMonth = month;
      let selectedYear = year;
      let selectedCategory = category;

      if (month && year && category) {
        deals = await Deal.findAll({
          where: {
            UserId: id,
            month: month,
            year: year,
            category: category,
          },
        });
      } else {
        deals = await Deal.findAll({ where: { UserId: id } });
        selectedMonth = "";
        selectedYear = "";
        selectedCategory = "";
      }

      const mappedDeals = deals.map((deal) => deal.dataValues);

      // Calc sum the deals where type is "entrada" AND "Saida"
      const totalInputs = deals.reduce((acc, deal) => {
        if (deal.type === "Entrada") {
          acc += deal.value;
        }
        return acc;
      }, 0);

      const totalOutputs = deals.reduce((acc, deal) => {
        if (deal.type === "Saida") {
          acc += deal.value;
        }
        return acc;
      }, 0);

      res.render("deals/dashboard", {
        deals: mappedDeals,
        selectedMonth,
        selectedYear,
        selectedCategory,
        totalInputs,
        totalOutputs,
      });
    } catch (error) {
      console.log("Aconteceu um erro: " + error);
    }
  }
  // Create new deal
  static createDeal(req, res) {
    res.render("deals/create");
  }

  // Save deal
  static async createDealSave(req, res) {
    const deal = {
      title: req.body.title,
      value: req.body.value,
      day: req.body.day,
      month: req.body.month,
      year: req.body.year,
      type: req.body.type,
      category: req.body.category,
      UserId: req.session.userid,
    };

    try {
      await Deal.create(deal);

      req.flash("message", "Transação adicionada com sucesso!");

      req.session.save(() => {
        res.redirect("/deals/dashboard");
      });
    } catch (error) {
      console.log("Aconteceu um erro: " + error);
    }
  }
  // Update deal
  static updateDeal(req, res) {
    const id = Number(req.params.id);

    Deal.findOne({ where: { id }, raw: true })
      .then((deal) => {
        res.render("deals/update", { deal });
      })
      .catch((error) => {
        console.log("Aconteceu um erro: " + error);
      });
  }

  // Update deal POST
  static async updateDealPost(req, res) {
    const id = Number(req.body.id);

    const deal = {
      title: req.body.title,
      value: req.body.value,
      day: req.body.day,
      month: req.body.month,
      year: req.body.year,
      type: req.body.type,
      category: req.body.category,
      UserId: req.session.userid,
    };
    // where for deal.id
    Deal.update(deal, { where: { id } })
      .then(() => {
        req.flash("message", "Transação editada com sucesso!");
        req.session.save(() => {
          res.redirect("/deals/dashboard");
        });
      })
      .catch((error) => {
        console.log("Aconteceu um erro: " + error);
      });
  }

  // Remove a deal
  static removeDeal(req, res) {
    const id = Number(req.params.id);

    Deal.destroy({ where: { id } })
      .then(() => {
        req.flash("message", "Transação removida com sucesso!");
        req.session.save(() => {
          res.redirect("/deals/dashboard");
        });
      })
      .catch((error) => {
        console.log("Aconteceu um erro: " + error);
      });
  }

  static removeAllDeal(req, res) {
    const id = Number(req.session.userid);

    Deal.destroy({ where: { UserId: id } })
      .then(() => {
        req.flash(
          "message",
          "Todas as transações foram deletadas com sucesso!"
        );
        req.session.save(() => {
          res.redirect("/deals/dashboard");
        });
      })
      .catch((error) => {
        console.log("Aconteceu um erro: " + error);
        res.redirect("/deals/dashboard");
      });
  }
};
