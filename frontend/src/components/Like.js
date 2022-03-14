import React, { useState } from "react";
import classes from "./Like.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import Loader from "./Loader";
import Message from "./Message";

const Like = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const upvote = async () => {
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
      };

      let rawResponse = null;

      if (props.questionId) {
        rawResponse = await fetch(
          "/questions/" + props.questionId + "/upvote",
          config
        );
      } else if (props.answerId) {
        rawResponse = await fetch(
          "/answers/" + props.answerId + "/upvote",
          config
        );
      } else {
        throw new Error("Failed to handle upvote click.");
      }

      const data = await rawResponse.json();
      setSuccessMessage(data.message);
      setTimeout(() => {
        setSuccessMessage("");
      }, 1500);

      if (data.error) {
        throw new Error(data.error);
      }
    } catch (error) {
      setErrorMessage(error.message);
      setTimeout(() => {
        setErrorMessage("");
      }, 1500);
    }

    setIsLoading(false);
  };

  return (
    <div className={classes.like}>
      <FontAwesomeIcon
        icon={faThumbsUp}
        size="xl"
        className={props.isActive ? classes.active : ""}
        onClick={upvote}
      />

      <div className={classes.number}>{props.count}</div>
      {isLoading ? (
        <Loader />
      ) : errorMessage ? (
        <Message variant="danger">{errorMessage}</Message>
      ) : (
        successMessage && <Message variant="success">{successMessage}</Message>
      )}
    </div>
  );
};

export default Like;
