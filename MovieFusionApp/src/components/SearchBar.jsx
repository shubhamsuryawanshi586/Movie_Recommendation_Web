import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './css/SearchBar.css';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${query}`);
    }
  };

  return (
   <div className='searchbar'>
     <form className="d-flex my-3 container" onSubmit={handleSubmit}>
      <input
        type="text"
        className="form-control me-2"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value.trimStart())}
      />
      <button className="btn btn-primary" type="submit">Search</button>
    </form>
   </div>
  );
};

export default SearchBar;
