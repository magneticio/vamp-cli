class Deployment {
  /**
   * @param http instantiated request client
   */
  constructor (http) {
    this.http = http
  }

  list () {
    return this.http
      .get('/deployments/')
      .then(res => { return res.data })
      .catch(err => console.error(err))
  }

  describe (deployment) {
    return this.http
      .get(`/deployments/${deployment}`)
      .then(res => { return res.data })
      .catch(err => console.error(err))
  }
}

module.exports = (axiosInstance) => { return new Deployment(axiosInstance) }
