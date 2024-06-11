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
        from: '',
        attachment: null
    });
    const [state, setState] = useState(true);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmail(prevDetails => ({
            ...prevDetails,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        setEmail(prevDetails => ({
            ...prevDetails,
            attachment: e.target.files[0]
        }));
    };

    const sendEmail = async () => {
        const formData = new FormData();
        formData.append('to', emailDetails.to);
        formData.append('from', emailDetails.from);
        formData.append('subject', emailDetails.subject);
        formData.append('text', emailDetails.text);
        if (emailDetails.attachment) {
            formData.append('attachment', emailDetails.attachment);
        }

        const response = await fetch('http://localhost:1010/Sendmail', {
            method: 'POST',
            body: formData,
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
                            <div className={state ? "div1" : "div2"} onClick={() => { setState(true) }}>Send Mail to subscribers</div>
                            <div className={!state ? "div1" : "div2"} onClick={() => { setState(false) }}>About this page</div>
                        </div>

                        {state && (
                            <div className='otherAboutmail'>
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

                                <div className="Attachment">
                                    <p>Attachment:</p>
                                    <div><input type='file' name='attachment' id='file-input' onChange={handleFileChange} /></div>
                                </div>
                                
                                <button className='ArrentWants-button' onClick={sendEmail}>Send mail</button>
                            </div>
                        )}

                        {!state && (
                            <div className='Aboutpage'>
                                <div>Welcome</div>
                                <p>Here, if you have any urgent needs, you can send them via email with the related document attached.</p>
                                <p>For example, suppose you need blood urgently. You can upload the related details as a PDF within the uploaded image, then you can send it along with other relevant information.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};
