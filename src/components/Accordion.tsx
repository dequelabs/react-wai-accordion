import * as React from 'react'
import * as PropTypes from 'prop-types'
import randomId from '../lib/randomId'
import logOrThrowError from '../lib/logOrThrowError'
import Item from './Item'
import ItemWrapper from './ItemWrapper'

const DEFAULT_CLASSPREFIX = 'Accordion'
const DEFAULT_IDPREFIX = 'accordion__'

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  classPrefix?: string
  idPrefix?: string
}

interface State {
  selectedItemId: string | null
}

class Accordion extends React.Component<Props, State> {
  public static displayName = 'Accordion'

  public static propTypes = {
    classPrefix: PropTypes.string,
    idPrefix: PropTypes.string,
    // Validate child component types.
    children(props: object, propName: string) {
      const children = props[propName]

      let hasInvalidChild = false

      if (!React.Children.count(children)) {
        return new Error(
          'Accordion expects at least a single AccordionItem child'
        )
      }

      React.Children.forEach(children, (child: React.ReactElement<any>) => {
        if (child.type !== Item || !child.props.children) {
          hasInvalidChild = true
          return
        }
      })

      if (hasInvalidChild) {
        return new Error(
          'Accordion expects children to be of type AccordionItem'
        )
      }

      return null
    }
  }

  public readonly state: State = {
    selectedItemId: null
  }

  // A map of child components to their IDs.
  private idMap = new WeakMap<any, string>()

  // Child ID -> item button ref map.
  private itemRefMap = new Map<string, HTMLButtonElement | null>()

  constructor(props) {
    super(props)

    // Set the initial IDs.
    React.Children.forEach(props.children, child => {
      const id = randomId(props.idPrefix || DEFAULT_IDPREFIX)
      this.idMap.set(child, id)
    })
  }

  public render() {
    const {
      children,
      classPrefix = DEFAULT_CLASSPREFIX,
      idPrefix,
      ...props
    } = this.props
    return (
      <div className={classPrefix} {...props}>
        {React.Children.map(children, this.renderChild)}
      </div>
    )
  }

  private renderChild = (child: any) => {
    // istanbul ignore if
    if (child.type !== Item) {
      logOrThrowError(
        'Accordion: invalid child provided. Expecting AccordionItem only'
      )
      return
    }

    // Ensure we update the ID map.
    if (!this.idMap.has(child)) {
      this.idMap.set(child, randomId(this.props.idPrefix || DEFAULT_IDPREFIX))
    }

    const { classPrefix = DEFAULT_CLASSPREFIX } = this.props
    const { title, children } = child.props
    const childId = this.idMap.get(child) as string
    const isOpen = this.state.selectedItemId === childId

    return (
      <ItemWrapper
        classPrefix={classPrefix}
        onFocusShift={this.handleFocusShift}
        title={title}
        id={childId}
        onToggle={this.handleToggleItem}
        open={isOpen}
        buttonRef={(el: HTMLButtonElement | null) =>
          this.itemRefMap.set(childId, el)
        }
      >
        {children}
      </ItemWrapper>
    )
  }

  private handleToggleItem = (itemId: string) => {
    if (this.state.selectedItemId === itemId) {
      this.setState({ selectedItemId: null })
    } else {
      this.setState({ selectedItemId: itemId })
    }
  }

  private handleFocusShift = (
    direction: 'start' | 'end' | 'forwards' | 'backwards',
    id: string
  ) => {
    const ids = Array.from(this.itemRefMap.keys())
    const index = ids.indexOf(id)
    let nextIndex: number = -1

    if (direction === 'start') {
      nextIndex = 0
    } else if (direction === 'end') {
      nextIndex = ids.length - 1
    } else if (direction === 'backwards') {
      if (index === 0) {
        nextIndex = ids.length - 1
      } else {
        nextIndex = index - 1
      }
    } else {
      if (index === ids.length - 1) {
        nextIndex = 0
      } else {
        nextIndex = index + 1
      }
    }

    const nextId = ids[nextIndex]
    const button = this.itemRefMap.get(nextId)

    if (!button) {
      logOrThrowError(`Accordion: unable to locate button "${nextId}"`)
      return
    }

    button.focus()
  }
}

export default Accordion
