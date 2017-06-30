var LocalStrategy = require("passport-local").Strategy;

module.exports = function(passport) {
  passport.use(new LocalStrategy({
      userNameField: "email",
      passwordField: "password"
    },
    function(username, password, done) {
      if (username === "a" && password === "changeme") {
        done(null, {_id: "agj619@gmail.com"});
      }
      else {
        done(null, false);
      }
    }
  ));

  passport.serializeUser(function(user, done) {
    done(null, user._id);
  });

  passport.deserializeUser(function(id, done) {
    done(null, {_id: "agj619@gmail.com"});
  });
};

