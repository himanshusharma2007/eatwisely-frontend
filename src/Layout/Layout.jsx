import React from 'react'
import Header from './Header'

const Layout = ({children}) => {
  return (
    <div className='px-3 sm:px-0 font-rubik bg-[#F6FFFA]'>
       <Header  />
       {children} 
    </div>
  )
}

export default Layout