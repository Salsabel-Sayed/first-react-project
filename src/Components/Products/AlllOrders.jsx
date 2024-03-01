import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FallingLines } from 'react-loader-spinner';
import { Helmet } from 'react-helmet';


function AlllOrders() {
    const [allOrders,setAllOrders]=useState(null)

    function getUserOrder(){
        const userId = localStorage.getItem("userorderId")
        // console.log("user id",userId);
        axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`)
        .then((res)=>{
            // console.log("order data",res.data);
            setAllOrders(res.data)

        })
        .catch((err)=>{
            // console.log(err);

        })
    };
    useEffect(()=>{
        getUserOrder();

    },[])

    if(!allOrders){
        return <>
       
       <div className="d-flex vh-100 bg-success bg-opacity-50 justify-content-center align-items-center ">
               <FallingLines color="white" width="100" visible={true} ariaLabel="falling-circles-loading"/>
            </div>
        
        </>

    }
  return (
    <>
    <Helmet>
        <title>my orders</title>
    </Helmet>

    <section className='allOrederSection'>
    <div className="container">
        <div className="row g-3">
            {allOrders.map((order,indx)=> <div key={indx} className="col-xl-6">
                <div className="orders">
                    <h5>payment method: <span style={{color:"green"}}>{order.paymentMethodType}</span></h5>
                    <h4>order price: <span style={{color:"green"}}>{order.totalOrderPrice}</span></h4>
                </div>
            </div>)}
        </div>
    </div>
    </section>

      
    </>
  )
}

export default AlllOrders
