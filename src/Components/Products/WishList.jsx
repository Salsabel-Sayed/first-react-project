import React, { useContext } from 'react';
import { cartContext } from '../Context/CartContext';

function WishList() {
    const {wishList,deleteFavHeart,addToCart}=useContext(cartContext);
  return (
    <>
    <section className='wishListSection'>
        <div className="container">
            <div className="row">
                
                    {wishList?.data.map((wish)=><div key={wish._id} className="col-md-4"><div className="wish">
                    <div className="p-2 ">
                        <img className='w-100' src={wish.imageCover} alt={wish.name} />
                        <h4 className='h6 text-main'>{wish.name}</h4>
                        <h2 className="h5">{wish.title}</h2>
                        <div className="price d-flex justify-content-between ">
                            <span>{wish.price} egp</span>
                            <span><i className="fa-solid fa-star" style={{color: "#FFD43B"}}></i> 4.5</span> 
                        </div>                           
                    </div>
                    <div>
                    <button onClick={()=>addToCart(wish._id)} className='btn btn-success form-control' type='submit'>add to cart</button>  
                    <button onClick={()=>deleteFavHeart(wish._id)} className='btn btn-danger form-control' type='submit'>remove from wishlist</button>  
                        </div>              

                    </div></div>)};
                    
                
            </div>
        </div>
    </section>
      
    </>
  )
}

export default WishList
