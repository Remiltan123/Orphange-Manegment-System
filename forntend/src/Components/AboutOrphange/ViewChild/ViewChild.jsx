import React, { useEffect, useState } from 'react';
import "./ViewChild.css";
import { OrphanageNavbar } from '../../Navbars/OrpanageNavbar/OrphanageNavbar';
import { useParams } from 'react-router-dom';
import { toast } from "react-toastify";

export const ViewChild = () => {
  const { token } = useParams();
  const [Children, SetChildren] = useState([]);
  const [selectedChild, setSelectedChild] = useState(null);

  const getChild = async () => {
    const response = await fetch(`http://localhost:1010/GetChild/${token}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });
    const data = await response.json();
    if (!data.success) {
      toast.error(data.message);
    } else {
      SetChildren(data.Data);
    }
  };

  useEffect(() => {
    getChild();
  }, []);

  const handleRowClick = (child) => {
    setSelectedChild(child);
  };

  return (
    <>
      <OrphanageNavbar token={token} />
      <div className='ViewChild-main-container'>
        <div className='ViewChild-container'>
          <div className='ViewChild-heading'>
            <h1>VIEW AND UPDATE CHILD</h1>
          </div>

          <div className='ViewChild-body'>
            <div className='ViewChild-table'>
              <table className='tbl'>
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Age</th>
                    <th>Gender</th>
                    <th>Diaseases</th>
                    <th>Special need</th>
                  </tr>
                </thead>

                <tbody>
                  {Children.map((child, index) => {
                    return (
                      <tr key={index} onClick={() => handleRowClick(child)} className={selectedChild && selectedChild.id === child.id ? 'selected' : ''}>
                        <td>{child.id}</td>
                        <td>{child.Name}</td>
                        <td>{child.Age}</td>
                        <td>{child.Gender}</td>
                        <td>{child.Diaseases}</td>
                        <td>{child.Specialneed}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {selectedChild && <UpdateFunction child={selectedChild} getChild={getChild}/>}
          </div>
        </div>
      </div>
    </>
  );
};

const UpdateFunction = ({ child ,getChild}) => {
  const [updatedChild, setUpdatedChild] = useState({ ...child });  

  useEffect(() => {
    setUpdatedChild({ ...child });
  }, [child]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedChild(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleUpdate = async () => {
    const response = await fetch("http://localhost:1010/UpdateChild", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({id:updatedChild.id})
    });

    const resdata = await response.json();
    if (!resdata.success) {
      toast.error(resdata.message);
    } else {
      toast.success(resdata.message);
    }
  };
  
  const handleRemove = async () => {
    try {
      const response = await fetch("http://localhost:1010/RemoveChild", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ id: updatedChild.id }) 
      });
  
      const resdata = await response.json();
      if (!resdata.success) {
        toast.error(resdata.message);
      } else {
        toast.success(resdata.message);
        getChild();
      }
    } catch (error) {
      console.error('Error removing child:', error);
    }
  };

 

  return (
    <>
      <div className='update-details'>
        <tr>
          <th>ID</th>
          <input type="text" name="id" value={updatedChild.id} onChange={handleChange} readOnly />
        </tr>

        <tr>
          <th>Name</th>
          <input type="text" name="Name" value={updatedChild.Name} onChange={handleChange} />
        </tr>

        <tr>
          <th>Age</th>
          <input type="text" name="Age" value={updatedChild.Age} onChange={handleChange} />
        </tr>

        <tr>
          <th>Gender</th>
          <input type="text" name="Gender" value={updatedChild.Gender} onChange={handleChange} />
        </tr>

        <tr>
          <th>Diaseases</th>
          <input type="text" name="Diaseases" value={updatedChild.Diaseases} onChange={handleChange} />
        </tr>

        <tr>
          <th>Special need</th>
          <input type="text" name="Specialneed" value={updatedChild.Specialneed} onChange={handleChange} />
        </tr>

        <div className='Viewchild-button'>
          <button onClick={handleUpdate}>Update</button>
          <button onClick={handleRemove}>Remove</button>
        </div>
      </div>
    </>
  );
};
