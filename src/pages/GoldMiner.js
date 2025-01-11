import React, { useState, useEffect, useRef, useCallback } from 'react';
import './GoldMinerGame.css'; // Import the CSS file
import { useUser } from '../context/userContext';
import { db } from '../firebase/firestore'; // Adjust the path as needed
import { doc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore';

// Import images for objects
import goldImage from '../images/gold.svg';
import rockImage from '../images/rock.svg';
import treasureImage from '../images/treasure.svg';
import Hamster from '../images/Hamster.svg';
import PDOGECoin from '../images/PDOGECoin.svg';
import tondog from '../images/tondog.svg';
import PEPE from '../images/PEPE.svg';
import SHIBAINU from '../images/SHIBAINU.svg';
import cosmonautImage from '../images/cosmonaut.svg';
import TrophyIcon from '../images/score-icon.png';
import ClockIcon from '../images/timer-icon.png';


 
// Import sounds
import defaultSong from '../sounds/defoultsong.mp3';
import onFireSound from '../sounds/onfire.mp3';
import dragSound from '../sounds/drag.mp3';
import goldCatchSound from '../sounds/gold-catch.mp3';
import rockCatchSound from '../sounds/rock.mp3';
import tenSecondsLeftSound from '../sounds/10-seconds-left.mp3';
import gameOverSound from '../sounds/game-over.mp3';
import claimSound from '../sounds/claim.mp3';

import { FaVolumeMute, FaVolumeUp } from 'react-icons/fa';

function GoldMinerGame() {
  const { balance, setBalance, tapBalance, setTapBalance, isGameOpened, setIsGameOpened, energy, setEnergy } =
    useUser();

  // Game state variables
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(50);
  const [totalScore, setTotalScore] = useState(0);
  const [currentLevel, setCurrentLevel] = useState(1);
  const [clickCount, setClickCount] = useState(0);
  const [modalVisible, setModalVisible] = useState(true);
  const [modalContent, setModalContent] = useState('<p>Welcome to Super Mining!</p><p>Click Play to Start.</p>');
  const [objects, setObjects] = useState([]);
  const [claw, setClaw] = useState({
    x: window.innerWidth / 2,
    y: 0,
    angle: 0,
    length: 100,
    isDropping: false,
    extending: false,
    retracting: false,
    currentAngle: 0,
    grabbedObject: null,
  });
  const [swingTime, setSwingTime] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gamePaused, setGamePaused] = useState(true);
  const [isTimerVisible, setIsTimerVisible] = useState(false);

  // New state variables for game limits
  const [canPlay, setCanPlay] = useState(false);
  const [gamesPlayedToday, setGamesPlayedToday] = useState(0);
  const [cooldownRemaining, setCooldownRemaining] = useState(0);

  // State for mute/unmute
  const [isMuted, setIsMuted] = useState(false);

  // Audio Refs
  const bgMusicRef = useRef(null);
  const tenSecondsLeftRef = useRef(null);
  const claimSoundRef = useRef(null);
  const gameOverSoundRef = useRef(null);
  const dragSoundRef = useRef(null);
  const goldCatchSoundRef = useRef(null);
  const onFireSoundRef = useRef(null);
  const rockSoundRef = useRef(null);

  // Refs
  const gameSVGRef = useRef(null);
  const animationFrameId = useRef(null);

  // Constants
  const swingSpeed = 0.0025;
  const maxSwingAngle = Math.PI / 2.5;
 
  const clawMaxLength = window.innerHeight;

  const levelMultiplier = currentLevel * 0.1;
const dropSpeed = 8 + levelMultiplier;
const retractSpeed = 8 + levelMultiplier;


  // Initialize the game
  useEffect(() => {
    return () => {
      cancelAnimationFrame(animationFrameId.current);
      window.removeEventListener('keydown', handleControlClaw);
      window.removeEventListener('click', handleControlClaw);
    };
  }, []);

  // Play default background music when the game starts
  useEffect(() => {
    bgMusicRef.current.play();
  }, []);

  // Play sound when 10 seconds are left on the timer
  useEffect(() => {
    if (timeLeft === 10) {
      tenSecondsLeftRef.current.play();
    }
  }, [timeLeft]);

  // Fetch user game data and manage cooldowns
  useEffect(() => {
    const fetchUserGameData = async () => {
      const telegramUser = window.Telegram.WebApp.initDataUnsafe?.user;
      if (telegramUser) {
        const { id: userId } = telegramUser;
        const userRef = doc(db, 'telegramUsers', userId.toString());

        try {
          const userSnap = await getDoc(userRef);
          if (userSnap.exists()) {
            const data = userSnap.data();
            const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
            const lastGameDate = data.lastGameDate ? data.lastGameDate.toDate().toISOString().split('T')[0] : null;

            if (lastGameDate === today) {
              setGamesPlayedToday(data.gamesPlayedToday || 0);

              if ((data.gamesPlayedToday || 0) < 6) {
                setCanPlay(true);
                
                setModalContent(`<p>Welcome to Super Mining!</p><p>Click Play to Start.</p><p>You have ${gamesPlayedToday} games left today.</p>`);

              } else {
                const lastGameTime = data.lastGameTimestamp ? data.lastGameTimestamp.toDate() : null;
                if (lastGameTime) {
                  const now = new Date();
                  const diffMs = now - lastGameTime;
                  const diffMinutes = Math.floor((1 * 1 * 1000 - diffMs) / (1000 * 1));

                  if (diffMinutes <= 0) {
                    setCanPlay(true);
                    setModalContent('<p>Welcome toSuper Mining!</p><p>Click Play to Start.</p>');
                  } else {
                    setCanPlay(false);
                    setCooldownRemaining(diffMinutes);
                    setModalContent(
                      `<p>Daily Free Games Limit Reached!</p><p>Please wait ${diffMinutes} minutes before your next free game.</p>`
                    );
                  }
                }
              }
            } else {
              setGamesPlayedToday(0);
              setCanPlay(true);
              setModalContent('<p>Welcome toSuper Mining!</p><p>Click Play to Start.</p>');
              await updateDoc(userRef, {
                gamesPlayedToday: 0,
                lastGameDate: serverTimestamp(),
                lastGameTimestamp: serverTimestamp(),
              });
            }
          } else {
            await updateDoc(userRef, {
              gamesPlayedToday: 0,
              lastGameDate: serverTimestamp(),
              lastGameTimestamp: serverTimestamp(),
            });
            setGamesPlayedToday(0);
            setCanPlay(true);
            setModalContent('<p>Welcome toSuper Mining!</p><p>Click Play to Start.</p>');
          }
        } catch (error) {
          console.error('Error fetching user game data:', error);
        }
      }
    };

    fetchUserGameData();
  }, []);

  // Handle cooldown timer
  useEffect(() => {
    let timer;
    if (cooldownRemaining > 0) {
      timer = setInterval(() => {
        setCooldownRemaining((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setCanPlay(true);
            setGamesPlayedToday(6); // Allow one more game
            return 0;
          }
          return prev - 1;
        });
      }, 60000); // Decrement every minute
    }
    return () => clearInterval(timer);
  }, [cooldownRemaining]);

  // Game Loop
  useEffect(() => {
    let lastTime = performance.now();

    const update = (timestamp) => {
      if (gamePaused) {
        animationFrameId.current = requestAnimationFrame(update);
        return;
      }

      const deltaTime = timestamp - lastTime;
      lastTime = timestamp;

      if (claw.extending) {
        extendClaw();
      } else if (claw.retracting) {
        retractClaw();
      } else {
        swingClaw(deltaTime);
      }

      animationFrameId.current = requestAnimationFrame(update);
    };

    animationFrameId.current = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(animationFrameId.current);
    };
  }, [claw, gamePaused]);

  // Timer
  useEffect(() => {
    if (gamePaused) return;

    if (timeLeft > 0) {
      const timerId = setTimeout(() => {
        setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
      }, 1000);
      return () => clearTimeout(timerId);
    } else {
      endLevel();
    }
  }, [timeLeft, gamePaused]);

  // Toggle Mute
  useEffect(() => {
    bgMusicRef.current.muted = isMuted;
    tenSecondsLeftRef.current.muted = isMuted;
    claimSoundRef.current.muted = isMuted;
    gameOverSoundRef.current.muted = isMuted;
    dragSoundRef.current.muted = isMuted;
    goldCatchSoundRef.current.muted = isMuted;
    onFireSoundRef.current.muted = isMuted;
    rockSoundRef.current.muted = isMuted;
  }, [isMuted]);

  // Toggle Mute Button Handler
  const toggleMute = () => {
    setIsMuted((prevMuted) => !prevMuted);
  };

  // Game initialization function
  function initializeGame() {
    setTotalScore(0);
    setScore(0);
    setClickCount(0);
    setCurrentLevel(1);
    setGameOver(false);
    setGamePaused(false);
    startLevel();
    window.addEventListener('keydown', handleControlClaw);
    window.addEventListener('click', handleControlClaw);
  }

  // Start the game with limit checks
  async function startGame() {
    const telegramUser = window.Telegram.WebApp.initDataUnsafe?.user;
    if (!telegramUser) {
      alert('User not authenticated.');
      return;
    }

    const { id: userId } = telegramUser;
    const userRef = doc(db, 'telegramUsers', userId.toString());

    try {
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        const data = userSnap.data();
        const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
        const lastGameDate = data.lastGameDate ? data.lastGameDate.toDate().toISOString().split('T')[0] : null;

        if (lastGameDate === today) {
          if ((data.gamesPlayedToday || 0) < 6) {
            await updateDoc(userRef, {
              gamesPlayedToday: (data.gamesPlayedToday || 0) + 1,
              lastGameTimestamp: serverTimestamp(),
            });
            setGamesPlayedToday((prev) => prev + 1);
            if (gamesPlayedToday + 1 >= 6) {
              setCanPlay(false);
            }
            setModalVisible(false);
            setGamePaused(false);
            initializeGame();
          } else {
            const lastGameTime = data.lastGameTimestamp ? data.lastGameTimestamp.toDate() : null;
            if (lastGameTime) {
              const now = new Date();
              const diffMs = now - lastGameTime;
              const diffHours = diffMs / (1000 * 60 * 60);
              if (diffHours >= 1) {
                await updateDoc(userRef, {
                  gamesPlayedToday: (data.gamesPlayedToday || 6) + 1,
                  lastGameTimestamp: serverTimestamp(),
                });
                setGamesPlayedToday((prev) => prev + 1);
                setCanPlay(false);
                setModalVisible(false);
                setGamePaused(false);
                initializeGame();
              } else {
                const remainingMinutes = 60 - Math.floor(diffMs / (1000 * 60));
                setCooldownRemaining(remainingMinutes);
                setModalContent(
                  `<p>Daily Free Games Limit Reached!</p>
                   <p>Please wait ${remainingMinutes} minutes before playing another game.</p>`
                );
                setModalVisible(true);
              }
            }
          }
        } else {
          await updateDoc(userRef, {
            gamesPlayedToday: 1,
            lastGameDate: serverTimestamp(),
            lastGameTimestamp: serverTimestamp(),
          });
          setGamesPlayedToday(1);
          setCanPlay(true);
          setModalVisible(false);
          setGamePaused(false);
          initializeGame();
        }
      } else {
        await updateDoc(userRef, {
          gamesPlayedToday: 1,
          lastGameDate: serverTimestamp(),
          lastGameTimestamp: serverTimestamp(),
        });
        setGamesPlayedToday(1);
        setCanPlay(true);
        setModalVisible(false);
        setGamePaused(false);
        initializeGame();
      }
    } catch (error) {
      console.error('Error starting game:', error);
    }
  }

  function startLevel() {
    setTimeLeft(50);
    setClaw({
      x: window.innerWidth / 2,
      y: 0,
      angle: 0,
      length: 100,
      isDropping: false,
      extending: false,
      retracting: false,
      currentAngle: 0,
      grabbedObject: null,
    });
    setSwingTime(0);
    spawnObjects();
  }

  function swingClaw(deltaTime) {
    if (claw.isDropping) return;

    const newSwingTime = swingTime + deltaTime;
    setSwingTime(newSwingTime);

    const swingAngle = maxSwingAngle * Math.sin(swingSpeed * newSwingTime);
    const centerX = window.innerWidth / 2;
    const centerY = 0;
    const length = 100;
    const clawX = centerX + Math.sin(swingAngle) * length;
    const clawY = centerY + Math.cos(swingAngle) * length;

    setClaw((prevClaw) => ({
      ...prevClaw,
      x: clawX,
      y: clawY,
      angle: swingAngle,
    }));
  }

  function extendClaw() {
    const newLength = claw.length + dropSpeed;
    if (newLength >= clawMaxLength) {
      setClaw((prevClaw) => ({
        ...prevClaw,
        length: clawMaxLength,
        extending: false,
        retracting: true,
      }));
    } else {
      moveClawAlongAngle(newLength);
      checkCollision(); // Check for collisions more frequently
    }
  }
  
  function retractClaw() {
    let decrement = retractSpeed;
    if (claw.grabbedObject) {
      const weight = claw.grabbedObject.weight;
      decrement = retractSpeed / weight; // Reduce speed based on object weight
    }
    const newLength = claw.length - decrement;
    if (newLength <= 100) {
      if (claw.grabbedObject) {
        setTotalScore((prev) => prev + claw.grabbedObject.value);
  
        // Play appropriate sound based on object type
        if (claw.grabbedObject.className === 'gold') {
          goldCatchSoundRef.current.play();
        } else if (claw.grabbedObject.className === 'rock') {
          rockSoundRef.current.play();
        }
  
        setScore((prev) => Math.max(0, prev + claw.grabbedObject.value));
      }
      setClaw((prevClaw) => ({
        ...prevClaw,
        length: 100,
        retracting: false,
        isDropping: false,
        grabbedObject: null,
      }));
    } else {
      moveClawAlongAngle(newLength);
      dragSoundRef.current.play(); // Play drag sound while retracting
    }
  }
  

  function moveClawAlongAngle(length) {
    const centerX = window.innerWidth / 2;
    const centerY = 0;
    const clawX = centerX + Math.sin(claw.currentAngle) * length;
    const clawY = centerY + Math.cos(claw.currentAngle) * length;
  
    setClaw((prevClaw) => ({
      ...prevClaw,
      x: clawX,
      y: clawY,
      length: length,
    }));
  }
  

  function checkCollision() {
    for (let obj of objects) {
      const dx = claw.x - obj.x;
      const dy = claw.y - obj.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < obj.size / 2 + 15) { // Increased tolerance for better grabbing
        onFireSoundRef.current.play(); // Play sound when an object is caught
        setClaw((prevClaw) => ({
          ...prevClaw,
          grabbedObject: obj,
          extending: false,
          retracting: true,
        }));
        setObjects((prevObjects) => prevObjects.filter((o) => o.id !== obj.id));
        return;
      }
    }
  }
  
  

  function spawnObjects() {
    const objectTypes = [
      { className: 'gold', baseSize: 44, value: 120, weight: 1 },
      { className: 'PDOGECoin', baseSize: 70, value: 90, weight: 2 },
      { className: 'Hamster', baseSize: 50, value: 50, weight: 3 },
      { className: 'tondog', baseSize: 40, value: 60, weight: 5 },
      { className: 'PEPE', baseSize: 35, value: 50, weight: 1 },
      { className: 'SHIBAINU', baseSize: 60, value: 70, weight: 1 },
      { className: 'treasure', baseSize: 70, value: 100, weight: 1 },
      { className: 'rock', baseSize: 50, value: -50, weight: 2 },  // Rocks have negative points
    ];
  
    const newObjects = [];
    let attempts = 0;
  
    const centerYStart = window.innerHeight / 4; // 1/4 from the top
    const centerYEnd = (window.innerHeight / 4) * 3; // 1/4 from the bottom
  
    const MIN_VALUE = 500; // Ensure minimum capture value is 500
    const levelMultiplier = currentLevel * 0.1; // Optional: scale object value by level
  
    while (newObjects.length < 20 && attempts < 1000) { // Increased number of objects to 20
      const objType = objectTypes[Math.floor(Math.random() * objectTypes.length)];
  
      // Randomly generate size within a range for variety
      const size = objType.baseSize + Math.floor(Math.random() * 20); // Adds 0-20 to the base size
  
      // Randomly place the objects within the central available screen area
      const x = Math.random() * (window.innerWidth - size) + size / 2;
      const y = Math.random() * (centerYEnd - centerYStart) + centerYStart; // Restrict Y to center part
  
      // Adjust object value to ensure it's 500 or more, with optional level scaling
      let adjustedValue = objType.value < 0 ? objType.value : Math.max(MIN_VALUE, objType.value) * (1 + levelMultiplier);
  
      const newObj = {
        id: Math.random(),
        ...objType,
        value: adjustedValue, // Adjusted value with minimum of 500
        size,  // Use the random size
        x,
        y,
      };
  
      // Check for overlap to avoid objects spawning on top of each other
      let overlap = false;
      for (let obj of newObjects) {
        const dx = newObj.x - obj.x;
        const dy = newObj.y - obj.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < newObj.size / 2 + obj.size / 2) {
          overlap = true;
          break;
        }
      }
  
      if (!overlap) {
        newObjects.push(newObj);
      }
      attempts++;
    }
  
    setObjects(newObjects);
  }
  
  

  function getImageForObject(obj) {
    if (obj.className === 'gold') {
      return goldImage;
    } else if (obj.className === 'Hamster') {
      return Hamster;
    } else if (obj.className === 'teasure') {
      return treasureImage;
      
    }
    else if (obj.className === 'PDOGECoin') {
      return PDOGECoin;
    }
    else if (obj.className === 'tondog') {
      return tondog;
    }
    else if (obj.className === 'PEPE') {
      return PEPE;
    }
    else if (obj.className === 'SHIBAINU') {
      return SHIBAINU;
    }
    else if (obj.className === 'cosmonaut') {
      return cosmonautImage;
    }
    return null;
  }
 

  const handleControlClaw = useCallback(
    (e) => {
      if (modalVisible || gamePaused || !canPlay) return;
      if (e.type === 'keydown' && e.code !== 'Space') return;
      if (claw.isDropping) return;
      if (energy <= 0) return;

      setClaw((prevClaw) => ({
        ...prevClaw,
        isDropping: true,
        extending: true,
        currentAngle: prevClaw.angle,
        length: 100,
      }));
      setClickCount((prev) => prev + 1);
      setEnergy((prevEnergy) => prevEnergy - 1);
    },
    [claw.isDropping, energy, modalVisible, gamePaused, canPlay]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleControlClaw);
    window.addEventListener('click', handleControlClaw);
    return () => {
      window.removeEventListener('keydown', handleControlClaw);
      window.removeEventListener('click', handleControlClaw);
    };
  }, [handleControlClaw]);

  function endLevel() {
    const gamesLeft = 6 - gamesPlayedToday;
    setModalContent(
         `
       <p>You collected ${score} points.</p>
       <p>Total: ${totalScore} points.</p>
        <p>You have ${gamesLeft} games left today.</p>`
       
    );

    setScore(0);
    handleClaim();
    setModalVisible(true);
    setGamePaused(true);
  }

  const handleClaim = async () => {
    const telegramUser = window.Telegram.WebApp.initDataUnsafe?.user;
    if (telegramUser) {
      const { id: userId } = telegramUser;
      const userRef = doc(db, 'telegramUsers', userId.toString());
      try {
        const scoreToAdd = Math.max(0, score);
        await updateDoc(userRef, {
          balance: balance + scoreToAdd,
          energy: energy,
          tapBalance: tapBalance + scoreToAdd,
        });
        localStorage.setItem('energy', energy);

        setBalance(balance + scoreToAdd);
        setTapBalance(tapBalance + scoreToAdd);

        claimSoundRef.current.play();

        if (energy <= 0) {
          setIsTimerVisible(true);
        }
      } catch (error) {
        console.error('Error updating balance and energy:', error);
      }
    }
  };

  function endGame() {
    setGameOver(true);
    gameOverSoundRef.current.play();
    setModalContent(
      `<p>Game Over!</p>
       <p>You collected ${totalScore} points.</p>`
    );
    setModalVisible(true);
    setGamePaused(true);
  }

  function nextLevel() {
    setModalVisible(false);
    setCurrentLevel((prev) => prev + 1);
    setGamePaused(false);
    startLevel();
  }

  function restartGame() {
    setModalVisible(false);
    setGamePaused(false);
    startGame();
  }

  function togglePause(e) {
    e.stopPropagation();
    setGamePaused((prevPaused) => !prevPaused);
    if (!gamePaused) setIsGameOpened(false);
  }

  useEffect(() => {
    console.log(`Current Score: ${score}, Total Score: ${totalScore}, Balance: ${balance}`);
  }, [score, totalScore, balance]);

  return (
    <div id="gameArea" style={{ marginTop: '-12px' }}>
      <div className="cosmonautImage-center"></div>
      <div id="scoreboard">
        <span id="score" style={{ display: 'inline-flex', padding: '0px' }}>
          <img src={TrophyIcon} alt="Trophy" style={{ width: '20px', height: '20px', margin: '0 20px 0px 0px' }} />{' '}
          {totalScore}
        </span>
        <span id="timer" style={{ display: 'inline-flex', margin: '0px 0px 15px 0px' }}>
          <img src={ClockIcon} alt="Clock" style={{ width: '20px', height: '20px', margin: '0 20px 0px 0px' }} />{' '}
          {timeLeft}s
        </span>
      </div>

      <button
        id="muteButton"
        onClick={toggleMute}
        title={isMuted ? 'Unmute' : 'Mute'}
        style={{ position: 'absolute', top: '20px', left: '25px' }}
      >
        {isMuted ? <FaVolumeMute size={24} /> : <FaVolumeUp size={24} />}
      </button>

      {modalVisible && (
        <div id="modal" className="show" onClick={(e) => e.stopPropagation()}>
          <div id="modalContent" dangerouslySetInnerHTML={{ __html: modalContent }}></div>
          <button
            id="modalBtn"
            onClick={(e) => {
              e.stopPropagation();
              if (gameOver) {
                restartGame();
              } else if (currentLevel === 1 && totalScore === 0 && clickCount === 0) {
                startGame();
              } else if (cooldownRemaining > 0) {
              } else {
                endGame();
              }
            }}
            disabled={cooldownRemaining > 0}
          >
            {gameOver ? 'Restart Game' : currentLevel === 1 && totalScore === 0 && clickCount === 0 ? 'Play' : 'Thanks'}
          </button>
          <button
  id="backBtn"
  onClick={() => {
    window.history.back();
  }}
>
  End
</button>

        </div>
      )}
<svg id="gameSVG" width="100%" height="100%" ref={gameSVGRef}>
  <line id="rope" x1={window.innerWidth / 2} y1="0" x2={claw.x} y2={claw.y} stroke="#fff" strokeWidth="3" />

  {/* Smaller Left Claw Arm */}
  <path
    id="claw-left"
    d={`M${claw.x - 7.5},${claw.y} 
        C${claw.x - 12.5},${claw.y + 10}, ${claw.x - 12.5},${claw.y + 25}, ${claw.x - 5},${claw.y + 35} 
        Q${claw.x - 2.5},${claw.y + 37.5} ${claw.x - 1},${claw.y + 35} 
        L${claw.x - 4},${claw.y + 27.5} 
        Q${claw.x - 7.5},${claw.y + 20} ${claw.x - 5},${claw.y + 12.5} 
        Z`}
    fill="#f3c425" 
    stroke="black" 
    strokeWidth="1.5" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    filter="url(#shadow)" 
  />

  {/* Smaller Right Claw Arm */}
  <path
    id="claw-right"
    d={`M${claw.x + 7.5},${claw.y} 
        C${claw.x + 12.5},${claw.y + 10}, ${claw.x + 12.5},${claw.y + 25}, ${claw.x + 5},${claw.y + 35} 
        Q${claw.x + 2.5},${claw.y + 37.5} ${claw.x + 1},${claw.y + 35} 
        L${claw.x + 4},${claw.y + 27.5} 
        Q${claw.x + 7.5},${claw.y + 20} ${claw.x + 5},${claw.y + 12.5} 
        Z`}
    fill="#f3c425" 
    stroke="black" 
    strokeWidth="1.5" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    filter="url(#shadow)"
  />

  {/* Smaller Center Mechanism of Claw */}
  <path
    id="claw-center"
    d={`M${claw.x - 2.5},${claw.y} 
        L${claw.x - 1},${claw.y + 10} 
        Q${claw.x},${claw.y + 12.5} ${claw.x + 1},${claw.y + 10} 
        L${claw.x + 2.5},${claw.y} 
        Z`}
    fill="#f3c425" 
    stroke="black" 
    strokeWidth="1.5" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    filter="url(#shadow)"
  />

  {/* Claw Drop Shadow for a 3D effect */}
  <defs>
    <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
      <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#000" floodOpacity="0.4"/>
    </filter>
  </defs>

  {/* Map Objects */}
  {objects.map((obj) => (
    <image
      key={obj.id}
      href={getImageForObject(obj)}
      x={obj.x - obj.size / 2}
      y={obj.y - obj.size / 2}
      width={obj.size}
      height={obj.size}
    />
  ))}

  {/* Grabbed Object */}
  {claw.grabbedObject && (
    <image
      href={getImageForObject(claw.grabbedObject)}
      x={claw.x - claw.grabbedObject.size / 2}
      y={claw.y + 10 - claw.grabbedObject.size / 2}
      width={claw.grabbedObject.size}
      height={claw.grabbedObject.size}
    />
  )}
</svg>


      {/* Audio elements for sound effects */}
      <audio ref={bgMusicRef} src={defaultSong} loop />
      <audio ref={tenSecondsLeftRef} src={tenSecondsLeftSound} />
      <audio ref={claimSoundRef} src={claimSound} />
      <audio ref={gameOverSoundRef} src={gameOverSound} />
      <audio ref={dragSoundRef} src={dragSound} />
      <audio ref={goldCatchSoundRef} src={goldCatchSound} />
      <audio ref={onFireSoundRef} src={onFireSound} />
      <audio ref={rockSoundRef} src={rockCatchSound} />
    </div>
  );
}

export default GoldMinerGame;
