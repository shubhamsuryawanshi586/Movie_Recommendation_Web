import React, { useEffect, useState } from "react";
import MovieService from "../services/MovieService";
import { Container, Row, Col, Card } from "react-bootstrap";

const Recommendations = () => {
  const [recommended, setRecommended] = useState([]);

  // useEffect(() => {
  //   const userId = localStorage.getItem("userId");
  //   MovieService.getRecommendations(userId).then((res) => setRecommended(res.data));
  // }, []);

  return (
    <div className="" style={{minHeight:'100vh', marginTop:'2rem'}}>
      <div className="mt-1 p-5">
        <h2 className="text-align-center">Recommended For You 💡</h2>
        <Row>
          {recommended.map((movie) => (
            <Col key={movie.movieId} md={3} className="mt-3">
              <Card>
                <Card.Img variant="top" src={movie.posterUrl || "https://via.placeholder.com/200"} />
                <Card.Body>
                  <Card.Title>{movie.movieTitle}</Card.Title>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default Recommendations;
