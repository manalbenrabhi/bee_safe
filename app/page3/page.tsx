"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import "./style.css";



const AndroidSmall = () => {
  const [apiResponse, setApiResponse] = useState<any | null>(null);

  const pageStyle = {
    backgroundImage: 'url("/bg.png")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    // Add other styles as needed
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://192.168.43.201:2000");

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setApiResponse(data);
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
        <Link href="/">
          <div className="text-wrapper">go back home</div>
        </Link>
        <div>
        <img className="bee" alt="Bee" src="bee1.png" /></div>
        <div>
        <img className="humidity" alt="Humidity" src="humidity1.png" /></div>
        <div>
        <img className="weight" alt="Weight" src="weight1.png" /></div>
        <div>
        <img className="thermometer-1" alt="Thermometer" src="thermometer1.png" /></div>
        <div><Link href="/humidity">
          <div className="text-wrapper-2">
          See More
          </div>
        </Link></div>
        <div>
        <Link href="/weight" >
          <div className="text-wrapper-6">See More</div>
        </Link></div>
        <div>
        <Link href="/thermometer">
          <div className="text-wrapper-7">See More</div>
        </Link></div>
        <div className="text-wrapper-3">{apiResponse ? `${apiResponse.temperature}` : 'Loading...'}</div>
        <div className="text-wrapper-4">{apiResponse ? `${apiResponse.weight}` : 'Loading...'}</div>
        <div className="text-wrapper-5">{apiResponse ? `${apiResponse.humidity}` : 'Loading...'}</div>
        </div>
    </div>
  );
};

export default AndroidSmall;
