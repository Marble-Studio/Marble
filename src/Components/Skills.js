import React, { useEffect, useRef, useState } from 'react';
import { updateDoc, doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/firestore';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { IoCheckmarkCircleSharp, IoClose } from 'react-icons/io5';
import { PiLockFill } from 'react-icons/pi';
import { useUser } from '../context/userContext';

const Skills = () => {
  const {
    userLevels,
    prTeam,
    totalProfit,
    success,
    setTotalProfit,
    setSuccess,
    setUserLevels,
    balance,
    setBalance,
    refBonus,
    id,
    profitHour,
    setProfitHour,
  } = useUser();
  const [upgrading, setUpgrading] = useState(false);
  const [upgradeStatus, setUpgradeStatus] = useState('');
  const [openUpgrade, setOpenUpgrade] = useState(false);
  const [selectedUpgrade, setSelectedUpgrade] = useState({});
  const infoRefTwo = useRef(null);
  const [openClaim, setOpenClaim] = useState(false);

  const handleClickOutside = (event) => {
    if (infoRefTwo.current && !infoRefTwo.current.contains(event.target)) {
      setOpenUpgrade(false);
    }
  };

  useEffect(() => {
    if (openUpgrade) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [openUpgrade]);

  const handleUpgrade = (index) => {
    const currentLevel = userLevels[index];
    const nextLevelData = prTeam[index].level.find((l) => l.level === currentLevel + 1);

    if (!nextLevelData) return;

    setSelectedUpgrade({ index, nextLevelData, currentLevel });
    setOpenUpgrade(true);
  };

  const confirmUpgrade = async () => {
    const { index, nextLevelData, currentLevel } = selectedUpgrade;

   // Upgrading logic proceeds here without restrictions.
    setUpgradeStatus('');

    if (balance + refBonus < nextLevelData.cost) {
      setUpgrading(true);
      setUpgradeStatus(
        <div className="w-full bg-modal rounded-[20px] py-[6px] flex items-center text-[#ffe253] px-4">
          <span>Insufficient balance</span>
        </div>
      );
      setTimeout(() => {
        setUpgrading(false);
        setUpgradeStatus('');
      }, 3000);
      return;
    }

    setUpgrading(true);
    setUpgradeStatus(
      <div className="w-full bg-modal rounded-[20px] py-[6px] text-[14px] flex items-center text-secondary px-6 space-x-2">
        <AiOutlineLoading3Quarters size={14} className="animate-spin" />
        <span>Processing... please wait!</span>
      </div>
    );

    const userRef = doc(db, 'telegramUsers', id.toString());
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) {
      console.error('User document does not exist');
      return;
    }

    const userData = userDoc.data();
    const updatedPrTeam = userData.prTeam
      ? [...userData.prTeam]
      : prTeam.map(() => ({
          title: '',
          level: 0,
          profit: 0,
          cost: 0,
          totalProfit: 0, // Initialize totalProfit if it doesn't exist
        }));

    const newLevel = currentLevel + 1;
    const newProfit = nextLevelData.profit;
    const newTotalProfit = (updatedPrTeam[index].totalProfit || 0) + newProfit;

    updatedPrTeam[index] = {
      title: prTeam[index].title,
      level: newLevel,
      profit: newProfit,
      cost: nextLevelData.cost,
      totalProfit: newTotalProfit,
    };

    const updatedBalance = balance - nextLevelData.cost;
    const updatedProfitHour = profitHour + newProfit;

    const updatedUserData = {
      balance: updatedBalance,
      profitHour: updatedProfitHour,
      prTeam: updatedPrTeam,
    };

    await updateDoc(userRef, updatedUserData);

    setTimeout(() => {
      setUserLevels((prevLevels) => prevLevels.map((level, i) => (i === index ? newLevel : level)));
      setTotalProfit((prevTotalProfits) =>
        prevTotalProfits.map((profit, i) => (i === index ? newTotalProfit : profit))
      ); // Update total profits
      setProfitHour(updatedProfitHour);
      setBalance(updatedBalance);
      setUpgradeStatus('');
      setSuccess(true);
      setOpenClaim(true);
    }, 1000);

    setTimeout(() => {
      setUpgrading(false);
    }, 3000);
    setTimeout(() => {
      setSuccess(false);
    }, 3000);

    setOpenUpgrade(false);
  };

  const formatNumber = (num) => {
    if (num < 1000) {
      return num;
    } else if (num < 1000000) {
      return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
    } else {
      return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
    }
  };

  const formatNumberCi = (num) => {
    if (num < 100000) {
      return new Intl.NumberFormat().format(num).replace(/,/g, ' ');
    } else if (num < 1000000) {
      return new Intl.NumberFormat().format(num).replace(/,/g, ' ');
    } else {
      return (num / 1000000).toFixed(3).replace('.', '.') + ' M';
    }
  };

  return (
    <>
      {prTeam.map((team, index) => {
        const currentLevel = userLevels[index];
        const profitsTotal = totalProfit[index];
        const nextLevelData = team.level.find((l) => l.level === currentLevel + 1);
        // eslint-disable-next-line
        const currentLevelData = team.level.find((l) => l.level === currentLevel);
        // eslint-disable-next-line
        const maxLevelReached = currentLevel === team.level.length;

        return (
          <div
            key={team.title}
            className="bg-[#292929] w-[48%] text-[#ffffff] pt-4 pb-2 rounded-[15px] [&:nth-child(2)]:!mt-0 text-[13px] flex flex-col justify-between"
          >
            <button
              disabled={upgrading === true}
              onClick={() => handleUpgrade(index)}
              className="flex cursor-pointer w-full h-full items-center flex-col px-3 pb-2"
            >
              <div className="relative  flex items-center pb-2 justify-center">
                <img src={team.icon} alt={team.title}   />
 
              </div>
              <div className="flex flex-col items-center justify-center">
                <h3 className="font-medium">{team.title}</h3>

                <span className="flex items-center space-x-1">
                  <span className="text-nowrap text-[10px]">Profit per hour</span>
                  {currentLevel === 0 ? (
                    <img src="/coingrey.webp" alt="coingray" className="w-[10px]" />
                  ) : (
                    <img src="/coin.webp" alt="coingray" className="w-[10px]" />
                  )}
                  <span
                    className={`${currentLevel === 0 ? 'text-secondary' : 'text-primary'} font-semibold text-[12px]`}
                  >
                    {currentLevel === 0 ? <>+{nextLevelData.profit}</> : <>{profitsTotal}</>}
                  </span>
                </span>
              </div>
            </button>
            <div className="w-full h-[1px] bg-[#4141417b]" />
            <div className="flex items-center justify-center px-3 text-[14px] font-semibold py-[6px]">
              <span className="text-secondary text-nowrap">lvl {currentLevel}</span>
              <div className="w-[1px] h-[14px] mx-[10px] bg-[#4141417b]" />
              {nextLevelData ? (
                <span className="flex items-center space-x-2">
                  <img src="/coin.webp" alt="coin" className="w-[16px]" />
                  <span className="">{formatNumber(nextLevelData.cost)}</span>
                </span>

              ) : (
                <>
                  <span className="text-secondary">Max profit</span>
                </>
              )}
            </div>
          </div>
        );
      })}

      <div
        className={`${upgrading ? 'visible top-1' : 'invisible top-[-12px] ease-out'} ease-in z-[60] transition-all duration-300 w-full flex absolute left-0 right-0 px-8`}
      >
        {upgradeStatus}
      </div>

      <div
        className={`${success ? 'visible top-[-6%] right-6' : 'invisible top-[-12px] ease-out'} ease-in z-[60] transition-all duration-300 w-full flex justify-end absolute px-8`}
      >
        <img src="/profithour.gif" alt="fgdsfc" className="w-[150px]" />
      </div>

      {openUpgrade && (
        <>
          <div
            className={`${openUpgrade ? 'flex' : 'hidden'} fixed bottom-0 left-0 z-40 right-0 h-[100vh] bg-[#303030c4] flex-col justify-end items-center`}
          >
            <div
              ref={infoRefTwo}
              className={`w-full bg-divider shadowtop rounded-tl-[40px] rounded-tr-[40px] relative flex flex-col ease-in duration-300 transition-all justify-center`}
            >
              <div className="w-full flex taskbg rounded-tl-[40px] rounded-tr-[40px] mt-[2px] justify-center relative flex-col items-center space-y-3 p-4 pt-20 pb-10">
                <button
                  onClick={() => setOpenUpgrade(false)}
                  className="flex items-center justify-center h-[32px] w-[32px] rounded-full bg-[#383838] absolute right-6 top-4 text-center font-medium text-[16px]"
                >
                  <IoClose size={20} className="text-[#9995a4]" />
                </button>

                <div className="w-full flex justify-center flex-col items-center">
                  <div className="w-[180px] h-[180px] rounded-[25px] flex items-center justify-center">
                    <img alt="claim" src={prTeam[selectedUpgrade.index].icon} className="rounded-full" />
                  </div><br></br>
                  <h3 className="font-semibold text-[28px] text-center w-full ">
                    {prTeam[selectedUpgrade.index].title}
                  </h3>
                  <p className="pb-6 text-primary text-[14px] px-4 text-center">
                    {prTeam[selectedUpgrade.index].description}
                  </p>

                  <div className="flex flex-col">
                    <span className="text-[13px]">Profit per hour</span>
                    <div className="flex flex-1 items-center justify-center space-x-1">
                      <div className="">
                        <img src="/coin.webp" className="w-[12px]" alt="Coin Icon" />
                      </div>
                      <div className="font-bold text-[13px] flex items-center">
                        +{formatNumber(selectedUpgrade.nextLevelData.profit)}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-1 items-center space-x-2 pt-3">
                    <div className="">
                      <img src="/coin.webp" className="w-[30px]" alt="Coin Icon" />
                    </div>
                    <div className="font-bold text-[24px] flex items-center">
                      {formatNumberCi(selectedUpgrade.nextLevelData.cost)}
                    </div>
                  </div>
                </div>
                <div className="w-full flex justify-center pb-6 pt-4">
                  {balance + refBonus >= selectedUpgrade.nextLevelData.cost ? (
                    <button
                      onClick={confirmUpgrade}
                      disabled={upgrading === true}
                      className="bg-btn4 text-[#000] w-full py-5 px-3 flex items-center justify-center text-center rounded-[12px] font-semibold text-[18px]"
                    >
                      Go ahead
                    </button>
                  ) : (
                    <button
                      disabled={upgrading === true}
                      className="bg-[#42424264] text-[#979797] w-full py-5 px-3 flex items-center justify-center text-center rounded-[12px] font-semibold text-[18px]"
                    >
                      Insufficient balance
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/*  */}
        </>
      )}

      <div className="w-full absolute top-[50px] flex justify-center z-50 pointer-events-none select-none">
        {success ? <img src="/congrats.gif" alt="congrats" className="w-[80%]" /> : <></>}
      </div>

      <div
        className={`${
          openClaim === true ? 'visible' : 'invisible'
        } fixed top-[-12px] claimdiv bottom-0 left-0 z-40 right-0 h-[100vh] bg-[#00000042] flex flex-col justify-center items-center px-4`}
      >
        <div
          className={`${
            openClaim === true ? 'opacity-100 mt-0 ease-in duration-300' : 'opacity-0 mt-[100px]'
          } w-full bg-modal rounded-[16px] relative flex flex-col justify-center p-8`}
        >
          <div className="w-full flex justify-center flex-col items-center space-y-3">
            <div className="w-full items-center justify-center flex flex-col space-y-2">
              <IoCheckmarkCircleSharp size={32} className="text-accent" />
              <p className="font-medium">Let's go!!</p>
            </div>
            <h3 className="font-medium text-center w-full text-[18px] text-[#ffffff] pt-2 pb-2">
              <span className="text-accent">PPH UPGRADE SUCCESSFUL!</span>
            </h3>
            <p className="pb-6 text-[#bfbfbf] text-[15px] w-full text-center">
              Keep grinding! something huge is coming! Get more PPH now!
            </p>

            <div className="w-full flex justify-center">
              <button
                onClick={() => setOpenClaim(false)}
                className="bg-btn4 text-[#000] w-full py-[12px] px-6 flex items-center justify-center text-center rounded-[12px] font-medium text-[16px]"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Skills;
