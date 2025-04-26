import React, { useState, useEffect } from 'react';
import Sidepanel from '../Sidepanel';
import Notebook from './Notebook';
import Home from '../home/Home';
import Switcher from './Switcher';

interface CreateProps {
  selected: 'home' | 'create';
  setSelected: React.Dispatch<React.SetStateAction<'home' | 'create'>>;
}

const Create: React.FC<CreateProps> = ({selected, setSelected}) => {
  const [currentDateTime, setCurrentDateTime] = useState('');

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

  return (
    <>
    <Sidepanel setSelected={setSelected} />
      <div
        className="h-full w-full "
      >
        <div className="create-container h-full w-full flex flex-col items-center py-2 px-6">
          {/* Navigation Buttons */}
          <Switcher setSelected={setSelected} selected={selected}/>
          {/* Notebook Section */}
          {selected === 'home' ? <Home /> : <Notebook currentDateTime={currentDateTime} />}
        </div>
      </div>
    </>
  );
};

export default Create;