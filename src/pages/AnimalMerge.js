import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const AnimalMerge = () => {
 const navigate = useNavigate(); // Initialize navigate
  useEffect(() => {
    // Check if the protocol is 'file' and show an alert
    if (window.location.protocol.startsWith('file')) {
      alert(
        "Web exports won't work until you upload them. (When running on the file: protocol, browsers block many features from working for security reasons.)"
      );
    }

    // Dynamically load the external scripts
    const loadScript = (src, type = 'text/javascript') => {
      const script = document.createElement('script');
      script.src = src;
      script.type = type;
      script.async = true;
      document.body.appendChild(script);
    };

    // Load external scripts
    loadScript('/scripts/modernjscheck.js');
    loadScript('/scripts/supportcheck.js');
    loadScript('/scripts/offlineclient.js', 'module');
    loadScript('/scripts/main.js', 'module');
    loadScript('/scripts/register-sw.js', 'module');

    // Function to stop the game
    const stopGame = () => {
      console.log('Stopping the game...');
      const gameCanvas = document.getElementById('gameCanvas');
      if (gameCanvas) {
        cancelAnimationFrame(window.gameLoop); // Stop game loop
        clearInterval(window.gameInterval); // Stop intervals
        gameCanvas.getContext('2d').clearRect(0, 0, gameCanvas.width, gameCanvas.height); // Clear canvas
      }
    };

    // Handle dynamic resizing of canvas based on window size
    const handleResize = () => {
      const canvas = document.getElementById('gameCanvas');
      if (canvas) {
        const width = window.innerWidth;
        const height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
      }
    };

    // Initial resize and setting event listeners
    handleResize();
    window.addEventListener('resize', handleResize);

    // Add event listeners for stopping the game
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        stopGame();
      }
    });

    window.addEventListener('beforeunload', (event) => {
      stopGame();
      event.preventDefault();
      event.returnValue = '';
    });

    // Cleanup on unmount
    return () => {
      document.removeEventListener('visibilitychange', stopGame);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('beforeunload', stopGame);
      stopGame(); // Ensure game stops on unmount
    };
  }, []);

  return (
    <>
      <Helmet>
        <meta charset="UTF-8" />
        <title>Animals Merge</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
        <meta name="generator" content="Scirra Construct" />

        <link rel="manifest" href="appmanifest.json" />
        <link rel="apple-touch-icon" sizes="128x128" href="icons/icon-128.png" />
        <link rel="apple-touch-icon" sizes="256x256" href="icons/icon-256.png" />
        <link rel="apple-touch-icon" sizes="512x512" href="icons/icon-512.png" />
        <link rel="icon" type="image/png" href="icons/icon-512.png" />
        <link rel="stylesheet" href="style.css" />
      </Helmet>
      <button 
  onClick={() => window.location.href = '/miniGames'} // Navigate and hard reload to the /miniGames page
  style={{
    position: 'absolute',
    bottom: '-100px',
    left: '0px',
    padding: '38px 176px',
    backgroundColor: '#76915a',
    color: '#fff',
    border: 'none',
    borderRadius: '0px',
    cursor: 'pointer',
    fontSize: '16px',
    zIndex: 1000, // Ensure the button is on top
  }}
>
  Back
</button>




      <div 
        id="gameContainer" 
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          width: '100vw',
          backgroundColor: '#1a1a1a', // Dark background for contrast
          margin: '0',
          padding: '0',
          overflow: 'hidden',
          transition: 'background-color 0.5s ease-in-out' // Smooth transition effect
        }}
      >
        <canvas 
          id="gameCanvas" 
          style={{
            width: '100%',
            height: '100%',
            display: 'block',
            borderRadius: '12px', // Rounded corners for the canvas
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.5)' // Subtle shadow for depth
          }}
        ></canvas>
      </div>
    </>
  );
};

export default AnimalMerge;
