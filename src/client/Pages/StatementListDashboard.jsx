import React, { useEffect, useState } from "react";
import { ChevronRight, ChevronLeft, BookMarked } from "lucide-react";
import "../index.css";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

const StatementListDashboard = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);
  const rowsPerPage = 5;

  const { userId } = useParams();
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/milk/${userId}/milkdetails`);
        setData(response.data.milkDetails || []);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [userId]);

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = data.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(data.length / rowsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <section className="py-1 w-full over">
      <div className="mb-12 px-16 pl-1 mx-20">
        <div className="relative flex flex-col p-5 backdrop-blur-3xl border h-[45vh] rounded-xl min-w-0 break-words w-full mb-6 shadow-xl">
          <div className="rounded-t mb-0 px-4 py-3 border-0">
            <div className="flex flex-wrap items-center">
              <div className="relative w-full max-w-full flex-grow flex-1">
                <h1 className="text-grey mb-2 text-xl font-medium flex">
                  <span className="mr-2 text-rose-500 h-5">
                    <BookMarked />
                  </span>
                  Statement
                </h1>
              </div>
              <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                <Link
                  to={`/history/${userId}`}
                  className="bg-rose-500 text-white hover:text-black border-2 border-rose-500 hover:bg-transparent text-sm font-bold uppercase px-5 py-2 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                >
                  See all
                </Link>
              </div>
            </div>
          </div>
          <div className="block w-full overflow-x-auto text-black flex-1">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="px-6 align-middle py-3 text-md uppercase font-extrabold text-left">UserName</th>
                  <th className="px-6 align-middle py-3 text-md uppercase font-extrabold text-left">ADDRESS</th>
                  <th className="px-6 align-middle py-3 text-md uppercase font-extrabold text-left">Quantity</th>
                  <th className="px-6 align-middle py-3 text-md uppercase font-extrabold text-left">Price</th>
                  <th className="px-6 align-middle py-3 text-md uppercase font-extrabold text-left">Date & Time</th>
                </tr>
              </thead>
              <tbody>
                {currentRows.length > 0 ? (
                  currentRows.map((data, index) => (
                    <tr key={index} className="border-b border-black/20">
                      <th className="px-6 align-middle text-md uppercase font-bold text-xs p-4 text-left">{data.username}</th>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-md uppercase font-bold text-xs p-4">{data.address}</td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-md uppercase font-bold text-xs p-4">{data.quantity}</td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-md uppercase font-bold text-xs p-4">
                        <i className="fas fa-arrow-up text-emerald-500 mr-4"></i>
                        {data.price}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-md font-bold text-xs p-4">
                        <i className="fas fa-arrow-up text-emerald-500 mr-4"></i>
                        {new Date(data.createdAt).toLocaleString()}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="p-5 text-center text-black">
                      No data available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <nav className="absolute bottom-4 left-0 right-0">
            <ul className="flex justify-center mt-4 items-center">
              <li>
                <a
                  className={`mx-1 flex h-9 w-9 items-center justify-center rounded-full border border-blue-gray-100 bg-transparent p-0 text-sm text-blue-gray-500 transition duration-150 ease-in-out hover:bg-light-300 ${
                    currentPage === 1 ? 'cursor-not-allowed opacity-50' : ''
                  }`}
                  href="#"
                  aria-label="Previous"
                  onClick={(e) => {
                    e.preventDefault();
                    if (currentPage > 1) handlePageChange(currentPage - 1);
                  }}
                >
                  <div className="hover:bg-transparent hover:border-rose-500 hover:border-2 hover:text-grey text-white bg-rose-500 w-8 h-8 rounded-full flex justify-center items-center">
                    <ChevronLeft />
                  </div>
                </a>
              </li>
              <li>
                <a
                  className={`mx-1 flex h-9 w-9 items-center justify-center rounded-full border border-blue-gray-100 bg-transparent p-0 text-sm text-blue-gray-500 transition duration-150 ease-in-out hover:bg-rose-500 ${
                    currentPage === totalPages ? 'cursor-not-allowed opacity-100' : ''
                  }`}
                  href="#"
                  aria-label="Next"
                  onClick={(e) => {
                    e.preventDefault();
                    if (currentPage < totalPages) handlePageChange(currentPage + 1);
                  }}
                >
                  <div className="hover:bg-transparent hover:border-rose-500 hover:border-2 hover:text-grey text-white bg-rose-500 w-8 h-8 rounded-full flex justify-center items-center">
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

export default StatementListDashboard;
