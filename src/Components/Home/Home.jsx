import React, { useContext, useState } from 'react';
import axios from 'axios';
import { FallingLines} from 'react-loader-spinner';
import { useQuery } from 'react-query';
import { Helmet } from 'react-helmet';

import HomeSlider from '../Products/HomeSlider';
import Categories from '../Products/Categories';
import imgSlideSmall1 from "../../assets/small1.jpg";
import imgSlideSmall2 from "../../assets/small2.jpg";
import Product from '../Products/Product';


function Home() {

    
    // add to cart from products 
   
    async function prodctApi(){
        let { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/products");
        return data;   
    }

    const { isLoading, data } = useQuery('getAllProducts', prodctApi);

    if(isLoading){
        return (
            <div className="d-flex vh-100 bg-success bg-opacity-50 justify-content-center align-items-center ">
               <FallingLines color="white" width="100" visible={true} ariaLabel="falling-circles-loading"/>
            </div>
        );
    }
  return (
    <>
     <Helmet>
        <title>home</title>
    </Helmet>
    <section className='mt-4 homesection'>
                <div className="container">
                    <div className="row g-0">
                        <div className="col-xl-10">
                            <HomeSlider/>
                        </div>
                        <div className="col-xl-2">
                            <div>
                                <img className='w-100' style={{height:"150px"}} src={imgSlideSmall1} alt="slideSamll" />   
                            </div>
                            <div className=''>
                                <img className='w-100' style={{height:"150px"}} src={imgSlideSmall2} alt="slideSamll" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className='productSection'>
                <div className="container my-5">
                    <h1>shope categories</h1>
                    <div className="row g-5 my-3 btnStyle">
                        {data?.data.map((product, index) => <Product product={product} key={index}/>)}
                    </div>
                </div>
            </section>
    <Categories/>
    </>
  )
}

export default Home
