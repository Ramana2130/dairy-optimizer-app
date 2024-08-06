import React from 'react'
import Navbar from '../Components/Navbar'
import Dairy from '../assets/Diary.png'
import Footer from '../Components/Footer'
const About = () => {
  return (
    <div className='bg '>
      <Navbar/>
      <div className='my-10'>

      <div className='flex justify-center'>

      <img src={Dairy} alt=""  className=' w-[1000px] h-[72vh] flex justify-center'/>
      </div>
      </div>
      <Footer/>
    </div>
  )
}

export default About
