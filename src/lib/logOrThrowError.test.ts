import 'mocha'
import { assert } from 'chai'
import * as sinon from 'sinon'
import logOrThrowError from './logOrThrowError'

describe('logOrThrowError', () => {
  let consoleSpy: sinon.SinonSpy
  let nodeEnv: string | undefined

  beforeEach(() => {
    consoleSpy = sinon.spy(console, 'error')
    nodeEnv = process.env.NODE_ENV
  })

  afterEach(() => {
    consoleSpy.restore()
    process.env.NODE_ENV = nodeEnv
  })

  describe('given a string', () => {
    it('should coerce to an Error', () => {
      try {
        logOrThrowError('boom!')
      } catch (error) {
        // Ignore
      }
    })
  })

  describe('given an error', () => {
    describe('in production mode', () => {
      before(() => {
        process.env.NODE_ENV = 'production'
      })

      it('should log the error', () => {
        const error = new Error('boom')
        logOrThrowError(error)

        assert.isTrue(consoleSpy.called)
        assert.isTrue(consoleSpy.calledWith(error))
      })
    })

    describe('in development mode', () => {
      before(() => {
        process.env.NODE_ENV = 'development'
      })

      it('should throw the error', () => {
        const error = new Error('boom')
        assert.throws(() => logOrThrowError(error), 'boom')
      })
    })
  })
})
