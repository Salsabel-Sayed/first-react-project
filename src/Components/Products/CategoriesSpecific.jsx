import React from 'react'

function CategoriesSpecific({specificCatgry}) {

    if (!specificCatgry) {
        console.log("goa",specificCatgry);
        return 
      }

    // console.log("pra",specificCatgry);
  return (
    <>
    <section>
        <div className="container">
            <div className="row">
                <div className="col-md-4">
                    <div className="oneCatgry">
                        <img className='w-100 imgImp rounded-5' src={specificCatgry[0]?.data?.image} alt="" />
                        <h2 className='text-center'>{specificCatgry[0]?.data?.name}</h2>
                    </div>
                </div>
                
            </div>
        </div>
    </section>
      
    </>
  )
}

export default CategoriesSpecific
