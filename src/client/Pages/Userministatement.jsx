import React, { useEffect, useState } from "react";
import { ChevronRight, ChevronLeft, BookMarked, BadgeInfo } from "lucide-react";
import "../index.css";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const Userministatement = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);
  const [adminData, setAdminData] = useState(null);
  const [adminMap, setAdminMap] = useState({});
  const rowsPerPage = 5;
  const {customerId} = useParams();

  useEffect(() => {
    if(customerId) {
      const fetchData = async () => {
        try {
          const response = await axios.get(`http://localhost:3000/customer/${customerId}/details`)
          const milkData = response.data.milkDetails || [];
          const adminData = response.data.admin || null;
          const adminMap = {};
          if(adminData) {
            adminData[adminData._id] = adminData.username;
          }
          setAdminMap(adminData)
          setData(milkData)
          setAdminData(adminData)
        } catch (error) {
          toast.promise(
            saveSettings(settings),
             {
               loading: 'fetching...',
               error: <b>Server Error.</b>,
             }
           );
          console.error("Error fetching data:", error);
        }
      }
      fetchData();
    }
  }, [customerId])
  
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = data.slice(indexOfFirstRow, indexOfLastRow);

  const totalPages = Math.ceil(data.length / rowsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <section className="py-1 w-full over">
      <div className="mb-12 mx-8">
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full  flex-grow flex-1">
              <h1 className="text-white bg-black rounded-full px-5 py-2  border w-48 text-xl font-medium flex">
                <span className="mr-2 text-white  h-5">
                  <BadgeInfo />
                </span>
                Statement
              </h1>
            </div>
            <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
              <Link
                to={`/userstatement/${customerId}`}
                className="bg-black text-white hover:text-black hover:bg-white hover:border hover:border-black text-sm font-bold uppercase px-5 py-2 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
              >
                See all
              </Link>
            </div>
          </div>
        </div>
        <div className="relative flex flex-col p-5 border border-black/20 bg-white backdrop-blur-3xl shadow-2xl h-[45vh] rounded-xl min-w-0 break-words w-full mb-6">
          <div className="block w-full overflow-x-auto text-black flex-1">
            <table className="w-full">
              <thead className="border-b border-black/20">
                <tr>
                  <th className="px-6 align-middle py-3 text-md uppercase font-semibold text-left">
                    Consumer Name
                  </th>
                  <th className="px-6 align-middle py-3 text-md uppercase font-semibold text-left">
                    Delevery Schedule
                  </th>
                  <th className="px-6 align-middle py-3 text-md uppercase font-semibold text-left">
                    Quantity
                  </th>
                  <th className="px-6 align-middle py-3 text-md uppercase font-semibold text-left">
                    Price
                  </th>
                  <th className="px-6 align-middle py-3 text-md uppercase font-semibold text-left">
                    Date & Time
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentRows.map((data, index) => (
                  <tr key={index}>
                    <th className="px-6 align-middle text-md uppercase font-bold text-xs p-4 text-left">
                      {adminMap[data.admin] || data.username}
                    </th>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-md uppercase font-bold text-xs p-4">
                      {data.deliveryschedule}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-md uppercase font-bold text-xs p-4">
                      {data.quantity}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-md uppercase font-bold text-xs p-4">
                      <i className="fas fa-arrow-up text-emerald-500 mr-4"></i>
                      {data.price}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-md font-bold text-xs p-4">
                      <i className="fas fa-arrow-up text-emerald-500 mr-4"></i>
                      {new Date(data.createdAt).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <nav className="absolute bottom-4 left-0 right-0">
            <ul className="flex justify-center mt-4 items-center">
              <li>
                <a
                  className={`mx-1 flex h-9 w-9 items-center justify-center rounded-full  text-sm text-blue-gray-500 transition duration-150 ease-in-out hover:bg-light-300 ${
                    currentPage === 1 ? "cursor-not-allowed opacity-50" : ""
                  }`}
                  href="#"
                  aria-label="Previous"
                  onClick={(e) => {
                    e.preventDefault();
                    if (currentPage > 1) handlePageChange(currentPage - 1);
                  }}
                >
                  <div className="bg-black hover:bg-transparent hover:text-black hover:border hover:border-black  w-8 h-8 rounded-full text-white flex justify-center items-center">
                    <ChevronLeft />
                  </div>
                </a>
              </li>
              <li>
                <a
                  className={`mx-1 flex h-9 w-9 items-center justify-center rounded-full  text-sm text-blue-gray-500 transition duration-150 ease-in-out hover:bg-light-300 ${
                    currentPage === totalPages
                      ? "cursor-not-allowed opacity-50"
                      : ""
                  }`}
                  href="#"
                  aria-label="Next"
                  onClick={(e) => {
                    e.preventDefault();
                    if (currentPage < totalPages)
                      handlePageChange(currentPage + 1);
                  }}
                >
                  <div className="bg-black hover:bg-transparent hover:text-black hover:border hover:border-black  w-8 h-8 rounded-full text-white flex justify-center items-center">
                    <ChevronRight />
                  </div>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </section>
  );
};

export default Userministatement;
