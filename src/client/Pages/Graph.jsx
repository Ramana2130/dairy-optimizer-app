import React, { useEffect, useState } from "react";
import { Activity } from "lucide-react";
import '../index.css';

const Graph = () => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    // Trigger the animation after the component mounts
    setAnimate(true);
  }, []);

  return (
    <div className="p-4">
      <div className="rounded-xl bg-white backdrop-blur-3xl  h-[330px] w-96 mx-auto pt-6 shadow-xl border border-grey/20">
      <h1 className="text-grey text-xl font-medium  pl-5 flex items-center">
        <span className="mr-3 text-rose-500 h-5">
          <Activity />
        </span>
        Activity
      </h1>
        <div className="px-6 flex flex-col -mt-10 h-full">
          <div className="grid grid-cols-7 gap-1 flex-grow items-end p-3">
            {[
              { color: "#F43F5E", height: 64, label: "MON" },
              { color: "#F43F5E", height: 89, label: "TUE" },
              { color: "#F43F5E", height: 180, label: "WED" },
              { color: "#F43F5E", height: 42, label: "THUR" },
              { color: "#F43F5E", height: 96, label: "FRI" },
              { color: "#F43F5E", height: 152, label: "SAT" },
              { color: "#F43F5E", height: 90, label: "SUN" },
            ].map((item, index) => (
              <div key={index} className="flex flex-col items-center">
                <div
                  className={`rounded-full bar ${animate ? 'animate' : ''}`}
                  style={{
                    width: "16px",
                    height: animate ? `${item.height}px` : '0px',
                    backgroundColor: item.color,
                  }}
                ></div>
                <div className="text-center text-sm text-grey font-semibold mt-2">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Graph;
