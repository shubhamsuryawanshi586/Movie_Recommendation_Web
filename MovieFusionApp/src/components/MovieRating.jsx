import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import './css/MovieRating.css';
import Swal from 'sweetalert2';

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
      const data = {
        user_id: uid,
        movie_id: id,
        rating_value: rating
      };

      RatingService.addRating(data)
        .then(response => {
          console.log('Rating added successfully:', response.data);

          if (response.data === "You have Already given rating to this Movie...!!") {
            Swal.fire({
              title: 'Warning!',
              text: response.data,
              icon: 'warning',
              timer: 1500,
              position: 'top',
              width: '300px',
              padding: '10px',
              toast: true,
              background: '#ffffff',
              showConfirmButton: false,
            });
          } else {
            Swal.fire({
              title: 'Thank you!',
              text: response.data,
              icon: 'success',
              timer: 1500,
              position: 'top',
              width: '300px',
              padding: '10px',
              toast: true,
              background: '#ffffff',
              showConfirmButton: false,
            }).then(() => {
              navigate(`/movie/${id}`);
            });
          }
        })
        .catch(error => {
          console.error('Error adding rating:', error);
          Swal.fire({
            title: 'Error!',
            text: error.response?.data || 'Something went wrong!',
            icon: 'error',
            timer: 1500,
            position: 'top',
            width: '300px',
            padding: '10px',
            toast: true,
            background: '#ffffff',
            showConfirmButton: false,
          });
        });
    } else {
      Swal.fire({
        title: 'Select a Rating!',
        text: 'Please select a rating before submitting.',
        icon: 'warning',
        timer: 1500,
        position: 'top',
        width: '300px',
        padding: '10px',
        toast: true,
        background: '#ffffff',
        showConfirmButton: false,
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
