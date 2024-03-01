import React, { useState } from 'react';
import { Form } from 'reactstrap';
import { Formik, useFormik } from 'formik';
import axios from 'axios';
import { Hearts } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';



function SignUp() { 
    const [success,setSuccess]=useState(false);
    const [iserror,setIserror]=useState(undefined);
    const [loading,setloading]=useState(false);
    const navigate = useNavigate();

 
    const myFormik = useFormik({
        initialValues:{
            name: "",
            email:"",
            password: "",
            rePassword:"",
            phone:""   
        },
        onSubmit: async function(values){
            setloading(true)

                try {
                    const res = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup", values);
                console.log("succes",res.data);
                setSuccess(true);
                setIserror(false); 
          
                // handleSuccessStateChange();
                setTimeout(() => {
                    setSuccess(false);
                    
                }, 2000)
                navigate("/LogIn")

                    
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
        const nameRegx =/^\w{3,10}$/;       
        const emailRegx =/^[a-zA-z0-9]{3,}@(gmail|yahoo)\.com$/;
        // const passwordRegx =/^[0-9]{6}$/;
        const phoneRegx =/^(010|011|012)\d{8}$/;
        if(nameRegx.test(values.name) === false){  
            errors.name ="name is invalid";
        }      
        if(emailRegx.test(values.email)===false){ 
            errors.email ="email is informate";
        }
        if(values.password.length < 6 || values.password.length > 12){
            errors.password = "password must be more than 3 numbers only without any characters"
        }
        if(values.rePassword !== values.password){
            errors.rePassword="password does not match"
        }
        if(phoneRegx.test(values.phone) === false){  
            errors.phone ="phone is invalid";
        }

        return errors
    
       },
       
       
  
    })
   
    

  return (
    <>
    <Helmet>
        <title>sign up</title>
    </Helmet>
    <section className='signUp'>
        <div className="container">
       
            {iserror ?<div className="alert alert-danger text-center">{iserror}</div> : "" }
            {success ? <div className="alert alert-success text-center">successfuly creat</div> :"" }
            
            
            <h2>register now :</h2>
            <div className="row">
                <div className="col-12">
                    <div className="formy">
                    <Formik>
                    <Form onSubmit={myFormik.handleSubmit}>
                        <label htmlFor="name">name: </label>
                        <input onBlur={myFormik.handleBlur} onChange={myFormik.handleChange} className="form-control mb-4" type="text" id= "name" placeholder='enter your name ...'/>
                        {myFormik.errors.name && myFormik.touched.name ? <div className=" alert alert-danger">{myFormik.errors.name}</div> :""}

                        <label htmlFor="email">email address:</label>
                        <input onBlur={myFormik.handleBlur} onChange={myFormik.handleChange} className="form-control mb-4" type="email" id='email' placeholder='enter your email...' />
                        {myFormik.errors.email && myFormik.touched.email  ? <div className=" alert alert-danger">{myFormik.errors.email}</div> :""}

                        <label htmlFor='password'>password:</label>
                        <input onBlur={myFormik.handleBlur} onChange={myFormik.handleChange} className="form-control mb-4" type="password"  id='password' placeholder=" enter your password..."/>
                        {myFormik.errors.password && myFormik.touched.password ? <div className=" alert alert-danger">{myFormik.errors.password}</div> :""}

                        <label htmlFor='rePassword'>rePassword:</label>
                        <input onBlur={myFormik.handleBlur} onChange={myFormik.handleChange} className="form-control mb-4" type="password"  id='rePassword' placeholder=" rewrite password..."/>
                        {myFormik.errors.rePassword && myFormik.touched.rePassword ? <div className=" alert alert-danger">{myFormik.errors.rePassword}</div> :""}

                        <label htmlFor='phone'>phone:</label>
                        <input onBlur={myFormik.handleBlur} onChange={myFormik.handleChange} className="form-control mb-4" type="text"  id='phone' placeholder=" enter your phone..."/>
                        {myFormik.errors.phone && myFormik.touched.phone ? <div className=" alert alert-danger">{myFormik.errors.phone}</div> :""}
                         
                           <button type="submit" className="btn btnSubmit">
                            {loading ? <Hearts height="80" width="80" color="red" ariaLabel="hearts-loading" visible={true}/> :"register"}
                           </button>
                        


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

export default SignUp
