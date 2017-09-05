function handleError (err) {
  if (err.response && err.response.status === 404) {
    console.error('The requested Vamp artifact could not be found.')
  } else if (err.response && err.response.status >= 500) {
    console.error('There was a server error processing your request')
  } else {
    console.error(err)
  }
}

module.exports = {
  handleError
}
