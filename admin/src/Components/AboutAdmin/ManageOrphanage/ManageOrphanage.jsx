
import React, { useEffect, useState } from 'react';
import "./ManageOrphanage.css";
import { Link } from 'react-router-dom';
import cannel_icon from "../../Assets/cannel_icon.png"
import {toast} from "react-toastify"
import district from "../../Assets/District"


export const ManageOrphanage = () => {

  const [orphanages, setOrphanages] = useState([]);
  const [orphanageid, setOrphanageid] = useState(null);
  const [orphanagename, setOrphanagename] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState("Jaffna");

  const displayAllOrphanages = async (district) => {
    try {
        const response = await fetch('http://localhost:1010/displayOrphange', {
        method: "POST",
        headers: {
          "Content-Type": 'application/json',
        },
        body:JSON.stringify({  Odistrict: district }),
      });

      const Data = await response.json();
      if (!Data.success) {
        toast.error(Data.message);
      } else {
        setOrphanages(Data.data);
        
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    displayAllOrphanages(selectedDistrict);
  }, []);

  const handleSearchClick = () => {
    displayAllOrphanages(selectedDistrict);
  };

  const RemoveFunction = async (Id, Name) => {
    try {
      await fetch('http://localhost:1010/RemoveOrphanage', {
        method: "POST",
        headers: {
          "Content-Type": 'application/json',
        },
        body: JSON.stringify({ id: Id }),
      });

      displayAllOrphanages(selectedDistrict);
      toast.success(Name + "  SuccesFully  Removed");
      setOrphanageid(null);
    } catch (error) {
      console.error('Error removing orphanage:', error);
    }
  };

  console.log(selectedDistrict)
  return (
    <>
      <div className='ManageOrphanage-container'>

        <div className='ManageOrphanage-sub-container'>
          <div className='heading'><h1>MANAGE ALL ORPHANAGE DETAILS</h1></div>

          <div className='serach-heading'><p>Search district wise Orphanages</p></div>
          <div className='Serachbar'>
            <select name="district" id="district"  value={selectedDistrict}  onChange={(e) => setSelectedDistrict(e.target.value)}>
              {district.map((district, index) => (
                <option value={district} key={index}>{district}</option>
              ))}
            </select>
            <div className='search-icon' onClick={handleSearchClick}>search</div>
          </div>
          <table className='table-Details'>
            <thead>
              <tr>
                <th>ID</th>
                <th>Orpanage Name</th>
                <th>Address</th>
                <th>Orpanage Admin</th>
                <th>Mobile</th>
                <th>Email</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              {orphanages.map((orphanage, index) => (
                <tr key={index}>
                  <td>{orphanage.Oid}</td>
                  <td>{orphanage.Oname}</td>
                  <td>{orphanage.Oaddress}</td>
                  <td>{orphanage.Oadmin_name}</td>
                  <td>{orphanage.Omoboile_no}</td>
                  <td>{orphanage.Omail}</td>
                  <td>
                    <div className='edit-buttons'>
                      <Link to={`/updateOrphanage/${orphanage.Oid}`}><button className='update-button'>Update</button></Link>
                      <button className='delete-button' onClick={()=>{setOrphanageid(orphanage.Oid), setOrphanagename(orphanage.Oname)}}>Delete</button>
                    </div>  
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {orphanageid && <ConfromBox orphanageid={orphanageid} RemoveFunction={RemoveFunction} setOrphanageid={setOrphanageid} orphanagename={orphanagename}/> }
    </>
  )
}

//Create confromBox
const ConfromBox = ({ orphanageid, RemoveFunction, setOrphanageid, orphanagename }) => {

  const [nameMatch, setNameMatch] = useState(false);

  const handleInputChange = (e) => {
    const inputName = e.target.value;
    setNameMatch(inputName === orphanagename);
  }

  const handleDropClick = () => {
    if (nameMatch) {
      RemoveFunction(orphanageid, orphanagename);
    } else {
      toast.error("Orphanage name doesn't match");
    }
  }

  return (
    <>
      <div className='confrom-Box'>
        <div className='confrom-detils'>
          <h2>Drop Orphanage</h2>
          <p>To drop the orphanage, type the name to confirm.</p>
          <input type="text" placeholder='Enter orphanage name' onChange={handleInputChange} />
          <div className='confrom-button'>
            <button className='cannel-button' onClick={() => setOrphanageid(null)}>Cancel</button>
            <button className='Drop-button' onClick={handleDropClick}>Drop</button>
          </div>
        </div>
        <div className='cannel-icon' onClick={() => setOrphanageid(null)}><img src={cannel_icon} alt="" /></div>
      </div>
    </>
  )
}
