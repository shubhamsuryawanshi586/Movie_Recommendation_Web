import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './css/MovieRating.css';

const MovieRating = ({ onRatingSubmit }) => {
  const [rating, setRating] = useState(0);
  const navigate = useNavigate(); 

  const handleRatingClick = (value) => {
    setRating(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rating > 0) {
      onRatingSubmit(rating);
    }
  };

  const handleClose = () => {
    navigate('/');
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
            {[1, 2, 3, 4, 5].map((star) => (
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
