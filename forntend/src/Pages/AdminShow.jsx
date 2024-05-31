import React from 'react'
import { AdminNavbar } from '../Components/Navbars/AdminNavbar/AdminNavbar'
import p3_img from "../Components/Assets/im3.png"

export const AdminShow = () => {
   
  return (
    <div>
        <AdminNavbar/>
        <div >
          <img src={p3_img} alt="" style={{ height: "100%",width:'100%' }}/>
        </div>
    </div>
  )
}

