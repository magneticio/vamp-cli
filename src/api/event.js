/** Class representing an Event  */
class Event {
  /**
   * @param {object} http - instantiated axios client
   */
  constructor (http) {
    this.http = http
  }

  /**
   * Emits an event with a set of tags
   * @param {string} value - the contents for the "value" key in the event
   * @param {string[]} tags - array of tags added to the "tags" key in the event
   * @return {Promise.<Object>}
   */
  emit (value, tags) {
    return this.http
      .post('/events', { value, tags })
      .then(res => { return res.data })
  }
}

module.exports = (axiosInstance) => { return new Event(axiosInstance) }
