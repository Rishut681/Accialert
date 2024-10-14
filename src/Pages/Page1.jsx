import React, { useState, useEffect } from "react";
import "../Pages/Page-css/Page1.css";
import Alert from "../Components/Alerts";

function Page1() {
  const [videoSrc, setVideoSrc] = useState(null);
  const [selectedOption, setSelectedOption] = useState("live"); // Default to live video
  const [uploadedVideo, setUploadedVideo] = useState(null);

  useEffect(() => {
    if (selectedOption === "live") {
      setVideoSrc("http://localhost:5000/video_feed");
    }
  }, [selectedOption]);

  const handleVideoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const videoUrl = URL.createObjectURL(file);
      setUploadedVideo(videoUrl);
      setSelectedOption("uploaded");
    }
  };

  return (
    <div className="page-container">
      <div className="navbarP1-container">
        <div className="nav-head">Choose Type</div>
        <div className="navbarP1">

        <button onClick={() => setSelectedOption("provided")}>Provided Video</button>
        <button onClick={() => setSelectedOption("live")}>Live Video</button>
        <button>
          <input type="file" onChange={handleVideoUpload} style={{ display: "none" }} id="file-upload" />
          <label htmlFor="file-upload">Upload Video</label>
        </button>
        </div>
      </div>

      <div className="feed">
        <p className="title">Video Streaming and Accident Detection</p>
        <div className="feed-container">
          <div className="video-section">
            <div className="video-wrapper">
              {selectedOption === "provided" && (
                <video controls style={{ width: "100%", height: "100%" }}>
                  <source src="/path/to/your/provided/video.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              )}
              {selectedOption === "live" && videoSrc && (
                <img
                  src={videoSrc}
                  alt="Live video stream"
                  className="video-feed"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              )}
              {selectedOption === "uploaded" && uploadedVideo && (
                <video controls style={{ width: "100%", height: "100%" }}>
                  <source src={uploadedVideo} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              )}
            </div>
          </div>

          <div className="alerts-section">
            <Alert streamUrl="http://localhost:5000/alerts" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page1;
