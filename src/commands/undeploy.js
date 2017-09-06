const api = require('../api')()
const handleError = require('../logging').handleError
module.exports = (program) => {
  program
    .command('undeploy <deployment>')
    .description('Removes a deployment or a specific service in a deployment.')
    .option('-s, --service <service>', 'Specifies the service to remove from a deployment')
    .action((deployment, options) => {
      api.deployment.undeploy(deployment, options.service)
        .then(handleResult)
        .catch(handleError)
    })
}

function handleResult (res) {
  if (res.status === '202') {
    console.log('Undeployment has been started (202)')
  }
}
