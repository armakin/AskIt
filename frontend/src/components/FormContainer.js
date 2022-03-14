import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const FormContainer = ({ children }) => {
  return (
    <Container className="mt-3 form-containter">
      <Row className="justify-content-md-center">
        <Col xs={12} md={6} style={{ minWidth: "250px" }}>
          {children}
        </Col>
      </Row>
    </Container>
  );
};

export default FormContainer;
