import React, { useState } from 'react';
import Select from 'react-select';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setCategory] = useState(null);

  const categories = [
    { value: 'food', label: 'Halal Food' },
    { value: 'cosmetics', label: 'Cosmetics' },
    { value: 'finance', label: 'Islamic Finance' }
  ];

  const handleSearch = () => {
    onSearch({
      term: searchTerm,
      category: selectedCategory?.value
    });
  };

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search ethical halal products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Select
        className="category-select"
        options={categories}
        placeholder="Select Category"
        value={selectedCategory}
        onChange={setCategory}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchBar;