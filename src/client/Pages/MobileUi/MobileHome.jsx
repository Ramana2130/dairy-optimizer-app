
import React from 'react'
import logo from '../../assets/logo.svg'
import curved from '../../assets/curved.png'
import { useNavigate } from 'react-router-dom'
const MobileHome = () => {
    const navigate=useNavigate()
    const next =()=>{
        navigate("/adminlogin")
    }
  return (
    <div className='h-screen flex items-start justify-center  relative '>
    <div className='absolute -top-36  left-0 z-5'>
        <img src={curved} alt=""  className=''/>
    </div>
    <div className='mt-14 mx-auto  z-50'>
        <img src={logo} alt="" className=' text-center mx-auto'/>
        <div className='mt-72'>
        <h1 className="text-center text-5wxl text-rose-500 font-extrabold leading-none sm:text-8xl xl:max-w-8xl uppercase "> <span className='text-grey'>Dairy </span>Optimizer</h1>
      <p className="text-center mt-5 mb-8 text-xs sm:mb-12">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nulla, laboriosam, provident magni itaque suscipit animi incidunt veritatis porro necessitatibus modi excepturi adipisci commodi aliquam? Voluptatem quas quisquam asperiores nam quibusdam.!</p>
      <div className='flex justify-center'>

      <button  onClick={next} type="button" className="w-80 flex justify-center py-3 m-2 text-lg  font-semibold rounded bg-grey hover:text-white  hover:bg-rose-500 text-white">Get started</button>
      </div>
    
        </div>
    </div>
       
    </div>
  )
}

export default MobileHome
