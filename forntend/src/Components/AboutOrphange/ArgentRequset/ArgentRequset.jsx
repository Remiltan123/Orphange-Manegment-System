import React, { useEffect, useState } from 'react'
import "./ArgentRequset.css"
import { useParams } from 'react-router-dom';
import upload_image from '../../Assets/upload_area.svg';
import {toast} from "react-toastify"

export const ArgentRequset = () => {

  const { token } = useParams();
  const [orphanage, setOrphanage] = useState({});
  const[state,Setstate]=useState(true)
  const[image,setImage]=useState(null);

  const [wantsdetils,Setwantsdetils]= useState({
    Or_id:"",
    purpose:"",
    goal_amount:"",
    Raised_amount:"0",
    description:"",
    image:"",
  })

  const HandleChange = (e)=>{
    Setwantsdetils({...wantsdetils,[e.target.name]:e.target.value})
  }

  const imageHandle =(e)=>{
    setImage(e.target.files[0])
  }

  useEffect(() => {
    const fetchOrphanage = async () => {
      try {
        const response = await fetch(`http://localhost:1010/getorphanage/${token}`);
        if (!response.ok) {
          throw new Error('Failed to fetch orphanage');
        }
        const data = await response.json();
        setOrphanage(data.ORData);
        Setwantsdetils(d=>({...d, Or_id:data.ORData.Oid}))
  

      } catch (error) {
        console.error('Error fetching orphanage:', error);
      }
    };
    fetchOrphanage();
  }, []);

  const AddWants = async () => {
   
    let formData = new FormData();
    formData.append('image', image);

    try {
        // Upload image
        const imageResponse = await fetch('http://localhost:1010/upload', {
            method: "POST",
            mode: 'cors',
            body: formData
        });
        
        const imageData = await imageResponse.json();
        
        if (!imageData.success) {
            toast.error(imageData.message)
        }else{
          wantsdetils.image = imageData.image_url;
        }

       
        // Add product to backend
        const response = await fetch("http://localhost:1010/AddArregentWants",{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(wantsdetils),
        })

        const Data = await  response.json();
        if (!Data.success) {
          toast.error(Data.message)
          console.log(wantsdetils)
        }else{
          toast.success(Data.message)
        }

    } catch (error) {
        console.error(error);
        toast.error(error)
    }
}

  return (
    <div className='ArgentRequset-container'>
        <div className='ArgentRequset'>

          <div className='ArgentRequset-Striteline'>
            <div className={state == true ? "clz3" : "clz4"} onClick={()=>{Setstate(true)}}>Add Arrgent Wants In Frontpage</div>
            <div className={!state == true ? "clz3" : "clz4"} onClick={()=>{Setstate(false)}}>About this page</div>
          </div>

          {state && (<div className='sub-ArgentRequset-container'>
            <tr>
              <td>Orphanage Name:</td>
              <td><input type="text" placeholder={orphanage.Oname} className='Orphangename' value={orphanage.Oname} /></td>
            </tr>

      
            <tr>
              <td>Expect Amount:</td>
              <td><input type="text" placeholder="amount (in $)"  onChange={HandleChange} 
              name='goal_amount' /></td>
            </tr>

            <tr>
              <td>Purpose of Request:</td>
              <td>
               < input type="text" className='pupose-requst' style={{width:480}  } placeholder="purpose" name="purpose"  onChange={HandleChange}/>
              </td>
            </tr>
   
            <tr>
              <td>Description:</td>
              <td><textarea id="" placeholder='description' name="description"  onChange={HandleChange}></textarea></td>
            </tr>

            <div className='image-attachment'>
                <p>Add Relavent image:</p>
                <label htmlFor="file-input">
                    {image ? (<img  src={URL.createObjectURL(image)} alt=""  style={{ border: "1px solid black" }} className='upload-image' />) 
                    : (<img src={upload_image} alt="" className='upload-image'/>)}
                </label>
                <input type='file' name='image' id='file-input' hidden onChange={imageHandle} />
            </div>

            <button  onClick={AddWants}>Submit</button>
          </div>)}

          {!state && (<div className='ArgentRequset-Aboutpage'>
              <div>Well come</div>
              <p>Here If you Have any arggent wants you can sent with email using attach the related document </p>
              <p>For example suppose your want to blood emmergence then tou have to upload related detilas like pdf upload within the uploaded image the you can sent and sup...you want ...acc </p>
            </div>)}
          </div>
        <div/>
    </div>
    
  )
}
