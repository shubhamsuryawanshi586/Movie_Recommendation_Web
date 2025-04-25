import React, { useEffect, useState } from 'react';
import TMDB from '../services/TMDB';
import MovieService from '../services/MovieService';
import './css/HomePage.css';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('Action');
  const [selectedLanguage, setSelectedLanguage] = useState('Hindi');
  const [posterUrls, setPosterUrls] = useState({});
  const [showMore, setShowMore] = useState(false);
  const [languages, setLanguages] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const res = await MovieService.getMovieCountByLanguage();
        setLanguages(res.data);
      } catch (error) {
        console.error('Error fetching languages', error);
      }
    };
    fetchLanguages();
  }, []);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const res = await MovieService.getAllGenresByLanguage(selectedLanguage);
        setGenres(res.data);
      } catch (error) {
        console.error('Error fetching genres', error);
      }
    };
    fetchGenres();
  }, [selectedLanguage]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        if (selectedLanguage && selectedGenre) {
          const res = await MovieService.getMoviesByLanguageAndGenre(selectedLanguage, selectedGenre);
          console.log('Fetched movies:', res.data);
          const data = res.data.movies || res.data;
          setMovies(Array.isArray(data) ? data : []);
        } else {
          setMovies([]);
        }
      } catch (err) {
        console.error('Error fetching movies', err);
        setMovies([]);
      }
    };

    fetchMovies();
  }, [selectedLanguage, selectedGenre]);

  useEffect(() => {
    const fetchPosters = async () => {
      const urls = {};
      for (const movie of movies) {
        if (!urls[movie.original_movie_id]) {
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

    if (Array.isArray(movies) && movies.length > 0) {
      fetchPosters();
    }
  }, [movies]);

  return (
    <div className='homepage'>
      <div className="container-fluid homepage py-4">

        <div className="language-cards-container">
          {languages.map((language) => (
            <div key={language.movie_language} className="language-card">
              <button
                className={`language-btn ${selectedLanguage === language.movie_language ? 'active' : ''}`} 
                onClick={() => setSelectedLanguage(language.movie_language)}  
              >
                <div className="card-content">
                  <h5>{language.movie_language}</h5>  
                  <p>{language.movie_count} Movies</p>  
                </div>
              </button>
            </div>
          ))}
        </div>

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

        <div className="button-container">
          <button
            className="see-more-btn"
            onClick={() => setShowMore(!showMore)}
          >
            {showMore ? 'Show Less' : 'See more..'}
          </button>
        </div>

        <div className={`movie-list ${showMore ? 'show-all' : 'show-limited'}`}>
          {Array.isArray(movies) && movies.slice(0, showMore ? movies.length : 5).map((movie) => (
            <div key={movie.id} className="movie-item">
              <div className="poster-container">
                <img
                  className="poster-image"
                  onClick={() => navigate(`/movie/${movie.movie_id}`)}
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
