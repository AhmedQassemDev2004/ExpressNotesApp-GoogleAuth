const dashboardRouter = require("express").Router(); 
const dashboardController = require("../controllers/dashboard.controller")
const authRequired = require("../middlewares/auth.middleware");

dashboardRouter.get("/",authRequired,dashboardController.index);
dashboardRouter.get("/add",authRequired,dashboardController.add);


dashboardRouter.post("/add",authRequired,dashboardController.storeNote);

dashboardRouter.get("/note/:id",authRequired,dashboardController.getNote);
dashboardRouter.put("/note/:id",authRequired,dashboardController.updateNote);
dashboardRouter.delete("/note/:id",authRequired,dashboardController.deleteNote);


module.exports = dashboardRouter;