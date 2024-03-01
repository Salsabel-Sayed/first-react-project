import axios from 'axios'
import React, { useContext } from 'react'
import { FallingLines } from 'react-loader-spinner'
import { useQuery } from 'react-query'
import { BrandContext } from '../Context/BrandContext'
import { Link } from 'react-router-dom'

function Brands() {
  const{specificBrand}=useContext(BrandContext)


  async function brands(){
    const {data} = await axios.get("https://ecommerce.routemisr.com/api/v1/brands")
    console.log("brand data", data.data);
    return data

  }
  const {isLoading, data }= useQuery('getAllBrands', brands)

  if(isLoading){
    return <>
    
    <div className="d-flex vh-100 bg-success bg-opacity-50 justify-content-center align-items-center ">
               <FallingLines color="white" width="100" visible={true} ariaLabel="falling-circles-loading"/>
            </div>
   
    </>
}
  return (
    <>
    <section className='brand'>
        <div className="container">
            <div className="row g-5">
              {data?.data.map((item,indx)=>
              <Link to={"/SpecificBrand/"+item._id} key={indx} className="col-xl-4 brandLink">
              <div className="brands">
                  <img className='w-100' src={item.image} alt="" />
                  <h5 className='text-center text-main'>{item.name}</h5>
                  
              </div>
          </Link>)}
                
            </div>
        </div>
    </section>
      
    </>
  )
}

export default Brands
