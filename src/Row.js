import React, { useState, useEffect } from "react";
import axios from "./axios";
import "./Row.css";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";

const base_url = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchUrl }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");
  const [scrollToTrailer, setScrollToTrailer] = useState(false);

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
          setScrollToTrailer(true);
        } else {
          throw new Error("No trailer found");
        }
      } catch (error) {
        // Handle errors if fetching trailer URL fails
        console.error("Error fetching trailer:", error);
        setTrailerUrl("");
        setScrollToTrailer(false);
      }
    }
  };

  // Function to close the video when the "Close Video" button is clicked
  const handleCloseVideo = () => {
    setTrailerUrl("");
    setScrollToTrailer(false);
  };

  const onReady = () => {
    if (scrollToTrailer) {
      const rowElement = document.querySelector(".row__video");
      if (rowElement) {
        rowElement.scrollIntoView({ behavior: "smooth" });
      }
    }
  };
  // Options for the YouTube player
  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1, //video will be autoplayed
      mute: 1, // Added  mute option to mute the player
    },
  };

  return (
    <div className="row">
      <div className="title_head">
        <h2 className="title_content">{title}</h2>
      </div>
      <div className="row__posters">
        {movies.map((movie) => (
          <div
            key={movie.id}
            onClick={() => handleClick(movie)}
            className="row__poster"
          >
            <img
              className="movie_card"
              src={`${base_url}${movie.poster_path}`}
              alt={movie.name}
            />
            <p className="movie__title">{movie.title}</p>
          </div>
        ))}
      </div>
      {trailerUrl && (
        <div className="row__video">
          <YouTube videoId={trailerUrl} opts={opts} onReady={onReady} />
          <button className="close_button" onClick={handleCloseVideo}>
            Close Video
          </button>
        </div>
      )}
    </div>
  );
}

export default Row;
