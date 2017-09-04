const api = require('../api')()
const handleError = require('../utils').handleError
module.exports = (program) => {
  program
    .command('undeploy <deployment> [blueprint]')
    .description('Removes (part of) a deployment. By only specifying the deployment name, the whole deployment will be removed. ' +
      'To remove part of a deployment, specify the original blueprint name you want to remove')
    .action((deployment, blueprint) => {
      api.deployment.undeploy(deployment, blueprint)
        .then(handleResult)
        .catch(handleError)
    })
}

function handleResult (res) {
  if (res.status === '202') {
    console.log('Undeployment has been started (202)')
  }
}
