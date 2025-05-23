export type Car = {
  id: string;
  make: string;
  model: string;
  year: number;
  color: string;
  image: string;
  plate: string;
  mileage: number;
  inspection: boolean;
  hasView360: boolean;
  reservePrice: number;
  currentBid: number;
  timeRemaining: string; // In minutes or formatted time
  specs?: {
    engine?: string;
    transmission?: string;
    fuelType?: string;
    exteriorColor?: string;
    interiorColor?: string;
    doors?: number;
    seats?: number;
  };
};

export type SellerCar = Car & {
  inspectionStatus: "Pending" | "Done" | "Not Started";
  photoStatus: "Pending" | "Complete" | "Not Started";
  auctionStatus: string;
  bestBid: number;
  daysListed: number;
};

export type MyCar = Car & {
  purchaseDate: string;
  purchasePrice: number;
  relistDaysRemaining: number;
};

// High quality car image URLs - verified
const carImages = {
  lexusGX:
    "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=1470&auto=format&fit=crop",
  nissan:
    "https://images.unsplash.com/photo-1642004614576-877e9266828a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  toyota:
    "https://images.unsplash.com/photo-1559416523-140ddc3d238c?q=80&w=1374&auto=format&fit=crop",
  tesla:
    "https://images.unsplash.com/photo-1561580125-028ee3bd62eb?q=80&w=1470&auto=format&fit=crop",
  mercedes:
    "https://images.unsplash.com/photo-1669234226129-8ede05b40eff?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  range:
    "https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=1528&auto=format&fit=crop",
  bmw: "https://images.unsplash.com/photo-1556189250-72ba954cfc2b?q=80&w=1470&auto=format&fit=crop",
  audi: "https://images.unsplash.com/photo-1603386329225-868f9b1ee6c9?q=80&w=1469&auto=format&fit=crop",
  porsche:
    "https://images.unsplash.com/photo-1736310306417-ed162df73b92?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
};

export const mockCars: Car[] = [
  {
    id: "1",
    make: "Lexus",
    model: "GX 460",
    year: 2015,
    color: "Pearl White",
    image: carImages.lexusGX,
    plate: "B 60828",
    mileage: 142000,
    inspection: true,
    hasView360: true,
    reservePrice: 80000,
    currentBid: 77500,
    timeRemaining: "25 mins",
    specs: {
      engine: "4.6L V8",
      transmission: "Automatic",
      fuelType: "Petrol",
      exteriorColor: "Pearl White",
      interiorColor: "Beige",
      doors: 5,
      seats: 7,
    },
  },
  {
    id: "2",
    make: "Nissan",
    model: "Patrol",
    year: 2020,
    color: "Silver",
    image: carImages.nissan,
    plate: "K 42155",
    mileage: 65000,
    inspection: true,
    hasView360: true,
    reservePrice: 120000,
    currentBid: 119000,
    timeRemaining: "45 mins",
    specs: {
      engine: "5.6L V8",
      transmission: "Automatic",
      fuelType: "Petrol",
      exteriorColor: "Silver",
      interiorColor: "Black",
      doors: 5,
      seats: 7,
    },
  },
  {
    id: "3",
    make: "Toyota",
    model: "Land Cruiser",
    year: 2018,
    color: "Black",
    image: carImages.toyota,
    plate: "S 90123",
    mileage: 98000,
    inspection: true,
    hasView360: true,
    reservePrice: 150000,
    currentBid: 145000,
    timeRemaining: "1 hour",
    specs: {
      engine: "5.7L V8",
      transmission: "Automatic",
      fuelType: "Petrol",
      exteriorColor: "Black",
      interiorColor: "Tan",
      doors: 5,
      seats: 8,
    },
  },
  {
    id: "4",
    make: "Tesla",
    model: "Model 3",
    year: 2022,
    color: "White",
    image: carImages.tesla,
    plate: "O 12345",
    mileage: 15000,
    inspection: true,
    hasView360: true,
    reservePrice: 110000,
    currentBid: 105000,
    timeRemaining: "2 hours",
    specs: {
      engine: "Electric",
      transmission: "Automatic",
      exteriorColor: "White",
      interiorColor: "Black",
      doors: 4,
      seats: 5,
    },
  },
  {
    id: "5",
    make: "Mercedes",
    model: "GLE",
    year: 2021,
    color: "Blue",
    image: carImages.mercedes,
    plate: "G 88777",
    mileage: 32000,
    inspection: true,
    hasView360: true,
    reservePrice: 170000,
    currentBid: 160000,
    timeRemaining: "1.5 hours",
    specs: {
      engine: "3.0L V6",
      transmission: "Automatic",
      fuelType: "Petrol",
      exteriorColor: "Blue",
      interiorColor: "Black",
      doors: 5,
      seats: 5,
    },
  },
  {
    id: "6",
    make: "Range Rover",
    model: "Sport",
    year: 2019,
    color: "Gray",
    image: carImages.range,
    plate: "P 55432",
    mileage: 56000,
    inspection: true,
    hasView360: false,
    reservePrice: 160000,
    currentBid: 153000,
    timeRemaining: "3 hours",
    specs: {
      engine: "3.0L V6",
      transmission: "Automatic",
      fuelType: "Diesel",
      exteriorColor: "Gray",
      interiorColor: "Black",
      doors: 5,
      seats: 5,
    },
  },
];

export const mockSellerCars: SellerCar[] = [
  {
    id: "1",
    make: "Lexus",
    model: "GX 460",
    year: 2015,
    color: "Pearl White",
    image: carImages.lexusGX,
    plate: "B 60828",
    mileage: 142000,
    inspection: true,
    inspectionStatus: "Done",
    photoStatus: "Complete",
    hasView360: true,
    reservePrice: 80000,
    currentBid: 77500,
    timeRemaining: "N/A",
    auctionStatus: "Day 3 of 7",
    bestBid: 77500,
    daysListed: 3,
  },
  {
    id: "2",
    make: "BMW",
    model: "X5",
    year: 2020,
    color: "Black",
    image: carImages.bmw,
    plate: "I 12345",
    mileage: 35000,
    inspection: true,
    inspectionStatus: "Done",
    photoStatus: "Complete",
    hasView360: true,
    reservePrice: 135000,
    currentBid: 130000,
    timeRemaining: "N/A",
    auctionStatus: "Day 5 of 7",
    bestBid: 130000,
    daysListed: 5,
  },
];

export const mockMyCars: MyCar[] = [
  {
    id: "1",
    make: "Audi",
    model: "Q7",
    year: 2019,
    color: "Black",
    image: carImages.audi,
    plate: "A 78912",
    mileage: 45000,
    inspection: true,
    hasView360: true,
    reservePrice: 0, // Not applicable for purchased cars
    currentBid: 0, // Not applicable for purchased cars
    timeRemaining: "", // Not applicable for purchased cars
    purchaseDate: "15 Apr 2025",
    purchasePrice: 125000,
    relistDaysRemaining: 27,
  },
  {
    id: "2",
    make: "Porsche",
    model: "Macan",
    year: 2021,
    color: "Silver",
    image: carImages.porsche,
    plate: "D 34567",
    mileage: 28000,
    inspection: true,
    hasView360: true,
    reservePrice: 0, // Not applicable for purchased cars
    currentBid: 0, // Not applicable for purchased cars
    timeRemaining: "", // Not applicable for purchased cars
    purchaseDate: "2 May 2025",
    purchasePrice: 190000,
    relistDaysRemaining: 15,
  },
  {
    id: "3",
    make: "Mercedes",
    model: "C-Class",
    year: 2020,
    color: "White",
    image: carImages.mercedes,
    plate: "T 98765",
    mileage: 32000,
    inspection: true,
    hasView360: true,
    reservePrice: 0, // Not applicable for purchased cars
    currentBid: 0, // Not applicable for purchased cars
    timeRemaining: "", // Not applicable for purchased cars
    purchaseDate: "8 May 2025",
    purchasePrice: 115000,
    relistDaysRemaining: 21,
  },
];

export const buyingSteps = [
  'Tap "Buy" on Salik Souq app',
  "Pay AED 1,000 deposit",
  "Join daily 1-hour auction",
  "Place bid (above base or below base offer)",
  "Win & pay remaining",
  "Schedule transfer at Tasjeel",
];

export const sellingSteps = [
  'Tap "Sell" on Salik Souq',
  "Book 240-point inspection",
  "Get 360° photos",
  "Pay AED 599",
  "Set base price",
  "Auction goes live daily for 7 days",
];
