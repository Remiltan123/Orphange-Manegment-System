import React, { useState } from 'react';
import "./DonorNavbar.css"
import logo from "../../Assets/app_logo .png";
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import {toast} from "react-toastify"

export const DonorNavbar = () => {

    const {id,name,token} = useParams();
    const [menu, setMenu] = useState("Home");

    const Logout = async()=>{
        const response = await fetch("http://localhost:1010/user/Logout",{
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
    <div className='DonorNavbar-navber-header'>
            <div className='DonorNavbar-logo-setup'>
                <img src={logo} alt="Logo" />
                <h2>ORPHANAGE</h2>
            </div>

            <div className="DonorNavbar-mid-nav">
                <ul>
                    <li onClick={() => setMenu("Home")}> <Link to="/" style={{ textDecoration: "none", color: "black" }}>Home</Link> {(menu === "Home") ? <hr></hr> : <></>} </li>

                    <li onClick={() => setMenu("View Details")}> <Link to={`/Donor/ViewDetails/${token}`}style={{ textDecoration: "none", color: "black" }}>View Details</Link> {(menu === "View Details") ? <hr></hr> : <></>} </li>

                    <li onClick={() => setMenu("View All History")}> <Link to={`/Donor/ViewHistory/${token}`} style={{ textDecoration: "none", color: "black" }}>View All History</Link> {(menu === "View All History") ? <hr></hr> : <></>} </li>


                    <li onClick={() => setMenu("View Feedback")}> <Link to={`/Donor/ViewFeedback/${token}`} style={{ textDecoration: "none", color: "black" }}>View Feedback</Link>  {(menu === "View Feedback") ? <hr></hr> : <></>} </li>

                    <li onClick={() => setMenu("Logout")}> <Link to="/" style={{ textDecoration: "none", color: "black" }} onClick={Logout}>Logout</Link> {(menu === "Logout") ? <hr></hr> : <></>} </li>

                </ul>
            </div>
        </div>
  )
}
