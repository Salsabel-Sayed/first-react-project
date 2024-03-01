import axios from 'axios';
import React, { useState } from "react";
import { FallingLines } from 'react-loader-spinner';
import { useQuery } from 'react-query';
import Slider from "react-slick";
import { Helmet } from 'react-helmet';
import CategoriesSpecific from './CategoriesSpecific';



function Categories() {
  const[getSpecificCatgry,setGetSpecificCatgry] = useState(null)

   function categoryApi(){
     return  axios.get("https://ecommerce.routemisr.com/api/v1/categories")     
  }



  const {data , isLoading } = useQuery("category", categoryApi)
  // console.log("catgry" , data);

  if(isLoading){
    return <>
    
    <div className="d-flex vh-100 bg-success bg-opacity-50 justify-content-center align-items-center ">
               <FallingLines color="white" width="100" visible={true} ariaLabel="falling-circles-loading"/>
            </div>
   
    </>
}
  const settings = {
    focusOnSelect: true,
    infinite: true,
    slidesToShow: 6,
    slidesToScroll: 1,
    speed: 500
  }

  async function categoryApiSpecific(id){
    const res= await axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}`)
    console.log("catgry", res.data);
    setGetSpecificCatgry(res.data)
 }


 // console.log("catgry" , data);

 if(isLoading){
   return <>
   <div className="d-flex vh-100 bg-primary bg-opacity-50 justify-content-center align-items-center ">
               <FallingLines color="white" width="100" visible={true} ariaLabel="falling-circles-loading"/>
            </div>
   </>
}
 const settingsspecific = {
   focusOnSelect: true,
   infinite: true,
   slidesToShow: 6,
   slidesToScroll: 1,
   speed: 500
 }


  return (


    <>

<Helmet>
        <title>categories</title>
    </Helmet>
      <section>
        <div className="container">
          <div className="row g-4">
            <div className="col-12">
              <div className="slider-container">
                <div>shop categories</div>
                <Slider {...settings}>
                  {data.data.data.map((category, indx) => (
                    <div onClick={()=>categoryApiSpecific(category._id)} key={indx}>
                      <img
                        className="w-100"
                        style={{ height: "250px" }}
                        src={category.image}
                        alt={category.name}
                      />
                      <h3 className='h6 text-center'>{category.name}</h3>
                    </div>
                  ))}
                </Slider>
              </div>
            </div>
          </div>
        </div>
      </section>
      <CategoriesSpecific specificCatgry ={[getSpecificCatgry]}/>
    </>
  );
}

export default Categories
