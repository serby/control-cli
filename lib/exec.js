var fs = require('fs')
  , colors = require('colors')
  , child = require('child_process');

module.exports.exec = function(command, path, callback) {

  if (callback === undefined) {
    callback = path;
  }

  console.log(('\t' + command).grey);

  var args = command.split(' ')
    , childProcess = child.spawn(args.shift(), args, { cwd: path });

  childProcess.stdout.on('data', function(data) {
    process.stdout.write(data);
  });

  childProcess.stderr.on('data', function(data) {
    process.stderr.write(data);
  });

  childProcess.on('exit', function(code, signal) {
    if (code !== 0) {
      callback(new Error('Command exited with code: ' + code));
    } else {
      callback();
    }
  });
};