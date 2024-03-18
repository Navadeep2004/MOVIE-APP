import React, { useState, useEffect } from "react";
import axios from "./axios"; // Import axios instance from axios.js
import "./Row.css";

const base_url = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchUrl }) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(fetchUrl); // Use axios instance for making requests
        setMovies(response.data.results);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchData();
  }, [fetchUrl]);

  return (
    <div className="row">
      <div className="title_head">
        <h2 className="title_content">{title}</h2>
      </div>
      <div className="row__posters">
        {movies.map((movie, index) => (
          <div key={movie.id} className="row__poster">
            <img src={`${base_url}${movie.poster_path}`} alt={movie.name}></img>
            <p className="movie__title">{movie.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Row;
