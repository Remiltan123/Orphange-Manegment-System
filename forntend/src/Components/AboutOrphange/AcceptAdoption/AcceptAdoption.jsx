import React, { useEffect, useState } from 'react';
import "./AcceptAdoption.css";
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import { OrphanageNavbar } from '../../Navbars/OrpanageNavbar/OrphanageNavbar';

export const AcceptAdoption = () => {
  const [orphange, setOrphange] = useState({});
  const [adoptChild, setAdoptChild] = useState([]);
  const { token } = useParams();

  const [submit, setSubmit] = useState({
    id: '',
    type: '',
  });

  const handleClick = (e) => {
    setSubmit({ ...submit, [e.target.name]: e.target.value });
  };

  const orphangeAdoptChild = adoptChild.filter(child => child.OR_id === orphange.Oid);

  const getAdoptChild = async () => {
    try {
      const response = await fetch(`http://localhost:1010/GetAdoption/${token}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const resData = await response.json();
      if (!resData.success) {
        toast.error(resData.message);
      } else {
        setAdoptChild(resData.ChildData);
        setOrphange(resData.Orphange);
      }
    } catch (error) {
      toast.error("Failed to fetch data");
      console.error("Fetch error:", error);
    }
  };

  useEffect(() => {
    getAdoptChild();
  }, [token]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  const acceptAdoption = async (id) => {
    const response = await fetch("http://localhost:1010/Accept-Request", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ Ch_id: id })
    });
    const resData = await response.json();
    if (!resData.success) {
      toast.error(resData.message);
    }else{
      toast.success(resData.message)
      getAdoptChild();
    }
  };


  const rejectAdoption = async (id) => {
    const response = await fetch("http://localhost:1010/Reject-Request", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ Ch_id: id })
    });
    const resData = await response.json();
    if (!resData.success) {
      toast.error(resData.message);
    }else{
      toast.success(resData.message)
      getAdoptChild();
    }
  };

  const handleSubmit = () => {
    if(submit.type === "Accepted"){
      if (submit.id && submit.type) {
        acceptAdoption(submit.id);
      } else {
        toast.error("Please select a child and a decision");
      }
    }
    else if(submit.type === "Rejected"){
      if (submit.id && submit.type) {
        rejectAdoption(submit.id);
      } else {
        toast.error("Please select a child and a decision");
      }
    }
    
  };

  return (
    <>
       <OrphanageNavbar token={token} />
      <div className='AcceptAdoption-main-container'>
        <div className='AcceptAdoption-container'>
          <div className='AcceptAdoption-heading'>
            <h1>ACCEPT ADOPTION REQUEST</h1>
          </div>

          <div className='AcceptAdoption-body'>
            <div className='AcceptAdoption-table'>
              <table className='tbl'>
                <thead>
                  <tr>
                    <th>Applicant Name</th>
                    <th>Mail</th>
                    <th>Contact Number</th>
                    <th>Child Id</th>
                    <th>Child Name</th>
                    <th>Date</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>
                  {orphangeAdoptChild.map((child, index) => {
                    return (
                      <tr key={index}>
                        <td>{child.adopterDetails.Aname}</td>
                        <td>{child.adopterDetails.email}</td>
                        <td>{child.adopterDetails.mobile_no}</td>
                        <td>{child.id}</td>
                        <td>{child.Name}</td>
                        <td>{formatDate(child.adoptedDetails.Requested_date)}</td>
                        {child.adoptedDetails.Accept ? <td style={{color: 'green', fontWeight: 'bold'}}>Accepted</td> : <td>Requested</td>}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className='AcceptAdoption-update-details'>
              <tr className='child-registerid'>
                <th>Child register id</th>
                <input type="text" onChange={handleClick} name='id'/>
              </tr>

              <tr>
                <th>Your Decision</th>
                <select name="type" id="" onChange={handleClick}>
                  <option value="">Choose</option>
                  <option value="Accepted">Accept</option>
                  <option value="Rejected">Reject</option>
                </select>
              </tr>

              <div className='AcceptAdoption-button'>
                <button onClick={ handleSubmit}>Submit</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
