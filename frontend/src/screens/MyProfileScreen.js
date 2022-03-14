import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { getUserDetails, updateUserProfile } from "../actions/userActions";
import FormContainer from "../components/FormContainer";

function ProfileScreen() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState(true);

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    } else {
      if (user && user.firstName) {
        setFirstName(user.firstName);
        setLastName(user.lastName);
        setEmail(user.email);
      } else {
        dispatch(getUserDetails("profile"));
      }
    }
  }, [dispatch, navigate, userInfo, user]);

  function submitHandler(e) {
    e.preventDefault();
    setShowMessage(true);

    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
    } else {
      setMessage("");
      dispatch(
        updateUserProfile({
          _id: user._id,
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password,
        })
      );
    }
    setTimeout(() => {
      setShowMessage(false);
    }, 2000);
  }
  return (
    <Row>
      <Col>
        <FormContainer>
          <h3 className="mb-0">Your profile</h3>
          <hr />
          {success && showMessage && (
            <Message variant="success">
              <strong>Profile successfully updated!</strong>
            </Message>
          )}
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
              <Form.Label>First name</Form.Label>
              <Form.Control
                type="last-name"
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
              <Form.Label>Change password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter new password"
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
              Update your profile
            </Button>
          </Form>
        </FormContainer>
      </Col>
    </Row>
  );
}

export default ProfileScreen;
