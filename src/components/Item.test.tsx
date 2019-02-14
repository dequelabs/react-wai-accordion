import 'mocha'
import { assert } from 'chai'
import * as React from 'react'
import { mount } from 'enzyme'
import Item from './Item'

describe('<Item />', () => {
  it('should throw an error when rendered directly', () => {
    assert.throws(() => mount(<Item>Hello world</Item>))
  })

  describe('in production', () => {
    let nodeEnv
    before(() => {
      nodeEnv = process.env.NODE_ENV
      process.env.NODE_ENV = 'production'
    })

    after(() => {
      process.env.NODE_ENV = nodeEnv
    })

    it('should not throw', () => {
      assert.doesNotThrow(() => mount(<Item>Hello world</Item>))
    })
  })
})
