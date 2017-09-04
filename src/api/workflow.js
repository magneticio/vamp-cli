/** Class representing a Workflow resource */
class Workflow {
  /**
   * @param {object} http - instantiated axios client
   */
  constructor (http) {
    this.http = http
  }
  /**
   * Get a list of workflows
   * @return {Promise.<Array>}
   */
  list () {
    return this.http
      .get('/workflows')
      .then(res => { return res.data })
      .catch(console.error)
  }
  /**
   * Describes a single workflow resource
   * @param  {string} name - name of the workflow
   * @return {Promise.<Object>}
   */
  describe (name) {
    return this.http
      .get(`/workflows/${name}`)
      .then(res => { return res.data })
      .catch(console.error)
  }
}

module.exports = (axiosInstance) => { return new Workflow(axiosInstance) }
