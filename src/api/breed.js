/** Class representing a Breed resource */
class Breed {
  /**
   * @param {object} http - instantiated axios client
   */
  constructor (http) {
    this.http = http
  }

  /**
   * Get a list of breeds
   * @return {Promise.<Array>}
   */
  list () {
    return this.http
      .get('/breeds')
      .then(res => { return res.data })
  }

  /**
   * Describes a single breed resource
   * @param {string} name - name of the breed
   * @return {Promise.<Object>}
   */
  get (name) {
    return this.http
      .get(`/breeds/${name}`)
      .then(res => { return res.data })
  }

  /**
   * Creates a breed based on a passed in Javascript object.
   * @param {object} breed - a breed resource.
   * @return {Promise.<Object>}
   */
  create (breed) {
    return this.http
      .put(`/breeds/${breed.name}`, breed)
      .then(res => { return res.data })
  }
}

module.exports = (axiosInstance) => { return new Breed(axiosInstance) }
