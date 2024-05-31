import React from 'react'
import "./ViewDonorDetails.css"

export const ViewDonorDetails = () => {
  return (
    <>
    <div className=' Admin-ViewDonor-container'>
        <div className='Admin-ViewDonor-sub-container'>
          <div className='Admin-ViewDonor-heading'><h1>VIEW ALL DONOR</h1></div>
          <table className='Admin-ViewDonor-table-Details'>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Donor Name</th>
                  <th>Orphanage Name</th>
                  <th>Mail Id</th>
                  <th>Purpose</th>
   
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>1</td>
                  <td >Deepa</td>
                  <td>Remi home</td>
                  <td>Deepa2002@gmail.com.</td>
                  <td >Education</td>
                </tr>

                <tr>
                  <td>1</td>
                  <td >Test</td>
                  <td>kaje home</td>
                  <td>test2002@gmail.com</td>
                  <td>Food</td>
                </tr>
              </tbody>
          </table>
          
        </div>
      </div>
    </>
  )
}
