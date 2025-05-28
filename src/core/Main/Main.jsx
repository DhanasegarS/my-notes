import React from 'react'
import { Outlet } from 'react-router'
import Header from '../Header/Header'
import SubHeader from '../Header/SubHeader'


export const Main = () => {
  return (
    <div>
      <SubHeader/>
        <Header/>
        <div>
            <Outlet/>
        </div>
        
    </div>
  )
}
