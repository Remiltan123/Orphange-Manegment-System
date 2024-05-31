import React, { useEffect, useState } from 'react'
import "./SeeRequested.css"
import { useParams } from 'react-router-dom'
import { OrphanageNavbar } from '../../Navbars/OrpanageNavbar/OrphanageNavbar'
import {  toast } from 'react-toastify';

export const SeeRequested = () => {

  const {id} = useParams()
  const [requests,SetRuested] = useState([])

  const fetchrequest = async ()=>{
    const resphonse = await fetch("http://localhost:1010/Allrequest",{
      method: "POST",
      headers: {
        "Content-Type": 'application/json',
      },
      body: JSON.stringify({ Or_id: id }),
    })
    const data = await resphonse.json();
    SetRuested(data)
  }

  useEffect(()=>{
    fetchrequest ();
  },[id])

  const RemoveRequest = async (id) => {
    try {
      const response = await fetch("http://localhost:2010/RemoveRequest", {
        method: "POST",
        headers: {
          "Content-Type": 'application/json',
        },
        body: JSON.stringify({ Re_id: id }),
      });
  
      const data = await response.json();
      
      if (data.success) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
      
      fetchrequest();
      
    } catch (error) {
      console.error('Error removing request:', error);
      toast.error('Error removing request');
    }
  }
  

   
  return (
    <>
      <OrphanageNavbar id={id}/>
      <div className=' SeeRequested-container'>
        <div className='SeeRequested-sub-container'>
          <div className='SeeRequested-heading'><h1>VIEW ALL DONATION REQUESTED</h1></div>
          <table className='SeeRequested-table-Details'>
              <thead>
                <tr>
                  <th>Purpose</th>
                  <th>Description</th>
                  <th>Request Date</th>
                  <th>Remove</th>  
                </tr>
              </thead>

              <tbody>
                {requests.map((request,index)=>{
                  return(
                  <tr key={index}>
                    <td>{request.purpose}</td>
                    <td >{request.description}</td>
                    <td>{request.date}</td>
                    <td><button className='Dropbutton' onClick={()=>{RemoveRequest(request.Re_id)}}>Drop</button></td>
                  </tr>
                  )
                })}
                

              </tbody>
          </table>
          
        </div>
      </div>
    </>
  )
}
