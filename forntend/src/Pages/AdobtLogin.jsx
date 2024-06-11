import React, { useState } from 'react'
import "./CSS/AdobtLogin.css"
import { Link } from 'react-router-dom'
import adopt_image from "../Components/Assets/adopt.png"
import {  toast } from 'react-toastify';

export const AdobtLogin = () => {

  const[Adopterdetails,SetAdopterdetails]=useState({})

  const HandleChange = (e)=>{
    SetAdopterdetails({...Adopterdetails,[e.target.name]:e.target.value})
  }

  const AdopterLogin = async()=>{
    try{
      const Resphonsedata = await fetch("http://localhost:1010/Adopterlogin" ,{
      method:"post",
      headers: {
        Accept: 'application/json',
        'content-Type': 'application/json',
      },
      body: JSON.stringify(Adopterdetails)
    })

    const data = await  Resphonsedata.json();
    if(data.success){
      localStorage.setItem('auth-token', data.token);
      window.location.replace('/Adobt/ViewChild');
      toast.success(data.message)
    }else{
      toast.error(data.message);
    }
   
  }catch (error) {
    console.error('Error:', error);
    toast.error('An error occurred. Please try again later.');
  }
    

  }

  return (
    <div className='AdobtLogin-main-continer'>
      <div className='AdobtLogin-container'>
        <div className='AdobtLogin-header'>
          <div  className='AdobtLogin-header-image'><img src={adopt_image}  alt="" /></div>
          <h2>Adopter Login</h2>
        </div>

        <div className='AdobtLogin-body'>
          <input type="password" />
          <input type="text" placeholder='Email' className='AdobtLogin-body-input' name='email' onChange={HandleChange } />
          <input type="text" placeholder='Password' className='AdobtLogin-body-input' name='password' onChange={HandleChange }/>

          { <Link to="/forgotpassword" style={{textDecoration:"none", color: "red"}}><div className='forgot-password'>Forgot password?</div></Link>}

          <button className='AdobtLogin-body-button' onClick={AdopterLogin }> SIGN IN</button>
        </div>

        <div className='AdobtLogin-signup'>
          <p>Before Don't Register Please Register Now!!!</p>
          <Link to="/Adobt/Regester" style={{textDecoration:"none"}}><h3>REGISTER NOW</h3></Link>
        </div>
      </div>
    </div>
  )
}
