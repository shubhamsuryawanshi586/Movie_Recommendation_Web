import React, { useEffect, useState } from 'react';
import MovieService from '../services/MovieService';
import MovieCard from '../components/MovieCard';
import AuthService from '../services/AuthService';
import './css/MovieList.css';

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const user = AuthService.getCurrentAccount(); // check login

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await MovieService.getAllMovies();
        setMovies(res.data);
      } catch (err) {
        console.error('Error fetching movies', err);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className='landingpage'>
      <div className="container mt-4">
        <div className='moviesbox'>
          <h2 className="mb-4 ">🎬 Explore Movies</h2>
          <div  className="row row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-3 g-4 ">
            {movies.map((movie) => (
              <div key={movie.movie_id} className="col d-flex justify-content-center">
                <MovieCard movie={movie} showReviewButton={!!user} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieList;
