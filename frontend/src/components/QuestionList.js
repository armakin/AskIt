import React from "react";
import { Card } from "react-bootstrap";
import QuestionItem from "./QuestionItem";
import classes from "./QuestionList.module.css";

const QuestionList = (props) => {
  return (
    <Card className={classes.card}>
      <ul className={classes.list}>
        {props.questions.map((question) => (
          <QuestionItem
            key={question.id}
            id={question.id}
            body={question.body}
            upvotes={question.upvotes}
            downvotes={question.downvotes}
            author="Author"
          />
        ))}
      </ul>
    </Card>
  );
};

export default QuestionList;
