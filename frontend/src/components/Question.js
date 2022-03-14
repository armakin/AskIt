import classes from "./Question.module.css";
import Like from "./Like";
import Dislike from "./Dislike";
import Comment from "./Comment";
import React from "react";
import { useNavigate } from "react-router-dom";

const QuestionItem = (props) => {
  const navigate = useNavigate();

  return (
    <div className={classes.questionDiv}>
      <div
        className={classes.question + " " + classes.item}
        onClick={() => {
          navigate("/questions/" + props.id);
        }}
      >
        <blockquote>
          <p>{props.body}</p>
        </blockquote>
        {props.author && <figcaption>{props.author}</figcaption>}
      </div>
      <div className={"float-right " + classes.iconDiv}>
        <Like count={props.upvotes} questionId={props.id} />
        <Dislike count={props.downvotes} questionId={props.id} />
        <Comment count={props.comments} />
      </div>
    </div>
  );
};

export default QuestionItem;
