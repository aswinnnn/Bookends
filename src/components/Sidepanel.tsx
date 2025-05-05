import { useState, useRef, useEffect } from "react";
import { Switch } from "@headlessui/react";
import { HomeIcon, PlusCircleIcon, InformationCircleIcon, Cog6ToothIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router";
import { useTheme } from "../ThemeContext";
import { useSelected } from "../context/SelectedContext";

const Sidepanel = () => {
  const {setSelected} = useSelected();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const sidepanelRef = useRef<HTMLDivElement>(null);
  const toggleButtonRef = useRef<HTMLButtonElement>(null);
  const { lightTheme, darkTheme, themeMode, toggleThemeMode } = useTheme();

  // Determine the current theme based on themeMode
  const currentTheme = themeMode === "light" ? lightTheme : darkTheme;

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
        className={`fixed top-[40px] z-50 flex items-center justify-center h-12 w-12 rounded-full shadow-lg transition-all duration-500 ease-in-out ${
          isOpen ? "left-[70%] md:left-[240px] lg:left-[300px]" : "left-2"
        }`}
        style={{
          background: `linear-gradient(135deg, ${currentTheme.secondary}80, ${currentTheme.secondary}50)`,
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          border: `1px solid ${themeMode === "dark" ? currentTheme.primary : currentTheme.secondary}`,
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2), inset 0 1px 1px rgba(255, 255, 255, 0.3)",
        }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-white dark:text-gray-300 text-lg font-bold">{isOpen ? "←" : "☰"}</span>
      </button>

      {/* Sidepanel */}
      <div
        ref={sidepanelRef}
        className={`fixed top-[30px] left-0 h-[calc(100%-30px)] w-[70%] md:w-[240px] lg:w-[360px] shadow-lg z-40 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-500 ease-in-out`}
        style={{
          background: `linear-gradient(135deg, ${currentTheme.secondary}80, ${currentTheme.secondary}50)`,
          backdropFilter: "blur(15px)",
          WebkitBackdropFilter: "blur(15px)",
          border: `1px solid ${themeMode === "dark" ? currentTheme.primary : currentTheme.secondary}`,
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2), inset 0 1px 1px rgba(255, 255, 255, 0.3)",
        }}
      >
        {/* Profile Header */}
        <div
          className="p-4 border-b"
          style={{
            borderColor: themeMode === "dark" ? currentTheme.primary : currentTheme.secondary,
            background: `linear-gradient(to bottom, ${currentTheme.primary}30, transparent)`,
          }}
        >
          <div className="flex items-center gap-4">
            <div
              className="h-12 w-12 rounded-full flex items-center justify-center text-white font-bold"
              style={{
                background: `linear-gradient(135deg, ${currentTheme.accent}, ${currentTheme.primary})`,
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3), inset 0 1px 1px rgba(255, 255, 255, 0.5)",
              }}
            >
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
              style={{
                backdropFilter: "blur(5px)",
                WebkitBackdropFilter: "blur(5px)",
              }}
              onClick={() => {
                setSelected("home");
                navigate("/create");
              }}
            >
              <HomeIcon className="h-6 w-6" style={{ color: currentTheme.accent }} />
              <span className="text-white dark:text-gray-300 text-sm font-medium">Home</span>
            </li>
            <li
              className="flex items-center gap-3 hover:bg-white/20 dark:hover:bg-black/20 p-2 rounded-lg cursor-pointer transition"
              style={{
                backdropFilter: "blur(5px)",
                WebkitBackdropFilter: "blur(5px)",
              }}
              onClick={() => {
                setSelected("create");
                navigate("/create");
              }}
            >
              <PlusCircleIcon className="h-6 w-6" style={{ color: currentTheme.accent }} />
              <span className="text-white dark:text-gray-300 text-sm font-medium">Create</span>
            </li>
            <li
              className="flex items-center gap-3 hover:bg-white/20 dark:hover:bg-black/20 p-2 rounded-lg cursor-pointer transition"
              style={{
                backdropFilter: "blur(5px)",
                WebkitBackdropFilter: "blur(5px)",
              }}
              onClick={() => navigate("/about")}
            >
              <InformationCircleIcon className="h-6 w-6" style={{ color: currentTheme.accent }} />
              <span className="text-white dark:text-gray-300 text-sm font-medium">About</span>
            </li>
            <li
              className="flex items-center gap-3 hover:bg-white/20 dark:hover:bg-black/20 p-2 rounded-lg cursor-pointer transition"
              style={{
                backdropFilter: "blur(5px)",
                WebkitBackdropFilter: "blur(5px)",
              }}
              onClick={() => navigate("/settings")}
            >
              <Cog6ToothIcon className="h-6 w-6" style={{ color: currentTheme.accent }} />
              <span className="text-white dark:text-gray-300 text-sm font-medium">Settings</span>
            </li>
          </ul>
        </div>

        {/* Dark Mode Switch */}
        <div
          className="p-4 border-t"
          style={{
            borderColor: themeMode === "dark" ? currentTheme.primary : currentTheme.secondary,
            background: `linear-gradient(to top, ${currentTheme.primary}30, transparent)`,
          }}
        >
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-white dark:text-gray-300">Dark Mode</span>
            <Switch
              checked={themeMode === "dark"}
              onChange={toggleThemeMode}
              className={`${
                themeMode === "dark" ? "bg-bookends-dark-accent/70" : "bg-bookends-accent/70"
              } relative inline-flex h-6 w-12 items-center rounded-full transition`}
            >
              <span
                className={`${
                  themeMode === "dark" ? "translate-x-6" : "translate-x-1"
                } inline-block h-4 w-4 transform rounded-full bg-amber-50 transition`}
              />
              <span className="absolute left-1 text-xs">{themeMode === "dark" ? "🌙" : "☀️"}</span>
            </Switch>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidepanel;