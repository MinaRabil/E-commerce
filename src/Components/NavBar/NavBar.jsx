import React, { useContext } from 'react'
import styles from './NavBar.module.css'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import { CartContext } from '../../context/CartContext';

export default function NavBar() {

  const { userToken, setUserToken } = useContext(AuthContext);
  const { numOfCartItems } = useContext(CartContext);
  const nav= useNavigate()
  function handleLogout() {
    setUserToken(null)
/*      localStorage.removeItem("token")
     nav("/login") */

   }

  return <>
    <nav className="navbar navbar-expand-lg bg-black navbar-dark ">
      <div className="container">
        <Link className="navbar-brand" to="/">Fresh Market</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {userToken && <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link " aria-current="page" to="/">Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/products">Products</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/categories">Categories</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/brands">Brands</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/whishlist">Whishlist</NavLink>
            </li>
            <li className="nav-item position-relative">
              <NavLink className="nav-link" to="/cart">Cart
                <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {numOfCartItems}
                  <span class="visually-hidden">unread messages</span>
                </span>
              </NavLink>
            </li>

          </ul>}



          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center">
            <li className="nav-item ">
              <a className="fab fa-facebook text-white mx-2 " href="https://www.facebook.com/" target='_blank'></a>
            </li>
            <li className="nav-item ">
              <a className="fab fa-instagram text-white mx-2" href="https://www.facebook.com/" target='_blank'></a>
            </li>
            <li className="nav-item ">
              <a className="fab fa-tiktok text-white mx-2" href="https://www.facebook.com/" target='_blank'></a>
            </li>
            <li className="nav-item ">
              <a className="fab fa-twitter text-white mx-2" href="https://www.facebook.com/" target='_blank'></a>
            </li>
            <li className="nav-item ">
              <a className="fab fa-youtube text-white mx-2" href="https://www.facebook.com/" target='_blank'></a>
            </li>

            {
              userToken ?
                <>
                  <li className="nav-item">
                    <NavLink className="nav-link" to={"/profile"} >Profile</NavLink>
                  </li>

                  <li className="nav-item">
                    <Link className="nav-link" onClick={handleLogout} >Logout</Link>
                  </li>
                </>
                : <>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/register">Register</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/login">Login</NavLink>
                  </li>
                </>

            }

          </ul>

        </div>
      </div>
    </nav>

  </>


}
