import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import QuestionList from "../components/QuestionList";
import Loader from "../components/Loader";
import Message from "../components/Message";

function MyQuestionsScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

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

      const rawResponse = await fetch("/questions/profile", config);
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
    if (!userInfo || !userInfo.token) {
      navigate("/login");
    }
    loadQuestions();
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : errorMessage ? (
        <Message variant="danger">{errorMessage}</Message>
      ) : questions.length === 0 ? (
        <Row>
          <Col md={10}>
            <Message variant="info">
              You don't have any questions created yet.
            </Message>
          </Col>
        </Row>
      ) : (
        <Row>
          <Col md={10}>
            <h3>Your Recent Questions</h3>
            <QuestionList questions={questions} />
          </Col>
        </Row>
      )}
    </>
  );
}

export default MyQuestionsScreen;
