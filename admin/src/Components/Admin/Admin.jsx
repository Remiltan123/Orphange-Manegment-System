import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { AddOrphanage } from '../AboutAdmin/AddOrphanage/AddOrphanage'
import { AdminHome } from '../AboutAdmin/AdminHome/AdminHome'
import { ManageOrphanage } from '../AboutAdmin/ManageOrphanage/ManageOrphanage'
import { ViewDonorDetails } from '../AboutAdmin/ViewDonorDetails/ViewDonorDetails'
import { ViewFeedback } from '../AboutAdmin/ViewFeedback/ViewFeedback'
import { UpdateOrphanage } from '../AboutAdmin/UpdateOrphange/UpdateOrphanage'




export const Admin = () => {
  return (
    <>
    <Routes>
        <Route path='/' element={<> <AdminHome/></>} />
        <Route path='/Admin/AddOrphange' element={<> <AddOrphanage/></>} />
        <Route path='/Admin/ManageOrphanage' element={<> <ManageOrphanage/></>} />
        <Route path='/Admin/ViewDonorDetails' element={<> <ViewDonorDetails/></>} />
        <Route path='/Admin/ViewFeedback' element={<> <ViewFeedback/></>} />
        <Route path='/updateOrphanage/:id' element={<><UpdateOrphanage/></>} />
        
    </Routes>
    </>
  )
}
