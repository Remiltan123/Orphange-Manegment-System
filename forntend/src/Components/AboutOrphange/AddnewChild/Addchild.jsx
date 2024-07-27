import React, { useEffect, useState } from 'react';
import "./Addchild.css";
import register_here from "../../Assets/LoginHere.png";
import child from "../../Assets/AdoptChild.png";
import { OrphanageNavbar } from '../../Navbars/OrpanageNavbar/OrphanageNavbar';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

export const Addchild = () => {

   const { token } = useParams();
   const [ChildsDetilas, SetChildsDetilas] = useState({
        OR_id: "",
        Name: "",
        Age: "",
        Gender: "",
        Diaseases: "",
        Specialneed: ""
   });

   const HandleClick = (e) => {
       SetChildsDetilas({ ...ChildsDetilas, [e.target.name]: e.target.value });
   }

   const AddNewchild = async () => {
       const response = await fetch("http://localhost:1010/AddChilds", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(ChildsDetilas)
       });

       const responseData = await response.json();
       if (!responseData.success) {
            toast.error(responseData.meassage);
       } else {
            toast.success(responseData.meassage);
       }
   }

   const fetchOrphanage = async () => {
    try {
      const response = await fetch(`http://localhost:1010/getorphanage/${token}`);
      if (!response.ok) {
        throw new Error('Failed to fetch orphanage');
      }
      const data = await response.json();
      SetChildsDetilas(d => ({ ...d, OR_id: data.ORData.Oid }));
    } catch (error) {
      console.error('Error fetching orphanage:', error);
      toast.error('Error fetching orphanage');
    }
  };

  useEffect(() => {
    fetchOrphanage();
  }, []);

  return (
    <>
    <OrphanageNavbar token={token}/>
    <div className='Child-header'>
    <img src={child } alt="" className='child-header-image'/>
    <div className='Addchild-main-container'>
        <div className='Addchild-container'>
            <div className='Addchild-container-body'>
                <div className='Addchild-image'>
                    <div className='register_image'><img src={register_here} alt="" /></div>
                    <h3>Register here</h3>
                </div>
            
                <tr>
                    <td>Child Name:</td>
                    <input type="text" name='Name' onChange={HandleClick} />
                </tr>
                <tr>
                    <td>Age:</td>
                    <input type="text" name='Age' onChange={HandleClick} />    
                </tr>
                <tr>
                    <td>Gender:</td>
                    <input type="radio" name="Gender" value="Male" checked={ChildsDetilas.Gender === "Male"} onChange={HandleClick} /> <label>Male</label>
                    <input type="radio" name="Gender" value="Female" checked={ChildsDetilas.Gender === "Female"} onChange={HandleClick} /> <label>Female</label>
                </tr>
                <tr>
                    <td>Diaseases:</td>
                    <input type="radio" name="Diaseases" value="YES" checked={ChildsDetilas.Diaseases === "YES"} onChange={HandleClick} /> <label>YES</label>
                    <input type="radio" name="Diaseases" value="NO" checked={ChildsDetilas.Diaseases === "NO"} onChange={HandleClick} /> <label>NO</label>
                </tr>
                <tr>
                    <td>Special needs:</td>
                    <input type="radio" name="Specialneed" value="YES" checked={ChildsDetilas.Specialneed === "YES"} onChange={HandleClick} /> <label>YES</label>
                    <input type="radio" name="Specialneed" value="NO" checked={ChildsDetilas.Specialneed === "NO"} onChange={HandleClick} /> <label>NO</label>
                </tr>
                <button onClick={AddNewchild} className='AddChild-button'>Submit</button>
            </div>
        </div>
    </div>
    </div>
    </>
  )
}
