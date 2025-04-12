import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './css/MovieReview.css';

const MovieReview = () => {
  const [reviewText, setReviewText] = useState('');
  const navigate = useNavigate(); 
  const handleSubmit = (e) => {
    e.preventDefault();
    if (reviewText.trim()) {
      setReviewText('');
    }
  };

  const handleClose = () => {
    navigate('/'); 
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
