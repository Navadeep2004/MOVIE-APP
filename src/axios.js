import axios from "axios";

//base url to make requests to the movie database
const API_KEY = "b32defdbfb124379cf1011c39b993a11";

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: API_KEY,
  },
});

// Now you can use this instance to make requests
// instance
//   .get("/search/movie", { params: { query: "Damsel" } })
//   .then((response) => {
//     console.log(response.data);
//   })
//   .catch((error) => {
//     console.error("Error searching for movies:", error);
//   });
//instance.get(''); //this will get appended to the baseURL

export default instance;
