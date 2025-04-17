import React, { useEffect, useState, useRef } from 'react';
import TMDB from '../services/TMDB';
import MovieService from '../services/MovieService';
import './css/HomePage.css';
import { useNavigate } from 'react-router-dom';
const GENRES = [
  { label: 'Action', type: 'Action' },
  { label: 'Adventure', type: 'Adventure' },
  { label: 'Animation', type: 'Animation' },
  { label: 'Comedy', type: 'Comedy' },
  { label: 'Crime', type: 'Crime' },
  { label: 'Drama', type: 'Drama' },
  { label: 'Family', type: 'Family' },
  { label: 'Fantasy', type: 'Fantasy' },
  { label: 'Horror', type: 'Horror' },
  { label: 'Mystery', type: 'Mystery' },
  { label: 'Romance', type: 'Romance' },
  { label: 'Science Fiction', type: 'Science Fiction' },
  { label: 'Thriller', type: 'Thriller' },
  { label: 'War', type: 'War' },
];


const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('Action');
  const [posterUrls, setPosterUrls] = useState({});
  const sliderRef = useRef(null);
  const autoScrollRef = useRef(null); // Reference to store interval ID
  const isUserInteracting = useRef(false); // Track user interaction
  const navigate=useNavigate();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await MovieService.getMoviesByGenre(selectedGenre);
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
          urls[movie.movie_title] = '/default-poster.jpg';
        }
      }
      setPosterUrls(urls);
    };
    if (movies.length > 0) {
      fetchPosters();
    }
  }, [movies]);


  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -300, behavior: 'smooth' });
      handleUserInteraction();
    }
  };


  const scrollRight = () => {
    if (sliderRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
      // If at the end, reset to start
      if (scrollLeft + clientWidth >= scrollWidth - 10) { // Small buffer for precision
        sliderRef.current.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        sliderRef.current.scrollBy({ left: 300, behavior: 'smooth' });
      }
      handleUserInteraction();
    }
  };


  // Handle user interaction to pause auto-scroll temporarily
  const handleUserInteraction = () => {
    isUserInteracting.current = true;
    clearInterval(autoScrollRef.current); // Pause auto-scroll
    // Resume auto-scroll after 5 seconds of inactivity
    setTimeout(() => {
      isUserInteracting.current = false;
      startAutoScroll();
    }, 2000);
  };


  // Start auto-scroll
  const startAutoScroll = () => {
    if (autoScrollRef.current) {
      clearInterval(autoScrollRef.current); // Clear any existing interval
    }
    autoScrollRef.current = setInterval(() => {
      if (!isUserInteracting.current && sliderRef.current) {
        scrollRight();
      }
    }, 1500); // Auto-scroll every 2 seconds
  };


  // Set up and clean up auto-scroll
  useEffect(() => {
    if (movies.length > 0) {
      startAutoScroll();
    }
    return () => clearInterval(autoScrollRef.current); // Cleanup on unmount
  }, [movies]);


  return (
    <div className="container-fluid homepage py-4">
      {/* 🎬 Genre List */}
      <ul className="genre-list">
        {GENRES.map((genre) => (
          <li
            key={genre.type}
            className={`btn ${selectedGenre === genre.type ? 'active' : ''}`}
            onClick={() => setSelectedGenre(genre.type)}
          >
            {genre.label}
          </li>
        ))}
      </ul>


      {/* 🎞️ Movie Slider */}
      <div className="slider-container">
        <button
          className="scroll-button left btn btn-dark rounded-circle"
          onClick={scrollLeft}
          aria-label="Scroll left"
        >
          ←
        </button>
        <div className="slider" ref={sliderRef}>
          {movies.map((movie) => (
            <div key={movie.id} className="slide">
              <div className="poster-container">
                <img
                  className="poster-image" 
                  onClick={() => navigate(`/movie/${movie.movie_id}`)}
                  src={posterUrls[movie.movie_title] || '/default-poster.jpg'}
                  alt={movie.movie_title}
                />
              </div>
            </div>
          ))}
        </div>
        <button
          className="scroll-button right btn btn-dark rounded-circle"
          onClick={scrollRight}
          aria-label="Scroll right"
        >
          →
        </button>
      </div>
    </div>
  );
};


export default HomePage;



