const axios = require('axios')

const defaults = {
  host: process.env.VAMP_HOST || 'http://localhost/',
  apiVersion: '/api/v1/',
  timeout: 5000
}

exports = module.exports = (options = {}) => {
  const settings = Object.assign({}, defaults, options)
  const baseURL = `${settings.host}${settings.apiVersion}`
  const axiosInstance = axios.create({
    baseURL,
    timeout: settings.timeout
  })

  return {
    deployment: require('./deployment')(axiosInstance),
    gateway: require('./gateway')(axiosInstance),
    workflow: require('./workflow')(axiosInstance),
    blueprint: require('./blueprint')(axiosInstance),
    breed: require('./breed')(axiosInstance),
    event: require('./event')(axiosInstance)
  }
}

