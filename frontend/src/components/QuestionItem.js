import classes from "./QuestionItem.module.css";
import Like from "./Like";
import Dislike from "./Dislike";
import Comment from "./Comment";
import React from "react";
import { useNavigate } from "react-router-dom";

const QuestionItem = (props) => {
  const navigate = useNavigate();

  return (
    <div className={classes.questionDiv}>
      <li className={classes.item}>
        <div
          className={classes.question}
          onClick={() => {
            navigate("/questions/" + props.id);
          }}
        >
          <blockquote>
            <p>{props.body}</p>
          </blockquote>
          {props.author && <figcaption>{props.author}</figcaption>}
        </div>
      </li>
      <div className={"float-right " + classes.iconDiv}>
        <Like count={props.upvotes} questionId={props.id} />
        <Dislike count={props.downvotes} questionId={props.id} />
        <Comment count="xx" />
      </div>
    </div>
  );
};

export default QuestionItem;
