import * as React from 'react'

interface Props extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode
  is?: string
}

const Title = ({ children, is = 'h4', ...props }: Props) =>
  React.createElement(is, props, children)

Title.displayName = 'AccordionTitle'

export default Title
