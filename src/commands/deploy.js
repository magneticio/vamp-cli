const api = require('../api')()

module.exports = (program) => {
  program
    .command('deploy <blueprint> <deployment>')
    .description('Creates a deployment, based on a blueprint, with a specified name')
    .action((blueprint, deployment) => {
      api.deployment.deploy(blueprint, deployment).then(showResult)
    })
}

function showResult (res) {
  console.log(res)
}
