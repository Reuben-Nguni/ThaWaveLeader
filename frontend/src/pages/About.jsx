import {
  FaEnvelope,
  FaPhoneAlt,
  FaWhatsapp,
  FaMusic,
  FaVideo,
  FaTools,
  FaUser,
} from "react-icons/fa";
import "../styles/about.css";

export default function About() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="container py-5 text-light">
      {/* Hero Section */}
      <div className="text-center mb-5">
        <h1 className="display-4 fw-bold mb-4 text-light">BEN – The Wave Leader</h1>
        <div className="wave-animation">🌊</div>
      </div>

      {/* Main Content Card */}
      <div className="card shadow-lg border-0 mb-5 bg-dark text-light">
        <div className="card-body p-md-5">
          <div className="row g-4">
            {/* Left Column - Main Content */}
            <div className="col-lg-8">
              <h2 className="h3 fw-bold mb-4 text-light">Welcome to the Wave 🌊</h2>
              <p className="lead mb-4 text-light">
                Welcome to the official world of BEN – The Wave Leader, where sound meets code and creativity knows no limits.
              </p>
              <p className="text-light">
                Born Reuben Ng'uni, BEN is more than just a name — it's a movement. A visionary music producer, 
                beat maker, and songwriter, BEN has built a signature sound that flows like a wave — smooth, 
                powerful, and unforgettable.
              </p>
              <p className="text-light">
                While mastering the art of music production, BEN is also deep in the world of tech, 
                currently pursuing Information Technology at a recognized university. From laying down 
                fire instrumentals to writing clean, functional code, BEN blends sound and software 
                into a unique creative force.
              </p>

              {/* Skills Section */}
              <div className="card bg-dark border-secondary border-1 mt-4 mb-4">
                <div className="card-body text-light">
                  <h3 className="h4 mb-4 text-light">Skills & Passions 🎵💻</h3>
                  <div className="row g-3 text-light">
                    <div className="col-md-6">
                      <div className="d-flex align-items-center">
                        <FaMusic className="text-primary me-2" />
                        <span className="text-light">Songwriting with purpose and vibe</span>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="d-flex align-items-center">
                        <FaTools className="text-success me-2" />
                        <span className="text-light">Beat making with precision and soul</span>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="d-flex align-items-center">
                        <FaVideo className="text-danger me-2" />
                        <span className="text-light">Full music production from idea to release</span>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="d-flex align-items-center">
                        <FaUser className="text-info me-2" />
                        <span className="text-light">Programming in today's leading tech stacks</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <p className="lead text-light">
                BEN is dedicated to pushing boundaries, creating sounds that resonate, and always staying ahead of the wave.
              </p>
            </div>

            {/* Right Column - Contact Card */}
            <div className="col-lg-4">
              <div className="card bg-dark border-secondary border-1 h-100">
                <div className="card-body text-light">
                  <h3 className="h4 mb-4 text-light">Let's Connect 🤙</h3>
                  <div className="contact-links">
                    {/* WhatsApp Links with Icons */}
                    <div className="mb-3">
                      <a 
                        href="https://wa.me/260970067982" 
                        className="btn btn-success w-100 mb-2 d-flex align-items-center justify-content-center"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaWhatsapp className="me-2" size={20} />
                        WhatsApp Line 1
                      </a>
                      <a 
                        href="https://wa.me/260769963307" 
                        className="btn btn-success w-100 d-flex align-items-center justify-content-center"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaWhatsapp className="me-2" size={20} />
                        WhatsApp Line 2
                      </a>
                    </div>

                    {/* Phone Numbers */}
                    <div className="mb-3">
                      <div className="d-flex align-items-center mb-2">
                        <FaPhoneAlt className="me-2 text-primary" />
                        <a href="tel:+260970067982" className="text-decoration-none text-light">0970067982</a>
                      </div>
                      <div className="d-flex align-items-center">
                        <FaPhoneAlt className="me-2 text-primary" />
                        <a href="tel:+260769963307" className="text-decoration-none text-light">0769963307</a>
                      </div>
                    </div>

                    {/* Email */}
                    <div className="mb-3">
                      <div className="d-flex align-items-center">
                        <FaEnvelope className="me-2 text-danger" />
                        <a href="mailto:calmeyoungben@gmail.com" className="text-decoration-none text-light">
                          calmeyoungben@gmail.com
                        </a>
                      </div>
                    </div>

                    {/* Tagline */}
                    <div className="mt-4 pt-3 border-top text-center">
                      <p className="mb-1 fw-bold text-light">Stay tuned. Stay real.</p>
                      <p className="mb-0 text-primary">🌊 Stay on the wave.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center">
        <p className="mb-0 text-light">
          &copy; {currentYear} BEN The Wave Leader. All rights reserved.
        </p>
      </footer>
    </div>
  );
}