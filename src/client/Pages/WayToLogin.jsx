import React from 'react'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import pink from "../assets/pink.png";
import circle2 from "../assets/circle2.png";
import circle2b from "../assets/circle2b.png";
import brown from "../assets/brown.png";
import logo from "../assets/logo.svg";
import man from '../assets/man.png'
import delivery from '../assets/delivery.png'
import '../index.css'
import { useNavigate } from 'react-router-dom';
const WayToLogin = () => {
  const navigate= useNavigate();
  const Adminlogin = () => {
    navigate("/adminlogin");
  };
  const userlogin = () => {
    navigate("/login");
  };
  
  return (
    <div className='over pt-0.5 bg relative'>
            <Navbar/>
            <div className="absolute z-0 -top-14 -left-10">
          <img src={brown} alt="" className="h-[350px]" />
        </div>
        <div className="absolute z-0 -bottom-24 -right-8">
          <img src={pink} alt="" className="h-[350px]" />
        </div>
        
        <div className="absolute -bottom-32 -left-32">
          <img src={circle2b} alt="" className="h-[350px]" />
        </div>
        <div className="absolute -top-44 -right-36">
          <img src={circle2} alt="" className="h-[350px]" />
        </div>
        <div className='w-full  flex justify-center mt-36 '>
            <img src={logo} alt="" />
        </div>
       
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2  h-[50vh] mx-72 p-10">
    <div class="card2  flex  rounded-xl h-[300px] items-center p-4 bg-white/20 backdrop-blur-3xl">
      <img src={delivery} alt="" className='h-40' />
              <div class="ml-2  h-full pt-20 ">
            <h4 class=" text-xl text-white  font-bold text-primary ">Milk vendor</h4>
            <p class="text-sm font-normal text-white text-gray  ">They are responsible for ensuring the quality and freshness of the milk they sell.!</p>
            <div className='pt-5  flex justify-center'>

            <button onClick={userlogin} className='bg-white text-grey px-24 py-2  rounded-xl font-bold  hover:bg-brown hover:text-white'>Login</button>
            </div>
        </div>
    </div>
    <div class="card  flex  rounded-xl h-[300px] items-center p-4 bg-white/20 backdrop-blur-3xl">
      <img src={man} alt="" className='h-40' />
              <div class="ml-2  h-full pt-20 ">
            <h4 class=" text-xl text-white  font-bold text-primary ">Milk consumer</h4>
            <p class="text-sm font-normal text-white text-gray  ">Milk consumers are responsible for selecting milk based on their preferences and dietary needs, ensuring it is stored properly, and using it before it expires.</p>
            <div className='pt-5  flex justify-center'>

            <button onClick={Adminlogin} className='bg-white text-grey px-24 py-2  rounded-xl font-bold  hover:bg-pink hover:text-white'>Login</button>
            </div>
        </div>
    </div>
 
</div>
<Footer/>
    </div>
  )
}

export default WayToLogin
