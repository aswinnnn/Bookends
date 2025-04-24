import React from 'react'
import RichTextEditor from '../common/Editor'

interface NotebookProps {
  currentDateTime: string;
}

const Notebook: React.FC<NotebookProps> = ({ currentDateTime }) => {
  return (
    <div className="notebook glass-blur bg-gradient-to-br from-white/30 to-white/10 dark:from-black/30 dark:to-black/10 backdrop-blur-md border border-white/20 dark:border-black/20 rounded-md p-6 w-full max-w-4xl shadow-lg">
      {/* Date and Time */}
      <div className="date-time text-gray-600 dark:text-gray-400 font-body text-sm md:text-[1.1rem] mb-2">
        {currentDateTime}
      </div>
      <hr className="border-gray-300 dark:border-gray-600 mb-4" />
      {/* Title Input */}
      <input
        type="text"
        className="title-input w-full bg-transparent text-bookends-text dark:text-gray-200 font-display text-[2rem] font-bold mb-4 p-2 pl-0 border-b-2 border-gray-300 dark:border-gray-600 focus:outline-none focus:border-bookends-accent dark:focus:border-bookends-accent-light"
        placeholder="A title for the day..."
      />
      {/* Writing Area */}
      <RichTextEditor />
    </div>
  )
}

export default Notebook