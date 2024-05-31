import React, { useState, useEffect } from 'react';
import './GiveFeedback.css';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

export const GiveFeedback = ({ Detials, show }) => {

  const { id } = useParams();
  const [orphanage, setOrphanage] = useState({});
  const [Show, Setshow] = useState(show);

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

  const [Feedbackdetials, Setdetials] = useState({
    Donor_id: Detials.Do_id,
    DO_name: Detials.Do_name,
    purpose: Detials.purpose,
    Donated_Date: Detials.Do_Date,
  });

  const Handleclick = (e) => {
    Setdetials({ ...Feedbackdetials, [e.target.name]: e.target.value });
  }

  const AddFeedback = async () => {
    try {
      if (!Feedbackdetials.OR_name || !Feedbackdetials.feedback) {
        toast.error("Please provide all details.");
        return;
      }
      if (orphanage.Oname !== Feedbackdetials.OR_name) {
        toast.error("Incorrect orphanage name. Please enter the correct name.");
        return;
      }

      const Respones = await fetch("http://localhost:1010/GiveFeedBack", {
        method: "post",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(Feedbackdetials),
      });
      const Data = await Respones.json();
      if (!Data.success) {
        toast.error("Failed to Add Feedback");
      } else {
        toast.success("Successful Add Feedback");
      }
    } catch (err) {
      console.error('Error occurred while adding Feedback:', err);
      toast.error('Failed to add Feedback. Please try again later.');
    }
  }

  

  return (
    <>
      {Show && (
        <div className='Feedback-container'>
          <div className='Feedback'>
            <div className='give-feedback'><h2>GIVE FEEDBACK</h2></div>
            <div className='sub-Feedback-container'>
              <table>
                <tbody>
                  <tr>
                    <td>Donor ID:</td>
                    <td><input type="text" value={Detials.Do_id}  /></td>
                  </tr>
                  <tr>
                    <td>Donor Name:</td>
                    <td><input type="text" value={Detials.Do_name}/></td>
                  </tr>
          
                  <tr>
                    <td>Donated Date:</td>
                    <td><input type="text" value={Detials.Do_Date}  /></td>
                  </tr>
                  <tr>
                    <td>Purpose:</td>
                    <td><input type="text" value={Detials.purpose}  /></td>
                  </tr>
                  <tr>
                    <td>Orphanage Name:</td>
                    <td><input type="text"  onChange={Handleclick} name='OR_name' /></td>
                  </tr>
                  <tr>
                    <td>Feedback:</td>
                    <td><input type="text" style={{ height: "50px" }} name='feedback' onChange={Handleclick} /></td>
                  </tr>
                </tbody>
              </table>
              <div className='buttons'>
                <button className='Submit-button' onClick={AddFeedback}>Submit</button>
                <button className='close-button' onClick={() => { Setshow(!Show) }}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
