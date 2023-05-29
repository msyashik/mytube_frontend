import React, { useState } from "react";
import "./Videos.css";
import { useEffect } from "react";
import VideoCard from "../VideoCard/VideoCard";

const Videos = () => {
  const [allVideosInfo, setAllVideosInfo] = useState([]);
  //requesting all the video info
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/videos/")
      .then((res) => res.json())
      .then((data) => setAllVideosInfo(data))
      .catch((e) => console.log(e));
  }, []);

  return (
    <div className="row">
      {allVideosInfo.map((video) => {
        return (
          <VideoCard
            key={video.video_id}
            title={video.title}
            video_id={video.video_id}
          ></VideoCard>
        );
      })}
    </div>
  );
};

export default Videos;
