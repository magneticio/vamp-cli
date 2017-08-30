const fs = require('fs')
const path = require('path')

module.exports = program => {
  const commands = {}
  const loadPath = path.dirname(__filename)

  fs.readdirSync(loadPath).filter(function (filename) {
    return (/\.js$/.test(filename) && filename !== 'index.js')
  }).forEach(function (filename) {
    const name = filename.substr(0, filename.lastIndexOf('.'))
    const command = require(path.join(loadPath, filename))
    // Initialize command
    commands[name] = command(program)
  })
  return commands
}
