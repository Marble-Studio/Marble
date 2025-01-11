import React, { useEffect, useState, useRef } from 'react';
import { doc, updateDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase/firestore';
import { NavLink } from 'react-router-dom';
import styled, { keyframes, css } from 'styled-components';
import { BsFillCheckSquareFill } from 'react-icons/bs';
import Animate from '../Components/Animate';
import Spinner from '../Components/Spinner';
import Levels from '../Components/Levels';
import Exchanges from '../Components/Exchanges';
import SettingsMenu from '../Components/SettingsMenu';
import PphInfo from '../Components/PphInfo';
import { useUser } from '../context/userContext';

const userLevels = [
  { id: 1, name: 'Rookie', icon: '/level1.png', tapBalanceRequired: 50000 },
  { id: 2, name: 'Warrior', icon: '/level2.png', tapBalanceRequired: 500000 },
  { id: 3, name: 'Legend', icon: '/level3.png', tapBalanceRequired: 1000000 },
  { id: 4, name: 'Gladiator', icon: '/level4.png', tapBalanceRequired: 5000000 },
  { id: 5, name: 'Master', icon: '/level5.png', tapBalanceRequired: 20000000 },
  { id: 6, name: 'Titan', icon: '/level6.png', tapBalanceRequired: 50000000 },
  { id: 7, name: 'King', icon: '/level7.png', tapBalanceRequired: 200000000 },
  { id: 8, name: 'Devil', icon: '/level8.png', tapBalanceRequired: 500000000 },
  { id: 9, name: 'Darkness', icon: '/level9.png', tapBalanceRequired: 1000000000 },
  { id: 10, name: 'God', icon: '/level10.png', tapBalanceRequired: 10000000000 },
];

// Keyframe Animations for aura and color change on tap
const colorShift = keyframes`
  0% { filter: hue-rotate(0deg) brightness(1); }
  50% { filter: hue-rotate(180deg) brightness(1.5); }
  100% { filter: hue-rotate(360deg) brightness(1); }
`;

const popupFadeInOut = keyframes`
  0% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
  50% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
  100% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
`;

const rippleEffect = keyframes`
  0% { opacity: 0.6; transform: scale(0.5); }
  100% { opacity: 0; transform: scale(2); }
`;

const Header = styled.div`
  background: linear-gradient(to right, #1a1a1a, #2a2a2a);
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
`;

const StyledPopupMessage = styled.div`
  position: absolute;
  left: ${({ x }) => x}px;
  top: ${({ y }) => y}px;
  animation: ${popupFadeInOut} 2s ease-in-out;
  font-size: 1em;
  font-weight: 600;
  color: #ffffff;
  background: linear-gradient(135deg, #ff7a18, #af002d 80%, #3194ff);
  padding: 10px 15px;
  border-radius: 10px;
  border: 2px solid rgba(255, 255, 255, 0.2);
  text-align: center;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.3);
  max-width: 200px;
  z-index: 2;
`;

const Ripple = styled.div`
  position: absolute;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 50%;
  width: 30px;
  height: 30px;
  animation: ${rippleEffect} 0.6s ease-out;
  pointer-events: none;
`;

const GlowImage = styled.img`
  width: 90%;
  transition: transform 0.3s ease;
  ${(props) =>
    props.isTapped &&
    css`
      animation: ${colorShift} 2s ease;
    `}
  &:hover {
    transform: scale(1.05);
  }
`;

const Container = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  text-align: center;
  width: 100%;
`;

const GoldHunters = () => {
  const imageRef = useRef(null);
  const [clicks, setClicks] = useState([]);
  const [popupMessage, setPopupMessage] = useState(null);
  const [glowBooster, setGlowBooster] = useState(false);
  const [rubReaction, setRubReaction] = useState(false);
  const [ripples, setRipples] = useState([]);
  const [isClicking, setIsClicking] = useState(false);
  const [isTapped, setIsTapped] = useState(false);

  const {
    balance,
    tapBalance,
    energy,
    battery,
    profitHour,
    coolDownTime,
    tappingGuru,
    selectedCharacter,
    fullName,
    setFullName,
    username,
    characterMenu,
    setCharacterMenu,
    setSelectedCharacter,
    id,
    tapGuru,
    setEnergy,
    tapValue,
    setTapBalance,
    setBalance,
    refBonus,
    loading,
    initialized,
  } = useUser();

  const [points, setPoints] = useState(0);
  const [isDisabled, setIsDisabled] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(null);
  const [isTimerVisible, setIsTimerVisible] = useState(false);

  const messages = [
    "I don't earn points on tapping, and this hurts me!",
    "Try the gaming section, it's more fun!",
    "Ouch! That really stings!",
    "Why not play some games instead?",
    "Oof! That was a hard tap!",
    "I'm not earning any points from this!",
    "Seriously, stop tapping me, go play!",
    "It would be better if you rubbed, haha!"
  ];

  const getRandomMessage = () => messages[Math.floor(Math.random() * messages.length)];

  const triggerHapticFeedback = () => {
    const isAndroid = /Android/i.test(navigator.userAgent);
    const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);

    if (isIOS && window.Telegram && window.Telegram.WebApp && window.Telegram.WebApp.HapticFeedback) {
      window.Telegram.WebApp.HapticFeedback.impactOccurred('medium');
    } else if (isAndroid && navigator.vibrate) {
      navigator.vibrate(50);
    }
  };

  useEffect(() => {
    if (id) {
      const userRef = doc(db, 'telegramUsers', id.toString());

      const unsubscribe = onSnapshot(userRef, (docSnapshot) => {
        if (docSnapshot.exists()) {
          const userData = docSnapshot.data();
          setBalance(userData.balance || 0);
          setTapBalance(userData.tapBalance || 0);
        }
      });

      return () => unsubscribe();
    }
  }, [id, setBalance, setTapBalance]);

  const handleClick = (e) => {
    if (isClicking) return;
    setIsClicking(true);
    setTimeout(() => setIsClicking(false), 300);

    triggerHapticFeedback();

    if (energy <= 0 || isDisabled) {
      setGlowBooster(true);
      setTimeout(() => setGlowBooster(false), 300);
      return;
    }

    const { offsetX, offsetY } = e.nativeEvent;

    setPopupMessage({
      text: getRandomMessage(),
      x: offsetX,
      y: offsetY - 30,
    });
    setTimeout(() => setPopupMessage(null), 4000);

    const newRipple = { id: Date.now(), x: offsetX, y: offsetY };
    setRipples((prevRipples) => [...prevRipples, newRipple]);
    setTimeout(() => {
      setRipples((prevRipples) => prevRipples.filter((ripple) => ripple.id !== newRipple.id));
    }, 600);

    setIsTapped(true);
    setTimeout(() => setIsTapped(false), 4000); // Aura effect lasts for 2 seconds

    handleClaim();
  };

  const handleRub = () => {
    setRubReaction(true);
    setTimeout(() => setRubReaction(false), 500);
  };

  const handleClaim = async () => {
    if (id) {
      const userRef = doc(db, 'telegramUsers', id.toString());
      try {
        await updateDoc(userRef, {
          balance: balance + points,
          energy: energy,
          tapBalance: tapBalance + points,
        });
        setBalance((prevBalance) => prevBalance + points);
        setTapBalance((prevTapBalance) => prevTapBalance + points);
        if (energy <= 0) setIsTimerVisible(true);
      } catch (error) {
        console.error('Error updating balance and energy:', error);
      }
    }
  };

  const formatNumber = (num) => {
    if (num < 1000) {
      return num.toFixed(2);
    } else if (num < 1000000) {
      return new Intl.NumberFormat().format(num).replace(/,/g, ' ');
    } else {
      return (num / 1000000).toFixed(2) + ' M';
    }
  };

  const initialLevelIndex = userLevels.findIndex((level) => tapBalance < level.tapBalanceRequired);
  const currentLevelIndex = initialLevelIndex === -1 ? userLevels.length - 1 : initialLevelIndex;

  const displayedLevelIndex = currentLevelIndex;
  const currentLevel = userLevels[displayedLevelIndex];

  const getIconForLevel = (levelId) => `/hero${levelId}.png`;

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <Animate>
          <div className="w-full flex justify-center flex-col space-y-3" style={{ marginTop: '-12px' }}>
            <Header className="grid grid-cols-3 items-center p-4 bg-transparent" style={{background:'#00000000'}}>
              <div className="flex items-center space-x-2">
                <div className="relative w-10 h-10">
                  <img src={selectedCharacter.avatar} alt={fullName || 'user'} className="w-full h-full rounded-full object-cover" />
                  <span className="absolute top-0 left-0 bg-yellow-400 w-4 h-4 rounded-full border-2 border-transparent flex items-center justify-center text-[0.65rem] font-bold text-black">
                    {currentLevel.id}
                  </span>
                </div>
                <div className="flex flex-col" style={{minWidth:'65px', maxWidth:'65px'}}>
                  <h3 className="text-white text-[0.875rem] font-bold leading-tight">{fullName?.split(' ')[0]}</h3>
                  <div className="w-full bg-gray-700 rounded-full h-1.5 mt-1 relative">
                    <div
                      className="bg-gradient-to-r from-green-400 to-blue-500 h-full rounded-full"
                      style={{ width: `${(balance / currentLevel.tapBalanceRequired) * 100}%`, maxWidth:'100%' }}
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-center">
                <img src="/logo.png" alt="Tasks" className="h-8" style={{position:'relative', right:'30px'}} />
              </div>
              <div className="flex justify-end">
                <svg className="w-6 h-6 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.14,12.94a7.51,7.51,0,0,0,0-1.88l2.1-1.63a1,1,0,0,0,.24-1.3l-2-3.46a1,1,0,0,0-1.17-.45l-2.49,1a7.48,7.48,0,0,0-1.63-.95l-.38-2.65a1,1,0,0,0-1-.83H9.46a1,1,0,0,0-1,.83l-.38,2.65a7.48,7.48,0,0,0-1.63.95l-2.49-1a1,1,0,0,0-1.17.45l-2,3.46a1,1,0,0,0,.24,1.3l2.1,1.63a7.51,7.51,0,0,0,0,1.88L2.07,14.57a1,1,0,0,0-.24,1.3l2,3.46a1,1,0,0,0,1.17.45l2.49-1a7.48,7.48,0,0,0,1.63.95l.38,2.65a1,1,0,0,0,1,.83h3.08a1,1,0,0,0,1-.83l.38-2.65a7.48,7.48,0,0,0,1.63-.95l2.49,1a1,1,0,0,0,1.17-.45l2-3.46a1,1,0,0,0-.24-1.3ZM12,15.5A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"/>
                </svg>
              </div>
            </Header>

            <div id="refer" className="w-full h-screen mt-2 px-5">
              <h1
                className="flex w-full justify-center items-center space-x-2 pb-2"
                style={{
                  marginTop: '30px',
                  background: "url('/coinbg.png')",
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: '46%',
                  paddingBottom: '0.9rem',
                }}
              >
                <span className="text-white text-2xl font-bold" style={{position: "relative", left: "20px", color: "black", top:"7px", fontSize: '17px'}}>
                  {formatNumber(balance + refBonus)}
                </span>
              </h1>

              <div className="w-full flex flex-col overflow-y-auto pb-40" style={{ paddingTop: '4rem' }}>
                <Container>
                  <div onClick={handleClick} style={{ position: "relative" }}>
                    <GlowImage
                      ref={imageRef}
                      src={tapGuru ? '/tappingGuro.png' : getIconForLevel(userLevels.find((level) => balance < level.tapBalanceRequired)?.id)}
                      isTapped={isTapped}
                      alt="Tap"
                    />
                    {ripples.map((ripple) => (
                      <Ripple key={ripple.id} style={{ left: ripple.x, top: ripple.y }} />
                    ))}
                  </div>
                </Container>
                {popupMessage && (
                  <StyledPopupMessage x={popupMessage.x} y={popupMessage.y}>
                    {popupMessage.text}
                  </StyledPopupMessage>
                )}
              </div>
            </div>

            <div
              className="fixed left-4 right-4 mx-auto max-w-md grid grid-cols-2 items-center"
              style={{
                borderRadius: '10px',
                bottom: '93px',
                height: '40px',
              }}
            >
              <NavLink to="/tasks">
                <div className="flex items-center justify-center h-full" style={{float:"left"}}>
                  <img src="/tasksbtn.png" alt="Tasks" style={{ maxWidth: '140px', position: 'relative', bottom: '20px' }} />
                </div>
              </NavLink>
              <NavLink to="/leaderboard">
                <div className="flex items-center justify-center h-full" style={{float:"right"}}>
                  <img src="/rankingbtn.png" alt="Ranking" style={{ maxWidth: '170px', position: 'relative', bottom: '20px' }} />
                </div>
              </NavLink>
            </div>

            <Levels showLevel={false} setShowLevel={() => {}} />
            <Exchanges showExchange={false} setShowExchange={() => {}} />
            <SettingsMenu showSetting={false} setShowSetting={() => {}} />
            <PphInfo info={false} setInfo={() => {}} />
          </div>
        </Animate>
      )}
    </>
  );
};

export default GoldHunters;
