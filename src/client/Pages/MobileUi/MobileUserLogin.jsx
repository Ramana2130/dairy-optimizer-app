
import React from 'react'
import logo from '../../assets/logo.svg'
import curved from '../../assets/curved.png'
import { Link, useNavigate } from 'react-router-dom'
import { Shield } from 'lucide-react'
import MobileTab from '../../Components/MobileTab'
const MobileUserLogin = () => {
    const navigate=useNavigate()
    const next =()=>{
        navigate("/adminlogin")
    }
  return (
    <div className='h-screen over flex items-start justify-center  relative '>
    <div className='absolute -top-24  left-0 z-5'>
        <img src={curved} alt=""  className=''/>
    </div>
    <div className='mt-32 mx-auto  z-50'>
          <img src={logo} alt="" className=' text-center mx-auto'/>
        <div className='mt-40 '>
        <form
              
                className=""
              >
                  <h3 className=" -ml-8  text-2xl  flex text-black  font-extrabold text-start ">
                  <MobileTab/>
                  </h3>
                  <div className='mt-5 '>
                <div className="">
                <h3 className="text-5xl mb-8  flex text-grey  font-extrabold justify-center">
                  Login   
                  </h3>     
                </div>
                <div className="w-80 mx-auto relative">
                  <div className="absolute -top-3 left-3 bg-white z-10">
                    <label
                      className="block mb-2 text-sm font-medium text-grey"
                      htmlFor="username"
                    >
                      Username
                    </label>
                  </div>

                  <input
                    className="w-full px-3 py-4 text-sm text-black border border-opacity-40 border-grey focus:border-grey rounded-xl shadow appearance-none focus:outline-none focus:shadow-outline"
                    id="username"
                    type="text"
                    placeholder="Enter Your Username"
                    // onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
                <div className="mt-5 mb-2 w-80 mx-auto relative">
                  <div className="absolute -top-3 left-3 bg-white z-10">
                    <label
                      className="block mb-2 text-sm font-medium text-grey"
                      htmlFor="password"
                    >
                      Password
                    </label>
                  </div>

                  <input
                    className="w-full px-3 py-4 text-sm text-black border border-opacity-40 border-grey focus:border-grey rounded-xl shadow appearance-none focus:outline-none focus:shadow-outline"
                    id="password"
                    type="password"
                    placeholder="Enter Your password"
                    // onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <p className="text-sm text-grey text-start  ">
                    Create an Account !
                    <Link
                      to="/adminregister"
                      className="text-grey font-semibold pl-2 "
                    >
                      Sign Up
                    </Link>
                  </p>

                <div className="mt-8 w-80  mx-auto text-center">
                  <button
                    className="w-full px-4 py-3 font-bold text-white bg-grey rounded-full hover:bg-grey focus:outline-none focus:shadow-outline"
                    type="submit"
                  >
                    Sign In
                  </button>
                </div>
                </div>
              </form>
        </div>
    </div>
       
    </div>
  )
}

export default MobileUserLogin
