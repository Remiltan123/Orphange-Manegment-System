import React, { useState } from 'react';
import "./CSS/AdoptionShow.css";
import adoptType from "../Components/Assets/AdoptType.png";
import motherimg from "../Components/Assets/Mother.png"
import { useParams,useNavigate } from 'react-router-dom';

export const AdoptionShow = () => {
  const [activeStep, setActiveStep] = useState(null);
  const {token} = useParams();
  const navigate = useNavigate()

  const toggleAnswer = (step) => {
    setActiveStep(activeStep === step ? null : step);
  };

  const ClickHandle = ()=>{
    navigate(`/Adobt/ViewChild/${token}`)
  }

  return (
    <div className='AdoptionShow-Header'>
      <img src={adoptType} alt="" className='adoptType-image' />
      <div onClick={()=>{ClickHandle()}} className='Child-view-div'>
          To View Childs
      </div>
      <div className='AdoptionShow-Header-FDA'>
        <h1>Steps to adopt a child</h1>
        <div className='FDA-p'>
          <p>
            Are you thinking of adopting a child in Sri Lanka? There are a few steps to follow through but worry not; the adoption process is straightforward and not as complicated as you may think.
          </p>
          <p>
            Adopting a child can be an enormously enriching experience and Orphancare invites families from all ethnic groups and backgrounds.
          </p>
          <p style={{ color: "black", fontWeight: 'bold' }}>
            When we will take the interview for your. Do you have answer for below steps question And you have below abilities, then you can adopt. To view the adopt child click below <span style={{ color: "red" }}>View Child </span> button.
          </p>

          <div className='Step-1'>
            <div onClick={() => toggleAnswer(1)} className='step-header'>
              <h2>
                Step 1: Is adoption suitable for you?
              </h2>
            </div>
            {activeStep === 1 && (
              <div className='answer-div'>
                <p>Here are a few questions to ask if adoption is suitable for you:</p>
                <ul>
                  <li>Why do you want to adopt?</li>
                  <li>Can you prioritise your child’s needs?</li>
                  <li>Do you have a place for him/her in your home?</li>
                  <li>Are you prepared to help her/him get over physical and emotional trauma?</li>
                  <li>Can you provide financial security for the child?</li>
                  <li>Do you have people to go to for advice, help and support?</li>
                </ul>
                <p>Suppose you have confidently answered all these questions positively, great!</p>
              </div>
            )}
          </div>

          <div className='Step-1'>
            <div onClick={() => toggleAnswer(2)} className='step-header'>
              <h2>
                Step 2: Are you looking to adopt a baby, an older child or a special needs child?
              </h2>
            </div>
            {activeStep === 2 && (
              <div className='answer-div-2'>
                <div>
                  <h3>Adopt an infant (less than 2 years old)</h3>
                  <p>OrphanCare operates baby hatches and facilitates adoptions for babies whose birth mothers and parents have chosen adoption.</p>
                </div>
                <div>
                  <h3>Adopt an older child (2-18 years old)</h3>
                  <p>Older children need love, care, attention and family urgently. We urge Malaysians to adopt older children, even a pair of siblings.</p>
                </div>
                <div>
                  <h3>Adopt a special needs child</h3>
                  <p>Many special needs children would thrive in the care of a loving family. Adopting children with special needs can be incredibly rewarding and fulfilling.</p>
                </div>
              </div>
            )}
          </div>

          <div className='Step-1'>
            <div onClick={() => toggleAnswer(3)} className='step-header'>
              <h2>
                Step 3: The legal process for adoption
              </h2>
            </div>
            {activeStep === 3 && (
              <div className='answer-div'>
                <div>
                  <p style={{fontSize:'20px'}}>Adoption in Sri Lanka is regulated by the Adoption of Children Act. You will need to go through a legal process which includes:</p>
                  <ul>
                    <li>Submitting an application</li>
                    <li>Undergoing an assessment by social services</li>
                    <li>Receiving a court order approving the adoption</li>
                  </ul>
                </div>
              </div>
            )}
          </div>

          <div className='Step-1'>
            <div onClick={() => toggleAnswer(4)} className='step-header'>
              <h2>
                Step 4: Are you eligible to adopt?
              </h2>
            </div>
            {activeStep === 4 && (
              <div className='answer-div-4'>
                <div>
                  <p>Next, we would need to see if you are eligible to adopt. Adopters can be from any walk of life or background. We seek people with different skills and backgrounds regardless of gender, religion, ethnicity or marital status</p>

                  <p>Unfortunately, OrphanCare does not provide adoption facilitating services to residents living in East Malaysia (Sabah, Sarawak and Labuan). This is because the East Malaysian adoption law differs from the adoption law of Peninsula Malaysia. But, bear in mind, if you are a citizen from East Malaysia but are currently living in Peninsular Malaysia, you may be eligible to adopt. Please refer to the table below for further information regarding the criteria.</p>

                  <p>OrphanCare does not provide international adoption services. This includes adopting children from other countries or non-local couples that do not have Malaysian citizenship that are looking to adopt.</p>

                  <p>These set criteria differ if you are interested in adopting an infant, an older child or a child with special needs. It also differs if you are a married couple or single. Applicants that may be considered suitable adoptive parents if:</p>

                  <div>
                    <h4 style={{fontSize:'20px'}}>You are adopting an infant (less than 2 years old)</h4>
                    <ul>
                        <li>You are age 25 to  42 years old</li>
                        <li>Are Malaysian citizens, or a permanent resident (PR) married to a Malaysian citizen</li>
                        <li>Have no criminal record</li>
                        <li>Have a combined income of at least RM10000 per month</li>
                        <li>Physically and mentally fit</li>
                    </ul>
                  </div>

                  <div>
                    <h4 style={{fontSize:'20px'}}>You are adopting an older child (2 years and above)</h4>
                    <ul>
                        <li>You are a married couple age 25 to 60 years of age</li>
                        <li>Are Malaysian citizens, or a permanent resident (PR) married to a Malaysian citizen</li>
                        <li>A single man or woman 25 to 60 years old</li>
                        <li>Have a combined income of at least RM10000 per month</li>
                        <li>Physically and mentally fit</li>
                        <li>Live in a safe neighbourhood</li>
                    </ul>
                  </div> 
                eceiving a court order approving the adoption</div>
              </div>
            )}
          </div>


          <div className='Step-1'>
            <div onClick={() => toggleAnswer(5)} className='step-header'>
              <h2>
              Step 5: Bringing your child(ren) home and finalising the adoption
              </h2>
            </div>
            {activeStep === 5 && (
              <div className='answer-div'>
                <div>
                  <p style={{fontSize:'20px'}}>Finally, the last step of the adoption process is finalising the adoption, which is essentially a legal proceeding where the adoptive parents will be granted legal custody over the child. The OrphanCare team will guide you through the process. After the legal process has been completed, the adoptive parents can finally bring their child home. And worry not, for the first two years of the adoption, the social workers of OrphanCare will ensure post-adoption support to keep track and help you through the adaptation period.</p>
                </div>
              </div>
            )}
          </div>

        </div>

      </div>

      <div className='AbleTO-Adobt'>
            <h1>Am I Eligible?</h1>
            <p> Carefully read above question and answering, You must have above ability to adopt
                and after you View child and adopt the child this adoption is just temparovary booked.
                after you picked child Then they will accept your requested. After accepted then we will contact. Then you will have to face the interview and you have to
                submit some documents. And you have all ability then you can take the relavant child as your child.
            </p>
            <p>
                <span style={{color:'yellow'}}>NOTE:</span> We contineously checked every year. You proparly carring child or Not. You dont proparly carring then we have to take action aggaints you.
            </p>

            <button className='AbleTO-Adobt-button' onClick={()=>{ClickHandle()}}>View Childs ---- </button>
            <img src={motherimg} alt="" className='Mother-image'/>
        </div>

       
    </div>
  );
};
