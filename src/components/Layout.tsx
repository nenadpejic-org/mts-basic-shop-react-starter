import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import Header, { HeaderType } from './Header'

type Props = {
  headerType?: HeaderType
}

const Layout = ({ headerType }: Props) => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header type={headerType} />

      <main className="mt-[80px] grow">
        <Outlet />
      </main>

      <Footer />
    </div>
  )
}

export default Layout
