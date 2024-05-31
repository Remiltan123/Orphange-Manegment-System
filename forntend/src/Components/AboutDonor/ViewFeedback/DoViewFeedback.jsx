import React, { useEffect, useState } from 'react';
import "./DoViewFeedback.css";
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';


export const DoViewFeedback = () => {
  
  const { token } = useParams();
  const [feedbackDetails, setFeedback] = useState([]);

  useEffect(() => {
    const viewFeedback = async () => {
      try {
        const response = await fetch(`http://localhost:1010/ViewFeedback/${token}`,{
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
      
        if (!response.ok) {
          toast.error(data.message);
        } else {
          setFeedback(data); 
        }

      } catch(err) {
        console.error("Error:", err);
        toast.error("An error occurred. Please try again later.");
      }    
    }

    viewFeedback();
  }, []);

 

  return (
    <>
      <div className='DoViewFeedback-container'>
        <div className='DoViewFeedback-sub-container'>
          <div className='DoViewFeedback-heading'><h1>VIEW ALL FEEDBACKS</h1></div>
          <table className='DoViewFeedback-table-Details'>
            <thead>
              <tr>
                <th>Orphanage Name</th>
                <th>Purpose of Your Donation</th>
                <th>Donation Date</th>
                <th>Feedback</th>
                <th>Feedback Date</th>
              </tr>
            </thead>

            <tbody>
              {feedbackDetails.map((detail, index) => (
                <tr key={index}>
                  <td style={{ color: "blue", fontWeight: 600 }}>{detail.OR_name}</td>
                  <td style={{ color: "blue", fontWeight: 600}}><span style={{marginLeft:50}}>{detail.purpose}</span></td>
                  <td>{detail.Donated_Date}</td>
                  <td style={{ color: "blue", fontWeight: 600 }}>{detail.feedback}</td>
                  <td>{detail.Date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
