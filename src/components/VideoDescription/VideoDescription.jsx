import React, { useState } from "react";
import "./VideoDescription.css";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Modal from "react-modal";
import { AiFillDislike, AiFillLike } from "react-icons/ai";
import { useContext } from "react";
import { userInfoContext } from "../../App";

const customStyles = {
  content: {
    top: "47%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "80%",
    height: "80vh",
  },
};
Modal.setAppElement("body");

const VideoDescription = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [userInfo, setUserInfo] = useContext(userInfoContext);
  const { videoId } = useParams();
  const [isLiked, setIsLiked] = useState(false);
  const [isDisLiked, setIsDisliked] = useState(false);
  const [videoInfo, setVideoInfo] = useState({});
  const [seeDetail, setSeeDetail] = useState(false);
  const url = `http://127.0.0.1:8000/api/videos/${videoId}`;
  // getting particular video info
  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setVideoInfo(data);
        likeOrDislikeStatus(data);
      })
      .catch((e) => console.log(e));
  }, []);

  const likeOrDislikeStatus = (data) => {
    const isLikedByAuthor = data.users_like_email.find(
      (user) => user == userInfo
    );
    if (isLikedByAuthor) {
      setIsLiked(true);
    } else {
      setIsLiked(false);
    }
    const isDislikedByAuthor = data.users_dislike_email.find(
      (user) => user == userInfo
    );
    if (isDislikedByAuthor) {
      setIsDisliked(true);
    } else {
      setIsDisliked(false);
    }
  };

  const openModal = () => {
    setModalIsOpen(true);
    const videoData = {
      video_id: videoId,
    };
    let statusCode;
    fetch("http://127.0.0.1:8000/api/video-view/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(videoData),
    })
      .then(async (res) => {
        statusCode = await res.status;
        return res.json();
      })
      .then((data) => {
        if (statusCode == 200) {
          setVideoInfo(data);
        }
      })
      .catch((e) => console.log(e));
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };
  const handleVideoLike = () => {
    const usersLikeData = {
      video_id: videoId,
      author_email: userInfo,
    };
    let statusCode;
    // adding like info to the video
    fetch("http://127.0.0.1:8000/api/video-like/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(usersLikeData),
    })
      .then(async (res) => {
        statusCode = await res.status;
        return res.json();
      })
      .then((data) => {
        if (statusCode == 200) {
          setVideoInfo(data);
          likeOrDislikeStatus(data);
        }
      })
      .catch((e) => console.log(e));
  };
  const handleVideoDislike = () => {
    const usersDislikeData = {
      video_id: videoId,
      author_email: userInfo,
    };
    let statusCode;
    // adding dislike info to the video
    fetch("http://127.0.0.1:8000/api/video-dislike/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(usersDislikeData),
    })
      .then(async (res) => {
        statusCode = await res.status;
        return res.json();
      })
      .then((data) => {
        if (statusCode == 200) {
          setVideoInfo(data);
          likeOrDislikeStatus(data);
        }
      })
      .catch((e) => console.log(e));
  };
  const handleSeeDetail = () => {
    setSeeDetail(true);
  };
  return (
    <div>
      <Card onClick={openModal} className="video-card">
        <Card.Img
          variant="top"
          src={`http://img.youtube.com/vi/${videoInfo.video_id}/default.jpg`}
          style={{ height: "400px" }}
        />
        <Card.Body>
          <Card.Title>{videoInfo.title}</Card.Title>
        </Card.Body>
      </Card>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Video Modal"
        style={customStyles}
      >
        <div style={{ height: "90%" }}>
          <h2>{videoInfo.title}</h2>
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${videoInfo.video_id}`}
            title={videoInfo.title}
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </div>
      </Modal>
      <div className="like-dislike mt-2 mb-2">
        {isLiked && (
          <AiFillLike
            className="like-dislike-button like-dislike-color m-2"
            size={50}
            onClick={handleVideoLike}
          ></AiFillLike>
        )}
        {!isLiked && (
          <AiFillLike
            className="like-dislike-button m-2"
            size={50}
            onClick={handleVideoLike}
          ></AiFillLike>
        )}
        {isDisLiked && (
          <AiFillDislike
            className="like-dislike-button like-dislike-color m-2"
            size={50}
            onClick={handleVideoDislike}
          ></AiFillDislike>
        )}
        {!isDisLiked && (
          <AiFillDislike
            className="like-dislike-button m-2"
            size={50}
            onClick={handleVideoDislike}
          ></AiFillDislike>
        )}
      </div>
      <div>
        <p>View: {videoInfo.view_count}</p>
        <p>Likes: {videoInfo.like_count}</p>
        <p>Dislikes: {videoInfo.dislike_count}</p>
        <Button variant="primary" onClick={handleSeeDetail}>
          See Detail
        </Button>
      </div>
      {seeDetail && (
        <div>
          <p className=" mt-2">
            <span className="liked-by-uploaded-by-disliked-by-text">
              Video uploaded by:
            </span>{" "}
            {videoInfo.author}
          </p>
          <div className="row">
            <div className="col-md-6">
              <p className="liked-by-uploaded-by-disliked-by-text">
                Video liked by:
              </p>
              <ol>
                {videoInfo.users_like &&
                  videoInfo.users_like.map((user) => <li>{user}</li>)}
              </ol>
            </div>
            <div className="col-md-6">
              <p className="liked-by-uploaded-by-disliked-by-text">
                Video disliked by:
              </p>
              <ol>
                {videoInfo.users_dislike &&
                  videoInfo.users_dislike.map((user) => <li>{user}</li>)}
              </ol>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoDescription;
