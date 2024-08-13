import React, { useEffect, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ArrowDownToLine,
  ScrollText,
} from "lucide-react";
import axios from "axios";
import { TotalProvider } from "../../context/MilkTotalContex";
import { useParams } from "react-router-dom";
import pie from "../../assets/pie.svg";
const MobileuserStatementtable = () => {
  const [data, setData] = useState([]);
  const [adminMap, setAdminMap] = useState({});
  const [adminData, setAdminData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 9;

  const { customerId } = useParams();
  console.log("customerId:", customerId);

  useEffect(() => {
    if (customerId) {
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `http://localhost:3000/customer/${customerId}/details`
          );
          console.log(response);
          const milkData = response.data.milkDetails || [];
          const adminData = response.data.admin || null;
          const adminMap = {};
          if (adminData) {
            adminMap[adminData._id] = adminData.username;
          }
          setAdminMap(adminMap);
          setData(milkData);
          setAdminData(adminData);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      fetchData();
    } else {
      console.warn("customerId is undefined");
    }
  }, [customerId]);
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = Array.isArray(data)
    ? data.slice(indexOfFirstRow, indexOfLastRow)
    : [];
  const totalPages = Math.ceil(
    Array.isArray(data) ? data.length / rowsPerPage : 0
  );
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <TotalProvider>
      <div className="relative ">
        <div className="flex mx-8  justify-center my-16">
          <div className="pb-4 relative">
            <div className="absolute z-50 bottom-10 left-[750px]">
              <button className="bg-black text-white hover:bg-transparent hover:border hover:border-black hover:text-black uppercase px-5 py-2 rounded-lg">
                <ArrowDownToLine />
              </button>
            </div>

            <div className="mx-10 mr-2  flex w-full  justify-center align-middle">
              <div className="h-[80vh] w-[94%]  bg-white/5 border shadow-2xl   backdrop-blur-3xl rounded-xl ">
                <div className="flex">
                  <div className="relative w-[100%]">
                    <div className="absolute z-50 -bottom-[500px] left-[50%] transform -translate-x-1/2">
                      <div className="flex justify-center space-x-3 p-4">
                        <button
                          onClick={() => handlePageChange(currentPage - 1)}
                          disabled={currentPage === 1}
                          className="bg-black text-white hover:bg-transparent w-8 h-8 rounded-full hover:text-black border hover:border-black uppercase flex justify-center items-center"
                        >
                          <ChevronLeft />
                        </button>
                        <button
                          onClick={() => handlePageChange(currentPage + 1)}
                          disabled={currentPage === totalPages}
                          className="bg-black text-white hover:bg-transparent w-8 h-8 rounded-full hover:text-black border hover:border-black uppercase flex justify-center items-center"
                        >
                          <ChevronRight />
                        </button>
                      </div>
                    </div>

                    <table className="table-auto">
                      <thead className=" border-b ">
                        <tr className="bg-transparent">
                          <th>
                            <div className="flex items-center py-5 px-5">
                              <input
                                type="checkbox"
                                className="w-5 h-5 appearance-none border rounded-md mr-2 hover:border-indigo-500 hover:bg-indigo-100 checked:bg-no-repeat checked:bg-center checked:border-indigo-500 checked:bg-indigo-100"
                              />
                            </div>
                          </th>
                          <th className="p-5 text-left text-sm leading-6 font-semibold text-black uppercase">
                            S.No
                          </th>
                          <th className="p-5 text-left text-sm leading-6 font-semibold text-black uppercase min-w-[150px]">
                            Consumer Name
                          </th>
                          <th className="p-5 text-left text-sm leading-6 font-semibold text-black uppercase">
                            Delivery Schedule
                          </th>
                          <th className="p-5 text-left text-sm leading-6 font-semibold text-black uppercase">
                            Quantity
                          </th>
                          <th className="p-5 text-left text-sm leading-6 font-semibold text-black uppercase">
                            Price
                          </th>
                          <th className="p-5 text-left text-sm leading-6 font-semibold text-black uppercase">
                            Date & Time
                          </th>
                          <th className="p-5 text-left text-sm leading-6 font-semibold text-black uppercase">
                            Status
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white">
                        {currentRows.length > 0 ? (
                          currentRows.map((row, index) => (
                            <tr
                              key={row._id}
                              className="transition-all duration-500 hover:bg-black/10"
                            >
                              <td className="p-5">
                                <div className="flex items-center">
                                  <input
                                    type="checkbox"
                                    className="w-5 h-5 appearance-none border border-gray-300 rounded-md mr-2 hover:border-indigo-500 hover:bg-indigo-100 checked:bg-no-repeat checked:bg-center checked:border-indigo-500 checked:bg-indigo-100"
                                  />
                                </div>
                              </td>
                              <td className="p-5 text-sm leading-6 font-medium text-black uppercase">
                                {indexOfFirstRow + index + 1}
                              </td>
                              <td className="p-5 text-sm leading-6 font-medium text-black uppercase">
                                {adminMap[row.admin] || row.username}
                              </td>
                              <td className="p-5 text-sm leading-6 font-medium text-black uppercase">
                                {row.deliveryschedule}
                              </td>
                              <td className="p-5 text-sm leading-6 font-medium text-black uppercase">
                                {row.quantity}
                              </td>
                              <td className="p-5 text-sm leading-6 font-medium text-black uppercase">
                                {row.price}
                              </td>
                              <td className="p-5 text-sm leading-6 font-medium text-black uppercase">
                                {new Date(row.createdAt).toLocaleString()}
                              </td>
                              <td className="p-5 text-sm leading-6 font-medium text-gray-900">
                                <div className="py-1.5 px-2.5 rounded-full flex justify-center w-20 items-center gap-1 bg-green-500 text-black uppercase font-bold">
                                  <span className="font-medium text-xs">
                                    collected
                                  </span>
                                </div>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td
                              colSpan="8"
                              className="p-5  text-center text-black"
                            >
                              No data available
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                 
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </TotalProvider>
  );
};

export default MobileuserStatementtable;
