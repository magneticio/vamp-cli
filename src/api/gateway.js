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
  }

  /**
   * Describes a single gateway resource
   * @param {string} name - name of the breed
   * @return {Promise.<Object>}
   */
  get (name) {
    return this.http
      .get(`/gateways/${name}`)
      .then(res => { return res.data })
  }

  /**
   * Deletes the artifact
   * @param {string} name - Name of the artifact
   * @return {Promise.<Object>}
   */
  delete (name) {
    return this.http
      .delete(`/gateways/${name}`)
      .then(res => { return res })
  }
}

module.exports = (axiosInstance) => { return new Gateway(axiosInstance) }
