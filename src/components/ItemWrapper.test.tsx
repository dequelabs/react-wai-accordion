import 'mocha'
import { assert } from 'chai'
import * as React from 'react'
import { mount, ReactWrapper } from 'enzyme'
import * as sinon from 'sinon'
import keycode = require('keycode')
import a11yTest from '../testutils/a11yTest'
import ItemWrapper from './ItemWrapper'

const noop = () => {
  // Nothing.
}

describe('<ItemWrapper />', () => {
  it('should render without errors', () => {
    assert.doesNotThrow(() => {
      mount(
        <ItemWrapper
          id="itemid"
          title="hi"
          open={false}
          onToggle={noop}
          onFocusShift={noop}
          buttonRef={noop}
          classPrefix="Item"
        >
          hello
        </ItemWrapper>
      )
    })
  })

  it('should set `aria-controls` properly', () => {
    const m = mount(
      <ItemWrapper
        id="test"
        title="Hello"
        open={false}
        onToggle={noop}
        onFocusShift={noop}
        buttonRef={noop}
        classPrefix="potato"
      >
        hello
      </ItemWrapper>
    )

    const el = m.find('#test_title')
    const node = el.getDOMNode()
    assert.equal(node.getAttribute('aria-controls'), 'test_content')
  })

  it('should set `aria-labelledby` properly', () => {
    const m = mount(
      <ItemWrapper
        id="test"
        title="Hello"
        open={false}
        onToggle={noop}
        onFocusShift={noop}
        buttonRef={noop}
        classPrefix="potato"
      >
        hello
      </ItemWrapper>
    )

    const el = m.find('#test_content')
    const node = el.getDOMNode()
    assert.equal(node.getAttribute('aria-labelledby'), 'test_title')
  })

  it('should set `role=region` on the content', () => {
    const m = mount(
      <ItemWrapper
        id="test"
        title="Hello"
        open={false}
        onToggle={noop}
        onFocusShift={noop}
        buttonRef={noop}
        classPrefix="potato"
      >
        hello
      </ItemWrapper>
    )

    const el = m.find('#test_content')
    const node = el.getDOMNode()
    assert.equal(node.getAttribute('role'), 'region')
  })

  describe('given a custom className', () => {
    it('appends the class to the list', () => {
      const m = mount(
        <ItemWrapper
          id="itemid"
          title="Hello"
          open={false}
          onToggle={noop}
          onFocusShift={noop}
          buttonRef={noop}
          classPrefix="potato"
          className="Hello"
        >
          hello
        </ItemWrapper>
      )

      const el = m.find('.potato-item.Hello')
      assert.equal(el.length, 1)
    })
  })

  describe('given open=true', () => {
    let m: ReactWrapper
    before(() => {
      m = mount(
        <ItemWrapper
          id="itemid"
          title="Hello"
          open={true}
          onToggle={noop}
          onFocusShift={noop}
          buttonRef={noop}
          classPrefix="potato"
        >
          hello
        </ItemWrapper>
      )
    })

    it('should set `aria-expanded=true` on the trigger', () => {
      const el = m.find('.potato-item-trigger')
      const node = el.getDOMNode()
      assert.equal(node.getAttribute('aria-expanded'), 'true')
    })

    it('should set not set `hidden` on the content', () => {
      const el = m.find('.potato-item-content')
      const node = el.getDOMNode()
      assert.isFalse(node.hasAttribute('hidden'))
    })
  })

  describe('clicking the title', () => {
    it('should fire onToggle', () => {
      const onToggle = sinon.stub()

      const m = mount(
        <ItemWrapper
          id="itemid"
          title="Hello"
          open={false}
          onToggle={onToggle}
          onFocusShift={noop}
          buttonRef={noop}
          classPrefix="potato"
        >
          hello
        </ItemWrapper>
      )

      const el = m.find('.potato-item-trigger')
      el.simulate('click')

      assert.isTrue(onToggle.called)
      assert.isTrue(onToggle.calledWith('itemid'))
    })
  })

  describe('keyboard events on the title', () => {
    const tests = [
      ['down', 'forwards'],
      ['page down', 'forwards'],
      ['up', 'backwards'],
      ['page up', 'backwards'],
      ['home', 'start'],
      ['end', 'end']
    ]

    tests.forEach(([key, direction]) => {
      describe(`pressing "${key}"`, () => {
        it(`should fire onFocusShift with direction="${direction}"`, () => {
          const onFocusShift = sinon.stub()

          const m = mount(
            <ItemWrapper
              id="itemid"
              title="Hello"
              open={false}
              onToggle={noop}
              onFocusShift={onFocusShift}
              buttonRef={noop}
              classPrefix="potato"
            >
              hello
            </ItemWrapper>
          )

          const el = m.find('.potato-item-trigger')
          el.simulate('keydown', {
            which: keycode.codes[key]
          })

          assert.isTrue(onFocusShift.called)
          assert.isTrue(onFocusShift.calledWith(direction, 'itemid'))
        })
      })
    })
  })

  a11yTest(() => (
    <ItemWrapper
      id="itemid"
      title="Hello"
      open={false}
      onToggle={noop}
      onFocusShift={noop}
      buttonRef={noop}
      classPrefix="Item"
    >
      hello
    </ItemWrapper>
  ))
})
