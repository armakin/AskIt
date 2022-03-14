import classes from "./CommentItem.module.css";
import Like from "./Like";
import Dislike from "./Dislike";
import React from "react";

const CommentItem = (props) => {
  return (
    <div className={classes.commentDiv}>
      <li className={classes.item}>
        <div className={classes.comment}>
          <blockquote>
            <p>{props.body}</p>
          </blockquote>
          {props.author && <figcaption>{props.author}</figcaption>}
        </div>
      </li>
      <div className={"float-right " + classes.iconDiv}>
        <Like count={props.upvotes} answerId={props.id} />
        <Dislike count={props.downvotes} answerId={props.id} />
      </div>
    </div>
  );
};

export default CommentItem;
