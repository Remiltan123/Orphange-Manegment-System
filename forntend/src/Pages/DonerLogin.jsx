import React, { useState } from 'react'
import "./CSS/DonorLogin.css"
import { Link } from 'react-router-dom'
import Donor_image from "../Components/Assets/donor.png"
import {  toast } from 'react-toastify';

export const DonerLogin = () => {

  const[state,setState]=useState("Login");
  const[formdata,setFormdat]=useState({
    name:"",
    password:"",
    email:""
  })

  const ChangeHandle = (e)=>{
    setFormdat({...formdata,[e.target.name]:e.target.value})
    
  }

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:1010/user/login', {
        method: 'post',
        headers: {
          Accept: 'application/json',
          'content-Type': 'application/json',
        },
        body: JSON.stringify(formdata),
      });
      const data = await response.json();
      if (data.success) {
        let token = data.token
        //localStorage.setItem('auth-token', token);
        toast.success(data.message);
        window.location.replace(`/Donor/${token}`);

      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('An error occurred. Please try again later.');
    }
  };

  const handleSignup = async () => {
    try {
      // Check if all required fields are provided
     /* if (!formdata.username || !formdata.email || !formdata.password) {
        toast.error("Please provide All details");
        return;
      }*/
  
      const response = await fetch('http://localhost:1010/user/signup', {
        method: 'post',
        headers: {
          Accept: 'application/json',
          'content-Type': 'application/json',
        },
        body: JSON.stringify(formdata),
      });
  
      const data = await response.json();
  
      if (data.success) {
        localStorage.setItem('auth-token', data.token);
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('An error occurred. Please try again later.');
    }
  };
  
  

  return (
    <div className='main-continer'>
      <div className='Doner-container'>
        <div className='Doner-header'>
          <div  className='Doner-header-image'><img src={Donor_image} alt="" /></div>
          {state==="Login" ? <h2>Donor Login</h2> : <h2>Donor Sign Up</h2>}
        </div>

        <div className='Doner-body'>
         

          {state === "Sign Up" ? <input type="text" placeholder='Name' className='Doner-body-input' name='name' value={formdata.name} onChange={ChangeHandle} /> : <></> }


          <input type="text" placeholder='Email' className='Doner-body-input' name='email' value={formdata.email} onChange={ChangeHandle} />

           <input type="text" placeholder='Password' className='Doner-body-input' name='password' value={formdata.password} onChange={ChangeHandle} />

          {state==="Login"? <Link to="/forgotpassword" style={{textDecoration:"none", color: "red"}}><div className='forgot-password'>Forgot password?</div></Link> : <></>}
          <button className='Doner-body-button' onClick={()=>{state==="Login"?handleLogin() :handleSignup()}}> Continue</button>
        </div>

        {state === "Login" ? 
          <div className='login-here' ><p>Create an account? <span onClick={()=>{setState("Sign Up")}}>Click here</span> </p></div>
          :<div className='login-here'><p>Already Have an account? <span onClick={()=>{setState("Login")}}>Login here</span> </p></div>}
      </div>
    </div>
  )
}
