import React from 'react';
import "./CSS/OrphanageDetials.css";
import { useLocation } from 'react-router-dom';

export const OrphanageDetials = () => {
    const location = useLocation();
    const { Orphanage } = location.state || {};

    return (
        <div className='orphanage-details-container'>
            <div className='header'>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDgbMZxE9T2B-Hqp9W2GWQaNTc-yT5dA4B8w&s" alt="Orphanage" className="orphanage-image" />
                <h3>Here you can view about our house</h3>
            </div>
            <div className='about-orphanage'>
                <div className='contact-us'>
                    <h1>Contact Us</h1>
                    <div className='info'>
                        <p>Address: <span>{Orphanage?.Oaddress}</span></p>
                    </div>
                    <div className='info'>
                        <p>Email: <span>{Orphanage?.Omail}</span></p>
                    </div>
                    <div className='info'>
                        <p>TP NO: <span>{Orphanage?.Omoboile_no}</span></p>
                    </div>
                </div>
                <div className='about-children'>
                    <h1>About Children</h1>
                    <div className='info'>
                        <p>Total Number of children in our House: <span>28</span></p>
                    </div>
                </div>
            </div>
        </div>
    );
}