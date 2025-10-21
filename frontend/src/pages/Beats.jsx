import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

export default function Beats() {
  const [beats, setBeats] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchBeats = async () => {
      try {
        const { data } = await api.get("/api/posts?category=beats");
        setBeats(Array.isArray(data) ? data : data.posts || []);
      } catch (err) {
        console.error(err);
      }
    };
    fetchBeats();
  }, []);

  const filtered = beats.filter((b) =>
    b.title?.toLowerCase().includes(search.toLowerCase()) ||
    b.category?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h2 className="section-title">Beats</h2>
          <p className="text-muted mb-0">Browse available beats. Click a beat to see details, play, or download.</p>
        </div>
        <div style={{ minWidth: 320 }}>
          <div className="input-group">
            <input
              type="search"
              className="form-control"
              placeholder="Search beats by title or category..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Link to="/beats" className="btn btn-outline-secondary">Search</Link>
          </div>
        </div>
      </div>

      <div className="row g-4">
        {filtered.length > 0 ? (
          filtered.map((b) => (
            <div className="col-sm-6 col-md-4" key={b._id}>
              <div className="card content-card h-100">
                {b.featuredImage && (
                  <img src={b.featuredImage} className="card-img-top" alt={b.title} style={{ objectFit: 'cover', height: 180 }} />
                )}
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{b.title}</h5>
                  <p className="card-text text-muted" style={{ maxHeight: 56, overflow: 'hidden' }}>{b.content}</p>

                  {b.fileUrl && b.fileUrl.match(/\.(mp3|wav|ogg)$/i) && (
                    <audio controls className="w-100 mt-3">
                      <source src={b.fileUrl} />
                    </audio>
                  )}

                  <div className="mt-3 d-flex gap-2">
                    <Link to={`/post/${b._id}`} className="btn btn-sm btn-primary">Details</Link>
                    {b.fileUrl && (
                      <a className="btn btn-sm btn-outline-success" href={b.fileUrl} download target="_blank" rel="noopener noreferrer">Download</a>
                    )}
                    <a className="btn btn-sm btn-outline-secondary ms-auto" href="mailto:info@benthawav.com?subject=License%20Inquiry%20-%20${encodeURIComponent(b.title)}">License</a>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12">
            <div className="alert alert-info text-dark">No beats available yet.</div>
          </div>
        )}
      </div>
    </div>
  );
}
