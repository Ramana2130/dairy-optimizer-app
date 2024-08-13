
import React from 'react'
import logo from '../../assets/logo.svg'
import curved from '../../assets/curved.png'
import { Link, useNavigate } from 'react-router-dom'
import { Shield } from 'lucide-react'
import MobileTab from '../../Components/MobileTab'
const MobileAdminsignup = () => {
    const navigate=useNavigate()
    const next =()=>{
        navigate("/dashboard")
    }
  return (
    <div className='h-screen over flex items-start justify-center  relative '>
    <div className='absolute -top-52  left-0 z-5'>
        <img src={curved} alt=""  className=''/>
    </div>
    <div className='mt-14 mx-auto  z-50'>
          <img src={logo} alt="" className=' text-center mx-auto'/>
        <div className='mt-28 '>
        <form
              
                className=""
              >
                  <h3 className=" -ml-8  text-2xl  flex text-black  font-extrabold text-start ">
                  <MobileTab/>
                  </h3>
                  <div className='mt-10 '>
                <div className="">
                <h3 className="text-5xl mb-10  flex text-rose-500  font-extrabold justify-center">
                  Sign Up   
                  </h3>     
                </div>
                <div className="w-80 mx-auto mb-5 relative">
                  <div className="absolute -top-3 left-3 bg-white z-10">
                    <label
                      className="block mb-2 text-sm font-medium text-rose-500"
                      htmlFor="username"
                    >
                      Username
                    </label>
                  </div>

                  <input
                    className="w-full px-3 py-4 text-sm text-black border border-opacity-40 border-grey focus:border-rose-500 rounded-xl shadow appearance-none focus:outline-none focus:shadow-outline"
                    id="username"
                    type="text"
                    placeholder="Enter Your Username"
                    // onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
                <div className="w-80 mx-auto mb-5 relative">
                  <div className="absolute -top-3 left-3 bg-white z-10">
                    <label
                      className="block mb-2 text-sm font-medium text-rose-500"
                      htmlFor="mobilenumber"
                    >
                      Mobile No
                    </label>
                  </div>

                  <input
                    className="w-full px-3 py-4 text-sm text-black border border-opacity-40 border-grey focus:border-rose-500 rounded-xl shadow appearance-none focus:outline-none focus:shadow-outline"
                    id="mobilenumber"
                    type="number"
                    placeholder="Enter Your mobilenumber"
                    // onChange={(e) => setmobilenumber(e.target.value)}
                    required
                  />
                </div>
                <div className="mt-5 mb-2 w-80 mx-auto relative">
                  <div className="absolute -top-3 left-3 bg-white z-10">
                    <label
                      className="block mb-2 text-sm font-medium text-rose-500"
                      htmlFor="password"
                    >
                      Password
                    </label>
                  </div>

                  <input
                    className="w-full px-3 py-4 text-sm text-black border border-opacity-40 border-grey focus:border-rose-500 rounded-xl shadow appearance-none focus:outline-none focus:shadow-outline"
                    id="password"
                    type="password"
                    placeholder="Enter Your password"
                    // onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <p className="text-sm text-grey text-start  ">
                    Already have an Account !
                    <Link
                      to="/adminlogin"
                      className="text-rose-500 font-semibold pl-2 "
                    >
                      Sign in
                    </Link>
                  </p>

                <div className="mt-8 w-80  mx-auto text-center">
                  <button
                    className="w-full px-4 py-3 font-bold text-white bg-rose-500 rounded-full hover:bg-grey focus:outline-none focus:shadow-outline"
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

export default MobileAdminsignup
