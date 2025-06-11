import React from 'react'
import Header from './Header'

const Layout = ({children}) => {
  return (
    <div className='px-3 sm:px-0 font-rubik bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50'>
       <Header  />
       {children} 
    </div>
  )
}

export default Layout