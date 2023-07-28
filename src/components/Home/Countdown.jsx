import React, { useState, useEffect } from 'react';

const CountdownTimer = () => {
  const [countdown, setCountdown] = useState(null);

  useEffect(() => {
    // Generate a random time greater than 1 hour (in milliseconds)
    const randomTimeInMilliseconds = Math.floor(Math.random() * 3600000) + 3600000;

    // Start the countdown
    setCountdown(randomTimeInMilliseconds);

    // Update the countdown every second
    const interval = setInterval(() => {
      setCountdown(prevCountdown => prevCountdown - 1000);
    }, 1000);

    // Clean up the interval when the component is unmounted
    return () => clearInterval(interval);
  }, []);

  // Helper function to convert milliseconds to hh:mm:ss format
  const formatTime = (timeInMilliseconds) => {
    const hours = Math.floor(timeInMilliseconds / 3600000);
    const minutes = Math.floor((timeInMilliseconds % 3600000) / 60000);
    const seconds = Math.floor((timeInMilliseconds % 60000) / 1000);

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div>
      {countdown !== null ? (
        <h1>{formatTime(countdown)}</h1>
      ) : (
        <h1>Offer ended</h1>
      )}
    </div>
  );
};

export default CountdownTimer;
