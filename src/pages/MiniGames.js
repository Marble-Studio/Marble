import React, { useEffect, useState, useRef } from 'react';
import { useUser } from '../context/userContext';
import { RiArrowRightSLine } from 'react-icons/ri';
import { RiSettings4Fill } from 'react-icons/ri';
import { NavLink } from 'react-router-dom';

// modals
import Levels from '../Components/Levels';
import SettingsMenu from '../Components/SettingsMenu';
import Exchanges from '../Components/Exchanges';
import BalanceInfo from '../Components/BalanceInfo';

const userLevels = [
  { id: 1, name: 'Rookie', icon: '/level1.png', tapBalanceRequired: 50000 },          // 50K tap balance
  { id: 2, name: 'Warrior', icon: '/level2.png', tapBalanceRequired: 500000 },         // 500K tap balance
  { id: 3, name: 'Legend', icon: '/level3.png', tapBalanceRequired: 1000000 },        // 1M tap balance
  { id: 4, name: 'Gladiator', icon: '/level4.png', tapBalanceRequired: 5000000 },        // 5M tap balance
  { id: 5, name: 'Master', icon: '/level5.png', tapBalanceRequired: 20000000 },       // 20M tap balance
  { id: 6, name: 'Titan', icon: '/level6.png', tapBalanceRequired: 50000000 },       // 50M tap balance
  { id: 7, name: 'King', icon: '/level7.png', tapBalanceRequired: 200000000 },      // 200M tap balance
  { id: 8, name: 'Devil', icon: '/level8.png', tapBalanceRequired: 500000000 },      // 500M tap balance
  { id: 9, name: 'Darkness', icon: '/level9.png', tapBalanceRequired: 1000000000 },     // 1B tap balance
  { id: 10, name: 'God', icon: '/level10.png', tapBalanceRequired: 10000000000 }  // 10B tap balance
];

const MiniGames = () => {
  const { fullName, tapBalance, refBonus, balance, selectedCharacter, selectedExchange } = useUser();

  const [showExchange, setShowExchange] = useState(false);
  const [info, setInfo] = useState(false);
  const [showLevel, setShowLevel] = useState(false);
  const initialLevelIndex = userLevels.findIndex((level) => tapBalance < level.tapBalanceRequired);
  const currentLevelIndex = initialLevelIndex === -1 ? userLevels.length - 1 : initialLevelIndex;
  const displayedLevelIndex = currentLevelIndex;
  const currentLevel = userLevels[displayedLevelIndex];
  const [showSetting, setShowSetting] = useState(false);

  const formatNumberCliam = (num) => {
    if (num < 100000) {
      return new Intl.NumberFormat().format(num).replace(/,/g, ' ');
    } else if (num < 1000000) {
      return new Intl.NumberFormat().format(num).replace(/,/g, ' ');
    } else {
      return (num / 1000000).toFixed(2).replace('.', '.') + ' M';
    }
  };
  const scrollRef = useRef(null);

  useEffect(() => {
    const handleTouchMove = (e) => {
      e.stopPropagation(); // Allow scroll within this element on touch devices
    };

    const scrollElement = scrollRef.current;

    if (scrollElement) {
      scrollElement.addEventListener('touchmove', handleTouchMove, { passive: true });
    }

    // Clean up the event listener on component unmount
    return () => {
      if (scrollElement) {
        scrollElement.removeEventListener('touchmove', handleTouchMove);
      }
    };
  }, []);

  return (
    <>
<div className="overflow-y-auto max-h-screen" ref={scrollRef} style={{ marginTop: '-12px', }}>
 

         <h1 className="text-center text-[24px] mt-[18px]">Mini Games</h1>
         <p className="text-center text-[14px] mt-[18px]">Play and earn tokens !</p>
        <div className="grid grid-cols-2 gap-4 p-4">
          
    
          <div className="bg-gray-800 bg-opacity-50 p-4 rounded-lg shadow-lg">
          <NavLink
          to="/whack"
           style={{
            width: '100%',
            display: 'block',
            textAlign: 'center',
          }}
        >
        <img
          src="/game2.png"
          alt="Auto Mining"
          className="w-full h-auto rounded-lg mb-4"
          style={{ objectFit: 'cover' }} // Ensures the image fills the container nicely
        />
        
        <h1 className="text-white text-[15px] font-bold">Whack 'em All</h1>
       {/*   <p  className="bg-gradient-to-r from-blue-400 to-yellow-600 text-white text-[16px] font-semibold rounded-lg mt-4 p-2 w-full transform hover:scale-105 transition duration-300">Play </p>*/}        </NavLink> 
          </div>

          <div className="bg-gray-800 bg-opacity-50 p-4 rounded-lg shadow-lg">
          <NavLink
          to="/sushi"
           style={{
            width: '100%',
            display: 'block',
            textAlign: 'center',
          }}
        >
        <img
          src="/game3.png"
          alt="Auto Mining"
          className="w-full h-auto rounded-lg mb-4"
          style={{ objectFit: 'cover' }} // Ensures the image fills the container nicely
        />
        
        <h1 className="text-white text-[15px] font-bold">Sushi M</h1>

       {/*   <p  className="bg-gradient-to-r from-blue-400 to-yellow-600 text-white text-[16px] font-semibold rounded-lg mt-4 p-2 w-full transform hover:scale-105 transition duration-300">Play </p>*/}        </NavLink> 
          </div>

          <div className="bg-gray-800 bg-opacity-50 p-4 rounded-lg shadow-lg">
          <NavLink
          to="/aliens"
          style={{
            width: '100%',
            display: 'block',
            textAlign: 'center',
          }}
        >
        <img
          src="/game4.png"
          alt="Zap Aliens"
          className="w-full h-auto rounded-lg mb-4"
          style={{ objectFit: 'cover' }} // Ensures the image fills the container nicely
        />
        
        <h1 className="text-white text-[15px] font-bold">Zap Aliens</h1>

       {/*   <p  className="bg-gradient-to-r from-blue-400 to-yellow-600 text-white text-[16px] font-semibold rounded-lg mt-4 p-2 w-full transform hover:scale-105 transition duration-300">Play </p>*/}        </NavLink> 
          </div>
          {/*
          <div className="bg-gray-800 bg-opacity-50 p-4 rounded-lg shadow-lg">
        <NavLink
          to="/blackbeard"
          
          style={{
            width: '100%',
            display: 'block',
            textAlign: 'center',
          }}
        >
        <img
          src="/game1.png"
          alt="Black Beard"
          className="w-full h-auto rounded-lg mb-4"
          style={{ objectFit: 'cover' }} // Ensures the image fills the container nicely
        />
        
        <h1 className="text-white text-[15px] font-bold">Black Beard</h1>
 
        <p  className="bg-gradient-to-r from-blue-400 to-yellow-600 text-white text-[16px] font-semibold rounded-lg mt-4 p-2 w-full transform hover:scale-105 transition duration-300">Play </p>
         </NavLink> 
          </div>
          */}
          <div className="bg-gray-800 bg-opacity-50 p-4 rounded-lg shadow-lg">
        <NavLink
          to="/SweetMerge"
          
          style={{
            width: '100%',
            display: 'block',
            textAlign: 'center',
          }}
        >
        <img
          src="/game7.jpg"
          alt="SweetMerge Beard"
          className="w-full h-auto rounded-lg mb-4"
          style={{ objectFit: 'cover' }} // Ensures the image fills the container nicely
        />
        
        <h1 className="text-white text-[15px] font-bold">SweetMerge</h1>
 
       {/*   <p  className="bg-gradient-to-r from-blue-400 to-yellow-600 text-white text-[16px] font-semibold rounded-lg mt-4 p-2 w-full transform hover:scale-105 transition duration-300">Play </p>*/}         </NavLink> 
          </div>
{/*  
          <div className="bg-gray-800 bg-opacity-50 p-4 rounded-lg shadow-lg">
        <NavLink
          to="/AquaSlot"
          
          style={{
            width: '100%',
            display: 'block',
            textAlign: 'center',
          }}
        >
        <img
          src="/game8.png"
          alt="AquaSlot"
          className="w-full h-auto rounded-lg mb-4"
          style={{ objectFit: 'cover' }} // Ensures the image fills the container nicely
        />
        
        <h1 className="text-white text-[15px] font-bold">AquaSlot</h1>
 
        <p  className="bg-gradient-to-r from-blue-400 to-yellow-600 text-white text-[16px] font-semibold rounded-lg mt-4 p-2 w-full transform hover:scale-105 transition duration-300">Play </p>
         </NavLink> 
          </div>
          */}

{/*  
          <div className="bg-gray-800 bg-opacity-50 p-4 rounded-lg shadow-lg">
          <NavLink
          to="/snake"
          style={{
            width: '100%',
            display: 'block',
            textAlign: 'center',
          }}
        >
        <img
          src="/game5.png"
          alt="Auto Mining"
          className="w-full h-auto rounded-lg mb-4"
          style={{ objectFit: 'cover' }} // Ensures the image fills the container nicely
        />
        
        <h1 className="text-white text-[15px] font-bold">Snake Attack</h1>
   
         
        <p  className="bg-gradient-to-r from-blue-400 to-yellow-600 text-white text-[16px] font-semibold rounded-lg mt-4 p-2 w-full transform hover:scale-105 transition duration-300">Play </p>
        </NavLink> 
          </div>
*/}
{/* 

          <div className="bg-gray-800 bg-opacity-50 p-4 rounded-lg shadow-lg">
          <NavLink
          to="/SnakeWarz"
          style={{
            width: '100%',
            display: 'block',
            textAlign: 'center',
          }}
        >
        <img
          src="/game6.png"
          alt="Auto Mining"
          className="w-full h-auto rounded-lg mb-4"
          style={{ objectFit: 'cover' }} // Ensures the image fills the container nicely
        />
        
        <h1 className="text-white text-[15px] font-bold">Snake Warz</h1>
   
         
        <p  className="bg-gradient-to-r from-blue-400 to-yellow-600 text-white text-[16px] font-semibold rounded-lg mt-4 p-2 w-full transform hover:scale-105 transition duration-300">Play </p>
        </NavLink> 
          </div>

          */}
           <div className="bg-gray-800 bg-opacity-50 p-4 rounded-lg shadow-lg">
          <NavLink
          to="/Fruits"
          style={{
            width: '100%',
            display: 'block',
            textAlign: 'center',
          }}
        >
        <img
          src="/game9.jpg"
          alt="Fruits Mining"
          className="w-full h-auto rounded-lg mb-4"
          style={{ objectFit: 'cover' }} // Ensures the image fills the container nicely
        />
        
        <h1 className="text-white text-[15px] font-bold">Fruits</h1>
   
         
       {/*   <p  className="bg-gradient-to-r from-blue-400 to-yellow-600 text-white text-[16px] font-semibold rounded-lg mt-4 p-2 w-full transform hover:scale-105 transition duration-300">Play </p>*/}        </NavLink> 
          </div>
           

          <div className="bg-gray-800 bg-opacity-50 p-4 rounded-lg shadow-lg">
          <NavLink
          to="/BouncingEggs"
          style={{
            width: '100%',
            display: 'block',
            textAlign: 'center',
          }}
        >
        <img
          src="/game11.jpg"
          alt="BouncingEggs "
          className="w-full h-auto rounded-lg mb-4"
          style={{ objectFit: 'cover' }} // Ensures the image fills the container nicely
        />
        
        <h1 className="text-white text-[15px] font-bold">Bouncing Eggs</h1>
   
         
       {/*   <p  className="bg-gradient-to-r from-blue-400 to-yellow-600 text-white text-[16px] font-semibold rounded-lg mt-4 p-2 w-full transform hover:scale-105 transition duration-300">Play </p>*/}        </NavLink> 
          </div>

          <div className="bg-gray-800 bg-opacity-50 p-4 rounded-lg shadow-lg">
          <NavLink
          to="/Barbarian"
          style={{
            width: '100%',
            display: 'block',
            textAlign: 'center',
          }}
        >
        <img
          src="/game10.jpg"
          alt="Barbarian Mining"
          className="w-full h-auto rounded-lg mb-4"
          style={{ objectFit: 'cover' }} // Ensures the image fills the container nicely
        />
        
        <h1 className="text-white text-[15px] font-bold">Barbarian</h1>
   
         
       {/*   <p  className="bg-gradient-to-r from-blue-400 to-yellow-600 text-white text-[16px] font-semibold rounded-lg mt-4 p-2 w-full transform hover:scale-105 transition duration-300">Play </p>*/}
        </NavLink> 
          </div>



          
          <div className="bg-gray-800 bg-opacity-50 p-4 rounded-lg shadow-lg">
          <NavLink
          to="/FatBoy"
          style={{
            width: '100%',
            display: 'block',
            textAlign: 'center',
          }}
        >
        <img
          src="/game12.jpg"
          alt="FatBoy Mining"
          className="w-full h-auto rounded-lg mb-4"
          style={{ objectFit: 'cover' }} // Ensures the image fills the container nicely
        />
        
        <h1 className="text-white text-[15px] font-bold">FatBoy</h1>
   
         
       {/*   <p  className="bg-gradient-to-r from-blue-400 to-yellow-600 text-white text-[16px] font-semibold rounded-lg mt-4 p-2 w-full transform hover:scale-105 transition duration-300">Play </p>*/}        </NavLink> 
          </div>



          <div className="bg-gray-800 bg-opacity-50 p-4 rounded-lg shadow-lg">
          <NavLink
          to="/ZombieCows"
          style={{
            width: '100%',
            display: 'block',
            textAlign: 'center',
          }}
        >
        <img
          src="/game13.jpg"
          alt="ZombieCows Mining"
          className="w-full h-auto rounded-lg mb-4"
          style={{ objectFit: 'cover' }} // Ensures the image fills the container nicely
        />
        
        <h1 className="text-white text-[15px] font-bold">ZombieCows</h1>
   
         
       {/*   <p  className="bg-gradient-to-r from-blue-400 to-yellow-600 text-white text-[16px] font-semibold rounded-lg mt-4 p-2 w-full transform hover:scale-105 transition duration-300">Play </p>*/}        </NavLink> 
          </div>
          <div className="bg-gray-800 bg-opacity-50 p-4 rounded-lg shadow-lg">
          <NavLink
          to="/SnakeWarz"
          style={{
            width: '100%',
            display: 'block',
            textAlign: 'center',
          }}
        >
        <img
          src="/game6.png"
          alt="Auto Mining"
          className="w-full h-auto rounded-lg mb-4"
          style={{ objectFit: 'cover' }} // Ensures the image fills the container nicely
        />
        
        <h1 className="text-white text-[15px] font-bold">Snake Warz</h1>
   
         
       {/*   <p  className="bg-gradient-to-r from-blue-400 to-yellow-600 text-white text-[16px] font-semibold rounded-lg mt-4 p-2 w-full transform hover:scale-105 transition duration-300">Play </p>*/}        </NavLink> 
          </div>
        </div>
      </div>

      {/* MODALS */}
      <Levels showLevel={showLevel} setShowLevel={setShowLevel} />
      <Exchanges showExchange={showExchange} setShowExchange={setShowExchange} />
      <SettingsMenu showSetting={showSetting} setShowSetting={setShowSetting} />
      <BalanceInfo info={info} setInfo={setInfo} />
    </>
  );
};

export default MiniGames;
