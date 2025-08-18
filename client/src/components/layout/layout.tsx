import { FC } from 'react'
import { Outlet } from 'react-router'
import Navbar from '../Navbar'
import Footer from '../footer'

type LayoutProps = object;

const Layout: FC<LayoutProps> = () => {
  return <div>
    <Navbar />
    <Outlet />
    <Footer />
  </div>
}

export default Layout;
