import { ComponentPropsWithoutRef, ElementType, PropsWithChildren } from 'react'
import { twMerge } from 'tailwind-merge'
import Icon, { IconName } from './Icon'

const buttonVariants = {
  primary: 'bg-gray-800 text-gray-100',
  secondary: 'bg-gray-100 text-gray-900',
  ghost: 'bg-transparent text-gray-900 hover:bg-gray-100',
  icon: 'p-0 opacity-70 hover:opacity-100',
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ButtonElementType = ElementType<any, 'button' | 'a'>

type PolymorphicProps<T extends ButtonElementType> = PropsWithChildren<
  ComponentPropsWithoutRef<T> & {
    as?: T
  }
>

type Props<T extends ButtonElementType> = PolymorphicProps<T> &
  (
    | {
        variant?: Exclude<keyof typeof buttonVariants, 'icon'>
      }
    | {
        variant?: 'icon'
        icon: IconName
      }
  )

const Button = <T extends ButtonElementType = 'button'>({
  as,
  children,
  className,
  variant = 'primary',
  icon,
  ...rest
}: Props<T>) => {
  const Element = as || 'button'

  return (
    <Element
      className={twMerge(
        'inline-block px-4 py-2 text-center font-medium hover:cursor-pointer hover:opacity-90 disabled:pointer-events-none disabled:opacity-50',
        buttonVariants[variant],
        className,
      )}
      {...(Element === 'button' && { type: 'button' })}
      {...rest}
    >
      {icon ? <Icon icon={icon} /> : children}
    </Element>
  )
}

export default Button
