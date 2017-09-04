const Table = require('cli-table')

const chars = {
  top: '',
  'top-mid': '',
  'top-left': '',
  'top-right': '',
  'bottom': '',
  'bottom-mid': '',
  'bottom-left': '',
  'bottom-right': '',
  'left': '',
  'left-mid': '',
  'mid': '',
  'mid-mid': '',
  'right': '',
  'right-mid': '',
  'middle': ' '
}

/**
 * @param {string[]} headers
 * @param {string[]} data
 * @returns {string}
 */
function drawTable (headers, data) {
  const table = new Table({ head: headers, chars })
  data.forEach(item => {
    table.push(item)
})
  return table.toString()
}

module.exports = {
  drawTable
}
