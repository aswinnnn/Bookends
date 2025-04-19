import React, { useState } from "react";
import { HomeIcon, InformationCircleIcon, StarIcon, PhoneIcon, ChevronDoubleLeftIcon, ChevronDoubleRightIcon } from "@heroicons/react/outline";

function Sidepanel() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Toggle Button */}
      <button
        className={`fixed top-[30px] z-50 bg-bookends-secondary text-white p-2 transition-transform duration-500 ease-in-out outline-0 ${
          isOpen ? "translate-x-30 md:translate-x-60 lg:translate-x-64" : "translate-x-0"
        }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <ChevronDoubleLeftIcon  color="#fff" className="h-3 w-3 md:h-6 md:w-6" />
        ) : (
          <ChevronDoubleRightIcon color="#fff" className="h-3 w-3 md:h-6 md:w-6" />
        )}
      </button>

      {/* Sidepanel */}
      <div
        className={`fixed top-[30px] left-0 h-[calc(100%-30px)] w-[40%] md:w-[240px] lg:w-[300px] bg-bookends-secondary shadow-lg z-40 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-500 ease-in-out`}
      >
        <div className="p-4">
          <h2 className="text-xs md:text-xl font-bold text-black mb-4">Menu</h2>
          <ul className="text-xs md:text-xl space-y-3">
            <li className="flex items-center hover:bg-gray-200 p-2 rounded cursor-pointer transition">
              <HomeIcon className="h-5 w-5 text-black mr-3" />
              <a href="#home" className="text-black">
                Home
              </a>
            </li>
            <li className="flex items-center hover:bg-gray-200 p-2 rounded cursor-pointer transition">
              <InformationCircleIcon className="h-5 w-5 text-black mr-3" />
              <a href="#about" className="text-black">
                About
              </a>
            </li>
            <li className="flex items-center hover:bg-gray-200 p-2 rounded cursor-pointer transition">
              <StarIcon className="h-5 w-5 text-black mr-3" />
              <a href="#features" className="text-black">
                Features
              </a>
            </li>
            <li className="flex items-center hover:bg-gray-200 p-2 rounded cursor-pointer transition">
              <PhoneIcon className="h-5 w-5 text-black mr-3" />
              <a href="#contact" className="text-black">
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>

    </>
  );
}

export default Sidepanel;