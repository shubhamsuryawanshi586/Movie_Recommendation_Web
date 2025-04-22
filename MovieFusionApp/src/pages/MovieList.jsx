import React, { useEffect, useState } from 'react';
import MovieService from '../services/MovieService';
import MovieCard from '../components/MovieCard';
import AuthService from '../services/AuthService';
import './css/MovieList.css';

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 10; // Set number of movies per page to 10

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

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className='landingpage'>
      <div className="container">
        <div className='moviesbox'>
          {/* <h2 className="mb-4 text-center">🎬 Explore Movies</h2> */}
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-4">
            {currentMovies.map((movie) => (
              <div key={movie.movie_id} className="col d-flex justify-content-center">
                <MovieCard movie={movie} showReviewButton={!!user} />
              </div>
            ))}
          </div>

          {/* Pagination */}
          <nav className="pagination mt-4">
            <ul className="pagination justify-content-center">
              <li className="page-item">
                <button
                  className="page-link"
                  onClick={handlePrevious}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
              </li>

              {Array.from({ length: totalPages }, (_, index) => (
                <li
                  key={index}
                  className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}
                >
                  <button className="page-link" onClick={() => handlePageChange(index + 1)}>
                    {index + 1}
                  </button>
                </li>
              ))}

              <li className="page-item">
                <button
                  className="page-link"
                  onClick={handleNext}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default MovieList;
