import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './css/MovieDetailsPage.css';
import MovieService from '../services/MovieService';
import WatchListService from '../services/WatchListService';
import TMDB from '../services/TMDB';
import Swal from 'sweetalert2';

const MovieDetailsPage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState({});
  const [posterUrl, setPosterUrl] = useState('/default-poster.jpg');
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    MovieService.getMovieById(id).then(res => setMovie(res.data));
  }, [id]);

  useEffect(() => {
    const fetchPoster = async () => {
      if (movie.movie_title) {
        const url = await TMDB.fetchMoviePosterByTitle(movie.movie_title);
        setPosterUrl(url);
      }
    };
    fetchPoster();
  }, [movie.movie_title]);

  useEffect(() => {
    const userString = localStorage.getItem('user');
    setIsUserLoggedIn(!!userString);
  }, []);

  const handleAddToWatchlist = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const uid = user?.user_id;

    if (!uid) {
      return Swal.fire({
        icon: 'info',
        title: 'Info',
        text: 'You must be logged in to add to watchlist.',
        toast: true,
        position: 'top',
        timer: 1500,
        showConfirmButton: false
      });
    }

    try {
      const res = await WatchListService.addToWatchlist(uid, movie.movie_id);
      const alreadyInWatchlist = res.data === "Movie Already in watchlist";

      Swal.fire({
        icon: alreadyInWatchlist ? 'warning' : 'success',
        title: alreadyInWatchlist ? 'Already Added' : 'Added!',
        text: alreadyInWatchlist
          ? 'This movie is already in your watchlist.'
          : 'Movie added to your watchlist.',
        toast: true,
        position: 'top',
        timer: 1500,
        showConfirmButton: false
      });
    } catch (err) {
      console.error("Watchlist error:", err);
      Swal.fire({
        icon: 'error',
        title: 'Oops!',
        text: 'Something went wrong.',
        toast: true,
        position: 'top',
        timer: 1500,
        showConfirmButton: false
      });
    }
  };

  const handleReviewClick = () => {
    if (isUserLoggedIn) navigate(`/movie/${movie.movie_id}/review`);
    else showLoginAlert('review');
  };

  const handleRateClick = () => {
    if (isUserLoggedIn) navigate(`/movie/${movie.movie_id}/rating`);
    else showLoginAlert('rate');
  };

  const showLoginAlert = (action) => {
    Swal.fire({
      icon: 'info',
      title: 'Login Required',
      text: `You must be logged in to ${action} this movie.`,
      toast: true,
      position: 'top',
      timer: 1500,
      showConfirmButton: false
    });
  };

  const handleClose = () => navigate(-1);

  return (
    <div className="movie-details-page">
      <div className="movie-container">
        {/* Header */}
        <div className="movie-header">
          <h2>{movie.movie_title}</h2>
          <button className="btn btn-danger" onClick={handleClose}>Close</button>
        </div>

        {/* Content */}
        <div className="movie-content">
          {/* Poster */}
          <div className="movie-poster">
            <img src={posterUrl} alt={`${movie.movie_title} Poster`}
              style={{ opacity: posterUrl === '/default-poster.jpg' ? 0.5 : 1 }}/>
          </div>

          {/* Details */}
          <div className="movie-info">
            <div className=''>
              <p><strong>Director:</strong> {movie.movie_director_name}</p>
              <p><strong>Actors:</strong> {movie.movie_actor1}, {movie.movie_actor2}, {movie.movie_actor3}</p>
              <p className='movie-description'><strong>Description:</strong> {movie.movie_description}</p>
              <p><strong>Category:</strong> {movie.movie_category}</p>
              <p><strong>Type:</strong> {movie.movie_type}</p>
              <p><strong>Language:</strong> {movie.movie_language}</p>
            </div>

            {/* Action Buttons */}
            <div className="button-group">
              <a className="btn btn-primary" href={movie.movie_trailer_link} target="_blank" rel="noreferrer">Trailer</a>
              <a className="btn btn-success" href={movie.watch_link} target="_blank" rel="noreferrer">Watch</a>
              <button className="btn btn-warning" onClick={handleAddToWatchlist}>Add to Watchlist</button>
              <button className="btn btn-outline-success" onClick={handleReviewClick}>Review</button>
              <button className="btn btn-outline-info" onClick={handleRateClick}>Rate</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailsPage;
