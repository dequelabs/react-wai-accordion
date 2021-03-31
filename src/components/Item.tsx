import * as React from 'react'
import * as PropTypes from 'prop-types'
import logOrThrowError from '../lib/logOrThrowError'

// All "allowed" div attrs, excluding title.
type DivAttrsNoTitle = Pick<
  React.HTMLAttributes<HTMLDivElement>,
  Exclude<keyof React.HTMLAttributes<HTMLDivElement>, 'title'>
>

interface Props extends DivAttrsNoTitle {
  children: React.ReactNode
  title: React.ReactNode
}

const Item: React.ComponentType<Props> = () => {
  logOrThrowError(
    'AccordionItem should not be rendered, but consumed by Accordion instead.'
  )
  return null
}

Item.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.node.isRequired
}

export default Item
