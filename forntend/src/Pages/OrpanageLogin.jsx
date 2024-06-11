import React, { useEffect, useState } from 'react';
import "./CSS/OrphanageLogin.css";
import orphan from "../Components/Assets/orpan.png";
import { Link, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import {toast} from "react-toastify"

export const OrpanageLogin = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [orphanage, setOrphanage] = useState({});
  const[formdata,setFormdat]=useState({
    
  })
  
  const ChangeHandle = (e)=>{
    setFormdat({...formdata,[e.target.name]:e.target.value})
  }

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



  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:1010/login', {
        method: 'post',
        headers: {
          Accept: 'application/json',
          'content-Type': 'application/json',
        },
        body: JSON.stringify(formdata),
      });
      const data = await response.json();
      if (data.success) {
        localStorage.setItem('auth-token', data.token);
        toast.success(data.message);
        navigate(`/Orphanage/${id}`);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('An error occurred. Please try again later.');
    }
  };


  return (
    <div className='Login-main-continer'>
      <div className='Login-Admin-container'>
        <div className='Login-Admin-header'>
          <div className='Login-Admin-header-image'><img src={orphan} alt="" /></div>
          <h2>Orphanage Login</h2>
        </div>

        <div className='Login-Admin-body'>
        
          <input type="text" placeholder={orphanage.Oname} className='Login-Admin-body-input-1' name='' />

          <input type="text" placeholder='email' className='Login-Admin-body-input' name='Omail' onChange={ChangeHandle}/>

          <input type="password" placeholder='Password' className='Login-Admin-body-input' name='Opassword' onChange={ChangeHandle} />

          <Link to="/forgotpassword" style={{ textDecoration:"none"}}><div className='Login-Forgot-password'>Forgot password?</div></Link>

          <button className='Login-Admin-body-button' onClick={ handleLogin}>SIGN IN</button>
          
        </div>
      </div>
    </div>
  );
};

