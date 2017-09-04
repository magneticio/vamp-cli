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
   * @param blueprintName
   * @param deploymentName
   * @return {Promise.<Object>}
   */
  deploy (blueprintName, deploymentName) {
    return this.http
      .get(`/blueprints/${blueprintName}`)
      .then(res => { return this.http.put(`/deployments/${deploymentName}`, res.data) })
      .catch(console.error)
  }

  /**
   * Removes a running deployment. When passed the full name, it will retrieve the deployment and then use that resource
   * description in the DELETE command to fully remove the whole deployment.
   * @param {string} name - name of the deployment
   * @params {array} [clusters] - array with names of one or more clusters
   * @return {Promise.<Object>}
   */
  undeploy (name, clusters) {
    if (clusters.length > 0) {
      const deleteBody = { name }

      cluster

      return this.http({
        url: `/deployments/${name}`,
        method: 'DELETE',
        data: deleteBody
      })
        .catch(console.error)
    } else {
      return this.http
        .get(`/deployments/${name}`, {
          params: {
            as_blueprint: true,
            only_reference: true
          }
        })
        .then(res => {
          return this.http({
            url: `/deployments/${name}`,
            method: 'DELETE',
            data: res.data
          })
        })
        .catch(console.error)
    }
  }
}

module.exports = (axiosInstance) => { return new Deployment(axiosInstance) }
