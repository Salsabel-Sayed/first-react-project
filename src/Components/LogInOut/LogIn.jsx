import React, { useContext, useState } from 'react';
import { Form } from 'reactstrap';
import { Formik, useFormik } from 'formik';
import axios from 'axios';
import { FallingLines} from 'react-loader-spinner';
import { Link, useNavigate } from 'react-router-dom';
import { authConText } from '../Context/AuthConText';
import { Helmet } from 'react-helmet';



function LogIn() { 
    const [success,setSuccess]=useState(false);
    const [iserror,setIserror]=useState(undefined);
    const [loading,setloading]=useState(false);
    const navigate = useNavigate();
    let {setToken} = useContext(authConText);

 
    const myFormik = useFormik({
        initialValues:{
          
            email:"",
            password: "",
             
        },
        onSubmit: async function(values){
            setloading(true)

                try {
                    const res = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin", values);
                console.log("succes",res.data);
                console.log("token",res.data.token);
                localStorage.setItem("token", res.data.token);
                setToken(res.data.token)


                setSuccess(true);
                setIserror(false); 
          
              
                setTimeout(() => {
                    setSuccess(false);
                    
                }, 2000)
                navigate("/home")

                    
                } catch (error) {
                    console.log('errorrrrr',error);
                    setIserror(error.response.data.message);
                    // handleErrorStateChange();
                    setTimeout(() => {
                        setIserror(false);
                    }, 2000)
                    console.log("exist" ,error.response.data.message);
                    
                } 
                setloading(false) 
        },
       validate:(values)=>{
        const errors ={};     
        const emailRegx =/^[a-zA-z0-9]{3,}@(gmail|yahoo)\.com$/;
           
        if(emailRegx.test(values.email)===false){ 
            errors.email ="email is informate";
        }
        if(values.password.length < 6 || values.password.length > 12){
            errors.password = "password must be more than 3 numbers only without any characters"
        }
        return errors  
       },
    })
   
    

  return (
    <>
    <Helmet>
        <title>log in</title>
    </Helmet>
    <section className='login'>
        <div className="container">
            {iserror ?<div className="alert alert-danger text-center">{iserror}</div> : "" }
            {success ? <div className="alert alert-success text-center">welcome back</div> :"" }           
            
            <h2>login now :</h2>
            <div className="row">
                <div className="col-12">
                    <div className="formy">
                    <Formik>
                    <Form onSubmit={myFormik.handleSubmit}>
                        <label htmlFor="email">email address:</label>
                        <input onBlur={myFormik.handleBlur} onChange={myFormik.handleChange} className="form-control mb-4" type="email" id='email' placeholder='enter your email...' />
                        {myFormik.errors.email && myFormik.touched.email  ? <div className=" alert alert-danger">{myFormik.errors.email}</div> :""}

                        <label htmlFor='password'>password:</label>
                        <input onBlur={myFormik.handleBlur} onChange={myFormik.handleChange} className="form-control mb-4" type="password"  id='password' placeholder=" enter your password..."/>
                        {myFormik.errors.password && myFormik.touched.password ? <div className=" alert alert-danger">{myFormik.errors.password}</div> :""}
                           <button type="submit" className="btn btnSubmit">
                            {loading ? <div className="d-flex bg-success bg-opacity-50 justify-content-center align-items-center ">
               <FallingLines color="white" width="100" visible={true} ariaLabel="falling-circles-loading"/></div> :"login"}
                           </button>
                           <Link to="/forgetpassWord"><span className="frgtPass" >forget password ?</span></Link>
                    </Form>
                    </Formik>
                    </div>
                </div>
            </div>
        </div>
    </section>
      
    </>
  )
}

export default LogIn
