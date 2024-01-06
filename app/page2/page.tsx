"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import "./style.css";

const AndroidSmall: React.FC = (): JSX.Element => {
  const pageStyle = {
    backgroundImage: 'url("/bg.png")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    width: '100%', // Make sure the width is set to 100%
    height: '100vh', // Set the height to 100% of the viewport height
    // Add other styles as needed
  };
  

  // State to store real-time data and API response
  const [realTimeData, setRealTimeData] = useState<{
    temperature: number | null;
    humidity: number | null;
  }>({
    temperature: null,
    humidity: null,
  });
  const [apiResponse, setApiResponse] = useState<any>(null);

  // Determine hive state based on temperature or humidity values
  const determineHiveState = () => {
    const { temperature, humidity } = realTimeData;

    if (temperature !== null && humidity !== null) {
      if (temperature > 20 && humidity > 50) {
        return "Better";
      } else if (temperature > 10 && humidity > 30) {
        return "Okay";
      } else {
        return "Not Okay";
      }
    }

    // Handle the case when either temperature or humidity is null
    return "Unknown";
  };

  // Use the useEffect hook to fetch real-time data and update the state
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://192.168.43.201:2000");

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setApiResponse(data);
        setRealTimeData({
          temperature: data?.temperature || null,
          humidity: data?.humidity || null,
        });
      } catch (error) {
        console.error('Error fetching API response:', error);

        if (error instanceof SyntaxError) {
          console.error('Invalid JSON format in the API response.');
        }

        setApiResponse('Error fetching API response');
      }
    };

    fetchData();
  }, []);

  return (
    <div className="android-small" style={pageStyle}>
      <div className="div">
        <div className="overlap">
          <Link href={`/page3`} passHref>
            <p className="text-wrapper">Click me to see more details</p>
          </Link>
          <img className="bee" alt="Bee" src="bee1.png" />
        </div>

        <div className="text-wrapper-2">
          {realTimeData.temperature !== null && realTimeData.humidity !== null ? (
            realTimeData.temperature > 20 && realTimeData.humidity > 50 ? (
              <span style={{ color: "green" }}>--------</span>
            ) : realTimeData.temperature > 10 && realTimeData.humidity > 30 ? (
              <span style={{ color: "orange" }}>--------</span>
            ) : (
              <span style={{ color: "red" }}>--------</span>
            )
          ) : (
            <span style={{ color: "gray" }}>--------</span>
          )}
        </div>

        <p className="p">
          Your Hive State Is:<br />
          {determineHiveState()}
        </p>

        <img className="beehive" alt="Beehive" src="beehive2.png" />
      </div>
    </div>
  );
};

export default AndroidSmall;
