import React, { useState, useEffect } from "react";
import "./App.css";

function Search({ onSearch }) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    onSearch(searchQuery);
  };

  useEffect(() => {
    const handleShortcut = (event) => {
      if (event.ctrlKey && event.key === "k") {
        event.preventDefault();
        document.getElementById("searchInput").focus();
      }
    };

    window.addEventListener("keydown", handleShortcut);

    return () => {
      window.removeEventListener("keydown", handleShortcut);
    };
  }, []);

  return (
    <form onSubmit={handleSearchSubmit} className="search__form">
      <input
        id="searchInput"
        type="text"
        placeholder="Search for a movie... (Press CTRL + K)"
        value={searchQuery}
        onChange={handleSearchChange}
      />
      <button type="submit">Search</button>
    </form>
  );
}

export default Search;
