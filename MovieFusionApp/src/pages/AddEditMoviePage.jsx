import React, { useState, useEffect } from 'react';
import MovieService from '../services/MovieService';
import { useNavigate, useParams } from 'react-router-dom';
import './css/AddEditMoviePage.css';

const AddEditMoviePage = () => {
  const [movie, setMovie] = useState({
    movie_title: '',
    movie_mapping_name: '',
    movie_description: '',
    movie_category: '',
    movie_director_name: '',
    movie_actor1: '',
    movie_actor2: '',
    movie_actor3: '',
    movie_language: '',
    movie_type: '',
    movie_trailer_link: '',
    watch_link: '',
    movie_budget: '',
    movie_release_date: '',
    movie_country: ''
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (!id) return;
    const fetchMovie = async () => {
      try {
        const res = await MovieService.getMovieById(id);
        const fetchedMovie = res.data;
        setMovie({
          ...fetchedMovie,
          movie_budget: fetchedMovie.movie_budget || '',
          movie_release_date: fetchedMovie.movie_release_date || ''
        });
      } catch (error) {
        console.error('Failed to fetch movie', error);
      }
    };
    fetchMovie();
  }, [id]);
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMovie(prevMovie => ({
      ...prevMovie,
      [name]: value
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!movie.movie_title.trim()) newErrors.movie_title = 'Title is required';
    if (!movie.movie_category.trim()) newErrors.movie_category = 'Category is required';
    if (!movie.movie_director_name.trim()) newErrors.movie_director_name = 'Director Name is required';
    if (!movie.movie_language.trim()) newErrors.movie_language = 'Language is required';
    if (!movie.movie_release_date.trim()) newErrors.movie_release_date = 'Release Date is required';
    if (!movie.movie_country.trim()) newErrors.movie_country = 'Country is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      if (id) {
        await MovieService.updateMovie(id, movie);
      } else {
        await MovieService.addMovie(movie);
      }
      navigate('/admin/dashboard');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    navigate('/admin/dashboard');
  };

  return (
    <div className='addeditmoviepage'>
      <div className="container my-5 col-md-8">
        <h2 className=' mt-2 mb-3'>{id ? 'Edit Movie' : 'Add Movie'}</h2>
        <form onSubmit={handleSubmit}>
          {/* Form Fields */}
          <div className="mb-3">
            <input
              type="text"
              name="movie_title"
              value={movie.movie_title}
              placeholder="Movie Title *"
              onChange={handleChange}
              className="form-control"
              disabled={loading}
            />
            {errors.movie_title && <small className="text-danger">{errors.movie_title}</small>}
          </div>

          <div className="mb-3">
            <input
              type="text"
              name="movie_mapping_name"
              value={movie.movie_mapping_name}
              placeholder="Movie Mapping Name"
              onChange={handleChange}
              className="form-control"
              disabled={loading}
            />
          </div>

          <div className="mb-3">
            <textarea
              name="movie_description"
              value={movie.movie_description}
              placeholder="Movie Description"
              onChange={handleChange}
              className="form-control"
              disabled={loading}
            />
          </div>

          <div className="mb-3">
            <input
              type="text"
              name="movie_category"
              value={movie.movie_category}
              placeholder="Movie Category *"
              onChange={handleChange}
              className="form-control"
              disabled={loading}
            />
            {errors.movie_category && <small className="text-danger">{errors.movie_category}</small>}
          </div>

          <div className="mb-3">
            <input
              type="text"
              name="movie_director_name"
              value={movie.movie_director_name}
              placeholder="Director Name *"
              onChange={handleChange}
              className="form-control"
              disabled={loading}
            />
            {errors.movie_director_name && <small className="text-danger">{errors.movie_director_name}</small>}
          </div>

          {/* Actors */}
          <div className="mb-3">
            <input
              type="text"
              name="movie_actor1"
              value={movie.movie_actor1}
              placeholder="Actor 1"
              onChange={handleChange}
              className="form-control"
              disabled={loading}
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              name="movie_actor2"
              value={movie.movie_actor2}
              placeholder="Actor 2"
              onChange={handleChange}
              className="form-control"
              disabled={loading}
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              name="movie_actor3"
              value={movie.movie_actor3}
              placeholder="Actor 3"
              onChange={handleChange}
              className="form-control"
              disabled={loading}
            />
          </div>

          {/* Other Fields */}
          <div className="mb-3">
            <input
              type="text"
              name="movie_language"
              value={movie.movie_language}
              placeholder="Language *"
              onChange={handleChange}
              className="form-control"
              disabled={loading}
            />
            {errors.movie_language && <small className="text-danger">{errors.movie_language}</small>}
          </div>

          <div className="mb-3">
            <input
              type="text"
              name="movie_type"
              value={movie.movie_type}
              placeholder="Type (e.g. Action, Drama)"
              onChange={handleChange}
              className="form-control"
              disabled={loading}
            />
          </div>

          <div className="mb-3">
            <input
              type="text"
              name="movie_trailer_link"
              value={movie.movie_trailer_link}
              placeholder="Trailer Link"
              onChange={handleChange}
              className="form-control"
              disabled={loading}
            />
          </div>

          <div className="mb-3">
            <input
              type="text"
              name="watch_link"
              value={movie.watch_link}
              placeholder="Watch Link"
              onChange={handleChange}
              className="form-control"
              disabled={loading}
            />
          </div>

          <div className="mb-3">
            <input
              type="number"
              name="movie_budget"
              value={movie.movie_budget}
              placeholder="Budget"
              onChange={handleChange}
              className="form-control"
              disabled={loading}
              step="0.01"
            />
          </div>

          <div className="mb-3">
            <input
              type="date"
              name="movie_release_date"
              value={movie.movie_release_date}
              placeholder="Release Date *"
              onChange={handleChange}
              className="form-control"
              disabled={loading}
            />
            {errors.movie_release_date && <small className="text-danger">{errors.movie_release_date}</small>}
          </div>

          <div className="mb-3">
            <input
              type="text"
              name="movie_country"
              value={movie.movie_country}
              placeholder="Country *"
              onChange={handleChange}
              className="form-control"
              disabled={loading}
            />
            {errors.movie_country && <small className="text-danger">{errors.movie_country}</small>}
          </div>

          {/* Buttons */}
          <div className="d-flex gap-2">
            <button className="btn btn-success" type="submit" disabled={loading}>
              {loading ? 'Saving...' : id ? 'Update Movie' : 'Add Movie'}
            </button>
            <button type="button" className="btn btn-secondary" onClick={handleClose} disabled={loading}>
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEditMoviePage;
