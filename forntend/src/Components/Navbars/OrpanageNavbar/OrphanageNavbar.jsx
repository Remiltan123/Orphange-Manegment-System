import React, { useEffect, useState } from 'react';
import "./OrphanageNavbar.css";
import logo from "../../Assets/app_logo .png";
import admin from '../../Assets/nav-profile.svg'


export const OrphanageNavbar = ({id}) => {

const [orphanage, setOrphanage] = useState({});
  
useEffect(() => {
  const fetchOrphanage = async () => {
    try {
      const response = await fetch(`http://localhost:1010/orphanage/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch orphanage');
      }
      const data = await response.json();
      setOrphanage(data);
    } catch (error) {
      console.error('Error fetching orphanage:', error);
    }
  };
  fetchOrphanage();
}, [id]);



  return (
    <>
      <div className='OrphanageNavbar'>
            <div className='OrphanageNavbar-logo-setup'>
                <img src={logo} alt="Logo" className='logo' />
                <h2>Well Come to {orphanage.Oname}</h2> 
            </div>

            <div className='admin-image'>
               <img src={admin} alt="" />
               <p>{orphanage.Oadmin_name}</p>
            </div>
      </div>
      
    </>
  );
};

