var mongoose = require("mongoose");

module.exports = function(auth) {
  auth.requireAuth = function() {
    return function(req, res, next) {
      if (req.isAuthenticated()) {
        res.locals.currentUser = req.user;
        next();
      }
      else {
        req.session.returnPath = req.originalUrl;
        res.redirect("/login");
      }
    };
  };
};
