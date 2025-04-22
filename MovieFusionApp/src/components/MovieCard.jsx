import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/MovieCard.css';
import TMDB from '../services/TMDB';

const MovieCard = ({ movie, onRemove, isInWatchlist }) => {
  const navigate = useNavigate();
  const [posterUrl, setPosterUrl] = useState('/default-poster.jpg');

  useEffect(() => {
    const fetchPoster = async () => {
      const url = await TMDB.fetchMoviePosterById(movie.original_movie_id);
      setPosterUrl(url);
    };
    fetchPoster();
  }, [movie.original_movie_id]);

  return (
    <div className="movie-item">
      <div className="poster-container">
        <img
          className="poster-image"
          onClick={() => navigate(`/movie/${movie.movie_id}`)}
          src={posterUrl}
          alt={movie.movie_title}
          title={movie.movie_title}
          style={{ opacity: posterUrl === '/default-poster.jpg' ? 0.5 : 1 }}
        />
        <div className="poster-overlay">
          <p>{movie.movie_title}</p>
        </div>

        {isInWatchlist && (
          <button className="remove-btn" onClick={() => onRemove(movie.movie_id)}>
            Remove
          </button>
        )}
      </div>
    </div>
  );
};

export default MovieCard;
