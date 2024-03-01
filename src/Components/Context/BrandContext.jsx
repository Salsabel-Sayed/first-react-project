import axios from 'axios';
import React, { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const BrandContext = createContext()

function BrandContextProvider({children}) {

    const [getBrand,setGetBrand]=useState(null);
    const nav =useNavigate()
  
    // get  specific brand
  
    async function specificBrand(_id){
       await axios.get(`https://ecommerce.routemisr.com/api/v1/products?brand=${_id}`)
       .then((res)=>{
        console.log("spcfc brand",res.data);
        setGetBrand(res.data)
          // nav(`/SpecificBrand/${_id}`)  
       })
       .catch((err)=>{
        console.log("err",err);
       })
       
       
    }



  return (
    <>
    <BrandContext.Provider value={{getBrand,setGetBrand,specificBrand}}>
    {children}
    </BrandContext.Provider>
    
      
    </>
  )
}

export default BrandContextProvider
