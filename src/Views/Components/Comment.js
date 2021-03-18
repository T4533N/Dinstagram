import React from "react";
import "./Comment.css";

function Comment({ username, comment }) {
  return (
    <div className="comment">
      <p>
        <strong>{username.replace(/\s+/g, "_").toLowerCase()}</strong> {comment}
      </p>
    </div>
  );
}

export default Comment;
