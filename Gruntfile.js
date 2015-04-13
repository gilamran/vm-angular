// Generated on 2015-04-13 using generator-wix-angular 0.1.95
'use strict';

module.exports = function (grunt) {
  var unitTestFiles = [];
  require('./karma.conf.js')({set: function (karmaConf) {
    unitTestFiles = karmaConf.files.filter(function (value) {
      return value.indexOf('bower_component') !== -1;
    });
  }});
  require('wix-gruntfile')(grunt, {
    cdnify: 'vm',
    port: 9000,
    preloadModule: 'vmAngularAppInternal',
    translationsModule: 'vmAngularTranslations',
    svgFontName: 'vm-angular',
    unitTestFiles: unitTestFiles,
    protractor: true
  });

  grunt.modifyTask('yeoman', {
    //the address to which your local /_api is proxied to (to workaround CORS issues)
    api: 'http://www.pizza.wixpress.com/_api/',
    //the address that opens in your browser in grunt serve
    //(domain should be the same as staging so cookies will be sent in api requests)
    local: 'http://local.pizza.wixpress.com:<%= connect.options.port %>/'
  });

  try {
    require('./Gruntfile.private.js')(grunt); //override stuff locally
  } catch (err) {
    if (err.code !== 'MODULE_NOT_FOUND') {
      throw (err);
    }
  }

  //Follow this URL for instructions on how to override built-in definitions:
  //https://github.com/wix/wix-gruntfile/blob/master/README.md
};
