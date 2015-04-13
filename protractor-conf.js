'use strict';

var config = require('./node_modules/wix-gruntfile/protractor-conf').config;

config.capabilities = {
  browserName: 'firefox'
};

module.exports.config = config;
