import React from "react";


const Contact = () => {
  return (
    <div 
      className="d-flex justify-content-center align-items-center" 
      style={{ minHeight: '90vh', paddingTop: '7rem', paddingBottom: '4rem', marginTop:'1.2rem', marginBottom:'1.3rem' }}
    >
      <div className="card shadow-lg p-4 border-0 rounded-3"  >
        <h2 className="text-center mb-4 text-primary">Contact Us</h2>
        <div className="fs-5">
          <p className="mb-3"> <strong>Phone:</strong> 91+ 9158596208</p>
          <p className="mb-3"> <strong>Email:</strong> shubham@gmail.com </p>
          <p> <strong>Address:</strong> Giri's Tech Hub, Pune</p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
