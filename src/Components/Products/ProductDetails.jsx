import React, { useContext } from 'react'
import toast from 'react-hot-toast';
import axios from 'axios';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { FallingLines } from 'react-loader-spinner';
import { cartContext } from '../Context/CartContext';
import { Helmet } from 'react-helmet';

function ProductDetails() {

     // add to cart 
    const {addToCart}=useContext(cartContext);
    console.log("fff",addToCart);
    // console.log("addToCart", addToCart);

    // adding to cart by id 
    async function addingProductBtId(preid){
        // console.log("id", preid);
       let resId = await addToCart(preid);
    
 
     //toast msg
       if(resId.data.status === "success"){
        toast.success('Successfully created!',{duration:1500,position:"top-center",style: {
            background: 'green',color:"white"
          }});
       }else{
        toast.error('error!',{duration:1500,position:"top-center",style: {
            background: 'red',color:"white"
          }});
       }
    }   
    const {id} =useParams();
    // const Navigate=useNavigate()

    async function catgryDetails(){
        let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
        return data
    }
    const {data, isLoading , isError}=useQuery("catgryDetails",catgryDetails);
    // console.log("details data",data);

    if(isLoading){
        return <>
    
        <div className="d-flex vh-100 bg-success bg-opacity-50 justify-content-center align-items-center ">
               <FallingLines color="white" width="100" visible={true} ariaLabel="falling-circles-loading"/>
       
        </div> 
        </>
    }
    if(isError){
        // return <Navigate to="products"/>
    }
    const productIdData = data?.data


  return (
    <>
     <Helmet>
        <title>product details</title>
    </Helmet>
    <section className='productDetailSection'>
        <div className="container">
            <div className="row align-items-center align-content-space-around details">
                <div className="col-12 col-xl-4">
                    <div className="detailsImga">
                        <img className='w-100' src={productIdData.imageCover} alt={productIdData.title} />

                    </div>
                </div>
                <div className="col-12 col-xl-8">
                    <div className="detailsImga">
                        <p>{productIdData.title}</p>
                        <p>{productIdData.description}</p>
                        <h5 style={{color:"green"}}>{productIdData.category.name}</h5>
                        <div className="price d-flex justify-content-between ">
                            <span> {productIdData.price} egp</span>
                            <span><i className="fa-solid fa-star" style={{color: "#FFD43B"}}></i> {productIdData.ratingsAverage}</span>
                        </div>
                        <button onClick={()=> addingProductBtId(productIdData.id)} className='form-control btn btn-success my-5' type='submit'>add to cart</button>

                    </div>
                </div>
            </div>
        </div>
    </section>
      
    </>
  )
}

export default ProductDetails
