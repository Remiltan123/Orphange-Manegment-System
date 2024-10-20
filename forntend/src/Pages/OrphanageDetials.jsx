import React from 'react';
import "./CSS/OrphanageDetials.css";
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


export const OrphanageDetials = () => {
    const location = useLocation();
    const { Orphanage } = location.state || {};

    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/ArrengtDonetion');
    };


    return (
        <div className='orphanage-details-container'>
            <div className='header'>
                <img src="https://live.staticflickr.com/8100/8526288589_7fd10e724f_b.jpg" alt="Orphanage-house" className="orphanage-image" />
            </div>
            <div className='intro-details'>
                <h1>Each day, an estimated 734 children
                    <br />
                    become orphans</h1>
                <div className="dash-line"></div>
                <p>With the help of our charity program for orphans, we have developed a number of orphanages, infant adoption centers, and schools in underserved parts of Sri Lanka with proper learning resources and tools. </p>
                <p>Help us donate to orphans and improve their living situations.</p>
            </div>
            <div className='donate-button'>
                {/* not work */}
                <button onClick={handleClick}>Donate</button>
            </div>
            <div className="donation-help">
                <h1>How Your Donation Helps Children</h1>
                <div className="orphanage-container">
                    <div>
                        <img src="https://www.soschildrensvillages.lk/getmedia/84d0d4ab-17e9-4fd0-b903-6f062d78f155/Family-Strengthening.png?width=1920" alt="Orphanage" />
                        <h3>Prevention</h3>
                        <p>Keeping families together and preventing child-family sepration.</p>
                    </div>
                    <div>
                        <img src="https://www.soschildrensvillages.lk/getmedia/01384251-f8e4-4597-8a61-71bd648f8766/Alternative-Care-2.png?width=1920" alt="Orphanage" />
                        <h3>Protection</h3>
                        <p>Ensuring care and protection when there is no family or it is not in a child's best interest to stay in the family.</p>
                    </div>
                    <div>
                        <img src="https://www.soschildrensvillages.lk/getmedia/b5363a64-6bc0-4c9f-a494-594aefe8449c/Advocacy.png?width=1920" alt="Orphanage" />
                        <h3>Advocacy</h3>
                        <p>Changing policy and practise to improve the situation of children without parental care or at a risk of losing it.</p>
                    </div>
                </div>
            </div>
            <div className="services">
                <h2>Our Work</h2>
                <p>How we transform lives of children with your help</p>
                <div className="services-container">
                    <div>
                        
                    </div>
                </div>
            </div>
            <div className='about-orphanage'>
                <h3>Here you can view about our house</h3>
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