import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router'; // Import useLocation
import Sidepanel from '../Sidepanel';
import Notebook from './Notebook';
import Home from '../home/Home';
import Switcher from './Switcher';
import CustomizePopup from './CustomizePopup';
import { CogIcon } from '@heroicons/react/24/outline';
import { useSelected } from '../../context/SelectedContext';
import { Journal } from '../../models/types';
import { useTheme } from '../../ThemeContext';

const Create = () => {
  const [currentDateTime, setCurrentDateTime] = useState('');
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>(null);
  const [isCustomizeOpen, setIsCustomizeOpen] = useState(false);
  const location = useLocation(); // Access location to retrieve state
  const journalData: Journal = location.state?.journal; // Retrieve journal data from navigation state
  console.log(journalData);
  console.info("above is journal data rn")
  const {selected} = useSelected(); // Use the selected context
  const [journalId, setJournalId] = useState<string>(journalData?.id || "new");
  const [updatingState, setUpdatingState] = useState<boolean>(false);
  const {loadTheme} = useTheme();

  useEffect(() => {
    const now = new Date();
    const formattedDateTime = now.toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
    setCurrentDateTime(formattedDateTime);
  }, []);

  const handleContextMenu = (e: React.MouseEvent) => {
    if (selected === 'create' && window.innerWidth > 768) {
      e.preventDefault();
      const target = e.target as HTMLElement;

      // Prevent context menu on the sidepanel or Slate editor
      if (target.closest('.sidepanel') || target.closest('.notebook')) return;

      setContextMenu({ x: e.clientX, y: e.clientY });
    }
  };

  const handleClickOutside = () => {
    setContextMenu(null);
  };

  useEffect(() => {
    if (contextMenu) {
      document.addEventListener('click', handleClickOutside);
    } else {
      document.removeEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [contextMenu]);

  useEffect(() => {
    if (selected === 'home') {
      setJournalId('new');
      console.info('[create.tsx] set journalid = new and cleared location state')
      location.state = null;
      loadTheme();
    }
  }, [selected]);

  return (
    <>
      {/* Sidepanel */}
      <Sidepanel />

      {/* Main Content */}
      <div className="h-full w-full" onContextMenu={handleContextMenu}>
        <div
          className="create-container h-full w-full flex flex-col items-center py-2 px-6"
        >
          {/* Navigation Buttons */}
          <Switcher setJournalId={setJournalId} />

          {/* Conditional Rendering for Home or Notebook */}
          {selected === 'home' ? (
            <Home setJournalId={setJournalId} setUpdatingState={setUpdatingState}/>
          ) : (
            <Notebook currentDateTime={currentDateTime} journalData={journalData} journalId={journalId} setJournalId={setJournalId} updatingState={updatingState} setUpdatingState={setUpdatingState} />
          )}
        </div>
      </div>

      {/* Context Menu */}
      {contextMenu && (
        <div
          className="absolute z-50 glass-blur bg-white/10 dark:bg-black/10 backdrop-blur-md border border-white/20 dark:border-black/20 rounded-lg shadow-lg p-2"
          style={{ top: contextMenu.y, left: contextMenu.x }}
        >
          <button
            className="flex items-center gap-2 px-4 py-2 text-sm text-white hover:bg-white/20 dark:text-gray-300 dark:hover:bg-black/20 rounded-md"
            onClick={() => {
              setIsCustomizeOpen(true);
              setContextMenu(null);
            }}
          >
            <CogIcon className="h-5 w-5" />
            Customize
          </button>
        </div>
      )}

      {/* Customize Popup */}
      {isCustomizeOpen && (
        <CustomizePopup onClose={() => setIsCustomizeOpen(false)} journalId={journalId} />
      )}
    </>
  );
};

export default Create;