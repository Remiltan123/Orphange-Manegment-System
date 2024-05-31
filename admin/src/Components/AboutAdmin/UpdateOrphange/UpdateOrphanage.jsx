
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import "./UpdateOrphanage.css"
import {toast} from "react-toastify"

export const UpdateOrphanage = () => {
  const { id } = useParams();
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

  const handleInputChange = (e) => {
    setOrphanage({ ...orphanage, [e.target.name]: e.target.value });
  }

  const orphanageUpdate = async () => {
    try {
      const response = await fetch(`http://localhost:1010/Update/${id}`, {
        method: "post",
        headers: {
          "Content-Type": 'application/json',
        },
        body: JSON.stringify(orphanage),
      });

      const data = await response.json();

      if (!data.success) {
        toast.error(data.message)
      } else {
        toast.success(data.message)
  
      }
    } catch (error) {
      console.error('Error occurred while updating orphanage:', error);
    }
  }

  return (
    <>
      <div className='AddOrphanage-container'>
        <div className='AddOrphanage-heading'>
          <div className='new-addmission'><h2>UPDATE ORPHANAGE DETAILS</h2></div>
        <div />

        <div className='sub-AddOrphanage-container'>
          <table>
            <tbody>
              <tr>
                <td>Orphanage Name:</td>
                <td><input type="text" name="Oname" placeholder={orphanage.Oname} onChange={handleInputChange} value={orphanage.Oname}/></td>
              </tr>

              <tr>
                <td>Location:</td>
                <td><input type="text" name="Oaddress" value={orphanage.Oaddress} placeholder={orphanage.Oaddress} onChange={handleInputChange} /></td>
              </tr>

              <tr>
                <td>Orphanage Admin:</td>
                <td><input type="text" name="Oadmin_name" value={orphanage.Oadmin_name} placeholder={orphanage.Oadmin_name} onChange={handleInputChange} /></td>
              </tr>

              <tr>
                <td>District:</td>
                <td><input type="text" name="Odistrict" placeholder={orphanage.Odistrict} onChange={handleInputChange} value={orphanage.Odistrict}/></td>
              </tr>

              <tr>
                <td>Mobile Number:</td>
                <td><input type="text" name="Omoboile_no" placeholder={orphanage.Omoboile_no} onChange={handleInputChange} value={orphanage.Omoboile_no}/></td>
              </tr>

              <tr>
                <td>Email Id:</td>
                <td><input type="text" name="Omail" placeholder={orphanage.Omail} onChange={handleInputChange} value={orphanage.Omail}/></td>
              </tr>
            </tbody>
          </table>
          <button onClick={orphanageUpdate}>UPDATE</button>
        </div>
      </div>
    </div>
   
    </>
  );
}



