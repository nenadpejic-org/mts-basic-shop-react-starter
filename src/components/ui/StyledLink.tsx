import { ReactNode } from 'react'
import { NavLink, To } from 'react-router-dom'

type Props = {
  to: To
  children?: ReactNode
}

const StyledLink = ({ to, children }: Props) => {
  return (
    <NavLink
      className="inline-block font-medium text-gray-900 hover:underline"
      to={to}
    >
      {children}
    </NavLink>
  )
}

export default StyledLink
