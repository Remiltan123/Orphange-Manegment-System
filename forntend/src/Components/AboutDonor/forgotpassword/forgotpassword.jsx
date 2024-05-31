import React, { useState } from 'react'
import "./forgotpassword.css"
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export const Forgotpassword = () => {

  const[email,Setemail] = useState();

  const HandleClick = (e)=>{
    Setemail(e.target.value)
  }

  const SendEmail = async()=>{
    const response = await fetch("http://localhost:1010/user/forgotpassword",{
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


const navigate = useNavigate()
  return (
    <div className='email_main_continer'>

        <div className='email_sub_continer'>

            <div className='passwordforgot'>
                <h2>Forgot Password</h2>
            </div>
            <div className='email'>
                <p>Email:</p>
                <input type="text" onChange={HandleClick} />
            </div>
            
            <button className='mail-send-button' onClick={SendEmail}>Send</button>
            
        </div>
    </div>
  )
}
