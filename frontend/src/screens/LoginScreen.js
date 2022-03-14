import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Row, Col, Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";
import { login } from "../actions/userActions";

function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo && userInfo.token) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  function submitHandler(e) {
    e.preventDefault();

    if (password.length < 5) {
      setMessage(
        "Password is too short. Password must be at least 5 characters."
      );
    } else dispatch(login(email, password));
  }
  return (
    <FormContainer>
      <hr />
      <h3 style={{ textAlign: "center" }}>Sign In</h3>

      {message && (
        <Message variant="danger">
          <strong>{message}</strong>
        </Message>
      )}
      {error && !message && (
        <Message variant="danger">
          <strong>{error}</strong>
        </Message>
      )}

      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type="submit" className="mt-3 w-100" variant="success">
          Sign In
        </Button>
      </Form>

      <Row className="py-4">
        <Col>
          Don't have an account yet?
          <Link className="px-2" to="/register">
            Create one!
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
}

export default LoginScreen;
