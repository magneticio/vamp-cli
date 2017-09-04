const _ = require('lodash')
const terminal = require('../terminal')
const api = require('../api')()

module.exports = (program) => {
  program
    .command('describe <artifact> <name>')
    .description('describe details of a deployment, gateway, blueprint, breed, workflow')
    .action((artifact, name) => {
      switch (artifact) {
        case 'deployment':
          api.deployment.describe(name).then(describeDeployment)
          break
        case 'breed':
          api.breed.describe(name).then(describeBreed)
          break
        case 'workflow':
          api.workflow.describe(name).then(describeWorkflow)
          break
      }
    })
}

function describeDeployment (res) {
  const headers = ['CLUSTERS']
  const data = []
  _.forEach(res.clusters, (key, val) => {
    data.push([val])
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
