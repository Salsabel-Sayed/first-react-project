import React from 'react';
import { Helmet } from 'react-helmet';
import notFoundImg from "../assets/error.svg"

function NotFound() {
  return (
    <>
     <Helmet>
        <title>not found page</title>
    </Helmet>
    <section className='notFoundSection'> 
      <div className="container">
        <div className="row ">
          <div className="col-12">
            <div className="notFoundImg d-flex justify-content-center align-items-center ">
            <img src={notFoundImg} alt="not found page" />
            </div>
          </div>
        </div>
      </div>
    </section>
      
    </>
  )
}

export default NotFound
