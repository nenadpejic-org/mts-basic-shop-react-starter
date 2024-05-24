import { ReactNode, useRef, useState } from 'react'
import { twMerge } from 'tailwind-merge'

type Align = 'start' | 'center' | 'end'

type Side = 'top' | 'bottom'

type MenuItem = {
  label: string
  onClick: () => void
}

type Props = {
  trigger: ReactNode | ((props: { open: boolean }) => JSX.Element)
  align?: Align
  children?: ReactNode
  className?: string
  contentClassName?: string
  menuItems?: MenuItem[]
  side?: Side
}

const DropdownMenu = ({
  trigger,
  align = 'center',
  children,
  className,
  contentClassName,
  menuItems,
  side = 'top',
}: Props) => {
  const triggerContainerRef = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState<boolean>(false)

  return (
    <>
      {/* Overlay */}
      {open && (
        <div className="absolute inset-0 z-10" onClick={() => setOpen(false)} />
      )}

      <div className={twMerge('relative inline-block', className)}>
        {/* Trigger */}
        <div
          className="flex items-center justify-center"
          ref={triggerContainerRef}
          onClick={() => setOpen((pV) => !pV)}
        >
          {typeof trigger === 'function' ? trigger({ open }) : trigger}
        </div>

        {/* Content */}
        {triggerContainerRef.current && open && (
          <div
            className={twMerge(
              `absolute z-10 border border-gray-500 bg-white shadow-md`,
              contentClassName,
            )}
            style={getContentPositionStyle({
              side,
              align,
              triggerHeight: triggerContainerRef.current.offsetHeight,
            })}
          >
            <ul className="py-2">
              {menuItems?.map((menuItem, i) => (
                <li key={i}>
                  <button
                    className="w-full px-4 py-1 text-start text-gray-900 hover:bg-gray-100"
                    type="button"
                    onClick={() => {
                      menuItem.onClick()
                      setOpen(false)
                    }}
                  >
                    {menuItem.label}
                  </button>
                </li>
              ))}
              {children}
            </ul>
          </div>
        )}
      </div>
    </>
  )
}

export default DropdownMenu

type GetContentPositionStyleProps = {
  side: Side
  align: Align
  triggerHeight: number
}

const getContentPositionStyle = ({
  side,
  align,
  triggerHeight,
}: GetContentPositionStyleProps) => {
  const sideOffset = 4
  const totalOffset = triggerHeight + sideOffset

  let style = {}

  switch (side) {
    case 'top':
      style = { ...style, bottom: totalOffset }
      break
    case 'bottom':
      style = { ...style, top: totalOffset }
      break
  }

  switch (align) {
    case 'start':
      style = {
        ...style,
        left: 0,
      }
      break
    case 'center':
      style = {
        ...style,
        left: '50%',
        transform: 'translateX(-50%)',
      }
      break
    case 'end':
      style = {
        ...style,
        right: 0,
      }
      break
  }

  return style
}
