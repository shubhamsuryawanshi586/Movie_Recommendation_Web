import React, { useEffect, useState } from 'react';
import MovieCard from '../components/MovieCard';
import WatchListService from '../services/WatchListService';
import MovieService from '../services/MovieService';
import './css/Watchlist.css'; 

const Watchlist = () => {
  const [movies, setMovies] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    const userId = user?.user_id;
    if (userId) {
      setUserId(userId);
    }
  }, []);

  useEffect(() => {
    const fetchMovies = async () => {
      if (userId) {
        try {
          const res = await WatchListService.getWatchlist(userId);
          const movieDetailsPromises = res.data.map(async (item) => {
            const movie = await MovieService.getMovieById(item.movie_id);
            return movie.data; 
          });
          const movieDetails = await Promise.all(movieDetailsPromises);
          setMovies(movieDetails);
        } catch (err) {
          console.error('Error fetching movies', err);
        }
      }
    };

    fetchMovies();
  }, [userId]);

  const removeMovie = async (movieId) => {
    try {
      await WatchListService.removeMovieFromWatchlist(userId, movieId);
      setMovies((prevMovies) => prevMovies.filter((movie) => movie.movie_id !== movieId));
    } catch (err) {
      console.error('Error removing movie from watchlist', err);
    }
  };

  return (
    <div className='watchlist-container'>
      <div className="container">
        <div className='movies-box'>
          {/* <h2 className="watchlist-title">Your Watchlist</h2> */}
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
            {movies.map((movie) => (
              <div key={movie.movie_id} className="col d-flex justify-content-center">
                <MovieCard 
                  movie={movie} 
                  onRemove={removeMovie} 
                  isInWatchlist={true} 
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Watchlist;
