import React, { useEffect, useState } from 'react';
import API from '../services/api';

export default function Loading() {
  const [backendUp, setBackendUp] = useState(false);
  const [showTimeout, setShowTimeout] = useState(false);

  useEffect(() => {
    const checkBackend = async () => {
      try {
        await API.get('/api/posts'); // Simple check
        setBackendUp(true);
      } catch (err) {
        console.error('Backend check failed:', err);
        // Keep checking every 5 seconds
        setTimeout(checkBackend, 5000);
      }
    };

    checkBackend();

    // Timeout after 35 seconds
    const timeout = setTimeout(() => {
      if (!backendUp) {
        setShowTimeout(true);
      }
    }, 35000);

    return () => clearTimeout(timeout);
  }, [backendUp]);

  if (backendUp) {
    return null; // Hide loading when backend is up
  }

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: '#fff',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999,
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <img
        src="/logo.jpg"
        alt="Favicon"
        style={{
          width: '80px',
          height: '80px',
          marginBottom: '20px',
        }}
      />
      <h2 style={{ color: '#333', marginBottom: '20px' }}>Loading...please wait!!!!</h2>
      <div
        className="spinner-border text-primary"
        role="status"
        style={{ width: '3rem', height: '3rem' }}
      >
        <span className="visually-hidden">Loading...</span>
      </div>
      {showTimeout && (
        <p style={{ color: '#666', marginTop: '20px', textAlign: 'center' }}>
          REFRESH OR CHECK YOUR INTERNET CONNECTION
        </p>
      )}
    </div>
  );
}
