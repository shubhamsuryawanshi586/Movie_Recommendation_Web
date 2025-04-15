import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './css/MovieCard.css';
import TMDB from '../services/TMDB';
const MovieCard = ({ movie, showReviewButton }) => {

  const [posterUrl, setPosterUrl] = useState('/default-poster.jpg');
  console.log('showReviewButton:', showReviewButton);

  useEffect(() => {
    const fetchPoster = async () => {
      const url = await TMDB.fetchMoviePosterByTitle(movie.movie_title);
      setPosterUrl(url);
    };

    fetchPoster();
  }, [movie.movie_title]);

  return (
    <div className='moviecard'>
      <div className="card h-100">
        <div className="card-body">
          <img className="card-img" src={posterUrl} alt={movie.movie_title}  style={{ opacity: posterUrl === '/default-poster.jpg' ? 0.5 : 1 }} />
          <h5 className="card-title">{movie.movie_title}</h5>
          <p className="card-text">{movie.movie_description?.substring(0, 100)}...</p>
          <p><strong>Language:</strong> {movie.movie_language}</p>
          <Link to={`/movie/${movie.movie_id}`} className="btn btn-sm btn-outline-primary ms-2">View Details</Link>

          {showReviewButton && (
            <>
              <Link to={`/movie/${movie.movie_id}/review`} className="btn btn-sm btn-outline-success ms-2">
                Review
              </Link>
              <Link to={`/movie/${movie.movie_id}/rating`} className="btn btn-sm btn-outline-success ms-2">
                Rate
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
