import React, { useContext, useEffect, useState } from "react";
import Header from "../Header/Header";
import "./Dashboard.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { userInfoContext } from "../../App";
import { useNavigate } from "react-router-dom";
import VideoCard from "../VideoCard/VideoCard";

const DashBoard = () => {
  const [allVideosInfo, setAllVideosInfo] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [userInfo, setUserInfo] = useContext(userInfoContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    link: "",
    title: "",
  });
  // requesting all videos data from db
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/videos/")
      .then((res) => res.json())
      .then((data) => {
        // filtering the data related to the author
        const author_data = data.filter((video) => video.author == userInfo);
        setAllVideosInfo(author_data);
      })
      .catch((e) => console.log(e));
  }, []);

  const handleSubmitForm = (event) => {
    event.preventDefault();
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };
  const handleSubmitData = () => {
    if (formData.link && formData.title) {
      const videoSplit = formData.link.split("/");
      const videoSplitLen = videoSplit.length;
      const videoId = videoSplit[videoSplitLen - 1];
      const videoData = {
        video_id: videoId,
        title: formData.title,
        author_email: userInfo,
      };
      let statusCode;
      // adding new video to db
      fetch("http://127.0.0.1:8000/api/videos/", {
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
          if (statusCode == 201) {
            setErrorMsg("");
            navigate("/");
          } else {
            setErrorMsg(data);
          }
        })
        .catch((e) => console.log(e));
    } else {
      setErrorMsg("Please provide all data");
    }
  };
  return (
    <div>
      <h5 className="text-center-design">Add New Video</h5>
      <Form onSubmit={handleSubmitForm}>
        <Form.Group
          className="mb-3"
          controlId="formVideoLink"
          onChange={handleChange}
        >
          <Form.Label>Video Link </Form.Label>
          <Form.Control
            type="text"
            name="link"
            placeholder="Enter youtube video link"
          />
        </Form.Group>
        <Form.Group
          className="mb-3"
          controlId="formVideoTitle"
          onChange={handleChange}
        >
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            placeholder="Enter video title"
          />
        </Form.Group>
        {errorMsg && <p className="error-msg">{errorMsg}</p>}
        <Button variant="primary" type="submit" onClick={handleSubmitData}>
          Submit
        </Button>
      </Form>
      <h5 className="text-center-design mt-4 mb-4">Previously Added Videos</h5>
      <div className="row">
        {allVideosInfo &&
          allVideosInfo.map((video) => {
            return (
              <VideoCard
                key={video.video_id}
                title={video.title}
                video_id={video.video_id}
              ></VideoCard>
            );
          })}
      </div>
    </div>
  );
};

export default DashBoard;
