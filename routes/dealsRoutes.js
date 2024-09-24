// Modules for express and MVC
const express = require("express");
const router = express.Router();
const DealController = require("../controllers/DealController");

// helper
const checkAuth = require("../helpers/auth").checkAuth;

router.get("/add", checkAuth, DealController.createDeal);
router.post("/add", checkAuth, DealController.createDealSave);
router.post("/remove/:id", checkAuth, DealController.removeDeal);
router.get("/edit/:id", checkAuth, DealController.updateDeal);
router.post("/edit", checkAuth, DealController.updateDealPost);
router.get("/dashboard", checkAuth, DealController.dashboard);
router.get("/", checkAuth, DealController.removeAllDeal);
router.get("/show/:id", checkAuth, DealController.showDeal);
//router.get("/", DealController.showDeals);
router.get("/grafico", DealController.showDealGrafic);
router.get("/graficoMes", DealController.gerarGraficoMes);

module.exports = router;
