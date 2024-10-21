import React, { useState, useEffect } from 'react';
import './Response.css'; // Import the CSS file

const Response = () => {
  const [reports, setReports] = useState([]);
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState(null);

  const fetchReportsAndVideos = async () => {
    try {
      const response = await fetch('http://localhost:5000/reports'); // Ensure this endpoint is correct
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log('Fetched data:', data); // Debug log

      setReports(data.reports || []);
      setVideos(data.videos || []);
    } catch (error) {
      setError(error.message);
      console.error('Fetch error:', error); // Debug log
    }
  };

  useEffect(() => {
    fetchReportsAndVideos(); // Initial fetch

    const intervalId = setInterval(fetchReportsAndVideos, 5000); // Fetch every 5 seconds

    return () => clearInterval(intervalId); // Clear interval on component unmount
  }, []);

  return (
    <div className="response-container">
      <h4>Accident Reports and Videos</h4>
      {error && <p className="error">Error: {error}</p>}

      <div className="section">
        <h3>Recent Reports</h3>
        <div className="scroll-container">
          <ul className="list">
            {reports.length > 0 ? (
              reports.map((report, index) => (
                <li key={index}>
                  <iframe 
                    src={`http://localhost:5000/reports/${report}`} 
                    width="600" 
                    height="400" 
                    title={report}>
                    This browser does not support PDFs. 
                    <a href={`http://localhost:5000/reports/${report}`}>Download the PDF</a>.
                  </iframe>
                </li>
              ))
            ) : (
              <p>No reports available</p>
            )}
          </ul>
        </div>
      </div>

      <div className="section">
        <h3>Recent Videos</h3>
        <div className="scroll-container">
          <ul className="list">
            {videos.length > 0 ? (
              videos.map((video, index) => (
                <li key={index}>
                  <video controls width="400">
                    <source src={`http://localhost:5000/videos/${video}`} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </li>
              ))
            ) : (
              <p>No videos available</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Response;