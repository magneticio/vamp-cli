const fs = require('fs')
const YAML = require('yamljs')
const api = require('../api')()
const handleError = require('../logging').handleError

module.exports = (program) => {
  program
    .command('create <artifact>')
    .option('-f, --file <file>', 'read from file')
    .option('-s, --stdin [file]', 'read from std in')
    .description('Creates an blueprint or breed artifact based on passed YAML. Returns the created artefact after creation.')
    .action((artifact, options) => {
      if (!options.file && !options.stdin) {
        return console.log('Please pass in an artefact from a file or from stdin.')
      }
      if (options.file && options.stdin) {
        return console.log('Please choose either the --file option or the --stdin option')
      }

      let resource = ''

      if (options.file) {
        resource = YAML.parse(fs.readFileSync(options.file, 'utf-8'))
      }
      if (options.stdin) {
        resource = YAML.parse(options.parent.rawArgs.reverse()[0])
      }
      switch (artifact) {
        case 'blueprint':
          api.blueprint.create(resource)
            .then(handleResult)
            .catch(handleError)
          break
        case 'breed':
          api.breed.create(resource)
            .then(handleResult)
            .then(handleError)
          break
        default:
          return console.log('Please choose either a "blueprint" or "breed" as artifact')
      }
    })
}

function handleResult (res) {
  console.log(YAML.stringify(res, 12, 2))
}
