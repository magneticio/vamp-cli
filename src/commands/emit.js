const api = require('../api')()
const handleError = require('../logging').handleError

module.exports = (program) => {
  program
    .command('emit <value>')
    .description('Sends an event to Vamp event system. Returns the created event on success.')
    .option('-t, --tags <tags>', 'Comma separated list of tags to add to the event')
    .action((value, options) => {
      const tags = options.tags ? options.tags.split(',') : []
      api.event.emit(value, tags)
        .then(handleResult)
        .catch(handleError)
    })
}

function handleResult (res) {
  if (res.status === '201') {
    console.log('Event created (201)')
  } else {
    console.log(res)
  }
}
