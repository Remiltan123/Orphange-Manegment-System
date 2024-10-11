import React, { useEffect, useState } from 'react';
import './ViewReStatus.css';
import { OrphanageNavbar } from '../../Navbars/OrpanageNavbar/OrphanageNavbar';
import { useParams } from 'react-router-dom';
import { GiveFeedback } from '../GiveFeedback/GiveFeedback';
import {toast} from "react-toastify"

export const ViewReStatus = () => {
  const { token,id } = useParams();
  const [details, setDetails] = useState([]);
  const [FeedbackDetails, setFeedbackDetails] = useState({});
  const [show, setShow] = useState(false);

  const [verifiedDetails, setVerifiedDetails] = useState([]);
  const [orphanageId, setOrphanageId] = useState(null);

  const fetchOrphanage = async () => {
    try {
      const response = await fetch(`http://localhost:1010/getorphanage/${token}`);
      if (!response.ok) {
        throw new Error('Failed to fetch orphanage');
      }
      const data = await response.json();
      setOrphanageId(data.ORData.Oid);
    } catch (error) {
      console.error('Error fetching orphanage:', error);
      toast.error('Error fetching orphanage');
    }
  };

  const fetchDonationStatus = async () => {
    try {
      const response = await fetch(`http://localhost:1010/DonetionStatus/${orphanageId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
      });

      if (response.ok) {
        const data = await response.json();
        setDetails(data);
      } else {
        console.error('Failed to fetch donation status');
      }
    } catch (error) {
      console.error('Error occurred while fetching donation status:', error);
    }
  };


  const handleClick = (detail) => {
    setFeedbackDetails(detail);
    setShow(!show);
  };

  const verifyDonation = async (detail) => {
    const verifyDetails = {
      Donor_id: detail.Do_id,
      Doneted_Date: detail.Do_Date,
      Verify: "YES",
      Or_id:id,
    
    };

    try {
      const response = await fetch("http://localhost:1010/Verify", {
        method: 'post',
        headers: {
          Accept: 'application/json',
          'content-Type': 'application/json',
        },
        body: JSON.stringify(verifyDetails),
      });

      const data = await response.json();
      if (data.success) {
        toast.success(data.message);
        setVerifiedDetails([...verifiedDetails, detail.Do_Date]); // ithu click panna antha idathula vachu greeen ahh maara
      } else {
        toast.error(data.errors);
      }
    } catch (error) {
      console.error('Error occurred while verifying donation:', error);
      toast.error('Failed to verify donation. Please try again later.');
    }
  }

  const checkVerification = async () => {
    try {
      const response = await fetch(`http://localhost:1010/FeachVerifications/${orphanageId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
      });

      const data = await response.json();
      const verifiedDates = data.map(item => item.Doneted_Date); // ithu user entry akum pothu check panni green la vachu irukum
      setVerifiedDetails(verifiedDates);
    } catch (err) {
      toast.error("Failed. Please try again later.");
    }
  }

  useEffect(()=>{
    fetchOrphanage();
  },[token])

  useEffect(() => {
    if(orphanageId){
      fetchDonationStatus();
      checkVerification();
    }
  }, [orphanageId]);

  

  return (
    <>
      <OrphanageNavbar token={token}/>
      <div className="View_ReDetails-container">
        <div className="View_ReDetails-sub-container">
          <div className="View_ReDetails-heading">
            <h1>VIEW ALL REQUEST STATUS</h1>
          </div>
          <table className="View_ReDetails-table-Details">
            <thead>
              <tr>
                <th>Donor Name</th>
                <th>Donor Mail</th>
                <th>Purpose</th>
                <th>Doneted Date</th>
                <th>Doneted Amount</th>
                <th>Action</th>
                <th>Give Feedback</th>
              </tr>
            </thead>

            <tbody>
              {details.map((detail, index) => (
                <tr key={index}>
                  <td style={{ color: 'blue', fontWeight: 600 }}>{detail.Do_name}</td>
                  <td>{detail.Do_email}</td>
                  <td style={{ color: 'blue', fontWeight: 600 }}>{detail.purpose}</td>
                  <td>{detail.Do_Date}</td>
                  <td style={{ color: 'blue', fontWeight: 600,}}><span style={{marginLeft:20}}>Rs. {detail.amount}</span></td>

                  <td style={{ color: verifiedDetails.includes(detail.Do_Date) ? 'green' : 'red', fontWeight: 600, cursor: 'pointer' }}>
                    <span onClick={() => verifiedDetails.includes(detail.Do_Date) ? null : verifyDonation(detail)}>Verify & Acknowledge the request</span>
                  </td>
                  
                  <td className="Clickhere-td">
                    <button onClick={() => handleClick(detail)}>Feedback</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {show && (
            <div className="About-Feedback">
              <GiveFeedback
                Detials={FeedbackDetails}
                show={show}
              />
            </div>
          )}

        </div>
      </div>
    </>
  );
};
