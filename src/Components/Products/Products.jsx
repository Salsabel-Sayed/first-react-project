import React, { useContext, useState } from 'react';
import axios from 'axios';
import { FallingLines } from 'react-loader-spinner';
import { useQuery } from 'react-query';


import { Helmet } from 'react-helmet';
import Product from './Product';

function Products() { 

    

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
                <title>products</title>
            </Helmet>
           

         

            <section>
                <div className="container my-5">
                    <h1>shope categories</h1>
                    <div className="row btnStyle">
                        {data?.data.map((product, index) => <Product product={product} key={index}/>)}
                    </div>
                </div>
            </section>
        </>
    );
}

export default Products;
