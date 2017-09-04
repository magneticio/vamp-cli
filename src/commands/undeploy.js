const api = require('../api')()

module.exports = (program) => {
  program
    .command('undeploy <deployment> [clusters...]')
    .description('Removes (part of) a deployment. By only specifying the deployment name, the whole deployment will be removed. ' +
      'To remove part of a deployment, specify one or more cluster names')
    .action((name, clusters) => {
      api.deployment.undeploy(name).then(showResult)
    })
}

function showResult (res) {
  console.log(res)
}
