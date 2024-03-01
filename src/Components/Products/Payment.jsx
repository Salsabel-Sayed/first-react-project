import axios from 'axios'
import React, { useContext } from 'react'
import { cartContext } from '../Context/CartContext';
import toast from 'react-hot-toast';
import {  useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

function Payment() {
    const {cartId, getuserCart,totalCartPrice,settotalCartPrice} = useContext(cartContext);
    const navigate = useNavigate();
    // console.log(cartId);

    function paymntId(){
        const details = document.getElementById("details").value;
        const phone = document.getElementById("phone").value;
        const city = document.getElementById("city").value;
        const shipping ={
                "shippingAddress":{
                    "details": details,
                    "phone":phone,
                    "city":city
                    }
            }
        
        const resPayId = axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,shipping,
        {
            headers:{
                token:localStorage.getItem("token")
            }
        }

        ).then((res)=>{
            console.log("okkkkkkkk",res);
            
            if(res.data.status === "success"){
                toast.success('payment confirmed!',{duration:1500,position:"top-center",style: {
                    background: 'green',color:"white"
                  }});
                // setnumOfCartItem(0)
                getuserCart();
               
                
                navigate("/allorders")
                
               }

        }).catch((err)=>{
            console.log("hyyyyyyyyyyy",err);
            toast.error(`${err.response.data.message}`,{duration:1500,position:"top-center",style: {
                background: 'red',color:"white"
              }});
        })
        return resPayId

    }

    function paymntOnlineId(){
        const details = document.getElementById("details").value;
        const phone = document.getElementById("phone").value;
        const city = document.getElementById("city").value;

        const shipping ={
                "shippingAddress":{
                    "details": details,
                    "phone":phone,
                    "city":city
                    }
            }
        
        const resPayId = axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}`,shipping,
        {
            headers:{
                token:localStorage.getItem("token")
            },
            params:{
                url:"http://localhost:3000"
            }
        }

        ).then((res)=>{
            console.log("payment",res);
            
            
            if(res.data.status === "success"){
                window.open(res.data.session.url,"_blank")
                
               }
               settotalCartPrice(res.data.data.totalCartPrice)

        }).catch((err)=>{
            console.log(err.data);
            toast.error('error in pay!',{duration:1500,position:"top-center",style: {
                background: 'red',color:"white"
              }});
        })
        return resPayId

    }

  return (
    <>
     <Helmet>
        <title>payments</title>
    </Helmet>
    <section className='paymentSection'>
        <div className="container">
            <div className="row justify-content-around align-items-center allOver">
                <div className="col-xl-6 payDetails">
                    <div className="inputPay">
                        <label htmlFor="details">user details</label>
                        <input className='form-control mb-3' type="text" id='details' placeholder='user details' />  
                    </div>
                    <div className="inputPay">
                        <label htmlFor="city">cityName</label>
                        <input className='form-control mb-3' type="text" id='city' placeholder='user city' />   
                    </div>
                    <div className="inputPay">
                        <label htmlFor="phone">phone</label>
                        <input className='form-control mb-3' type="text" id='phone' placeholder='user phone' />   
                    </div>
                    <button onClick={paymntId} className='btn btn-primary mx-2'>confirm payment</button>
                    <button onClick={paymntOnlineId} className='btn btn-primary'>confirm online payment</button>
                </div>
                <div className="col-xl-4 ">
                    <div className="total">
                        <h2>total price : {totalCartPrice} egp</h2>
                    </div>
                </div>
            </div>
        </div>
    </section>
      
    </>
  )
}

export default Payment
