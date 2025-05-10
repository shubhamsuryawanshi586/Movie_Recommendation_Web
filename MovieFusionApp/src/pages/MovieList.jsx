import React, { useEffect, useState } from 'react';
import MovieService from '../services/MovieService';
import MovieCard from '../components/MovieCard';
import AuthService from '../services/AuthService';
import './css/MovieList.css';

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 10;

  const user = AuthService.getCurrentAccount();

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

  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);
  const totalPages = Math.ceil(movies.length / moviesPerPage);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    scrollToTop();
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      scrollToTop();
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      scrollToTop();
    }
  };

  const renderPagination = () => {
    const pageNumbers = [];

    let startPage = 1;
    let endPage = totalPages;

    if (totalPages <= 4) {
      startPage = 1;
      endPage = totalPages;
    } else {
      if (currentPage <= 2) {
        startPage = 1;
        endPage = 4;
      } else if (currentPage >= totalPages - 1) {
        startPage = totalPages - 3;
        endPage = totalPages;
      } else {
        startPage = currentPage - 1;
        endPage = currentPage + 2;
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return (
      <nav className="pagination mt-4">
        <ul className="pagination justify-content-center">
          <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
            <button className="page-link" onClick={handlePrevious} disabled={currentPage === 1}>
              Previous
            </button>
          </li>

          {pageNumbers.map((number) => (
            <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
              <button className="page-link" onClick={() => handlePageChange(number)}>
                {number}
              </button>
            </li>
          ))}

          <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
            <button className="page-link" onClick={handleNext} disabled={currentPage === totalPages}>
              Next
            </button>
          </li>
        </ul>
      </nav>
    );
  };

  return (
    <div className='landingpage'>
      <div className="container">
        <div className='moviesbox'>
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-4">
            {currentMovies.map((movie) => (
              <div key={movie.movie_id} className="col d-flex justify-content-center">
                <MovieCard movie={movie} showReviewButton={!!user} />
              </div>
            ))}
          </div>

          {totalPages > 1 && renderPagination()}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
