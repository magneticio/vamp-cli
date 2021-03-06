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
  }

  /**
   * Describes a single blueprint resource
   * @param {string} name - name of the blueprint
   * @return {Promise.<Object>}
   */
  get (name) {
    return this.http
      .get(`/blueprints/${name}`)
      .then(res => { return res.data })
  }

  /**
   * Creates a blueprint based on a passed in Javascript object.
   * @param {object} blueprint - a blueprint resource.
   * @return {Promise.<Object>}
   */
  create (blueprint) {
    return this.http
      .put(`/blueprints/${blueprint.name}`, blueprint)
      .then(res => { return res.data })
  }

  /**
   * Deletes the artifact
   * @param {string} name - Name of the artifact
   * @return {Promise.<Object>}
   */
  delete (name) {
    return this.http
      .delete(`/blueprints/${name}`)
      .then(res => { return res })
  }
}

module.exports = (axiosInstance) => { return new Blueprint(axiosInstance) }
