import React from 'react'
import Header from './header2'
import Footer from './Footer'
const Layout = ({children}) => {
  return (
    <>
    <Header></Header>
    {children}
    <Footer></Footer>
    </>
  )
}

export default Layout