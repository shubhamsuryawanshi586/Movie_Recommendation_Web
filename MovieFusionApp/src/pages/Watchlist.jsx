import React, { useEffect, useState } from "react";
import MovieService from "../services/MovieService";
import { Container, Row, Col, Card } from "react-bootstrap";

const Watchlist = () => {
  const [watchlist, setWatchlist] = useState([]);

  // useEffect(() => {
  //   const userId = localStorage.getItem("userId");
  //   MovieService.getWatchlist(userId).then((res) => setWatchlist(res.data));
  // }, []);

  return (
    <div className="" style={{ minHeight: '100vh', marginTop: '4rem' }}>
      <Container className="mt-4 ">
        <h2 >My Watchlist 🎬</h2>
        <Row>
          {watchlist.map((movie) => (
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
      </Container>
    </div>
  );
};

export default Watchlist;
