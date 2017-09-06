/** Class representing a Deployment resource */
class Deployment {
  /**
   * @param {object} http - instantiated axios client
   */
  constructor (http) {
    this.http = http
  }
  /**
   * Get a list of deployments
   * @return {Promise.<Array>}
   */
  list () {
    return this.http
      .get('/deployments/')
      .then(res => { return res.data })
  }
  /**
   * Describes a single deployment resource
   * @param  {string} name - name of the deployment
   * @return {Promise.<Object>}
   */
  get (name) {
    return this.http
      .get(`/deployments/${name}`)
      .then(res => { return res.data })
  }

  /**
   * Creates a deployment based on a blueprint under a specified name.
   * @param {string} deployment
   * @param {string }blueprint
   * @return {Promise.<Object>}
   */
  deploy (deployment, blueprint) {
    return this.http
      .get(`/blueprints/${blueprint}`)
      .then(res => { return this.http.put(`/deployments/${deployment}`, res.data) })
  }

  merge (deployment, blueprint) {
    return this.http
      .get(`/blueprints/${blueprint}`)
      .then(res => { return this.http.put(`/deployments/${deployment}`, res.data) })
  }

  /**
   * Removes a running deployment. When passed the full name, it will retrieve the deployment and then use that resource
   * description in the DELETE command to fully remove the whole deployment.
   * @param {string} deployment - name of the deployment
   * @param {string} [service] - name of a service to remove from a deployment
   * @return {Promise.<Object>}
   */
  undeploy (deployment, service) {
    if (service) {
      const deleteBody = { name: service }
      return this.http({
        url: `/deployments/${deployment}`,
        method: 'DELETE',
        data: deleteBody
      })
    } else {
      return this.http
        .get(`/deployments/${deployment}`, {
          params: {
            as_blueprint: true,
            only_reference: true
          }
        })
        .then(res => {
          return this.http({
            url: `/deployments/${deployment}`,
            method: 'DELETE',
            data: res.data
          })
        })
    }
  }
}

module.exports = (axiosInstance) => { return new Deployment(axiosInstance) }
