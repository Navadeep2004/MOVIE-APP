import React, { useState, useEffect } from "react";
import axios from "./axios";
import "./Row.css";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";

const base_url = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchUrl }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch movie data from TMDB API
        const response = await axios.get(fetchUrl);
        // Update state with fetched movie data
        setMovies(response.data.results);
      } catch (error) {
        // Handle errors if fetching movie data fails
        console.error("Error fetching movies:", error);
      }
    };
    // Call fetchData function when component mounts or fetchUrl changes
    fetchData();
  }, [fetchUrl]);

  // Function to handle clicks on movie posters
  const handleClick = async (movie) => {
    // Check if trailer is already open, if yes, close it
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      try {
        // Attempt to fetch trailer URL for the clicked movie
        const movieName = movie?.title || movie?.name || "";
        const url = await movieTrailer(movieName);
        const urlParams = new URLSearchParams(new URL(url).search);
        const videoId = urlParams.get("v");
        if (videoId) {
          // If trailer URL is found, set it in the state
          setTrailerUrl(videoId);
        } else {
          throw new Error("No trailer found");
        }
      } catch (error) {
        // Handle errors if fetching trailer URL fails
        console.error("Error fetching trailer:", error);
        setTrailerUrl("");
      }
    }
  };

  // Function to close the video when the "Close Video" button is clicked
  const handleCloseVideo = () => {
    setTrailerUrl("");
  };

  // Options for the YouTube player
  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
      mute: 1, // Added  mute option to mute the player
    },
  };

  return (
    <div className="row">
      <div className="title_head">
        <h2 className="title_content">{title}</h2>
      </div>
      <div className="row__posters">
        {/* Map through the movie data and render each poster */}
        {movies.map((movie) => (
          <div
            key={movie.id}
            onClick={() => handleClick(movie)}
            className="row__poster"
          >
            <img src={`${base_url}${movie.poster_path}`} alt={movie.name} />
            <p className="movie__title">{movie.title}</p>
          </div>
        ))}
      </div>
      {/* Render the YouTube video component if trailerUrl is set */}
      {trailerUrl && (
        <div className="row__video">
          <YouTube videoId={trailerUrl} opts={opts} />
          {/* Button to close the video */}
          <button onClick={handleCloseVideo}>Close Video</button>
        </div>
      )}
    </div>
  );
}

export default Row;
