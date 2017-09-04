const _ = require('lodash')
const terminal = require('../terminal')
const api = require('../api')()

module.exports = (program) => {
  program
    .command('list <artifact>')
    .description('Lists deployments, gateways, blueprints, breeds, workflows')
    .action(artifact => {
      switch (artifact) {
        case 'deployments':
          api.deployment.list().then(listDeployments)
          break
        case 'gateways':
          api.gateway.list().then(listGateways)
          break
        case 'blueprints':
          api.blueprint.list().then(listBlueprints)
          break
        case 'breeds':
          api.breed.list().then(listBreeds)
          break
        case 'workflows':
          api.workflow.list().then(listWorkflows)
          break
      }
    })
}

function listDeployments (res) {
  const headers = ['NAME', 'CLUSTERS', 'PORTS']
  const data = []
  res.forEach(deployment => {
    const clusters = []
    _.forEach(deployment.clusters, (val, key) => {
      clusters.push(key)
    })

    const ports = []
    _.forEach(deployment.ports, (val, key) => {
      ports.push(`${key}:${val}`)
    })

    data.push([deployment.name, clusters.join(', '), ports.join(', ')])
  })
  console.log(terminal.drawTable(headers, data))
}

function listGateways (res) {
  const headers = ['NAME', 'PORT', 'SERVICE HOST', 'SERVICE PORT', 'STICKY', 'TYPE']
  const data = []
  res.forEach(gateway => {
    const type = gateway.internal ? 'internal' : 'external'
    const sticky = !!gateway.sticky
    data.push([gateway.name, gateway.port, gateway.service.host, gateway.service.port, sticky, type])
  })
  console.log(terminal.drawTable(headers, data))
}

function listBlueprints (res) {
  const headers = ['NAME', 'CLUSTERS']
  const data = []
  res.forEach(blueprint => {
    const clusters = []
    _.forEach(blueprint.clusters, (val, key) => {
      clusters.push(key)
    })
    data.push([blueprint.name, clusters.join(', ')])
  })
  console.log(terminal.drawTable(headers, data))
}

function listBreeds (res) {
  const headers = ['NAME', 'DEPLOYABLE']
  const data = []
  res.forEach(breed => {
    const deployable = breed.deployable.type ? 'javascript' : breed.deployable.definition
    data.push([breed.name, deployable])
  })
  console.log(terminal.drawTable(headers, data))
}

function listWorkflows (res) {
  const headers = ['NAME', 'SCHEDULE', 'STATUS', 'BREED']
  const data = []

  res.forEach(workflow => {
    const schedule = workflow.schedule.event ? 'event' : workflow.schedule
    data.push([workflow.name, schedule, workflow.status, workflow.breed.reference])
  })
  console.log(terminal.drawTable(headers, data))
}
