import React, { useEffect, useState } from 'react';
import MovieService from '../services/MovieService.js';
import { useSearchParams } from 'react-router-dom';
import MovieCard from '../components/MovieCard';
// import SearchBar from '../components/SearchBar';

const SearchResultsPage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [params] = useSearchParams();

  useEffect(() => {
    const query = params.get('q');
    if (query) {
      setLoading(true);
      MovieService.searchMovies(query)
        .then(res => setMovies(res.data))
        .catch(error => console.error('Error fetching search results:', error))
        .finally(() => setLoading(false));
    }
  }, [params]);

  return (
    <div className='searchresultpage' style={{marginTop:'100px', minHeight:'73vh'}}>
      {/* <SearchBar/> */}
      <div className="container my-4">
        {/* <h2 className="mb-4 text-center">Search Results</h2>  */}

        {loading ? (
          <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "100px" }}>
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <>
            {movies.length === 0 ? (
              <p className="text-center">No movies found matching your search.</p>
            ) : (
              <div className="row row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-3 g-4">
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
