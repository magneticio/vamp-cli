const _ = require('lodash')

const INT_DEPLOYMENT = 'Deployment'
const INT_UNDEPLOYMENT = 'Undeployment'
const PHASE_UPDATING = 'Updating'
const PHASE_INITIATED = 'Initiated'
const PHASE_FAILED = 'Failed'

/**
 * Rolls up all statuses in clusters and services to one status that describes the deployment.
 * If any service is "updating" we report this, otherwise the default is "Deployed".
 * @param {object } deployment - a Vamp deployment object
 * @return {string} - flattened status that describes the status of the whole deployment
 */
function rollupDeploymentStatus (deployment) {

  let deploying = 0
  let undeploying = 0
  let initiating = 0
  let failed = 0

  _.forEach(deployment.clusters, (cluster, name) => {
    cluster.services.forEach(service => {
      if (service.status.phase.name === PHASE_UPDATING && service.status.intention === INT_DEPLOYMENT) {
        deploying++
      }
      if (service.status.phase.name === PHASE_UPDATING && service.status.intention === INT_UNDEPLOYMENT) {
        undeploying++
      }
      if (service.status.phase.name === PHASE_FAILED) {
        failed++
      }
      if (service.status.phase.name === PHASE_INITIATED) {
        initiating++
      }
    })
  })

  let status = 'Deployed'
  if (deploying > 0) status = 'Deploying'
  if (undeploying > 0) status = 'Undeploying'
  if (initiating > 0) status = 'Initiating'
  if (failed > 0) status = 'Failed'
  return status
}

module.exports = {
  rollupDeploymentStatus,
  constants: {
    INT_UNDEPLOYMENT,
    INT_DEPLOYMENT,
    PHASE_UPDATING,
    PHASE_FAILED,
    PHASE_INITIATED
  }
}
