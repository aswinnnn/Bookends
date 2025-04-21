import React, { useState, useEffect } from 'react';
import Sidepanel from '../Sidepanel';
import RichTextEditor from '../common/Editor';

const Create = () => {
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
      <Sidepanel />
      <div className="create-container bg-bookends-primary h-full w-full flex justify-center items-start p-6">
        <div className="notebook bg-white shadow-lg rounded-lg p-6 w-full max-w-4xl">
          {/* Date and Time */}
          <div className="date-time wrap-break-word text-gray-600 font-body text-sm md:text-[1.1rem]  mb-2">
            {currentDateTime}
          </div>
          <hr className="border-gray-300 mb-4" />
          {/* Title Input */}
          <input
            type="text"
            className="title-input w-full bg-transparent text-bookends-text font-display text-[2rem] font-bold mb-4 p-2 pl-0 wrap-normal border-b-2 break-w border-gray-300 focus:outline-none focus:border-bookends-accent"
            placeholder="Enter a title for your notebook..."
          />
          {/* Writing Area */}
          <RichTextEditor />
          {/* <textarea
            className="writing-area w-full h-[60vh] bg-bookends-secondary text-bookends-text font-body text-lg p-4 rounded-lg wrap-anywhere shadow-inner resize-none focus:outline-none focus:ring-2 focus:ring-bookends-accent"
            placeholder="Start writing your thoughts here..."
          ></textarea> */}
        </div>
      </div>
    </>
  );
};

export default Create;