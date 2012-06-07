#!/usr/bin/env node

var properties = require('./package.json')
  , program = require('commander');

program
  .version(properties.version);

program
  .command('create')
    .description('Creates a new instance of control CMS')
    .option('-p, --path [path]', 'Where to create a new instance of control')
    .action(require('./lib/create'));

program
  .command('bundle:create')
  .description('Create a new')
  .option('-n, --bundlename [name]', 'Sets the name of the bundle')
  .option('-a, --auto', 'Set all default options based on name')
  .action(require('./lib/bundle/create'));

program
  .command('bundle:install [URL]')
  .description('Installs a bundle from a git URL')
  .action(require('./lib/bundle/install'));


program.parse(process.argv);