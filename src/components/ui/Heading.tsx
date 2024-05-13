import { HTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

type Props = HTMLAttributes<HTMLHeadingElement>

const Heading = ({ children, className, ...rest }: Props) => {
  return (
    <h1
      className={twMerge('text-2xl font-bold text-gray-900', className)}
      {...rest}
    >
      {children}
    </h1>
  )
}

export default Heading
