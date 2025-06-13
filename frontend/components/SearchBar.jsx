// components/SearchBar.jsx
import React, { useState } from 'react';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const handleSearch = () => {
    console.log("Searching for:", query);
    // Yaha API se search call karna hoga
  };

  return (
    <div className="p-4">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search users or posts..."
        className="w-full px-4 py-2 border rounded-lg"
      />
      <button
        onClick={handleSearch}
        className="mt-2 w-full bg-blue-500 text-white py-2 rounded-lg"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
