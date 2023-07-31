import React, { useState, useEffect } from "react";

function HWButton() {
  // State to store the fetched data
  const [result, setResult] = useState([{}]);

  // Function to fetch hardware data from the server
  const fetchdata = () => {
    fetch("/hardware")
      .then((res) => res.json())
      .then((data) => {
        // If the fetched data is different from the current result, update the state
        if (JSON.stringify(data) !== JSON.stringify(result)) {
          setResult(data);
        }
      });
  };

  // useEffect hook to fetch data initially and at regular intervals
  useEffect(() => {
    // Fetch data initially
    fetchdata();

    // Fetch data every 2 seconds and store the interval ID directly
    const intervalID = setInterval(fetchdata, 2000);

    // Clean up the interval on component unmount
    return () => clearInterval(intervalID);
  }, []);

  return (
    <div>
      <h1>Current hardware resource:</h1>
      {result.map((hw) => (
        <div key={hw.hwID}>
          <p>Hardware: {hw.hwID}</p>
          <p>Availability: {hw.availability}</p>
          <p>Capacity: {hw.capacity}</p>
          <p>Checkedout: {hw.checkedout}</p>
          <hr></hr>
        </div>
      ))}
    </div>
  );
}

export default HWButton;
