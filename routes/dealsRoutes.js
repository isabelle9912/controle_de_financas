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
router.get("/dashboard/:id", checkAuth, DealController.dashboard);
//router.get("/", DealController.showDeals);

module.exports = router;
