import React, { useState } from 'react';
import "./Navbar.css";
import logo from "../../Assets/app_logo .png";
import { Link } from 'react-router-dom';

export const Navbar = () => {
    const [menu, setMenu] = useState("");
    const [showLogin, setShowLogin] = useState(false);

    const toggleLogin = () => {
        setShowLogin(!showLogin);
    };

    return (
        <>
            <div className='main-navbar'>
                <div className='navber-header'>
                    <div className='logo-setup'>
                        <img src={logo} alt="Logo" className='logo'/>
                        <h2>ORPHANAGE MANAGEMENT SYSTEM</h2>    
                    </div>

                    <div></div>
                    <div className='Login' onClick={toggleLogin}>
                        <p>Login</p>
                    </div>   
                </div>


                {showLogin && <div className="mid-nav">
                    <tr>
                        
                        <div onClick={toggleLogin}>
                            <Link to="/OrphanageSelect" style={{textDecoration:"none",color:"black"}}>Orphanage Login</Link>
                        </div>


                        <div onClick={toggleLogin}>
                            <Link to="/DonerLogin" style={{textDecoration:"none",color:"black"}}>Donor Login</Link>  
                        </div>

                        <div onClick={toggleLogin}>
                            <Link to="/Adopt" style={{textDecoration:"none",color:"black"}}>Adopt Login</Link> 
                        </div>
                    </tr>
                </div>}
            </div>
        </>
    );
};
