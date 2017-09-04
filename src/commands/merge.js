const api = require('../api')()

module.exports = (program) => {
  program
    .command('merge <blueprint> <deployment>')
    .description('Merges a blueprint to a  deployment')
    .action((blueprint, deployment) => {
      api.deployment.merge(deployment, blueprint).then(showResult)
    })
}

function showResult (res) {
  console.log(res)
}
