import axios from 'axios';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { FallingLines } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';

function CodeVerfiy() {
  let nav =useNavigate();
  const [loading,setloading]=useState(false);
  

  function sentCodeVerify(){
    setloading(true)
    let resetCode = document.getElementById("resetCode").value
    axios.post("https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",{
      "resetCode":resetCode
  }).then((res)=>{
    console.log("code",res.data.status);
    if(res.data.status === "Success" ){
      toast.success(`${res.data.status}`,{duration:1500,position:"top-center",style: {
        background: 'green',color:"white"
      }});
      nav("/newPassword")
     }
  }).catch((err)=>{
    console.log("code err",err);
      {
        toast.error(`${err.message}`,{duration:1500,position:"top-center",style: {
          background: 'red',color:"white"
        }});
       }
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
                <label htmlFor="resetCode">please inter your code !</label>
                <input
                  id="resetCode"
                  className="form-control my-4"
                  placeholder="enter the code"
                  type="text"
                />
                 <button
                 onClick={sentCodeVerify}
                
                type="submit"
                className="btn btn-success">
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

export default CodeVerfiy
