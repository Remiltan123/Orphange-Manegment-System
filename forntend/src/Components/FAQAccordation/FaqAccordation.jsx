import React, { useState } from 'react'
import "./FaqAccordation.css"

const FaqItem = ({Question,Answer})=>{

    const[show,setShow]=useState(false);

    const toggleshow = ()=>{
        setShow(!show)
      }

    return(
        <>
        <div className={`faq-item ${show? "active" :""}`}>
            <div className='faq-item-header' onClick={toggleshow}>
                {Question}
            </div>

            <div className='faq-item-body'>
                <div className='faq-item-body-content'>
                    {Answer}
                </div>   
            </div>
        </div>
        </>
    )
}

export const FaqAccordation = ({Data}) => {
  return (
    <div className='faq-accordation'>
        <h1>FAQ</h1>
        <hr />
        {Data.map((item)=>{
            return <FaqItem key={item.id} Question={item.question} Answer={item.answer}/>
        })}
       
    </div>
  )
}
