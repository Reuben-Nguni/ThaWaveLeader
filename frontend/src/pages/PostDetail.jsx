import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";
import { FaUser, FaCalendarAlt, FaDownload, FaArrowLeft, FaShareAlt, FaFacebook, FaTwitter, FaWhatsapp } from "react-icons/fa";

const getYouTubeVideoId = (url) => {
  if (!url) return null;
  const regExp = /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\\s]{11})/;
  const match = url.match(regExp);
  return match ? match[1] : null;
};

export default function PostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const { data } = await API.get(`/api/posts/${id}`);
        setPost(data);
      } catch (err) {
        console.error("Post fetch error:", err);
        setError("Post not found or failed to load.");
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="container py-5 text-center">
        <div className="alert alert-danger">{error || "Post not found."}</div>
        <button className="btn btn-secondary" onClick={() => navigate(-1)}>
          <FaArrowLeft className="me-2" /> Go Back
        </button>
      </div>
    );
  }

  const formattedDate = new Date(post.createdAt).toLocaleString("en-US", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  // Better media detection: check extension OR Cloudinary path segments (e.g. /video/ or /audio/)
  const fileUrl = post.fileUrl;
  const hasVideoExt = fileUrl?.match(/\.(mp4|mov|webm|m4v|ogg)(\?.*)?$/i);
  const hasAudioExt = fileUrl?.match(/\.(mp3|wav|ogg|m4a)(\?.*)?$/i);
  const isVideo = Boolean(hasVideoExt) || (fileUrl && fileUrl.includes("/video/"));
  const isAudio = Boolean(hasAudioExt) || (fileUrl && fileUrl.includes("/audio/"));

  // Map extension to a reasonable mime-type for <source>
  const getMimeType = (url) => {
    if (!url) return null;
    const extMatch = url.match(/\.([a-z0-9]+)(?:\?|$)/i);
    const ext = extMatch ? extMatch[1].toLowerCase() : null;
    switch (ext) {
      case "mp4":
      case "m4v":
        return "video/mp4";
      case "webm":
        return "video/webm";
      case "mov":
        return "video/quicktime";
      case "mp3":
        return "audio/mpeg";
      case "wav":
        return "audio/wav";
      case "ogg":
        return "audio/ogg";
      case "m4a":
        return "audio/mp4";
      default:
        // Fallbacks: if URL looks like Cloudinary video resource, assume MP4
        if (url.includes("/video/")) return "video/mp4";
        if (url.includes("/image/")) return "image/*";
        return null;
    }
  };

  return (
    <>
      <div className="container py-5">
        <button className="btn btn-outline-secondary mb-4" onClick={() => navigate(-1)}>
          <FaArrowLeft className="me-2" /> Back
        </button>

        <div className="row gx-4">
          <div className="col-12 col-md-4">
            {post.featuredImage && (
              <div className="mb-4">
                <img
                  src={post.featuredImage}
                  alt={post.title}
                  className="img-fluid rounded shadow"
                  style={{ width: "100%", height: "auto", maxHeight: "400px", objectFit: "cover" }}
                />
              </div>
            )}

            <div className="card p-3 mb-4">
              <h5 className="card-title">Post Details</h5>
              <div className="mb-3">
                <strong>Category:</strong> {post.category || "General"}
              </div>
              <div className="mb-3">
                <strong>Author:</strong> {post.author?.name || "Unknown"}
              </div>
              <div className="mb-3">
                <strong>Published:</strong> {formattedDate}
              </div>
              <div className="mb-3">
                <strong>Tags:</strong>
                <div>
                  {post.tags?.length ? (
                    post.tags.map((t, i) => (
                      <span key={i} className="badge bg-secondary me-1 mb-1">
                        {t}
                      </span>
                    ))
                  ) : (
                    <span className="text-muted">No tags</span>
                  )}
                </div>
              </div>
              {post.featured && (
                <div className="mb-3">
                  <span className="badge bg-warning text-dark">Featured</span>
                </div>
              )}
            </div>

            {(post.fileUrl || post.youtubeUrl) && (
              <div className="card p-3 mb-4">
                <h6>Media</h6>
                {post.youtubeUrl && getYouTubeVideoId(post.youtubeUrl) && (
                  <div className="mb-3">
                    <div className="ratio ratio-16x9">
                      <iframe
                        src={`https://www.youtube.com/embed/${getYouTubeVideoId(post.youtubeUrl)}`}
                        title="YouTube video"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>
                  </div>
                )}
                {isAudio && (
                  <audio controls className="w-100 mb-3">
                    <source src={fileUrl} type={getMimeType(fileUrl) || "audio/mpeg"} />
                    Your browser does not support the audio element.
                  </audio>
                )}
                {isVideo && (
                  <video controls className="w-100 mb-3" style={{ maxHeight: 300 }}>
                    <source src={fileUrl} type={getMimeType(fileUrl) || "video/mp4"} />
                    Your browser does not support the video tag.
                  </video>
                )}
                {post.fileUrl && (
                  <a
                    href={post.fileUrl}
                    download
                    className="btn btn-outline-primary w-100"
                  >
                    <FaDownload className="me-2" /> Download File
                  </a>
                )}
              </div>
            )}
          </div>

          <div className="col-12 col-md-8">
            <h1 className="display-5 fw-bold mb-4">{post.title}</h1>

            {/* Social Sharing Buttons */}
            <div className="mb-4">
              <h6 className="fw-semibold mb-3">
                <FaShareAlt className="me-2" /> Share this post
              </h6>
              <div className="d-flex gap-2 flex-wrap">
                <button
                  className="btn btn-outline-primary btn-sm"
                  onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank')}
                >
                  <FaFacebook className="me-1" /> Facebook
                </button>
                <button
                  className="btn btn-outline-info btn-sm"
                  onClick={() => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(window.location.href)}`, '_blank')}
                >
                  <FaTwitter className="me-1" /> Twitter
                </button>
                <button
                  className="btn btn-outline-success btn-sm"
                  onClick={() => window.open(`https://wa.me/?text=${encodeURIComponent(`${post.title} ${window.location.href}`)}`, '_blank')}
                >
                  <FaWhatsapp className="me-1" /> WhatsApp
                </button>
                <button
                  className="btn btn-outline-secondary btn-sm"
                  onClick={() => navigator.share ? navigator.share({ title: post.title, url: window.location.href }) : navigator.clipboard.writeText(window.location.href)}
                >
                  <FaShareAlt className="me-1" /> Share
                </button>
              </div>
            </div>

            <div className="mb-4" style={{ lineHeight: 1.8, fontSize: "1.1rem", color: "var(--text-color)" }}>
              <p>{post.content}</p>
            </div>

            {post.description && (
              <div className="mb-4">
                <h4 className="fw-semibold">Overview</h4>
                <p className="text-muted">{post.description}</p>
              </div>
            )}

            {post.details && (
              <div className="mb-4">
                <h4 className="fw-semibold">Additional Details</h4>
                <div className="text-muted" style={{ whiteSpace: "pre-wrap" }}>
                  {post.details}
                </div>
              </div>
            )}

            {/* Related Posts or Author Bio could be added here */}
            <div className="mt-5 pt-4 border-top">
              <p className="text-muted small">
                If you enjoyed this post, share it with your friends and stay tuned for more updates!
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
