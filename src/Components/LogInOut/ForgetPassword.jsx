import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';



function ForgetPassword() {
  const [loading,setloading]=useState(false);
  let nav = useNavigate()


  function rewriteEmail(){
    setloading(true)
    let email=document.getElementById("email").value;
    axios.post("https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
    {
        "email": email
    }).then((res)=>{
      console.log("rewriteEmail" , res);
      if(res.data.statusMsg === "success" ){
        toast.success(`${res.data.message}`,{duration:1500,position:"top-center",style: {
          background: 'green',color:"white"
        }});
        nav("/codeverfiy")
        
       }
    }).catch((err)=>{
      console.log("reww", err);
      if(err.response.data.statusMsg == "fail"){
        {
          toast.error(`${err.response.data.message}`,{duration:1500,position:"top-center",style: {
            background: 'red',color:"white"
          }});
         }
      }
    })
    setloading(false)
  
  }
  
  
  
 
  return (
    <>
      <section className='forgetSection'>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="forgetpass">
                <label htmlFor="email">
                  please inter your email to send a code
                </label>
                <input
                  id="email"
                  className="form-control my-4"
                  placeholder="enter your eamil"
                  type="email"
                />
                <button onClick={rewriteEmail} type="submit" className="btn btn-success">{loading?<div className="d-flex vh-100 bg-success bg-opacity-50 justify-content-center align-items-center ">
               <FallingLines color="white" width="100" visible={true} ariaLabel="falling-circles-loading"/></div>:"confirm"}</button>
               
              </div>
              
            </div>

      
           
          </div>
        </div>
      </section>
    </>
  );
}

export default ForgetPassword
