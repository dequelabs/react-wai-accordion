import 'mocha'
import { assert } from 'chai'
import * as React from 'react'
import { mount, ReactWrapper } from 'enzyme'
import * as sinon from 'sinon'
import { codes as keycodes } from 'keycode'
import * as numberSuffix from 'ordinal-number-suffix'
import a11yTest from '../testutils/a11yTest'
import Accordion, { AccordionItem } from '..'

describe('<Accordion />', () => {
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
        // @ts-ignore
        mount(<Accordion classPrefix="hi" />)
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

  describe('keyboard events', () => {
    let m: ReactWrapper
    let triggers: ReactWrapper

    beforeEach(() => {
      m = mount(
        <Accordion>
          <AccordionItem title="one">hello</AccordionItem>
          <AccordionItem title="two">hello</AccordionItem>
          <AccordionItem title="three">hello</AccordionItem>
        </Accordion>
      )

      triggers = m.find('.Accordion-item-trigger')
    })

    interface KeyboardTestCase {
      keyname: string
      startIndex: number
      endIndex: number
    }

    const tests: KeyboardTestCase[] = [
      {
        keyname: 'up',
        startIndex: 0,
        endIndex: 2
      },
      {
        keyname: 'up',
        startIndex: 1,
        endIndex: 0
      },
      {
        keyname: 'down',
        startIndex: 0,
        endIndex: 1
      },
      {
        keyname: 'down',
        startIndex: 2,
        endIndex: 0
      },
      {
        keyname: 'home',
        startIndex: 1,
        endIndex: 0
      },
      {
        keyname: 'end',
        startIndex: 1,
        endIndex: 2
      }
    ]

    tests.forEach(({ keyname, startIndex, endIndex }) => {
      const s = numberSuffix(startIndex)
      describe(`pressing "${keyname}" on the ${s} element`, () => {
        it('should focus the correct element', () => {
          const start = triggers.at(startIndex)
          const end = triggers.at(endIndex)

          const endNode = end.getDOMNode()

          const focusSpy = sinon.spy(endNode as HTMLButtonElement, 'focus')

          start.simulate('keydown', {
            which: keycodes[keyname]
          })

          assert.isTrue(focusSpy.called, 'Did not focus expected element')
        })
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
