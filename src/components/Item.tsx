import * as React from 'react'
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

const Item = (props: Props) => {
  logOrThrowError(
    'AccordionItem should not be rendered, but consumed by Accordion instead.'
  )
  return null
}

export default Item
