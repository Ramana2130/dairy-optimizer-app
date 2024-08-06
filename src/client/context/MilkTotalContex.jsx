import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import dayjs from 'dayjs';

const TotalContext = createContext();

export const TotalProvider = ({ children }) => {
  const [totals, setTotals] = useState({});
  const { userId } = useParams();

  useEffect(() => {
    const fetchTotals = async () => {
      if (!userId) return;

      try {
        const response = await axios.get(`http://localhost:3000/milk/${userId}/milkdetails`);
        const data = response.data.milkDetails || [];

        const totals = data.reduce((acc, row) => {
          const monthYear = dayjs(row.date).format('YYYY-MM');
          if (!acc[row.username]) {
            acc[row.username] = {};
          }
          if (!acc[row.username][monthYear]) {
            acc[row.username][monthYear] = { quantity: 0, price: 0 };
          }
          acc[row.username][monthYear].quantity += row.quantity;
          acc[row.username][monthYear].price += row.price;
          return acc;
        }, {});

        setTotals(totals);

      } catch (error) {
        console.error("Error fetching data in TotalProvider:", error);
      }
    };

    fetchTotals();
  }, [userId]);

  return (
    <TotalContext.Provider value={totals}>
      {children}
    </TotalContext.Provider>
  );
};

export const useTotals = () => useContext(TotalContext);
