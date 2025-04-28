import React, { useState, useEffect } from 'react';
import MovieService from '../services/MovieService';
import { useNavigate, useParams } from 'react-router-dom';
import './css/AddEditMoviePage.css';
import Swal from 'sweetalert2';

const AddEditMoviePage = () => {
  const [movie, setMovie] = useState({
    original_movie_id: 0,
    movie_title: '',
    movie_mapping_name: '',
    movie_description: '',
    movie_category: '',
    movie_director_name: '',
    movie_actor1: '',
    movie_actor2: '',
    movie_actor3: '',
    movie_language: '',
    movie_trailer_link: '',
    watch_link: '',
    movie_duration: '',
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

    // Update the value of the movie field
    setMovie(prevMovie => ({
      ...prevMovie,
      [name]: value
    }));

    // Check for runtime validation for each field
    const newErrors = { ...errors };

    // Validate original_movie_id: Must be a number
    if (name === 'original_movie_id' && !/^[0-9\s]+$/.test(value)) {
      newErrors.original_movie_id = 'Original Movie ID must be a number';
    } else {
      delete newErrors.original_movie_id; // Remove error if the field is valid
    }

    // Validate other fields as they are changed
    if (name === 'movie_title' && !/^[A-Za-z0-9\s]+$/.test(value)) {
      newErrors.movie_title = 'Title can only contain letters, numbers, and spaces';
    } else if (name === 'movie_category' && !/^[A-Za-z\s,]+$/.test(value)) {
      newErrors.movie_category = 'Category can only contain letters and spaces';
    } else if (name === 'movie_director_name' && !/^[A-Za-z\s]+$/.test(value)) {
      newErrors.movie_director_name = 'Director Name can only contain letters and spaces';
    } else if (name === 'movie_actor1' && value.trim() && !/^[A-Za-z\s]+$/.test(value)) {
      newErrors.movie_actor1 = 'Actor 1 can only contain letters and spaces';
    } else if (name === 'movie_actor2' && value.trim() && !/^[A-Za-z\s-]+$/.test(value)) {
      newErrors.movie_actor2 = 'Actor 2 can only contain letters and spaces';
    } else if (name === 'movie_actor3' && value.trim() && !/^[A-Za-z\s]+$/.test(value)) {
      newErrors.movie_actor3 = 'Actor 3 can only contain letters and spaces';
    } else if (name === 'movie_language' && !/^[A-Za-z\s]+$/.test(value)) {
      newErrors.movie_language = 'Language can only contain letters and spaces';
    } else if (name === 'movie_trailer_link' && value.trim() && !/^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w-]*)*\/?(\?.*)?$/i.test(value)) {
      newErrors.movie_trailer_link = 'Enter a valid Trailer URL';
    } else if (name === 'watch_link' && value.trim() && !/^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w-]*)*\/?(\?.*)?$/i.test(value)) {
      newErrors.watch_link = 'Enter a valid Watch URL';
    } else if (name === 'movie_duration' && value.trim() && isNaN(Number(value))) {
      newErrors.movie_duration = 'Duration must be a number';
    } else if (name === 'movie_budget' && value.trim() && (isNaN(Number(value)) || Number(value) < 0)) {
      newErrors.movie_budget = 'Budget must be a valid positive number';
    } else if (name === 'movie_country' && !/^[A-Za-z\s,]+$/.test(value)) {
      newErrors.movie_country = 'Country can only contain letters and spaces';
    } else {
      delete newErrors[name]; // Clear error if field is valid
    }

    if (name === 'movie_mapping_name') {
      if (!/^[A-Za-z0-9\s]+$/.test(value)) {
        newErrors.movie_mapping_name = 'Movie Mapping Name can only contain letters, numbers, and spaces';
      } else if (!value.trim()) {
        newErrors.movie_mapping_name = 'Movie Mapping Name is required';
      } else {
        delete newErrors.movie_mapping_name; // Clear error if valid
      }
    }

    if (name === 'movie_description') {
      if (!value.trim()) {
        newErrors.movie_description = 'Movie description is required';
      } else if (value.length > 1200) {
        newErrors.movie_description = 'Description must be less than 1200 characters';
      } else {
        delete newErrors.movie_description; // Clear error if valid
      }
    }
    
    

    
    if (name === 'movie_release_date') {
      const releaseDate = value.trim();
  
      // Check if movie_release_date is empty
      if (!releaseDate) {
        newErrors.movie_release_date = 'Release Date is required';
      } else {
        // Check if the release date is a valid date
        const parsedDate = new Date(releaseDate);
        if (isNaN(parsedDate.getTime())) {
          newErrors.movie_release_date = 'Release Date must be a valid date';
        } else {
          // Check if the release date is greater than the current date
          const currentDate = new Date();
          if (parsedDate <= currentDate) {
            newErrors.movie_release_date = 'Release Date must be greater than the current date';
          } else {
            delete newErrors.movie_release_date; // Remove the error if it's valid
          }
        }
      }
    }
    setErrors(newErrors);
  };

  const validate = () => {
    const newErrors = {};

    const onlyLettersRegex = /^[A-Za-z\s,-_]+$/;
    const titleRegex = /^[A-Za-z0-9\s]+$/;
    const urlRegex = /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w-]*)*\/?(\?.*)?$/i;

    const originalMovieId = movie.original_movie_id ? String(movie.original_movie_id).trim() : '';

    if (!originalMovieId) {
      newErrors.original_movie_id = 'Original Movie ID is required';
    } else if (!/^\d+$/.test(originalMovieId)) {
      newErrors.original_movie_id = 'Original Movie ID must be an integer';
    } else {
      const numericId = Number(originalMovieId);
      if (isNaN(numericId)) {
        throw new TypeError('Original Movie ID must be a valid number');
      }
      delete newErrors.original_movie_id; // Remove the error if it's valid
    }

    if (!movie.movie_title || !movie.movie_title.trim()) {
      newErrors.movie_title = 'Title is required';
    } else if (!titleRegex.test(movie.movie_title.trim())) {
      newErrors.movie_title = 'Title can only contain letters, numbers, and spaces';
    }

      // Full validation for movie_mapping_name
  if (!movie.movie_mapping_name || !movie.movie_mapping_name.trim()) {
    newErrors.movie_mapping_name = 'Movie Mapping Name is required';
  } else if (!/^[A-Za-z0-9\s]+$/.test(movie.movie_mapping_name.trim())) {
    newErrors.movie_mapping_name = 'Movie Mapping Name can only contain letters, numbers, and spaces';
  }

  // Full validation for movie_description
if (!movie.movie_description || !movie.movie_description.trim()) {
  newErrors.movie_description = 'Movie Description is required';
} else if (movie.movie_description.trim().length > 1000) {
  newErrors.movie_description = 'Description must be less than 1000 characters';
} else {
  delete newErrors.movie_description; // Clear error if valid (allowing all characters)
}


    if (!movie.movie_category || !movie.movie_category.trim()) {
      newErrors.movie_category = 'Category is required';
    } else if (!onlyLettersRegex.test(movie.movie_category.trim())) {
      newErrors.movie_category = 'Category can only contain letters and spaces';
    }

    if (!movie.movie_director_name || !movie.movie_director_name.trim()) {
      newErrors.movie_director_name = 'Director Name is required';
    } else if (!onlyLettersRegex.test(movie.movie_director_name.trim())) {
      newErrors.movie_director_name = 'Director Name can only contain letters and spaces';
    }

    // Actors
    if (!movie.movie_actor1 && !movie.movie_actor2 && !movie.movie_actor3) {
      newErrors.movie_actor1 = 'At least one Actor is required';
    } else {
      if (movie.movie_actor1 && movie.movie_actor1.trim() && !onlyLettersRegex.test(movie.movie_actor1.trim())) {
        newErrors.movie_actor1 = 'Actor 1 can only contain letters and spaces';
      }
      if (movie.movie_actor2 && movie.movie_actor2.trim() && !onlyLettersRegex.test(movie.movie_actor2.trim())) {
        newErrors.movie_actor2 = 'Actor 2 can only contain letters and spaces';
      }
      if (movie.movie_actor3 && movie.movie_actor3.trim() && !onlyLettersRegex.test(movie.movie_actor3.trim())) {
        newErrors.movie_actor3 = 'Actor 3 can only contain letters and spaces';
      }
    }

    if (!movie.movie_language || !movie.movie_language.trim()) {
      newErrors.movie_language = 'Language is required';
    } else if (!onlyLettersRegex.test(movie.movie_language.trim())) {
      newErrors.movie_language = 'Language can only contain letters and spaces';
    }

    if (!movie.movie_trailer_link || !movie.movie_trailer_link.trim()) {
      newErrors.movie_trailer_link = 'Trailer Link is required';
    } else if (!urlRegex.test(movie.movie_trailer_link.trim())) {
      newErrors.movie_trailer_link = 'Enter a valid Trailer URL';
    }

    if (!movie.watch_link || !movie.watch_link.trim()) {
      newErrors.watch_link = 'Watch Link is required';
    } else if (!urlRegex.test(movie.watch_link.trim())) {
      newErrors.watch_link = 'Enter a valid Watch URL';
    }

    if (!movie.movie_duration || !movie.movie_duration.trim()) {
      newErrors.movie_duration = 'Duration is required';
    } else if (isNaN(Number(movie.movie_duration))) {
      newErrors.movie_duration = 'Duration must be a number';
    }

    if (movie.movie_budget === '' || movie.movie_budget === null || movie.movie_budget === undefined) {
      newErrors.movie_budget = 'Budget is required';
    } else if (isNaN(Number(movie.movie_budget)) || Number(movie.movie_budget) < 0) {
      newErrors.movie_budget = 'Budget must be a valid positive number';
    }

    if (!movie.movie_release_date || !movie.movie_release_date.trim()) {
      newErrors.movie_release_date = 'Release Date is required';
    }

    if (!movie.movie_country || !movie.movie_country.trim()) {
      newErrors.movie_country = 'Country is required';
    } else if (!onlyLettersRegex.test(movie.movie_country.trim())) {
      newErrors.movie_country = 'Country can only contain letters and spaces';
    }

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
        Swal.fire({
          icon: 'success',
          title: 'Movie Updated!',
          text: 'The movie has been updated successfully.',
          timer: 2000,
          showConfirmButton: false,
        });
      } else {
        await MovieService.addMovie(movie);
        Swal.fire({
          icon: 'success',
          title: 'Movie Added!',
          text: 'The movie has been added successfully.',
          timer: 2000,
          showConfirmButton: false,
        });
      }
      // Wait for the alert to close before navigating
      setTimeout(() => {
        navigate('/admin/dashboard');
      }, 2000);
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
              type="number"
              name="original_movie_id"
              value={movie.original_movie_id}
              placeholder="Movie Original ID *"
              onChange={handleChange}
              className="form-control"
              disabled={loading}
            />
            {errors.original_movie_id && <small className="text-danger">{errors.original_movie_id}</small>}
          </div>

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
             {errors.movie_mapping_name && <small className="text-danger">{errors.movie_mapping_name}</small>}
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
             {errors.movie_description && <small className="text-danger">{errors.movie_description}</small>}
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
            {errors.movie_actor1 && <small className="text-danger">{errors.movie_actor1}</small>}
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
            {errors.movie_actor2 && <small className="text-danger">{errors.movie_actor2}</small>}
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
            {errors.movie_actor3 && <small className="text-danger">{errors.movie_actor3}</small>}
          </div>

          <div className="mb-3">
            <input
              type="text"
              name="movie_language"
              value={movie.movie_language}
              placeholder="Movie Language *"
              onChange={handleChange}
              className="form-control"
              disabled={loading}
            />
            {errors.movie_language && <small className="text-danger">{errors.movie_language}</small>}
          </div>

          <div className="mb-3">
            <input
              type="text"
              name="movie_trailer_link"
              value={movie.movie_trailer_link}
              placeholder="Trailer Link *"
              onChange={handleChange}
              className="form-control"
              disabled={loading}
            />
            {errors.movie_trailer_link && <small className="text-danger">{errors.movie_trailer_link}</small>}
          </div>

          <div className="mb-3">
            <input
              type="text"
              name="watch_link"
              value={movie.watch_link}
              placeholder="Watch Link *"
              onChange={handleChange}
              className="form-control"
              disabled={loading}
            />
            {errors.watch_link && <small className="text-danger">{errors.watch_link}</small>}
          </div>

          <div className="mb-3">
            <input
              type="text"
              name="movie_duration"
              value={movie.movie_duration}
              placeholder="Duration *"
              onChange={handleChange}
              className="form-control"
              disabled={loading}
            />
            {errors.movie_duration && <small className="text-danger">{errors.movie_duration}</small>}
          </div>

          <div className="mb-3">
            <input
              type="number"
              name="movie_budget"
              value={movie.movie_budget}
              placeholder="Budget *"
              onChange={handleChange}
              className="form-control"
              disabled={loading}
            />
            {errors.movie_budget && <small className="text-danger">{errors.movie_budget}</small>}
          </div>

          <div className="mb-3">
            <input
              type="date"
              name="movie_release_date"
              value={movie.movie_release_date}
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

          {/* Submit and close buttons */}
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
