import { NavLink } from 'react-router-dom'
import { Cart } from './cart'
import StyledLink from './ui/StyledLink'

export type HeaderType = 'root' | 'console'

type Props = {
  type?: HeaderType
}

const Header = ({ type = 'root' }: Props) => {
  return (
    <header className="fixed inset-x-0 top-0 z-10 bg-white">
      <nav className="container flex h-[80px] items-center py-6">
        <NavLink className="font-extrabold" to="/">
          Basic Shop
        </NavLink>
        <ul className="ml-10 flex items-center gap-6">
          <li>
            <StyledLink to="/shop">Shop</StyledLink>
          </li>
          <li>
            <StyledLink to="/console">Console</StyledLink>
          </li>
        </ul>

        {type === 'root' && <Cart className="ml-auto" />}
      </nav>
    </header>
  )
}

export default Header
