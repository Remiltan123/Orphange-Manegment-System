
import React, { useState } from 'react';
import { OrphanageNavbar } from '../Components/Navbars/OrpanageNavbar/OrphanageNavbar';
import p3_img from "../Components/Assets/im3.png";
import "./CSS/OrphanageShow.css";
import { Link } from 'react-router-dom';
import menuicon from "../Components/Assets/menuicon.png"
import cannel_icon from"../Components/Assets/cannel_icon.png"
import { useParams } from 'react-router-dom';
import {toast} from 'react-toastify'


export const OrphanageShow = () => {
  
  const { id } = useParams();
  const[isopen,setIsOpen] = useState(false)
  const toggle = ()=>setIsOpen(!isopen)

  const Logout = async()=>{
    const response = await fetch("http://localhost:1010/Logout",{
      method:"GET",
      headers:{
        "Content-Type":"application/json"
      },
    })
    const data = await response.json()
    if(!data.success){
      toast.error(data.message)
    }else{
      toast.success(data.message)
    }
  }
  
  return (
    <div>
      <OrphanageNavbar id={id}/>
      <div className='OrphanageNavbar-body'>
        <div className='OrphanageNavbar-body-image'>
          <img src={p3_img} alt="" style={{ height: "100%", width:'100%'}} />
        </div>
        <div className={`Orphanage-Links ${isopen ? 'open' : ''}`}>
            <ul>
              <div><li> <Link to="/" style={{ textDecoration: "none", color: "white" }}>Home</Link> </li></div>
              <div><li> <Link to={`/Orphanage/${id}/ArrgentAdmin`} style={{ textDecoration: "none", color: "white" }}>Add Arrent Wants</Link> </li></div> 
              <div><li> <Link to={`/Orphanage/${id}/GiveReDonor`} style={{ textDecoration: "none", color: "white" }}>Give Request to Donate</Link> </li></div>
              <div><li> <Link to={`/Orphanage/${id}/seerequested`} style={{ textDecoration: "none", color: "white" }}>See Requested</Link> </li></div>
              <div><li> <Link to={`/Orphanage/${id}/ViewReStatus`} style={{ textDecoration: "none", color: "white" }}>View Request Status</Link> </li></div>
              <div><li> <Link to={`/Orphanage/${id}/Add Child`} style={{ textDecoration: "none", color: "white" }}>Add Child</Link> </li></div>
              <div><li> <Link to={`/Orphanage/${id}/UpdateChild`} style={{ textDecoration: "none", color: "white" }}>Update Child</Link> </li></div>
              <div><li> <Link to={`/Orphanage/${id}/AcceptAdoption`} style={{ textDecoration: "none", color: "white" }}>Accept Adoption</Link> </li></div>
              <div ><li onClick={ Logout} > <Link to="/" style={{ textDecoration: "none", color: "white" }} >Logout</Link> </li></div>
            </ul>
        </div>

        <div className='menuicon' onClick={toggle}> {isopen==true? <img src={cannel_icon} alt="" />:<img src={menuicon} alt="" />}</div>
            
        </div>
      </div>

  );
};