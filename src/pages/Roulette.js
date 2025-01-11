import React, { useEffect, useRef, useState } from 'react';
import { RiArrowRightSLine, RiSettings4Fill } from 'react-icons/ri';
import { useUser } from '../context/userContext';
import Animate from '../Components/Animate';
import SlotMachine from '../Components/Slot';
import { PiInfoFill } from 'react-icons/pi';
import { IoIosWarning } from 'react-icons/io';
import { IoClose } from 'react-icons/io5';
import Levels from '../Components/Levels';
import SettingsMenu from '../Components/SettingsMenu';
import Exchanges from '../Components/Exchanges';
import BalanceInfo from '../Components/BalanceInfo';

const Roulette = () => {
  const {
    userLevelss,
    userLevels,
    tapBalance,
    fullName,
    balance,
    refBonus,
    openInfoThree,
    setOpenInfoThree,
    selectedExchange,
    selectedCharacter,
  } = useUser();
  const [showLevel, setShowLevel] = useState(false);
  const [showSetting, setShowSetting] = useState(false);
  const [showExchange, setShowExchange] = useState(false);
  const infoRefThree = useRef(null);
  const [info, setInfo] = useState(false);

  const handleClickOutside = (event) => {
    if (infoRefThree.current && !infoRefThree.current.contains(event.target)) {
      setOpenInfoThree(false);
    }
  };
  const formatNumberCliam = (num) => {
    if (num < 100000) {
      return new Intl.NumberFormat().format(num).replace(/,/g, ' ');
    } else if (num < 1000000) {
      return new Intl.NumberFormat().format(num).replace(/,/g, ' ');
    } else {
      return (num / 1000000).toFixed(3).replace('.', '.') + ' M';
    }
  };
  useEffect(() => {
    if (openInfoThree) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
    // eslint-disable-next-line
  }, [openInfoThree]);

  const initialLevelIndex = userLevelss.findIndex((level) => tapBalance < level.tapBalanceRequired);
  const currentLevelIndex = initialLevelIndex === -1 ? userLevelss.length - 1 : initialLevelIndex;

  const displayedLevelIndex = currentLevelIndex;
  const currentLevel = userLevelss[displayedLevelIndex];

  const formatNumber = (num) => {
    if (num < 100000) {
      return new Intl.NumberFormat().format(num).replace(/,/g, ' ');
    } else if (num < 1000000) {
      return new Intl.NumberFormat().format(num).replace(/,/g, ' ');
    } else {
      return (num / 1000000).toFixed(3).replace('.', '.') + ' M';
    }
  };

  return (
    <Animate>
      <div className="w-full flex justify-center flex-col space-y-3" style={{ marginTop: '-12px' }}>
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

        <div className="w-full relative h-screen bg-divider shadowtop rounded-tl-[40px] rounded-tr-[40px]">
          <div id="refer" className="w-full h-screen homescreen rounded-tl-[40px] rounded-tr-[40px] mt-[2px] px-5">
            <div className="w-full flex flex-col scroller h-[80vh] overflow-y-auto pb-[150px]">
              {/*  */}

              <div className="w-full flex justify-center items-center pt-6">
                <h1 className="font-semibold text-[20px]">Lucky Spin & Win</h1>
              </div>

              <SlotMachine />
            </div>
          </div>
        </div>

        <Levels showLevel={showLevel} setShowLevel={setShowLevel} />
        <Exchanges showExchange={showExchange} setShowExchange={setShowExchange} />

        <SettingsMenu showSetting={showSetting} setShowSetting={setShowSetting} />
        <BalanceInfo info={info} setInfo={setInfo} />
      </div>

      <div
        className={`${
          openInfoThree === true ? 'invisible' : 'invisible'
        } fixed bottom-0 left-0 z-40 right-0 h-[100vh] bg-[#00000042] flex justify-center items-end backdrop-blur-[10px]`}
      ></div>
    </Animate>
  );
};

export default Roulette;
