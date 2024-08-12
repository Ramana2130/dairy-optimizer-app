import React from 'react'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import {  useNavigate } from 'react-router-dom'
import grey from "../assets/grey.png";
import pink from "../assets/pink.png";
import circle from "../assets/circle.png";
import circle2 from "../assets/circle2.png";
import '../index.css'
const Home = () => {
  const navigate= useNavigate();
  const login = () => {
    navigate("/adminlogin");
  };
  const about = () => {
    navigate("/about");
  };
  return (
    <div className='bg-white h-screen relative overflow-hidden over'>
        <Navbar/>
        <div className="absolute -bottom-[240px] -left-[200px]">
          <img src={circle} alt="" className="h-[500px]" />
        </div>
        <div className="absolute -top-48 -left-5">
          <img src={grey} alt="" className="h-[350px]" />
        </div>
        <div className="absolute -top-36 z-5 -right-[200px]">
          <img src={circle2} alt="" className="h-[400px]" />
        </div>

        <div className="absolute -bottom-24 z-5  -right-24">
          <img src={pink} alt="" className="h-[400px]" />
        </div>
       
  <div className="h-[81vh] flex items-center shadow-exl">
    <div className="container flex flex-col items-center px-4  mt-36 pb-24 mx-auto text-center lg:pb-56 md:py-32 md:px-10 lg:px-32 text-grey">
      <h1 className="text-xl text-pink font-bold leading-none sm:text-8xl xl:max-w-8xl uppercase "> <span className='text-grey'>Dairy </span>Optimizer</h1>
      <p className="mt-6 mb-8 text-lg sm:mb-12 xl:max-w-3xl">The application will allow milk consumers to efficiently manage multiple customers' records, track daily milk consumption, automate billing, and generate reports. Key features include real-time data updates, user authentication, customer management, automated invoicing, notifications, and a user-friendly customer portal. The system will enhance accuracy, reduce errors, and improve overall efficiency in managing milk consumption and billing.!</p>
      <div className="flex flex-wrap justify-center">
        <button  onClick={login} type="button" className="px-8 py-3 m-2 text-lg font-semibold rounded bg-grey hover:text-white  hover:bg-pink text-white">Get started</button>
        <button onClick={about} type="button" className="px-8 py-3 m-2 text-lg hover:bg-pink hover:text-white rounded hover:border-pink border-grey border-2 font-bold text-grey">Learn more</button>
      </div>
    </div>
  </div>
    <Footer/>
    </div>
  )
}

export default Home
