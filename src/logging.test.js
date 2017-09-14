const assert = require('assert')
const handleError = require('./logging').handleError
const sinon = require('sinon')

describe('handleError', () => {
  it('logs a 404 error', () => {
    const spy = sinon.spy(console, 'error')
    handleError({response: {status: 404}})
    assert(spy.called)
    spy.restore()
  })
  it('logs a 400 error', () => {
    const spy = sinon.spy(console, 'error')
    handleError({response: {status: 400}})
    assert(spy.called)
    spy.restore()
  })
  it('logs a >= 500 error', () => {
    const spy = sinon.spy(console, 'error')
    handleError({response: {status: 503}})
    assert(spy.called)
    spy.restore()
  })
})
