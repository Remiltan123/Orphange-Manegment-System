import React from 'react';
import { useParams } from 'react-router-dom';
import "./MoreaboutOnechild.css";
import childs_data from "../../Assets/Data";

const MoreaboutOnechild = () => {
  const { id } = useParams();
  const child = getChildById(id);

  if (!child) {
    return <div>Child not found!</div>;
  }

  return (
    
    <div className='MoreaboutOnechild-mainhead'>
      <div className='mainHeading'>
        <h2>Adopter see all the childs details in orphanage</h2>
      </div>
      <div></div>
      
      <div className='MoreaboutOnechild_details'>
        <div className='MoreaboutOnechild_image'>
          <img src={child.image} alt="" />
        </div>
        <p>Name: {child.name}</p>
        <p>Medical Conditions: {child.medical_conditions}</p>
        <p>Favorite Food: {child.favorite_food}</p>
        <p>Languages Spoken: {child.languages_spoken}</p>
        <p>Hobbies: {child.hobbies}</p>
      </div>
    </div>
  );
};

const getChildById = (id) => {
  for (let orphanage of childs_data) {
    for (let child of orphanage.children) {
      if (child.id.toString() === id) {
        return child;
      }
    }
  }
  return null;
};

export default MoreaboutOnechild;
