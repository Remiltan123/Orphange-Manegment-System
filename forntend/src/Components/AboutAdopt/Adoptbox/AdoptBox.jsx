import React, { useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import "./AdoptBox.css"
import {toast} from "react-toastify"
import { DetailsContext } from '../../../Context/OrphangeContext';

export const AdoptBox = ({ childDetails, SetShow, GroupChilds  }) => {
  
  const navigate = useNavigate();
  const { token } = useParams();


  const handleClickHere = () => {
    navigate(`/Adopter/vieworphange/${token}`);
  }

  const Adoption = async(ID)=>{
    const response = await fetch(`http://localhost:1010/childBooked/${token}`,{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body: JSON.stringify({id:ID})
    })
    const data = await response.json();
    if (!data.success) {
      toast.error(data.message);
    } else {
      toast.success(data.message);
    }

  }

  const YesHandleClick = (id)=>{
    Adoption(id);
    SetShow(false) ;
    GroupChilds();
  }


  return (
    <>
    {childDetails.Available ?

    <div className='AdoptBox'>
      <div className='AdoptBox-header'>
        <h3>Are You Sure About Adoption</h3>
      </div>
      <div className='AdoptBox-details'>
        <table>
          <tbody>
            <tr>
              <th style={{color:"#989797"}}>Name</th>
              <td>{childDetails.Name}</td>
            </tr>
            <tr>
              <th style={{color:"#989797"}}>Age</th>
              <td>{childDetails.Age}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className='AdoptBox-moredetails'>
        <p>If you click YES, confirm your adoption and then we will send the mail to you. Then you will face an interview.</p>
      </div>
      <div className='AdoptBox-buttons'>
        <button className='AdoptBox-YES' onClick={() => {YesHandleClick(childDetails.ID) }}>YES</button>
        <button className='AdoptBox-NO' onClick={() => { SetShow(false) }}>NO</button>
      </div>
      <div className='AdoptBox-click'>
        <p>To know about our house details <span onClick={handleClickHere} style={{ color: 'red', cursor: 'pointer' }}>Click here</span></p>
      </div>
    </div>:

    <div className='AdoptBox'>
        <div className='AdoptBox-header'>
          <h3 style={{color:'red'}}>Already Booked The Child  !!!!</h3>
        </div>
        <div className='AdoptBox-details'>
            <table>
              <tbody>
                <tr>
                  <th style={{color:"#989797"}}>Name</th>
                  <td>{childDetails.Name}</td>
                </tr>
                <tr>
                  <th style={{color:"#989797"}}>Age</th>
                  <td>{childDetails.Age}</td>
                </tr>
              </tbody>
            </table>
        </div>
        <div className='AdoptBox-moredetails'>
          <p style={{fontWeight:'bold'}}>If you want please pick another Child</p>
        </div>
        <button className='AdoptBox-close' onClick={() => { SetShow(false) }}>close</button>
      </div>
    


    }
    </>
  );
}
