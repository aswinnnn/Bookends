import React, { useState, useRef } from "react";
import RichTextEditor from "../common/Editor";

interface NotebookProps {
  currentDateTime: string;
}

const Notebook: React.FC<NotebookProps> = ({ currentDateTime }) => {
  const [tagInput, setTagInput] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);
  const availableTags = [
    "morning",
    "reflection",
    "personal",
    "coding",
    "learning",
    "react",
    "night",
    "thoughts",
    "adventure",
    "nature",
    "hiking",
    "coffee",
    "routine",
    "mindfulness",
    "space",
    "cosmos",
    "wonder",
    "beach",
    "relaxation",
    "urban",
    "exploration",
    "architecture",
  ];

  const suggestionsRef = useRef<HTMLUListElement>(null);
  const tagInputRef = useRef<HTMLDivElement>(null);

  const handleTagInputChange = () => {
    setTagInput(tagInputRef.current?.textContent || "");
    setHighlightedIndex(-1); // Reset highlighted index when input changes
  };

  const handleTagSelect = (tag: string) => {
    if (!selectedTags.includes(tag)) {
      setSelectedTags([...selectedTags, tag]);
    }
    setTagInput("");
    if (tagInputRef.current) tagInputRef.current.textContent = ""; // Clear the contentEditable div
    setHighlightedIndex(-1); // Reset highlighted index after selection
  };

  const handleTagRemove = (tag: string) => {
    setSelectedTags(selectedTags.filter((t) => t !== tag));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (filteredTags.length > 0 || tagInput.trim()) {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setHighlightedIndex((prevIndex) => (prevIndex + 1) % filteredTags.length);
        scrollToHighlighted();
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setHighlightedIndex((prevIndex) =>
          prevIndex <= 0 ? filteredTags.length - 1 : prevIndex - 1
        );
        scrollToHighlighted();
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (highlightedIndex >= 0) {
          handleTagSelect(filteredTags[highlightedIndex]);
        } else if (tagInput.trim()) {
          handleTagSelect(tagInput.trim()); // Create a new tag if no suggestion is highlighted
        }
      } else if (e.key === " ") {
        e.preventDefault();
        if (tagInput.trim()) {
          handleTagSelect(tagInput.trim()); // Create a new tag on space
        }
      }
    }
  };

  const scrollToHighlighted = () => {
    if (suggestionsRef.current) {
      const highlightedItem = suggestionsRef.current.children[highlightedIndex] as HTMLElement;
      if (highlightedItem) {
        highlightedItem.scrollIntoView({ block: "nearest" });
      }
    }
  };

  const filteredTags = availableTags.filter(
    (tag) => tag.toLowerCase().includes(tagInput.toLowerCase()) && !selectedTags.includes(tag)
  );

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
        tabIndex={1}
      />

      {/* Tag Picker */}
      <div
        className="flex items-center flex-wrap gap-2 mb-4 relative group"
        onMouseEnter={() => {
          if (tagInputRef.current) tagInputRef.current.style.display = "block";
        }}
        onMouseLeave={() => {
          if (tagInputRef.current && selectedTags.length > 0) {
            tagInputRef.current.style.display = "none";
          }
        }}
      >
        {/* Selected Tags */}
        {selectedTags.map((tag) => (
          <div
            key={tag}
            className="flex items-center gap-2 bg-gradient-to-br from-white/30 to-white/10 dark:from-black/30 dark:to-black/10 backdrop-blur-md border border-white/20 dark:border-black/20 text-bookends-text dark:text-gray-200 px-3 py-1 rounded-full shadow-md"
          >
            <span>{tag}</span>
            <button
              onClick={() => handleTagRemove(tag)}
              className="text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition"
              tabIndex={-1}
            >
              ✕
            </button>
          </div>
        ))}

        {/* Tag Input */}
        <div
          ref={tagInputRef}
          contentEditable
          suppressContentEditableWarning
          onInput={handleTagInputChange}
          onKeyDown={handleKeyDown}
          className={`tag-input flex-grow bg-transparent text-white dark:text-white-200 font-body text-sm md:text-base px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:border-bookends-accent dark:focus:border-bookends-accent-light placeholder-style ${
            selectedTags.length > 0 ? "hidden group-hover:block" : ""
          }`}
          data-placeholder="Add a tag..."
          tabIndex={2}
        />
      </div>

      {/* Tag Suggestions */}
      {tagInput && filteredTags.length > 0 && (
        <ul
          ref={suggestionsRef}
          className="absolute glass-blur z-10 mt-2 w-full bg-gradient-to-br from-white/30 to-white/10 dark:from-black/30 dark:to-black/10 backdrop-blur-md border border-white/20 dark:border-black/20 rounded-lg shadow-lg max-h-40 overflow-y-auto"
        >
          {filteredTags.map((tag, index) => (
            <li
              key={tag}
              onClick={() => handleTagSelect(tag)}
              className={`px-3 py-2 text-bookends-text dark:text-gray-200 hover:bg-white/20 dark:hover:bg-black/20 cursor-pointer transition ${
                highlightedIndex === index ? "bg-white/60 dark:bg-black/60" : ""
              }`}
              tabIndex={-1}
            >
              {tag}
            </li>
          ))}
        </ul>
      )}

      {/* Writing Area */}
      <RichTextEditor />
    </div>
  );
};

export default Notebook;