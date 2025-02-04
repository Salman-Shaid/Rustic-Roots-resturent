import React from "react";
import { Link } from "react-router-dom";
import { FaArrowCircleLeft } from "react-icons/fa";

import notFoundAnimation from "../../assets/animation/error.json";
import Lottie from "react-lottie";

const NotFoundPage = () => {
  
  const defaultOptions = {
    loop: true,   
    autoplay: true, // Auto start the animation
    animationData: notFoundAnimation,  // The animation data
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-gray-800">
      
      <Lottie options={defaultOptions} height={350} width={500} className="mb-4" />

      <h1 className="text-7xl text-red-600 font-bold mb-4">404</h1>
      
      <h2 className="text-2xl font-semibold mb-2 text-red-600">Oops! Page Not Found</h2>
      <p className="mb-6 text-center text-red-600">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/"
        className="bg-yellow-400 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-600 hover:rounded-3xl items-center flex"
      >
       <FaArrowCircleLeft /> <span className="ml-2">Back to Home</span>
      </Link>
    </div>
  );
};

export default NotFoundPage;
