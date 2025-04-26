import React, { useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router';
import Sidepanel from '../Sidepanel';
import RichTextEditor from '../common/Editor';
import Notebook from './Notebook';
import Home from '../home/Home';
import Switcher from './Switcher';
import About from '../about/About';
import Settings from '../settings/Settings';

const Create = () => {
  const [currentDateTime, setCurrentDateTime] = useState('');
  const [selected, setSelected] = useState<'home' | 'create'>('create');
  const navigate = useNavigate();
  const wallpaperUrl = '/src/assets/6.jpg';

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
        className="wallpaper h-full w-full bg-no-repeat bg-center bg-cover"
        style={{
          backgroundImage: `url(${wallpaperUrl})`,
        }}
      >
        <div className="create-container h-full w-full flex flex-col items-center py-2 px-6">
          {/* Navigation Buttons */}
          <Switcher setSelected={setSelected} selected={selected}/>
          {/* Notebook Section */}
          {selected === 'home' ? <Home /> : <Notebook currentDateTime={currentDateTime} />}
        </div>
      </div>
      <Routes>
        <Route path="/settings" element={<Settings setSelected={setSelected}/>}/>
        <Route path="/about" element={<About setSelected={setSelected}/>}/>
      </Routes>
    </>
  );
};

export default Create;