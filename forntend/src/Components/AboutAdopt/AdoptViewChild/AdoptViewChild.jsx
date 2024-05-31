import React from 'react';
import { Link } from 'react-router-dom';
import "./AdoptViewChild.css";
import childs_data from "../../Assets/Data";

const AdoptViewChild = () => {
  return (
    <div className='AdoptViewChild-maincontainer'>
      <div className='mainHeading'>
        <h2>Adopter see all the childs details in orphanage</h2>
      </div>
      <div className='perticularChild'>
        {renderChildren()}
      </div>
    </div>
  );
};

const renderChildren = () => {
  return childs_data.map((orphanage, orphanageIndex) => {
    return (
      <div key={orphanageIndex} className='renderChildren'>
        <div className='orphanage_name'>
          <hr />
          <h2>ORPHANAGE NAME: <span>{orphanage.orphanageName}</span> </h2>
          <hr />
        </div>
        <div className='main_hild_image_galary'>
          {orphanage.children.map((child, childIndex) => (
            <div key={childIndex} className='child_image_galary'>
              <div className='child_image'>
                <img src={child.image} alt={child.name} />
              </div>
              <div className='child_detials'>
                <div className='child_heading'>
                  <p>Name</p>
                  <p>ID</p>
                  <p>Age</p>
                  <p>Gender</p>
                </div>
                <div className='child_heading_detail'>
                  <p>{child.name}</p>
                  <p>{child.id}</p>
                  <p>{child.age}</p>
                  <p>{child.gender}</p>
                </div>
              </div>
              <div className='seemore'>
                <Link to={`/Viewchild/${child.id}`} className='see-more-link' style={{textDecoration:"none", color:"red"}}>See more...</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  });
};

export default AdoptViewChild;
