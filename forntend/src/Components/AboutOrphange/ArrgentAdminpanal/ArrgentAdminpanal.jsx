import React from 'react'
import { OrphanageNavbar } from '../../Navbars/OrpanageNavbar/OrphanageNavbar'
import { useParams } from 'react-router-dom';
import { SideBar } from '../SideBar/SideBar';

export const ArrgentAdminpanal = () => {
    const {token} = useParams()
  return (
    <div>
        <OrphanageNavbar token={token}/>
        <SideBar/>
    </div>
  )
}
