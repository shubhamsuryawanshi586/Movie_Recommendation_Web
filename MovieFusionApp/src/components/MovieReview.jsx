import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; 
import Swal from 'sweetalert2';
import './css/MovieReview.css';
import ReviewService from '../services/ReviewService';

const MovieReview = () => {
  const [reviewText, setReviewText] = useState('');
  const navigate = useNavigate(); 
  const { id } = useParams();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (reviewText.trim()) {
      const user = JSON.parse(localStorage.getItem('user'));
      const uid = user?.user_id;

      const data = {
        user_id: uid,
        movie_id: id,
        review_text: reviewText
      };

      ReviewService.addReview(data)
        .then(response => {
          console.log('Review added successfully:', response.data);

          if (response.data === "You have already reviewed this movie!") {
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
              setReviewText(''); // Clear the textarea
              navigate(`/movie/${id}`);
            });
          }
        })
        .catch(error => {
          console.error('Error adding review:', error);
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
        title: 'Empty Review!',
        text: 'Please write something before submitting.',
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
    <div className='moviereview'>
      <div className="d-flex justify-content-center align-items-center mt-4">
        <div className="card p-4 shadow position-relative" style={{ width: '350px' }}>

          {/* Close button */}
          <button
            type="button"
            className="btn-close position-absolute top-0 end-0 m-2"
            aria-label="Close"
            onClick={handleClose}
          ></button>

          <h5 className="card-title text-center mt-3">Write a Review</h5>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <textarea
                className="form-control"
                rows="4"
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder="Share your thoughts about the movie..."
              ></textarea>
            </div>
            <div className="d-flex justify-content-center">
              <button type="submit" className="btn btn-success btn-sm">Submit Review</button>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
};

export default MovieReview;
