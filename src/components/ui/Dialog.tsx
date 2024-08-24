import { ReactNode, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { twMerge } from 'tailwind-merge'
import Button from './Button'
import Icon from './Icon'

type Props = {
  trigger: ReactNode
  children?: ReactNode
  className?: string
  contentClassName?: string
  footer?: ReactNode
  header?: ReactNode
  triggerClassName?: string
}

const Dialog = ({
  trigger,
  children,
  contentClassName,
  header,
  footer,
  triggerClassName,
}: Props) => {
  const [open, setOpen] = useState(false)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  useEffect(() => {
    if (open) {
      document.body.setAttribute(
        'style',
        `position: fixed !important; left: 0px; right: 0px; top: 0px; height: auto; pointer-events: none;`,
      )
    } else {
      document.body.removeAttribute('style')
    }
  }, [open])

  return (
    <>
      {/* Trigger */}
      <div className={triggerClassName} onClick={handleOpen}>
        {trigger}
      </div>

      {open &&
        createPortal(
          // Overlay
          <div
            className="pointer-events-auto fixed inset-0 z-10 grid place-items-center overflow-y-auto bg-black/80"
            onClick={handleClose}
          >
            {/* Content */}
            <div
              onClick={(e) => e.stopPropagation()}
              className={twMerge('bg-white lg:m-4', contentClassName)}
            >
              {/* Header */}
              <div className="flex items-center justify-between gap-2 p-4 text-center lg:text-start">
                <Icon className="lg:hidden" icon="placeholder" />
                {header}
                <Button
                  className="self-start"
                  variant="icon"
                  icon="close"
                  onClick={handleClose}
                />
              </div>

              {/* Main */}
              {children}

              {/* Footer */}
              {footer && <div className="mt-auto p-4">{footer}</div>}
            </div>
          </div>,
          document.body,
        )}
    </>
  )
}

export default Dialog
