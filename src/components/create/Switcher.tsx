import React, { useEffect, useState } from 'react';

interface SwitcherProps {
  setSelected: React.Dispatch<React.SetStateAction<'home' | 'create'>>;
  selected: string
}

const Switcher: React.FC<SwitcherProps> = ({ setSelected, selected }) => {

  const handleClick = (selected: 'home' | 'create') => {
    setSelected(selected);
    console.log(`Selected: ${selected}`);
  };

  return (
    <div className="relative flex items-center justify-center w-fit h-fit mb-4">
      {/* Glassmorphic Label */}
      <div
        className={`absolute top-0 left-0 h-full w-1/2 bg-gradient-to-br from-white/50 to-white/30 backdrop-blur-md border border-white/20 rounded-b-xl shadow-md transition-all duration-300 ease-in-out ${
          selected === 'home' ? 'translate-x-0' : 'translate-x-full'
        }`}
      ></div>

      {/* Buttons */}
      <button
        className={`relative z-10 text-white text-4xl px-4 py-2 ${
          selected === 'home' ? 'text-bookends-accent' : 'text-gray-500'
        }`}
        onClick={() => handleClick('home')}
      >
        🏡
      </button>
      <button
        className={`relative z-10 text-4xl px-4 py-2 ${
          selected === 'create' ? 'text-bookends-accent' : 'text-gray-500'
        }`}
        onClick={() => handleClick('create')}
      >
        🌻
      </button>
    </div>
  );
};

export default Switcher;