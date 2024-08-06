import React, { useEffect, useState } from "react";
import SideBar from "../Components/SideBar";
import Catergory from "./Catergory";
import Statistics from "./Statistics";
import pink from "../assets/pink.png";
import circle2 from "../assets/circle2.png";
import circle from "../assets/circle.png";
import grey from "../assets/grey.png";
import Graph from "./Graph";
import { Truck } from "lucide-react";
import axios from "axios";
import DropDown from "../Components/DropDown";
import { useNavigate, useParams } from "react-router-dom";
import StatementListDashboard from "./StatementListDashboard";

const Dashboard = () => {
  const [username, setUsername] = useState('');
  const [morningUsers, setMorningUsers] = useState(0);
  const [eveningUsers, setEveningUsers] = useState(0);
  const [bothUsers, setBothUsers] = useState(0);

  const {userId} = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/adminlogin");
          
        }

        if (!userId) {
          console.error('User ID is not available.');
          return;
        }
        // Fetch user data from admin API
        const adminResponse = await axios.get(`http://localhost:3000/admin/getuser/${userId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        // console.log(adminResponse.data)
        setUsername(adminResponse.data.user.username);

        // Fetch customer data from customer API
        const customerResponse = await axios.get(`http://localhost:3000/customer/${userId}/customers`);
        const customers = customerResponse.data || [];
        // console.log(customers)

        let morning = 0;
        let evening = 0;
        let both = 0;

        customers.forEach((customer) => {
          if (customer.deliveryschedule === "morning") {
            morning++;
          } else if (customer.deliveryschedule === "evening") {
            evening++;
          } else if (customer.deliveryschedule === "both") {
            both++;
          }
        });

        setMorningUsers(morning);
        setEveningUsers(evening);
        setBothUsers(both);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchUserData();
  }, [navigate,userId]);
  const totalUsers = morningUsers + eveningUsers + bothUsers;

  return (
    <div className="h-[100vh] rounded-xl backdrop-blur-xl flex overflow-hidden">
      <SideBar />
      <div className="relative overflow-hidden z-10 p-5 border  backdrop-blur-3xl w-[70%]">
        <div className=""> 

        <h1 className="text-grey z-50 text-4xl  font-light pl-32">
          Hello <span className="uppercase text-grey font-extrabold">{username || "User"} !</span>,👋!
        </h1>
        <h1 className="text-grey mb-2 text-xl font-medium mt-8 pl-32 flex">
          <span className="ml-3 mr-2 text-rose-500 h-5">
            <Truck />
          </span>
          Catergory
        </h1>
        <Catergory morningUsers={morningUsers} eveningUsers={eveningUsers} bothUsers={bothUsers} totalUsers={totalUsers} />
        </div>

        <div className="mt-8 flex justify-between w-[100%]">
          <StatementListDashboard />
        </div>
      </div>
      <div className="w-[30%]  shadow-xl backdrop-blur-3xl pt-5">
        <DropDown />
        <Statistics />
        <Graph />
      </div>
    </div>
  );
};

export default Dashboard;
