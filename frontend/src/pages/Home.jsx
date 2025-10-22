import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";
import PostCard from "../components/PostCard";
import FeaturedRelease from "../components/FeaturedRelease";
import "../styles/modern-ui.css";
import "../styles/featured-release.css";
import "../styles/Home.css";

export default function Home() {
  const [featured, setFeatured] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const { data } = await API.get("/api/posts?featured=true");
        if (Array.isArray(data)) {
          setFeatured(data);
        } else if (data.posts) {
          setFeatured(data.posts);
        } else {
          setFeatured([]);
        }
      } catch (err) {
        console.error(err);
        setFeatured([]);
      }
    };
    fetchFeatured();
  }, []);

  // Filter posts by title or category
  const filteredPosts = featured.filter(
    (post) =>
      post.title?.toLowerCase().includes(search.toLowerCase()) ||
      post.category?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      {/* Hero Banner Section */}
  <div className="hero-banner position-relative">
        <div className="container py-5">
          <div className="text-center py-5">
              <h1 className="display-3 fw-bold hero-text mb-4 text-white glowing-text"></h1>
              <p className="lead mb-4 text-white modern-text fw-bold">
                Experience the future of sound production. Premium beats, music, and visual content for the next generation.
              </p>
            <div className="d-flex gap-4 justify-content-center flex-wrap">
              <Link to="/beats" className="btn btn-primary btn-lg px-3 px-md-5 py-3">
                <i className="bi bi-music-note-beamed me-1 d-md-none"></i>
                <span className="d-none d-md-inline">Explore </span>Beats
              </Link>
              <Link to="/videos" className="btn btn-primary btn-lg px-3 px-md-5 py-3">
                <i className="bi bi-camera-video me-1 d-md-none"></i>
                <span className="d-none d-md-inline">Watch </span>Videos
              </Link>
            </div>
            {/* (small inline logo removed) */}
          </div>
        </div>
      </div>

      {/* Featured Release Banner */}
      <div className="container my-5">
        {featured.filter(p => p.featured && p.category === 'beats').slice(0, 1).map(featuredBeat => (
          <FeaturedRelease key={featuredBeat._id} post={featuredBeat} />
        ))}
      </div>

      <div className="container py-5">
        {/* Search Bar */}
        <div className="search-container mb-5">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="input-group input-group-lg">
                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="🔍 Search beats, music, or videos..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <button className="btn btn-primary btn-lg">Search</button>
              </div>
            </div>
          </div>
        </div>

        {/* Content Categories */}
        <div className="row g-4 mb-5">
          <div className="col-md-4">
            <Link to="/beats" className="card text-center text-decoration-none text-light bg-dark colorful-card">
              <div className="card-body py-4">
                <i className="bi bi-music-note-beamed fs-1 mb-3 text-primary"></i>
                <h5 className="card-title text-light fw-bold">Beats</h5>
                <p className="card-text">Explore premium beats for your next hit</p>
              </div>
            </Link>
          </div>
          <div className="col-md-4">
            <Link to="/videos" className="card text-center text-decoration-none text-light bg-dark colorful-card">
              <div className="card-body py-4">
                <i className="bi bi-camera-video fs-1 mb-3 text-danger"></i>
                <h5 className="card-title text-light fw-bold">Music Videos</h5>
                <p className="card-text">Watch exclusive music videos</p>
              </div>
            </Link>
          </div>
          <div className="col-md-4">
            <div className="card text-center text-light bg-dark colorful-card">
              <div className="card-body py-4">
                <i className="bi bi-collection-play fs-1 mb-3 text-success"></i>
                <h5 className="card-title text-light fw-bold">Mods</h5>
                <p className="card-text">Download custom mods and samples</p>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Content */}
        <div className="featured-section mb-5">
          <h2 className="section-title mb-4 text-light">🎧 Featured Content</h2>

          {filteredPosts.length > 0 ? (
            <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4">
              {filteredPosts.map((post) => (
                <div key={post._id} className="col">
                  <div className="card h-100 shadow-sm bg-dark text-light">
                    <div className="card-body">
                      <PostCard post={post} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="alert alert-dark text-light text-center p-4">
              <i className="bi bi-info-circle fs-4 mb-3 text-light"></i>
              <p className="mb-0 text-light">No matching content found. Try different search terms.</p>
            </div>
          )}
        </div>

        {/* Modern Music Player */}
        


      </div>
    </>
  );
}
