import React, { useEffect, useState } from 'react'
import "./DoViewHistory.css"
import { useParams } from 'react-router-dom'
import {toast} from "react-toastify"

export const DoViewHistory = () => {

  const {token}=useParams();
  const [Donor_Donetion,SetDonor_Donetion]=useState([]);
  const[Verification,SetVerification]=useState([]);

  

  useEffect(() => {
    const fetchRelevantDonorDonetion = async () => {
      try {
        const response = await fetch(`http://localhost:1010/GetPerticularDonorDonetion/${token}`, {
          method: 'GET', // Change PATCH to GET
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();

        if (!response.ok) {
          toast.error(data.message);
        } else {
          SetDonor_Donetion(data); 
        }
      } catch (err) {
        console.error("Error occurred:", err);
        toast.error("Please try again later.");
      }
    }

    fetchRelevantDonorDonetion();
    FetchVerification ();
  }, [token]);

  const FetchVerification = async()=>{
    try{
      const response = await fetch(`http://localhost:1010/ViewallHistroy/${token}`, {
        method: 'GET', // Change PATCH to GET
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      if (!response.ok) {
        toast.error(data.message);
      } 
      else {
        const VerifyDates = data.map(item=>item.Doneted_Date)
        SetVerification(VerifyDates); 
      }
    } catch (err) {
      console.error("Error occurred:", err);
    }
  }

   console.log(Verification)
 
  return (
    <>
      <div className=' History-container'>
        <div className='History-sub-container'>
          <div className='History-heading'><h1>VIEW ALL REQUEST STATUS</h1></div>
          <table className='History-table-Details'>
              <thead>
                <tr>
        
                  <th>Orpanage Name</th>
                  <th>Purpose</th>
                  <th>Doneted Amount</th>
                  <th>Donetion Date</th>
                  <th>Status</th>
                  
                </tr>
              </thead>

              <tbody>
                {Donor_Donetion.map((donetion,index)=>(
                  <tr key={index}>
                    <td style={{color:"blue",fontWeight:600}}>{donetion.Oname}</td>
                    <td style={{color:"",fontWeight:600}}>{donetion.purpose}</td>
                    <td style={{paddingLeft:40,color:"blue"}}><span>Rs. </span>{donetion.amount} </td>
                    <td>{donetion.Do_Date}</td>
                    <td  style={{color: Verification.includes(donetion.Do_Date) ? "green" : "red",fontWeight:600,cursor:"pointer"}}>
                        {Verification.includes(donetion.Do_Date) ? <p>Received</p> : <p>Not Received</p>}
                    </td>
                  </tr>
                ))}
                
              </tbody>
          </table>
          
        </div>
      </div>
    </>
  )
}

