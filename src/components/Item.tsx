import * as React from 'react'
import logOrThrowError from '../lib/logOrThrowError'

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  open?: boolean
}

const Item = (props: Props) => {
  logOrThrowError(
    'AccordionItem should not be rendered, but consumed by Accordion instead.'
  )
  return null
}

export default Item
