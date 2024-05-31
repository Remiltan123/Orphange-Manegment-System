import React, { useState } from 'react'
import "./Subscripe.css"
import {  toast } from 'react-toastify';

export const Subscripe = () => {

  const[email,Setemail] = useState();

  const HandleClick = (e)=>{
    Setemail(e.target.value)
  }

  const SendEmail = async()=>{
    const response = await fetch("http://localhost:1010/AddSubscripe",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({email})
    })
    const data = await response.json()
    if(!data.success){
      toast.error(data.message)
    }else{
      toast.success(data.message)
    }

  }

  return (
    <div className='Newleeter'>
        <div className="Newleeter-text">
            <div><h1>Get Argent Wants of Orpanage On Your Email</h1></div>
            <div>Subcribe to our newletter and stay updated</div>
         </div>
        <div className='subcribe'>
            <input type="text" placeholder='Enter Email Id' onChange={HandleClick }/>
            <button onClick={SendEmail}>Subcribe</button>
        </div>
        
    </div>
  )
}
