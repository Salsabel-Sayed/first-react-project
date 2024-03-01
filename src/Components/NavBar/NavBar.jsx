import React, { useContext, useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,

} from 'reactstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import logoImg from "../../assets/freshcart-logo.svg";
import { authConText } from '../Context/AuthConText';
import { cartContext } from '../Context/CartContext';

function NavBar(args) {
  const {numOfCartItem,countWishNum}=useContext(cartContext)
  let {myToken , setToken} = useContext(authConText);
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    const navigate= useNavigate()

    // click on log out 
    function loggingOut(){
      setToken(null)
      localStorage.removeItem("token");
      navigate("/LogIn");

    }
   
  return (
    <div>
       <Navbar className='navbar' expand="xl" {...args}>
        <NavbarBrand to="/"><img src={logoImg} alt="logo img" /></NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>

          {myToken ? <Nav className="me-auto" navbar>
            <NavItem>
              <NavLink  className={({ isActive, isPending }) =>isPending ? "pending" : isActive ? "active" : ""} to="/home">home</NavLink>
            </NavItem>
            
            <NavItem>
              <NavLink to="/products">products</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/categories">categories</NavLink>
            </NavItem>
            <NavItem className="position-relative">
              <NavLink to="/cart" >cart
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">{numOfCartItem ?? ""}</span>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/brand">brand</NavLink>
            </NavItem>
            <NavItem className="position-relative">
              <NavLink to="/wishList" >wish list
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">{countWishNum ?? ""}</span>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/allorders">all orders</NavLink>
            </NavItem>
            
          </Nav> : "" }

          {!myToken ? <Nav className='ms-auto'>
          <NavItem>
              <NavLink className="register" to="/register">register</NavLink>
            </NavItem>
            <NavItem>
              <NavLink className="register" to="/login">log in</NavLink>
            </NavItem>
            
          </Nav> : <>
          <Nav className="ms-auto" navbar>
          <NavItem>
          <NavLink className="logOut" to="/profile">your profile</NavLink>
        </NavItem>
        <NavItem>
          <NavLink onClick={loggingOut} className="logOut" to="/login">log out</NavLink>
        </NavItem>
          </Nav>
          
          </>}
         
          
        
        </Collapse>
      </Navbar>
    </div>
  )
}

export default NavBar

