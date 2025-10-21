import React, { useEffect, useState } from "react";
import api from "../services/api";
import { getYouTubeVideoId, getYouTubeEmbedUrl } from "../utils/youtube";

export default function Videos() {
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true);
        const { data } = await api.get("/api/posts?category=videos");
        setVideos(Array.isArray(data) ? data : data.posts || []);
        setError(null);
      } catch (err) {
        console.error("Error fetching videos:", err);
        setError("Failed to load videos. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchVideos();
  }, []);

  const renderVideoContent = (video) => {
    if (video.youtubeUrl) {
      const videoId = getYouTubeVideoId(video.youtubeUrl);
      if (!videoId) {
        console.warn(`Invalid YouTube URL for video: ${video.title}`);
        return null;
      }

      return (
        <div className="ratio ratio-16x9">
          <iframe
            src={getYouTubeEmbedUrl(videoId)}
            title={video.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      );
    }

    if (video.featuredImage) {
      return (
        <img 
          src={video.featuredImage} 
          className="card-img-top" 
          alt={video.title} 
          style={{ objectFit: 'cover', height: 320 }}
        />
      );
    }

    return null;
  };

  if (loading) {
    return (
      <div className="container py-5">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <h2 className="section-title">Videos</h2>
      <p className="text-muted mb-4">Watch the latest music videos and visual content.</p>

      {error && (
        <div className="alert alert-danger mb-4" role="alert">
          {error}
        </div>
      )}

      <div className="row g-4">
        {videos.length > 0 ? (
          videos.map((video) => (
            <div className="col-sm-12 col-md-6" key={video._id}>
              <div className="card content-card h-100">
                {renderVideoContent(video)}
                <div className="card-body">
                  <h5 className="card-title">{video.title}</h5>
                  <p className="card-text text-muted">{video.content}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12">
            <Alert variant="info">No videos found.</Alert>
          </div>
        )}
      </div>
    </div>
  );
}
