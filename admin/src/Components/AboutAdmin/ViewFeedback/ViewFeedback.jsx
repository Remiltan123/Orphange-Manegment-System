import React from 'react'
import "./ViewFeedback.css"

export const ViewFeedback = () => {
  return (
    <>
    <div className=' Admin-ViewFeedback-container'>
        <div className='Admin-ViewFeedback-sub-container'>
          <div className='Admin-ViewFeedback-heading'><h1>VIEW ALL FEEDBACK</h1></div>
          <table className='Admin-ViewFeedback-table-Details'>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Orphanage Name</th>
                  <th>Given By</th>
                  <th>Mail</th>
                  <th>Feedback</th>
   
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>1</td>
                  <td>Remi home</td>
                  <td >Deepa</td>
                  <td>Deepa2002@gmail.com.</td>
                  <td >feedback about donor write</td>
                </tr>

                <tr>
                  <td>2</td>
                  <td>kaje home</td>
                  <td >Deepa</td>
                  <td>Deepa2002@gmail.com.</td>
                  <td >feedback about donor write</td>
                </tr>
              </tbody>
          </table>
          
        </div>
      </div>
    </>
  )
}

  
