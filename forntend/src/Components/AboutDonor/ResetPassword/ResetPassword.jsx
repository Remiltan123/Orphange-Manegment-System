import React, { useState } from 'react'
import "./ResetPassword.css"
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export const ResetPassword = () => {

  const {token}= useParams()
  const navigate = useNavigate()
  const[password,Setpassword] = useState();

  const HandleClick = (e)=>{
    Setpassword(e.target.value)
  }

  const SendEmail = async()=>{
    const response = await fetch(`http://localhost:1010/user/resetpassword/${token}`,{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({password})
    })
    const data = await response.json()
    if(!data.success){
      toast.error(data.message)

    }else{
      toast.success(data.message)
      navigate("/DonerLogin")
    }

  }

  return (
    <div className='reset_main_continer'>

        <div className='reset_sub_continer'>

            <div className='passwordreset'>
                <h2>Reset Password</h2>
            </div>
            <div className='rest-password'>
                <p>Password:</p>
                <input type="text" onChange={HandleClick}/>
            </div>
            
            <button className='resetpaasword-send-button' onClick={SendEmail }>Submit</button>
            
        </div>
    </div>
  )
}
