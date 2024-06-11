import React, { useEffect, useState, useRef } from 'react';
import { DonorNavbar } from '../Components/Navbars/DonarNavbar/DonorNavbar';
import p3_img from "../Components/Assets/im3.png";
import district from "../Components/Assets/District";
import { toast } from "react-toastify";
import "./CSS/Donorshow.css";
import { useNavigate, useParams } from 'react-router-dom';
import Chart from 'chart.js/auto';

export const DonorShoe = () => {
  const navigate = useNavigate();
  const { token } = useParams();
  const [selectedDistrict, setSelectedDistrict] = useState("Jaffna");
  const [districtOrphanage, setDistrictOrphanage] = useState([]);
  const [count, setCount] = useState([]);
  const chartRefs = useRef([]);

  const displayAllOrphanages = async (district) => {
    try {
      const response = await fetch('http://localhost:1010/OrphangeAnalayisis', {
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
        setDistrictOrphanage(data.data);
        setCount(data.count);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    displayAllOrphanages(selectedDistrict);
  }, [selectedDistrict]);

  useEffect(() => {
    districtOrphanage.forEach((orphanage, index) => {
      renderBarChart(orphanage, index);
    });
  }, [districtOrphanage]);

  const handleClick = (Orphanage) => {
    navigate(`/Donor/seeorphange/${token}`, { state: { Orphanage } });
  };

  const renderBarChart = (orphanage, index) => {
    if (!chartRefs.current[index]) return;

    const ctx = chartRefs.current[index].getContext('2d');
    const labels = [];
    const expectedDataset = {
      label: 'Expected Amount',
      data: [],
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderColor: 'rgba(255, 99, 132, 1)',
      borderWidth: 1,
      barPercentage: 0.3
    };
    const raisedDataset = {
      label: 'Raised Amount',
      data: [],
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 1,
      barPercentage: 0.3
    };

    const purposes = orphanage.purposes;
    Object.keys(purposes).forEach(purpose => {
      labels.push(purpose);
      expectedDataset.data.push(purposes[purpose].totalExpectAmount);
      raisedDataset.data.push(purposes[purpose].totalRaisedAmount);
    });

    if (window[`myChart${index}`] instanceof Chart) {
      window[`myChart${index}`].destroy();
    }

    window[`myChart${index}`] = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [expectedDataset, raisedDataset]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  };

  return (
    <div>
      <DonorNavbar />
      <div>
        <img src={p3_img} alt="" style={{ height: 300, width: '95%' }} className='Headimg'/>

        <div className='Analizice'>
          <h1>Donation Analysis</h1>
          <p>Here you can find Donation details About the orphanages. It means Which orphanages frequently get help from donors and which orphanages rarely got help from the Donors. All the analysis you can view and give the donation based on it.</p>
          <p>And also you can find all orphanages details by clicking each orphanage.</p>

          <div className='district-search'>
            <div className='district-search-search-heading'><p>Search district wise Orphanages Requests</p></div>
            <div className='district-search-Searchbar'>
              <select name="district" id="district" onChange={(e) => { setSelectedDistrict(e.target.value) }}>
                {district.map((district, index) => (
                  <option value={district} key={index}>{district}</option>
                ))}
              </select>
              <div className='district-search-search-icon' onClick={() => { displayAllOrphanages(selectedDistrict) }}>search</div>
            </div>
          </div>

          <ul className='Analizice-orphanage'>
            <p>Total Number of orphanages within {selectedDistrict} : <span>{count}</span> </p>
            <div className="orphanage-list">
              {districtOrphanage.map((Orphanage, index) => (
                <li key={index} onClick={() => handleClick(Orphanage.orphanage)}>
                  {Orphanage.orphanage.Oname}
                </li>
              ))}
            </div>
            {districtOrphanage.map((Orphanage, index) => (
              <div key={index}>
                <h2 onClick={() => handleClick(Orphanage.orphanage)} style={{color:'green',cursor:'pointer'}} >{Orphanage.orphanage.Oname}</h2>
                {typeof Orphanage.purposes === 'object' && Object.keys(Orphanage.purposes).map((purpose, purposeIndex) => (
                  <div key={purposeIndex}>
                    <p>Purpose: <span className='Colorspan'>{purpose}</span></p>
                    <p>Total Expected Amount: <span className='Colorspan'>{Orphanage.purposes[purpose].totalExpectAmount}</span></p>
                    <p>Total Raised Amount: <span className='Colorspan'>{Orphanage.purposes[purpose].totalRaisedAmount}</span></p>
                  </div>
                ))}
                <div className='chart-container'>
                  <canvas id={`barChart${index}`} ref={el => chartRefs.current[index] = el}></canvas>
                </div>
              </div>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
