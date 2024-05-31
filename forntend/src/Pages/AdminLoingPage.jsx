import React from 'react'
import "./CSS/AdminLoinpage.css"
import { Link } from 'react-router-dom'
import admin_image from "../Components/Assets/admin.png"

export const AdminLoinPage = () => {

  /*
  const LoginAlert = (e) => {
    const username ="";
    const password ="";
    if(e.target.name === "Username"){
      username = e.target.value;
    }
    if(e.target.name === "Password"){
      password = e.target.value;
    }
    if (username !== "" && password !== "") {
      alert("Welcome " + username);
    } else {
      alert("Please enter both username and password");
    }
  }  */

  return (
    <div className='main-continer'>
      <div className='Admin-container'>
      <div className='Admin-header'>
        <div className='Admin-header-image'><img src={admin_image } alt="" /></div>
        <h2>Admin Login</h2>
      </div>

      <div className='Admin-body'>
        <input type="text" placeholder='Username' className='Admin-body-input' name='Username' />
        <input type="text" placeholder='Password' className='Admin-body-input' name='Password'/>
        <button className='Admin-body-button'> <Link to="/Admin" style={{textDecoration:"none"}}>SIGN IN</Link></button>
      </div>
    </div>
    </div>
    
  )
}
