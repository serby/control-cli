module.exports = function(param, options) {
  var async = require('async')
  , colors = require('colors')
  , exec = require('./exec').exec
  , path = (options && options.path || '.') + '/' + param
  ;

  console.log('Creating an new instance of ctrl: ');

  async.series([
    function(callback) {
      console.log(('Creating a clone of ctrl  \'' + path + '\'').green);
      exec('git clone -o ctrl git://github.com/serby/ctrl.git ' + path, callback);
    },
    function(callback) {
      console.log(('Installing NPM modules').green);
      exec('npm install', path, callback);
    }
  ], function(error, response) {
    if (error === undefined) {
      console.log('Yay it\'s done!'.green);
    }
  });
};