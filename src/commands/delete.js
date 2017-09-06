const api = require('../api')()
const handleError = require('../logging').handleError

module.exports = (program) => {
  program
    .command('delete <artifact> <name>')
    .description('Deletes artifacts like gateways, blueprints, breeds, workflows.')
    .action((artifact, name) => {
      switch (artifact) {
        case 'gateway':
          api.gateway.delete(name)
            .then(handleResult)
            .catch(handleError)
          break
        case 'blueprint':
          api.blueprint.delete(name)
            .then(handleResult)
            .catch(handleError)
          break
        case 'breed':
          api.breed.delete(name)
            .then(handleResult)
            .catch(handleError)
          break
        case 'workflow':
          api.workflow.delete(name)
            .then(handleResult)
            .catch(handleError)
          break
        default:
          console.log('Please choose an artifact: gateway, blueprint, breed.')
      }
    })
}

function handleResult (res) {
  if (res.status === 204) {
    console.log('Deleted artifact (204)')
  } else {
    console.log(res.status)
  }
}
