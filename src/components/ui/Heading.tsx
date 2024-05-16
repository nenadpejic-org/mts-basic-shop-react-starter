import { HTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

const headingVariants = {
  h1: 'text-2xl',
  h2: 'text-xl',
  h3: 'text-lg',
}

type Props = HTMLAttributes<HTMLHeadingElement> & {
  as?: 'h1' | 'h2' | 'h3'
  variant?: keyof typeof headingVariants
}

const Heading = ({
  as = 'h1',
  variant,
  children,
  className,
  ...rest
}: Props) => {
  const Element = as

  return (
    <Element
      className={twMerge(
        'font-bold text-gray-900',
        headingVariants[variant || as],
        className,
      )}
      {...rest}
    >
      {children}
    </Element>
  )
}

export default Heading
