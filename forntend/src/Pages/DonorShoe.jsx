import React from 'react'
import { DonorNavbar } from '../Components/Navbars/DonarNavbar/DonorNavbar'
import p3_img from "../Components/Assets/im3.png"

export const DonorShoe = () => {
  return (
    <div>
        <DonorNavbar/>
        <div >
          <img src={p3_img} alt="" style={{ height: "100%",width:'100%' }}/>
        </div>
    </div>
  )
}
