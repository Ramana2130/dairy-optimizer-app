import React, { useEffect, useState } from "react";
import axios from "axios";
import UsersideNavbar from "../Components/UserSideNavbar";
import UserBox from "./UserBox";
import Userministatement from "./Userministatement";
import DayRange from "./DayRange";
import Calendar from "./Calendar";
import { useNavigate } from "react-router-dom";
import Time from "../Components/Time";
import ConsumerDetails from "./ConsumerDetails";

const UserDashboard = () => {
  const [monthlyIncome, setMonthlyIncome] = useState(0);
  const [monthlyQuantity, setMonthlyQuantity] = useState(0);
  const navigate = useNavigate();
  const customerId = localStorage.getItem("customerId");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchMilkData = async () => {
      try {
        if (!(token && customerId)) {
          navigate("/login");
          return;
        }

        const response = await axios.get(
          `http://localhost:3000/customer/${customerId}/details`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = response.data;
        const milkDetails = data.milkDetails || [];

        const aggregatedData = {};

        milkDetails.forEach(({ quantity, price }) => {
          const today = new Date();
          const month = today.getMonth();
          const year = today.getFullYear();
          const key = `${month}-${year}`;

          if (!aggregatedData[key]) {
            aggregatedData[key] = { month, year, totalQuantity: 0, totalPrice: 0 };
          }
          aggregatedData[key].totalQuantity += quantity;
          aggregatedData[key].totalPrice += price;
        });

        const milkDataArray = Object.values(aggregatedData);

        const today = new Date();
        const currentMonth = today.getMonth();
        const currentYear = today.getFullYear();
        const currentMonthData = milkDataArray.find(entry => entry.month === currentMonth && entry.year === currentYear);

        if (currentMonthData) {
          setMonthlyIncome(currentMonthData.totalPrice);
          setMonthlyQuantity(currentMonthData.totalQuantity);
        } else {
          setMonthlyIncome(0);
          setMonthlyQuantity(0);
        }

      } catch (error) {
        console.error('Error fetching milk data:', error);
      }
    };

    fetchMilkData();
  }, [token, navigate, customerId]);

  return (
    <div className="h-[100vh] bg-white rounded-xl backdrop-blur-xl flex overflow-hidden">
      <UsersideNavbar />
      <div className="w-[60%] h-full">
        <div className="mt-5 w-full">
          <UserBox
            monthlyIncome={monthlyIncome}
            monthlyQuantity={monthlyQuantity}
          />
          <Userministatement />
        </div>
      </div>
      <div className="mt-5 w-[22%] border-l border-black/40">

        <Calendar />
        <ConsumerDetails/>
      </div>
    </div>
  );
};

export default UserDashboard;
                                                            