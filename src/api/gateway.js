/** Class representing a Gateway resource */
class Gateway {
  /**
   * @param {object} http - instantiated axios client
   */
  constructor (http) {
    this.http = http
  }

  /**
   * Get a list of gateways
   * @return {Promise.<Array>}
   */
  list () {
    return this.http
      .get('/gateways')
      .then(res => { return res.data })
      .catch(console.error)
  }

  /**
   * Describes a single gateway resource
   * @param {string} name - name of the breed
   * @return {Promise.<Object>}
   */
  describe (name) {
    return this.http
      .get(`/gateways/${name}`)
      .then(res => { return res.data })
      .catch(console.error)
  }
}

module.exports = (axiosInstance) => { return new Gateway(axiosInstance) }
