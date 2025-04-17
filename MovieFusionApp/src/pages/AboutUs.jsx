import React from "react";

const AboutUs = () => {
  return (
    <div style={{ minHeight: '100vh', marginTop: '90px', backgroundColor: '', marginBottom: "0" }}>
      <div className="p-3 mt-5">
        {/* Header Section */}
        <div className="container text-center mb-5">
          <h1 className="display-4 font-weight-bold mb-4" style={{ fontWeight: '600' }}>About MovieFusionWeb</h1>
          <p className="lead">
            MovieFusionWeb is an intelligent movie recommendation system designed to help you discover the perfect movie tailored to your taste.
          </p>
        </div>

        {/* Cards Section */}
        <div className="container">
          <div className="row">
            {/* Card 1 */}
            <div className="col-md-4 mb-4">
              <div className="card shadow-lg rounded-lg h-100">
                <div className="card-body">
                  <h5 className="card-title text-primary">How It Works</h5>
                  <p className="card-text text-muted">
                    Using advanced algorithms and user preferences, MovieFusionWeb analyzes your interests and recommends movies you'll love — personalized just for you.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="col-md-4 mb-4">
              <div className="card shadow-lg rounded-lg h-100">
                <div className="card-body">
                  <h5 className="card-title text-primary">Our Goal</h5>
                  <p className="card-text text-muted">
                    Our goal is simple: eliminate endless scrolling. We help you find your next favorite movie faster, smarter, and easier.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="col-md-4 mb-4">
              <div className="card shadow-lg rounded-lg h-100">
                <div className="card-body">
                  <h5 className="card-title text-primary">Why Choose Us?</h5>
                  <p className="card-text text-muted">
                    Whether you love thrillers, comedies, or hidden indie gems, MovieFusionWeb adapts to your unique taste — making every movie night perfect.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quote Section */}
        <div className="container text-center mt-4">
          <blockquote className="blockquote">
            <p className="mb-0 ">
              "Movies are a journey — let us help you find the next one you'll never forget."
            </p>
          </blockquote>
        </div>

      </div>
    </div>
  );
};

export default AboutUs;
