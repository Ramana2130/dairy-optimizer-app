// IncomeUserTable.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import statement from '../assets/money.svg'

const rowsPerPage = 6;

const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const IncomeUserTable = ({ setMonthlyIncome, setMonthlyQuantity }) => {
  const [milkData, setMilkData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const { customerId } = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMilkData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/customer/${customerId}/details`);
        const data = response.data;
        console.log('Fetched data:', data);

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
        setMilkData(milkDataArray);
        setLoading(false);

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
        setLoading(false);
      }
    };

    if (customerId) {
      fetchMilkData();
    }
  }, [customerId, setMonthlyIncome, setMonthlyQuantity]);

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = milkData.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(milkData.length / rowsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex justify-center">
      <div className="pb-4 relative">
        <div className="inline-block mx-auto align-middle">
          <div className="overflow-hidden bg-white/10  border  flex shadow-2xl h-[70vh] mt-2 w-[1300px] rounded-xl backdrop-blur">
            <div>
            <table className="table-auto w-[750px]">
              <thead>
                <tr className="bg-transparent border-b">
                  <th className="p-5 text-left text-sm leading-6 font-semibold text-black uppercase">S.No</th>
                  <th className="p-5 text-left text-sm leading-6 font-semibold text-black uppercase min-w-[150px]">Month/Year</th>
                  <th className="p-5 text-left text-sm leading-6 font-semibold text-black uppercase">Total Quantity</th>
                  <th className="p-5 text-left text-sm leading-6 font-semibold text-black uppercase">Total Price</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-300">
                {currentRows.map((data, index) => (
                  <tr key={index} className="transition-all duration-500 hover:bg-white/20">
                    <td className="p-5 text-sm leading-6 font-medium text-black uppercase">
                      {indexOfFirstRow + index + 1}
                    </td>
                    <td className="p-5 text-sm leading-6 font-medium text-black uppercase">
                      {`${monthNames[data.month]} - ${data.year}`}
                    </td>
                    <td className="p-5 text-sm leading-6 font-medium text-black uppercase">
                      {data.totalQuantity}
                    </td>
                    <td className="p-5 text-sm leading-6 font-medium text-black uppercase">
                      ${data.totalPrice.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="absolute bottom-3 left-[300px]">
              <div className="flex justify-center space-x-3 p-4">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="bg-black text-white hover:bg-transparent w-8 h-8 rounded-full hover:text-black hover:border hover:border-black uppercase flex justify-center items-center"
                >
                  <ChevronLeft />
                </button>
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="bg-black text-white hover:bg-transparent w-8 h-8 rounded-full hover:text-black hover:border hover:border-black uppercase flex justify-center items-center"
                >
                  <ChevronRight />
                </button>
              </div>
            </div>

            </div>
            <div className='px-2 flex justify-center items-center'>
                  <img src={statement} alt=""  className='h-[400px]'/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IncomeUserTable;
