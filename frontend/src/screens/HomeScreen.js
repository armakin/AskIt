import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col } from "react-bootstrap";
import QuestionList from "../components/QuestionList";
import Loader from "../components/Loader";
import Message from "../components/Message";
import QuestionForm from "../components/QuestionForm";

function HomeScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loadQuestions = async () => {
    setIsLoading(true);

    try {
      const userInfo = localStorage.getItem("userInfo")
        ? JSON.parse(localStorage.getItem("userInfo"))
        : {};

      const config = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + userInfo.token,
        },
      };

      const rawResponse = await fetch("/questions", config);
      const data = await rawResponse.json();

      if (data.error) {
        throw new Error("Failed to load questions.");
      }

      setQuestions(data);
    } catch (error) {
      setErrorMessage("Failed to load questions.");
      setTimeout(() => {
        setErrorMessage("");
      }, 1500);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    loadQuestions();
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : userInfo && userInfo.token ? (
        <h1 className="text-center">Welcome, {userInfo.firstName}</h1>
      ) : (
        <h1 className="text-center"> Welcome to Ask It</h1>
      )}

      <Row>
        <Col>
          <div className="home-content text-center">
            <p>Ask questions and get answers</p>
            {userInfo && userInfo.token ? (
              <QuestionForm />
            ) : (
              <p>
                <Link to="/login">Sign in</Link> to your account to start using
                our app.
              </p>
            )}
          </div>
        </Col>
      </Row>
      {isLoading ? (
        <Loader />
      ) : errorMessage ? (
        <Message variant="danger">{errorMessage}</Message>
      ) : questions.length === 0 ? (
        <Row className="my-4">
          <Col md={10}>
            <Message variant="info">
              You don't have any questions created yet.
            </Message>
          </Col>
        </Row>
      ) : (
        <Row className="my-4">
          <Col md={10}>
            <h3>Latest Questions</h3>
            <QuestionList questions={questions} />
          </Col>
        </Row>
      )}
    </>
  );
}

export default HomeScreen;
