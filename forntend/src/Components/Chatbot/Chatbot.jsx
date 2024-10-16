import React, { useState, useEffect, useRef } from 'react';
import './Chatbot.css';
import { MdOutlineModeComment } from "react-icons/md";
import { IoClose } from "react-icons/io5";

export const Chatbot = () => {
    const [options, SetOptions] = useState("");
    const [showAdoptionQuestions, setShowAdoptionQuestions] = useState(false);
    const [showDonationQuestions, setShowDonationQuestions] = useState(false);
    const [selectedQuestion, setSelectedQuestion] = useState(null);
    const [showStartOver, setShowStartOver] = useState(false);
    const [chatbotcontainer, setchatbotcontainer] = useState(false);
    const chatBodyRef = useRef(null);

    const handleOptionSelection = (option) => {
        if (option === 'Adoption') {
            SetOptions("Adoption");
            setShowAdoptionQuestions(true);
            setShowDonationQuestions(false);
            setShowStartOver(true);
        }

        if (option === 'Donation') {
            SetOptions("Donation");
            setShowAdoptionQuestions(false);
            setShowDonationQuestions(true);
            setShowStartOver(true);
        }
    };

    const handleStartOver = () => {
        SetOptions("");
        setShowAdoptionQuestions(false);
        setShowDonationQuestions(false);
        setSelectedQuestion(null);
        setShowStartOver(false);
    };

    useEffect(() => {
        if (chatBodyRef.current) {
            chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
        }
    }, [options, selectedQuestion]);

    return (
        <div>
            <div className='chatbot-toggler'>
                {!chatbotcontainer && <span className="chatbot-label" onClick={() => { setchatbotcontainer(!chatbotcontainer) }}>Chatbot</span>}
                {!chatbotcontainer ?
                    <MdOutlineModeComment className='chaticonopen' onClick={() => { setchatbotcontainer(!chatbotcontainer) }} />
                    : <IoClose className='chaticonclose' onClick={() => { setchatbotcontainer(!chatbotcontainer) }} />}
            </div>

            {chatbotcontainer &&
                <div className='Chatbot-container'>
                    <div className='head-container'>
                        <h2>Chatbot</h2>
                    </div>

                    <div className='body-container' ref={chatBodyRef}>
                        {!options && (
                            <div className='chat-option-container'>
                                <p className='chatout'>Hey there 👋 <br></br> Welcome to Orphanage Management System.</p>
                                <p className='chatout'>How can I help you today?</p>
                                <ul className='chat-option'>
                                    <li className='options' onClick={() => handleOptionSelection('Adoption')}>Adoption</li>
                                    <li className='options' onClick={() => handleOptionSelection('Donation')}>Donation</li>
                                </ul>
                            </div>
                        )}

                        {/* Adoption */}
                        {options === "Adoption" && showAdoptionQuestions && !selectedQuestion && (
                            <div className='chat-Adoption-container'>
                                <p className='chatin'>Adoption</p>
                                <p className='chatout'>What would you like to know?</p>
                                <ul className='chat-option'>
                                    <li className='options' onClick={() => setSelectedQuestion('How to adopt?')}>How to adopt?</li>
                                </ul>
                            </div>
                        )}

                        {options === "Adoption" && selectedQuestion && (
                            <div className='answer-section'>
                                <p className='chatin'>Adoption</p>
                                <p className='chatout'>What would you like to know?</p>
                                {selectedQuestion === 'How to adopt?' && (
                                    <div>
                                        <p className='chatin'>How to adopt?</p>
                                        <p className='chatout'>You can adopt by following legal procedures designed to ensure the child's safety and well-being. The process begins with prospective parents submitting an application to the relevant adoption agency or government body, providing personal, financial, and background details. A thorough evaluation, including home studies and interviews, assesses the applicants' readiness to provide a stable, loving home.</p>
                                        <p className='chatout'>Need more help? You can click the start over button.</p>
                                    </div>
                                )}
                                
                            </div>
                        )}
                       


                    </div>

                    <div className="chat-input">
                        <p>Hit the buttons to Respond...</p>
                    </div>

                    {showStartOver && (
                        <div>
                            <button className='Start-over' onClick={handleStartOver}>Start Over</button>
                        </div>
                    )}
                </div>
            }
        </div>
    );
};
