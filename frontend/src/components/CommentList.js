import React from "react";
import { Card } from "react-bootstrap";
import CommentItem from "./CommentItem";
import classes from "./CommentList.module.css";

const CommentList = (props) => {
  return (
    <Card className={classes.card}>
      <ul className={classes.list}>
        {props.comments.map((comment) => (
          <CommentItem
            key={comment.id}
            id={comment.id}
            body={comment.body}
            upvotes={comment.upvotes}
            downvotes={comment.downvotes}
            author="Author"
          />
        ))}
      </ul>
    </Card>
  );
};

export default CommentList;
