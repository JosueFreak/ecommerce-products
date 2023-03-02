import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import "./styles/Navbar.css"

const Navbar = () => {

    const {products} = useSelector(store => store.cart)
    const {token} = useSelector(store => store.userInfo)

    return (
    <nav className='navbar'>
        <Link className='navbar_name' to="/"><h2>e-commerce</h2></Link>
        <div className='navbar_containerLinks'>
            <Link className='navbar_link' to="/login"><i className='bx bx-user'></i></Link>
            <Link className='navbar_link' to="/purchases"><i className='bx bx-box'></i></Link>
            <Link className='navbar_link' to="/cart"><i className='bx bx-cart'></i>{token ? <span>{products.length}</span> : ""}</Link>
        </div>
    </nav>
    )
}

export default Navbar
