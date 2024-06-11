import React, { useEffect, useState } from 'react'
import { DonorNavbar } from '../Components/Navbars/DonarNavbar/DonorNavbar'
import p3_img from "../Components/Assets/im3.png"
import district from "../Components/Assets/District"
import {toast} from "react-toastify"
import "./CSS/Donorshow.css"
import { useNavigate, useParams } from 'react-router-dom'

export const DonorShoe = () => {

  const Navigate = useNavigate();
  const token = useParams();
  //const {token} = useParams();  // athuka irukira token eduthu thirumab token assign pannuthu
  const [selectedDistrict, setSelectedDistrict] = useState("Jaffna");
  const [DistrictOrphange, SetDistrictOrphange] = useState([]);
  const [count,setCount]=useState();

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
        toast.error(Data.message);
      } else {
        SetDistrictOrphange(Data.data);
        setCount(Data.count)
        console.log(Data.success);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(()=>{
    displayAllOrphanages(selectedDistrict);
  },[selectedDistrict])

  const handleclick = (Orphange)=>{
    Navigate(`/Donor/seeorphange/${token.token}`, { state: { Orphange } }) ;
  }

  console.log(token)

  return (
    <div>
        <DonorNavbar/>
        <div >
        <img src={p3_img} alt="" style={{ height: 200,width:'100%' }}/>
          <div className='Analizice'>
              <h1>Donetion Analaysis</h1>
              <p>Here tou can find Donetion details About the orphanges. It mean Which orphages are frequently get helps from donor and which orphages are rairly got helps from the Donors all the anlayis are you can view and give the donetion base on it. </p>
              <p>And also you can find the all orphanges detials by clicking the each orphanges.</p>

              <div className='district-search'>
               <div className='serach-heading'><p>Search district wise Orphanages Requestes</p></div>
               <div className='Serachbar'>
                <select name="district" id="district"  onChange={(e)=>{ setSelectedDistrict(e.target.value)}}>
                  {district.map((district, index) => (
                    <option value={district} key={index}>{district}</option>
                  ))}
                </select>
                <div className='search-icon'  onClick={()=>{displayAllOrphanages(selectedDistrict)}}>search</div>
              </div>
              <ul className='Analizice-orphange'>
                <p>Toatl Number of orphanges within {selectedDistrict} : <span>{count}</span> </p>
                {DistrictOrphange.map((orphage,index)=>{
                  return (<li key={index} onClick={()=>{handleclick(orphage)}}>{orphage.Oname}</li>)
                })}
              </ul>
          </div>

          </div>
        </div>
    </div>
  )
}
