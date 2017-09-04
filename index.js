#!/usr/bin/env node
const program = require('commander')
require('./src/commands')(program)
const packageJson = require('./package.json')
let stdin = ''

program
  .version(packageJson.version)
  .usage('<command> [options]')

if (process.stdin.isTTY) {
  program.parse(process.argv)
  if (!process.argv.slice(2).length) {
    program.outputHelp()
    return
  }
} else {
  process.stdin.on('readable', function () {
    const chunk = this.read()
    if (chunk !== null) {
      stdin += chunk
    }
  })
  process.stdin.on('end', function() {
    program.parse(process.argv.concat([stdin]))
  })
}

module.exports = require('./src/api')
