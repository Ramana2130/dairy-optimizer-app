import axios from "axios";
import {
  ChevronLeft,
  ChevronRight,
  Settings2,
  Trash2,
  CirclePlus,
  UserRoundSearch,
} from "lucide-react";
import { useEffect, useState } from "react";
import "../index.css";
import { Link, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import user from "../assets/user.png";

const TableUser = () => {
  const [data, setData] = useState([]);
  const [morningCount, setMorningCount] = useState(0);
  const [eveningCount, setEveningCount] = useState(0);
  const [bothCount, setBothCount] = useState(0);
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
          `http://localhost:3000/customer/${userId}/customers`
        ); // Replace with your backend API endpoint
        // console.log(response)
        const customers = response.data;
        console.log(customers);
        let morning = 0;
        let evening = 0;
        let both = 0;
        customers.forEach((customer) => {
          // console.log("customer details: ",customer)
          if (customer.deliveryschedule === "morning") {
            morning++;
            console.log(customer.deliveryschedule);
          } else if (customer.deliveryschedule === "evening") {
            evening++;
          } else if (customer.deliveryschedule === "both") {
            both++;
          }
        });
        setData(customers);
        setMorningCount(morning);
        setEveningCount(evening);
        setBothCount(both);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    if (userId) {
      fetchData();
    }
  }, [userId]);
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = data.slice(indexOfFirstRow, indexOfLastRow);

  const totalPages = Math.ceil(data.length / rowsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/customer/delete/${id}`);
      setData(data.filter((item) => item._id !== id));

      // Adjust counts based on delivery schedule
      const deletedUser = data.find((item) => item._id === id);
      if (deletedUser) {
        if (deletedUser.deliveryschedule.toLowerCase() === "morning") {
          setMorningCount((prevCount) => prevCount - 1);
        } else if (deletedUser.deliveryschedule.toLowerCase() === "evening") {
          setEveningCount((prevCount) => prevCount - 1);
        } else if (deletedUser.deliveryschedule.toLowerCase() === "both") {
          setBothCount((prevCount) => prevCount - 1);
        }
      }

      toast.success("Customer deleted successfully");
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Failed to delete user");
    }
  };

  return (
    <div className="flex  ">
      <div className="flex justify-center items-center h-[100vh]  w-[84vw]">
        <div className="overflow-hidden h-[75vh] w-[75vw] bg-white/5 backdrop-blur shadow-2xl p-5  rounded-xl  flex flex-col">
          <div className="p-5 mx-auto flex justify-center leading-6 font-medium text-gray-900">
            <div
              className="py-1.5 px-3  flex justify-center  items-center gap-1 
        
                          bg-transparent border-b border-rose-500   text-rose-500   uppercase font-bold"
            >
              <span className="font-medium text-center text-2xl flex">
                <UserRoundSearch className="h-8 mr-2" />
                Users List{" "}
              </span>
            </div>
          </div>
          <div className="flex-1 overflow-auto">
            {data.length > 0 ? (
              <>
                <table className="table-auto w-full">
                  <thead>
                    <tr className="bg-transparent">
                      <th>
                        <div className="flex items-center py-5 px-5">
                          <input
                            type="checkbox"
                            className="w-5 h-5 appearance-none border rounded-md mr-2 hover:border-indigo-500 hover:bg-indigo-100 checked:bg-no-repeat checked:bg-center checked:border-indigo-500 checked:bg-indigo-100"
                          />
                        </div>
                      </th>
                      <th className="p-5 text-left text-sm leading-6 font-semibold uppercase text-black">
                        S.No
                      </th>
                      <th className="p-5 text-left text-sm leading-6 font-semibold uppercase text-black min-w-[150px]">
                        User Name
                      </th>
                      <th className="p-5 text-left text-sm leading-6 font-semibold uppercase text-black">
                        Mobile No
                      </th>
                      <th className="p-5 text-left text-sm leading-6 font-semibold uppercase text-black">
                        Door No
                      </th>
                      <th className="p-5 text-left text-sm leading-6 font-semibold uppercase text-black">
                        Street Address
                      </th>
                      <th className="p-5 text-left text-sm leading-6 font-semibold uppercase text-black">
                        City
                      </th>
                      <th className="p-5 text-left text-sm leading-6 font-semibold uppercase text-black">
                        Delivery Schedule
                      </th>
                      <th className="p-5 text-left text-sm leading-6 font-semibold uppercase text-black">
                        Max Quantity
                      </th>
                      <th className="p-5 text-left text-sm leading-6 font-semibold uppercase text-black">
                        Actions
                      </th>
                      <th className="p-5 text-left text-sm leading-6 font-semibold uppercase text-black">
                        Add Milk
                      </th>
                    </tr>
                  </thead>
                  <tbody className="">
                    {currentRows.map((row, index) => (
                      <tr
                        key={row._id}
                        className="transition-all duration-500 hover:bg-black/5 border-b  border-black/20"
                      >
                        <td className="p-5">
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              className="w-5 h-5 appearance-none border border-gray-300 rounded-md mr-2 hover:border-indigo-500 hover:bg-indigo-100 checked:bg-no-repeat checked:bg-center checked:border-indigo-500 checked:bg-indigo-100"
                            />
                          </div>
                        </td>
                        <td className="p-5 text-sm leading-6 font-medium uppercase text-black">
                          {indexOfFirstRow + index + 1}
                        </td>
                        <td className="p-5 text-sm leading-6 font-medium uppercase text-black">
                          {row.username}
                        </td>
                        <td className="p-5 text-sm leading-6 font-medium uppercase text-black">
                          {row.phonenumber}
                        </td>
                        <td className="p-5 text-sm leading-6 font-medium uppercase text-black">
                          {row.doorno}
                        </td>
                        <td className="p-5 text-sm leading-6 font-medium uppercase text-black">
                          {row.streetaddress}
                        </td>
                        <td className="p-5 text-sm leading-6 font-medium uppercase text-black">
                          {row.city}
                        </td>
                        <td className="p-5 text-sm leading-6 font-medium uppercase text-black">
                          {row.deliveryschedule}
                        </td>
                        <td className="p-5 text-sm leading-6 font-medium uppercase text-black">
                          {row.maxrequiredquantity}
                        </td>
                        <td className="flex p-5 items-center gap-0.5">
                          <Link
                            to={`/updateuser/${userId}/${row._id}`}
                            className="p-2 rounded-full group transition-all duration-500 hover:text-blue-700 uppercase text-blue-500 flex item-center"
                          >
                            <Link to={`/updateuser/${userId}/${row._id}`}>
                              <Settings2 />
                            </Link>
                          </Link>
                          <button
                            onClick={() => handleDelete(row._id)}
                            className="p-2 rounded-full group transition-all duration-500 hover:text-red-600 flex uppercase text-red-400 item-center"
                          >
                            <Trash2 />
                          </button>
                        </td>
                        <td className="p-5 text-sm leading-6 font-medium uppercase text-green-500">
                          <Link to={`/statementform/${userId}/${row._id}`}>
                            <CirclePlus />
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            ) : (
              <div className="flex h-full justify-center items-center">
                <p className="uppercase text-white text-2xl font-light p-5">
                  No data available
                </p>
              </div>
            )}
          </div>
          <div className="flex justify-center space-x-3  p-4">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="bg-rose-500 hover:border-rose-500 hover:border hover:bg-transparent   hover:text-grey w-8 h-8 rounded-full text-white  flex justify-center items-center"
            >
              <ChevronLeft />
            </button>

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="bg-rose-500 hover:border-rose-500 hover:border hover:bg-transparent   hover:text-grey w-8 h-8 rounded-full text-white  flex justify-center items-center"
            >
              <ChevronRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableUser;
