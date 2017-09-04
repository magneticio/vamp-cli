/** Class representing a Blueprint resource */
class Blueprint {
  /**
   * @param {object} http - instantiated axios client
   */
  constructor (http) {
    this.http = http
  }

  /**
   * Get a list of blueprints
   * @return {Promise.<Array>}
   */
  list () {
    return this.http
      .get('/blueprints')
      .then(res => { return res.data })
      .catch(console.error)
  }

  /**
   * Describes a single blueprint resource
   * @param {string} name - name of the blueprint
   * @return {Promise.<Object>}
   */
  describe (name) {
    return this.http
      .get(`/blueprints/${name}`)
      .then(res => { return res.data })
      .catch(console.error)
  }
}

module.exports = (axiosInstance) => { return new Blueprint(axiosInstance) }
