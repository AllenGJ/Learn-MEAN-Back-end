var express = require('express');
var glob = require('glob');

var favicon = require('serve-favicon');
var logger = require('winston');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var compress = require('compression');
var methodOverride = require('method-override');
var session = require("express-session");
var flash = require("connect-flash");
var passport = require("passport");

var auth = {};                              // auth properties to be set in auth.js file (imported two lines below)
require("./passport")(passport);
require("./auth")(auth);

module.exports = function(app, config, sessionStore) {
  var env = process.env.NODE_ENV || 'development';
  app.locals.ENV = env;
  app.locals.ENV_DEVELOPMENT = env == 'development';

  app.set('views', config.root + '/app/views');
  app.set('view engine', 'ejs');

  app.use(favicon(config.root + '/public/img/favicon.ico'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(session({
    secret: "Fuck you all",
    resave: false,
    saveUninitialized: false,
    maxAge: 0,
    store: sessionStore
  }));
  app.use(flash());
  app.use(cookieParser());
  app.use(compress());
  app.use(express.static(config.root + '/public'));
  app.use(methodOverride());
  app.use(passport.initialize());
  app.use(passport.session());

  var controllers = glob.sync(config.root + '/app/controllers/*.js');
  controllers.forEach(function (controller) {
    require(controller)(app, config, auth, passport);
  });

  app.use(function (req, res, next) {
    var err = new Error('Page Not Found');
    err.status = 404;
    next(err);
  });

  if(app.get('env') === 'development'){
    app.use(function (err, req, res, next) {
      res.status(err.status || 500);
      res.render('partials/error', {
        message: err.message,
        status: err.status,
        stack: err.stack,
        title: 'Whoops!'
      });
    });
  }

  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
      res.render('partials/error', {
        message: err.message,
        status: err.status,
        stack: '',
        title: 'Whoops!'
      });
  });

};
