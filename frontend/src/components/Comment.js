import React from "react";
import classes from "./Comment.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage } from "@fortawesome/free-solid-svg-icons";
<FontAwesomeIcon icon="fa-solid fa-thumbs-down" />;

const Comment = (props) => {
  return (
    <div className={classes.comment}>
      <FontAwesomeIcon icon={faMessage} size="xl" className={classes.active} />

      <div className={classes.number}>{props.count} comments</div>
    </div>
  );
};

export default Comment;
