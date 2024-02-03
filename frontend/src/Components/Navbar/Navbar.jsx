import React, { useContext, useRef, useState } from 'react'
import './Navbar.css'

import logo from '../Assets/logo.png'
import cart_icon from '../Assets/cart_icon.png'
import { Link } from 'react-router-dom'
import { ShopContext } from '../../Context/ShopContext'
import dropDown from '../Assets/dropdown_icon.png'


const Navbar = () => {
    const [menu,setMenu] = useState("shop");
    const {getTotalCartItems} = useContext(ShopContext);
    const menuRef = useRef()
    const dropdown_toggle = (e)=>{
        menuRef.current.classList.toggle('nav-menu-visible')
        e.target.classList.toggle('open')
    }
  return (
    <div className='navbar'>
        <div className="nav-logo">
            <img  src={logo} alt="This is the logo" />
            <p>SHOPPER</p>
        </div>
        <img className='nav-dropdown' src={dropDown} onClick={dropdown_toggle} alt="" />
        <ul ref={menuRef} className="nav-menu">
            <li onClick={()=>{setMenu("shop")}} ><Link style={{textDecoration:'none', color:'#171717'}} to='/'>Shop</Link>{menu==='shop'?<hr/>:<></>}</li>
            <li onClick={()=>{setMenu('mens')}} ><Link style={{textDecoration:'none', color:'#171717'}} to='/mens'>Mens</Link>{menu==='mens'?<hr/>:<></>}</li>
            <li onClick={()=>{setMenu('women')}} ><Link style={{textDecoration:'none', color:'#171717'}} to='/women'>Women</Link>{menu==='women'?<hr/>:<></>}</li>
            <li onClick={()=>{setMenu('kids')}} ><Link style={{textDecoration:'none', color:'#171717'}} to='/kids'>Kids</Link>{menu==='kids'?<hr/>:<></>}</li>
        </ul>
        <div className="nav-login-cart">
            <button><Link style={{textDecoration:'none', color:'#171717'}} to='/login'>Login</Link></button>
            <Link style={{textDecoration:'none', color:'#171717'}} to='/cart'><img src={cart_icon} alt="This the cart_icon" /></Link>
            <div className="nav-cart-count">{getTotalCartItems()}</div>
        </div>
    </div>
  )
}

export default Navbar