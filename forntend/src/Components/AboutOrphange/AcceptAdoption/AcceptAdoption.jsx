import React from 'react'
import "./AcceptAdoption.css"


export const AcceptAdoption = () => {
  return (
    <>
    <div className='AcceptAdoption-main-container'>
      <div className='AcceptAdoption-container'>
        <div className='AcceptAdoption-heading'>
          <h1>ACCEPT ADOPTION REQUEST</h1>
        </div>

        <div className='AcceptAdoption-body'>
          <div className='AcceptAdoption-table'>
            <table className='tbl'>
              <thead>
                <tr>
                  <th>Apllicant Name</th>
                  <th>Address</th>
                  <th>Contact Number</th>
                  <th>Child Id</th>
                  <th>Child Name</th>
                  <th>Date</th>
                  <th>Sattus</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                 <td>Kajenthiran</td>
                 <td>Achuveli</td>
                 <td>07756784563</td>
                 <td>4</td>
                 <td>Kirisanth</td>
                 <td>2024.04.26</td>
                 <td>Accepted</td>
                </tr>

                <tr>
                 <td>Kajenthiran</td>
                 <td>Achuveli</td>
                 <td>07756784563</td>
                 <td>4</td>
                 <td>Kirisanth</td>
                 <td>2024.04.26</td>
                 <td>Rejected</td>
                </tr>

                <tr>
                 <td>Kajenthiran</td>
                 <td>Achuveli</td>
                 <td>07756784563</td>
                 <td>4</td>
                 <td>Kirisanth</td>
                 <td>2024.04.26</td>
                 <td>Requested</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className='AcceptAdoption-update-details'>
            <tr className='child-registerid'>
              <th >Child register id</th>
              <input type="text" />
            </tr>

            <tr>
                <th>Your Decision</th>
                <select name="" id="">
                    <option value="">Choose</option>
                    <option value="">Accepted</option>
                    <option value="">Rejected</option>
                </select>
            </tr>

            <div className='AcceptAdoption-button'>
              <button>Submit</button>
            </div>
          </div>


        </div>

      </div>
    </div>
    </>
  )
}

