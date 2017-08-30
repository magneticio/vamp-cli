class Workflow {

  constructor (http) {
    this.http = http
  }

  list () {
    return this.http
      .get('/workflows')
      .then(res => { return res.data })
      .catch(err => console.error(err))
  }
}

module.exports = (axiosInstance) => { return new Workflow(axiosInstance) }
