class Breed {
  /**
   * @param http instantiated request client
   */
  constructor (http) {
    this.http = http
  }

  list () {
    return this.http
      .get('/breeds')
      .then(res => { return res.data })
      .catch(err => console.error(err))
  }

  describe (breed) {
    return this.http
      .get(`/breeds/${breed}`)
      .then(res => { return res.data })
      .catch(err => console.error(err))
  }
}

module.exports = (axiosInstance) => { return new Breed(axiosInstance) }
