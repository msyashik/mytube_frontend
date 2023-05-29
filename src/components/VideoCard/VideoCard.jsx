import React, { useState } from "react";
import "./VideoCard.css";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";

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

const VideoCard = ({ title, video_id }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const navigate = useNavigate();

  const openModal = () => {
    setModalIsOpen(true);
    const videoData = {
      video_id: video_id,
    };
    //increasing video count
    fetch("http://127.0.0.1:8000/api/video-view/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(videoData),
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((e) => console.log(e));
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleSeeVideoDetails = () => {
    navigate(`/videos/${video_id}`);
  };

  return (
    <div className="col-md-4 mb-3">
      <Card onClick={openModal} className="video-card">
        <Card.Img
          variant="top"
          src={`http://img.youtube.com/vi/${video_id}/default.jpg`}
        />
        <Card.Body>
          <Card.Title>{title}</Card.Title>
        </Card.Body>
      </Card>
      <Button
        className="mt-2"
        style={{ width: "100%" }}
        variant="primary"
        onClick={handleSeeVideoDetails}
      >
        See Video Details
      </Button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Video Modal"
        style={customStyles}
      >
        <div style={{ height: "90%" }}>
          <h2>{title}</h2>
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${video_id}`}
            title={title}
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </div>
      </Modal>
    </div>
  );
};

export default VideoCard;
