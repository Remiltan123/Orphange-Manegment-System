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
                                    <li className='options' onClick={() => setSelectedQuestion('Adoption eligibility?')}>Adoption eligibility?</li>
                                    <li className='options' onClick={() => setSelectedQuestion('I am single, can I adopt?')}>I am single, can I adopt?</li>
                                    <li className='options' onClick={() => setSelectedQuestion('What kind of child to adopt?')}>What kind of child to adopt?</li>
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
                                        <p className='chatout'>Once the evaluation is complete, the matching process begins. Authorities work to find a child whose needs align with the adoptive parents' abilities and preferences, prioritizing the child's welfare. Social workers, psychologists, and legal professionals may be involved to ensure the child is placed in a caring and supportive environment.</p>
                                        <p className='chatout'>Once a match is found, legal steps like court hearings and paperwork finalize the adoption, granting the adoptive parents full custody. The child becomes a permanent family member, with post-adoption services available to support a smooth transition and long-term well-being for both the child and the family.</p>
                                        <p className='chatout'>Adoption is a life-changing process that requires careful consideration, emotional commitment, and adherence to legal requirements. It’s not just about providing a home but offering a nurturing, loving environment where the child can grow, thrive, and feel secure.</p>
                                        <p className='chatout'>Need more help? You can click the start over button.</p>
                                    </div>
                                )}
                                {selectedQuestion === 'Adoption eligibility?' && (
                                    <div>
                                        <p className='chatin'>Adoption eligibility?</p>
                                        <p className='chatout'>To adopt, you must be at least 25 years old and meet specific legal requirements. This ensures that the prospective parents are mature and capable of providing a stable home environment for the child.</p>
                                        <p className='chatout'>Financial stability is another crucial factor. Adoption agencies and legal bodies will evaluate your financial situation to ensure you can adequately support a child's needs, including education, healthcare, and general well-being.</p>
                                        <p className='chatout'>Additionally, a thorough background check is conducted, which includes criminal history, home environment, and interviews. These steps ensure the child is placed in a safe and nurturing home where they can thrive.</p>
                                        <p className='chatout'>Adoption laws may vary depending on the country or state, so it's important to consult with legal experts or adoption agencies to understand the specific requirements and processes in your region.</p>
                                        <p className='chatout'>Need more help? You can click the start over button.</p>
                                    </div>
                                )}
                                {selectedQuestion === 'I am single, can I adopt?' && (
                                    <div>
                                        <p className='chatin'>I am single, can I adopt?</p>
                                        <p className='chatout'>Yes, single individuals can adopt if they meet the eligibility criteria. Many countries and adoption agencies allow single applicants to provide a loving home for a child.</p>
                                        <p className='chatout'>As a single adoptive parent, you must demonstrate financial stability, emotional readiness, and the ability to care for the child on your own. The process will involve thorough evaluations, just as it would for a couple, to ensure you can provide the necessary support.</p>
                                        <p className='chatout'>In some cases, adoption laws may have specific guidelines or restrictions for single parents, depending on the child's age or background. It's essential to research the regulations in your region or consult with an adoption agency to understand the specific requirements.</p>
                                        <p className='chatout'>Need more help? You can click the start over button.</p>
                                    </div>
                                )}
                                {selectedQuestion === 'What kind of child to adopt?' && (
                                    <div>
                                        <p className='chatin'>What kind of child to adopt?</p>
                                        <p className='chatout'>Adopt an infant (less than 2 years old):<br></br>OrphanCare operates baby hatches and facilitates adoptions for babies whose birth mothers and parents have chosen adoption.</p>
                                        <p className='chatout'>Adopt an older child (2-18 years old):<br></br>Older children need love, care, attention and family urgently. We urge Malaysians to adopt older children, even a pair of siblings.</p>
                                        <p className='chatout'>Adopt a special needs child:<br></br>Many special needs children would thrive in the care of a loving family. Adopting children with special needs can be incredibly rewarding and fulfilling.</p>
                                        <p className='chatout'>Need more help? You can click the start over button.</p>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Donation */}
                        {options === "Donation" && showDonationQuestions && !selectedQuestion && (
                            <div className='chat-Donation-container'>
                                <p className='chatin'>Donation</p>
                                <p className='chatout'>What would you like to know?</p>
                                <ul className='chat-option'>
                                    <li className='options' onClick={() => setSelectedQuestion('How to donate?')}>How to donate?</li>
                                    <li className='options' onClick={() => setSelectedQuestion('What items are needed?')}>What items are needed?</li>
                                    <li className='options' onClick={() => setSelectedQuestion('Can I donate money?')}>Can I donate money?</li>
                                    <li className='options' onClick={() => setSelectedQuestion('Is my donation tax-deductible?')}>Is my donation tax-deductible?</li>
                                </ul>
                            </div>
                        )}

                        {options === "Donation" && selectedQuestion && (
                            <div className='answer-section'>
                                <p className='chatin'>Donation</p>
                                <p className='chatout'>What would you like to know?</p>
                                {selectedQuestion === 'How to donate?' && (
                                    <div>
                                        <p className='chatin'>How to donate?</p>
                                        <p className='chatout'>You can donate by visiting our donation page, where you’ll find various options for contributing, including one-time or recurring donations. The process is simple and secure, allowing you to make a meaningful impact with ease.</p>
                                        <p className='chatout'>Alternatively, you can contact us directly if you prefer a more personalized approach or have specific questions about how your donation will be used. Our team is happy to assist and provide more information on how you can support our cause.</p>
                                        <p className='chatout'>Every contribution, big or small, makes a difference in helping us achieve our mission. Your generosity allows us to continue providing essential services and support to those in need.</p>
                                        <p className='chatout'>Need more help? You can click the start over button.</p>
                                    </div>
                                )}
                                {selectedQuestion === 'What items are needed?' && (
                                    <div>
                                        <p className='chatin'>What items are needed?</p>
                                        <p className='chatout'>We are in need of clothing, school supplies, and hygiene products for the children. These essential items help ensure their well-being, comfort, and ability to focus on their education.</p>
                                        <p className='chatout'>Donating clothing of various sizes ensures that the children have proper attire for daily activities and school. New or gently used items are welcome.</p>
                                        <p className='chatout'>School supplies, such as notebooks, pens, and backpacks, are critical in supporting their educational journey. Your contributions help create a more engaging and productive learning environment.</p>
                                        <p className='chatout'>Hygiene products like soap, toothpaste, and shampoo are vital for maintaining the children’s health and self-confidence. Providing these essentials helps them thrive in a clean, supportive environment.</p>
                                        <p className='chatout'>Need more help? You can click the start over button.</p>
                                    </div>
                                )}
                                {selectedQuestion === 'Can I donate money?' && (
                                    <div>
                                        <p className='chatin'>Can I donate money?</p>
                                        <p className='chatout'>Yes, monetary donations are accepted through our secure payment portal. These contributions provide us with the flexibility to address immediate and ongoing needs, ensuring that the children receive the best possible care.</p>
                                        <p className='chatout'>Your financial support helps fund essential services, such as education, healthcare, and nutritious meals for the children. It also allows us to purchase items like clothing, school supplies, and hygiene products as needed.</p>
                                        <p className='chatout'>By donating money, you can make a direct and meaningful impact on the lives of the children we support. Every donation, no matter the amount, helps us continue our mission of providing a safe and nurturing environment.</p>
                                        <p className='chatout'>Need more help? You can click the start over button.</p>
                                    </div>
                                )}
                                {selectedQuestion === 'Is my donation tax-deductible?' && (
                                    <div>
                                        <p className='chatin'>Is my donation tax-deductible?</p>
                                        <p className='chatout'>Yes, your donation may be tax-deductible, depending on the organization's status and the laws in your country. Most nonprofit organizations are recognized as tax-exempt under IRS regulations, meaning that contributions made to them can qualify for tax deductions.</p>
                                        <p className='chatout'>After making your donation, you will typically receive a receipt or acknowledgment letter. Keep this documentation for your records, as it will be necessary when filing your taxes to claim the deduction.</p>
                                        <p className='chatout'>If you have specific questions about the tax implications of your donation, consider consulting with a tax professional. They can provide personalized advice based on your financial situation and local tax laws.</p>
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
