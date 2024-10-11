import React, { useEffect, useState } from 'react'
import "./SeeRequested.css"
import { useParams } from 'react-router-dom'
import { OrphanageNavbar } from '../../Navbars/OrpanageNavbar/OrphanageNavbar'
import { toast } from 'react-toastify';

export const SeeRequested = () => {

  const { token, id } = useParams();
  const [requests, setRequested] = useState([]);
  const [orphanageId, setOrphanageId] = useState(null);

  const fetchRequests = async (id) => {
    if (!id) return;
    try {
      const response = await fetch("http://localhost:1010/Allrequest", {
        method: "POST",
        headers: {
          "Content-Type": 'application/json',
        },
        body: JSON.stringify({ Or_id: id }),
      });
      const data = await response.json();
      setRequested(data);
    } catch (error) {
      console.error('Error fetching requests:', error);
      toast.error('Error fetching requests');
    }
  };

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

  const removeRequest = async (id) => {
    try {
      const response = await fetch("http://localhost:1010/RemoveRequest", {
        method: "POST",
        headers: {
          "Content-Type": 'application/json',
        },
        body: JSON.stringify({ Re_id: id }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success(data.message);
        fetchRequests(orphanageId);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error('Error removing request:', error);
      toast.error('Error removing request');
    }
  };

  useEffect(() => {
    fetchOrphanage();
  }, [token]);

  useEffect(() => {
    if (orphanageId) {
      fetchRequests(orphanageId);
    }
  }, [orphanageId]);

  return (
    <>
      <OrphanageNavbar token={token} />
      <div className='SeeRequested-container'>
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
              {requests.map((request, index) => (
                <tr key={index}>
                  <td>{request.purpose}</td>
                  <td>{request.description}</td>
                  <td>{request.date}</td>
                  <td>
                    <button className='Dropbutton' onClick={() => removeRequest(request.Re_id)}>Drop</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
