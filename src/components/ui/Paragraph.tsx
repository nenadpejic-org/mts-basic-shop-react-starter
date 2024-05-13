import { HTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

const paragraphVariants = {
  lg: 'text-base font-normal',
  'lg-b': 'text-base font-semibold',
  md: 'text-sm',
  'md-b': 'text-sm font-semibold',
  sm: 'text-xs',
  'sm-b': 'text-xs font-semibold',
}

type Props = HTMLAttributes<HTMLParagraphElement> & {
  ellipsis?: boolean
  variant?: keyof typeof paragraphVariants
}

const Paragraph = ({
  children,
  className,
  ellipsis,
  variant = 'md',
}: Props) => {
  return (
    <p
      className={twMerge(
        'text-gray-900',
        paragraphVariants[variant],
        ellipsis && 'overflow-hidden overflow-ellipsis whitespace-nowrap',
        className,
      )}
    >
      {children}
    </p>
  )
}

export default Paragraph
