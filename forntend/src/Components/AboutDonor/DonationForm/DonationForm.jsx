import React, { useState } from 'react';
import "./DonationForm.css";
import { toast } from 'react-toastify';
import cardImg from "../../../Components/Assets/card_img.png";
import DonetionImg from "../../../Components/Assets/Donetion.png";
import ThankIMG from "../../../Components/Assets/Thank.png";
import { useLocation, useParams } from 'react-router-dom';

export const DonationForm = () => {
  const { token } = useParams();
  const location = useLocation();
  const { request, orphanage } = location.state || {};

  const [amount, setAmount] = useState(2500);
  const [Donetiondetials, Setdetials] = useState({
    Oname: orphanage?.Oname,
    purpose: request?.purpose,
    Re_id:request?.Re_id,
    Do_name: "",
    amount: amount,
    Do_email: "",
    card_No: "",
    CCV: "",
    month: ""
  });
console.log(token)
  const handleChange = (e) => {
    Setdetials({ ...Donetiondetials, [e.target.name]: e.target.value });
  };

  const handleAmountChange = (e) => {
    const value = e.target.value;
    if (value < 2500) {
      setAmount(2500);
    } else {
      setAmount(value);
      Setdetials({...Donetiondetials, amount:value})
    }
  };

  const AddDonation = async (e) => {
    e.preventDefault();  // Prevent the default form submission
    try {
      const response = await fetch(`http://localhost:1010/GiveDonetion/${token}`, {
        method: "post",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(Donetiondetials),
      });

      const data = await response.json();
      if (!data.success) {
        toast.error(data.message)
      } else {
        toast.success(data.message);
      }
    } catch (err) {
      console.error('Error occurred while adding Donation:', err);
      toast.error('Failed Donation. Please try again later.');
    }
  };

  console.log(request)

  return (
    <div className='Donetion-container'>
      <div className="leftbox">
        <div className="leftbox-content">
          <div className="DonetionImg">
            <img src={DonetionImg} alt="Project 3" />
          </div>
          <div className="project">
            <div className="DonationForm-project-details">
              <p>Purpose: {request?.purpose}</p>
              <p>To: {orphanage?.Oname}</p>
              <input
                type="number"
                className="moneyvalue"
                min="2500"
                placeholder={amount}
                onChange={handleAmountChange}
              />
              <div className="donation-type">
                <label>
                  <input type="radio" name="donationType" value="one-time" />
                  One-time
                </label>
                <label>
                  <input type="radio" name="donationType" value="monthly" defaultChecked />
                  Monthly
                </label>
              </div>
            </div>
          </div>
          <div className='Amount-Total'>
            <h3 style={{ opacity: 0.5 }}>Donation Amount :</h3>
            <h3>Rs.{amount}</h3>
          </div>
          <div className="total">
            <h1 className='toatl-1'>Thank You For your</h1>
            <h1 className='total-2'>Donation</h1>
            <img src={ThankIMG} alt="" className='Thankimg' />
            <p style={{ fontWeight: "bold", fontStyle: "italic" }}>From : <span style={{ fontWeight: "bold", fontStyle: "italic" }}>{orphanage?.Oname}</span></p>
          </div>
        </div>
      </div>

      <div className='box'>
        <form onSubmit={AddDonation}>
          <div>
            <h3>You Can Donate Here</h3>
          </div>
          <div className='text1'>
            and we'll send you updates from the organizations about your impact!
          </div>

          <div className='Donetion--image-container'>
            <img src={cardImg} alt='Card Image' />
          </div>

          <div className='text2'>
            Already have an account? <span className="login-link">Log in</span>
          </div>

          <div className='inputbox'>
            <input type="text" placeholder='Full Name' name='Do_name' onChange={handleChange} />
          </div>

          <div className='inputbox'>
            <input type="email" placeholder='Email' name='Do_email' onChange={handleChange} />
          </div>

          <div>
            <label className="checkbox-label">
              <input type="checkbox" />
              Donate anonymously
            </label>

            <div className='inputs'>
              <input type="text" placeholder='Card Number' name="card_No" onChange={handleChange} />
            </div>
            <div className='inputs'>
              <input type="text" placeholder='MM/YY' name='month' onChange={handleChange} />
            </div>
            <div className='inputs'>
              <input type="text" placeholder='Code' name='CCV' onChange={handleChange} />
            </div>
          </div>

          <div>
            <label className="checkbox-label">
              <input type="checkbox" />
              Email me periodic reports from the project I supported.
            </label>
          </div>
          <div>
            <label className="checkbox-label">
              <input type="checkbox" />
              Plus, email me inspiring stories, exclusive promotions, and donation match opportunities to amplify my impact!
            </label>
          </div>

          <div className='captcha-container'>
            <div className='captcha-checkbox'>
              <input type="checkbox" />
              <span>I'm not a robot</span>
            </div>
          </div>

          <div className='submit'>
            <button type="submit">PLEASE ENTER A VALID NAME AND EMAIL ADDRESS</button>
          </div>

          <div className='text2'>
            <i>By making a donation to GlobalGiving, you agree to our </i>
            <span className="link">Terms of Service, Privacy Policy</span>
            <i>, and</i>
            <span className="link"> Nonprofit Support Fee</span>
          </div>
        </form>
      </div>
    </div>
  );
};
