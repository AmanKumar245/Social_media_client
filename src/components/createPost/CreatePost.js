import React, { useState } from "react";
import "./CreatePost.scss";
import { BsCardImage } from "react-icons/bs";
import Avatar from "../avatar/Avatar";
import { axiosClient } from "../../utlis/axiosClient";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile } from "../../redux/slices/PostSlice";

function CreatePost() {
  const [postImg, setPostImg] = useState("");
  const [caption, setCaption] = useState("");
  const myProfile = useSelector((state) => state.appConfigReducer.myProfile);

  const dispatch = useDispatch();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      if (fileReader.readyState === fileReader.DONE) {
        setPostImg(fileReader.result);
      }
    };
  };

  const PostSubmit = async () => {
    if (!caption || !postImg) {
      alert("Caption and image are required");
      return;
    }

    try {
    
      const result = await axiosClient.post("/posts", {
        caption,
        postImg,
      });
      console.log("Post created:", result.data.post);
      dispatch(getUserProfile({
        userId: myProfile?._id,
      })); // Fetch user profile after post submission
    } catch (error) {
      console.log(error);
    } finally {
     
      setCaption("");
      setPostImg("");
    }
  };

  return (
    <div className="CreatePost">
      <div className="left-post-part">
        <Avatar src={myProfile?.avatar?.url} />
      </div>
      <div className="right-part">
        <input
          value={caption}
          type="text"
          className="captionInput"
          placeholder="Write your caption"
          onChange={(e) => setCaption(e.target.value)}
        />
        {postImg && (
          <div className="img-container">
            <img className="Post-img" src={postImg} alt="Post-img" />
          </div>
        )}
        <div className="bottom-part">
          <div className="input-post-img">
            <label htmlFor="inputImg" className="labelImg">
              <BsCardImage  />
            </label>
            <input
              id="inputImg"
              className="inputImg"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>
          <button className="post-btn btn-primary" onClick={PostSubmit}>
            Post
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreatePost;
