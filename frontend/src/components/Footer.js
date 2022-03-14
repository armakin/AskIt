import React from "react";
import { Container, Row, Col } from "react-bootstrap";

function Footer() {
  return (
    <footer>
      <Container>
        <Row>
          <Col className="text-center mt-3 mb-3">
            Copyright &copy; 2022 Armin Sarak
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
