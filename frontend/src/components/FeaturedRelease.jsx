import React from 'react';
import { Link } from 'react-router-dom';
import { FaPlay, FaMusic } from 'react-icons/fa';
import '../styles/modern-ui.css';

export default function FeaturedRelease({ post }) {
  if (!post) return null;

  return (
    <div className="featured-banner card-3d">
      <div className="row align-items-center">
        <div className="col-lg-6">
          <h2 className="mb-3">{post.title}</h2>
          <p className="mb-4">{post.content}</p>
          
          {post.fileUrl && post.fileUrl.match(/\.(mp3|wav|ogg)$/i) && (
            <div className="audio-player mb-4" onClick={e => e.stopPropagation()}>
              <audio controls className="w-100">
                <source src={post.fileUrl} />
                Your browser does not support the audio element.
              </audio>
            </div>
          )}

          <div className="d-flex gap-3">
            <Link to={`/post/${post._id}`} className="btn btn-modern">
              <FaPlay className="me-2" /> Play Now
            </Link>
            <Link to="/beats" className="btn btn-modern">
              <FaMusic className="me-2" /> Explore More
            </Link>
          </div>
        </div>
        
        <div className="col-lg-6 mt-4 mt-lg-0">
          {post.featuredImage && (
            <div className="position-relative">
              <img 
                src={post.featuredImage} 
                alt={post.title}
                className="img-fluid rounded-3 shadow-lg"
                style={{
                  maxHeight: '400px',
                  width: '100%',
                  objectFit: 'cover'
                }}
              />
              <div className="position-absolute top-50 start-50 translate-middle">
                <div className="play-button">
                  <FaPlay className="text-white fs-2" />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}