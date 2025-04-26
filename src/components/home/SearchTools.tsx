import React, { useState } from 'react'
import { Menu } from '@headlessui/react'
import { FunnelIcon, ArrowsUpDownIcon, ChevronDownIcon } from '@heroicons/react/24/outline'

interface SearchToolsProps {
  onSearchChange: (query: string) => void
  onSort: (sortOption: string) => void
  onFilter: (selectedTags: string[]) => void
  suggestions: {
    title: string
    content: string
    backgroundImage?: string
  }[]
  availableTags: string[]
}

const SearchTools: React.FC<SearchToolsProps> = ({ onSearchChange, onSort, onFilter, suggestions, availableTags }) => {
  const [query, setQuery] = useState('')
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [selectedTags, setSelectedTags] = useState<string[]>([])

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setQuery(value)
    onSearchChange(value)
    setShowSuggestions(value.length > 0)
  }

  const handleTagToggle = (tag: string) => {
    const updatedTags = selectedTags.includes(tag)
      ? selectedTags.filter((t) => t !== tag)
      : [...selectedTags, tag]
    setSelectedTags(updatedTags)
    onFilter(updatedTags)
  }

  return (
    <div className="relative flex flex-wrap items-center justify-center gap-4 px-4 sm:flex-nowrap">
      {/* Search Bar */}
      <div className="relative w-full max-w-lg">
        <input
          type="text"
          value={query}
          onChange={handleSearchChange}
          placeholder="Search journals..."
          className="glass-blur w-full rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm text-white placeholder-white/70 shadow-md backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-white/20"
        />
        {showSuggestions && (
          <ul className="glass-blur z-50 absolute left-0 top-full mt-2 w-full max-h-64 overflow-y-auto rounded-xl border border-white/10 bg-white/10 p-2 shadow-lg backdrop-blur-md">
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                className="flex cursor-pointer items-center gap-4 rounded-lg px-3 py-2 text-sm text-white/80 hover:bg-white/20"
                onClick={() => {
                  setQuery(suggestion.title)
                  setShowSuggestions(false)
                  onSearchChange(suggestion.title)
                }}
              >
                {suggestion.backgroundImage && (
                  <img
                    src={suggestion.backgroundImage}
                    alt={suggestion.title}
                    className="h-12 w-12 flex-shrink-0 rounded-lg object-cover"
                  />
                )}
                <div className="flex flex-col">
                  <span className="font-medium text-white">{suggestion.title}</span>
                  <span className="text-xs text-white/70 line-clamp-1">
                    {suggestion.content}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Sort Dropdown */}
      <Menu as="div" className="glass-blur relative z-50">
        <Menu.Button className="flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm text-white shadow-md backdrop-blur-md hover:bg-white/20">
          <ArrowsUpDownIcon className="h-5 w-5" />
          Sort
          <ChevronDownIcon className="h-4 w-4" />
        </Menu.Button>
        <Menu.Items className="glass-blur z-50 absolute right-0 mt-2 w-48 rounded-xl border border-white/10 bg-white/10 p-2 shadow-lg backdrop-blur-md focus:outline-none">
          {["Default", "Last Edited", "Last Created", "Oldest"].map((option) => (
            <Menu.Item key={option}>
              {({ active }) => (
                <button
                  onClick={() => onSort(option)}
                  className={`${
                    active ? 'bg-white/20' : ''
                  } w-full rounded-lg px-3 py-2 text-left text-sm text-white/80`}
                >
                  {option}
                </button>
              )}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Menu>

      {/* Filter Dropdown */}
      <Menu as="div" className="glass-blur relative z-50 font-extrabold">
        <Menu.Button className="flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm text-white shadow-md backdrop-blur-md hover:bg-white/20">
          <FunnelIcon className="h-5 w-5" />
          Filter
          <ChevronDownIcon className="h-4 w-4" />
        </Menu.Button>
        <Menu.Items className="w-[60vw] md:w-[25vw] glass-blur z-50 absolute right-0 mt-2 rounded-xl border border-white/10 bg-white/10 p-4 shadow-lg backdrop-blur-md focus:outline-none">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {availableTags.map((tag) => (
              <div key={tag} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selectedTags.includes(tag)}
                  onChange={() => handleTagToggle(tag)}
                  className="h-4 w-4 rounded border-white/20 bg-white/10 text-white focus:ring-2 focus:ring-white/20"
                />
                <span className="text-xs md:text-sm text-white/80">{tag}</span>
              </div>
            ))}
          </div>
        </Menu.Items>
      </Menu>
    </div>
  )
}

export default SearchTools