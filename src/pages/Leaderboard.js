import React, { useEffect, useState, useRef } from 'react';
import { useUser } from '../context/userContext';

const Leaderboard = () => {
  const { leaderBoard, activeUserRank, fullName, balance } = useUser();
  const scrollRef = useRef(null);

  useEffect(() => {
    const handleTouchMove = (e) => {
      e.stopPropagation(); // Allow scroll within this element on touch devices
    };

    const scrollElement = scrollRef.current;

    if (scrollElement) {
      scrollElement.addEventListener('touchmove', handleTouchMove, { passive: true });
    }

    return () => {
      if (scrollElement) {
        scrollElement.removeEventListener('touchmove', handleTouchMove);
      }
    };
  }, []);

  const getInitials = (username) => {
    const nameParts = username.split(' ');
    return nameParts[0].charAt(0).toUpperCase() + nameParts[0].charAt(1).toUpperCase();
  };

  const getRandomColor = () => {
    const colors = ['bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-purple-500'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const rankImages = [
    '/1st.webp', // 1st place image
    '/2nd.webp', // 2nd place image
    '/3rd.webp', // 3rd place image
    '/4th.webp', // 4th place image
    '/5th.webp', // 5th place image
    '/6th.webp',
    '/7th.webp',
    '/8th.webp',
    '/9th.webp',
    '/10th.webp',
  ];

  const formatNumber = (num) => {
    if (num < 100000) {
      return new Intl.NumberFormat().format(num).replace(/,/g, ' ');
    } else if (num < 1000000) {
      return new Intl.NumberFormat().format(num).replace(/,/g, ' ');
    } else {
      return (num / 1000000).toFixed(3).replace('.', '.') + ' M';
    }
  };

  const shortenName = (name) => {
    if (name.length > 16) {
      return name.substring(0, 16) + '...';
    }
    return name;
  };

  return (
    <div className="h-screen w-full flex flex-col px-4 py-4">
      <h1 className="text-center text-[24px] mb-4">Leaderboard</h1>

      <div className="w-full flex-1 overflow-y-auto" ref={scrollRef}>
      <div
  className="bg-gradient-to-r from-blue-500 via-blue-700 to-black py-3 px-4 flex flex-col font-medium rounded-lg shadow-lg"
>
  <h2 className="text-[14px] text-white font-semibold">Your Rank</h2>
        <div className="w-full py-3 flex items-center justify-between">
          <div className="w-fit">
            <div className={`flex items-center justify-center h-[38px] w-[38px] rounded-full p-1 ${getRandomColor()}`}>
              <span className="font-semibold text-[14px] text-white">{getInitials(fullName)}</span>
            </div>
          </div>
          <div className="flex-1 flex flex-col justify-center ml-3">
            <h1 className="text-[14px] font-medium text-white">{shortenName(fullName)}</h1>
            <span className="flex items-center text-[12px] gap-1 text-white">
              <img src="/coins.webp" alt="coins" className="w-[10px]" />
              <span>{formatNumber(balance)}</span>
            </span>
          </div>
          <div className="w-fit text-[14px] font-semibold text-white">
            <button>#{activeUserRank}</button>
          </div>
        </div>
      </div>


        <div className="w-full space-y-4">
        {leaderBoard
  .sort((a, b) => (b.balance || 0) - (a.balance || 0))
  .map((user, index) => (
    <div key={user.id} className="bg-[#1c1c1c] p-4 rounded-lg flex items-center justify-between shadow-md">
      <div className="w-fit">
        <div className={`flex items-center justify-center h-[42px] w-[42px] rounded-full ${getRandomColor()}`}>
          {user.photo_url ? (
            <img src={user.photo_url} alt={user.username} className="w-full h-full object-cover rounded-full" />
          ) : (
            <span className="font-semibold text-[14px]">{getInitials(user.fullName)}</span>
          )}
        </div>
      </div>
      <div className="flex-1 flex flex-col justify-center ml-3">
        <h1 className="text-[14px] font-medium">{shortenName(user.fullName)}</h1>
      
        <span className='text-[12px] text-nowrap font-medium'>
                      {formatNumber(user.balance)}
                    </span>
      </div>
      <div className="w-fit text-[14px] font-semibold">
        {index < 10 ? (
          <img src={rankImages[index]} alt={`Rank ${index + 1}`} className="w-[24px] h-auto" />
        ) : (
          <span>#{index + 1}</span>
        )}
      </div>
    </div>
  ))}

        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
