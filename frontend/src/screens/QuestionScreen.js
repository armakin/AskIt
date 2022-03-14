import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Question from "../components/Question";
import Loader from "../components/Loader";
import Message from "../components/Message";
import CommentList from "../components/CommentList";
import CommentForm from "../components/CommentForm";

function QuestionScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const [question, setQuestion] = useState(null);
  const [comments, setComments] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const { id } = useParams();

  const loadData = async () => {
    setIsLoading(true);

    try {
      const config = {
        method: "GET",
      };

      let rawResponse = await fetch("/questions/" + id, config);
      let data = await rawResponse.json();

      if (data.error) {
        throw new Error("Failed to load question.");
      }

      setQuestion(data);
      // console.log(data);

      rawResponse = await fetch("/answers/question/" + id, config);
      data = await rawResponse.json();

      if (data.error) {
        throw new Error("Failed to load question answers.");
      }
      setComments(data);
    } catch (error) {
      setErrorMessage("Failed to load question.");
    }

    setIsLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : errorMessage ? (
        <Message variant="danger">{errorMessage}</Message>
      ) : (
        question && (
          <Row>
            <Col md={10}>
              <Question
                key={question.id}
                id={question.id}
                body={question.body}
                upvotes={question.upvotes}
                downvotes={question.downvotes}
                comments={question.answersCount}
                author="Author"
              />
              <CommentList comments={comments} />
              <CommentForm questionId={question.id} />
            </Col>
          </Row>
        )
      )}
    </>
  );
}

export default QuestionScreen;
