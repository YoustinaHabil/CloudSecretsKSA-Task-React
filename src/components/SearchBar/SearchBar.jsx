import React from 'react';
import './SearchBar.css';

const SearchBar = ({ searchTerm, onSearchChange, sortBy, onSortChange }) => {
  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search by username..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="search-input"
      />
      <select 
        value={sortBy} 
        onChange={(e) => onSortChange(e.target.value)}
        className="sort-select"
      >
        <option value="">Sort by...</option>
        <option value="title-asc">Title (A-Z)</option>
        <option value="title-desc">Title (Z-A)</option>
        <option value="id-asc">ID (Ascending)</option>
        <option value="id-desc">ID (Descending)</option>
      </select>
    </div>
  );
};

export default SearchBar; 