'use client';

import { useEffect, useState, useRef } from 'react';
import { Search, X } from 'lucide-react'; 

export default function SearchBar({
  value,
  onDebouncedChange,
  suggestions = [],
  onSelectSuggestion,
}) {
  const [input, setInput] = useState(value);
  const [showDropdown, setShowDropdown] = useState(false);
  const wrapperRef = useRef(null);

  // Debounce input
  useEffect(() => {
    const handler = setTimeout(() => {
      onDebouncedChange(input);
    }, 300);

    return () => clearTimeout(handler);
  }, [input, onDebouncedChange]);

  // Sync input from props
  useEffect(() => {
    setInput(value);
  }, [value]);

  // Click outside to close
  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (item) => {
    onSelectSuggestion(item);
    setInput(item.name);
    setShowDropdown(false);
  };

  return (
    <div
      ref={wrapperRef}
      className="relative max-w-xl mx-auto w-full transition-all"
    >
      <div className="relative flex items-center">
        <Search className="absolute left-3 text-gray-400 h-5 w-5" />
        <input
          type="text"
          placeholder="Search therapists by name, city, or specialization"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            setShowDropdown(true);
          }}
          onFocus={() => {
            if (suggestions.length > 0) setShowDropdown(true);
          }}
          className="w-full pl-10 pr-10 py-2 rounded-full border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 transition duration-200 placeholder-gray-400"
        />
        {input && (
          <button
            onClick={() => setInput('')}
            className="absolute right-3 text-gray-400 hover:text-gray-600"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      {showDropdown && input.trim() !== '' && suggestions.length > 0 && (
        <ul className="absolute top-full left-0 w-full bg-white border border-gray-200 mt-2 rounded-xl shadow-lg z-50 max-h-64 overflow-y-auto animate-fade-in">
          {suggestions.map((item) => (
            <li
              key={item.id}
              onClick={() => handleSelect(item)}
              className="px-4 py-3 hover:bg-emerald-50 transition cursor-pointer"
            >
              <div className="font-semibold text-gray-800">{item.name}</div>
              <div className="text-sm text-gray-500">
                {item.specialization} – {item.location}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
