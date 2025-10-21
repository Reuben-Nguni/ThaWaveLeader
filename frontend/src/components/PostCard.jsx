import React from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaCalendarAlt } from "react-icons/fa";

export default function PostCard({ post }) {
  const navigate = useNavigate();
  if (!post) return null;

  const formattedDate = new Date(post.createdAt).toLocaleString("en-US", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <>
      {/* Card */}
      <div
        className="card shadow-sm colorful-card"
        style={{
          width: "260px",
          flex: "0 0 auto",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          marginBottom: "15px",
          height: "420px",
          cursor: "pointer",
         
        }}
        onClick={() => navigate(`/post/${post._id}`)}
        role="button"
        aria-label={`Open post ${post.title}`}
      >
        {post.featuredImage && (
          <img
            src={post.featuredImage}
            alt={post.title}
            style={{
              width: "100%",
              height: "140px",
              objectFit: "cover",
            }}
          />
        )}

        <div className="card-body d-flex flex-column" style={{ padding: "0.75rem" }}>
          <h6
            className="card-title mb-1"
            style={{
              fontSize: "1rem",
              fontWeight: 600,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
            title={post.title}
          >
            {post.title}
          </h6>

          <p
            className="card-text mb-2"
            style={{
              fontSize: "0.85rem",
              lineHeight: "1.1rem",
              flex: 1,
              overflow: "hidden",
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
            }}
          >
            {post.content}
          </p>

          <div className="d-flex justify-content-between align-items-center mt-2">
            <div>
              <span className="badge bg-info" style={{ fontSize: "0.72rem" }}>
                {post.category || "General"}
              </span>
              {post.featured && (
                <span className="badge bg-warning text-dark ms-2" style={{ fontSize: "0.72rem" }}>
                  Featured
                </span>
              )}
            </div>

            <div style={{ fontSize: "0.75rem", color: "#555" }} className="d-flex gap-2 align-items-center">
              <span className="d-flex align-items-center gap-1">
                <FaUser /> <small style={{ lineHeight: 1 }}>{post.author?.name || "Unknown"}</small>
              </span>
            </div>
          </div>

          <div className="mt-2 d-flex justify-content-between align-items-center" style={{ fontSize: "0.75rem", color: "#777" }}>
            <div />
            <div className="text-end">
              <FaCalendarAlt /> <small style={{ marginLeft: 6 }}>{formattedDate}</small>
            </div>
          </div>
        </div>
      </div>


    </>
  );
}
