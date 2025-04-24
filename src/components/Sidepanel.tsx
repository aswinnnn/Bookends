import React, { useState, useRef, useEffect } from "react";
import { Switch } from "@headlessui/react";
import { HomeIcon, PlusCircleIcon, InformationCircleIcon, Cog6ToothIcon } from "@heroicons/react/24/outline";
import { redirect, redirectDocument, useNavigate } from "react-router";
import { useTheme } from "../ThemeContext";
import { set } from "date-fns";

interface SidepanelProps {
  setSelected: React.Dispatch<React.SetStateAction<"home" | "create">>;
}

const Sidepanel: React.FC<SidepanelProps> = ({setSelected}) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const sidepanelRef = useRef<HTMLDivElement>(null);
  const toggleButtonRef = useRef<HTMLButtonElement>(null);
  const { theme, toggleTheme } = useTheme();

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
        className={`fixed glass-blur top-[40px] bg-gradient-to-br from-white/30 to-white/20 dark:from-black/30 dark:to-black/20 backdrop-blur-md border border-white/10 dark:border-black/20 z-50 flex items-center justify-center h-12 w-12 rounded-full shadow-lg transition-all duration-500 ease-in-out ${
          isOpen ? "left-[70%] md:left-[240px] lg:left-[300px]" : "left-2"
        }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-white dark:text-gray-300 text-lg font-bold">{isOpen ? "←" : "☰"}</span>
      </button>

      {/* Sidepanel */}
      <div
        ref={sidepanelRef}
        className={`fixed glass-blur bg-gradient-to-br from-white/30 to-white/20 dark:from-black/30 dark:to-black/20 backdrop-blur-md border border-white/10 dark:border-black/20 top-[30px] left-0 h-[calc(100%-30px)] w-[70%] md:w-[240px] lg:w-[360px] shadow-lg z-40 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-500 ease-in-out`}
      >
        {/* Profile Header */}
        <div className="p-4 border-b border-white/20 dark:border-black/30">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
              A
            </div>
            <div>
              <h2 className="text-lg font-bold text-white dark:text-gray-300">Aswin</h2>
              <p className="text-sm text-white/70 dark:text-gray-500">aswin@example.com</p>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="p-4">
          <ul className="space-y-4">
            <li
              className="flex items-center gap-3 hover:bg-white/20 dark:hover:bg-black/20 p-2 rounded-lg cursor-pointer transition"
              onClick={() => {setSelected("home");navigate("/create")}}
            >
              <HomeIcon className="h-6 w-6 text-white dark:text-gray-300" />
              <span className="text-white dark:text-gray-300 text-sm font-medium">Home</span>
            </li>
            <li
              className="flex items-center gap-3 hover:bg-white/20 dark:hover:bg-black/20 p-2 rounded-lg cursor-pointer transition"
              onClick={() => {setSelected("create");navigate("/create")}} 
            >
              <PlusCircleIcon className="h-6 w-6 text-white dark:text-gray-300" />
              <span className="text-white dark:text-gray-300 text-sm font-medium">Create</span>
            </li>
            <li
              className="flex items-center gap-3 hover:bg-white/20 dark:hover:bg-black/20 p-2 rounded-lg cursor-pointer transition"
              onClick={() => navigate("/about")}
            >
              <InformationCircleIcon className="h-6 w-6 text-white dark:text-gray-300" />
              <span className="text-white dark:text-gray-300 text-sm font-medium">About</span>
            </li>
            <li
              className="flex items-center gap-3 hover:bg-white/20 dark:hover:bg-black/20 p-2 rounded-lg cursor-pointer transition"
              onClick={() => navigate("/settings")}
            >
              <Cog6ToothIcon className="h-6 w-6 text-white dark:text-gray-300" />
              <span className="text-white dark:text-gray-300 text-sm font-medium">Settings</span>
            </li>
          </ul>
        </div>

        {/* Dark Mode Switch */}
        <div className="p-4 border-t border-white/20 dark:border-black/30">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-white dark:text-gray-300">Dark Mode</span>
            <Switch
              checked={theme === "light"}
              onChange={toggleTheme}
              className={`${
                theme === "dark" ? "bg-blue-500" : "bg-gray-300"
              } relative inline-flex h-6 w-12 items-center rounded-full transition`}
            >
              <span
                className={`${
                  theme === "dark" ? "translate-x-6" : "translate-x-1"
                } inline-block h-4 w-4 transform rounded-full bg-white transition`}
              />
              <span className="absolute left-1 text-xs">{theme === "dark" ? "🌙" : "☀️"}</span>
            </Switch>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidepanel;