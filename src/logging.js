function handleError (err) {
  if (err.response && err.response.status === 404) {
    console.error('The requested Vamp artifact could not be found.')
  } else if (err.response && err.response.status === 400) {
    const message = err.response && err.response.data && err.response.data.message ? err.response.data.message : ''
    console.error(`Cannot execute the request command: ${message}`)
  } else if (err.response && err.response.status >= 500) {
    console.error('There was a server error processing your request')
  } else {
    console.error(err)
  }
}

module.exports = {
  handleError
}
