var express = require("express"),
  config = require("./config/config"),
  glob = require("glob"),
  mongoose = require("mongoose"),
  session = require("express-session"),
  mongoStore = require("connect-mongo")(session);

/** @namespace config.db */
/** @namespace config.root */
/** @namespace config.port */
mongoose.connect(config.db);                                            // Initialize mongoose drivers & connect to DB.
var db = mongoose.connection;
db.on("error", function() {
  throw new Error("unable to connect to database at " + config.db);
});

var models = glob.sync(config.root + "/app/models/*.js");               // Import model definitions from models directory
models.forEach(function(model) {
  require(model);
});

var app = express();                                                    // Create http server (done by express.js)

db.once("open", function() {                                            // Code to run once DB connection is active.
  var sessionStore = new mongoStore({                                   // mongoose.connection is not available until the mongodb connection has
    mongooseConnection: mongoose.connection,                            // been established. Hence, the db.once('open')
    stringify: true,
    touchAfter: 24 * 3600
  });
  require("./config/express")(app, config, sessionStore);             // Call function exported from config/express.js, passing it arguments from here
  app.listen(config.port, function() {                                // Listen for connections on the port defined in config/config.js
    console.log("Express server listening on port " + config.port);
  });
});
