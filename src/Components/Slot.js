import React, { useState, useEffect, useRef } from 'react';
import { PiSpinnerBallDuotone } from 'react-icons/pi';
import { useUser } from '../context/userContext';
import { IoCheckmarkCircleSharp, IoClose } from 'react-icons/io5';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/firestore';

const SlotMachine = () => {
  const tMax = 3000; // animation time, ms
  const height = 210;
  const reels = [
    ['/bnb2.webp', '/notcoin.jpg', '/bitcoin.png'],
    ['/bnb2.webp', '/notcoin.jpg', '/bitcoin.png'],
    ['/bnb2.webp', '/notcoin.jpg', '/bitcoin.png'],
  ];
  const [speeds, setSpeeds] = useState([]);
  const [r, setR] = useState([]);
  const [msg, setMsg] = useState('Press Spin to start');
  const [start, setStart] = useState(undefined);
  const [points, setPoints] = useState(0); // State for user's points
  const $reelsRef = useRef([]);
  const animationFrameId = useRef(null);
  const [openModal, setOpenModal] = useState(false);
  const { id, balance, setBalance, spinLimit, setSpinLimit, tapBalance, setTapBalance } = useUser();
  const modalRef = useRef(null);
  const [openClaim, setOpenClaim] = useState(false);
  const [congrats, setCongrats] = useState(false);
  // Probability of winning (30% chance to win)
  const winProbability = 0.3;

  const closeModalPay = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setOpenModal(false);
    }
  };

  useEffect(() => {
    if (!id) {
      if (openModal) {
        document.addEventListener('mousedown', closeModalPay);
      } else {
        document.removeEventListener('mousedown', closeModalPay);
      }

      return () => {
        document.removeEventListener('mousedown', closeModalPay);
      };
    }
    // eslint-disable-next-line
  }, [openModal, id]);

  useEffect(() => {
    if (start !== undefined) {
      const animate = (now) => {
        if (!start) setStart(now);
        const t = now - start || 0;

        for (let i = 0; i < 3; ++i) {
          $reelsRef.current[i].scrollTop = ((speeds[i] / tMax / 2) * (tMax - t) * (tMax - t) + r[i]) % height | 0;
        }

        if (t < tMax) {
          animationFrameId.current = requestAnimationFrame(animate);
        } else {
          setStart(undefined);
          check();
        }
      };

      animationFrameId.current = requestAnimationFrame(animate);

      return () => {
        if (animationFrameId.current) {
          cancelAnimationFrame(animationFrameId.current);
        }
      };
    }
    // eslint-disable-next-line
  }, [start, speeds, r]);

  const handleStart = async () => {
    if (start !== undefined || spinLimit <= 0) return;

    const newSpeeds = [];
    const newR = [];

    // Determine if this spin should result in a win
    const shouldWin = Math.random() < winProbability;

    if (shouldWin) {
      // Randomly select a winning reel value (1, 2, or 3)
      const winValue = Math.floor(Math.random() * 3);
      for (let i = 0; i < 3; ++i) {
        newSpeeds[i] = Math.random() + 0.5;
        newR[i] = winValue * (height / 3); // Set the same value for all reels
      }
    } else {
      // Normal random behavior (no guaranteed win)
      for (let i = 0; i < 3; ++i) {
        newSpeeds[i] = Math.random() + 0.5;
        newR[i] = ((Math.random() * 3) | 0) * (height / 3);
      }
    }
    const newSpinLimit = spinLimit - 1;
    if (id) {
      if (spinLimit > 0) {
        try {
          const userRef = doc(db, 'telegramUsers', id.toString());

          await updateDoc(userRef, {
            spinLimit: newSpinLimit,
            slotTimeStamp: new Date(),
          });
        } catch (error) {
          console.error('Error updating Spin Limit:', error);
        }
      }
    }

    setSpeeds(newSpeeds);
    setR(newR);
    setMsg('Spinning...');
    setStart(performance.now());
    setSpinLimit(newSpinLimit); // Decrement the spin limit
  };

  const formatNumber = (num) => {
    if (num < 100000) {
      return new Intl.NumberFormat().format(num).replace(/,/g, ' ');
    } else if (num < 1000000) {
      return new Intl.NumberFormat().format(num).replace(/,/g, ' ');
    } else {
      return (num / 1000000).toFixed(3).replace('.', '.') + ' M';
    }
  };

  const check = () => {
    const result = r.map((val) => (val / 70 + 1) % 3 | 0); // Calculate the result based on the scroll positions

    if (result[0] === result[1] && result[1] === result[2]) {
      let award;
      switch (result[0]) {
        case 0: // 111
          award = 1000 * 30;
          break;
        case 1: // 222
          award = 2000 * 30;
          break;
        case 2: // 333
          award = 2500 * 40;
          break;
        default:
          award = 0;
      }

      setPoints((prevPoints) => prevPoints + award); // Update the user's points
      setMsg(
        <>
          <span className="text-primary">
            Congratulations! You won{' '}
            <span className="font-semibold text-accent text-nowrap">{formatNumber(award)}</span> points, Click on Claim
            now!
          </span>
        </>
      );
    } else {
      setMsg('No luck, try again!');
    }
  };

  const handleClaim = async () => {
    const userRef = doc(db, 'telegramUsers', id.toString());
    try {
      await updateDoc(userRef, {
        balance: balance + points,
        tapBalance: tapBalance + points,
      });
      setBalance((prevBalance) => prevBalance + points);
      setTapBalance((prevTapBalance) => prevTapBalance + points);
      console.log('Points claimed successfully');
    } catch (error) {
      console.error('Error updating balance and energy:', error);
    }
    openClaimer();
  };

  const openClaimer = () => {
    setOpenClaim(true);
    setCongrats(true);

    setTimeout(() => {
      setCongrats(false);
    }, 4000);
  };

  const closeClaimer = () => {
    setOpenClaim(false);
    setPoints(0); // Reset points after claiming
  };

  const calculateTimeRemaining = () => {
    const now = new Date();
    const nextDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    const timeDiff = nextDate - now;

    const hours = Math.floor(timeDiff / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

    return { hours, minutes, seconds };
  };
  const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining());
    }, 1000);

    return () => clearInterval(interval); // Clear interval on component unmount
  }, []);

  return (
    <>
      <div className="w-full flex flex-col space-y-1">
        <div id="sm" className="w-full">
          <div className="w-full flex justify-between items-center p-4 ">
            {/* Points Display */}
            <div className="flex items-center space-x-2">
              <img
                src="/loader.webp"
                className="w-5 h-5 rounded-full border-2 border-yellow-400 shadow-inner"
                alt="EngageCoin"
              />
              <span className="text-white font-semibold text-lg flex items-center">
                <span>{formatNumber(points)}</span>
                <span className="ml-1 text-yellow-400 text-sm">Marble</span>
              </span>
            </div>

            {/* Spins or Timer Display */}
            <div className="flex items-center space-x-2 text-sm text-gray-300">
              <PiSpinnerBallDuotone
                size={16}
                className={`animate-spin ${spinLimit <= 0 ? 'text-red-500' : 'text-green-400'}`}
              />
              {spinLimit <= 0 ? (
                <span className="text-red-500">
                  {timeRemaining.hours}h : {timeRemaining.minutes}m : {timeRemaining.seconds}s
                </span>
              ) : (
                <span className="text-green-400">{spinLimit} spins left</span>
              )}
            </div>
          </div>

          <div className="group">
            {reels.map((reel, i) => (
              <div key={i} className="reel" ref={(el) => ($reelsRef.current[i] = el)}>
                <div>
                  {reel.map((item, j) => (
                    <span key={j} className="h-[60px]">
                      <p className={`child${j}`}>
                        <img src={item} alt="dfd" className="w-full h-full rounded-full" />
                      </p>
                    </span>
                  ))}
                </div>
                <div>
                  {reel.map((item, j) => (
                    <span key={j} className="h-[60px]">
                      <p className={`child${j}`}>
                        <img src={item} alt="dfd" className="w-full h-full rounded-full" />
                      </p>
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="w-full flex flex-col items-center">
            {/* Claim Button Container */}
            <div className="w-full">
              <button
                onClick={handleClaim}
                disabled={points <= 0}
                className={`w-full py-4 px-6 rounded-2xl font-bold text-lg transition-transform duration-300 ${
                  points <= 0
                    ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white hover:from-yellow-500 hover:to-orange-600 shadow-lg transform hover:scale-105'
                }`}
              >
                Claim
              </button>
            </div>

            {/* Message Display */}
            <p className="mt-4 w-full px-4 text-center text-sm text-gray-300">{msg}</p>
          </div>
        </div>

        <div className="w-full flex justify-center items-center relative">
          <div className="w-[100px] h-[100px] bg-gradient-to-tr from-purple-600 to-pink-500 flex items-center justify-center rounded-full shadow-2xl">
            {spinLimit <= 0 ? (
              <button
                onClick={() => setOpenModal(true)}
                className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white h-[90px] w-[90px] font-bold text-lg rounded-full flex items-center justify-center shadow-lg hover:shadow-2xl transform hover:scale-105 transition duration-300"
              >
                SPIN
              </button>
            ) : (
              <button
                disabled={start !== undefined || spinLimit <= 0}
                onClick={handleStart}
                className={`${
                  start !== undefined
                    ? 'bg-gray-700 animate-spin-slow'
                    : 'bg-gradient-to-r from-yellow-400 to-orange-500 text-black'
                } h-[90px] w-[90px] font-bold text-lg rounded-full flex items-center justify-center shadow-lg hover:shadow-2xl transform hover:scale-105 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {start !== undefined ? (
                  <svg
                    className="animate-spin h-6 w-6 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                  </svg>
                ) : (
                  'SPIN'
                )}
              </button>
            )}
          </div>
        </div>
      </div>

      <div
        className={`${openModal ? 'flex' : 'hidden'} fixed bottom-0 left-0 z-40 right-0 h-[100vh] bg-[#303030c4] flex-col justify-end items-center`}
      >
        <div
          ref={modalRef}
          className={`w-full bg-divider shadowtop rounded-tl-[40px] rounded-tr-[40px] relative flex flex-col ease-in duration-300 transition-all justify-center`}
        >
          <div className="w-full flex taskbg rounded-tl-[40px] rounded-tr-[40px] mt-[2px] justify-center relative flex-col items-center space-y-3 p-4 pt-20 pb-10">
            <button
              onClick={() => setOpenModal(false)}
              className="flex items-center justify-center h-[32px] w-[32px] rounded-full bg-[#383838] absolute right-6 top-4 text-center font-medium text-[16px]"
            >
              <IoClose size={20} className="text-[#9995a4]" />
            </button>

            <div className="w-full bg-cards rounded-[16px] py-6 relative px-4 flex flex-col justify-center items-center">
              <PiSpinnerBallDuotone size={34} className="text-accent animate-spin" />

              <p className="text-[#bfbfbf] font-medium px-8 text-[14px] w-full text-center">Your next Spin starts in</p>
              <span className="text-[34px] font-semibold">
                {timeRemaining.hours}h : {timeRemaining.minutes}m : {timeRemaining.seconds}s
              </span>
            </div>

            <div className="w-full flex justify-between items-center gap-2 px-4">
              <div className="w-[40%] h-[2px] bg-cards2"></div>
              <span className="text-nowrap">more luck 💪</span>
              <div className="w-[40%] h-[2px] bg-cards2"></div>
            </div>
            <div className="w-full flex justify-center items-center flex-col space-y-2 pb-7">
              <button
                onClick={() => setOpenModal(false)}
                className="bg-btn4 w-full py-[18px] px-6 text-nowrap flex items-center justify-center text-center rounded-[12px] font-semibold text-[17px]"
              >
                Go back
              </button>
            </div>
          </div>
        </div>
      </div>

      {/*  */}

      <div className="w-full absolute top-[50px] flex justify-center z-50 pointer-events-none select-none">
        {congrats ? <img src="/congrats.gif" alt="congrats" className="w-[80%]" /> : <></>}
      </div>

      <div
        className={`${
          openClaim === true ? 'visible' : 'invisible'
        } fixed top-[-12px] claimdiv bottom-0 left-0 z-40 right-0 h-[100vh] bg-[#00000042] flex flex-col justify-center items-center px-4`}
      >
        <div
          className={`${
            openClaim === true ? 'opacity-100 mt-0' : 'opacity-0 mt-[100px]'
          } w-full bg-modal rounded-[16px] relative flex flex-col ease-in duration-300 transition-all justify-center p-8`}
        >
          <div className="w-full flex justify-center flex-col items-center space-y-3">
            <div className="w-full items-center justify-center flex flex-col space-y-2">
              <IoCheckmarkCircleSharp size={32} className="text-accent" />
              <p className="font-medium">Let's go!!</p>
            </div>
            <h3 className="font-medium text-[24px] text-[#ffffff] pt-2 pb-2">
              <span className="text-accent">+{points}</span> Marble
            </h3>
            <p className="pb-6 text-[#bfbfbf] text-[15px] w-full text-center">
              Keep grinding! something huge is coming! Get more Marble now!
            </p>

            <div className="w-full flex justify-center">
              <button
                onClick={closeClaimer}
                className="bg-btn4 text-[#000] w-fit py-[10px] px-6 flex items-center justify-center text-center rounded-[12px] font-medium text-[16px]"
              >
                Spin more!
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SlotMachine;
