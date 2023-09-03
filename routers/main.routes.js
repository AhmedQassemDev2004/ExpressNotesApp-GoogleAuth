const mainRouter = require("express").Router(); 
const mainController = require("../controllers/main.controller");
const noAuth = require("../middlewares/no-auth.middleware");

mainRouter.get("/",noAuth,mainController.homePage);

module.exports = mainRouter;