import React, { useState } from "react";
import { ChevronLeft, ChevronRight, CircleDollarSign } from "lucide-react";
import { TotalProvider, useTotals } from "../context/MilkTotalContex";
import price from "../assets/price.svg";

const SalaryTable = () => {
  const totals = useTotals();
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;
  const [selectedPeriod, setSelectedPeriod] = useState("monthly");
  const userNames = Object.keys(totals);
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = userNames.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(userNames.length / rowsPerPage);
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const handlePeriodChange = (event) => {
    setSelectedPeriod(event.target.value);
  };
  const getPeriodTotals = (username) => {
    return Object.keys(totals[username]).reduce((acc, monthYear) => {
      const year = monthYear.split("-")[0];
      if (selectedPeriod === "yearly") {
        if (!acc[year]) {
          acc[year] = { quantity: 0, price: 0 };
        }
        acc[year].quantity += totals[username][monthYear].quantity;
        acc[year].price += totals[username][monthYear].price;
      } else {
        acc[monthYear] = totals[username][monthYear];
      }
      return acc;
    }, {});
  };

  return (
    <TotalProvider>
      <div className="relative">
        <div className="flex  my-24">
          <div className="pb-4 relative">
            <div className="inline-block mx-auto align-middle">
              <div className="overflow-hidden flex  space-x-16  h-[75vh] w-[75vw]  p-10 rounded-xl  shadow-2xl backdrop-blur">
                <div className="w-[50vw] ">
                  <div className="p-5 mx-auto flex justify-center leading-6 font-medium text-gray-900">
                    <div className="py-1.5 px-3  flex justify-center  items-center gap-1 bg-transparent border-b border-rose-500   text-rose-500   uppercase font-bold">
                      <span className="font-medium text-center text-2xl">
                        User Income List
                      </span>
                    </div>
                  </div>
                  <div className="p-5">
                    <label htmlFor="period">Select Period: </label>
                    <select
                      id="period"
                      value={selectedPeriod}
                      onChange={handlePeriodChange}
                    >
                      <option value="monthly">Monthly</option>
                      <option value="yearly">Yearly</option>
                    </select>
                  </div>
                  <table className="table-auto w-full">
                    <thead>
                      <tr className="bg-transparent">
                        <th className="p-5 text-left text-sm leading-6 font-semibold text-black uppercase">
                          S.No
                        </th>
                        <th className="p-5 text-left text-sm leading-6 font-semibold text-black uppercase min-w-[150px]">
                          User Name
                        </th>
                        <th className="p-5 text-left text-sm leading-6 font-semibold text-black uppercase">
                          Period
                        </th>
                        <th className="p-5 text-left text-sm leading-6 font-semibold text-black uppercase">
                          Total Quantity
                        </th>
                        <th className="p-5 text-left text-sm leading-6 font-semibold text-black uppercase">
                          Total Price
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentRows.map((username, index) => {
                        const periodTotals = getPeriodTotals(username);
                        return Object.keys(periodTotals).map(
                          (period, periodIndex) => (
                            <tr
                              key={`${username}-${period}`}
                              className="transition-all duration-500 hover:bg-black/5 border-b  border-black/20"
                            >
                              <td className="p-5 text-sm leading-6 font-medium text-black uppercase">
                                {indexOfFirstRow + index + 1}
                              </td>
                              <td className="p-5 text-sm leading-6 font-medium text-black uppercase">
                                {username}
                              </td>
                              <td className="p-5 text-sm leading-6 font-medium text-black uppercase">
                                {period}
                              </td>
                              <td className="p-5 text-sm leading-6 font-medium text-black uppercase">
                                {periodTotals[period].quantity}
                              </td>
                              <td className="p-5 text-sm leading-6 font-medium text-black uppercase">
                                ${periodTotals[period].price.toFixed(2)}
                              </td>
                            </tr>
                          )
                        );
                      })}
                    </tbody>
                  </table>
                  <div className="absolute bottom-10 left-[250px]">
                    <div className="flex justify-center space-x-3 p-4">
                      <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="bg-rose-500 text-white hover:bg-transparent hover:border hover:border-pink w-8 h-8 rounded-full hover:text-black uppercase flex justify-center items-center"
                      >
                        <ChevronLeft />
                      </button>
                      <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="bg-rose-500 text-white hover:bg-transparent hover:border hover:border-pink w-8 h-8 rounded-full hover:text-black uppercase flex justify-center items-center"
                      >
                        <ChevronRight />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-center  w-[40%]">
                  <img src={price} alt="" className="h-[600px]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </TotalProvider>
  );
};

export default SalaryTable;
