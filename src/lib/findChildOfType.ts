import * as React from 'react'

const findChildOfType = (children: any, type: any) => {
  let found: React.ReactElement<any> | null = null
  React.Children.forEach(
    children,
    (child: React.ReactElement<any>) => {
      if (child.type === type) {
        found = child
      }
    }
  )
  return found
}

export default findChildOfType
