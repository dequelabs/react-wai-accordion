# @deque/react-accordion

[![CircleCI](https://circleci.com/gh/dequelabs/react-accordion.svg?style=svg&circle-token=74120e2187dd217faaaaf9b1180d252f5bed4f03)](https://circleci.com/gh/dequelabs/react-accordion)

> An Accordion component for React, based on the [WAI Accordion guidelines](https://www.w3.org/TR/wai-aria-practices/#accordion).

## Installation

With `npm`, do:

```
npm install @deque/react-accordion
```

## Usage

This component was designed to be used as building-blocks for a more complex component. It _only_ takes care of the logic, ARIA relationships and markup required for an accordion. It does not provide _any_ styling for you &mdash; you must write your own styles.

However, example styles can be found in `src/example/app.css`.

### Simple Example

A simple example demonstrating how to use the component.

```js
import React from 'react'
import ReactDOM from 'react-dom'
import Accordion, { AccordionItem } from '@deque/react-accordion'

const App = () => (
  <div className="App">
    <Accordion classPrefix="MyAccordion" idPrefix="acc_">
      <AccordionItem title="Fruits">
        <h4>List of fruits</h4>
        <ul>
          <li>apples</li>
          <li>oranges</li>
          <li>bananas</li>
        </ul>
      </AccordionItem>
      <AccordionItem title={<span>Animals</span>}>
        <h4>List of animals</h4>
        <ul>
          <li>Dogs</li>
          <li>Chickens</li>
          <li>Alligators</li>
        </ul>
      </AccordionItem>
    </Accordion>
  </div>
)

const container = document.createElement('div')
document.body.appendChild(container)

ReactDOM.render(App, container)
```

A full example can be seen in `src/example` and run with `npm run dev`.

### Component API

The `@deque/react-accordion` package exports 2 different components, each with a specific purpose as described below.

#### `<Accordion />`

The top-level `<Accordion />` component houses your `<AccordionItem />`s. It is where the majority of the logic/state for the accordion is held.

The `<Accordion />` component **must** be provided children, and those children **must** be of the type `<AccordionItem />`. Failure to provide `<AccordionItem />`s will result in an error being thrown in development (deduced via `process.env.NODE_ENV`).

##### Accordion Props

- `children`: any number of `<AccordionItem />`s
- `classPrefix`: an optional prefix to use for defining the classes used within the the `<Accordion />`. This prefix will be applied to all rendered components.
- `idPrefix`: an optional prefix to use for the randomly generated IDs the `<Accordion />` children will be given.

Any additional props provided to the `<Accordion />` will be passed onto the rendered `<div>` element.

#### `<AccordionItem />`

The `<AccordionItem />` denotes a collapsable item within the `<Accordion />`. The `<AccordionItem />` **must** be provided a `title` and `children` to expand/collapse.

##### AccordionItem Props

- `title`: a string or JSX element to render for the item's title
- `children`: content to expand/collapse

Any additional props provided to the `<AccordionItem />` will be passed onto the rendered `<div>` element.

### CSS API

The `Accordion` components use a predefined set of classes which can be used for styling. By default, the classes are prefixed with `Accordion`, but this may be changed by providing the `<Accordion classPrefix="Something" />` prop.

The classes which can be used for custom styles are:

- `Accordion`: the top-level `<Accordion />` div
- `Accordion-item`: applied to each `<AccordionItem />` div
- `Accordion-item-open`: applied to the open `<AccordionItem />` div
- `Accordion-item-title`: applied to the div wrapping each `<AccordionTitle />`
- `Accordion-item-trigger`: the button used to expand/collapse an `<AccordionItem />`
- `Accordion-item-icon`: a span for drawing an icon within the title
- `Accordion-item-content`: applied to the div wrapping each `<AccordionContent />`

## License

MPL 2.0
