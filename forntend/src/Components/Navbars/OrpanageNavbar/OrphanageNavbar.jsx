import React, { useEffect, useState } from 'react';
import "./OrphanageNavbar.css";
import logo from "../../Assets/app_logo .png";
import admin from '../../Assets/nav-profile.svg'


export const OrphanageNavbar = ({ token }) => {
  const [orphanage, setOrphanage] = useState({});

  useEffect(() => {
    const fetchOrphanage = async () => {
      try {
        const response = await fetch(`http://localhost:1010/getorphanage/${token}`);
        if (!response.ok) {
          throw new Error('Failed to fetch orphanage');
        }
        const data = await response.json();
        
        if (data.success) {
          setOrphanage(data.ORData);
        } else {
          console.error('Error:', data.message);
        }
      } catch (error) {
        console.error('Error fetching orphanage:', error);
      }
    };
    fetchOrphanage();
  }, [token]);

 

  return (
    <>
      <div className='OrphanageNavbar'>
        <div className='OrphanageNavbar-logo-setup'>
          <img src={logo} alt="Logo" className='logo' />
          <h2>Welcome to {orphanage.Oname}</h2>
        </div>

        <div className='admin-image'>
          <img src={admin} alt="Admin" />
          <p>{orphanage.Oadmin_name}</p>
        </div>
      </div>
    </>
  );
};

