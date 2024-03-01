import React from 'react'
import NavBar from './../NavBar/NavBar';
import { Outlet } from 'react-router-dom';



function LayOuts() {
  return (
    <>
    <NavBar/>
   
    <Outlet/>
      
    </>
  )
}

export default LayOuts
