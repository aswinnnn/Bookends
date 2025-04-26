import React, { useState, useRef, useEffect } from "react";
import { Switch } from "@headlessui/react";
import {
  HomeIcon,
  PlusCircleIcon,
  InformationCircleIcon,
  Cog6ToothIcon,
  MoonIcon,
  SunIcon,
} from "@heroicons/react/24/outline";
import { useNavigate } from "react-router";

interface SidepanelProps {
  setSelected: React.Dispatch<React.SetStateAction<"home" | "create">>
}

const Sidepanel: React.FC<SidepanelProps> = ({setSelected}) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const sidepanelRef = useRef<HTMLDivElement>(null);
  const toggleButtonRef = useRef<HTMLButtonElement>(null);

  // Close sidepanel when clicking outside
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        sidepanelRef.current &&
        !sidepanelRef.current.contains(event.target as Node) &&
        toggleButtonRef.current &&
        !toggleButtonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen]);

  return (
    <>
      {/* Glassmorphic Toggle Button */}
      <button
        ref={toggleButtonRef}
        className={`fixed top-[40px] z-50 flex items-center justify-center h-12 w-12 rounded-full bg-white/10 backdrop-blur-md shadow-lg border border-white/20 transition-all duration-500 ease-in-out ${
          isOpen ? "left-[70%] md:left-[240px] lg:left-[300px]" : "left-2"
        }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-white text-lg font-bold">
          {isOpen ? "←" : "☰"}
        </span>
      </button>

      {/* Sidepanel */}
      <div
        ref={sidepanelRef}
        className={`fixed top-[30px] left-0 h-[calc(100%-30px)] w-[70%] md:w-[240px] lg:w-[300px] bg-white/10 backdrop-blur-md shadow-lg z-40 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-500 ease-in-out`}
      >
        {/* Profile Header */}
        <div className="p-4 border-b border-white/20">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
              A
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Aswin</h2>
              <p className="text-sm text-white/70">aswin@example.com</p>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="p-4">
          <ul className="space-y-4">
            <li
              className="flex items-center gap-3 hover:bg-white/20 p-2 rounded-lg cursor-pointer transition"
              onClick={() => setSelected("home")}
            >
              <HomeIcon className="h-6 w-6 text-white" />
              <span className="text-white text-sm font-medium">Home</span>
            </li>
            <li
              className="flex items-center gap-3 hover:bg-white/20 p-2 rounded-lg cursor-pointer transition"
              onClick={() => setSelected("create")}
            >
              <PlusCircleIcon className="h-6 w-6 text-white" />
              <span className="text-white text-sm font-medium">Create</span>
            </li>
            <li
              className="flex items-center gap-3 hover:bg-white/20 p-2 rounded-lg cursor-pointer transition"
              onClick={() => navigate("/about")}
            >
              <InformationCircleIcon className="h-6 w-6 text-white" />
              <span className="text-white text-sm font-medium">About</span>
            </li>
            <li
              className="flex items-center gap-3 hover:bg-white/20 p-2 rounded-lg cursor-pointer transition"
              onClick={() => navigate("/settings")}
            >
              <Cog6ToothIcon className="h-6 w-6 text-white" />
              <span className="text-white text-sm font-medium">Settings</span>
            </li>
          </ul>
        </div>

        {/* Dark Mode Switch */}
        <div className="p-4 border-t border-white/20">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-white">Dark Mode</span>
            <Switch
              checked={isDarkMode}
              onChange={setIsDarkMode}
              className={`${
                isDarkMode ? "bg-blue-500" : "bg-gray-300"
              } relative inline-flex h-6 w-12 items-center rounded-full transition`}
            >
              <span
                className={`${
                  isDarkMode ? "translate-x-6" : "translate-x-1"
                } inline-block h-4 w-4 transform rounded-full bg-white transition`}
              />
              <span className="absolute left-1 text-xs">
                {isDarkMode ? "🌙" : "☀️"}
              </span>
            </Switch>
          </div>
        </div>
      </div>
    </>
  );
}

export default Sidepanel;