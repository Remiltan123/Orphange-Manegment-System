import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import "./AdoptViewChild.css";
import { toast } from "react-toastify";
import childBoy from "../../Assets/ChildBoy.png";
import childGirl from "../../Assets/childGirl.png";
import child15girl from "../../Assets/child15girl.png";
import child15boy from "../../Assets/child15boy.png";
import DisableBoy from "../../Assets/DisableBoy.png";
import disableGirl from "../../Assets/disableGirl.png";
import { DetailsContext } from '../../../Context/OrphangeContext';
import { AdoptBox } from '../Adoptbox/AdoptBox';

const AdoptViewChild = () => {
  const [OrphanChilds, SetGroupChilds] = useState([]);
  const [show, SetShow] = useState(false);
  const [childDetails, SetchildDetil] = useState({});
  
  const { setDetails } = useContext(DetailsContext);
  const navigate = useNavigate();
  const { token } = useParams();

  const SendDetails = (orphange, childNo) => {
    setDetails({ Orphange: orphange, ChildNo: childNo });
    navigate(`/Adopter/vieworphange/${token}`);
  }

  const SendBoxDetials = (name, age, ID,Available) => {
    SetchildDetil({ Name: name, Age: age, ID:ID ,Available:Available});
    SetShow(true);
    
  }

  const GroupChilds = async () => {
    const response = await fetch('http://localhost:1010/GroupChild', {
      method: "GET",
      headers: {
        "Content-Type": 'application/json'
      },
    });

    const data = await response.json();
    if (!data.success) {
      toast.error(data.message);
    } else {
      SetGroupChilds(data.Data);
    }
  }

  

  useEffect(() => {
    GroupChilds();
  }, [show]);

  

  const renderChildren = (childs_data) => {

    const getChildImage = (child) => {
      if (child.Specialneed === "NO") {
        if (child.Gender === "Male" && child.Age > 2 && child.Age <= 18) {
          return <img src={child15boy} alt={child.name} />;
        } else if (child.Gender === "Female" && child.Age > 2 && child.Age <= 18) {
          return <img src={child15girl} alt={child.name} />;
        } else if (child.Gender === "Male" && child.Age <= 2) {
          return <img src={childBoy} alt={child.name} />;
        } else if (child.Gender === "Female" && child.Age <= 2) {
          return <img src={childGirl} alt={child.name} />;
        }
      } else {
        if (child.Specialneed === "YES" && child.Gender === "Male") {
          return <img src={DisableBoy} alt={child.name} />;
        } else {
          return <img src={disableGirl} alt={child.name} />;
        }
      }
      return null; // Default case when none of the conditions match
    };

    const RenderCategory = (title, children) => {
      return (
        <div>
          <div className='Category-child'><h3>{title}</h3></div>
          <div className='main_child_image_gallery'>
            {children.length > 0 ? (
              children.map((child, childIndex) => (
                <div key={childIndex} className='child_image_gallery'>
                  <div className='child_image'>
                    {getChildImage(child)}
                  </div>
                  <div className='child_detials'>
                    <div className='child_heading'>
                      <p>Name</p>
                      <p>ID</p>
                      <p>Age</p>
                      <p>Gender</p>
                      <p>Diseases</p>
                      <p>Status</p>
                    </div>
                    <div className='child_heading_detail'>
                      <p>{child.Name}</p>
                      <p>{child.id}</p>
                      <p>{child.Age}</p>
                      <p>{child.Gender}</p>
                      <p>{child.Diaseases}</p>
                      { child.Available ? <p style={{color:'green'}}>Not Booked</p> : <p style={{color:'green'}}>Booked</p> }
                    </div>
                  </div>
                  <button className='Child-adopt-button' onClick={() => { SendBoxDetials(child.Name, child.Age,child.id,child.Available) }}>ADOPT</button>
                </div>
              ))
            ) : (
              <p>No children available in this category.</p>
            )}
          </div>
        </div>
      )
    };

    return childs_data.map((orphanage, orphanageIndex) => {
      const infantChildren = orphanage.children.filter(child => child.Age <= 2 && child.Specialneed === "NO");
      const oldchildren = orphanage.children.filter(child => child.Age > 2 && child.Specialneed === "NO");
      const specialchild = orphanage.children.filter(child => child.Specialneed === "YES");
      return (
        <>
          <div key={orphanageIndex} className='renderChildren'>
            <div className='orphanage_name'>
              {orphanage.children.length > 0 ? 
                <>
                  <hr /> 
                  <h2>ORPHANAGE NAME: <span onClick={() => { SendDetails(orphanage, orphanage.children.length) }}>{orphanage.Oname} ........ </span> </h2>
                  <hr />
                  {RenderCategory("Adopt an Infant Child (Age Less Than 2 years)", infantChildren)}
                  {RenderCategory("Adopt an Older Child", oldchildren)}
                  {RenderCategory("Adopt a Special Need Child", specialchild)}
                </>
                : <></>
              }
            </div>
          </div>
        </>
      );
    });
  };

  return (
    <>
    {show && <AdoptBox childDetails={childDetails} SetShow={SetShow} GroupChilds ={GroupChilds }/>}
    <div className={show ? "opacity-AdoptViewChild-maincontainer" : 'AdoptViewChild-maincontainer' }>

      <div className='mainHeading'>
        <h2>ADOPTER SEE ALL THE CHILDS DETAILS IN ORPHANAGES </h2>
      </div>
      <div className='perticularChild'>
        {renderChildren(OrphanChilds)}
      </div>
    </div>
    </>
  );
};

export default AdoptViewChild;
