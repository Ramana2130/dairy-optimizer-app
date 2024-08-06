import React, { useState, useEffect } from 'react';

const Time = () => {
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
    <div>
      <h1>Current Time: {currentTime}</h1>
    </div>
  );
};

export default Time;
