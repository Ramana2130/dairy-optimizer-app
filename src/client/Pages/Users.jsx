import React from "react";
import SideBar from "../Components/SideBar";
import TableUser from "../Components/TableUser";
import Grey from "../assets/grey.png";
import pink from "../assets/pink.png";
import circle2 from "../assets/circle2.png";
import circle from "../assets/circle.png";

const Users = () => {
  return (
    <div className="h-[100vh]   flex  over">
      <SideBar />

      <div className="  overflow-hidden   relative">
     <div className="absolute -top-36 -left-10">
          <img src={Grey} alt="" className="h-[350px]" />
        </div>
        <div className="absolute -bottom-40 -right-32">
          <img src={pink} alt="" className="h-[350px]" />
        </div>
        {/* <div className="absolute -top-36 -right-24">
          <img src={circle2} alt="" className="h-[350px]" />
        </div>
        <div className="absolute -bottom-36 -left-24">
          <img src={circle} alt="" className="h-[350px]" />
        </div> */}
        <div className="w-[1700px]  ">
     
          <TableUser />
        </div>
      </div>
    </div>
  );
};

export default Users;
