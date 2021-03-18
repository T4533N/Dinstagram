import React, { useState } from "react";
import firebase from "firebase";
import { storage, db } from "../../firebase";
import CameraAltIcon from "@material-ui/icons/CameraAlt";
import CircularProgress from "@material-ui/core/CircularProgress";
import AuthDialogs from "../../authModal";
import "./CreatePost.css";

function CreatePost({ user }) {
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
      var src1 = URL.createObjectURL(e.target.files[0]);
      var preview1 = document.getElementById("image-1-preview");
      preview1.src = src1;
      preview1.style.display = "block";
    }
  };

  const handleUpload = () => {
    if (image) {
      const uploadTask = storage.ref(`images/${image.name}`).put(image);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // progress function .....
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(progress);
        },
        (error) => {
          // Error function...
          console.log(error);
          alert(error.message);
        },
        () => {
          // upload complete function
          storage
            .ref("images")
            .child(image.name)
            .getDownloadURL()
            .then((url) => {
              db.collection("posts").add({
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                caption: caption,
                postImageUrl: url,
                provider: user?.providerData[0]?.providerId,
                userName: user?.displayName?.toLowerCase(),
                userProfileUrl: user.photoURL,
              });
            });

          setProgress(0);
          setCaption("");
          setImage(null);
          var preview1 = document.getElementById("image-1-preview");
          preview1.style.display = "none";
        }
      );
    }
  };

  const removeImage = () => {
    var preview1 = document.getElementById("image-1-preview");
    preview1.style.display = "none";
  };

  return (
    <div className="app__createPost">
      {user ? (
        <div className="imageUpload">
          <div className="createAPost__Top">
            <p>Create a Post</p>
          </div>
          {/* <progress value={progress} max="100" /> */}

          <div className="createAPost__center">
            <textarea
              className="createAPost__textarea"
              name="create a post"
              rows="2"
              value={caption}
              placeholder="Enter a caption..."
              onChange={(e) => setCaption(e.target.value)}
            ></textarea>
            <div className="imagePreview">
              <img onClick={() => removeImage()} id="image-1-preview" alt="" />
              {progress === 0 ? (
                <></>
              ) : (
                <CircularProgress
                  className="circularProgress"
                  variant="determinate"
                  value={progress}
                />
              )}
            </div>
          </div>

          <div className="imageUpload__bottom">
            <div className="image-upload">
              <label htmlFor="file-input">
                <CameraAltIcon style={{ marginTop: "5px" }} />
              </label>

              <input
                id="file-input"
                type="file"
                accept="image/*"
                onChange={handleChange}
              />
            </div>

            <button
              className="button"
              onClick={handleUpload}
              style={{
                color: caption && image ? "white" : "gray",
                fontWeight: caption && image ? "700" : "500",
                background: caption && image ? "#DE5246" : "#e0e0e0",
                cursor: caption && image ? "pointer" : "default",
                padding: "0.7rem",
                borderRadius: "0.2rem",
                transition: "all 1s",
              }}
            >
              Upload
            </button>
          </div>
        </div>
      ) : (
        <div
          style={{
            marginTop: "30px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <AuthDialogs label="Login/Register" />
          <p>to Post & Comment</p>
        </div>
      )}
    </div>
  );
}

export default CreatePost;
