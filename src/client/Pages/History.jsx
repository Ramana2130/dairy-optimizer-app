import React from "react";
import SideBar from "../Components/SideBar";
import HistoryTable from "../Components/HistoryTable";
import Grey from "../assets/grey.png";
import pink from "../assets/pink.png";
import circle2 from "../assets/circle2.png";
import circle from "../assets/circle.png";
import Graph from "./Graph";
import Statistics from "./Statistics";

const History = () => {
  return (
    <div className="h-[100vh] flex overflow-hidden">
      <SideBar />
      
      <div className="relative w-[100%]  overflow-hidden ">
            <div className="absolute -top-20 -left-10">
          <img src={Grey} alt="" className="h-[350px]" />
        </div>
        <div className="absolute -bottom-24 -right-16">
          <img src={pink} alt="" className="h-[350px]" />
        </div>
     
        <div className="h-full flex items-center">
        
          <HistoryTable />
        </div>
      </div>
    
    </div>
  );
};

export default History;
