import React from 'react'
import "./CSS/OrphanageDetials.css"
import { useLocation } from 'react-router-dom';

export const OrphanageDetials = () => {
    const location = useLocation();
    const {Orphange  } = location.state || {};

  return (
    <>
       <div className='OrphanageDetials-container'>
            <div><h3>Here you can view about our house</h3></div>
            <div className='AboutOrphages'>
                <div className='Contacts-Us'>
                    <h1>Contacts Us</h1>
                    <div>
                        <p>Address:<span>{Orphange.Oaddress}</span></p>
                        <p></p>
                    </div>
                    <div>
                        <p>Email:<span>{Orphange.Omail}</span></p>
                        <p></p>
                    </div>
                    <div>
                        <p>TP NO:<span>{Orphange.Omoboile_no}</span></p>
                        <p></p>
                    </div>

                </div>

                <div className='Contacts-Us'>
                    <h1>About Chlids</h1>
                    <div>
                        <p>Total Number of chils in our House:<span>28</span></p>
                        <p></p>
                    </div>
                    

                </div>
                 
            </div>
       </div>
    </>
   
  )
}
