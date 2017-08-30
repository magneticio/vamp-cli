#!/usr/bin/env node
const program = require('commander')
require('./src/commands')(program)
const packageJson = require('./package.json')

program
  .version(packageJson.version)
  .usage('<command> [options]')

program.parse(process.argv)

module.exports = require('./src/api')
