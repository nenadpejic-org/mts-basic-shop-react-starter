import { ReactNode } from 'react'

type Props = {
  href?: string
  children?: ReactNode
}

const StyledLink = ({ href, children }: Props) => {
  return (
    <a
      className="inline-block font-medium text-gray-900 hover:underline"
      href={href}
    >
      {children}
    </a>
  )
}

export default StyledLink
