import React, { useState, useEffect } from "react";
import Row from "./Row";
import requests from "./requests";
import Search from "./Search";
import axios from "./axios"; // Import axios instance from axios.js
import "./App.css";

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(requests.fetchMovies); // Use axios instance for making requests
        setMovies(response.data.results);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, []);

  const handleSearch = async (query) => {
    try {
      const response = await axios.get(`/search/movie?query=${query}`); // Use axios instance for making requests
      setSearchResults(response.data.results);
      setSearchQuery(query);
    } catch (error) {
      console.error("Error searching for movies:", error);
    }
  };

  return (
    <div className="App">
      <h1>Movie App</h1>
      <Search onSearch={handleSearch} />
      {searchQuery ? (
        <Row
          title="Search Results"
          fetchUrl={`/search/movie?query=${searchQuery}`}
        />
      ) : (
        <Row title="Movie's List" fetchUrl={requests.fetchMovies} />
      )}
    </div>
  );
}

export default App;
