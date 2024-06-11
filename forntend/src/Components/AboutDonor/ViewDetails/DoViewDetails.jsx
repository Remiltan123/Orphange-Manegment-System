import React, { useEffect, useState } from 'react';
import "./DoViewDetails.css";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { DonationForm } from '../DonationForm/DonationForm';
import district from "../../Assets/District";
import { toast } from "react-toastify";

export const DoViewDetails = () => {
  const navigate = useNavigate();
  const { token } = useParams();
  const [Requests, setRequests] = useState([]);
  const [NewRequests, setNewRequests] = useState([]);
  const [OrphanageDetails, setOrphanageDetails] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState("Jaffna");
  const [perticularOr, SetperticularOr] = useState(null);
  const [state, SetState] = useState("District");

  const handleDistrictWise = () => {
    fetchRequests(selectedDistrict);
    displayAllOrphanages(selectedDistrict);
    SetState("District");
  };

  const HandlePerticular = () => {
    SetState("Perticular");
    SelectPerticular(perticularOr);
  };

  const handleClick = (request, orphanage) => {
    navigate(`/Donor/ViewDetails/Donetion/${token}`, { state: { request, orphanage } });
  };

  const fetchRequests = async (district) => {
    try {
      const response = await fetch('http://localhost:1010/DistrictWiswSearch', {
        method: "POST",
        headers: {
          "Content-Type": 'application/json',
        },
        body: JSON.stringify({ Odistrict: district }),
      });

      const Data = await response.json();
      if (!Data.success) {
        toast.error(Data.message);
      } else {
        setRequests(Data.data);
        fetchOrphanageDetails(Data.data);
      }

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchOrphanageDetails = async (requests) => {
    try {
      const orphanageIds = requests.map(request => request.Or_id);
      const orphanageResponse = await Promise.all(orphanageIds.map(id =>
        fetch(`http://localhost:1010/orphanage/${id}`).then(response => response.json())
      ));
      setOrphanageDetails(orphanageResponse);
    } catch (error) {
      console.error('Error fetching orphanage details:', error);
    }
  };

  useEffect(() => {
    fetchRequests(selectedDistrict);
    displayAllOrphanages(selectedDistrict);
  }, []);

  const [DistrictOrphange, SetDistrictOrphange] = useState([]);

  const displayAllOrphanages = async (district) => {
    try {
      const response = await fetch('http://localhost:1010/displayOrphange', {
        method: "POST",
        headers: {
          "Content-Type": 'application/json',
        },
        body: JSON.stringify({ Odistrict: district }),
      });

      const Data = await response.json();
      if (!Data.success) {
        console.error(Data.message);
      } else {
        SetDistrictOrphange(Data.data);
        console.log(Data.success);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const SelectPerticular = async (Oname) => {

    try {
      const response = await fetch("http://localhost:1010/SerachPerticularOrphange", {
        method: "POST",
        headers: {
          "Content-Type": 'application/json',
        },
        body: JSON.stringify({ Oname: Oname }),
      });

      const Data = await response.json();
      if (!Data.success) {
        toast.error(Data.message);
      } else {
        setNewRequests(Data.data);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  console.log(NewRequests)

  return (
    <div className='ViewDetails-container'>
      <div className='ViewDetails-sub-container'>
        <div className='heading'><h1>ALL DONATION REQUEST DETAILS</h1></div>

        <div className='Orphange-sreach'>
          <div className='district-search'>
            <div className='serach-heading'><p>Search district wise Orphanages Requestes</p></div>
            <div className='Serachbar'>
              <select name="district" id="district"  onChange={(e)=>{ setSelectedDistrict(e.target.value)}}>
                {district.map((district, index) => (
                  <option value={district} key={index}>{district}</option>
                ))}
              </select>
              <div className='search-icon' onClick={ handleDistrictWise }>search</div>
            </div>
          </div>
          
          <div className='perticular-orphange'>
            <div className='serach-heading'><p>Search perticular Orphanages Requestes</p></div>
            <div className='Serachbar'>
              <select name="district" id="district"  onChange={(e)=>{ setSelectedDistrict(e.target.value)}}>
                <option value="">Choose Orphanage</option>
                {DistrictOrphange.map((orphange, index) => (
                  <option value={orphange.Oname} key={index} onClick={()=>{SetperticularOr(orphange.Oname)}}>{orphange.Oname}</option>
                ))}
              </select>
              <div className='search-icon' onClick={HandlePerticular }>search</div>
            </div>
          </div>

        </div>


        <table className='table-Details'>
          <thead>
            <tr>
              <th>Orphanage Name</th>
              <th>Purpose</th>
              <th>Description</th>
              <th>Requested Date</th> 
              <th>Goal/Raised</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {state === "District" ?
            Requests.map((request, index) => (
              <tr key={index}>
                <td style={{ color: "blue", fontWeight: 600 }}>{OrphanageDetails[index]?.Oname}</td>
                <td style={{ color: "blue", fontWeight: 600 }}>{request.purpose}</td>
                <td>{request.description}</td>
                <td>{request.date}</td>
                <td className='amount'>
                    <p>
                      <strong style={{ opacity: 0.7 }}>Raised:</strong> <span style={{ color: "#ff9900", fontWeight: "bold" }}>${request.raised_amount.toLocaleString()}</span>
                      <strong style={{ opacity: 0.7 }}> Goal:</strong> <span style={{ fontWeight: "bold", color: "green" }}> ${request.expect_amount.toLocaleString()}</span>
                    </p>
                    <div className="ViewDetails-progress-bar">
                      <div className="ViewDetails-progress" style={{ width: `${(request.raised_amount /request.expect_amount) * 100}%`, backgroundColor: '#ff9900' }}></div>
                    </div>
                </td>
                
                <td>
                  <div className='buttons'>
                    <button className='Accept-button' onClick={()=>{handleClick(request,OrphanageDetails[index])}} >Accept</button>
                  </div>
                </td>
              </tr>
            ))

            :NewRequests.map((request, index) => (
              <tr key={index}>
                <td style={{ color: "blue", fontWeight: 600 }}>{OrphanageDetails[index]?.Oname}</td>
                <td style={{ color: "blue", fontWeight: 600 }}>{request.purpose}</td>
                <td>{request.description}</td>
                <td>{request.date}</td>
                <td className='amount'>
                    <p>
                      <strong style={{ opacity: 0.7 }}>Raised:</strong> <span style={{ color: "#ff9900", fontWeight: "bold" }}>${request.expect_amount.toLocaleString()}</span>
                      <strong style={{ opacity: 0.7 }}> Goal:</strong> <span style={{ fontWeight: "bold", color: "green" }}> ${request.expect_amount.toLocaleString()}</span>
                    </p>
                    <div className="ViewDetails-progress-bar">
                      <div className="ViewDetails-progress" style={{ width: `${(request.expect_amount /request.expect_amount) * 100}%`, backgroundColor: '#ff9900' }}></div>
                    </div>
                </td>
                
                <td>
                  <div className='buttons'>
                    <button className='Accept-button' onClick={()=>{handleClick(request,OrphanageDetails[index])}} >Accept</button>
                  </div>
                </td>
              </tr>
            ))
          
          }
          </tbody>
        </table>
      </div>
    </div>
  );
};
