import React, { useState } from 'react'
import "./AddOrphanage.css"
import {  toast } from 'react-toastify';

export const AddOrphanage = () => {

  const [orphanagedetails, setOrphanagedetails] = useState({});

  const getOrphanagedetails = (e) => {
    setOrphanagedetails({ ...orphanagedetails, [e.target.name]: e.target.value });
  }

  const addOrphanage = async () => {
    try {
      const response = await fetch('http://localhost:1010/Addorphanage', {
        method: "POST",
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orphanagedetails),
        });

      const data = await response.json();
      if (!data.success) {
        toast.error(data.message);
      } else {
        toast.success(data.message);
      }
    } catch (error) {
      console.error(err)
      console.log(err)
    }
    
  }

  return (
    <div className='AddOrphanage-container'>
      <div className='AddOrphanage-heading'>
        <div className='new-addmission'><h2>ADD NEW ADMISSION</h2></div>
        <div />

        <div className='sub-AddOrphanage-container'>
          <tr>
            <td>Orphanage Name:</td>
            <td><input type="text" placeholder='Orphanage Name' name='Oname' onChange={getOrphanagedetails} /></td>
          </tr>

          <tr>
            <td>Address:</td>
            <td><input type="text" placeholder='Address' name='Oaddress' onChange={getOrphanagedetails} /></td>
          </tr>

          <tr>
            <td>Orphanage Admin:</td>
            <td><input type="text" placeholder='Orphanage Admin' name='Oadmin_name' onChange={getOrphanagedetails} /></td>
          </tr>

          <tr>
            <td>District:</td>
            <td><input type="text" placeholder='District' name='Odistrict' onChange={getOrphanagedetails} /></td>
          </tr>

          <tr>
            <td>Password:</td>
            <td><input type="text" placeholder='Password' name='Opassword' onChange={getOrphanagedetails} /></td>
          </tr>

          <tr>
            <td>Mobile Number:</td>
            <td><input type="text" placeholder='TP:-(94xxxxxxxxx)' name='Omoboile_no' onChange={getOrphanagedetails} /></td>
          </tr>

          <tr>
            <td>Email Id:</td>
            <td><input type="text" placeholder='Email Id' name='Omail' onChange={getOrphanagedetails} /></td>
          </tr>

          <button onClick={addOrphanage}>REGISTER</button>
        </div>
      </div>
    </div>
  )
}
