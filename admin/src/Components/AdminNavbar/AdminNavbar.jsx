import React, { useState } from 'react'
import "./AdminNavbar.css";
import logo from '../Assets/admin.png'
import { Link } from 'react-router-dom';

export const AdminNavbar = () => {

    const[menu,setMenu]=useState("Home")

  return (
    <>
    <div className='navber-header'>
            <div className='logo-setup'>
                <img src={logo} alt="" />
                <h2>Admin Panel</h2> 
            </div>

            <div className="mid-nav">
                <ul>
                    <li onClick={() => setMenu("Home")}> <Link to="/" style={{ textDecoration: "none", color: "white" }}>Home</Link> {(menu === "Home") ? <hr></hr> : <></>} </li>
                
                    <li onClick={() => setMenu("Add Orphnage")}> <Link to="/Admin/AddOrphange" style={{ textDecoration: "none", color: "white" }}>Add Orphnage</Link> {(menu === "Add Orphnage") ? <hr></hr> : <></>} </li>

                    <li onClick={() => setMenu("Manage Orphanage")}> <Link to='/Admin/ManageOrphanage' style={{ textDecoration: "none", color: "white" }}>Manage Orphanage</Link> {(menu === "Manage Orphanage") ? <hr></hr> : <></>} </li>


                </ul>
                
            </div>
        </div>
        </>
  )
}


/*
<li onClick={() => setMenu("View Donor Details")}> <Link to='/Admin/ViewDonorDetails' style={{ textDecoration: "none", color: "white" }}>View Donor Details</Link>  {(menu === "View Donor Details") ? <hr></hr> : <></>} </li>

                    <li onClick={() => setMenu("View Feedback")}> <Link to='/Admin/ViewFeedback' style={{ textDecoration: "none", color: "white" }}>View Feedback</Link>  {(menu === "View Feedback") ? <hr></hr> : <></>} </li>
                */