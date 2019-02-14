import 'mocha'
import { assert } from 'chai'
import * as React from 'react'
import { mount } from 'enzyme'
import a11yTest from '../testutils/a11yTest'
import Content from './Content'

describe('<Content />', () => {
  it('should render without errors', () => {
    assert.doesNotThrow(() => {
      mount(<Content>Hello world</Content>)
    })
  })

  a11yTest(<Content>Hello world</Content>)
})
