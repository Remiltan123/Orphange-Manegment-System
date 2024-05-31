import React, { useEffect } from 'react'
import { HomeDispaly } from '../Components/HomeDisplay/HomeDispaly'
import p1_img from "../Components/Assets/img1.png"
import p2_img from "../Components/Assets/img2.png"
import p3_img from "../Components/Assets/im3.png"
import { FaqAccordation } from '../Components/FAQAccordation/FaqAccordation'
import { Subscripe } from '../Components/Subscripe/Subscripe'
import { WantsHomeDisplay } from '../Components/WantsHomeDisplay/WantsHomeDisplay'


const slides = [
  {url:p1_img},
  {url:p2_img},
  {url:p3_img},
]

const conatinerStyle ={
  width: "77%",
  height : "600px",
  margin: "0 auto"
}

const data = [
  {id:1, question:"What is an orphanage?", answer:" A residential institution for orphaned, abandoned, or vulnerable children. Provides shelter, food, education, and other necessities. Offers care and support for children who lack parental guidance."},

  {id:2, question:"Why is it important to help children in need?", answer:"Every child deserves a safe and nurturing environment. Helping vulnerable children breaks the cycle of poverty, abuse, and neglect. Investing in children's well-being benefits society in the long run"},
  
  {id:3, question:"What challenges do children in orphanages face?", answer:"Emotional trauma from separation or loss. Limited access to education, healthcare, and stable relationships. Overcrowding, inadequate resources, and substandard living conditions."},

  {id:3, question:"How can individuals contribute to improving the lives of children in orphanages?", answer:" Volunteer time and skills to provide support and mentorship.Donate resources such as clothing, books, and educational materials. Advocate for policy reforms to strengthen child welfare systems. Support organizations working on family reunification, adoption, or foster care"}
];

export const HomePage = () => {
  return (
    <>
      <div style={conatinerStyle}>
        <HomeDispaly slides={slides}/>
      </div>
      <FaqAccordation Data={data}/>
      <WantsHomeDisplay/>
      <Subscripe/>
      
    </>
    
  )
}

const Subcripeheader = ()=>{
  return(
    <>
    
    </>
  )
}
