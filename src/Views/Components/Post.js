/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import "./Post.css";
import Avatar from "@material-ui/core/Avatar";
import { db } from "../../firebase";
import CommentInput from "./CommentInput";
import Comment from "./Comment";

function Post({
  id,
  userName,
  userProfileUrl,
  postImageUrl,
  caption,
  comments,
  user,
  provider,
}) {
  const deletePost = () => {
    //delete post
    db.collection("posts")
      .doc(id)
      .delete()
      .then(function () {
        console.log("Document successfully deleted!");
      })
      .catch(function (error) {
        console.error("Error removing document: ", error);
      });
  };

  return (
    <div className="post">
      <div className="post__header">
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          {provider === "google.com" ? (
            <Avatar
              src={userProfileUrl}
              alt={userName?.toLowerCase()}
              style={{ height: "25px", width: "25px" }}
            />
          ) : (
            <Avatar
              alt={userName?.toLowerCase()}
              style={{ height: "25px", width: "25px" }}
            >
              {userName?.charAt(0)}
            </Avatar>
          )}

          <div className="post__headerInfo">
            <p style={{ fontSize: "14px" }}>{userName}</p>
          </div>
        </div>

        {user ? (
          user.displayName?.toLowerCase() === userName?.toLowerCase() ||
          user.email === "taseentanvir@gmail.com" ? (
            //making myself admin
            <button
              className="button"
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={deletePost}
            >
              Delete
            </button>
          ) : (
            <></>
          )
        ) : (
          <></>
        )}
      </div>
      {/* headr --> avatar + username + time */}

      {/* image */}
      <img className="post__image" src={postImageUrl} />

      {/* username + caption */}
      <div className="post__bottom">
        <p>
          <strong>@{userName.replace(/\s+/g, "_").toUpperCase()}</strong>{" "}
          {caption}
        </p>
      </div>
      {comments ? (
        comments.map((comment, index) => (
          <Comment
            key={index}
            username={comment.username}
            comment={comment.comment}
          />
        ))
      ) : (
        <></>
      )}
      <CommentInput comments={comments} id={id} user={user} />
    </div>
  );
}

export default Post;
