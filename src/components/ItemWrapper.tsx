import * as React from 'react'
import keycode = require('keycode')
import classes from '../lib/classes'

// All "allowed" div attrs, excluding title.
type DivAttrsNoTitle = Pick<
  React.HTMLAttributes<HTMLDivElement>,
  Exclude<keyof React.HTMLAttributes<HTMLDivElement>, 'title'>
>

interface Props extends DivAttrsNoTitle {
  classPrefix: string
  title: React.ReactNode
  children: React.ReactNode
  id: string
  onToggle: (id: string) => void
  onFocusShift: (
    direction: 'start' | 'end' | 'forwards' | 'backwards',
    id: string
  ) => void
  open: boolean
  buttonRef: (el: HTMLButtonElement | null) => void
}

class ItemWrapper extends React.Component<Props> {
  public static displayName = 'AccordionItemWrapper'

  public render(): React.ReactElement {
    const {
      id,
      title,
      children,
      className = '',
      open,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      onToggle,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      onFocusShift,
      buttonRef,
      classPrefix,
      ...props
    } = this.props

    const cx = classes({
      [`${classPrefix}-item`]: true,
      [`${classPrefix}-item-open`]: open,
      [className]: !!className
    })

    const contentId = `${id}_content`
    const titleId = `${id}_title`

    return (
      <div className={cx} {...props}>
        <div className={`${classPrefix}-item-title`}>
          <button
            aria-expanded={open}
            className={`${classPrefix}-item-trigger`}
            aria-controls={contentId}
            id={titleId}
            onKeyDown={this.handleKeydown}
            onClick={this.handleClick}
            ref={buttonRef}
            type="button"
          >
            {title}
            <span className={`${classPrefix}-item-icon`} aria-hidden={true} />
          </button>
        </div>

        <div
          id={contentId}
          role="region"
          aria-labelledby={titleId}
          className={`${classPrefix}-item-content`}
          hidden={!open}
        >
          {children}
        </div>
      </div>
    )
  }

  private handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    this.props.onToggle(this.props.id)
  }

  private handleKeydown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    const { id, onFocusShift } = this.props
    const key = keycode(e.which)

    if (key === 'up' || key === 'page up') {
      e.preventDefault()
      onFocusShift('backwards', id)
    } else if (key === 'down' || key === 'page down') {
      e.preventDefault()
      onFocusShift('forwards', id)
    } else if (key === 'home') {
      onFocusShift('start', id)
    } else if (key === 'end') {
      onFocusShift('end', id)
    }
  }
}

export default ItemWrapper
