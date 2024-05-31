import React, {  useState } from 'react'
import "./CSS/OrphanageSelect.css"
import { Link } from 'react-router-dom'
import orphan from '../Components/Assets/orpan.png'
import district from "../Components/Assets/District"
import {toast} from "react-toastify"

export const OrphanageSelect = () => {

  const [orphanages, setOrphanages] = useState([]);
  const [orphanage_getid,setOrphanageid]=useState();
  const [selectedDistrict, setSelectedDistrict] = useState();

  const handleDistrictChange = (e) => {
    const district = e.target.value;
    setSelectedDistrict(district);
    displayAllOrphanages(district);
  };

  const displayAllOrphanages = async (district) => {
    try {
        const response = await fetch('http://localhost:1010/displayOrphange', {
        method: "POST",
        headers: {
          "Content-Type": 'application/json',
        },
        body:JSON.stringify({ Odistrict: district }),
      });

      const Data = await response.json();
      if (!Data.success) {
        toast.error(Data.message);
      } else {
        setOrphanages(Data.data);  
        console.log(Data.success) 
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  console.log(selectedDistrict)
  return (
    <div className='AllOrphanages-main-continer'>
    <div className='AllOrphanages-Admin-container'>
        <div className='AllOrphanages-Admin-header'>
          <div  className='Admin-header-image'><img src={orphan} alt="" /></div>
          <h2>Select Orphanage</h2>
        </div>

       

        <div className='AllOrphanages-Admin-body'>
        
        <select name="district" id="district" onChange={handleDistrictChange}>
          <option value="1" className='AllOrphanages-option-ChooseOrphanage'>Choose District Of Orphanage</option>
              {district.map((district, index) => (
                <option value={district} key={index}>{district}</option>
              ))}
        </select>

        <p></p>
        <select name="" id="orphange">
          <option value="1" className='AllOrphanages-option-ChooseOrphanage'>Choose Orphanage Name</option>
          {orphanages.map((orphanage, index) => (
              <option key={index} value={orphanage.Oid} onClick={()=>{setOrphanageid(orphanage.Oid)}}>{orphanage.Oname}</option>
          ))}
        </select>

        <button type='submit' className='AllOrphanages-Admin-body-button'> <Link to={`/OrphanageLogin/${orphanage_getid}`} style={{textDecoration:"none"}}>Submit</Link></button>
        </div>
    </div>
  </div>
  )
}
