const api = require('../api')()
const handleError = require('../logging').handleError
module.exports = (program) => {
  program
    .command('merge <blueprint> <deployment>')
    .description('Merges a blueprint to a  deployment')
    .action((blueprint, deployment) => {
      api.deployment.merge(deployment, blueprint)
        .then(showResult)
        .catch(handleError)
    })
}

function showResult (res) {
  if (res.status === 202) {
    console.log('Merge has been started (202)')
  } else {
    console.log(res)
  }
}
