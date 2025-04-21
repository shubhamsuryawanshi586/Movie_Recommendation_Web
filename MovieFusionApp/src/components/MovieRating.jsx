import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import './css/MovieRating.css';
import RatingService from '../services/RatingService';

const MovieRating = () => {
  const [rating, setRating] = useState(0);
  const navigate = useNavigate();
  const { id } = useParams();

  const handleRatingClick = (value) => {
    setRating(value); 
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rating > 0) {
      const user = JSON.parse(localStorage.getItem('user'));
      const uid = user?.user_id;
      console.log("Movie value : " + id);
      console.log("Rating value : " + rating);
      console.log("User id : " + uid);
      const data = {
        user_id: uid,
        movie_id: id,
        rating_value: rating
      };
  
      RatingService.addRating(data)
        .then(response => {
          console.log('Rating added successfully:', response.data);
        })
        .catch(error => {
          console.error('Error adding rating:', error);
        });
    }
  };

  const handleClose = () => {
    navigate(`/movie/${id}`);
  };

  return (
    <div className='movierating'>
      <div className="d-flex justify-content-center align-items-center mt-4">
        <div className="card p-4 shadow position-relative" style={{ width: '350px' }}>

          {/* Close button */}
          <button
            type="button"
            className="btn-close position-absolute top-0 end-0 m-2"
            aria-label="Close"
            onClick={handleClose}
          ></button>

          <h5 className="card-title text-center">Rate this Movie</h5>
          <div className="text-center mb-3">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((star) => (
              <span
                key={star}
                style={{
                  cursor: 'pointer',
                  fontSize: '2rem',
                  color: star <= rating ? '#ffc107' : '#e4e5e9'
                }}
                onClick={() => handleRatingClick(star)}
              >
                ★
              </span>
            ))}
          </div>
          <div className="d-flex justify-content-center">
            <button onClick={handleSubmit} className="btn btn-primary btn-sm">
              Submit Rating
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieRating;
