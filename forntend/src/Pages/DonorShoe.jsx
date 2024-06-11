import React, { useEffect, useState } from 'react';
import { DonorNavbar } from '../Components/Navbars/DonarNavbar/DonorNavbar';
import p3_img from "../Components/Assets/im3.png";
import district from "../Components/Assets/District";
import { toast } from "react-toastify";
import "./CSS/Donorshow.css";
import { useNavigate, useParams } from 'react-router-dom';

export const DonorShoe = () => {

  const navigate = useNavigate(); // Correct capitalization
  const { token } = useParams(); // Destructure to get the token directly
  const [selectedDistrict, setSelectedDistrict] = useState("Jaffna");
  const [DistrictOrphanage, SetDistrictOrphanage] = useState([]);
  const [count, setCount] = useState();

  const displayAllOrphanages = async (district) => {
    try {
      const response = await fetch('http://localhost:1010/displayOrphange', {
        method: "POST",
        headers: {
          "Content-Type": 'application/json',
        },
        body: JSON.stringify({ Odistrict: district }),
      });

      const data = await response.json();
      if (!data.success) {
        toast.error(data.message);
      } else {
        SetDistrictOrphanage(data.data);
        setCount(data.count);
        console.log(data.success);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    displayAllOrphanages(selectedDistrict);
  }, [selectedDistrict]); // Corrected dependency array

  const handleClick = (orphanage) => {
    navigate(`/Donor/seeorphange/${token}`, { state: { orphanage } });
  };

  console.log(token);

  return (
    <div>
      <DonorNavbar />
      <div>
        <img src={p3_img} alt="" style={{ height: 200, width: '100%' }} />
        <div className='Analizice'>
          <h1>Donation Analysis</h1>
          <p>Here you can find Donation details About the orphanages. It means Which orphanages frequently get help from donors and which orphanages rarely got help from the Donors. All the analysis you can view and give the donation based on it.</p>
          <p>And also you can find all orphanages details by clicking each orphanage.</p>

          <div className='district-search'>
            <div className='search-heading'><p>Search district wise Orphanages Requests</p></div>
            <div className='Searchbar'>
              <select name="district" id="district" onChange={(e) => { setSelectedDistrict(e.target.value) }}>
                {district.map((district, index) => (
                  <option value={district} key={index}>{district}</option>
                ))}
              </select>
              <div className='search-icon' onClick={() => { displayAllOrphanages(selectedDistrict) }}>search</div>
            </div>
            <ul className='Analizice-orphanage'>
              <p>Total Number of orphanages within {selectedDistrict} : <span>{count}</span> </p>
              {DistrictOrphanage.map((orphanage, index) => {
                return (<li key={index} onClick={() => handleClick(orphanage)}>{orphanage.Oname}</li>)
              })}
            </ul>
          </div>

        </div>
      </div>
    </div>
  );
};
