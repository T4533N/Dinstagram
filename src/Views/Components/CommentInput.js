import React, { useState } from "react";
import "./CommentInput.css";
import { db } from "../../firebase";
import { TextField } from "@material-ui/core";

function CommentInput({ comments, id, user }) {
  const [comment, setComment] = useState("");
  const [commentMap, setcommentMap] = useState(comments ? comments : []);

  const addComment = (e) => {
    e.preventDefault();

    commentMap.push({
      comment: comment,
      username: user?.displayName,
    });

    db.collection("posts")
      .doc(id)
      .update({
        comments: commentMap,
      })
      .then(function () {
        console.log("Document successfully written!");
      })
      .catch(function (error) {
        console.error("Error writing document: ", error);
      });

    setComment("");
  };

  return (
    <>
      {user && (
        <form onSubmit={addComment}>
          <div style={{ marginTop: "-0.8rem" }} className="commentInput">
            <TextField
              color="secondary"
              value={comment}
              onInput={(e) => setComment(e.target.value)}
              className="commentInput__textarea"
              placeholder="Add a comment.."
            ></TextField>

            <button
              className="button commentInput__button"
              style={{
                color: comment ? "gray" : "lightgrey",
                fontWeight: comment ? "600" : "500",
                marginTop: "0.4rem",
              }}
            >
              Post
            </button>
          </div>
        </form>
      )}
    </>
  );
}

export default CommentInput;
