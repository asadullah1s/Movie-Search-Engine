import React, { useState, useEffect } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";

const Home = () => {
  const [movieAllData, setMovieAllData] = useState([]);
  const [inputValue, setInputValue] = useState("movie");

  const getMovieData = async () => {
    try {
      const response = await axios.get(
        `https://www.omdbapi.com/?apikey=28a8e30b&s=${inputValue}`
      );
      setMovieAllData(response.data.Search || []); // Safely handle if Search is undefined
    } catch (error) {
      console.error("Error fetching movie data:", error);
    }
  };

  useEffect(() => {
    getMovieData();
  }, []);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="container-fluid text-light min-vh-100">
      <div className="row px-4 align-items-center">
        <div className="col-lg-6 col-md-8 col-sm-12">
          <h1 className="mb-3">Watch Your Favorites Here...</h1>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s.
          </p>
          <div className="d-flex gap-2 mt-5">
            <input
              type="text"
              className="form-control flex-grow-1"
              placeholder="Search Your Favourite..."
              value={inputValue}
              onChange={handleInputChange}
            />
            <button className="btn-grad btn" onClick={getMovieData}>
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="row px-4 my-5 g-4">
        {movieAllData.length > 0 ? (
          movieAllData.map((movie) => (
            <div key={movie?.imdbID} className="col-lg-2 col-md-3 col-sm-6 col-12">
              <NavLink className={"text-decoration-none"} to={`/single/${movie?.imdbID}`}>
              <div className="card bg-dark text-light h-100">
                <img
                  src={movie?.Poster || "placeholder-image-url.jpg"}
                  alt={`${movie?.Title || "Movie"} poster`}
                  className="card-img-top img-fluid"
                />
                <div className="card-body">
                  <h5 className="card-title text-center">
                    {movie?.Title || "No Title"}
                  </h5>
                </div>
              </div>
              </NavLink>
            </div>
          ))
        ) : (
          <div className="text-center">
            <h3>No Result Found</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
