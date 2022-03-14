import React, { useRef, useState } from "react";
import classes from "./CommentForm.module.css";
import { Card, Form, Button } from "react-bootstrap";
import Loader from "./Loader";
import Message from "./Message";

const CommentForm = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const answerInput = useRef();

  const postCommentHandler = async () => {
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
          body: answerInput.current.value,
          questionId: props.questionId,
        }),
      };

      const rawResponse = await fetch("/answers", config);
      const data = await rawResponse.json();

      if (data.error) {
        throw new Error("Failed to post the answer.");
      }

      setSuccessMessage("Successfully posted the new answer.");
      setTimeout(() => {
        setSuccessMessage("");
      }, 1500);
    } catch (error) {
      setErrorMessage("Failed to post the answer. Please try again.");
      setTimeout(() => {
        setErrorMessage("");
      }, 1500);
    }

    setIsLoading(false);
  };

  return (
    <>
      <Card className={classes.card}>
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
            <Form.Control as="textarea" rows={2} ref={answerInput} />
          </Form.Group>
          <Form.Group className={classes.actions}>
            <Button className="btn" onClick={postCommentHandler}>
              Post Comment
            </Button>
          </Form.Group>
        </Form>
      </Card>
    </>
  );
};

export default CommentForm;
