import React from 'react'
import UsersideNavbar from '../Components/UserSideNavbar'
import UserStatementtable from '../Components/UserStatementtable'
import DayRange from './DayRange'
import Calendar from './Calendar'
import Grey from '../assets/black2.png';
import pink from "../assets/black.png";
import MobileUserStatement from './MobileUi/MobileUserStatement'

const UserStatement = () => {
  return (
    <div>
    <div className="hidden md:flex h-[100vh] bg-white  overflow-hidden">

      <UsersideNavbar/>

      <div className  ="w-[100%] overflow-hidden h-full relative">
      <div className="absolute -top-20 -left-10">
        <img src={Grey} alt="" className="h-[350px]" />
      </div>
      <div className="absolute -bottom-24 -right-16">
        <img src={pink} alt="" className="h-[350px]" />
      </div>
        <div className="mt-24 w-full">
        <UserStatementtable/>
      </div>  
        </div>
 

    </div>
    <div className='md:hidden'>
      <MobileUserStatement/>
    </div>
    </div>
  )
}

export default UserStatement
