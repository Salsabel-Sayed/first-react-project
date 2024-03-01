import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { authConText } from './AuthConText';
export const cartContext = createContext();

function CartContextProvider({children}) {

  // all state
  const [allProducts,setAllProducts]=useState(null);
  const [cartId,setCartId]=useState(null);
  const [numOfCartItem,setnumOfCartItem]=useState(0);
  const [countWishNum,setcountWishNum]=useState(0);
  const [totalCartPrice,settotalCartPrice]=useState(0);
  const {myToken}=useContext(authConText);


    // const [isHearted, setIsHearted] = useState(false);
    const [wishList,setWishList]=useState(null)
  


// favorite wishlist
  function favHeart(id){
    console.log("id fav", id);

    const { data } = axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
        "productId": id
    }, {
        headers: { token: localStorage.getItem("token") }
    })
    .then((res) => {
        console.log("ress fav", res.data);
        getWishList() 
        return res   
    })
    .catch((err) => {
        console.log("err fav", err);
    });

    console.log("fav data", data);
}

function deleteFavHeart(id){
  const { data } = axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`, 
   {
      headers: { token: localStorage.getItem("token") }
  })
  .then((res) => {
      console.log("remove fav", res.data);
      getWishList() ;
      
      return res   
  })
  .catch((err) => {
      // console.log("err remove", err);
  });

  // console.log("fav data", data);
}

// get user wishlist
  async function getWishList(){

  try {
    const res = await axios.get("https://ecommerce.routemisr.com/api/v1/wishlist",
      {
        headers: { token: localStorage.getItem("token") }
      });
    console.log("set fav ", res.data.count);
    setWishList(res.data);
    setcountWishNum(res.data.count)
   

  } catch (err) {
    console.log("set fav err", err);
  }
  
}


  async function addToCart(productId){
    try {
      const response = await axios.post("https://ecommerce.routemisr.com/api/v1/cart", {
        "productId": productId
      }, {
        headers: { token: localStorage.getItem("token") }
      });
      console.log("cart res",response);
      getuserCart()
     
      return response;
    } catch (error) {
      // console.log("rerCart", error);
      throw error;
    }
  }

  function getuserCart(){
    axios.get("https://ecommerce.routemisr.com/api/v1/cart",{
      headers: { token :localStorage.getItem('token')}
    }).then((res)=>{
      // console.log("rescart uu",res.data.data.cartOwner);
      setCartId(res.data.data._id);
      localStorage.setItem("userorderId",res.data.data.cartOwner);
      // console.log("-id",res.data.data._id);
      setAllProducts(res.data.data.products);
      setnumOfCartItem(res.data.numOfCartItems)
      // console.log("getuserCart", res.data.numOfCartItems);
      settotalCartPrice(res.data.data.totalCartPrice)
     


    }).catch((err)=>{
      console.log("getuserCart",err);
      setnumOfCartItem(0)
    })
  }

  async function updateCount(id,newCount){
    const bool= await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,
    {
      "count": newCount
    },{
      headers:{
        token: localStorage.getItem( 'token' )
      }
    }).then((res)=>{
      setnumOfCartItem(res.data.numOfCartItems)
      // console.log("updateCount", res.data.numOfCartItems);
      settotalCartPrice(res.data.data.totalCartPrice)
      setAllProducts(res.data.data.products)
      // console.log("wareny", res);

      return true
    }).catch((err)=>{
      console.log(err)

      return false
    })
    return bool
  }

  async function deleteCart(id){
    const deltBool=await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{
      headers:{
        token :localStorage.getItem('token')
      }
    }).then((res)=>{
      // console.log("delt res", res);
      setnumOfCartItem(res.data.data.numOfCartItems)
      // console.log("deleteCart",res.data.numOfCartItems);
      settotalCartPrice(res.data.data.totalCartPrice)
      setAllProducts(res.data.data.products)
      return true

    }).catch((err)=>{
      console.log("delt error",err);
      return false
    })
    return deltBool
  }

  async function clearAll(){
    const clearBool=await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`,{
      headers:{
        token :localStorage.getItem('token')
      }
    }).then((res)=>{
      console.log("clear res", res);
      setnumOfCartItem(0)
      // console.log("clearAll", setnumOfCartItem);
      settotalCartPrice(0)
      setAllProducts([])
     
      return true

    }).catch((err)=>{
      console.log("delt error",err);
      return false
    })
    return clearBool
  }
  useEffect(()=>{
    getuserCart()
    getWishList()
   
  } ,[myToken])

   
  return (
    <cartContext.Provider value={{getuserCart,addToCart,numOfCartItem,totalCartPrice,allProducts,updateCount,deleteCart,clearAll,cartId,wishList,setWishList,favHeart,deleteFavHeart,countWishNum,totalCartPrice,settotalCartPrice}}>
    {children}
      
    </cartContext.Provider>
  )
}

export default CartContextProvider
