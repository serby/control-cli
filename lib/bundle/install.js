module.exports = function(param, options) {
  var async = require('async')
  , path = require('path')
  , colors = require('colors')
  , exec = require('../exec').exec
  , wrench = require('wrench')
  , url = param
  , pathname = './bundles'
  , bundlePath = pathname + '/' + path.basename(url, path.extname(url))
  ;

  console.log('Installing bundle: ' + url);

  async.series(
    [ function(callback) {
        path.exists('./bundles', function(exists) {
          callback(!exists && new Error('Can\'t find bundle path. Are you sure this is control?'));
        });
      }
    , function(callback) {
        console.log(('Installing bundle from repo: \'' + url + '\'').green);
        exec('git clone --depth 1 ' + url, pathname, callback);
      }
    , function(callback) {
        path.exists(bundlePath + '/bundle.js', function(exists) {
          callback(!exists && new Error('Can\'t find a bundle.js. Repo not a valid control bundle'));
        });
      }
    , function(callback) {
        console.log(('Installing NPM modules').green);
        exec('npm install', bundlePath, callback);
      }
    ]
  , function(error, response) {
      if (error === undefined) {
        console.log('Yay it\'s done!'.green);
      } else {
        console.log(error);
        console.log(('\tRemoving ' + bundlePath).red);
        wrench.rmdirSyncRecursive(bundlePath);
      }
    }
  );
};