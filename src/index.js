import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import ErrorCom from './Components/ErrorCom';
import Boost from './pages/Boost';
import Wallet from './pages/Wallet';
import Leaderboard from './pages/Leaderboard';
import TasksList from './pages/Tasks';
import ReferralRewards from './pages/Rewards';
import Dashboard from './pages/Dashboard';
import NotAdmin236 from './pages/NotAdmin236';
import Settings from './pages/Settings';
import EditTasks from './pages/EditTasks';
import ExtrenalTasks from './pages/ExtrenalTasks';
import Search from './pages/Search';
import Statistics from './pages/Statistics';
import { AuthContextProvider } from './context/AuthContext';
import GoldHunters from './pages/GoldHunters';
import Roulette from './pages/Roulette';
import Mine from './pages/Mine';
import Qualify from './pages/Qualify';
import History from './pages/History';
import AdminYoutube from './pages/AdminYoutube';
import AirdropWallets from './pages/AirdropWallets';
import DailyCheckIn from './pages/Checkin';
import AdminRanks from './pages/AdminRanks';
import MiniGames from './pages/MiniGames';
import GoldMinerGame from './pages/GoldMiner';
import CryptoFarming from './pages/Farm';
import AnimalMerge from './pages/AnimalMerge';
import Aliens from './pages/Aliens';
import BlackBeard from './pages/BlackBeard';
import Snake from './pages/Snake';
import SnakeWarz from './pages/SnakeWarz';
import Sushi from './pages/Sushi';
import Whack from './pages/Whack';
import SweetMerge from './pages/SweetMerge';
import AquaSlot from './pages/AquaSlot';
import Fruits from './pages/Fruits';
import Barbarian from './pages/Barbarian';
import BouncingEggs from './pages/BouncingEggs';
import FatBoy from './pages/FatBoy';
import ZombieCows from './pages/ZombieCows';
 
const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <ErrorCom />,
    children: [
      {
        path: '/',
        element: <GoldHunters />,
      },
      {
        path: '/roulette',
        element: <Roulette />,
      },
      {
        path: '/mine',
        element: <Mine />,
      },
      {
        path: '/checkin',
        element: <DailyCheckIn />,
      },
      {
        path: '/qualify',
        element: <Qualify />,
      },
      {
        path: '/history',
        element: <History />,
      },
      {
        path: '/tasks',
        element: <TasksList />,
      },
      {
        path: '/boost',
        element: <Boost />,
      },
      {
        path: '/wallet',
        element: <Wallet />,
      },
      {
        path: '/miniGames',
        element: <MiniGames />,
      },
      {
        path: '/moonbix',
        element: <GoldMinerGame />,
      },
      {
        path: '/farm',
        element: <CryptoFarming />,
      },
      {
        path: '/animal',
        element: <AnimalMerge />,
      },
      {
        path: '/aliens',
        element: <Aliens />,
      },
      {
        path: '/blackbeard',
        element: <BlackBeard />,
      },
      {
        path: '/snake',
        element: <Snake />,
      },
      {
        path: '/SnakeWarz',
        element: <SnakeWarz />,
      },
      {
        path: '/sushi',
        element: <Sushi />,
      },
      {
        path: '/whack',
        element: <Whack />,
      },
      {
        path: '/SweetMerge',
        element: <SweetMerge />,
      },
      {
        path: '/AquaSlot',
        element: <AquaSlot />,
      },
      {
        path: '/Fruits',
        element: <Fruits />,
      },
      {
        path: '/Barbarian',
        element: <Barbarian />,
      },
      {
        path: '/FatBoy',
        element: <FatBoy />,
      },
      {
        path: '/FatBoy',
        element: <FatBoy />,
      },
      {
        path: '/BouncingEggs',
        element: <BouncingEggs />,
      },
      {
        path: '/ZombieCows',
        element: <ZombieCows />,
      },
      {
        path: '/leaderboard',
        element: <Leaderboard />,
      },
      {
        path: '/rewards',
        element: <ReferralRewards />,
      },
      {
        path: '/dashboardadmin36024x',
        element: <NotAdmin236 />,
      },
      {
        path: '/dashboardAdx/ranks',
        element: <AdminRanks />,
      },
    ],
  },
  {
    path: '/dashboardAdx',
    element: <Dashboard />,
    errorElement: <ErrorCom />,
    children: [
      {
        path: '/dashboardAdx/settings',
        element: <Settings />,
      },
      {
        path: '/dashboardAdx/managetasks',
        element: <EditTasks />,
      },
      {
        path: '/dashboardAdx/externaltasks',
        element: <ExtrenalTasks />,
      },
      {
        path: '/dashboardAdx/youtube',
        element: <AdminYoutube />,
      },
      {
        path: '/dashboardAdx/wallets',
        element: <AirdropWallets />,
      },
      {
        path: '/dashboardAdx/search',
        element: <Search />,
      },
      {
        path: '/dashboardAdx/stats',
        element: <Statistics />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthContextProvider>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </AuthContextProvider>
);
