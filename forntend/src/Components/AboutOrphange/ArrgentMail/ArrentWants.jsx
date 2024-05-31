import React, { useEffect, useState } from 'react';
import './ArrentWants.css';
import { OrphanageNavbar } from '../../Navbars/OrpanageNavbar/OrphanageNavbar';
import { useParams } from 'react-router-dom';
import upload_image from '../../Assets/upload_area.svg';
import { toast } from 'react-toastify';

export const ArrentMailSend = () => {
    const { id } = useParams();
    const [emailDetails, setEmail] = useState({
        to: '',
        subject: '',
        text: '',
        from: ''
    });
    const[state,Setstate]=useState(true)

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmail(prevDetails => ({
            ...prevDetails,
            [name]: value
        }));
    };

    const sendEmail = async () => {
        const response = await fetch('http://localhost:1010/Sendmail', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(emailDetails),
        });
        const data = await response.json();
        if (data.success) {
            toast.success(data.message);
        } else {
            toast.error(data.message);
        }
    };

    useEffect(() => {
        const fetchEmail = async () => {
            const response = await fetch('http://localhost:1010/FeachEmail');
            const data = await response.json();
            if (!data.success) {
                toast.error(data.message);
            } else {
                const validEmails = [...new Set(data.emails
                    .map(emailObj => emailObj.email))]
                    .join(',');

                setEmail(prevDetails => ({
                    ...prevDetails,
                    to: validEmails
                }));
            }
        };
        fetchEmail();
    }, [id]);

    console.log(emailDetails.to);

    return (
        <>
                <div className='ArrentWants-main-container'>
                    <div className='ArrentWants-container'>
                        <div className='ArrentWants-container-body'>

                            <div className='Striteline'>
                                <div className={state == true ? "div1" : "div2"} onClick={()=>{Setstate(true)}}>Send Mail to subdcripers</div>
                                <div className={!state == true ? "div1" : "div2"} onClick={()=>{Setstate(false)}}>About this page</div>
                            </div>
                           
                            {state && (<div className='otherAboutmail'>
                                <div>
                                    <label htmlFor='to'>To:</label>
                                    <input type="text" onChange={handleChange} name='to' value={emailDetails.to} />
                                </div>
                                
                                <div>
                                    <label htmlFor='from'>From:</label>
                                    <input type="text" onChange={handleChange} name='from' value={emailDetails.from} />
                                </div>
                            
                                <div>
                                    <label htmlFor='subject'>Subject:</label>
                                    <input type="text" onChange={handleChange} name='subject' value={emailDetails.subject} />
                                </div>
                                <div>
                                    <label htmlFor='text'>Text:</label>
                                    <textarea name="text" onChange={handleChange} value={emailDetails.text}></textarea>
                                </div>

                                <div className='attachment'>
                                    <p>Attach if you have any details</p>
                                    <label htmlFor='file-input'>
                                        <img src={upload_image} alt='' className='upload_image' />
                                    </label>
                                    <input type='file' name='image' id='file-input' hidden />
                                </div>
                                <button className='ArrentWants-button' onClick={sendEmail}>Send mail</button>
                            </div>)}

                            {!state && (
                                <div className='Aboutpage'>
                                    <div>Well come</div>
                                    <p>Here If you Have any arggent wants you can sent with email using attach the related document </p>
                                    <p>For example suppose your want to blood emmergence then tou have to upload related detilas like pdf upload within the uploaded image the you can sent and sup...you want ...acc </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
        </>
    );
};
