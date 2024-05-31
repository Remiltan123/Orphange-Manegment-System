import React, { useState } from 'react'
import "./CSS/AdobtRegister.css"
import register_here from "../Components/Assets/LoginHere.png"
import {  toast } from 'react-toastify';

export const AdobtRegister = () => {

    const[Adopterdetails,setAdopterdetails]=useState({});

    const HandleChange = (e)=>{
        setAdopterdetails({...Adopterdetails,[e.target.name]: e.target.value})
    }

    const AdoptRegester = async () => {
        try {
            const Resphonesdata = await fetch('http://localhost:1010/Register', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(Adopterdetails),
            });

            const AdopterData = await Resphonesdata.json();
           
            if (!AdopterData.success) {
                toast.error(AdopterData.message)
            } else {
                toast.success(AdopterData.message)
            }
        } catch (error) {
            console.error('Error occurred while adding Adopter:', error);
            alert('Failed to add Adopter. Please try again later.');
        }
    }
  
    return (
    <div className='Adobt-main-container'>
        <div className='Adobt-container'>
            <div className='Adobt-container-head'>
                <div className='Register-form'><h1>ADOPTER REGISTER FORM</h1></div>
            </div>

            <div className='Adobt-container-body'>
            <div className='Adobt-image'>
                    <div className='register_image'><img src={register_here} alt="" /></div>
                    <h3>Register here</h3>
                </div>
            
                <tr>
                    <td>Applicant Name:</td>
                    <input type="text" onChange={HandleChange} name='Aname' />
                </tr>
                <tr>
                    <td>Married:</td>
                    <input type="radio" name='married' value="YES"  checked={Adopterdetails.married === "YES"} onChange={HandleChange} /> <label htmlFor="">YES</label>

                    <input type="radio" name='married' value="NO" checked={Adopterdetails.married === "NO"} onChange={HandleChange} /> <label htmlFor="">NO</label>
                    
                </tr>
                <tr>
                    <td>Address:</td>
                    <input type="text" onChange={HandleChange}  name='address'/>
                </tr>
                <tr>
                    <td>Email:</td>
                    <input type="text" onChange={HandleChange} name='email'/>    
                </tr>
                <tr>
                    <td>Mobile No:</td>
                    <input type="text" onChange={HandleChange}  name='mobile_no'/>
                </tr>
                
                <tr>
                    <td>Password:</td>
                    <input type="text" onChange={HandleChange} name='password' />
                </tr>
                <tr>
                    <td>Conform Password:</td>
                    <input type="text" onChange={HandleChange} name='conpassword' />
                </tr>
                <button className='Adoct-button' onClick={AdoptRegester}>Submit</button>
            </div>
        </div>
    </div>
  )
}
