var express = require("express"),
  router = express.Router(),
  mongoose = require("mongoose");

module.exports = function(app, config, auth, passport) {
  app.use("/", router);

  var isAuthenticated = auth.requireAuth();

  router.get("/", isAuthenticated, function(req, res, next) {
    res.render("index", {
      title: "Home"
    });
  });

  router.get("/login", function(req, res) {
    if (req.isAuthenticated()) {
      res.redirect("/");
      return;
    }
    res.render("login-form", {
      title: "Login"
    });
  });

  router.post("/login",
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: "Invalid credentials"
    }),
    function(req, res) {
      if (req.body.rememberMe) {
        req.session.cookie.maxAge = 48 * 3600000;
      }
      res.redirect(req.session.returnPath || "/");
    }
  );

  router.get("/logout", isAuthenticated, function(req, res) {
    req.logout();
    req.session.destroy(function(err) {
      if (err) {
        next(err);
        return;
      }
      res.redirect("/login");
    });
  });
};

