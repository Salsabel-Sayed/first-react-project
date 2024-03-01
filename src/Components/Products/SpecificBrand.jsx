import React, { useContext, useEffect } from 'react'
import { BrandContext } from '../Context/BrandContext'
import { FallingLines } from 'react-loader-spinner'
import { useParams } from 'react-router-dom'

function SpecificBrand() {
    const{getBrand,specificBrand}=useContext(BrandContext)
    let paramId = useParams()
    // console.log("paramId",paramId);

    useEffect(()=>{
        specificBrand(paramId._id)

      },[])
    if(!getBrand){
    
        return <>
       <div className="d-flex vh-100 bg-success bg-opacity-50 justify-content-center align-items-center ">
               <FallingLines color="white" width="100" visible={true} ariaLabel="falling-circles-loading"/>
            </div>
        
        </>
    
      }
     
  return (
    <>
    <section className='brandSpecific'>
        <div className="container">
            <div className="row g-4">
                {getBrand?.data.map((brand,indx)=>(<div key={indx} className="col-6 ">
                    <div className="oneBrand d-flex justify-content-around align-items-center">
                        <img src={brand?.imageCover} alt="" />
                        <h4 className='text-center'>{brand?.title}</h4>
                    </div>

                </div>))}
                
            </div>
        </div>
    </section>
      
    </>
  )
}

export default SpecificBrand
