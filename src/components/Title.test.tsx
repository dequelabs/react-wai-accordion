import 'mocha'
import { assert } from 'chai'
import * as React from 'react'
import { mount } from 'enzyme'
import a11yTest from '../testutils/a11yTest'
import Title from './Title'

describe('<Title />', () => {
  it('should render without errors', () => {
    assert.doesNotThrow(() => {
      mount(<Title>Hello world</Title>)
    })
  })

  describe('with is=div', () => {
    it('should render a div', () => {
      const m = mount(<Title is="div">Hello</Title>)
      const node = m.getDOMNode()
      assert.equal(node.nodeName, 'DIV')
    })
  })

  a11yTest(<Title>Hello world</Title>)
})
