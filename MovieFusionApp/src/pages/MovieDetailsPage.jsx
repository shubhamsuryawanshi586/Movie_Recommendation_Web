import React, { useEffect, useState } from 'react';
import MovieService from '../services/MovieService';
import { useParams, useNavigate } from 'react-router-dom';
import './css/MovieDetailsPage.css';

const MovieDetailsPage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    MovieService.getMovieById(id).then(res => setMovie(res.data));
  }, [id]);

  const handleClose = () => {
    navigate(-1);
  };

  const handleAddToWatchlist = () => {
    const userId = localStorage.getItem("userId"); // assuming you store userId in localStorage
    if (userId && movie.movie_id) {
      MovieService.addToWatchlist(userId, movie.movie_id)
        .then(() => {
          alert("Movie added to your watchlist! 🎉");
        })
        .catch((error) => {
          console.error("Failed to add to watchlist:", error);
          alert("Failed to add movie to watchlist 😢");
        });
    } else {
      alert("You must be logged in to add to watchlist.");
    }
  };

  return (
    <div className='moviedetailscard'>
      <div className="container my-4 d-flex flex-column" style={{ minHeight: '10vh' }}>
        {/* Heading + Close button */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2 className="mb-0">{movie.movie_title}</h2>
          <button className="btn btn-danger" onClick={handleClose}>
            Close
          </button>
        </div>

        {/* Movie details */}
        <div>
          <p><strong>Director:</strong> {movie.movie_director_name}</p>
          <p><strong>Actors:</strong> {movie.movie_actor1}, {movie.movie_actor2}, {movie.movie_actor3}</p>
          <p><strong>Description:</strong> {movie.movie_description}</p>
          <p><strong>Category:</strong> {movie.movie_category}</p>
          <p><strong>Type:</strong> {movie.movie_type}</p>
          <p><strong>Language:</strong> {movie.movie_language}</p>

          {/* Buttons */}
          <div className="d-flex gap-2 mt-3">
            <a className="btn btn-primary" href={movie.movie_trailer_link} target="_blank" rel="noreferrer">
              Watch Trailer
            </a>
            <a className="btn btn-success" href={movie.watch_link} target="_blank" rel="noreferrer">
              Watch Movie
            </a>
            <button className="btn btn-warning" onClick={handleAddToWatchlist}>
              Add to Watchlist
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailsPage;
