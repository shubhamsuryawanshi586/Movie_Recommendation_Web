import React, { useEffect, useState } from 'react';
import MovieCard from '../components/MovieCard';
import WatchListService from '../services/WatchListService';
import MovieService from '../services/MovieService'; 
import './css/MovieList.css';

const Watchlist = () => {
  const [movies, setMovies] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    const userId = user?.user_id;
    console.log(userId);
    if (userId) {
      setUserId(userId);
    }
  }, []);

  useEffect(() => {
    const fetchMovies = async () => {
      if (userId) {
        try {
          const res = await WatchListService.getWatchlist(userId);
          console.log(res);

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

  return (
    <div className='landingpage' style={{ marginTop: '80.5px' }}>
      <div className="container">
        <div className='moviesbox'>
          <h2 className="mb-4">Watch List</h2>
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-3 g-4">
            {movies.map((movie) => (
              <div key={movie.movie_id} className="col d-flex justify-content-center">
                <MovieCard movie={movie} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Watchlist;
