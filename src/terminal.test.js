const assert = require('assert')
const drawTable = require('./terminal').drawTable

describe('drawTable', () => {
  it('outputs a table with headers', () => {
    const res = drawTable(['header1', 'header2'], [[1, 2]])
    assert.equal(res, '\u001b[31m header1 \u001b[39m\u001b[90m \u001b[39m\u001b[31m header2 \u001b[39m\n 1       \u001b[90m \u001b[39m 2       ')
  })
})
