import React, { useEffect, useState } from 'react';
import TMDB from '../services/TMDB';
import MovieService from '../services/MovieService';
import './css/HomePage.css';

const GENRES = [
  // { label: 'Trending', type: 'Trending' },
  // { label: 'Popular', type: 'Popular' },
  { label: 'Action', type: 'Action' },
  { label: 'Adventure', type: 'Adventure' },
  { label: 'Animation', type: 'Animation' },
  { label: 'Comedy', type: 'Comedy' },
  { label: 'Crime', type: 'Crime' },
  // { label: 'Documentary', type: 'Documentary' },
  { label: 'Drama', type: 'Drama' },
  { label: 'Family', type: 'Family' },
  { label: 'Fantasy', type: 'Fantasy' },
  // { label: 'History', type: 'History' },
  { label: 'Horror', type: 'Horror' },
  // { label: 'Music', type: 'Music' },
  { label: 'Mystery', type: 'Mystery' },
  { label: 'Romance', type: 'Romance' },
  { label: 'Science Fiction', type: 'Science Fiction' },
  // { label: 'TV Movie', type: 'TV Movie' },
  { label: 'Thriller', type: 'Thriller' },
  { label: 'War', type: 'War' },
  // { label: 'Western', type: 'Western' },
];


const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('Action');
  const [posterUrls, setPosterUrls] = useState({}); // store multiple poster URLs

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await MovieService.getMoviesByGenre(selectedGenre);
        // console.log('Movies API response:', res.data); 
        setMovies(res.data.movies || res.data);
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
        try {
          const url = await TMDB.fetchMoviePosterByTitle(movie.movie_title);
          urls[movie.movie_title] = url;
        } catch (error) {
          // console.error('Error fetching poster for:', movie.movie_title, error);
          urls[movie.movie_title] = '/default-poster.jpg'; 
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

      {/* 🎞️ Movie Slider */}
      <div className="slider">
        {movies.map((movie) => (
          <div key={movie.id} className="slide">
            <div className="poster-container">
              <img className="poster-image" src={posterUrls[movie.movie_title] || '/default-poster.jpg'}  alt={movie.movie_title}/>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
