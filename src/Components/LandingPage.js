import React from "react";
import { NavLink } from "react-router";
import { TypeAnimation } from "react-type-animation";

const LandingPage = ({ isLoggedIn }) => {
  return (
    <div className="relative w-full h-screen">
      <video
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source
          src="https://videos.pexels.com/video-files/1851190/1851190-uhd_2560_1440_25fps.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
      <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center">
        <div className="text-center text-white">
          <div className="text-3xl font-bold">
            <TypeAnimation
              sequence={[
                "Cloudy Book For Your Notes",
                1000, // Waits 1s
                "Cloudy Book For Your Events",
                1000, // Waits 2s
                "Cloudy Book For Your Memories",
                1000,
              ]}
              wrapper="span"
              cursor={true}
              repeat={Infinity}
              style={{ fontSize: "2em", display: "inline-block" }}
            />
          </div>
        </div>
        {!isLoggedIn ? (
          <div className="flex space-x-4 mt-10">
            <NavLink
              className="px-6 py-3 bg-sky-500 text-white text-lg rounded-md shadow-lg hover:bg-sky-600 transition-all"
              to="/login"
            >
              Sign In
            </NavLink>
            <NavLink
              className="px-6 py-3 bg-sky-500 text-white text-lg rounded-md shadow-lg hover:bg-sky-600 transition-all"
              to="/signup"
            >
              Sign Up
            </NavLink>
          </div>
        ) : (
          <div className="flex space-x-4 mt-10">
            <NavLink
              className="px-6 py-3 bg-sky-500 text-white text-lg rounded-md shadow-lg hover:bg-sky-600 transition-all"
              to="/"
            >
              Go to Dashboard
            </NavLink>
          </div>
        )}
      </div>
    </div>
  );
};

export default LandingPage;
