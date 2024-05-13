import { LinkProps, NavLink } from 'react-router-dom'

type Props = LinkProps

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
