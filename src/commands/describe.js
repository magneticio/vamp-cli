const _ = require('lodash')
const terminal = require('../terminal')
const api = require('../api')()
const handleError = require('../logging').handleError
const constants = require('./helpers').deployment.constants

module.exports = (program) => {
  program
    .command('describe <artifact> <name>')
    .description('Describe details of a deployment, gateway, blueprint, breed, workflow')
    .action((artifact, name) => {
      switch (artifact) {
        case 'deployment':
          api.deployment.get(name)
            .then(describeDeployment)
            .catch(handleError)
          break
        case 'gateway':
          api.gateway.get(name)
            .then(describeGateway)
            .catch(handleError)
          break
        case 'blueprint':
          api.blueprint.get(name)
            .then(describeBlueprint)
            .catch(handleError)
          break
        case 'breed':
          api.breed.get(name)
            .then(describeBreed)
            .catch(handleError)
          break
        case 'workflow':
          api.workflow.get(name)
            .then(describeWorkflow)
            .catch(handleError)
          break
      }
    })
}

function describeDeployment (res) {
  const servicesHeaders = ['SERVICE', 'DEPLOYABLE', 'STATUS', 'CLUSTER', 'CPU', 'MEM', 'INSTANCES', 'RUNNING', 'STAGED', 'HEALTHY', 'UNHEALTHY']
  const servicesData = []

  const routesHeaders = ['ROUTE', 'WEIGHT', 'CONDITION', 'STRENGTH', 'GATEWAY']
  const routesData = []

  const defaultHealthStatus = { running: 'n/a', staged: 'n/a', healthy: 'n/a', unhealthy: 'n/a' }
  _.forEach(res.clusters, (cluster, name) => {
    const clusterName = name
    cluster.services.forEach(service => {
      const serviceName = service.breed.name
      const instances = service.scale.instances
      const status = service.status.phase.name
      const cpu = service.scale.cpu
      const mem = service.scale.memory
      const health = status === constants.PHASE_FAILED || constants.PHASE_UPDATING ? defaultHealthStatus : service.health

      const deployable = service.breed.deployable.type ? 'javascript' : service.breed.deployable.definition
      servicesData.push([serviceName, deployable, status, clusterName, cpu, mem, instances, health.running, health.staged, health.healthy, health.unhealthy])
    })

    _.forEach(cluster.gateways, (gateway, name) => {
      const gatewayName = name
      _.forEach(gateway.routes, (route, name) => {
        const condition = route.condition ? route.condition.condition : '-'
        routesData.push([name, route.weight, condition, route.condition_strength, gatewayName])
      })
    })
  })

  console.log(terminal.drawTable(servicesHeaders, servicesData))
  console.log(terminal.drawTable(routesHeaders, routesData))
}

function describeGateway (res) {
  let data = '\n'
  data = data + `Name: ${res.name}\n`
  data = data + `Type: ${res.internal ? 'internal' : 'external'}\n`
  data = data + `Port: ${res.port}\n`
  data = data + `Service host: ${res.service.host}\n`
  data = data + `Service port: ${res.service.port}\n`
  data = data + `Sticky: ${!!res.sticky}`
  console.log(data)

  const routesHeaders = ['ROUTE', 'WEIGHT', 'CONDITION', 'STRENGTH', 'TARGETS']
  const routesData = []
  _.forEach(res.routes, (route, name) => {
    const condition = route.condition ? route.condition.condition : '-'
    const targets = route.targets.map(target => { return `${target.host}:${target.port}` })
    routesData.push([name, route.weight, condition, route.condition_strength, targets.join(', ')])
  })
  console.log(terminal.drawTable(routesHeaders, routesData))
}

function describeBlueprint (res) {
  const headers = ['SERVICES', 'DEPLOYABLE', 'CPU', 'MEM', 'INSTANCES', 'CLUSTER']
  const data = []
  _.forEach(res.clusters, (cluster, name) => {
    const clusterName = name
    cluster.services.forEach(service => {
      const serviceName = service.breed.name
      const instances = service.scale.instances
      const cpu = service.scale.cpu
      const mem = service.scale.memory
      const deployable = service.breed.deployable.type ? 'javascript' : service.breed.deployable.definition
      data.push([serviceName, deployable, cpu, mem, instances, clusterName])
    })
  })
  console.log(terminal.drawTable(headers, data))
}

function describeBreed (res) {
  const headers = ['NAME', 'DEPLOYABLE']
  const data = []
  const deployable = res.deployable.type ? 'javascript' : res.deployable.definition
  data.push([res.name, deployable])
  console.log(terminal.drawTable(headers, data))
}

function describeWorkflow (res) {
  const headers = ['NAME', 'SCHEDULE', 'STATUS', 'BREED']
  const schedule = res.schedule.event ? 'event' : res.schedule
  const data = []
  data.push([res.name, schedule, res.status, res.breed.reference])
  console.log(terminal.drawTable(headers, data))
}
