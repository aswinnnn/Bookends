import React from 'react';
import { useSelected } from '../../context/SelectedContext';
import { useTheme } from '../../ThemeContext';
import { select } from 'slate';

interface SwticherProps {
  setJournalId: React.Dispatch<React.SetStateAction<string>>
}
const Switcher: React.FC<SwticherProps> = ({setJournalId}) => {
  const {selected, setSelected} = useSelected();
  const { themeMode, lightTheme, darkTheme } = useTheme();
  const currentTheme = themeMode === "light" ? lightTheme : darkTheme;

  const handleClick = (selected: 'home' | 'create') => {
    setSelected(selected);
    if (selected === 'create') {
      setJournalId("new");
    }
    console.log(`Selected: ${selected}`);
  };

  return (
    <div className="relative flex items-center justify-center w-fit h-fit mb-4">
      {/* Glassmorphic Label */}
      <div
        className={`absolute top-0 left-0 h-full w-1/2 bg-gradient-to-br from-white/50 to-white/30 dark:from-black/20 dark:to-black/10 backdrop-blur-md border border-white/20 text-shadow rounded-b-xl shadow-md transition-all duration-300 ease-in-out ${
          selected === 'home' ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{
          background: `linear-gradient(135deg, ${currentTheme.secondary}40, ${currentTheme.secondary}20)`,
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
        }}
      ></div>

      {/* Buttons */}
      <button
        className={`relative z-10 text-4xl px-4 py-2 transition-all duration-300 ease-in-out ${
          selected === 'home'
            ? 'text-bookends-accent'
            : 'text-gray-500 dark:text-gray-400'
        }`}
        onClick={() => handleClick('home')}
      >
        🏡
      </button>
      <button
        className={`relative z-10 text-4xl px-4 py-2 transition-all duration-300 ease-in-out ${
          selected === 'create'
            ? 'text-bookends-accent'
            : 'text-gray-500 dark:text-gray-400'
        }`}
        onClick={() => handleClick('create')}
      >
        🌻
      </button>
    </div>
  );
};

export default Switcher;