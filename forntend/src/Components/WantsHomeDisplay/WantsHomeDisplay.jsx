import React, { useEffect, useState } from 'react';
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./WantsHomeDisplay.css";


export const WantsHomeDisplay = () => {
  const [Wants, SetWants] = useState([]);
  const [Orphanages, setOrphanages] = useState([]);
  const [displayCount, setDisplayCount] = useState(5);
  const [showFullDescriptions, setShowFullDescriptions] = useState({});
  const navigate = useNavigate();

  const handleClick = (want, orphanage) => {
    navigate("/ArrengtDonetion", { state: { want, orphanage } });
  };

  const fetchOrphanageDetails = async (Wants) => {
    try {
      const orphanageIds = Wants.map(want => want.Or_id);
      const orphanageResponse = await Promise.all(orphanageIds.map(id =>
        fetch(`http://localhost:1010/orphanage/${id}`).then(response => response.json())
      ));
      setOrphanages(orphanageResponse);
    } catch (error) {
      console.error('Error fetching orphanage details:', error);
    }
  };

  const fetchWantsAndOrphanages = async () => {
    try {
      const response = await fetch("http://localhost:1010/GetArgentWants", {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },
      });
      const data = await response.json();
      if (!data.success) {
        toast.error(data.message);
      } else {
        const wants = data.data;
        SetWants(wants);
        fetchOrphanageDetails(wants);
      }
    } catch (error) {
      console.error('Error fetching wants:', error);
    }
  };

  useEffect(() => {
    fetchWantsAndOrphanages();
  }, []);

  const loadMoreWants = () => {
    setDisplayCount(prevCount => prevCount + 5);
  };

  const toggleDescription = (index) => {
    setShowFullDescriptions(prevState => ({
      ...prevState,
      [index]: !prevState[index]
    }));
  };

  const getDescription = (description, index) => {
    if (showFullDescriptions[index]) {
      return (
        <>
          {description}
  
        </>
      );
    }
    const words = description.split(' ');
    const shortDescription = words.slice(0, 30).join(' ');
    return (
      <>
        {shortDescription}{words.length > 30 && '...'}
        {words.length > 30 && <span className="toggle-description" onClick={() => toggleDescription(index)} style={{color:"blue"}}> Show more</span>}
      </>
    );
  };

  return (
    <div className="App1">
      <div className='H1tag'><h1>Arrent Wants of Orphanges.</h1></div>
      <div className='Spantag'><span style={{ opacity: 0.5 }}>Please Help To Them and Make the Good future of Our child</span></div>
      <div className="projects-list">
        {Wants.slice(0, displayCount).map((want, index) => (
          <div key={index} className="project-card">
            <div className="container-image">
              <img src={want.image} alt="Empty field" />
            </div>
            <div className="project-details">
              <h2>{want.purpose}</h2>
              <div className='Detilas-orphange'>
                <h3>{Orphanages[index]?.Oname} <span> | </span> </h3>
                <h3> {Orphanages[index]?.Odistrict} <span> | </span> </h3>
                <h3 style={{ opacity: 0.5 }}> {Orphanages[index]?.Omail} <span> | </span> </h3>
                <h3 style={{ opacity: 0.5 }}> {Orphanages[index]?.Omoboile_no} </h3>
              </div>
              <p>{getDescription(want.description, index)}</p>
              <div className='RGAmount'>
                <p>
                  <strong style={{ opacity: 0.7 }}>Raised:</strong> <span style={{ color: "#ff9900", fontWeight: "bold" }}>${want.Raised_amount.toLocaleString()}</span>
                  <strong style={{ opacity: 0.7 }}> Goal:</strong> <span style={{ fontWeight: "bold", color: "green" }}> ${want.goal_amount.toLocaleString()}</span>
                </p>
              </div>
              <div className='Mainprogress'>
                <div className="progress-bar">
                  <div className="progress" style={{ width: `${(want.Raised_amount / want.goal_amount) * 100}%`, backgroundColor: '#ff9900' }}></div>
                </div>
                <div className="donate-section">
                  <div><p style={{ opacity: 0.5 }}>You Can't Donate below Rs.2500</p></div>
                  <div>
                    <input type="number" placeholder="Rs 2500" />
                    <button onClick={() => handleClick(want, Orphanages[index])}>Donate</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {displayCount < Wants.length && (
        <div className='load-more'>
          <button onClick={loadMoreWants}>LOAD 5 MORE OF {Wants.length}</button>
        </div>
      )}
    </div>
  );
};
