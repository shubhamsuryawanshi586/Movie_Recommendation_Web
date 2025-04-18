import React from "react";
import './css/AboutUs.css'; 

const AboutUs = () => {
  return (
    <div className="footermain">
      <div className="aboutus-container">

        <div className="header-section text-center mb-5">
          <h1 className="heading">About MovieFusionWeb</h1>
          <p className="description">
            MovieFusionWeb is a platform designed to offer personalized movie recommendations. 
            'Fusion' represents the integration of diverse movie-related data, genres, and user preferences into a seamless experience.
          </p>
        </div>

        <div className="cards-section">
          <div className="card-item">
            <h5 className="card-title">How It Works</h5>
            <p className="card-description">
              Using advanced algorithms, MovieFusionWeb analyzes your interests and recommends personalized movies just for you.
            </p>
          </div>
          <div className="card-item">
            <h5 className="card-title">Our Goal</h5>
            <p className="card-description">
              We aim to eliminate endless scrolling and help you find your next favorite movie easily.
            </p>
          </div>
          <div className="card-item">
            <h5 className="card-title">Why Choose Us?</h5>
            <p className="card-description">
              Whether you're into thrillers or comedies, MovieFusionWeb adapts to your unique taste.
            </p>
          </div>
        </div>

        <div className="quote-section text-center">
          <blockquote className="quote">
            "Movies are a journey — let us help you find the next one you'll never forget."
          </blockquote>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
