import React from 'react'
import "./Addchild.css"
import { Link } from 'react-router-dom'
import register_here from "../../Assets/LoginHere.png"


export const Addchild = () => {
  return (
    <>
    <div className='Addchild-main-container'>
        <div className='Addchild-container'>
            <div className='Addchild-container-head'>
                <div className='Addchild-Register-form'><h1>CHILD REGISTER FORM</h1></div>
            </div>

            <div className='Addchild-container-body'>
                <div className='Addchild-image'>
                    <div className='register_image'><img src={register_here} alt="" /></div>
                    <h3>Register here</h3>
                </div>
            
                <tr>
                    <td>Child Name:</td>
                    <input type="text" />
                </tr>
                <tr>
                    <td>Gender:</td>
                    <input type="radio" /> <label htmlFor="">Male</label>
                    <input type="radio" /> <label htmlFor="">Female</label>
                    
                </tr>

                <tr>
                    <td>ID:</td>
                    <input type="text" />       
                </tr>
                <tr>
                    <td>Age:</td>
                    <input type="text" />    
                </tr>
                <tr>
                    <td>Addmission Date :</td>
                    <input type="text" />
                </tr>
                <div className='more-Details'>
                    <p>Add more Detials about Chlid</p>
                    <Link to="/Orphanage-Name/Add Child/moredetilas"><button className='Addchild-button'>ADD MORE...</button></Link>
                </div>
                
            </div>
        </div>
    </div>
    </>
  )
}
