const _ = require('lodash')
const YAML = require('yamljs')
const api = require('../api')()
const handleError = require('../logging').handleError

module.exports = (program) => {
  program
    .command('generate <artifact>')
    .description('Generate a breed or blueprint based on an existing one.')
    .option('-s, --source <name>', 'The name of the artifact to use as a source for generating a new artifact.')
    .option('-d, --deployable <name>', 'Only valid for breeds, the deployable to replace in the breed source.')
    .option('-c, --cluster <name>', 'Only valid for blueprints, the cluster to place the new breed in.')
    .option('-b, --breed <name>', 'Only valid for blueprint, the breed to replace in the blueprint source.')
    .option('-t, --target <name>', 'The name of the to be created artifact.')
    .action((artifact, options) => {
      switch (artifact) {
        case 'blueprint':
          if (!options.source || !options.cluster || !options.breed || !options.target) {
            return console.log('Please provide options for <source>, <cluster>, <breed> and <target> for generating a blueprint')
          } else {
            api.blueprint.get(options.source)
              .then(blueprint => {
                const newBlueprint = generateBlueprint(blueprint, options)
                return console.log(YAML.stringify(newBlueprint, 12, 2))
              })
              .catch(handleError)
          }

          break
        case 'breed':
          if (!options.source || !options.deployable || !options.target){
            return console.log('Please provide options for <source>, <deployable> and <target> for generating a breed')
          } else {
            api.breed.get(options.source)
              .then(breed => {
                const newBreed = generateBreed(breed, options)
                return console.log(YAML.stringify(newBreed, 12, 2))
              })
              .catch(handleError)
          }
      }
    })
}

function generateBreed (breed, options) {
  breed.deployable = options.deployable
  breed.name = options.target
  return _.omitBy(breed, _.isEmpty)
}

function generateBlueprint (blueprint, options) {
  blueprint.clusters[options.cluster].services = { breed: options.breed }
  blueprint.name = options.target
  return _.omitBy(blueprint, _.isEmpty)
}
