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
  }
  /**
   * Describes a single workflow resource
   * @param  {string} name - name of the workflow
   * @return {Promise.<Object>}
   */
  get (name) {
    return this.http
      .get(`/workflows/${name}`)
      .then(res => { return res.data })
  }
}

module.exports = (axiosInstance) => { return new Workflow(axiosInstance) }
