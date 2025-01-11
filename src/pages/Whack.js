import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';

 

const Whack = () => { 
  const navigate = useNavigate();

const handleBackClick = () => {
  navigate('/'); // Redirect to home when clicked
};
  return (
    <>
      <Helmet>
      <link rel="stylesheet" href="CustomGame.css" />
      </Helmet>
    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden', position: 'relative' }}>
      {/* Slim Back Button */}
            <button
        onClick={handleBackClick}
        style={{
          position: 'absolute',
          top: '42px',
          left: '1px',
          backgroundColor: '#000',
          color: '#fff',
          border: 'none',
          borderRadius: '20px',
          padding: '8px 16px',
          fontSize: '20px',
          cursor: 'pointer',
          zIndex: 10,
        }}
      >
        ← Back
      </button>
      {/* Iframe containing the game */}
      <iframe
        src="/whackgame/index.html"
        style={{ width: '100%', height: '100%', border: 'none' }}
        title="whackgame Game"
      />
    </div>
    </>
  );
};

export default Whack;

