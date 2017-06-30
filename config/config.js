var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'learn-mean'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/learn-mean-development'
  },

  test: {
    root: rootPath,
    app: {
      name: 'learn-mean'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/learn-mean-test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'learn-mean'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/learn-mean-production'
  }
};

module.exports = config[env];
