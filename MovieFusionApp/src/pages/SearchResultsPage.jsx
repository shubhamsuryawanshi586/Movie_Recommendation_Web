import React, { useEffect, useState } from 'react';
import MovieService from '../services/MovieService.js';
import { useSearchParams } from 'react-router-dom';
import MovieCard from '../components/MovieCard';
import './css/SearchResultPage.css';

const SearchResultsPage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [params] = useSearchParams();

  const query = params.get('q');

  useEffect(() => {
    if (query) {
      setLoading(true);
      MovieService.searchMovies(query)
        .then(res => setMovies(res.data))
        .catch(error => console.error('Error fetching search results:', error))
        .finally(() => setLoading(false));
    }
  }, [query]);

  return (
    <div className='searchresultpage' style={{ marginTop: '90px', minHeight: '73vh' }}>
      <div className="container my-5">
        <h2 className="text-center mb-4">
          {query ? `Search Results for "${query}"` : 'Search Movies'}
        </h2>

        {loading ? (
          <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "200px" }}>
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <>
            {movies.length === 0 ? (
              <div className="text-center mt-4">
                <h5 className="text-muted">No movies found matching your search.</h5>
              </div>
            ) : (
              <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
                {movies.map(movie => (
                  <div className="col d-flex justify-content-center" key={movie.movie_id}>
                    <MovieCard movie={movie} showReviewButton={true} />
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default SearchResultsPage;
