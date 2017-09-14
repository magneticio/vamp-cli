const api = require('../api')()
const handleError = require('../logging').handleError

module.exports = (program) => {
  program
    .command('update-gateway <name>')
    .description('Updates either weight or condition for a gateway and its routes.')
    .option('-c, --condition <condition>', 'The routing condition applied to the specified route.')
    .option('-r, --route <route>', 'Specifies the route to target in a gateway condition update.')
    .option('-s, --strength <strength>', 'The condition strength in % applied to the specified route, i.e. "50%"')
    .option('-w, --weights <weights>', 'A comma separated set of "route@weight" combinations to apply to each route, i.e. --weights route1@70%,route2@30%')
    .action((name, options) => {
      if (options.condition && options.weights) {
        return console.log('Choose either to update weight or condition')
      }
      if (options.condition) {
        updateGatewayCondition(name, options)
      } else if (options.weights) {
        updateGatewayWeight(name, options)
      } else {
        return console.log('Choose either to update a condition or weight')
      }
    })
}

function updateGatewayCondition (name, options) {
  if (!options.route) {
    return console.log('Please provide a <route> when updating a gateway condition')
  } else {
    const condition = options.condition === 'null' ? null : options.condition
    api.gateway.get(name)
      .then(res => {
        const strength = options.strength || res.routes[options.route].condition_strength

        res.routes[options.route].condition = condition
        res.routes[options.route].condition_strength = strength

        return api.gateway.update(name, res)
          .then(handleGatewayResult)
          .catch(handleError)
      })
  }
}

function updateGatewayWeight (name, options) {
  api.gateway.get(name)
    .then(res => {
      const routeWeigthCombos = options.weights.split(',')
      routeWeigthCombos.forEach(combo => {
        const route = combo.split('@')[0]
        const weight = combo.split('@')[1]
        if(res.routes[route]) {
          res.routes[route].weight = weight
        } else {
          return console.log(`Route ${route} not found`)
        }
      })
      return api.gateway.update(name, res)
        .then(handleGatewayResult)
    })
    .catch(handleError)
}

function handleGatewayResult (res) {
  if (res.status === '202') {
    console.log('Gateway update has been started (202)')
  }
}