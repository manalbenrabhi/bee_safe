import React from "react";
import Link from "next/link";
import "./style.css";

const AndroidSmall = () => {
  const pageStyle = {
    backgroundImage: 'url("/bg.png")', // Replace with the path to your background image
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    // Add other background styles as needed
  };

  return (
    <main>
      <div className="android-small" style={pageStyle}>
        <div className="div">
          <Link href="/">
            <div className="text-wrapper">go back home</div>
          </Link>
          <img className="bee" alt="Bee" src="bee1.png" />
          <img className="humidity" alt="Humidity" src="thermometer1.png" />
          <div className="text-wrapper-2">NO details</div>
          <Link href="/page3">
            <img className="arrow" alt="Arrow" src="arrow1.png" />
          </Link>
        </div>
      </div>
    </main>
  );
};

export default AndroidSmall;
