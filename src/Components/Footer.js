import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useUser } from '../context/userContext';

const Footer = () => {
  const location = useLocation();
  const { selectedExchange } = useUser();

  const footerLinks = [
    {
      title: 'Home',
      titleId: 'Activities',
      link: '/',
      icon: (
        <img
          id={selectedExchange.id}
          src="/home.png"
          alt="selected"
          className="w-6 h-6"
        />
      ),
    },
    {
      title: 'Games',
      titleId: 'Activities',
      link: '/miniGames',
      icon: (
        <img
          src="/game.png"
          alt="game"
          className="w-6 h-6"
        />
      ),
    },
    {
      title: 'Friends',
      titleId: 'Activities',
      link: '/mine',
      icon: (
        <img
          src="/friends.png"
          alt="friends"
          className="w-6 h-6"
        />
      ),
    },
    {
      title: 'Airdrop',
      titleId: 'Airdrop',
      link: '/wallet',
      icon: (
        <img
          src="/wallet.png"
          alt="wallet"
          className="w-6 h-6"
        />
      ),
    },
  ];

  return (
    <div
      style={{
        borderRadius: '20px',
        background: '#46A5E4',
        border: '0px',
      }}
      className="z-30 fixed bottom-4 left-4 right-4 mx-auto max-w-md flex items-center justify-between px-4 h-16 backdrop-blur-lg shadow-lg"
    >
      {footerLinks.map((footer, index) => (
        <NavLink
          style={{
            background:
              location.pathname === `${footer.link}`
                ? 'rgba(255, 255, 255, 0.3)'
                : 'transparent',
            borderRadius: '12px',
            padding: '8px 12px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '25%',
          }}
          id={`reels${footer.titleId}`}
          key={index}
          to={footer.link}
          className={`flex flex-col items-center justify-center w-1/4 h-full transition-transform duration-200 transform ${
            location.pathname === `${footer.link}`
              ? 'text-white scale-110'
              : 'text-white-400 hover:scale-105'
          }`}
        >
          <div
            id={`reels2${footer.titleId}`}
            className={`flex flex-col items-center justify-center ${
              location.pathname === `${footer.link}`
                ? 'text-white'
                : 'text-white-400'
            }`}
          >
            <span className="text-xl">{footer.icon}</span>
            <span
              className={`text-xs font-semibold mt-1 ${
                location.pathname === `${footer.link}`
                  ? 'text-white'
                  : 'text-white-400'
              }`}
            >
              {footer.title}
            </span>
          </div>
        </NavLink>
      ))}
    </div>
  );
};

export default Footer;
