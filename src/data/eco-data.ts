export interface EcoData {
  month: string;
  userCO2Saved: number;
  avgCO2Saved: number;
  topCO2Saved: number;
  userTreesSaved: number;
  avgTreesSaved: number;
  topTreesSaved: number;
}

export interface Warrior {
  id: string;
  name: string;
  avatar: string;
  avatarImg?: string; // New field for cartoon avatar images
  co2Saved: number;
  treesPlanted: number;
  rank?: number;
}

export interface ChampionCard {
  title: string;
  warrior: Warrior;
  period: string;
  badge: string;
  reward?: {
    title: string;
    description: string;
    code?: string;
    validUntil?: string;
  };
}

export const avatarOptions = [
  { id: "leaf", name: "Eco Leaf", icon: "🦅" },
  { id: "bolt", name: "Charging Bolt", icon: "⚡" },
  { id: "sun", name: "Sun", icon: "☀️" },
  { id: "tree", name: "Sun & Tree", icon: "/lovable-uploads/ghaf-tree.png" },
  { id: "camel", name: "Camel", icon: "🐪" },
];

export const monthlyData: EcoData[] = [
  {
    month: "March",
    userCO2Saved: 28,
    avgCO2Saved: 22,
    topCO2Saved: 45,
    userTreesSaved: 1.2,
    avgTreesSaved: 0.9,
    topTreesSaved: 2.2,
  },
  {
    month: "April",
    userCO2Saved: 32,
    avgCO2Saved: 24,
    topCO2Saved: 48,
    userTreesSaved: 1.4,
    avgTreesSaved: 1.0,
    topTreesSaved: 2.4,
  },
  {
    month: "May",
    userCO2Saved: 35,
    avgCO2Saved: 26,
    topCO2Saved: 52,
    userTreesSaved: 1.6,
    avgTreesSaved: 1.1,
    topTreesSaved: 2.6,
  },
  {
    month: "June",
    userCO2Saved: 42,
    avgCO2Saved: 30,
    topCO2Saved: 58,
    userTreesSaved: 2.0,
    avgTreesSaved: 1.3,
    topTreesSaved: 2.9,
  },
  {
    month: "July",
    userCO2Saved: 48,
    avgCO2Saved: 32,
    topCO2Saved: 62,
    userTreesSaved: 2.3,
    avgTreesSaved: 1.5,
    topTreesSaved: 3.1,
  },
  {
    month: "August",
    userCO2Saved: 52,
    avgCO2Saved: 35,
    topCO2Saved: 68,
    userTreesSaved: 2.5,
    avgTreesSaved: 1.7,
    topTreesSaved: 3.4,
  },
];

export const leaderboardData: Warrior[] = [
  {
    id: "1",
    name: "@EcoRider24",
    avatar: "🦅 ",
    avatarImg: "/avatar-1.png",
    co2Saved: 68,
    treesPlanted: 3.4,
  },
  {
    id: "2",
    name: "GreenSpeed_UAE",
    avatar: "⚡",
    avatarImg: "/avatar-2.png",
    co2Saved: 62,
    treesPlanted: 3.1,
  },
  {
    id: "3",
    name: "Sarah_TreeHugger",
    avatar: "/lovable-uploads/ghaf-tree.png",
    avatarImg: "/avatar-3.png",
    co2Saved: 58,
    treesPlanted: 2.9,
  },
  {
    id: "4",
    name: "@AhmedDrive",
    avatar: "☀️",
    avatarImg: "/avatar-4.png",
    co2Saved: 54,
    treesPlanted: 2.7,
  },
  {
    id: "5",
    name: "earth.saver.22",
    avatar: "🐪",
    avatarImg: "/avatar-5.png",
    co2Saved: 52,
    treesPlanted: 2.6,
  },
  {
    id: "6",
    name: "@EcoPilot_UAE",
    avatar: "🦅 ",
    avatarImg: "/avatar-6.png",
    co2Saved: 48,
    treesPlanted: 2.4,
  },
  {
    id: "7",
    name: "green.wheel",
    avatar: "⚡",
    avatarImg: "/avatar-7.png",
    co2Saved: 45,
    treesPlanted: 2.2,
  },
  {
    id: "8",
    name: "CleanCommute2023",
    avatar: "/lovable-uploads/ghaf-tree.png",
    avatarImg: "/avatar-8.png",
    co2Saved: 42,
    treesPlanted: 2.1,
  },
  {
    id: "9",
    name: "Fatima_SustainDriver",
    avatar: "☀️",
    avatarImg: "/avatar-9.png",
    co2Saved: 38,
    treesPlanted: 1.9,
  },
  {
    id: "10",
    name: "@planet_guardian",
    avatar: "🐪",
    avatarImg: "/avatar-10.png",
    co2Saved: 35,
    treesPlanted: 1.7,
  },
];

export const championsData: ChampionCard[] = [
  {
    title: "Last Month's Green Warrior",
    warrior: {
      id: "1",
      name: "@EcoRider24",
      avatar: "🦅 ",
      avatarImg: "/avatar-1.png",
      co2Saved: 68,
      treesPlanted: 3.4,
    },
    period: "July 2023",
    badge: "🥇",
    reward: {
      title: "Green Warrior Reward",
      description: "25 AED Off on Car Wash",
      code: "ECO25WASH",
      validUntil: "December 31, 2025",
    },
  },
  {
    title: "Last Quarter Leader",
    warrior: {
      id: "2",
      name: "GreenSpeed_UAE",
      avatar: "⚡",
      avatarImg: "/avatar-2.png",
      co2Saved: 185,
      treesPlanted: 9.2,
    },
    period: "Apr-Jun 2023",
    badge: "🏆",
    reward: {
      title: "Quarterly Champion",
      description: "50 AED Fuel Credit",
      code: "FUEL50Q2",
      validUntil: "December 11, 2025",
    },
  },
  {
    title: "6-Month Eco Hero",
    warrior: {
      id: "3",
      name: "Sarah_TreeHugger",
      avatar: "/lovable-uploads/ghaf-tree.png",
      avatarImg: "/avatar-3.png",
      co2Saved: 342,
      treesPlanted: 17.1,
    },
    period: "Jan-Jun 2023",
    badge: "🌍",
    reward: {
      title: "Eco Hero Bonus",
      description: "Free Car Service",
      code: "ECOSVC2023",
      validUntil: "December 31, 2025",
    },
  },
  {
    title: "1-Year Sustainability Champion",
    warrior: {
      id: "4",
      name: "@AhmedDrive",
      avatar: "☀️",
      avatarImg: "/avatar-4.png",
      co2Saved: 712,
      treesPlanted: 35.6,
    },
    period: "2022",
    badge: "👑",
    reward: {
      title: "Sustainability Award",
      description: "100 AED Shopping Voucher",
      code: "ECOSHOPPING100",
      validUntil: "December 31, 2025",
    },
  },
];

export const couponData = {
  title: "Green Warrior Reward",
  description: "25 AED Off on Car Wash",
  code: "ECO25WASH",
  validUntil: "December 31, 2025",
};
