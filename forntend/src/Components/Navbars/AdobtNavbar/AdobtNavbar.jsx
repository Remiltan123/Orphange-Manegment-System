import React, { useState } from 'react';
import "./AdobtNavbar.css";
import logo from "../../Assets/app_logo .png";
import { Link } from 'react-router-dom';
import home_image from '../../Assets/Home.png'

export const AdoptNavbar = () => {

    return (
        <>
                <div className='AdoptNavbar-navber-header'>
                    <div className='AdoptNavbar-logo-setup'>
                        <img src={logo} alt="Logo" className='AdoptNavbar-logo'/>
                        <h2>ORPHANAGE MANAGEMENT SYSTEM</h2>    
                    </div>

                    
                    <div className='homeimage'>
                        <Link to="/"><img src={home_image} alt="" /></Link>
                        <Link to='/'><p>Home</p></Link>
                    </div>   
                </div>


                
            
        </>
    );
};
