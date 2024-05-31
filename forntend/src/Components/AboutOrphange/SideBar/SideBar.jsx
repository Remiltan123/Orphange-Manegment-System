import React, { useState } from 'react'
import "./SideBar.css"
import {Link} from "react-router-dom"
import { ArrentMailSend } from '../ArrgentMail/ArrentWants'
import { ArgentRequset } from '../ArgentRequset/ArgentRequset'

export const SideBar = () => {
    const[State,SetState]=useState(true)
  return (
    <div className='Admin-sidbar'>
        <div className='Sidebar'>
                <div  onClick={()=>{SetState(true)}} className={State ? 'sidebar-item1' : 'sidebar-item'}
                style={{cursor: 'pointer'}}>
                    <img src="" alt="" />
                    <p style={{cursor:'pointer' , color: State==true ? "red" : "black"}}>Send Mail</p>
                </div>
            
                <div onClick={()=>{SetState(false)}} className={!State ? 'sidebar-item1' : 'sidebar-item'}style={{cursor: 'pointer'}}>
                    <img src="" alt="" />
                    <p style={{cursor:'pointer', color: !State==true ? "red" : "black"}}>SendRequest</p>
                </div>
            
        </div>
        <div className='Arregent'>
            {State && <ArrentMailSend/>}
            {!State && <ArgentRequset/>}
        </div>
    </div>
  )
}
