import React, { createContext, useContext, useState, useEffect, useCallback,useRef } from 'react';
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  arrayUnion,
  getDocs,
  collection,
  orderBy,
  limit,
  query,
  where,
} from 'firebase/firestore';
import { db } from '../firebase/firestore'; // Adjust the path as needed
import { useLocation } from 'react-router-dom';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

const userLevelss = [
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

const prTeam = [
  {
    title: 'Gym',
    level: [
      { level: 1, cost: 500, profit: 50 },
      { level: 2, cost: 1500, profit: 142.5 },
      { level: 3, cost: 2500, profit: 225 },
      { level: 4, cost: 3500, profit: 298 },
      { level: 5, cost: 4500, profit: 360 },
      { level: 6, cost: 5500, profit: 413 },
      { level: 7, cost: 16500, profit: 465 },
      { level: 8, cost: 27500, profit: 1018 },
      { level: 9, cost: 58500, profit: 1570 },
      { level: 10, cost: 79500, profit: 2123 },
      { level: 11, cost: 80500, profit: 3675 },
      { level: 12, cost: 91500, profit: 5228 },
      { level: 13, cost: 102500, profit: 6780 },
      { level: 14, cost: 113500, profit: 8333 },
      { level: 15, cost: 124500, profit: 9885 },
    ],
    totalProfit: 0,
    icon: '/gym.png',
    description:
      'Start training at the gym.',
  },
  {
    title: 'Sparring',
    level: [
      { level: 1, profit: 90, cost: 950 },
      { level: 2, profit: 170, cost: 1750 },
      { level: 3, profit: 250, cost: 2550 },
      { level: 4, profit: 330, cost: 3350 },
      { level: 5, profit: 410, cost: 4150 },
      { level: 6, profit: 490, cost: 4950 },
      { level: 7, profit: 770, cost: 5750 },
      { level: 8, profit: 1050, cost: 6550 },
      { level: 9, profit: 1330, cost: 7350 },
      { level: 10, profit: 2610, cost: 18150 },
      { level: 11, profit: 3890, cost: 38950 },
      { level: 12, profit: 5170, cost: 69750 },
      { level: 13, profit: 6450, cost: 110550 },
      { level: 14, profit: 7730, cost: 211350 },
      { level: 15, profit: 9010, cost: 312150 },
    ],
    totalProfit: 0,
    icon: '/sparring.png',
    description:
      'Learn the skills by sparring with a friend.',
  },
  {
    title: 'Jiu Jitsu',
    level: [
      { level: 1, profit: 165, cost: 1700 },
      { level: 2, profit: 280, cost: 2350 },
      { level: 3, profit: 395, cost: 3000 },
      { level: 4, profit: 510, cost: 3650 },
      { level: 5, profit: 625, cost: 4300 },
      { level: 6, profit: 740, cost: 4950 },
      { level: 7, profit: 855, cost: 5600 },
      { level: 8, profit: 970, cost: 6250 },
      { level: 9, profit: 2085, cost: 16900 },
      { level: 10, profit: 3200, cost: 37550 },
      { level: 11, profit: 4315, cost: 78200 },
      { level: 12, profit: 5430, cost: 108850 },
      { level: 13, profit: 6545, cost: 279500 },
      { level: 14, profit: 7660, cost: 310150 },
      { level: 15, profit: 8775, cost: 510800 },
    ],
    totalProfit: 0,
    icon: '/jiujitsu.png',
    description:
      'Overwhelm your opponents with advanced Jiu-Jitsu techniques.',
  },
  {
    title: 'Taekwondo',
    level: [
      { level: 1, profit: 240, cost: 3500 },
      { level: 2, profit: 400, cost: 5000 },
      { level: 3, profit: 560, cost: 6500 },
      { level: 4, profit: 720, cost: 8000 },
      { level: 5, profit: 880, cost: 9500 },
      { level: 6, profit: 1040, cost: 11000 },
      { level: 7, profit: 2200, cost: 12500 },
      { level: 8, profit: 3360, cost: 54000 },
      { level: 9, profit: 4520, cost: 115500 },
      { level: 10, profit: 5680, cost: 317000 },
      { level: 11, profit: 6840, cost: 518500 },
      { level: 12, profit: 8000, cost: 720000 },
      { level: 13, profit: 9160, cost: 821500 },
      { level: 14, profit: 10320, cost: 1023000 },
      { level: 15, profit: 11480, cost: 1224500 },
    ],
    totalProfit: 0,
    icon: '/Taekwondo.png',
    description:
      'Win with fancy Taekwondo kicking techniques.',
  },
  {
    title: 'Кarate',
    level: [
      { level: 1, profit: 480, cost: 6700 },
      { level: 2, profit: 590, cost: 8300 },
      { level: 3, profit: 700, cost: 9900 },
      { level: 4, profit: 810, cost: 11500 },
      { level: 5, profit: 920, cost: 33100 },
      { level: 6, profit: 1030, cost: 84700 },
      { level: 7, profit: 1140, cost: 216300 },
      { level: 8, profit: 3250, cost: 517900 },
      { level: 9, profit: 5360, cost: 719500 },
      { level: 10, profit: 7470, cost: 1021100 },
      { level: 11, profit: 9580, cost: 1522700 },
      { level: 12, profit: 11690, cost: 1724300 },
      { level: 13, profit: 13800, cost: 2525900 },
      { level: 14, profit: 15910, cost: 2727500 },
      { level: 15, profit: 18020, cost: 3329100 },
    ],
    totalProfit: 0,
    icon: '/karate.png',
    description:
      'Learn new martial arts and become a fighter.',
  },
  {
    title: 'Muay Thai',
    level: [
      { level: 1, profit: 580, cost: 8500 },
      { level: 2, profit: 670, cost: 9700 },
      { level: 3, profit: 760, cost: 10900 },
      { level: 4, profit: 850, cost: 12100 },
      { level: 5, profit: 940, cost: 13300 },
      { level: 6, profit: 1030, cost: 104500 },
      { level: 7, profit: 3120, cost: 315700 },
      { level: 8, profit: 5210, cost: 516900 },
      { level: 9, profit: 7300, cost: 818100 },
      { level: 10, profit: 9390, cost: 1319300 },
      { level: 11, profit: 11480, cost: 2220500 },
      { level: 12, profit: 13570, cost: 3121700 },
      { level: 13, profit: 15660, cost: 3822900 },
      { level: 14, profit: 17750, cost: 4024100 },
      { level: 15, profit: 19840, cost: 4525300 },
    ],
    totalProfit: 0,
    icon: '/MuayThai.png',
    description:
      'Show off your skills with more flashy martial arts..',
  },
  {
    title: 'MMA',
    level: [
      { level: 1, profit: 700, cost: 10800 },
      { level: 2, profit: 830, cost: 12600 },
      { level: 3, profit: 960, cost: 24400 },
      { level: 4, profit: 1090, cost: 36200 },
      { level: 5, profit: 1220, cost: 88000 },
      { level: 6, profit: 4350, cost: 159800 },
      { level: 7, profit: 2480, cost: 321600 },
      { level: 8, profit: 5610, cost: 823400 },
      { level: 9, profit: 8740, cost: 1225200 },
      { level: 10, profit: 11870, cost: 2727000 },
      { level: 11, profit: 15000, cost: 3528800 },
      { level: 12, profit: 22130, cost: 5530600 },
      { level: 13, profit: 29260, cost: 6332400 },
      { level: 14, profit: 36390, cost: 6734200 },
      { level: 15, profit: 43520, cost: 7036000 },
    ],
    totalProfit: 0,
    icon: '/MMA.png',
    description:
      'Become the strongest in ground martial arts.',
  },

  {
    title: 'Kung Fu',
    level: [
      { level: 1, profit: 900, cost: 15700 },
      { level: 2, profit: 1300, cost: 23000 },
      { level: 3, profit: 1700, cost: 50300 },
      { level: 4, profit: 2100, cost: 87600 },
      { level: 5, profit: 6500, cost: 244900 },
      { level: 6, profit: 10900, cost: 352200 },
      { level: 7, profit: 15300, cost: 659500 },
      { level: 8, profit: 19700, cost: 1066800 },
      { level: 9, profit: 44100, cost: 1774100 },
      { level: 10, profit: 68500, cost: 2981400 },
      { level: 11, profit: 92900, cost: 3888700 },
      { level: 12, profit: 117300, cost: 5296000 },
      { level: 13, profit: 141700, cost: 6103300 },
      { level: 14, profit: 166100, cost: 7110600 },
      { level: 15, profit: 190500, cost: 8117900 },
    ],
    totalProfit: 0,
    icon: '/kungfu.png',
    description:
      'Overwhelm your enemies with powerful kung fu moves.',
  },
];


const marketTeam = [
  {
    title: 'VS. local gang',
    level: [
      { level: 1, profit: 950, cost: 18000 },
      { level: 2, profit: 1800, cost: 39500 },
      { level: 3, profit: 2650, cost: 61000 },
      { level: 4, profit: 3500, cost: 82500 },
      { level: 5, profit: 4350, cost: 104000 },
      { level: 6, profit: 5200, cost: 125500 },
      { level: 7, profit: 6050, cost: 147000 },
      { level: 8, profit: 6900, cost: 268500 },
      { level: 9, profit: 7750, cost: 590000 },
      { level: 10, profit: 22000, cost: 2111500 },
      { level: 11, profit: 36250, cost: 3233000 },
      { level: 12, profit: 50500, cost: 5254500 },
      { level: 13, profit: 64750, cost: 6276000 },
      { level: 14, profit: 79000, cost: 8297500 },
      { level: 15, profit: 93250, cost: 9319000 },
    ],
    totalProfit: 0,
    icon: '/localgang.png',
    description:
      'Challenge a local gangster to a fight.',
  },
  {
    title: 'VS. country boss',
    level: [
      { level: 1, profit: 2300, cost: 55000 },
      { level: 2, profit: 3400, cost: 83000 },
      { level: 3, profit: 4500, cost: 111000 },
      { level: 4, profit: 5600, cost: 139000 },
      { level: 5, profit: 6700, cost: 367000 },
      { level: 6, profit: 7800, cost: 595000 },
      { level: 7, profit: 8900, cost: 723000 },
      { level: 8, profit: 10000, cost: 851000 },
      { level: 9, profit: 11100, cost: 979000 },
      { level: 10, profit: 32200, cost: 3107000 },
      { level: 11, profit: 53300, cost: 5235000 },
      { level: 12, profit: 64400, cost: 5363000 },
      { level: 13, profit: 75500, cost: 5491000 },
      { level: 14, profit: 86600, cost: 6019000 },
      { level: 15, profit: 97700, cost: 6747000 },
    ],
    totalProfit: 0,
    icon: '/country_boss.png',
    description:
      'A fateful encounter with the mafia boss.',
  },
  {
    title: 'VS. hidden expert',
    level: [
      { level: 1, profit: 2900, cost: 76900 },
      { level: 2, profit: 4500, cost: 150000 },
      { level: 3, profit: 6100, cost: 223100 },
      { level: 4, profit: 7700, cost: 296200 },
      { level: 5, profit: 9300, cost: 569300 },
      { level: 6, profit: 10900, cost: 842400 },
      { level: 7, profit: 18500, cost: 1515500 },
      { level: 8, profit: 26100, cost: 3588600 },
      { level: 9, profit: 33700, cost: 3661700 },
      { level: 10, profit: 41300, cost: 3734800 },
      { level: 11, profit: 48900, cost: 4807900 },
      { level: 12, profit: 56500, cost: 5081000 },
      { level: 13, profit: 64100, cost: 5574100 },
      { level: 14, profit: 71700, cost: 6027200 },
      { level: 15, profit: 79300, cost: 6100300 },
    ],
    totalProfit: 0,
    icon: '/hiddenexpert.png',
    description:
      'Challenge the veiled martial arts expert.',
  },
  {
    title: 'VS. former champion',
    level: [
      { level: 1, profit: 2400, cost: 83000 },
      { level: 2, profit: 7000, cost: 240000 },
      { level: 3, profit: 11600, cost: 397000 },
      { level: 4, profit: 16200, cost: 554000 },
      { level: 5, profit: 20800, cost: 711000 },
      { level: 6, profit: 25400, cost: 1868000 },
      { level: 7, profit: 40000, cost: 3025000 },
      { level: 8, profit: 54600, cost: 3182000 },
      { level: 9, profit: 69200, cost: 4339000 },
      { level: 10, profit: 73800, cost: 5496000 },
      { level: 11, profit: 78400, cost: 5653000 },
      { level: 12, profit: 83000, cost: 6010000 },
      { level: 13, profit: 87600, cost: 6067000 },
      { level: 14, profit: 92200, cost: 7724000 },
      { level: 15, profit: 96800, cost: 8281000 },
    ],
    totalProfit: 0,
    icon: '/former.png',
    description:
      'Stand up to the powerful punches of the former champion.',
  },
  {
    title: 'VS. dark forces',
    level: [
      { level: 1, profit: 3250, cost: 125000 },
      { level: 2, profit: 8000, cost: 370000 },
      { level: 3, profit: 12750, cost: 615000 },
      { level: 4, profit: 17500, cost: 860000 },
      { level: 5, profit: 22250, cost: 1105000 },
      { level: 6, profit: 27000, cost: 3350000 },
      { level: 7, profit: 31750, cost: 3595000 },
      { level: 8, profit: 36500, cost: 4840000 },
      { level: 9, profit: 41250, cost: 5085000 },
      { level: 10, profit: 46000, cost: 5330000 },
      { level: 11, profit: 50750, cost: 6575000 },
      { level: 12, profit: 65500, cost: 7820000 },
      { level: 13, profit: 80250, cost: 8165000 },
      { level: 14, profit: 95000, cost: 8610000 },
      { level: 15, profit: 109750, cost: 9555000 },
    ],
    totalProfit: 0,
    icon: '/dark.png',
    description:
      'A fateful bloody battle with the strongest in Darkness.',
  },
  {
    title: 'VS. gang boss',
    level: [
      { level: 1, profit: 5500, cost: 230000 },
      { level: 2, profit: 11000, cost: 550000 },
      { level: 3, profit: 16500, cost: 870000 },
      { level: 4, profit: 22000, cost: 1190000 },
      { level: 5, profit: 27500, cost: 1510000 },
      { level: 6, profit: 33000, cost: 1830000 },
      { level: 7, profit: 38500, cost: 2150000 },
      { level: 8, profit: 44000, cost: 3470000 },
      { level: 9, profit: 49500, cost: 4790000 },
      { level: 10, profit: 55000, cost: 5110000 },
      { level: 11, profit: 60500, cost: 5430000 },
      { level: 12, profit: 66000, cost: 6750000 },
      { level: 13, profit: 71500, cost: 7070000 },
      { level: 14, profit: 77000, cost: 7390000 },
      { level: 15, profit: 82500, cost: 7710000 },
    ],
    totalProfit: 0,
    icon: '/gangboss.png',
    description:
      'Defeat the evil dark gangster boss.',
  },
  {
    title: 'VS. ultimate gladiator',
    level: [
      { level: 1, profit: 7300, cost: 360000 },
      { level: 2, profit: 12500, cost: 620000 },
      { level: 3, profit: 17700, cost: 880000 },
      { level: 4, profit: 22900, cost: 1140000 },
      { level: 5, profit: 28100, cost: 1400000 },
      { level: 6, profit: 33300, cost: 2660000 },
      { level: 7, profit: 38500, cost: 3920000 },
      { level: 8, profit: 43700, cost: 4180000 },
      { level: 9, profit: 48900, cost: 5440000 },
      { level: 10, profit: 54100, cost: 5700000 },
      { level: 11, profit: 59300, cost: 6960000 },
      { level: 12, profit: 64500, cost: 7220000 },
      { level: 13, profit: 69700, cost: 7480000 },
      { level: 14, profit: 74900, cost: 7740000 },
      { level: 15, profit: 80100, cost: 8000000 },
    ],
    totalProfit: 0,
    icon: '/ffchamp.png',
    description:
      'Endless showdown with war heroes.',
  },
  {
    title: 'VS. World Champion',
    level: [
      { level: 1, profit: 13000, cost: 579000 },
      { level: 2, profit: 18000, cost: 887000 },
      { level: 3, profit: 23000, cost: 1195000 },
      { level: 4, profit: 28000, cost: 1503000 },
      { level: 5, profit: 33000, cost: 1811000 },
      { level: 6, profit: 38000, cost: 2119000 },
      { level: 7, profit: 43000, cost: 2427000 },
      { level: 8, profit: 48000, cost: 2735000 },
      { level: 9, profit: 53000, cost: 3043000 },
      { level: 10, profit: 58000, cost: 3351000 },
      { level: 11, profit: 63000, cost: 4659000 },
      { level: 12, profit: 68000, cost: 5967000 },
      { level: 13, profit: 73000, cost: 6275000 },
      { level: 14, profit: 78000, cost: 6583000 },
      { level: 15, profit: 83000, cost: 7891000 },
    ],
    totalProfit: 0,
    icon: '/champ.png',
    description:
      'Win the revenge match against the world champion.',
  },
];







const specialCards = [
  {
    title: 'VS. Muay Thai Master',
    profit: 10,
    cost: '500000000',
    icon: '/hunter.webp',
    tagline: 'Withdrawal access',
    description:
      'This is a special card that gives you special access benefits to some of the wallet features on Marble',
    class: 'specials1',
  },
  {
    title: 'Early Access',
    profit: 5,
    cost: '100000000',
    icon: '/access.webp',
    tagline: 'Withdrawal access',
    description:
      'With this special card you will stand high airdrop qualification chances and be among early token holders.',
    class: 'specials2',
  },
  {
    title: 'Balance Booster',
    profit: 50,
    cost: '1000000000',
    icon: '/booster.webp',
    tagline: 'Get more tokens',
    description: 'Get special access to boost your total balance in the boosters section, never a dull moment!',
    class: 'specials3',
  },
  {
    title: 'Token Swap Access',
    profit: 5,
    cost: '200000000',
    icon: '/swap.webp',
    tagline: 'Swap tokens special',
    description: 'This special card gives you access to token swap and withdrawal features in your wallet section.',
    class: 'specials4',
  },
];

export const UserProvider = ({ children }) => {
  const [isGameOpened, setIsGameOpened] = useState(false);
  const [balance, setBalance] = useState(0);
  const [tapBalance, setTapBalance] = useState(0);
  const [level, setLevel] = useState({ id: 1, name: 'Rookie (Level 1)', imgUrl: '/level1.png' });
  const [tapValue, setTapValue] = useState({ level: 1, value: 1 });
  const [id, setId] = useState('');
  const [loading, setLoading] = useState(true);
  const [energy, setEnergy] = useState(0);
  const [battery, setBattery] = useState({ level: 1, energy: 500 });
  const [initialized, setInitialized] = useState(false);
  const [refBonus, setRefBonus] = useState(0);
  const [manualTasks, setManualTasks] = useState([]);
  const [showBalance, setShowBalance] = useState(true);
  const [userManualTasks, setUserManualTasks] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [claimedMilestones, setClaimedMilestones] = useState([]);
  const [claimedReferralRewards, setClaimedReferralRewards] = useState([]);
  const [referrals, setReferrals] = useState([]);
  const [selectedExchange, setSelectedExchange] = useState({
    id: 'selectex',
    icon: '/exchange.svg',
    name: 'Select exchange',
  });
  const telegramUser = window.Telegram.WebApp.initDataUnsafe?.user;
  const [tapGuru, setTapGuru] = useState(false);
  const [mainTap, setMainTap] = useState(true);
  const [freeGuru, setFreeGuru] = useState(3);
  const [time, setTime] = useState(22);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [lastTime, setLastTime] = useState(null);
  const [claimExchangePoint, setClaimExchangePoint] = useState(true);
  const [selectedCharacter, setSelectedCharacter] = useState({ name: '', avatar: '' });
  const [characterMenu, setCharacterMenu] = useState(false);
  const [fullName, setFullName] = useState('');
  const [username, setusername] = useState('');
  const [walletAddress, setWalletAddress] = useState('');
  const [isAddressSaved, setIsAddressSaved] = useState(false); // State to track if address is saved
  const [coolDownTime, setCoolDownTime] = useState(0);
  const [tappingGuru, setTappingGuru] = useState(0);
  const location = useLocation();
  const [openInfoTwo, setOpenInfoTwo] = useState(true);
  const [openInfoThree, setOpenInfoThree] = useState(true);
  const [lastCheckIn, setLastCheckIn] = useState(null);
  const [checkInDays, setCheckInDays] = useState([]);
  const [error, setError] = useState(null);
  const [showStartOverModal, setShowStartOverModal] = useState(false);
  const [showClaimModal, setShowClaimModal] = useState(false);
  const [userLevels, setUserLevels] = useState(prTeam.map(() => 0)); // Start at level 0
  const [userLevelsMarket, setUserLevelsMarket] = useState(marketTeam.map(() => 0)); // Start at level 0
  const [totalProfit, setTotalProfit] = useState([0, 0, 0, 0, 0, 0]);
  const [totalMarketProfit, setTotalMarketProfit] = useState([0, 0, 0, 0, 0, 0]);
  const [success, setSuccess] = useState(false);
  const [profitHour, setProfitHour] = useState(0);
  const [purchasedCards, setPurchasedCards] = useState([]);
  const [totalCardsProfits, setTotalCardsProfits] = useState(0);
  const [withdrawals, setWithdrawals] = useState([]);
  const [deposits, setDeposits] = useState([]);
  const [swaps, setSwaps] = useState([]);
  const [youtubeTasks, setYoutubeTasks] = useState([]);
  const [userYoutubeTasks, setUserYoutubeTasks] = useState([]);
  // KM
  const [leaderBoard, setLeaderBoard] = useState([]);
  const [activeUserRank, setActiveUserRank] = useState(null);

  // FARM KM:
  const [miningPower, setMiningPower] = useState(0);
  const [miningTotal, setMiningTotal] = useState(0);

  const assets = [
    { symbol: 'Marble', name: '$Marble', balance: balance, icon: '/pdogetap.webp', price: 0.0005 },
    { symbol: 'USDT', name: 'Tether US', balance: 0, icon: '/tether.webp', price: 1 },
    { symbol: 'TON', name: 'Toncoin', balance: 0, icon: '/ton.png', price: 6.68 },
    { symbol: 'NOT', name: 'Notcoin', balance: 0, icon: '/notcoin.jpg', price: 0.01075 },
    { symbol: 'BNB', name: 'BNB', balance: 0, icon: '/bnb2.webp', price: 562.36 },
    { symbol: 'SOL', name: 'Solana', balance: 0, icon: '/solana.png', price: 143.34 },
  ];

  const spinnerLimit = 10;

  const [walletAssets, setWalletAssets] = useState(assets);

  const [spinLimit, setSpinLimit] = useState(spinnerLimit); // New state for spin limit

  

  // Declare the ref at the top level of your component
const miningAccumulator = useRef(null); // Initialize it to null or the initial value

// Live mining power update (accumulate changes locally with a ref)
useEffect(() => {
  // Initialize the ref with the current mining total if it's null
  if (miningAccumulator.current === null) {
    miningAccumulator.current = miningTotal;
  }

  const interval = setInterval(() => {
    miningAccumulator.current += miningPower / 3600; // Adds mining power every second
    setMiningTotal(miningAccumulator.current); // Update state for re-rendering
  }, 1000);

  return () => clearInterval(interval);
}, [miningPower]);

// Offline mining and database update (batch updates)
useEffect(() => {
  const handleOfflineMining = async () => {
    if (!id) return;

    const userRef = doc(db, 'telegramUsers', id);
    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
      const userData = userDoc.data();
      const lastActive = userData.lastActive?.toDate();
      const now = new Date();

      const timeDifference = (now - lastActive) / 1000; // Time in seconds

      if (timeDifference > 0) {
        const offlineMiningTotal = (miningPower * timeDifference) / 3600;
        const updatedMiningTotal = miningTotal + offlineMiningTotal;

        setMiningTotal(updatedMiningTotal); // Update the local mining total
        localStorage.setItem('lastActive', now.toISOString()); // Store last active time locally
      }
    }
  };

  handleOfflineMining();

  // Batch update to Firestore every 5 minutes
  const updateInterval = setInterval(async () => {
    if (!id) return;
    const userRef = doc(db, 'telegramUsers', id);
    const miningTotalLocal = miningTotal;

    await updateDoc(userRef, {
      miningTotal: miningTotalLocal,
      lastActive: new Date(),
    });

    console.log('Firestore updated with miningTotal:', miningTotalLocal);
  }, 300000); // Every 5 minutes

  return () => clearInterval(updateInterval);
}, [id, miningPower]);


  const startTimer = useCallback(() => {
    setTime(22); // Set the timer to 22 seconds
    setTapGuru(true); // Activate tapGuru mode
    setMainTap(false); // Disable main tapping during tapGuru mode
    setIsTimerRunning(true); // Mark the timer as running
  
    // Set a timeout to stop tapGuru after 22 seconds
    const timeout = setTimeout(() => {
      setTapGuru(false); // Deactivate tapGuru mode
      setMainTap(true); // Re-enable normal tapping after tapGuru ends
      setIsTimerRunning(false); // Stop the timer
    }, 22000); // 22000ms = 22 seconds
  
    return () => clearTimeout(timeout); // Cleanup timeout if component unmounts
  }, []);
  

  const fetchData = async (userId) => {
    if (!userId) return;
    try {
      const userRef = doc(db, 'telegramUsers', userId);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        setBalance(userData.balance);
        setTapBalance(userData.tapBalance);
        setTapValue(userData.tapValue);
        setClaimedMilestones(userData.claimedMilestones || []);
        setClaimedReferralRewards(userData.claimedReferralRewards || []);
        setSelectedExchange(userData.selectedExchange);
        setSelectedCharacter(userData.character);
        setLastCheckIn(userData.lastCheckIn?.toDate() || null);
        setCheckInDays(userData.checkInDays || []);
        const data = userDoc.data().history || {};
        setWithdrawals(data.withdrawals || []);
        setDeposits(data.deposits || []);
        setSwaps(data.swaps || []);
        setFreeGuru(userData.freeGuru);
        setProfitHour(userData.profitHour || 0);
        setUserYoutubeTasks(userData.youtubeTasks || []);
        setWalletAddress(userData.address);
        setShowBalance(userData.showBalance);
        setIsAddressSaved(userData.isAddressSaved);
        setWalletAssets(userData.walletAssets || assets);
        setPurchasedCards(userData.specialCards || []);
        setEnergy(userData.energy);
        // Calculate total profits
        const total = purchasedCards.reduce((acc, card) => acc + card.profit, 0);
        setTotalCardsProfits(total);
        setFullName(userData.fullName);
        const span = userDoc.data().spinLimit ?? 10;
        setSpinLimit(span);
        setBattery(userData.battery);
        setLevel(userData.level);
        setId(userData.userId);
        setRefBonus(userData.refBonus || 0);
        setCompletedTasks(userData.tasksCompleted || []);
        setUserManualTasks(userData.manualTasks || []);
        setReferrals(userData.referrals || []);
        // FARm KM
        setMiningPower(userData.miningPower);
        setMiningTotal(userData.miningTotal);

        await updateActiveTime(userRef);
      }

      const tasksQuerySnapshot = await getDocs(collection(db, 'tasks'));
      const tasksData = tasksQuerySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setTasks(tasksData);

      const manualTasksQuerySnapshot = await getDocs(collection(db, 'manualTasks'));
      const manualTasksData = manualTasksQuerySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setManualTasks(manualTasksData);

      // Fetch youtubeTasks
      const youtubeTasksQuerySnapshot = await getDocs(collection(db, 'youtubeTasks'));
      const youtubeTasksData = youtubeTasksQuerySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setYoutubeTasks(youtubeTasksData);

      const leadersQuerySnapshot = await getDocs(collection(db, 'leaderBoard'), orderBy('balance', 'desc'));
      const leadersData = leadersQuerySnapshot.docs.map(doc => {
        console.log("Document data:", doc.data()); // Check balance here
        return { id: doc.id, ...doc.data() };
      });
      
      setLeaderBoard(leadersData);
 
 
      // PROBLEM - Step 1: Query Firestore to find the first 500 users with a balance greater than the current user
      const usersAboveQuery = query(
        collection(db, 'telegramUsers'),
        where('balance', '>', balance),
        orderBy('balance', 'desc'),
        limit(150)
      );

      const querySnapshot = await getDocs(usersAboveQuery);

      // Step 2: If the user is found in the first 500, set the rank as the number of users with a greater balance + 1
      let activeUserRank;
      if (querySnapshot.size > 0) {
        activeUserRank = querySnapshot.size + 1; // Your user is in the top 500
      } else {
        activeUserRank = '150+'; // Your user is not in the top 500
      }

      setActiveUserRank(activeUserRank); // Set the active user rank
      // KM end

      // Fetch settings data
      const settingsDocRef = doc(db, 'settings', '1q01CYx0LFmgLR4wiUxX'); // Replace with your actual document ID
      const settingsDocSnap = await getDoc(settingsDocRef);

      if (settingsDocSnap.exists()) {
        const settingsData = settingsDocSnap.data();
        setCoolDownTime(settingsData.coolDownTime);
        setTappingGuru(settingsData.tappingGuru);
      }
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
    setLoading(false);
  };

  const sendUserData = async () => {
    const queryParams = new URLSearchParams(window.location.search);
    let referrerId = queryParams.get('ref');
    if (referrerId) {
      referrerId = referrerId.replace(/\D/g, '');
    }

    if (telegramUser) {
      const { id: userId, username, first_name: firstName, last_name: lastName } = telegramUser;
      const finalUsername = username || `${firstName}_${userId}`;
      const usernamed = username;
      const fullNamed = `${firstName} ${lastName}`;

      try {
        const userRef = doc(db, 'telegramUsers', userId.toString());
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
          fetchData(userId.toString());
          await updateEnergy(userRef, userDoc.data().battery.energy);
          await updateReferrals(userRef);
          setInitialized(true);
          return;
        }

        const userData = {
          userId: userId.toString(),
          username: finalUsername,
          firstName: firstName,
          lastName: lastName,
          fullName: fullNamed,
          usernamed: username,
          totalBalance: 0,
          showBalance: true,
          profitHour: 0,
          spinLimit: 10,
          isAddressSaved: false,
          address: '',
          balance: 0,
          tapBalance: 0,
          lastActive: new Date(),
          character: { name: '', avatar: '/user.webp' },
          freeGuru: 5,
          tapValue: { level: 1, value: 1 },
          level: { id: 1, name: 'Rookie (Level 1)', imgUrl: '/level1.png' },
          selectedExchange: { id: 'selectex', icon: '/exchange.svg', name: 'Choose exchange' },
          energy: 1000,
          battery: { level: 1, energy: 1000 },
          refereeId: referrerId || null,
          referrals: [],
          // FARM KM
          miningPower: 2500,
          miningTotal: 0,
        };

        await setDoc(userRef, userData);
        setEnergy(500);
        setFreeGuru(userData.freeGuru);
        setSelectedCharacter(userData.character);
        setFullName(fullNamed);
        setusername(usernamed)
        // FARM KM
        setMiningPower(miningPower);
        setMiningTotal(userData.miningTotal);
        // FARKM KM END
        setCharacterMenu(true);
        setSelectedExchange({ id: 'selectex', name: 'Choose exchange', icon: '/exchange.svg' });
        setId(userId.toString());

        if (referrerId) {
          const referrerRef = doc(db, 'telegramUsers', referrerId);
          const referrerDoc = await getDoc(referrerRef);
          if (referrerDoc.exists()) {
            await updateDoc(referrerRef, {
              referrals: arrayUnion({
                userId: userId.toString(),
                username: username,
                balance: 0,
                level: { id: 1, name: 'Rookie (Level 1)', imgUrl: '/level1.png' },
              }),
            });
          }
        }
        setInitialized(true);
        fetchData(userId.toString());
      } catch (error) {
        console.error('Error saving user in Firestore:', error);
      }
    }
  };

  const updateEnergy = async (userRef, batteryValue) => {
    const savedEndTime = localStorage.getItem('endTime');
    const savedEnergy = localStorage.getItem('energy');
    const endTime = new Date(savedEndTime);
    const newTimeLeft = endTime - new Date();
    if (newTimeLeft < 0 && savedEnergy <= 0) {
      try {
        await updateDoc(userRef, { energy: batteryValue });
        setEnergy(batteryValue);
      } catch (error) {
        console.error('Error updating energy:', error);
      }
    }
  };

  const updateActiveTime = async (userRef) => {
    try {
      await updateDoc(userRef, {
        lastActive: new Date(),
      });
      console.log('Active Time Updated');
    } catch (error) {
      console.error('Error updating Active Time:', error);
    }
  };

 

  const updateReferrals = async (userRef) => {
    try {
      // Get referrer data
      const userDoc = await getDoc(userRef);
      const userData = userDoc.data();
      const referrals = userData.referrals || [];
  
      const updatedReferrals = await Promise.all(
        referrals.map(async (referral) => {
          const referralRef = doc(db, 'telegramUsers', referral.userId);
          const referralDoc = await getDoc(referralRef);
  
          if (referralDoc.exists()) {
            const referralData = referralDoc.data();
  
            // If referral hasn't received the 50,000 bonus yet, give it to both referrer and referred member
            if (!referral.hasReceivedBonus) {
              // Give the referred member a 50,000 bonus
              const updatedBalance = referralData.balance + 50000;
              await updateDoc(referralRef, { balance: updatedBalance });
  
              // Mark that the bonus has been given to prevent duplication
              referral.hasReceivedBonus = true;
  
              // Also give the referrer a 50,000 bonus
              userData.balance += 50000;
            }
  
            // Use balance to calculate the 20% referral bonus
            return {
              ...referral,
              balance: referralData.balance, // Updated balance including any new earnings
              level: referralData.level,
            };
          }
  
          return referral;
        })
      );
  
      // Update the referrals with the new data
      await updateDoc(userRef, { referrals: updatedReferrals });
  
      // Calculate the total earnings from all referrals (using their current balance)
      const totalEarningsForBonus = updatedReferrals.reduce((acc, curr) => acc + curr.balance, 0);
  
      // Calculate 20% of the total balance from referrals for the referrer's bonus
      const refBonus = Math.floor(totalEarningsForBonus * 0.2);
  
      // Update referrer's total balance including the refBonus
      const totalBalance = userData.balance + refBonus;
  
      // Update the referrer's document with the new bonus and total balance
      await updateDoc(userRef, { refBonus, balance: totalBalance, lastActive: new Date() });
  
    } catch (error) {
      console.error('Error updating referrals and bonuses:', error);
    }
  };
  
  const updateUserLevel = async (userId, newTapBalance) => {
    let newLevel = { id: 1, name: 'Rookie (Level 1)', imgUrl: '/level1.png' };

    if (newTapBalance >= 5000 && newTapBalance < 100000) {
      newLevel = { id: 2, name: 'Warrior (Level 2)', imgUrl: '/level2.png' };
    } else if (newTapBalance >= 100000 && newTapBalance < 1000000) {
      newLevel = { id: 3, name: 'Legend (Level 3)', imgUrl: '/level3.png' };
    } else if (newTapBalance >= 1000000 && newTapBalance < 5000000) {
      newLevel = { id: 4, name: 'Gladiator (Level 4)', imgUrl: '/level4.png' };
    } else if (newTapBalance >= 5000000 && newTapBalance < 25000000) {
      newLevel = { id: 5, name: 'Master (Level 5)', imgUrl: '/level5.png' };
    } else if (newTapBalance >= 25000000 && newTapBalance >= 100000000) {
      newLevel = { id: 6, name: 'Titan (Level 6)', imgUrl: '/level6.png' };
    } else if (newTapBalance >= 100000000 && newTapBalance >= 300000000) {
      newLevel = { id: 6, name: 'King (Level 7)', imgUrl: '/level7.png' };
    } else if (newTapBalance >= 300000000 && newTapBalance >= 1000000000) {
      newLevel = { id: 6, name: 'Devil (Level 8)', imgUrl: '/level8.png' };
    } else if (newTapBalance >= 1000000000 && newTapBalance >= 5000000000) {
      newLevel = { id: 6, name: 'Darkness (Level 9)', imgUrl: '/level9.png' };
    } else if (newTapBalance >= 10000000000) {
      newLevel = { id: 6, name: 'God (Level 10)', imgUrl: '/level10.png' };
    }

    if (newLevel.id !== level.id) {
      setLevel(newLevel);
      const userRef = doc(db, 'telegramUsers', userId);
      await updateDoc(userRef, { level: newLevel });
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const userRef = doc(db, 'telegramUsers', id.toString());
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();

        // Handle prTeam
        if (userData.prTeam) {
          const updatedLevels = prTeam.map((team) => {
            const teamData = userData.prTeam.find((t) => t.title === team.title);
            return teamData ? teamData.level : 0;
          });

          const updatedProfits = prTeam.map((team) => {
            const teamData = userData.prTeam.find((t) => t.title === team.title);
            return teamData ? teamData.totalProfit : 0;
          });

          setUserLevels(updatedLevels);
          setTotalProfit(updatedProfits);
        }

        // Handle marketTeam
        if (userData.marketTeam) {
          const updatedLevelsMarket = marketTeam.map((market) => {
            const marketData = userData.marketTeam.find((t) => t.title === market.title);
            return marketData ? marketData.level : 0;
          });

          const updatedMarketProfits = marketTeam.map((market) => {
            const marketData = userData.marketTeam.find((t) => t.title === market.title);
            return marketData ? marketData.totalMarketProfit : 0;
          });

          setUserLevelsMarket(updatedLevelsMarket);
          setTotalMarketProfit(updatedMarketProfits);
        }
      } else {
        console.error('User document does not exist');
      }
    };

    fetchUserData();
  }, [id]);

  const checkAndUpdateFreeGuru = async () => {
    const userRef = doc(db, 'telegramUsers', id.toString());
    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
      const userData = userDoc.data();
      const lastDate = userData.timeSta.toDate(); // Convert Firestore timestamp to JS Date
      const formattedDates = lastDate.toISOString().split('T')[0]; // Get the date part in YYYY-MM-DD format
      const currentDate = new Date(); // Get the current date
      const formattedCurrentDates = currentDate.toISOString().split('T')[0]; // Get the date part in YYYY-MM-DD format

      if (formattedDates !== formattedCurrentDates && userData.freeGuru <= 0) {
        await updateDoc(userRef, {
          freeGuru: 3,
          timeSta: new Date(),
        });
        setFreeGuru(3);
      }
    }
  };

  useEffect(() => {
    const rewards = document.getElementById('reelsActivities');
    const rewardsTwo = document.getElementById('reels2Activities');

    if (location.pathname === '/rewards' || location.pathname === '/checkin') {
      rewards.style.background = '#935EDB';
      rewards.style.color = '#fff';
      rewardsTwo.style.color = '#fff';
      rewards.style.height = '60px';
      rewards.style.marginTop = '4px';
      rewards.style.paddingLeft = '6px';
      rewards.style.paddingRight = '6px';
    } else {
      rewards.style.background = '';
      rewards.style.color = '';
      rewards.style.height = '';
      rewards.style.marginTop = '';
      rewardsTwo.style.color = '';
      rewards.style.paddingLeft = '';
      rewards.style.paddingRight = '';
    }
  }, [location.pathname]);

  useEffect(() => {
    // Fetch the remaining clicks from Firestore when the component mounts
    const fetchRemainingClicks = async () => {
      if (id) {
        const userRef = doc(db, 'telegramUsers', id.toString());
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setFreeGuru(userData.freeGuru || 0);
        }
      }
    };

    fetchRemainingClicks();
  }, [id]);

  useEffect(() => {
    // Calculate the new balance by adding balance and refBonus
    const newBalance = balance + refBonus;

    // Find the current 'Marble' token in walletAssets
    const maxToken = walletAssets.find((asset) => asset.symbol === 'Marble');

    // Check if maxToken exists and if its balance is different from the newBalance
    if (maxToken && maxToken.balance !== newBalance) {
      // Update the balance for the 'LYYC' token
      setWalletAssets((prevAssets) =>
        prevAssets.map((asset) => (asset.symbol === 'Marble' ? { ...asset, balance: newBalance } : asset))
      );
    }
  }, [balance, refBonus, walletAssets]);

  useEffect(() => {
    const checkLastCheckIn = async () => {
      if (!id) return;

      try {
        const userDocRef = doc(db, 'telegramUsers', id);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          const userData = userDoc.data();
          const now = new Date();

          const lastCheckInDate = userData.lastCheckIn?.toDate();

          if (lastCheckInDate) {
            const lastCheckInMidnight = new Date(lastCheckInDate);
            lastCheckInMidnight.setHours(0, 0, 0, 0);

            const todayMidnight = new Date(now);
            todayMidnight.setHours(0, 0, 0, 0);

            const daysSinceLastCheckIn = Math.floor((todayMidnight - lastCheckInMidnight) / (1000 * 60 * 60 * 24));

            if (daysSinceLastCheckIn === 1) {
              // Last check-in was yesterday, prompt user to claim today's bonus
              setShowClaimModal(true);
            } else if (daysSinceLastCheckIn > 1) {
              // User missed a day, show the start over modal
              setShowStartOverModal(true);
            }
          } else {
            // First time check-in, set the check-in modal to be shown
            setShowClaimModal(true);
          }
        }
      } catch (err) {
        console.error('Error during initial check-in:', err);
        setError('An error occurred while checking your last check-in.');
      }
    };

    checkLastCheckIn();
  }, [id, setCheckInDays, setError]);

 

  useEffect(() => {
    sendUserData();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (id) {
      fetchData(id);
    }
    // eslint-disable-next-line
  }, [id]);

  useEffect(() => {
    if (id) {
      updateUserLevel(id, tapBalance);
    }
    // eslint-disable-next-line
  }, [tapBalance, id]);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  return (
    <UserContext.Provider
      value={{
        balance,
        specialCards,
        fullName,
        username,
        youtubeTasks,
        setYoutubeTasks,
        userYoutubeTasks,
        setUserYoutubeTasks,
        purchasedCards,
        withdrawals,
        setWithdrawals,
        deposits,
        setDeposits,
        swaps,
        setSwaps,
        walletAssets,
        setWalletAssets,
        setPurchasedCards,
        totalCardsProfits,
        setTotalCardsProfits,
        userLevelss,
        success,
        setSuccess,
        userLevels,
        setUserLevels,
        totalMarketProfit,
        setTotalMarketProfit,
        userLevelsMarket,
        setUserLevelsMarket,
        prTeam,
        marketTeam,
        totalProfit,
        setTotalProfit,
        profitHour,
        setProfitHour,
        showStartOverModal,
        setShowStartOverModal,
        showClaimModal,
        setShowClaimModal,
        spinLimit,
        setSpinLimit,
        lastCheckIn,
        setLastCheckIn,
        checkInDays,
        setCheckInDays,
        error,
        setError,
        showBalance,
        setShowBalance,
        openInfoTwo,
        setOpenInfoTwo,
        openInfoThree,
        setOpenInfoThree,
        setusername,
        setFullName,
        coolDownTime,
        setCoolDownTime,
        tappingGuru,
        setTappingGuru,
        lastTime,
        walletAddress,
        setWalletAddress,
        isAddressSaved,
        setIsAddressSaved,
        selectedCharacter,
        setSelectedCharacter,
        characterMenu,
        setCharacterMenu,
        setLastTime,
        claimExchangePoint,
        setClaimExchangePoint,
        battery,
        freeGuru,
        setFreeGuru,
        isTimerRunning,
        setIsTimerRunning,
        time,
        setTime,
        startTimer,
        setBattery,
        tapGuru,
        setTapGuru,
        mainTap,
        setMainTap,
        selectedExchange,
        setSelectedExchange,
        tapValue,
        setTapValue,
        tapBalance,
        setTapBalance,
        level,
        energy,
        setEnergy,
        setBalance,
        setLevel,
        loading,
        setLoading,
        id,
        setId,
        sendUserData,
        leaderBoard,
        setLeaderBoard,
        activeUserRank,
        setActiveUserRank,
        initialized,
        setInitialized,
        refBonus,
        setRefBonus,
        manualTasks,
        setManualTasks,
        userManualTasks,
        setUserManualTasks,
        tasks,
        setTasks,
        completedTasks,
        setCompletedTasks,
        claimedMilestones,
        setClaimedMilestones,
        referrals,
        claimedReferralRewards,
        setClaimedReferralRewards,
        isGameOpened,
        setIsGameOpened,
        // FARM KM
        miningPower,
        setMiningPower,
        miningTotal,
        setMiningTotal,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
