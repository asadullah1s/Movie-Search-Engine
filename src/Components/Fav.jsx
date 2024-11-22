import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Fav = () => {
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [moviesDetails, setMoviesDetails] = useState([]);

  // Fetch favorite movies from localStorage
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavoriteMovies(storedFavorites);
  }, []);

  // Fetch movie details from OMDB API
  useEffect(() => {
    if (favoriteMovies.length > 0) {
      const fetchMoviesDetails = async () => {
        const movieDetailsPromises = favoriteMovies.map(async (movieId) => {
          const response = await fetch(`https://www.omdbapi.com/?apikey=28a8e30b&i=${movieId}`);
          const data = await response.json();
          return data;
        });
        const details = await Promise.all(movieDetailsPromises);
        setMoviesDetails(details);
      };

      fetchMoviesDetails();
    }
  }, [favoriteMovies]);

  return (
    <div className="container py-4">
      <h1 className="text-light mb-4 text-center">Your Favorite Movies</h1>
      {moviesDetails.length > 0 ? (
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
          {moviesDetails.map((movie) => (
            <div key={movie?.imdbID} className="col">
              <div className="card bg-dark text-light h-100">
                <img
                  src={movie?.Poster !== "N/A" ? movie?.Poster : "https://via.placeholder.com/300x450?text=No+Image"}
                  alt="Movie Poster"
                  className="card-img-top img-fluid"
                  style={{ height: '300px', objectFit: 'cover' }}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title text-truncate">{movie?.Title || "No Title"}</h5>
                  <div className="mt-auto">
                    <Link to={`/single/${movie?.imdbID}`} className="btn btn-primary w-100">
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-light text-center">You haven't added any movies to your favorites yet!</p>
      )}
    </div>
  );
};

export default Fav;
