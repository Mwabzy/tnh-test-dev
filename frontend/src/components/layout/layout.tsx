import { FC } from 'react'
import { Outlet } from 'react-router'
import Navbar from '../Navbar'
import Footer from '../footer'
import Quicklinks from '../quicklinks';

type LayoutProps = object;

const Layout: FC<LayoutProps> = () => {
  return <div>
    
    <Quicklinks/>
    <Navbar />
    <Outlet />
    <Footer />
  </div>
}

export default Layout;
