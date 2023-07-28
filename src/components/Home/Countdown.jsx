import React, { useState, useEffect } from 'react';

const CountdownTimer = ( {deadline}) => {
  const [timeLeft, setTimeLeft] = useState(0); // Initializing state with the useState hook to track the time left until the deadline

  // Using the useEffect hook to update the time left and set a timer that counts down every second
  useEffect(() => {
    const newDeadline = new Date(deadline).getTime(); // Getting the deadline as a timestamp
    const now = new Date().getTime(); // Getting the current time as a timestamp
    const difference = newDeadline - now; // Calculating the difference between the deadline and the current time
    setTimeLeft(difference); // Updating the time left with the difference
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1000); // Counting down every second
    }, 1000);
    return () => clearInterval(timer); // Clearing the timer when the component unmounts or the deadline changes
  }, [deadline]);

  // Helper function to convert milliseconds to hh:mm:ss format
  const formatTime = (timeInMilliseconds) => {
    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    return `${days.toString().padStart(2, '0')}:${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const theme = timeLeft>259200000 ? "green" : "red";

  return (
    <div>
      {timeLeft > 0 ? (
        <h1 style={{color:{theme}}}><i className="fa fa-clock text-xs text-[14px]" /> {formatTime(deadline)}</h1>
      ) : (
        <h1>Offer ended :( </h1>
      )}
    </div>
  );
};

export default CountdownTimer;
