import React, { useEffect, useState } from 'react';
import TMDB from '../services/TMDB';
import './css/HomePage.css';

// 🎯 Expanded Genre List
const GENRES = [
  { label: 'Trending', type: 'trending' },
  { label: 'Popular', type: 'popular' },
  { label: 'Action', type: '28' },
  { label: 'Adventure', type: '12' },
  { label: 'Animation', type: '16' },
  { label: 'Comedy', type: '35' },
  { label: 'Crime', type: '80' },
  { label: 'Documentary', type: '99' },
  { label: 'Drama', type: '18' },
  { label: 'Family', type: '10751' },
  { label: 'Fantasy', type: '14' },
  { label: 'History', type: '36' },
  { label: 'Horror', type: '27' },
  { label: 'Music', type: '10402' },
  { label: 'Mystery', type: '9648' },
  { label: 'Romance', type: '10749' },
  { label: 'Science Fiction', type: '878' },
  { label: 'TV Movie', type: '10770' },
  { label: 'Thriller', type: '53' },
  { label: 'War', type: '10752' },
  { label: 'Western', type: '37' },
];

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('trending');

  useEffect(() => {
    const fetchMovies = async () => {
      let data = [];

      if (selectedGenre === 'trending') {
        data = await TMDB.getTrendingMovies();
      } else if (selectedGenre === 'popular') {
        data = await TMDB.getPopularMovies();
      } else {
        data = await TMDB.getMoviesByGenre(selectedGenre);
      }

      setMovies(data);
    };

    fetchMovies();
  }, [selectedGenre]);

  return (
    <div className='homepage'>
      {/* 🎬 Genre List */}
      <ul className='genre-list'>
        {GENRES.map((genre) => (
          <li
            key={genre.type}
            className={selectedGenre === genre.type ? 'active' : ''}
            onClick={() => setSelectedGenre(genre.type)}
          >
            {genre.label}
          </li>
        ))}
      </ul>

      {/* 🏷️ Dynamic Section Title */}
      {/* <h1 className='section-title'>{GENRES.find(g => g.type === selectedGenre)?.label} Movies</h1> */}

      {/* 🎞️ Movie Slider */}
      <div className="slider">
        {movies.map((movie) => (
          <div key={movie.id} className="slide">
            <div className="poster-container">
              <img 
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                alt={movie.title} 
                className="poster-image"
              />
              <div className="overlay">
                <p className="movie-rating">⭐ {movie.vote_average.toFixed(1)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
