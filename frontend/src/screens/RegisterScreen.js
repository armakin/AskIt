import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";
import { register } from "../actions/userActions";

function RegisterScreen() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

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
    } else if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
    } else {
      setMessage("");
      dispatch(register(firstName, lastName, email, password));
    }
  }
  return (
    <FormContainer>
      <hr />
      <h3 style={{ textAlign: "center" }}>Sign Up</h3>

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
        <Form.Group controlId="first-name">
          <Form.Label>First name</Form.Label>
          <Form.Control
            type="first-name"
            placeholder="Enter your first name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="last-name">
          <Form.Label>Last name</Form.Label>
          <Form.Control
            type="lstName"
            placeholder="Enter your last name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          ></Form.Control>
        </Form.Group>

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

        <Form.Group controlId="confirmPassword">
          <Form.Label>Confirm password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type="submit" className="mt-3 w-100" variant="success">
          Sign Up
        </Button>
      </Form>

      <Row className="py-4">
        <Col>
          Already have an account?
          <Link className="px-2" to="/login">
            Sign in!
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
}

export default RegisterScreen;
