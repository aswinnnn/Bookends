import React, { useState, useRef, useEffect } from "react";
import RichTextEditor from "../common/Editor";
import { update_journal } from "../../services/journal";
import { Journal } from "../../models/types";

interface NotebookProps {
  currentDateTime: string;
  journalData?: Journal,
  journalId: string;
  setJournalId: React.Dispatch<React.SetStateAction<string>>;
  updatingState: boolean;
  setUpdatingState: React.Dispatch<React.SetStateAction<boolean>>;
}

const Notebook: React.FC<NotebookProps> = ({ currentDateTime, journalData, journalId, setJournalId, updatingState, setUpdatingState }) => {
  const journal = useRef<HTMLDivElement>(null);
  const title = useRef<HTMLInputElement>(null);
  const [journalTitle, setJournalTitle] = useState<string>(journalData?.title || "");
  const [selectedTags, setSelectedTags] = useState<string[]>(journalData?.tags || []);
  const [tagInput, setTagInput] = useState("");
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);
  const [width, setWidth] = useState<number>(Math.min(window.innerWidth * 0.6, 800)); // Initial width is 60% of the screen or max 800px
  const isResizing = useRef<boolean>(false);
  const startX = useRef<number>(0);

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

  useEffect(() => {
    if (journal.current) {
      setJournalId(journal.current.dataset.journalid || "new");
    }
  }, [journal]);

  useEffect(() => {
    if (journalData===undefined || journalData===null) {return}

    if (journalData && updatingState) {
      console.log("Updating state with journal data:", journalData);
      console.log("updating state value: ", updatingState);
      setJournalId(journalData.id);
      setJournalTitle(journalData.title);
      setSelectedTags(journalData.tags);
      setUpdatingState(false);
    }
  }, [journalData]);

  useEffect(() => {
    console.log("[title] updatingState:", updatingState);
    if (journalId !== "new") {
      if (!updatingState) {
        console.log("bitch ", updatingState)
      update_journal(journalId, journalTitle, null, null, null);
      console.log("Title updated:", journalId, journalTitle);
      }
    }
  }, [journalTitle, journalId]);

  useEffect(() => {
    if (journalId !== "new") {
      if (!updatingState) {
        update_journal(journalId, null, null, null, selectedTags);
      console.log("Tags updated:", journalId, selectedTags);
      }
    }
  }, [selectedTags, journalId]);

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

  // Handle mouse down on the resizer
  const handleMouseDown = (e: React.MouseEvent) => {
    console.log("Mouse down on resizer"); // Debugging
    isResizing.current = true;
    startX.current = e.clientX;

    // Disable text selection globally
    document.body.style.userSelect = "none";
    document.body.style.cursor = "ew-resize"; // Change cursor to resizing

    // Attach event listeners for mousemove and mouseup
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  // Handle mouse move to resize the Notebook
  const handleMouseMove = (e: MouseEvent) => {
    if (!isResizing.current) return; // Ensure resizing is active

    const deltaX = e.clientX - startX.current;
    console.log("Mouse move detected, deltaX:", deltaX); // Debugging

    setWidth((prevWidth) => {
      const newWidth = Math.max(400, Math.min(prevWidth + deltaX, window.innerWidth - 100));
      console.log("New width:", newWidth); // Debugging
      return newWidth;
    });

    startX.current = e.clientX;
  };

  // Handle mouse up to stop resizing
  const handleMouseUp = () => {
    console.log("Mouse up, stopping resize"); // Debugging
    isResizing.current = false;

    // Re-enable text selection globally
    document.body.style.userSelect = "";
    document.body.style.cursor = ""; // Reset cursor to default

    // Remove event listeners for mousemove and mouseup
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  // Adjust width on window resize
  useEffect(() => {
    const handleResize = () => {
      setWidth((prevWidth) =>
        Math.min(Math.max(prevWidth, window.innerWidth * 0.4), window.innerWidth * 0.8)
      ); // Ensure width is between 40% and 80% of the screen
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      ref={journal}
      className="notebook glass-blur bg-gradient-to-br from-white/30 to-white/10 dark:from-black/30 dark:to-black/10 backdrop-blur-md border border-white/20 dark:border-black/20 rounded-md shadow-lg"
      style={{
        width: `${width}px`, // Dynamically apply the width
      }}
      data-journalid={journalId}
      data-updating={updatingState}
    >
      {/* Resizer */}
      <div
        className="absolute top-0 right-0 h-full w-2 cursor-ew-resize"
        onMouseDown={handleMouseDown} // Attach mouse down event to the resizer
      ></div>

      <div className="p-6">
        <div className="date-time text-gray-600 dark:text-gray-400 font-body text-sm md:text-[1.1rem] mb-2">
          {currentDateTime}
        </div>
        <hr className="border-gray-300 dark:border-gray-600 mb-4" />
        <input
          ref={title}
          type="text"
          className="title-input w-full bg-transparent text-bookends-text dark:text-gray-200 font-display text-[2rem] font-bold mb-4 p-2 pl-0 border-b-2 border-gray-300 dark:border-gray-600 focus:outline-none focus:border-bookends-accent dark:focus:border-bookends-dark-accent"
          placeholder="A title for the day..."
          value={journalTitle}
          onChange={(e) => setJournalTitle(e.target.value)}
        />
      {/* Tag Picker */}
      <div
        className="flex items-center flex-wrap gap-2 mb-4 relative group"
        onMouseEnter={() => {
          if (tagInputRef.current) tagInputRef.current.style.visibility = "visible";
        }}
        onMouseLeave={() => {
          if (tagInputRef.current && selectedTags.length > 0) {
            tagInputRef.current.style.visibility = "hidden";
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
          className={`tag-input flex-grow bg-transparent text-white dark:text-white-200 font-body text-sm md:text-base px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:border-bookends-dark-accent-accent dark:focus:border-bookends-dark-accent-light placeholder-style ${
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


        <RichTextEditor
          title={journalTitle}
          tags={selectedTags}
          journalId={journalId}
          setJournalId={setJournalId}
          content={journalData?.rawcontent || null}
        />
      </div>
    </div>
  );
};

export default Notebook;