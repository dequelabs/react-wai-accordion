import 'mocha'
import { assert } from 'chai'
import * as React from 'react'
import { mount, ReactWrapper } from 'enzyme'
import * as sinon from 'sinon'
import a11yTest from '../testutils/a11yTest'
import Accordion, { AccordionItem } from '..'

describe('<Accordion />', () => {
  // tslint:disable:no-console

  let consoleSpy: sinon.SinonSpy
  beforeEach(() => {
    consoleSpy = sinon.spy(console, 'error')
  })

  afterEach(() => {
    consoleSpy.restore()
  })

  it('should render without errors', () => {
    assert.doesNotThrow(() => {
      mount(
        <Accordion>
          <AccordionItem title="One">One content</AccordionItem>
          <AccordionItem title="Two">Two content</AccordionItem>
        </Accordion>
      )
    })
  })

  describe('given a custom classPrefix', () => {
    let m: ReactWrapper
    before(() => {
      m = mount(
        <Accordion classPrefix="Test">
          <AccordionItem title="One">One content</AccordionItem>
        </Accordion>
      )
    })

    it('should use the prefix', () => {
      const el = m.find('.Test')
      assert(el.length)
    })

    it('should pass the prefix down to all children', () => {
      const item = m.find('.Test-item')
      assert(item.length)

      const title = m.find('.Test-item-title')
      assert(title.length)

      const content = m.find('.Test-item-content')
      assert(content.length)
    })
  })

  describe('given no children', () => {
    it('should warn', () => {
      try {
        // Not using JSX to "trick" the TS compiler into allowing this.
        mount(React.createElement(Accordion, { classPrefix: 'hi' }))
      } catch (error) {
        // Ignore
      }

      assert.isTrue(consoleSpy.called)

      const call = consoleSpy.getCall(0)
      const warning = call.args[0]
      assert.include(
        warning,
        'Accordion expects at least a single AccordionItem child'
      )
    })
  })

  describe('given non-item children', () => {
    it('should warn', () => {
      try {
        mount(
          <Accordion classPrefix="F">
            <div />
          </Accordion>
        )
      } catch (error) {
        // Ignore
      }

      assert.isTrue(consoleSpy.called)

      const call = consoleSpy.getCall(0)
      const warning = call.args[0]
      assert.include(
        warning,
        'Accordion expects children to be of type AccordionItem'
      )
    })
  })

  describe('when toggling an item', () => {
    describe('when the item is closed', () => {
      it("should set `state.selectedItemId` to the item's id", () => {
        const m = mount(
          <Accordion>
            <AccordionItem title="hi">hello</AccordionItem>
          </Accordion>
        )

        const trigger = m.find('.Accordion-item-trigger')
        trigger.simulate('click')

        const node = trigger.getDOMNode()
        const triggerId = node.id
        const itemId = triggerId.replace('_title', '')

        assert.equal((m.state() as any).selectedItemId, itemId)
      })
    })

    describe('when the item is open', () => {
      it('should set `state.selectedItemid` to `null`', async () => {
        const m = mount(
          <Accordion>
            <AccordionItem title="hi">hello</AccordionItem>
          </Accordion>
        )

        const trigger = m.find('.Accordion-item-trigger')

        // Open the item.
        trigger.simulate('click')

        // Next tick.
        await Promise.resolve()

        // Close the item.
        trigger.simulate('click')

        assert.equal((m.state() as any).selectedItemId, null)
      })
    })
  })

  a11yTest(
    <Accordion>
      <AccordionItem title="One">One content</AccordionItem>
      <AccordionItem title="Two">Two content</AccordionItem>
    </Accordion>
  )
})
