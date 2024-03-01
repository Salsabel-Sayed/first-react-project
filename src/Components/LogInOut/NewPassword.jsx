import axios from 'axios';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
// import { authConText } from '../Context/AuthConText';
import { FallingLines } from 'react-loader-spinner';

function NewPassword() {
  
  // let {setToken}=useContext(authConText);
  const [loading,setloading]=useState(false);

  let nav =useNavigate()
  function resetPassword(){
    setloading(true)
    let rePassword =document.getElementById("newPassword").value
    let email =document.getElementById("email").value
    axios.put("https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
    {
      "email":email,
      "newPassword":rePassword
  }).then((res)=>{
    console.log("res repass", res);
    if(res.status === "success" ){
      toast.success(`password reset successfully`,{duration:1500,position:"top-center",style: {
        background: 'green',color:"white"
      }});

     }
    localStorage.setItem("token",res.data.token);
    // setToken(res.data.token)
    nav("/login")
  
  }).catch((err)=>{
    console.log("err repass",err);
    toast.error(`${err.message}`,{duration:1500,position:"top-center",style: {
      background: 'red',color:"white"
    }});
  })
  setloading(false)
  
  }
  return (
    <>
    <section>
        <div className="container">
            <div className="row">
            <div className="col-12">
              <div className="forgetpass">
                <label htmlFor="email">your email here .</label>
                <input
                  id="email"
                  className="form-control my-4"
                  placeholder="enter your new email"
                  type="email"
                />

                <label htmlFor="newPassword">
                  reset your new password here .
                </label>
                <input
                  id="newPassword"
                  className="form-control my-4"
                  placeholder="enter your new password"
                  type="password"
                />
                <button onClick={resetPassword}  type="submit" className="btn btn-success">
                {loading?<div className="d-flex vh-100 bg-success bg-opacity-50 justify-content-center align-items-center ">
               <FallingLines color="white" width="100" visible={true} ariaLabel="falling-circles-loading"/></div>:"confirm"}
              </button>
              </div>
              
            </div>
            </div>
        </div>
    </section>
      
    </>
  )
}

export default NewPassword
