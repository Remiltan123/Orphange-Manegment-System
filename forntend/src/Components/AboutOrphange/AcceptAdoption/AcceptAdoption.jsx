import React, { useEffect, useState } from 'react';
import "./AcceptAdoption.css";
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import { OrphanageNavbar } from '../../Navbars/OrpanageNavbar/OrphanageNavbar';

export const AcceptAdoption = () => {
  const [orphange, setOrphange] = useState({});
  const [adoptChild, setAdoptChild] = useState([]);
  const { token } = useParams();
  const[ attachment,Setattachment]= useState(null);
  const [orphangemail, Setorphangemail] = useState();
  const[loading,Setloading] = useState(false)

  const [submit, setSubmit] = useState({
    id: '',
    type: '',
  });

  const handleClick = (e) => {
    setSubmit({ ...submit, [e.target.name]: e.target.value });
  };

  const orphangeAdoptChild = adoptChild.filter(child => child.OR_id === orphange.Oid);

  const getAdoptChild = async () => {
    try {
      const response = await fetch(`http://localhost:1010/GetAdoption/${token}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const resData = await response.json();
      if (!resData.success) {
        toast.error(resData.message);
      } else {
        setAdoptChild(resData.ChildData);
        setOrphange(resData.Orphange);
      }
    } catch (error) {
      toast.error("Failed to fetch data");
      console.error("Fetch error:", error);
    }
  };

  useEffect(() => {
    getAdoptChild();
    fetchOrphanage();
  }, [token]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  const acceptAdoption = async (id) => {
    const response = await fetch("http://localhost:1010/Accept-Request", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ Ch_id: id })
    });
    const resData = await response.json();
    if (!resData.success) {
      toast.error(resData.message);
    }else{
      //toast.success(resData.message)
      getAdoptChild();
    }
  };

  //console.log(adoptChild)
  const rejectAdoption = async (id) => {
    const response = await fetch("http://localhost:1010/Reject-Request", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ Ch_id: id })
    });
    const resData = await response.json();
    if (!resData.success) {
      toast.error(resData.message);
    }else{
      //toast.success(resData.message)
      getAdoptChild();
    }
  };

  const handleSubmit = async () => {
    Setloading(true)
    const numericSubmitId = parseInt(submit.id, 10);  // Convert submit.id to a number
    const selectedChild = adoptChild.find(child => child.adoptedDetails.Ch_id === numericSubmitId);
    
    console.log("Selected Child:", selectedChild);  
  
    if (!selectedChild) {
      toast.error("Child not found");
      return;
    }
  
    if (!selectedChild.adopterDetails) {
      toast.error("Adopter details not found");
      return;
    }
  
    const adopterEmail = selectedChild.adopterDetails.email;
    const subject = `Adoption Request ${submit.type}`;
    var type = submit.type.toLowerCase();
    var text = submit.type === "Accepted" 
      ? `Your adoption request has been ${submit.type.toLowerCase()}. Please Carefully Read the bellow Pdf`
      : `Your adoption request has been ${submit.type.toLowerCase()}`;
  
    if (submit.type === "Accepted") {
      await acceptAdoption(numericSubmitId);
    } else if (submit.type === "Rejected") {
      await rejectAdoption(numericSubmitId);
    }
  
    // Prepare form data
    const formData = new FormData();
    formData.append("from", orphangemail);
    formData.append("to", adopterEmail);
    formData.append("subject", subject);
    formData.append("text", text);
    formData.append("type", type);
    if (attachment) {
      formData.append("attachment", attachment);
    }
  
    await sendEmail(formData);
    Setloading(false)
  };
  
  

  console.log(orphangemail)

  const sendEmail = async (formData) => {
    const response = await fetch("http://localhost:1010/Send-replay-mail", {
      method: "POST",
      body: formData
    });
    const resData = await response.json();
    if (!resData.success) {
      toast.error(resData.message);
    } else {
      toast.success(resData.message);
    }
  };


  const fetchOrphanage = async () => {
    try {
        const response = await fetch(`http://localhost:1010/getorphanage/${token}`);
        if (!response.ok) {
            throw new Error('Failed to fetch orphanage');
        }
        const data = await response.json();
        Setorphangemail(data.ORData.Omail);
    } catch (error) {
        console.error('Error fetching orphanage:', error);
    }
};

  return (
    <>
       <OrphanageNavbar token={token} />
      <div className='AcceptAdoption-main-container'>
        <div className='AcceptAdoption-container'>
          <div className='AcceptAdoption-heading'>
            <h1>ACCEPT ADOPTION REQUEST</h1>
          </div>

          <div className='AcceptAdoption-body'>
            <div className='AcceptAdoption-table'>
              <table className='tbl'>
                <thead>
                  <tr>
                    <th>Applicant Name</th>
                    <th>Mail</th>
                    <th>Contact Number</th>
                    <th>Child Id</th>
                    <th>Child Name</th>
                    <th>Date</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>
                  {orphangeAdoptChild.map((child, index) => {
                    return (
                      <tr key={index}>
                        <td>{child.adopterDetails.Aname}</td>
                        <td>{child.adopterDetails.email}</td>
                        <td>{child.adopterDetails.mobile_no}</td>
                        <td>{child.id}</td>
                        <td>{child.Name}</td>
                        <td>{formatDate(child.adoptedDetails.Requested_date)}</td>
                        {child.adoptedDetails.Accept ? <td style={{color: 'green', fontWeight: 'bold'}}>Accepted</td> : <td>Requested</td>}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className='AcceptAdoption-update-details'>
              <tr className='child-registerid'>
                <th>Child register id</th>
                <input type="text" onChange={handleClick} name='id'/>
              </tr>

              <tr>
                <th>Your Decision</th>
                <select name="type" id="" onChange={handleClick}>
                  <option value="">Choose</option>
                  <option value="Accepted">Accept</option>
                  <option value="Rejected">Reject</option>
                </select>
              </tr>

              <div className="AcceptAdoption-Attachment">
                      <p>Attachment:</p>
                      <div><input type='file' name='attachment' id='file-input' onChange={(e)=>{Setattachment(e.target.files[0])}}/></div>
              </div>

              <div className='AcceptAdoption-button'>
                <button onClick={handleSubmit} disabled={loading}>
                  {loading ? "Submitting....." : "Submit"}
                </button>
              </div>

              
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
