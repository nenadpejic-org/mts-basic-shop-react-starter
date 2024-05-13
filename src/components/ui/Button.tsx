import { ComponentPropsWithoutRef, ElementType, PropsWithChildren } from 'react'
import { twMerge } from 'tailwind-merge'

const buttonVariants = {
  primary: 'bg-gray-800 text-gray-100',
  secondary: 'bg-white text-gray-900',
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ButtonElementType = ElementType<any, 'button' | 'a'>

type Props<T extends ButtonElementType> = PropsWithChildren<
  ComponentPropsWithoutRef<T> & {
    as?: T
    variant?: keyof typeof buttonVariants
  }
>

const Button = <T extends ButtonElementType = 'button'>({
  as,
  children,
  className,
  variant = 'primary',
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
      {children}
    </Element>
  )
}

export default Button
