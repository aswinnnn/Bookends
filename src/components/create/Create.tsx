import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import Sidepanel from '../Sidepanel';
import RichTextEditor from '../common/Editor';
import Notebook from './Notebook';
import Home from '../home/Home';
import Switcher from './Switcher';

const Create = () => {
  const [currentDateTime, setCurrentDateTime] = useState('');
  const [selected, setSelected] = useState<'home' | 'create'>('create');
  const navigate = useNavigate();

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
      <Sidepanel />
      <div className="bg-no-repeat bg-cover create-container bg-[url(/src/assets/4.jpeg)] h-full w-full flex flex-col items-center py-2 px-6">
        {/* Navigation Buttons */}
        <Switcher setSelected={setSelected} />
        {/* Notebook Section */}
        {selected === 'home' ? <Home/> : <Notebook currentDateTime={currentDateTime} />}
      </div>
    </>
  );
};

export default Create;