import React, { useContext, useEffect, useState } from "react";
import { cartContext } from "../Context/CartContext";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";


function Product({ product }) {
  const {
    addToCart,
    favHeart,
    deleteFavHeart,
    wishList,
  } = useContext(cartContext);
  const [isHearted, setIsHearted] = useState(false);
 
  async function handleHeart(id) {
    await favHeart(id);
    setIsHearted(true);
  }
  // remove heart
  async function removeHeart(id) {
    await deleteFavHeart(id);
    setIsHearted(false);
  }
  async function addFromProductToCart(productsId) {
    let resCart = await addToCart(productsId);
    if (resCart.data.status === "success") {
      toast.success("Successfully created!", {
        duration: 1500,
        position: "top-center",style: {
          background: 'green',color:"white"
        }
      });
    } else {
      toast.error("error!", { duration: 1500, position: "top-center",style: {
        background: 'red',color:"white"
      } });
    }
  }
  useEffect(()=>{
    for( let i=0; i<wishList?.data?.length; i++){
      if( product.id === wishList.data[i]?._id){
        setIsHearted(true);
        break
      }
    }
  },[wishList,product])
  // console.log("wishlist", wishList);

  return (
    <>
      <div className="col-xl-2 ">
       <div className="produtsSection">
       {!isHearted ? (
          <i
            className={`fa-solid fa-heart heartIcon`}
            onClick={() => handleHeart(product.id)}></i>
        ) : (
          <i
            className={`fa-solid fa-heart red `}
            onClick={() => removeHeart(product.id)}></i>
        )}

        <Link to={`/ProductDetails/${product.id}`}>
          <div className="products p-2">
            <img className="w-100" src={product.imageCover} alt="" />
            <h4 className="h6 text-main">{product.category.name}</h4>
            <h2 className="h6">
              {product.title.split(" ").slice(0, 2).join(" ")}
            </h2>
            <div className="price d-flex justify-content-between">
              <span>{product.price} egp</span>
              <span>
                <i
                  className="fa-solid fa-star"
                  style={{ color: "#FFD43B" }}></i>
                {product.ratingsAverage}
              </span>
            </div>
          </div>
        </Link>
        <button
          onClick={() => addFromProductToCart(product.id)}
          className="btn btn-success form-control"
          type="submit">
          add to cart
        </button>
       </div>
      </div>
    </>
  );
}

export default Product;
