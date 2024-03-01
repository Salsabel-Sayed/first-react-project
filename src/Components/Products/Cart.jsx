import React, { useContext } from 'react';
import { cartContext } from '../Context/CartContext';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

function Cart() {
  const {deleteCart,updateCount,totalCartPrice,allProducts,clearAll}=useContext(cartContext);

  if(!allProducts){
    
    return <>
    <h1 className='text-center mt-4'>ops! your cart is empty ...</h1>
   
    
    </>

  }

  async function updateCartProduct(id,newCount){
    // id,newCount
    const res = await updateCount(id,newCount);
    // console.log("res update",res);

    if(res){
      toast.success('Successfully added!',{duration:1500,position:"top-center",style: {
        background: 'green',color:"white"
      },});
     }else{
      toast.error('error in adding!',{duration:1500,position:"top-center",style: {
        background: 'red',color:"white"
      },});
     }


  }

  async function deleteCartProduct(id){
    const deltRes = await deleteCart(id);
    if(deltRes){
      toast.success('Successfully deleted!',{duration:1500,position:"top-center",style: {
        background: 'green',color:"white"
      }});
     }else{
      toast.error('cant delete!',{duration:1500,position:"top-center",style: {
        background: 'red',color:"white"
      }});
     }
    
  }

  
  async function clearCartProduct(){
    const cleartRes = await clearAll();
    if(cleartRes){
      toast.success('Successfully clear!',{duration:1500,position:"top-center",style: {
        background: 'green',color:"white"
      }});
     }else{
      toast.error('cant clear!',{duration:1500,position:"top-center",style: {
        background: 'red',color:"white"
      }});
     }
    
  }


  return (
    <>

<Helmet>
        <title>my cart</title>
    </Helmet>
   <section className='cart'>
      <div className="container">
       <div className="shopName">
       <h2 className='text-center fs-1'>shopping bag</h2>
        <p className='priceTotal'>total price : {totalCartPrice} egp</p>
       </div>
            <div className="btnsTop d-flex justify-content-end">
            <button onClick={()=>clearCartProduct()} className="btn btn-outline-danger">clear all</button>
            <Link to="/payment" className="btn btn-primary paymentBtn">payment</Link>
            </div>
        
        {allProducts?.map((item,indx)=>
           <div key={indx} className="row cartLine mb-4 justify-content-around align-items-center" >
            
           <div className="col-xl-2">
             <img className='w-100'style={{height:"200px"}} src={item.product.imageCover} alt={item.product.title} />
           </div>
           <div className="col-xl-8">
             <p>{item.product.title}</p>
             <h4>price : {item.price}</h4>
             <button onClick={()=>deleteCartProduct(item.product.id)} className='btn btn-outline-danger'>remove</button>
             
           </div>
           <div className="col-xl-2">
            <div className='d-flex justify-content-around'>
            <button onClick={()=>updateCartProduct(item.product.id,item.count + 1)} className='btn btn-outline-success'>+</button>
             <h4>{item.count}</h4>
             <button disabled={item.count === 1} onClick={()=>updateCartProduct(item.product.id,item.count - 1)} className='btn btn-outline-success'>-</button>
            </div>
           </div>
         </div>
        )}
       
      </div>
    </section>
    
    </>
  )
}

export default Cart
