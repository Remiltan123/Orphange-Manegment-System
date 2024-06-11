import React, { useEffect, useState } from 'react';
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
  const [count, setCount] = useState();

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

        // Render the bar chart after receiving data
        renderBarChart(data.data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    displayAllOrphanages(selectedDistrict);
  }, [selectedDistrict]);

  const handleClick = (Orphanage) => {
    navigate(`/Donor/seeorphange/${token}`, { state: { Orphanage } });
  };

  // Function to render the bar chart
  // Function to render the bar chart
const renderBarChart = (data) => {
  const ctx = document.getElementById('barChart');
  const labels = [];
  const datasets = [];

  // Iterate over each orphanage
  data.forEach(orphanage => {
    const orphanageName = orphanage.orphanage.Oname;
    const purposes = orphanage.purposes;

    // Iterate over each purpose of the orphanage
    Object.keys(purposes).forEach(purpose => {
      const expectedAmount = purposes[purpose].totalExpectAmount;
      const raisedAmount = purposes[purpose].totalRaisedAmount;

      // Add purpose as label if not already added
      if (!labels.includes(purpose)) {
        labels.push(purpose);
      }

      // Create or update dataset for expected amount
      let expectedDataset = datasets.find(dataset => dataset.label === `Expected Amount - ${orphanageName}`);
      if (!expectedDataset) {
        expectedDataset = {
          label: `Expected Amount - ${orphanageName}`,
          data: [],
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1
        };
        datasets.push(expectedDataset);
      }
      expectedDataset.data.push(expectedAmount);

      // Create or update dataset for raised amount
      let raisedDataset = datasets.find(dataset => dataset.label === `Raised Amount - ${orphanageName}`);
      if (!raisedDataset) {
        raisedDataset = {
          label: `Raised Amount - ${orphanageName}`,
          data: [],
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        };
        datasets.push(raisedDataset);
      }
      raisedDataset.data.push(raisedAmount);
    });
  });

  // Create the bar chart
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: datasets
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
        <img src={p3_img} alt="" style={{ height: 200, width: '100%' }} />

        <div className='Analizice'>
          <h1>Donation Analysis</h1>
          <p>Here you can find Donation details About the orphanages. It means Which orphanages frequently get help from donors and which orphanages rarely got help from the Donors. All the analysis you can view and give the donation based on it.</p>
          <p>And also you can find all orphanages details by clicking each orphanage.</p>

          <div className='district-search'>
            <div className='search-heading'><p>Search district wise Orphanages Requests fgdre</p></div>
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
              {districtOrphanage.map((Orphanage, index) => (
  <li key={index} onClick={() => handleClick(Orphanage.orphanage)}>
    <p>Orphanage Name: {Orphanage.orphanage.Oname}</p>
    {/* Check if purposes is an object before using Object.keys() */}
    {typeof Orphanage.purposes === 'object' && Object.keys(Orphanage.purposes).map((purpose, purposeIndex) => (
      <div key={purposeIndex}>
        <p>Purpose: {purpose}</p>
        <p>Total Expected Amount: {Orphanage.purposes[purpose].totalExpectAmount}</p>
        <p>Total Raised Amount: {Orphanage.purposes[purpose].totalRaisedAmount}</p>
      </div>
    ))}
  </li>
))}
            </ul>
          </div>

        </div>
      </div>
    </div>
  );
};
