import * as React from 'react'

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

const Content = ({ children, ...props }: Props) => (
  <div {...props}>{children}</div>
)

Content.displayName = 'AccordionContent'

export default Content
