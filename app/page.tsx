import React from "react";
import Link from "next/link";
import "./globals.css";

const AndroidSmall: React.FC = (): JSX.Element => {
  // Replace these with the actual values you want to pass as query parameters
  const locationValue = "someLocationValue";
  const destinationValue = "someDestinationValue";

  const pageStyle: React.CSSProperties = {
    backgroundImage: 'url("/bg.png")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    // Add other styles as needed
  };

  return (
    <div> 
    <Link href={`/page2?from=${locationValue}&to=${destinationValue}`} passHref>
      {/* Apply styles to the div directly to make it clickable */}
      <div className="android-small" style={pageStyle}>
        <div className="div">
          <div className="overlap-group">
            <div className="text-wrapper">Check Your Bee Hive Health</div>
          </div>
          <div className="text-wrapper-2">WELCOME TO BeeSafe</div>
          <div><img className="bee" alt="Bee" src="bee1.png" /></div>
        </div>
      </div>
    </Link>
    </div>
  );
};

export default AndroidSmall;
