// Modules for ORM and MODELS
const { where } = require("sequelize");
const Deal = require("../models/Deal");
const User = require("../models/User");

module.exports = class DealController {
  //static async showDeals(req, res) {
  //  res.render("deals/home");
  //}

  // show the deals for one user
  static async dashboard(req, res) {
    const id = req.params.id;
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
        res.redirect(`/deals/dashboard/${deal.UserId}`);
      });
    } catch (error) {
      console.log("Aconteceu um erro: " + error);
    }
  }
  // Update deal
  static updateDeal(req, res) {
    const id = req.params.id;
    
    Deal.findOne({ where: { id: id }, raw: true })
    .then((deal) => {
      res.render("deals/update", { deal });
      })
      .catch((error) => {
        console.log("Aconteceu um erro: " + error);
      });
  }

  // Update deal POST
  static async updateDealPost(req, res) {
    const id = req.body.id;

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
    Deal.update(deal, { where: { id: id } })
      .then(() => {
        req.flash("message", "Transação editada com sucesso!");
        req.session.save(() => {
          res.redirect(`/deals/dashboard/${req.session.userid}`);
        });
      })
      .catch((error) => {
        console.log("Aconteceu um erro: " + error);
      });
  }

  // Remove a deal
  static removeDeal(req, res) {
    const id = req.params.id;

    Deal.destroy({ where: { id: id } })
      .then(() => {
        req.flash("message", "Transação removida com sucesso!");
        req.session.save(() => {
          res.redirect(`/deals/dashboard/${req.session.userid}`);
        });
      })
      .catch((error) => {
        console.log("Aconteceu um erro: " + error);
      });
  }
};
