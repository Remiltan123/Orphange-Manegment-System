import React, { useState, useEffect } from 'react';
import './HomeDisplay.css';
import left_arrow from '../Assets/left_arrow.png';
import right_arrow from '../Assets/r1.png';
import cannel from "../Assets/cannel_icon.png"
import {toast} from 'react-toastify'

export const HomeDispaly = ({ slides }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showsub, setShowsub] = useState(false); // Initially hidden
  const [email, setEmail] = useState('');

  const handleClick = (e) => {
    setEmail(e.target.value);
  };

  const sendEmail = async () => {
    const response = await fetch('http://localhost:1010/AddSubscripe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });
    const data = await response.json();
    if (!data.success) {
      toast.error(data.message);
    } else {
      toast.success(data.message);
    }
    setShowsub(!showsub);
  };

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  useEffect(() => {
    const interval = setInterval(goToNext, 2000); // Change slide every 3 seconds
    return () => clearInterval(interval); // Cleanup on unmount
  }, [currentIndex]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowsub(true);
    }, 4000); // Show the subscription header after 4 seconds
    return () => clearTimeout(timer); // Cleanup on unmount
  }, []);

  return (
    <>
      <div className='image-container'>
        <div style={{ backgroundImage: `url(${slides[currentIndex].url})` }} className='slideimage'>
          <div><img src={left_arrow} alt="" onClick={goToPrevious} /></div>
          <div><img src={right_arrow} alt="" onClick={goToNext} /></div>
        </div>

        {showsub && (
          <div className='subcripeheader'>
            <div className='closeicon' onClick={() => setShowsub(false)}>
              <img src={cannel} alt="" />
            </div>
            <div className='Newsletter'>
              <div className='Newsletter1'><p>SUBSCRIBE TO OUR </p></div>
              <div className='Newsletter2'><p>NEWSLETTER</p></div>
            </div>

            <div className='update'>
              <div className='update1'><p>GET THE ARGENT WANTS OF</p></div>
              <div className='update2'><p>ORPHANAGE</p></div>
            </div>

            <div className="email">
              <div><p>Enter your email to join</p></div>
            </div>

            <div className='inpueemail'>
              <div>
                <input type="text" name="email" onChange={handleClick} />
                <button onClick={sendEmail}>Subscribe</button>
              </div>
            </div>
          </div>
        )}

      </div>
    </>
  );
};
