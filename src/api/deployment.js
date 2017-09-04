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
      .catch(console.error)
  }
  /**
   * Describes a single deployment resource
   * @param  {string} name - name of the deployment
   * @return {Promise.<Object>}
   */
  describe (name) {
    return this.http
      .get(`/deployments/${name}`)
      .then(res => { return res.data })
      .catch(err => console.error(err))
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
      .catch(console.error)
  }

  merge (deployment, blueprint) {
    return this.http
      .get(`/blueprints/${blueprint}`)
      .then(res => { return this.http.put(`/deployments/${deployment}`, res.data) })
      .catch(console.error)
  }

  /**
   * Removes a running deployment. When passed the full name, it will retrieve the deployment and then use that resource
   * description in the DELETE command to fully remove the whole deployment.
   * @param {string} deployment - name of the deployment
   * @param {string} [blueprint] - name of a blueprint
   * @return {Promise.<Object>}
   */
  undeploy (deployment, blueprint) {
    if (blueprint) {
      const deleteBody = { name: blueprint }
      return this.http({
        url: `/deployments/${deployment}`,
        method: 'DELETE',
        data: deleteBody
      })
        .catch(console.error)
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
        .catch(console.error)
    }
  }
}

module.exports = (axiosInstance) => { return new Deployment(axiosInstance) }
