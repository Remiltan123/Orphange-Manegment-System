import React from 'react'
import { BrowserRouter, Route, Router } from 'react-router-dom'
import { AdminNavbar } from './Components/AdminNavbar/AdminNavbar'
import { Admin } from './Components/Admin/Admin'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const App = () => {
  return (
    <div>
      <AdminNavbar/>
      <Admin/>
      <ToastContainer/>
    </div>
  )
}
export default App
