import React from 'react'
import { Outlet } from 'react-router'
import Header from '../Header/Header'


export const Main = () => {
  return (
    <div>
        <Header/>
        <div>
            <Outlet/>
        </div>
        
    </div>
  )
}
