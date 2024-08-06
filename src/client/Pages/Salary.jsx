import React from 'react';
import { useParams } from 'react-router-dom';
import SideBar from '../Components/SideBar';
import Statistics from './Statistics';
import Grey from '../assets/grey.png';
import pink from '../assets/pink.png';
import circle2 from "../assets/circle2.png";
import circle from "../assets/circle.png";
import Graph from './Graph';
import SalaryTable from '../Components/SalaryTable';
import { TotalProvider } from '../context/MilkTotalContex';
const Salary = () => {
  const { userId } = useParams(); // Extract userId from URL

  return (
    <TotalProvider>
    <div className="h-[100vh] flex over">
      <SideBar />
      <div className="flex w-[100%] items-center overflow-hidden justify-center relative">
        <div className="absolute -top-20 -left-10">
          <img src={Grey} alt="" className="h-[350px]" />
        </div>
        <div className="absolute -bottom-24 -right-16">
          <img src={pink} alt="" className="h-[350px]" />
        </div>

        <div className='flex items-center justify-evenly w-full '>
          <SalaryTable />
        </div>
      </div>
     
    </div>
    </TotalProvider>
  );
};

export default Salary;
