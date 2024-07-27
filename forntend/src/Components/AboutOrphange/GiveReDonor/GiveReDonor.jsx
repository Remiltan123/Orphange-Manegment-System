import React, { useEffect, useState } from 'react'
import "./GiveReDonor.css"
import { useParams } from 'react-router-dom';
import { OrphanageNavbar } from '../../Navbars/OrpanageNavbar/OrphanageNavbar';
import {toast} from "react-toastify"


export const GiveReDonor = () => {

  const { token} = useParams();
  const [orphanage, setOrphanage] = useState({});
  const [donationdetails ,Setdonationdetails]=useState({
    Or_id:""
  });

  const HandleChange = (e)=>{
    Setdonationdetails({...donationdetails,[e.target.name]:e.target.value})
  }
  
  // do one function to common then called within this later
  useEffect(() => {
    const fetchOrphanage = async () => {
      try {
        const response = await fetch(`http://localhost:1010/getorphanage/${token}`);
        if (!response.ok) {
          throw new Error('Failed to fetch orphanage');
        }
        const data = await response.json();
        setOrphanage(data.ORData);
        Setdonationdetails(d => ({ ...d, Or_id: data.ORData.Oid }));
      } catch (error) {
        console.error('Error fetching orphanage:', error);
      }
    };
    fetchOrphanage();
  }, [token]);
  

  const AddDonation = async()=>{
    const responsedata = await fetch("http://localhost:1010/RequestDonetion",{
        method: 'post',
        headers: {
          Accept: 'application/json',
          'content-Type': 'application/json',
        },
        body: JSON.stringify(donationdetails),
    })
    const data = await responsedata.json();
    if(data.success){
      toast.success(data.message)
    }else{
      toast.error(data.message)
    }
  }
console.log(orphanage.Oid)

  return (
    <>
    <div className='GiveReDonor-container'>
        <OrphanageNavbar token={token}/>
        <div className='GiveReDonor'>

          <div className='give-requst '><h2>GIVE REQUEST TO DONOR</h2></div>
          

          <div className='sub-GiveReDono-container'>
            <tr>
              <td>Orphanage Name:</td>
              <td><input type="text" placeholder={orphanage.Oname} className='Orphangename'  /></td>
            </tr>

            <tr>
              <td>Purpose of Request:</td>
              <td>
                <select  id="select" name="purpose" onChange={HandleChange} >
                  <option value="" className='option1'>...Select...</option>
                  <option value="Education">Education</option>
                  <option value="Food">Food</option>
                  <option value="Health">Health</option>
                  <option value="Building">Building</option>
                  <option value="Others">Others</option>
                </select>
              </td>
            </tr>

            <tr>
              <td>Expect Amount:</td>
              <td><input type="text" placeholder="amount"  onChange={HandleChange} 
              name='expect_amount' value={donationdetails.expect_amount}/></td>
              

            </tr>

            <tr>
              <td>Description:</td>
              <td><input type="text" placeholder='Add Description' name='description' onChange={HandleChange}/></td>
            </tr>

            <button onClick={AddDonation}>Submit</button>
          </div>
          </div>
        <div/>
    </div>
    </>
  )
}
