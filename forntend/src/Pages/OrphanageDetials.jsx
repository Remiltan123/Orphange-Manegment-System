import React from 'react';
import "./CSS/OrphanageDetials.css";
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


export const OrphanageDetials = () => {
    const location = useLocation();
    const { Orphanage } = location.state || {};

    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/WantsHomeDisplay');
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
                <h1>Our Work</h1>
                <div className="dash-line"></div>
                <p className='services-intro'>How we transform lives of children with your help</p>
                <div className="services-container">
                    <div>
                        <img src="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRT031ejCyAHWqfDrzCbNiyBdpfPGpEiDIyJywYDNuXXh3Stzva" alt="services" />
                        <h1>Child Safeguarding</h1>
                        <p>We are committed to keep children and young people safe.</p>
                    </div>
                    <div>
                        <img src="https://www.soschildrensvillages.lk/getmedia/83854b6a-ec6a-4a87-b3ce-578773592743/Nuwara-Eliya_2.JPG?width=425" alt="services" />
                        <h1>Family Like Care</h1>
                        <p>Children and young people grow up in a family-like care with complete care, a home and a community.</p>
                    </div>
                    <div>
                        <img src="https://www.soschildrensvillages.lk/getmedia/1d9f848b-7e25-4905-b5a1-615e1978c239/jaffna_1.JPG?width=425" alt="services" />
                        <h1>Family Strengthening</h1>
                        <p>We work to strengthen families, support them and prevent them from breaking up.</p>
                    </div>
                    <div>
                        <img src="https://www.soschildrensvillages.lk/getmedia/b4b88d76-b708-4f4d-8862-d1224213da80/20221102_sri_lanka_anuradhapura_cv_alea_horst8348.jpg?width=768" alt="services" />
                        <h1>Youth Empowerment</h1>
                        <p>We are working to empower our youth for a brighter future.</p>
                    </div>
                </div>
            </div>
            <div className="projects">
                <h1>Our Projects and Programs Impacts</h1>
                <div className="dash-line"></div>
                <div className="projects-container">
                    <div className="projects-container-set">
                        <div className='projecs-imgset'>
                            <img src="https://orphanlifefoundation.org/wp-content/uploads/2023/10/white.png" alt="projects" />
                            <h3>500 Water Filters Distributed to Schools and Communities</h3>
                        </div>
                        <p>Helping remove viruses and bacteria from water which are what cause most water-borne diseases.</p>
                    </div>
                    <div className="projects-container-set">
                        <div className='projecs-imgset'>
                            <img src="https://orphanlifefoundation.org/wp-content/uploads/2023/10/supplies.png" alt="projects" />
                            <h3>More than Rs. 55,000 worth of school supplies donated</h3>
                        </div>
                        <p>Help improve grades, creativity, attitudes towards learning, behavior, peer relationships and self-image.</p>
                    </div>
                    <div className="projects-container-set">
                        <div className='projecs-imgset'>
                            <img src="https://orphanlifefoundation.org/wp-content/uploads/2023/10/clothes.png" alt="projects" />
                            <h3>Over Rs. 12,000 worth of Clothes Issued to Children</h3>
                        </div>
                        <p>Offer not only protection from the elements but also a boost in self- esteem and dignity.</p>
                    </div>
                    <div className="projects-container-set">
                        <div className='projecs-imgset'>
                            <img src="https://orphanlifefoundation.org/wp-content/uploads/2023/10/bicycle.png" alt="projects" />
                            <h3>300 bicycles donated to the children in orphanages</h3>
                        </div>
                        <p>Serve as essential transportation to school and a symbol of hope for new opportunities for orphans.</p>
                    </div>
                </div>
            </div>
            <h1 style={{ textAlign: 'center', fontSize: '50px' }}>About us</h1>
            <div className="dash-line"></div>
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
                        <p>Total Number of children in our House: <span>58</span></p>
                    </div>
                    <div className='info'>
                        <p>Total Number of disabled children: <span>12</span></p>
                    </div>
                </div>
            </div>
        </div>
    );
}