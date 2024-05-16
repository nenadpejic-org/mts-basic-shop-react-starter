import { ReactNode, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { twMerge } from 'tailwind-merge'
import Button from './Button'
import Icon from './Icon'

const drawerAnchorVariants = {
  bottom: 'inset-x-0 bottom-0 mt-24 h-auto border-t',
  right: 'inset-y-0 right-0 ml-12 border-l',
}

type Props = {
  trigger: ReactNode
  anchor?: keyof typeof drawerAnchorVariants
  children?: ReactNode
  contentClassName?: string
  footer?: ReactNode
  header?: ReactNode
  triggerClassName?: string
}

const Drawer = ({
  trigger,
  anchor = 'bottom',
  children,
  contentClassName,
  footer,
  header,
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
      <button className={triggerClassName} onClick={handleOpen}>
        {trigger}
      </button>

      {open &&
        createPortal(
          <>
            {/* Overlay */}
            <div
              className="pointer-events-auto fixed inset-0 z-50 bg-black/80"
              onClick={handleClose}
            />

            {/* Content */}
            <div
              className={twMerge(
                'pointer-events-auto fixed z-50 flex max-h-screen flex-col bg-white',
                drawerAnchorVariants[anchor],
                contentClassName,
              )}
            >
              {/* Header */}
              <div className="flex items-center justify-between gap-2 p-4 text-center md:text-start">
                <Icon className="md:hidden" icon="placeholder" />
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
          </>,
          document.body,
        )}
    </>
  )
}

export default Drawer
