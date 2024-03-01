import React from 'react';
import Products from './Components/Products/Products';
import SignUp from './Components/LogInOut/SignUp';
import LogIn from './Components/LogInOut/LogIn';
import './App.css';
import { RouterProvider, createHashRouter } from 'react-router-dom';
import LayOuts from './Components/AllPages/LayOuts';
import NotFound from './Components/NotFound';
import AuthConTextProvider from './Components/Context/AuthConText';
import Cart from './Components/Products/Cart';
import Categories from './Components/Products/Categories';
import Guard from './Components/Context/Guard';
import { QueryClient, QueryClientProvider } from 'react-query';
import ProductDetails from './Components/Products/ProductDetails';
import CartContextProvider from './Components/Context/CartContext';
import { Toaster } from 'react-hot-toast';
import Payment from './Components/Products/Payment';
import Home from './Components/Home/Home';
import AlllOrders from './Components/Products/AlllOrders';
import Profile from './Components/LogInOut/Profile';
import { Offline } from 'react-detect-offline';
import Brands from './Components/Products/Brands';
import WishList from './Components/Products/WishList';
import SpecificBrand from './Components/Products/SpecificBrand';
import BrandContextProvider from './Components/Context/BrandContext';
import ForgetPassword from './Components/LogInOut/ForgetPassword';
import NewPassword from './Components/LogInOut/NewPassword';
import CodeVerfiy from './Components/LogInOut/CodeVerfiy';




const myRouter = createHashRouter([
  {
    path: "/",
    element: <LayOuts />,
    children: [
      { index: true, element: <Home /> },
      { path: "/register", element: <SignUp /> },
      { path: "/login", index: "true", element: <LogIn /> },
      { path: "/home", element: <Home /> },
      {
        path: "/products",
        element: (
          <Guard>
            <AuthConTextProvider>
              <Products />
            </AuthConTextProvider>
          </Guard>
        ),
      },
      {
        path: "/allorders",
        element: (
          <Guard>
            <AuthConTextProvider>             
              <AlllOrders />
            </AuthConTextProvider>
          </Guard>
        ),
      },
      {
        path: "/ProductDetails/:id",
        element: (
          <Guard>
            <AuthConTextProvider>              
              <ProductDetails />
            </AuthConTextProvider>
          </Guard>
        ),
      },
      {
        path: "/payment",
        element: (
          <Guard>
            <AuthConTextProvider>
              <Payment />
            </AuthConTextProvider>
          </Guard>
        ),
      },
      {
        path: "/cart",
        element: (
          <Guard>
            <AuthConTextProvider>
              <Cart />
            </AuthConTextProvider>
          </Guard>
        ),
      },
      {
        path: "/categories",
        element: (
          <Guard>
            <AuthConTextProvider>
              <Categories />
            </AuthConTextProvider>
          </Guard>
        ),
      },
      {
        path: "/brand",
        element: (
          <Guard>
            <AuthConTextProvider>
              <BrandContextProvider>
              <Brands />
              </BrandContextProvider>
            </AuthConTextProvider>
          </Guard>
        ),
      },
      {
        path: "/SpecificBrand/:_id",
        element: (
              <BrandContextProvider>
              <SpecificBrand />
              </BrandContextProvider> 
        ),
      },
      {
        path: "/profile",
        element: (
          <Guard>
            <AuthConTextProvider>
              <Profile />
            </AuthConTextProvider>
          </Guard>
        ),
      },
      {
        path: "/wishList",
        element: (
          <Guard>
            <AuthConTextProvider>
              <WishList />
            </AuthConTextProvider>
          </Guard>
        ),
      },
      {
        path: "/forgetpassWord",
        element: (
           <ForgetPassword />
        ),
      },
      {
        path: "/newPassword",
        element: (
           <NewPassword />
        ),
      },
      {
        path: "/codeverfiy",
        element: (
           <CodeVerfiy/>
        ),
      },
      { path: "*", element: <NotFound /> },
    ],
  },
]);


function App() {
  const myClient = new QueryClient();
 

 
  return (
    <>

    <QueryClientProvider client={myClient}>
     
    <AuthConTextProvider>
    <CartContextProvider>
     <RouterProvider router={myRouter}/>
     </CartContextProvider>
     </AuthConTextProvider>
    </QueryClientProvider>
    <Toaster/>
    <Offline>
      <h1 className="bg-white p-4 fs-4">you are offline</h1>

    </Offline>
   
     
    </>
  );
}

export default App;
