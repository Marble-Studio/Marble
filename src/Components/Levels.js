import React, { useEffect, useState } from 'react';
import { useUser } from '../context/userContext';
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from 'react-icons/md';

const userLevels = [
  { name: 'Rookie (Level 1)', icon: '/level1.png', tapBalanceRequired: 50000, reward: 15000 },       // 50K tap balance, 15K reward
  { name: 'Warrior (Level 2)', icon: '/level2.png', tapBalanceRequired: 500000, reward: 55000 },      // 500K tap balance, 55K reward
  { name: 'Legend (Level 3)', icon: '/level3.png', tapBalanceRequired: 1000000, reward: 100000 },    // 1M tap balance, 100K reward
  { name: 'Gladiator (Level 4)', icon: '/level4.png', tapBalanceRequired: 5000000, reward: 320000 },    // 5M tap balance, 320K reward
  { name: 'Master (Level 5)', icon: '/level5.png', tapBalanceRequired: 20000000, reward: 500000 },   // 20M tap balance, 500K reward
  { name: 'Titan (Level 6)', icon: '/level6.png', tapBalanceRequired: 50000000, reward: 750000 },   // 50M tap balance, 750K reward
  { name: 'King (Level 7)', icon: '/level7.png', tapBalanceRequired: 200000000, reward: 1000000 }, // 200M tap balance, 1M reward
  { name: 'Devil (Level 8)', icon: '/level8.png', tapBalanceRequired: 500000000, reward: 3500000 }, // 500M tap balance, 3.5M reward
  { name: 'Darkness (Level 9)', icon: '/level9.png', tapBalanceRequired: 1000000000, reward: 5000000 },// 1B tap balance, 5M reward
  { name: 'God (Level 10)', icon: '/level10.png', tapBalanceRequired: 10000000000, reward: 10000000 } // 10B tap balance, 10M reward
];


const Levels = ({showLevel, setShowLevel}) => {
  const { tapBalance } = useUser();
  const initialLevelIndex = userLevels.findIndex(level => tapBalance < level.tapBalanceRequired);
  const currentLevelIndex = initialLevelIndex === -1 ? userLevels.length - 1 : initialLevelIndex;

  const [displayedLevelIndex, setDisplayedLevelIndex] = useState(currentLevelIndex);

  const handlePrevious = () => {
    if (displayedLevelIndex > 0) {
      setDisplayedLevelIndex(displayedLevelIndex - 1);
    }
  };

  const handleNext = () => {
    if (displayedLevelIndex < userLevels.length - 1) {
      setDisplayedLevelIndex(displayedLevelIndex + 1);
    }
  };

  const currentLevel = userLevels[displayedLevelIndex];

  const formatNumberCliam = (num) => {
    if (num < 100000) {
      return new Intl.NumberFormat().format(num).replace(/,/g, " ");
    } else if (num < 1000000) {
      return (num / 1000).toFixed(0) + " K"; // For thousands
    } else if (num < 1000000000) {
      return (num / 1000000).toFixed(2) + " M"; // For millions
    } else {
      return (num / 1000000000).toFixed(2) + " B"; // For billions
    }
  };
  
  useEffect(() => {

    // Attach a click event listener to handle the back navigation
    const handleBackButtonClick = () => {
      setShowLevel(false);
    };

      
    if (showLevel) {
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
  }, [showLevel, setShowLevel]);

  return (
    <>
    {showLevel && (
      
    <div className="fixed left-0 right-0 z-20 top-[-12px] bottom-0 flex justify-center taskbg px-[16px] h-full">

    <div className="w-full pt-10 justify-center flex-col space-y-6">

      <div className="flex items-center space-x-4">

        <div className="flex flex-col items-center">
        <h1 className="text-[22px] font-semibold">{currentLevel.name}</h1>
        <p className='text-[15px] text-[#c6c6c6] leading-[24px] w-full text-center px-3 pt-2 pb-[42px]'>
                                Your number of shares determines the league you enter:
                            </p>
                            <div className='w-full relative flex items-center justify-center'>
                            <div className="absolute left-[5px]">
          {displayedLevelIndex > 0 && (
            <button className="text-[#b0b0b0] hover:text-[#c4c4c4]" onClick={handlePrevious}>
             <MdOutlineKeyboardArrowLeft size={40} className='' />
            </button>
          )}
        </div>

          <img src={currentLevel.icon} alt={currentLevel.name} />

          <div className="absolute right-[5px]">
          {displayedLevelIndex < userLevels.length - 1 && (
            <button className="text-[#b0b0b0] hover:text-[#c4c4c4]" onClick={handleNext}>
                <MdOutlineKeyboardArrowRight size={40} className='' />
            </button>
          )}
        </div>

                            </div>
     
          {displayedLevelIndex === currentLevelIndex && displayedLevelIndex < userLevels.length ? (
            <>
               <p className="text-[18px] font-semibold text-[#c6c6c6] px-[20px] pt-[35px] pb-[10px]">{tapBalance} / {formatNumberCliam(currentLevel.tapBalanceRequired)}</p>
            
            
               <div className='w-full px-[44px]'>
            <div className='flex w-full mt-2 p-[4px] items-center bg-energybar rounded-[10px] border-[1px] border-borders2'>
       

        <div className={`h-[8px] rounded-[8px] levelbar`} style={{ width: `${(tapBalance / currentLevel.tapBalanceRequired) * 100}%` }}/> 
        </div>

   </div>



            </>
          ) : (
            <>
        <p className="text-[16px] font-medium text-[#c6c6c6] px-[20px] pt-[35px] pb-[10px]">From {formatNumberCliam(currentLevel.tapBalanceRequired)}</p>

            </>
          )}
        </div>

      </div>
    </div>

    </div>

)}
    </>
  );
};

export default Levels;
