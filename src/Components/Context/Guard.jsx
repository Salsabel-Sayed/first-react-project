import React from 'react';
import { Navigate } from 'react-router-dom';

function Guard({children}) {
    if(localStorage.getItem("token") == null){
        return <Navigate to="/LogIn" />

    }
  return (
    <>
    {children}
      
    </>
  )
}

export default Guard
