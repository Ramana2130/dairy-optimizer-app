import React, { useEffect, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ArrowDownToLine,
  ListTodo,
  ScrollText,
} from "lucide-react";
import "../index.css";
import axios from "axios";
import { TotalProvider } from "../context/MilkTotalContex";
import { useParams } from "react-router-dom";
import statement from "../assets/statement.svg";
import statement1 from "../assets/statement.png";
const HistoryTable = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;
  const { userId } = useParams();

  useEffect(() => {
    if (userId) {
      localStorage.getItem("userId");
    }
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/milk/${userId}/milkdetails`
        );
        console.log(response.data);
        setData(response.data.milkDetails || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = data.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(data.length / rowsPerPage);
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  return (
    <TotalProvider>
      <div className="relative  flex justify-center  w-[100%]">
        <div className="flex my-2  rounded">
          <div className="pb-4 relative">
            <div className="absolute z-50 bo bottom-14 left-[900px]">
              <button className="bg-rose-500 text-white hover:border hover:border-rose-500 hover:bg-transparent hover:text-rose-400 uppercase px-5 py-2 rounded-lg">
                <ArrowDownToLine />
              </button>
            </div>
            <div className="">
              <div className="p-2 overflow-hidden flex h-[80vh] w-[80vw]  bg-white/5 shadow-2xl backdrop-blur rounded-xl ">
                <div className="p-5 w-[90%]">
                  <div className="p-5 mx-auto flex justify-center leading-6 font-medium text-gray-900">
                    <div
                      className="py-1.5 px-3  flex justify-center  items-center gap-1 
        
                          bg-transparent border-b border-rose-500   text-rose-500   uppercase font-bold"
                    >
                      <span className="font-medium text-center text-2xl flex ">
                        {" "}
                        <ScrollText className="mr-2 h-8" />
                        Statement
                      </span>
                    </div>
                  </div>
                  <table className="table-auto">
                    <thead className="">
                      <tr className="bg-transparent border-b  border-black/20">
                        <th>
                          <div className="flex items-center py-5 px-5">
                            <input
                              type="checkbox"
                              className="w-5 h-5 appearance-none border rounded-md mr-2 hover:border-indigo-500 hover:bg-indigo-100 checked:bg-no-repeat checked:bg-center checked:border-indigo-500 checked:bg-indigo-100"
                            />
                          </div>
                        </th>
                        <th className="p-5 text-left text-sm leading-6 font-bold text-black uppercase">
                          S.No
                        </th>
                        <th className="p-5 text-left text-sm leading-6 font-bold text-black uppercase min-w-[150px]">
                          User Name
                        </th>
                        <th className="p-5 text-left text-sm leading-6 font-bold text-black uppercase">
                          Street Address
                        </th>
                        <th className="p-5 text-left text-sm leading-6 font-bold text-black uppercase">
                          Delivery Schedule
                        </th>
                        <th className="p-5 text-left text-sm leading-6 font-bold text-black uppercase">
                          Quantity
                        </th>
                        <th className="p-5 text-left text-sm leading-6 font-bold text-black uppercase">
                          Price
                        </th>
                        <th className="p-5 text-left text-sm leading-6 font-bold text-black uppercase">
                          Date & Time
                        </th>
                        <th className="p-5 text-left text-sm leading-6 font-bold text-black uppercase">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="border-b ">
                      {currentRows.map((row, index) => (
                        <tr
                          key={row._id}
                          className="transition-all duration-500 hover:bg-black/5 text-grey hover:text-black border-b  border-black/20"
                        >
                          <td className="p-5">
                            <div className="flex items-center">
                              <input
                                type="checkbox"
                                className="w-5 h-5 appearance-none border border-gray-300 rounded-md mr-2 hover:border-indigo-500 hover:bg-indigo-100 checked:bg-no-repeat checked:bg-center checked:border-indigo-500 checked:bg-indigo-100"
                              />
                            </div>
                          </td>
                          <td className="p-5 text-sm leading-6 font-medium  uppercase">
                            {indexOfFirstRow + index + 1}
                          </td>
                          <td className="p-5 text-sm leading-6 font-medium  uppercase">
                            {row.username}
                          </td>
                          <td className="p-5 text-sm leading-6 font-medium  uppercase">
                            {row.address}
                          </td>
                          <td className="p-5 text-sm leading-6 font-medium  uppercase">
                            {row.deliveryschedule}
                          </td>
                          <td className="p-5 text-sm leading-6 font-medium  uppercase">
                            {row.quantity}
                          </td>
                          <td className="p-5 text-sm leading-6 font-medium  uppercase">
                            {row.price}{" "}
                            {/* Assuming quantity corresponds to price */}
                          </td>
                          <td className="p-5 text-sm leading-6 font-medium  uppercase">
                            {new Date(row.createdAt).toLocaleString()}
                          </td>
                          <td className="p-5 text-sm leading-6 font-medium text-gray-900">
                            <div
                              className="py-1.5 px-3 rounded-full flex justify-center  items-center gap-1 
        
                          bg-green-50  border border-green-500   text-green-500   uppercase font-bold"
                            >
                              <span className="font-medium text-xs">
                                Collected
                              </span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="absolute z-50 bo bottom-5 left-[500px]">
                    <div className="flex justify-center space-x-3 p-4">
                      <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="bg-rose-500 text-white hover:bg-transparent w-8 h-8 rounded-full hover:text-grey hover:border hover:border-rose-500 uppercase flex justify-center items-center"
                      >
                        <ChevronLeft />
                      </button>
                      <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="bg-rose-500 text-white hover:bg-transparent w-8 h-8 rounded-full hover:text-grey hover:border hover:border-rose-500 uppercase flex justify-center items-center"
                      >
                        <ChevronRight />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="w-[40%] px-5">
                  <img src={statement} alt="" className="h-[820px]" />
                </div>
                <div></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </TotalProvider>
  );
};

export default HistoryTable;
