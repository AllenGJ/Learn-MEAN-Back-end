var mongoose = require("mongoose"),
  async = require("async"),
  express = require("express"),
  router = express.Router();
var User = mongoose.model("User"),
  Role = mongoose.model("UserRole");

module.exports = function(app, auth) {
  app.use("/user", router);

  router.get("/create", function(req, res) {
    res.render("user/create-user.ejs", {
      title: "Create User"
    });
  });
};
