import Image from "next/image";
import React from "react";

const CallToAction = () => {
  return (
    <div className="w-full mt-20 mb-10 relative h-80">
      <Image
        src="/landing-call-to-action.jpg"
        alt="landing call to action"
        fill
        className="object-cover object-center "
      />
      <div className="bg-black opacity-50 absolute inset-0 h-full w-full" />
      <div className="absolute max-w-4xl mx-auto inset-0 gap-5 flex items-center justify-center md:justify-between flex-col md:flex-row">
        <div className="flex items-center justify-center">
          <p className="text-xl font-bold text-white">
            Find Your Dream rental Property
          </p>
        </div>
        <div className="flex flex-col gap-5 items-center justify-center">
          <p className="text-xs text-white ">
            Discover a wide range or rental properties in your desired location.
          </p>
          <div className="flex gap-5 items-center max-md:justify-center w-full">
            <button className="text-black bg-white text-xs px-4 py-3 rounded-md ">
              Search
            </button>
            <button className="bg-secondary-500 text-white px-4 py-3 rounded-md text-xs">
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CallToAction;
