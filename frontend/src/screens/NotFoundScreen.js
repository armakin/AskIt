import React from "react";
import { Row, Col, Image } from "react-bootstrap";

function NotFoundScreen() {
  return (
    <>
      <Row>
        <Col className="home-content text-center">
          <h1>Error 404</h1>

          <Image
            src="/images/not-found-404.png"
            className="w-50 center"
            alt="Page not found"
          />

          <div className="home-content text-center my-3">
            <h2>Page not found :(</h2>
          </div>
        </Col>
      </Row>
    </>
  );
}

export default NotFoundScreen;
