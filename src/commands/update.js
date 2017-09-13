const api = require('../api')()
const handleError = require('../logging').handleError

module.exports = (program) => {
  program
    .command('update <artifact> <name>')
    .description('Updates specific attributes of a Vamp artifact.')
    .option('-r, --route <route>', 'Specifies the route to target in a gateway update.')
    .option('-c, --condition <condition>', 'The routing condition applied to the specified route.')
    .action((artifact, name, options) => {
      switch (artifact) {
        case 'gateway':
          updateGateway(name, options)
          break
        default:
          console.log('Please choose an artifact to update: gateway.')
      }
    })
}

function updateGateway (name, options) {
  if (!options.route || !options.condition) {
    return console.log('Please provide a <route> and a <condition> when updating a gateway')
  } else {
    const condition = options.condition === 'null' ? null : options.condition
    api.gateway.get(name)
      .then(res => {
        res.routes[options.route].condition = condition
        return api.gateway.update(name, res)
          .then(handleGatewayResult)
          .catch(handleError)
      })
  }
}

function handleGatewayResult (res) {
  if (res.status === '202') {
    console.log('Gateway update has been started (202)')
  }
}