import React from 'react'
import "./ViewChild.css"


export const ViewChild = () => {
  return (
    <>
    <div className='ViewChild-main-container'>
      <div className='ViewChild-container'>
        <div className='ViewChild-heading'>
          <h1>VIEW AND UPDATE CHLID</h1>
        </div>

        <div className='ViewChild-body'>
          <div className='ViewChild-table'>
            <table className='tbl'>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Name</th>
                  <th>Age</th>
                  <th>Gender</th>
                  <th>Admission Date</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                 <td>1</td>
                 <td>Remo</td>
                 <td>7</td>
                 <td>Male</td>
                 <td>2024.04.26</td>
                </tr>
                <tr>
                 <td>2</td>
                 <td>Kalai</td>
                 <td>12</td>
                 <td>Female</td>
                 <td>2024.05.26</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className='update-details'>
            <tr>
              <th>ID</th>
              <input type="text" />
            </tr>

            <tr>
                <th>Name</th>
                <input type="text" />
            </tr>

            <tr>
                <th>Age</th>
                <input type="text" />
            </tr>

              <tr>
                <th>Gender</th>
                <input type="text" />
              </tr>

              <tr>
                <th>Admission Date</th>
                <input type="text" />
              </tr>

            <div className='Viewchild-button'>
              <button>Update</button>
              <button>Remove</button>
            </div>
          </div>


        </div>

      </div>
    </div>
    </>
  )
}
