const terminal = require('../terminal')
const api = require('../api')()

module.exports = (program) => {
  program
    .command('list <artifact>')
    .description('lists deployments, gateways, blueprints, breeds, workflows')
    .action(artifact => {
      switch (artifact) {
        case 'deployments':
          api.deployment.list()
            .then(listDeployments)
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
  const headers = ['NAME', 'DEPLOYABLE']
  const data = []
  res.forEach(deployment => {
    data.push([deployment.name, 'deployable'])
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
