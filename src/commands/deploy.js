const api = require('../api')()
const handleError = require('../logging').handleError
module.exports = (program) => {
  program
    .command('deploy <blueprint> <deployment>')
    .option('--stdin [file]', 'read from std in.')
    .description('Creates a deployment, based on a blueprint, with a specified name.')
    .action((blueprint, deployment, options) => {
      if (options.stdin) {
        console.log(options.parent.rawArgs.reverse()[0])
      } else {
        api.deployment.deploy(deployment, blueprint)
          .then(handleResult)
          .catch(handleError)
      }
    })
}

function handleResult (res) {
  if (res.status === '202') {
    console.log('Undeployment has been started (202)')
  }
}
