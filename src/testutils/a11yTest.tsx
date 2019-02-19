import 'mocha'
import { assert } from 'chai'
import * as React from 'react'
import { mount } from 'enzyme'
import * as axe from 'axe-core'

let fixture: HTMLDivElement

type ElementCallback = () => React.ReactElement<{}>

const a11yTest = (element: ElementCallback | React.ReactElement<{}>) => {
  // You must opt-in to a11y tests using the env var.
  const a = process.env.A11Y_TEST
  if (a !== 'true' && a !== '1') {
    return
  }

  if (!fixture) {
    fixture = document.createElement('div')
    document.body.appendChild(fixture)
  }

  after(() => {
    fixture.innerHTML = ''
  })

  it('should not contain axe-core violations', async () => {
    const m = mount(typeof element === 'function' ? element() : element)
    const node = m.getDOMNode()

    fixture.append(node)

    const report = await axe.run(node)
    assert.isEmpty(report.violations, 'Found accessibility violations')
  })
}

export default a11yTest
