import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./QuestionForm.module.css";
import { Card, Form, Button } from "react-bootstrap";
import Loader from "./Loader";
import Message from "./Message";

const QuestionForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const questionInput = useRef();

  const navigate = useNavigate();

  const postQuestionHandler = async () => {
    setIsLoading(true);

    try {
      const userInfo = localStorage.getItem("userInfo")
        ? JSON.parse(localStorage.getItem("userInfo"))
        : {};

      const config = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + userInfo.token,
        },
        body: JSON.stringify({
          body: questionInput.current.value,
        }),
      };

      const rawResponse = await fetch("/questions", config);
      const data = await rawResponse.json();

      if (data.error) {
        throw new Error("Failed to post the question.");
      }

      setSuccessMessage("Successfully posted the new question.");
      setTimeout(() => {
        setSuccessMessage("");
        navigate("/my-questions/");
      }, 1500);
    } catch (error) {
      setErrorMessage("Failed to post the question. Please try again.");
      setTimeout(() => {
        setErrorMessage("");
      }, 1500);
    }

    setIsLoading(false);
  };

  return (
    <>
      <Card>
        {isLoading && <Loader />}

        <Form className={classes.form}>
          <Form.Group className={classes.control}>
            {errorMessage && <Message variant="danger">{errorMessage}</Message>}
            {successMessage && (
              <Message variant="success">{successMessage}</Message>
            )}
            <Form.Label htmlFor="text" className={classes.labelTitle}>
              What's on your mind?
            </Form.Label>
            <Form.Control as="textarea" rows={3} ref={questionInput} />
          </Form.Group>
          <Form.Group className={classes.actions}>
            <Button className="btn" onClick={postQuestionHandler}>
              Post Question
            </Button>
          </Form.Group>
        </Form>
      </Card>
    </>
  );
};

export default QuestionForm;
