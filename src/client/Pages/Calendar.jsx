import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs'; // Ensure you have dayjs installed
import { AlarmClock, CalendarDays } from 'lucide-react';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(dayjs()); // Default to current date

  const startOfMonth = currentDate.startOf('month');
  const endOfMonth = currentDate.endOf('month');
  const startDay = startOfMonth.startOf('week');
  const endDay = endOfMonth.endOf('week');

  const handlePrevMonth = () => {
    setCurrentDate(currentDate.subtract(1, 'month'));
  };

  const handleNextMonth = () => {
    setCurrentDate(currentDate.add(1, 'month'));
  };

  const days = [];
  let day = startDay;
  while (day.isBefore(endDay, 'day')) {
    days.push(day);
    day = day.add(1, 'day');
  }
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const seconds = now.getSeconds();
      const ampm = hours >= 12 ? 'PM' : 'AM';

      const formattedHours = hours % 12 || 12;
      const formattedMinutes = minutes.toString().padStart(2, '0');
      const formattedSeconds = seconds.toString().padStart(2, '0');

      setCurrentTime(`${formattedHours}:${formattedMinutes}:${formattedSeconds} ${ampm}`);
    };

    updateTime(); // Initial call to set the time immediately
    const intervalId = setInterval(updateTime, 1000); // Update the time every second

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, []);

  return (
    <div className="flex items-center justify-center mb-8 px-4">
      <div className="max-w-sm w-full ">
      <div className="md:p-4 p-2 space-x-5 hidden md:block bg-white flex justify-center mb-5  border shadow-2xl rounded-3xl">
      <div className='text-4xl'>
        <AlarmClock  className='h-10'/>
        </div>
        <div>
        <h1 className='text-3xl  font-medium'>{currentTime}</h1>
        
        </div>
      </div>

        <div className="md:p-8 p-5 bg-white  border shadow-2xl rounded-3xl">
          <div className="px-4 flex items-center justify-between">
            <span className="text-xl font-bold text-black flex">
            <span className='text-3xl mr-2'><CalendarDays /></span> {currentDate.format('MMMM YYYY')}
            </span>
            <div className="flex w-8 h-8 justify-center items-center">
              <button
                aria-label="calendar backward"
                className=" bg-black rounded-full  py-1 px-1 text-center text-white hover:text-white focus:text-white"
                onClick={handlePrevMonth}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-chevron-left"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <polyline points="15 6 9 12 15 18" />
                </svg>
              </button>
              <button
                aria-label="calendar forward"
                className="ml-3  bg-black rounded-full  py-1 px-1 text-center text-white hover:text-white focus:text-white"
                onClick={handleNextMonth}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-chevron-right"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <polyline points="9 6 15 12 9 18" />
                </svg>
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between pt-5 overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map(day => (
                    <th key={day}>
                      <div className="w-full flex justify-center">
                        <p className="text-base font-bold text-center text-black">
                          {day}
                        </p>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: Math.ceil(days.length / 7) }).map((_, rowIndex) => (
                  <tr key={rowIndex}>
                    {Array.from({ length: 7 }).map((_, colIndex) => {
                      const day = days[rowIndex * 7 + colIndex];
                      return (
                        <td key={colIndex} className="pt-1">
                          <div className="px-2 py-2 cursor-pointer flex w-full justify-center">
                            {day ? (
                              <p
                                className={`text-base ${
                                  day.isSame(dayjs(), 'day') ? 'bg-black  text-white px-3 py-1 rounded-full' : 'text-black'
                                } text-black font-medium`}
                              >
                                {day.date()}
                              </p>
                            ) : (
                              <div></div>
                            )}
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
