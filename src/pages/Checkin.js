import React, { useEffect, useState } from 'react';
import { db } from '../firebase/firestore'; // Adjust the import based on your file structure
import { doc, getDoc, updateDoc, Timestamp } from 'firebase/firestore';
import { useUser } from '../context/userContext';
import { RiArrowRightSLine, RiSettings4Fill } from 'react-icons/ri';
import Levels from '../Components/Levels';
import SettingsMenu from '../Components/SettingsMenu';
import { PiLockKeyFill } from 'react-icons/pi';
import { FaCalendarAlt } from 'react-icons/fa';
import { IoCheckmarkCircleSharp, IoClose, IoWarningOutline } from 'react-icons/io5';
import Animate from '../Components/Animate';
import { useNavigate } from 'react-router-dom';

const userLevels = [
  { id: 1, name: 'Rookie (Level 1)', icon: '/level1.png', tapBalanceRequired: 50000 },          // 50K tap balance
  { id: 2, name: 'Warrior (Level 2)', icon: '/level2.png', tapBalanceRequired: 500000 },         // 500K tap balance
  { id: 3, name: 'Legend (Level 3)', icon: '/level3.png', tapBalanceRequired: 1000000 },        // 1M tap balance
  { id: 4, name: 'Gladiator (Level 4)', icon: '/level4.png', tapBalanceRequired: 5000000 },        // 5M tap balance
  { id: 5, name: 'Master (Level 5)', icon: '/level5.png', tapBalanceRequired: 20000000 },       // 20M tap balance
  { id: 6, name: 'Titan (Level 6)', icon: '/level6.png', tapBalanceRequired: 50000000 },       // 50M tap balance
  { id: 7, name: 'King (Level 7)', icon: '/level7.png', tapBalanceRequired: 200000000 },      // 200M tap balance
  { id: 8, name: 'Devil (Level 8)', icon: '/level8.png', tapBalanceRequired: 500000000 },      // 500M tap balance
  { id: 9, name: 'Darkness (Level 9)', icon: '/level9.png', tapBalanceRequired: 1000000000 },     // 1B tap balance
  { id: 10, name: 'God (Level 10)', icon: '/level10.png', tapBalanceRequired: 10000000000 }  // 10B tap balance
];

const DailyCheckIn = () => {
  const {
    id,
    fullName,
    tapBalance,
    showStartOverModal,
    setShowStartOverModal,
    showClaimModal,
    setShowClaimModal,
    refBonus,
    setLastCheckIn,
    setError,
    error,
    checkInDays,
    setCheckInDays,
    balance,
    setBalance,
    selectedCharacter,
    selectedExchange,
    setShowExchange,
  } = useUser();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showLevel, setShowLevel] = useState(false);
  const [showSetting, setShowSetting] = useState(false);
  const [claiming, setClaiming] = useState(false);
  const [congrats, setCongrats] = useState(false);
  const locations = useNavigate();
  const [backLos, setBackLos] = useState(true);

  const [streak, setStreak] = useState(false);

  const bonusPoints = [1000, 5000, 8000, 15000, 30000, 50000, 150000, 200000, 1200000, 3500000];


  useEffect(() => {
    // Attach a click event listener to handle the back navigation
    const handleBackButtonClick = () => {
      locations('/tasks'); // Navigate to /home without refreshing the page
      setBackLos(false);
    };

    if (backLos) {
      window.Telegram.WebApp.BackButton.show();
      window.Telegram.WebApp.BackButton.onClick(handleBackButtonClick);
    } else {
      window.Telegram.WebApp.BackButton.hide();
      window.Telegram.WebApp.BackButton.offClick(handleBackButtonClick);
    }

    // Cleanup handler when component unmounts
    return () => {
      window.Telegram.WebApp.BackButton.offClick(handleBackButtonClick);
    };
  }, [backLos, setBackLos, locations]);

  const handleDailyCheckIn = async () => {
    if (!id) return;
    setClaiming(true);
    setError(null);
    setShowSuccessModal(false);
    setShowClaimModal(false);

    try {
      const userDocRef = doc(db, 'telegramUsers', id);
      const userDoc = await getDoc(userDocRef);
      if (userDoc.exists()) {
        const userData = userDoc.data();
        const now = new Date();

        const lastCheckInDate = userData.lastCheckIn?.toDate();
        const currentDayIndex = checkInDays.length;

        if (lastCheckInDate) {
          const lastCheckInMidnight = new Date(lastCheckInDate);
          lastCheckInMidnight.setHours(0, 0, 0, 0);

          const todayMidnight = new Date(now);
          todayMidnight.setHours(0, 0, 0, 0);

          const daysSinceLastCheckIn = Math.floor((todayMidnight - lastCheckInMidnight) / (1000 * 60 * 60 * 24));

          if (daysSinceLastCheckIn === 0) {
            throw new Error('Next checkIn is tomorrow!');
          } else if (daysSinceLastCheckIn > 1) {
            // Show the start over modal if a day was missed
            setShowStartOverModal(true);
            return;
          }
        }

        const currentBonus = bonusPoints[currentDayIndex];

        if (currentDayIndex >= bonusPoints.length - 1) {
          // If it's the last day, reset the streak and start over
          await updateDoc(userDocRef, {
            lastCheckIn: Timestamp.fromDate(now),
            balance: (userData.balance || 0) + currentBonus,
            checkInDays: [1], // Resetting to day 1
          });
          setCheckInDays([1]);
          setStreak(true);
        } else {
          await updateDoc(userDocRef, {
            lastCheckIn: Timestamp.fromDate(now),
            balance: (userData.balance || 0) + currentBonus,
            checkInDays: [...checkInDays, currentDayIndex + 1], // Saving day number instead of index
          });
          setCheckInDays([...checkInDays, currentDayIndex + 1]);
        }

        setShowSuccessModal(true);
        setCongrats(true);
        setTimeout(() => {
          setCongrats(false);
        }, 4000);
        setLastCheckIn(now);
        setBalance(balance + currentBonus);
      }
    } catch (err) {
      console.error('Error during daily check-in:', err);
      setError(err.message);
    } finally {
      setClaiming(false);
    }
  };

  const handleStartOver = async () => {
    if (!id) return;
    setClaiming(true);
    setError(null);
    setShowStartOverModal(false);

    try {
      const userDocRef = doc(db, 'telegramUsers', id);
      const now = new Date();
      const currentBonus = bonusPoints[0]; // Bonus for day 1

      await updateDoc(userDocRef, {
        lastCheckIn: Timestamp.fromDate(now),
        balance: balance + currentBonus,
        checkInDays: [1], // Starting over from day 1
      });

      setShowSuccessModal(true);
      setCongrats(true);
      setTimeout(() => {
        setCongrats(false);
      }, 4000);
      setLastCheckIn(now);
      setBalance(balance + currentBonus);
      setCheckInDays([1]);
    } catch (err) {
      console.error('Error during start over:', err);
      setError(err.message);
    } finally {
      setClaiming(false);
    }
  };

  const initialLevelIndex = userLevels.findIndex((level) => tapBalance < level.tapBalanceRequired);
  const currentLevelIndex = initialLevelIndex === -1 ? userLevels.length - 1 : initialLevelIndex;

  const displayedLevelIndex = currentLevelIndex;
  const currentLevel = userLevels[displayedLevelIndex];

  const formatNumberCliam = (num) => {
    if (num < 100000) {
      return new Intl.NumberFormat().format(num).replace(/,/g, ' ');
    } else if (num < 1000000) {
      return new Intl.NumberFormat().format(num).replace(/,/g, ' ');
    } else {
      return (num / 1000000).toFixed(2).replace('.', '.') + ' M';
    }
  };
  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError(null);
      }, 3000);
    }
  }, [error, setError]);

  const renderCheckInBoxes = () => {
    return bonusPoints.map((points, index) => {
      const isCurrentDay = index === checkInDays.length;
      const isCheckedIn = checkInDays.includes(index + 1);
      const isLocked = index > checkInDays.length;

      return (
        <button
          key={index}
          disabled={isCheckedIn || isLocked}
          className={`w-[23%] space-y-1 flex flex-col items-center justify-center relative h-[80px] rounded-[8px] cursor-pointer select-none
            ${isCurrentDay && !isCheckedIn ? 'bg-blue-700 border-blue-500' : ''}
            ${isCheckedIn ? 'bg-green-600 border-green-100 cursor-not-allowed' : ''}
            ${isLocked ? 'bg-gray-600 border-red-500 cursor-not-allowed' : ''}
            ${!isCurrentDay && !isLocked ? 'bg-cards' : ''}
          `}
          onClick={() => isCurrentDay && !isCheckedIn && handleDailyCheckIn()}
        >
          <h2 className="text-[10px]">
            {isLocked ? <PiLockKeyFill size={10} className="text-[#C7C7C7]" /> : `Day ${index + 1}`}
          </h2>
          <img src="/coin.webp" alt="coin" className="w-[16px]" />
          <span className="text-[13px] font-bold">{formatNumberCliam(points)}</span>
          <span
            className={`${isCurrentDay ? 'absolute' : 'hidden'} w-[6px] top-1 right-2 h-[6px] bg-white rounded-full ${!isCheckedIn ? 'animate-pulse' : ''}`}
          ></span>
          <span
            className={`${claiming && isCurrentDay ? 'flex' : 'hidden'} absolute left-0 right-0 top-0 bottom-0 !mt-0 items-center justify-center text-[10px] rounded-[8px] bg-[#414040]`}
          >
            <em className="animate-pulse not-italic">Claiming...</em>
          </span>
        </button>
      );
    });
  };

  return (
    <>
      <Animate>
        <div className="w-full flex justify-center flex-col mt-[-12px]">
          <div className="flex justify-between bg-[#1a1a1a] p-4 items-center bg-gray-800 bg-opacity-50 p-3 rounded-bl-[22px] rounded-br-[22px] shadow-lg">
            {/* LEFT */}
            <div>
              {/* User Info */}
              <div className="flex items-center space-x-3">
                <div className="relative flex items-center justify-center overflow-hidden">
                  <img
                    src={selectedCharacter.avatar}
                    className="w-12 h-12 rounded-full border-4 border-yellow-400 shadow-lg"
                    alt={fullName || 'user'}
                  />
                  <span className="absolute bottom-0 right-0 bg-green-500 w-4 h-4 rounded-full border-2 border-white"></span>
                </div>
                <div>
                  <h1 className="text-lg font-bold text-white">{fullName}</h1>
                  <span className="text-sm text-yellow-400 font-semibold">Fighter</span>
                </div>
              </div>
              {/* User Level */}
              <div style={{ margin: '10px 0 0 0' }}>
                {/* Progress Bar */}
                <div className="w-full bg-gray-700 rounded-full h-6 shadow-inner overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-green-400 to-blue-500 h-full rounded-full"
                    style={{ width: `${(balance / currentLevel.tapBalanceRequired) * 100}%`, maxWidth:'100%' }}
                  />
                </div>

                {/* Level Information */}
                <div
                  className="flex items-center justify-between mt-4"
                  style={{
                    marginTop: '-26px',
                    zIndex: 3,
                    position: 'relative',
                    transform: 'scale(0.7)',
                  }}
                >
                  <span
                    onClick={() => setShowLevel(true)}
                    className="text-white cursor-pointer font-bold text-xl flex items-center hover:underline"
                  >
                    Level {currentLevel.id}: {currentLevel.name}
                    <RiArrowRightSLine size={20} className="ml-2 text-yellow-400" />
                  </span>
                  <span className="text-gray-400 text-sm">
                    ({currentLevel.id}/{userLevels.length})
                  </span>
                </div>
              </div>
            </div>
            {/* RIGHT */}
            <div className="flex flex-col items-end">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setShowExchange(true)}
                  className="p-2 bg-gray-700 rounded-full hover:bg-gray-600 transition shadow-lg"
                >
                  <img
                    id={selectedExchange.id}
                    src={selectedExchange.icon}
                    alt={selectedExchange.name}
                    className="w-6 h-6"
                  />
                </button>
                <button
                  onClick={() => setShowSetting(true)}
                  className="p-2 bg-gray-700 rounded-full hover:bg-gray-600 transition shadow-lg"
                >
                  <RiSettings4Fill size={24} className="text-white" />
                </button>
              </div>
              <div
                className="w-fit py-[2px] px-3 flex items-center space-x-1 justify-center border-[1px] border-[#707070] rounded-[25px]"
                style={{ marginTop: '18px' }}
              >
                <span className="w-[14px]">
                  <img alt="engy" src="/loader.webp" className="w-full" />
                </span>
                <h1 className="text-[15px] font-bold">{formatNumberCliam(balance + refBonus)}</h1>
              </div>
            </div>
          </div>

          <div id="refer" className="w-full flex flex-col scroller h-[100vh] overflow-y-auto pb-[180px] pt-3 px-4">
            <div className={`w-full flex-col pb-4 flex items-center justify-center text-center pt-4`}>
              <span className="bg-cards h-[90px] w-[90px] rounded-full flex items-center justify-center">
                <FaCalendarAlt size={50} className="text-accent" />
              </span>
              <h1 className="text-[20px] font-semibold pt-2">Daily checkin rewards</h1>
              <p className="text-[14px] leading-[24px]">Accrue Marble tokens for logging into the game daily!</p>
            </div>

            <div className="w-full flex justify-center gap-2 flex-wrap">
              {renderCheckInBoxes()}

              <button className="w-[23%] space-y-1 bg-cards flex flex-col items-center justify-center relative h-[80px] rounded-[8px] cursor-pointer select-none">
                <h2 className="text-[10px]">
                  <PiLockKeyFill size={10} className="text-[#C7C7C7]" />
                </h2>

                <img src="/coin.webp" alt="fsd" className="w-[16px]" />
              </button>
            </div>
          </div>
        </div>

        <div className="w-full absolute top-[50px] flex justify-center z-50 pointer-events-none select-none">
          {congrats ? <img src="/congrats.gif" alt="congrats" className="w-[80%]" /> : <></>}
        </div>

        <div
          className={`${
            showSuccessModal ? 'visible' : 'invisible'
          } fixed top-[-12px] claimdiv bottom-0 left-0 z-40 right-0 h-[100vh] bg-[#00000042] flex flex-col justify-center items-center px-4`}
        >
          <div
            className={`${
              showSuccessModal ? 'opacity-100 mt-0' : 'opacity-0 mt-[100px]'
            } w-full bg-modal rounded-[16px] relative flex flex-col ease-in duration-300 transition-all justify-center p-8`}
          >
            <div className="w-full flex justify-center flex-col items-center space-y-3">
              <div className="w-full items-center justify-center flex flex-col space-y-2">
                <IoCheckmarkCircleSharp size={32} className="text-accent" />
                <p className="font-medium">Check-in bonus claimed</p>
              </div>
              <h3 className="font-medium text-[24px] text-[#ffffff] pb-2">
                {streak === true ? (
                  <>
                    <span className="text-accent">+{formatNumberCliam(bonusPoints[14])}</span> Marble
                  </>
                ) : (
                  <>
                    <span className="text-accent">+{formatNumberCliam(bonusPoints[checkInDays.length - 1])}</span>{' '}
                    Marble
                  </>
                )}
              </h3>
              <p className="pb-6 text-primary text-[15px] w-full text-center">
                Daily check-in bonus claimed! <br /> <br />
                Come back tomorrow to claim another check-in bonus!
              </p>

              <div className="w-full flex justify-center">
                <button
                  onClick={() => setShowSuccessModal(false)}
                  className="bg-btn4 w-full py-[16px] px-6 flex items-center justify-center text-center rounded-[12px] font-medium text-[18px]"
                >
                  Continue
                </button>
              </div>
            </div>
          </div>
        </div>

        <div
          className={`${showClaimModal ? 'flex' : 'hidden'} fixed bottom-0 left-0 z-40 right-0 h-[100vh] bg-[#303030c4] flex-col justify-end items-center`}
        >
          <div
            className={`w-full bg-divider shadowtop rounded-tl-[40px] rounded-tr-[40px] relative flex flex-col ease-in duration-300 transition-all justify-center`}
          >
            <div className="w-full flex taskbg rounded-tl-[40px] rounded-tr-[40px] mt-[2px] justify-center relative flex-col items-center space-y-3 p-4 pt-20 pb-28">
              <button
                onClick={() => setShowClaimModal(false)}
                className="flex items-center justify-center h-[32px] w-[32px] rounded-full bg-[#383838] absolute right-6 top-4 text-center font-medium text-[16px]"
              >
                <IoClose size={20} className="text-[#9995a4]" />
              </button>

              <div className="w-full bg-cards rounded-[16px] py-6 relative px-4 flex flex-col justify-center items-center">
                <FaCalendarAlt size={34} className="text-accent" />
                <h3 className="font-medium text-[20px] pt-2 !mt-[2px]">Claim Your CheckIn Bonus</h3>
                <p className="text-[#bfbfbf] font-medium px-4 pt-1 text-[14px] w-full text-center">
                  Keep your streak alive by claiming your bonus for today!
                </p>
              </div>

              <div className="w-full flex justify-between items-center gap-2 px-4">
                <div className="w-[40%] h-[2px] bg-gray-500"></div>
                <span className="text-nowrap">Day {checkInDays.length + 1}</span>
                <div className="w-[40%] h-[2px] bg-gray-500"></div>
              </div>
              <div className="w-full flex justify-center items-center flex-col space-y-2 pb-7">
                <button
                  onClick={handleDailyCheckIn}
                  className="bg-btn4 w-full py-[18px] px-6 text-nowrap flex items-center justify-center text-center rounded-[12px] font-semibold text-[17px]"
                >
                  Claim Bonus!
                </button>
              </div>
            </div>
          </div>
        </div>

        {/*  */}
        <div
          className={`${showStartOverModal ? 'flex' : 'hidden'} fixed bottom-0 left-0 z-40 right-0 h-[100vh] bg-[#303030c4] flex-col justify-end items-center`}
        >
          <div
            className={`w-full bg-divider shadowtop rounded-tl-[40px] rounded-tr-[40px] relative flex flex-col ease-in duration-300 transition-all justify-center`}
          >
            <div className="w-full flex taskbg rounded-tl-[40px] rounded-tr-[40px] mt-[2px] justify-center relative flex-col items-center space-y-3 p-4 pt-20 pb-28">
              <button
                onClick={handleStartOver}
                className="flex items-center justify-center h-[32px] w-[32px] rounded-full bg-[#383838] absolute right-6 top-4 text-center font-medium text-[16px]"
              >
                <IoClose size={20} className="text-[#9995a4]" />
              </button>

              <div className="w-full bg-cards rounded-[16px] py-6 relative px-4 flex flex-col justify-center items-center">
                <FaCalendarAlt size={34} className="text-accent" />
                <h3 className="font-medium text-[20px] pt-2 !mt-[2px]">Ops! You missed a day</h3>
                <p className="text-[#bfbfbf] font-medium px-4 pt-1 text-[14px] w-full text-center">
                  Your progress have been reset and you will start over again! Keep up your streak to earn bigger
                  rewards daily!
                </p>
              </div>

              <div className="w-full flex justify-center items-center flex-col space-y-2 pb-7 pt-4">
                <button
                  onClick={handleStartOver}
                  className="bg-btn4 w-full py-[18px] px-6 text-nowrap flex items-center justify-center text-center rounded-[12px] font-semibold text-[17px]"
                >
                  Start Over!
                </button>
              </div>
            </div>
          </div>
        </div>

        <div
          className={`${error ? 'fixed' : 'hidden'} z-[60] ease-in duration-300 w-full fixed left-0 right-0 px-4 bottom-24`}
        >
          <div className="w-full text-red-500 flex items-center space-x-2 px-4 bg-[#1a202fef] h-[50px] rounded-[8px]">
            <IoWarningOutline size={16} />
            <span className="text-[15px]">{error}</span>
          </div>
        </div>

        <Levels showLevel={showLevel} setShowLevel={setShowLevel} />
        <SettingsMenu showSetting={showSetting} setShowSetting={setShowSetting} />
      </Animate>
    </>
  );
};

export default DailyCheckIn;
