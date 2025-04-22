import React, { useEffect, useState } from 'react';
import TMDB from '../services/TMDB';
import MovieService from '../services/MovieService';
import './css/HomePage.css';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('Action');
  const [posterUrls, setPosterUrls] = useState({});
  const [showMore, setShowMore] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() =>{
    const fetchGenres = async () => {
      try{
        const res = await MovieService.getAllGenres();
        setGenres(res.data);
        // if(res.data.length > 0){
        //   selectedGenre(res.data[0]);
        // }
      }catch(error){
        console.error('Error fetching genres', error);
      }
    };
    fetchGenres();
  }, []);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await MovieService.getMoviesByGenre(selectedGenre);
        const newMovies = res.data.movies || res.data;
        setMovies(newMovies);
      } catch (err) {
        console.error('Error fetching movies', err);
      }
    };
  
    fetchMovies();
  }, [selectedGenre]);

  
  useEffect(() => {
    const fetchPosters = async () => {
      const urls = {};
      for (const movie of movies) {
        if (!urls[movie.original_movie_id]) {  // Fetch only if not already fetched
          try {
            const url = await TMDB.fetchMoviePosterById(movie.original_movie_id);
            urls[movie.original_movie_id] = url;
          } catch (error) {
            urls[movie.original_movie_id] = '/default-poster.jpg';
          }
        }
      }
      setPosterUrls(urls);
    };

    if (movies.length > 0) {
      fetchPosters();
    }
  }, [movies]); 

  return (
    <div className='homepage'>
      <div className="container-fluid homepage py-4">
 
      <div className="genre-tabs">
        {genres.map((genre) => (
          <button
            key={genre}
            className={`genre-tab ${selectedGenre === genre ? 'active' : ''}`}
            onClick={() => setSelectedGenre(genre)} 
          >
            {genre}
          </button>
        ))}
      </div>

      <div className='button-container'>
      <button
        className="see-more-btn"
        onClick={() => setShowMore(!showMore)} 
      >
        {showMore ? 'Show Less' : 'See more..'}
      </button>
      </div>

      {/* Movie Display */}
      <div className={`movie-list ${showMore ? 'show-all' : 'show-limited'}`}>
        {movies.slice(0, showMore ? movies.length : 5).map((movie) => (
          <div key={movie.id} className="movie-item">
            <div className="poster-container">
              <img
                className="poster-image"
                onClick={() => navigate(`/movie/${movie.movie_id}`)} // Navigate to movie details page
                src={posterUrls[movie.original_movie_id] || '/default-poster.jpg'}
                alt={movie.movie_title}
                title={movie.movie_title}
              />
              <div className="poster-overlay">
                <p>{movie.movie_title}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default HomePage;
