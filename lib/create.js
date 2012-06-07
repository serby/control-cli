module.exports = function(param, options) {
  var async = require('async')
  , colors = require('colors')
  , exec = require('./exec').exec
  , path = (options && options.path || '.') + '/' + param
  ;

  console.log('Creating an new instance of control: ');

  async.series([
    function(callback) {
      console.log(('Creating a clone of control  \'' + path + '\'').green);
      exec('git clone -o control git://github.com/serby/control.git ' + path, callback);
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