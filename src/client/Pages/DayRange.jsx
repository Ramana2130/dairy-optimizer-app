import { CalendarDays, IndianRupee, Milk } from "lucide-react";
import React, { useState } from "react";
import ball from "../assets/ball.png";

const DayRange = () => {
  const [percent, setPercent] = useState(60); // Example percentage value

  const radius = 100; // Radius of the circle
  const strokeWidth = 30; // Width of the stroke
  const circumference = 2 * Math.PI * radius; // Circumference of the circle
  const strokeDashoffset = circumference - (percent / 100) * circumference;
  return (
    <div className="bg-white border  shadow-2xl mx-8 h-[40vh] relative rounded-3xl">
      <div className="absolute -bottom-24 z-0 -left-32">
        {/* <img src={ball} alt="" className="h-52 over" /> */}
      </div>
      <div className="p-6 ">
        <h1 className="text-2xl flex justify-between text-center text-black font-semibold mb-5">
        <span className="text-gree"><CalendarDays  /></span> Month
        </h1>

        <div className="flex z-50 items-center h-[230px]  justify-center">
          <svg className="transform -rotate-90 w-72 h-72">
            <circle
              cx="145"
              cy="145"
              r={radius}
              stroke="currentColor"
              strokeWidth={strokeWidth}
              fill="transparent"
              className="text-black/10"
            />
            <circle
              cx="145"
              cy="145"
              r={radius}
              stroke="currentColor"
              strokeWidth={strokeWidth}
              fill="transparent"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              className="text-black"
            />
          </svg>
          <span className="absolute  -mt-5 font-bold  ml-5 text-5xl text-black">
            {percent}%
          </span>
        </div>
        <h1 className="z-50 text-5xl font-extrabold text-center text-black">
           <span className="text-black/80">21</span> / <span className="text-black">30</span>
        </h1>
        <h1 className="text-black ml-20 text-center font-bold text-sm">
                 per Day
                </h1>
      </div>
    </div>
  );
};

export default DayRange;
