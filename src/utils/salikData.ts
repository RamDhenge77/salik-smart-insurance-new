
// Define toll gates with their locations and coordinates
export const TOLL_GATES = [
  { id: 1, name: "Al Maktoum Bridge", location: "Dubai Creek", lat: 25.2629, lng: 55.3138 },
  { id: 2, name: "Al Garhoud Bridge", location: "Dubai Creek", lat: 25.2381, lng: 55.3339 },
  { id: 3, name: "Al Mamzar South", location: "Al Mamzar", lat: 25.3025, lng: 55.3572 },
  { id: 4, name: "Airport Tunnel", location: "Airport Road", lat: 25.2468, lng: 55.3568 },
  { id: 5, name: "Al Safa", location: "Sheikh Zayed Road", lat: 25.1543, lng: 55.2296 },
  { id: 6, name: "Jebel Ali", location: "Sheikh Zayed Road", lat: 25.0439, lng: 55.1304 },
  { id: 7, name: "Al Barsha", location: "Al Khail Road", lat: 25.1101, lng: 55.1968 },
  { id: 8, name: "Business Bay Crossing", location: "Business Bay", lat: 25.1893, lng: 55.2756 }
];

// Roads and their associated toll gates
export const ROADS_TO_GATES = {
  "Sheikh Zayed Road": [5, 6],
  "Al Khail Road": [7],
  "Dubai Creek": [1, 2],
  "Airport Road": [4],
  "Al Ittihad Road": [3],
  "Business Bay": [8]
};

// Major locations and roads they're near
export const LOCATION_TO_ROADS = {
  "Dubai Mall": ["Sheikh Zayed Road", "Business Bay"],
  "Burj Khalifa": ["Sheikh Zayed Road", "Business Bay"],
  "Dubai Marina": ["Sheikh Zayed Road"],
  "Palm Jumeirah": ["Sheikh Zayed Road"],
  "Downtown Dubai": ["Sheikh Zayed Road", "Business Bay"],
  "Dubai International Airport": ["Airport Road"],
  "Deira": ["Al Maktoum Bridge", "Al Garhoud Bridge"],
  "Sharjah": ["Al Ittihad Road"],
  "Abu Dhabi": ["Sheikh Zayed Road", "Jebel Ali"]
};

// Function to determine if a time is during peak hours, off-peak, or free period
export const getTariffType = (time: string, isWeekend: boolean, isRamadan: boolean = false): { type: string, rate: number } => {
  if (isRamadan) {
    return { type: "Ramadan", rate: 4 }; // Fixed rate during Ramadan
  }
  
  if (isWeekend && time.includes("Sunday")) {
    const hour = parseInt(time.split(':')[0], 10);
    if (hour >= 1 && hour < 6) {
      return { type: "Late Night", rate: 0 };
    }
    return { type: "Sunday", rate: 4 };
  }

  const hour = parseInt(time.split(':')[0], 10);
  
  // Late night hours: 1:00 AM - 6:00 AM (free)
  if (hour >= 1 && hour < 6) {
    return { type: "Late Night", rate: 0 };
  }
  
  // Peak hours: 6:00 AM - 10:00 AM & 4:00 PM - 8:00 PM
  if ((hour >= 6 && hour < 10) || (hour >= 16 && hour < 20)) {
    return { type: "Peak", rate: 6 };
  }
  
  // Off-peak hours: 10:00 AM - 4:00 PM & 8:00 PM - 1:00 AM
  return { type: "Off-Peak", rate: 4 };
};
