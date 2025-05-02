import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Modal } from 'react-bootstrap';
import './css/MovieDetailsPage.css';
import MovieService from '../services/MovieService';
import WatchListService from '../services/WatchListService';
import TMDB from '../services/TMDB';
import Swal from 'sweetalert2';

const MovieDetailsPage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState({});
  const [posterUrl, setPosterUrl] = useState('/default-poster.jpg');
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [watchUrl, setWatchUrl] = useState(null);
  const [showTrailerModal, setShowTrailerModal] = useState(false); // State for modal visibility

  const navigate = useNavigate();

  useEffect(() => {
    MovieService.getMovieById(id).then(res => setMovie(res.data));
  }, [id]);

  useEffect(() => {
    const fetchPoster = async () => {
      if (movie.original_movie_id) {
        const url = await TMDB.fetchMoviePosterById(movie.original_movie_id);
        setPosterUrl(url);
      }
    };
    fetchPoster();
  }, [movie.original_movie_id]);

  useEffect(() => {
    const userString = localStorage.getItem('user');
    setIsUserLoggedIn(!!userString);
  }, []);

  const handleAddToWatchlist = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const uid = user?.user_id;

    if (!uid) {
      return Swal.fire({
        icon: 'info',
        title: 'Info',
        text: 'You must be logged in to add to watchlist.',
        toast: true,
        position: 'top',
        timer: 1500,
        showConfirmButton: false
      });
    }

    try {
      const res = await WatchListService.addToWatchlist(uid, movie.movie_id);
      const alreadyInWatchlist = res.data === "Movie Already in watchlist";

      Swal.fire({
        icon: alreadyInWatchlist ? 'warning' : 'success',
        title: alreadyInWatchlist ? 'Already Added' : 'Added!',
        text: alreadyInWatchlist
          ? 'This movie is already in your watchlist.'
          : 'Movie added to your watchlist.',
        toast: true,
        position: 'top',
        timer: 1500,
        showConfirmButton: false
      });
    } catch (err) {
      console.error("Watchlist error:", err);
      Swal.fire({
        icon: 'error',
        title: 'Oops!',
        text: 'Something went wrong.',
        toast: true,
        position: 'top',
        timer: 1500,
        showConfirmButton: false
      });
    }
  };

  const handleReviewClick = () => {
    if (isUserLoggedIn) navigate(`/movie/${movie.movie_id}/review`);
    else showLoginAlert('review');
  };

  const handleRateClick = () => {
    if (isUserLoggedIn) {
      navigate(`/movie/${movie.movie_id}/rating`);
    }
    else
      showLoginAlert('rate');
  };

  const handleWatchClick = async () => {
    if (isUserLoggedIn) {
      if (movie.original_movie_id) {
        try {
          const embedUrl = await TMDB.fetchYouTubeTrailerById(movie.original_movie_id);
          if (embedUrl) {
            setWatchUrl(embedUrl);
            setShowTrailerModal(true); // Open modal on click
          } else if (movie.watch_link) {
            // If no trailer, use movie.link and redirect to YouTube
            window.open(movie.watch_link, '_blank');
          } else {
            Swal.fire({
              icon: 'info',
              title: 'Not Available',
              text: 'Movie link is not available, and no external movie link is provided.',
              toast: true,
              position: 'top',
              timer: 1500,
              showConfirmButton: false
            });
          }
        } catch (error) {
          console.error('Failed to fetch trailer URL:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Failed to fetch movie link.',
            toast: true,
            position: 'top',
            timer: 1500,
            showConfirmButton: false
          });
        }
      } else {
        Swal.fire({
          icon: 'info',
          title: 'Missing ID',
          text: 'Original TMDB ID is not available for this movie.',
          toast: true,
          position: 'top',
          timer: 1500,
          showConfirmButton: false
        });
      }
    } else {
      showLoginAlert('watch');
    }
  };
  
  const handleTrailerClick = async () => {
    if (isUserLoggedIn || !isUserLoggedIn) {
      if (movie.original_movie_id) {
        try {
          const embedUrl = await TMDB.fetchYouTubeTrailerById(movie.original_movie_id);

          if (embedUrl != null) {
            setWatchUrl(embedUrl);
            setShowTrailerModal(true); // Open modal on click
            console.log(movie.watch_link);
          } else if (movie.watch_link) {
            // If no trailer, use movie.link and redirect to YouTube
            console.log(movie.watch_link);
            window.open(movie.watch_link, '_blank');
          } else {
            Swal.fire({
              icon: 'info',
              title: 'Not Available',
              text: 'Trailer link is not available, and no external movie link is provided.',
              toast: true,
              position: 'top',
              timer: 1500,
              showConfirmButton: false
            });
          }
        } catch (error) {
          console.error('Failed to fetch trailer URL:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Failed to fetch trailer link.',
            toast: true,
            position: 'top',
            timer: 1500,
            showConfirmButton: false
          });
        }
      } else {
        Swal.fire({
          icon: 'info',
          title: 'Missing ID',
          text: 'Original TMDB ID is not available for this movie.',
          toast: true,
          position: 'top',
          timer: 1500,
          showConfirmButton: false
        });
      }
    } else {
      showLoginAlert('watch');
    }
  };
  

  const showLoginAlert = (action) => {
    Swal.fire({
      icon: 'info',
      title: 'Login Required',
      text: `You must be logged in to ${action} this movie.`,
      toast: true,
      position: 'top',
      timer: 1500,
      showConfirmButton: false
    });
  };

  const handleClose = () => navigate(`/movies`);

  return (
    <div className="movie-details-page">
      <div className="movie-container">
        {/* Header */}
        <div className="movie-header">
          <h2>{movie.movie_title}</h2>
          <button className="btn btn-danger" onClick={handleClose}>Close</button>
        </div>

        {/* Content */}
        <div className="movie-content">
          {/* Poster */}
          <div className="movie-poster">
            <img src={posterUrl} alt={`${movie.movie_title} Poster`}
              style={{ opacity: posterUrl === '/default-poster.jpg' ? 0.5 : 1 }} />
          </div>

          {/* Details */}
          <div className="movie-info">
            <p><strong>Director:</strong> {movie.movie_director_name}</p>
            <p><strong>Actors:</strong> {movie.movie_actor1}, {movie.movie_actor2}, {movie.movie_actor3}</p>
            <p className='movie-description'><strong>Description:</strong> {movie.movie_description}</p>
            <p><strong>Category:</strong> {movie.movie_category}</p>
            <p><strong>Duration:</strong> {movie.movie_duration}</p>
            <p><strong>Language:</strong> {movie.movie_language}</p>

            {/* Action Buttons */}
            <div className="button-group">      
              <button className="btn btn-primary" onClick={handleTrailerClick}>Trailer</button>
              <button className="btn btn-success" onClick={handleWatchClick}>Watch</button>
              <button className="btn btn-warning" onClick={handleAddToWatchlist}>Add to Watchlist</button>
              <button className="btn btn-outline-success" onClick={handleReviewClick}>Review</button>
              <button className="btn btn-outline-info" onClick={handleRateClick}>Rate</button>
            </div>
          </div>
        </div>

        {/* Modal for Trailer */}
        <Modal show={showTrailerModal} onHide={() => setShowTrailerModal(false)} centered size="lg">
          <Modal.Header closeButton>
          </Modal.Header>
          <Modal.Body>
            {watchUrl && (
              <div className="ratio ratio-16x9">
                <iframe
                  src={watchUrl}
                  title="Trailer"
                  allowFullScreen
                  style={{ width: '100%', height: '100%' }}
                ></iframe>
              </div>
            )}
          </Modal.Body>
        </Modal>

      </div>
    </div>
  );
};

export default MovieDetailsPage;
