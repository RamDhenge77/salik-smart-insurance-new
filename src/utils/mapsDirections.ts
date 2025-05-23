
import { TOLL_GATES } from './salikData';

interface DirectionsResult {
  routes: google.maps.DirectionsRoute[];
  status: google.maps.DirectionsStatus;
}

type TollGateCrossed = {
  id: number;
  name: string;
  location: string;
  crossingTime: string;
  coordinates: {
    lat: number;
    lng: number;
  };
};

/**
 * Calculates the distance between two coordinates in kilometers
 */
const calculateDistance = (
  lat1: number, 
  lng1: number, 
  lat2: number, 
  lng2: number
): number => {
  const R = 6371; // Earth radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lng2 - lng1) * Math.PI / 180;
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

/**
 * Check if a point is near the route path
 */
const isPointNearPath = (
  point: { lat: number; lng: number },
  path: google.maps.LatLng[],
  threshold = 0.3 // 300 meters threshold
): boolean => {
  for (let i = 0; i < path.length - 1; i++) {
    const pathPoint1 = path[i];
    const pathPoint2 = path[i + 1];
    
    const distance = calculateDistance(
      point.lat, 
      point.lng, 
      (pathPoint1.lat() + pathPoint2.lat()) / 2, 
      (pathPoint1.lng() + pathPoint2.lng()) / 2
    );
    
    if (distance <= threshold) {
      return true;
    }
  }
  
  return false;
};

/**
 * Gets the route between two locations using Google Maps Directions API
 * and identifies toll gates crossed
 */
export const getRouteWithTollGates = async (
  origin: string,
  destination: string,
  departureTime: Date,
  apiKey: string
): Promise<{
  directions: google.maps.DirectionsResult | null;
  tollGatesCrossed: TollGateCrossed[];
  distance: number;
  duration: number;
  error?: string;
}> => {
  // Return mock data if API is not loaded or in development mode
  if (!window.google || !apiKey || apiKey === "YOUR_GOOGLE_MAPS_API_KEY") {
    console.log("Using mock directions data");
    return getMockDirectionsData(origin, destination, departureTime);
  }
  
  try {
    const directionsService = new google.maps.DirectionsService();
    
    const request: google.maps.DirectionsRequest = {
      origin,
      destination,
      travelMode: google.maps.TravelMode.DRIVING,
      drivingOptions: {
        departureTime: departureTime,
      },
    };
    
    return new Promise((resolve, reject) => {
      directionsService.route(request, (result, status) => {
        if (status === google.maps.DirectionsStatus.OK && result) {
          // Extract route path
          const route = result.routes[0];
          const overviewPath = route.overview_path;
          const detailedPath: google.maps.LatLng[] = [];
          
          // Get more detailed path from legs
          route.legs.forEach(leg => {
            leg.steps.forEach(step => {
              step.path.forEach(point => {
                detailedPath.push(point);
              });
            });
          });
          
          // Check which toll gates are crossed
          const tollGatesCrossed: TollGateCrossed[] = [];
          
          TOLL_GATES.forEach(gate => {
            if (isPointNearPath({ lat: gate.lat, lng: gate.lng }, detailedPath)) {
              // Find the approximate crossing time
              const totalDistance = route.legs[0].distance?.value || 0;
              const totalDuration = route.legs[0].duration?.value || 0;
              
              // Estimate what percentage of the journey the toll gate is at
              let minDistance = Infinity;
              let closestPointIndex = 0;
              
              for (let i = 0; i < detailedPath.length; i++) {
                const distance = calculateDistance(
                  gate.lat, 
                  gate.lng, 
                  detailedPath[i].lat(), 
                  detailedPath[i].lng()
                );
                
                if (distance < minDistance) {
                  minDistance = distance;
                  closestPointIndex = i;
                }
              }
              
              const percentageComplete = closestPointIndex / detailedPath.length;
              const secondsToGate = totalDuration * percentageComplete;
              const crossingTime = new Date(departureTime.getTime() + secondsToGate * 1000);
              
              tollGatesCrossed.push({
                id: gate.id,
                name: gate.name,
                location: gate.location,
                coordinates: {
                  lat: gate.lat,
                  lng: gate.lng
                },
                crossingTime: crossingTime.toTimeString().substring(0, 5), // Format as HH:MM
              });
            }
          });
          
          resolve({
            directions: result,
            tollGatesCrossed,
            distance: route.legs[0].distance?.value || 0,
            duration: route.legs[0].duration?.value || 0
          });
        } else {
          // Fallback to mock data if directions failed
          console.warn("Google Directions API failed, using mock data:", status);
          resolve(getMockDirectionsData(origin, destination, departureTime));
        }
      });
    });
  } catch (error) {
    console.error("Error getting directions:", error);
    return getMockDirectionsData(origin, destination, departureTime);
  }
};

// Mock data for development or when API fails
function getMockDirectionsData(origin: string, destination: string, departureTime: Date) {
  // Determine which toll gates might be crossed based on origin and destination keywords
  const tollGatesCrossed: TollGateCrossed[] = [];
  let distance = 15000; // 15km default
  let duration = 1200; // 20 minutes default
  
  // Map locations to potential gates based on location keywords
  const detectGatesByKeywords = () => {
    const locations = [origin, destination];
    
    // Simple pattern matching
    if (locations.some(loc => loc.toLowerCase().includes('dubai mall') || loc.toLowerCase().includes('downtown dubai'))) {
      // If going to/from Dubai Mall, likely to cross Business Bay or Al Safa
      tollGatesCrossed.push({
        ...TOLL_GATES[7], // Business Bay
        coordinates: { lat: TOLL_GATES[7].lat, lng: TOLL_GATES[7].lng },
        crossingTime: new Date(departureTime.getTime() + 600000).toTimeString().substring(0, 5), // 10 min after departure
      });
    }
    
    if (locations.some(loc => loc.toLowerCase().includes('palm') || loc.toLowerCase().includes('marina'))) {
      // If going to/from Palm or Marina, likely to cross Al Barsha
      tollGatesCrossed.push({
        ...TOLL_GATES[6], // Al Safa
        coordinates: { lat: TOLL_GATES[4].lat, lng: TOLL_GATES[4].lng },
        crossingTime: new Date(departureTime.getTime() + 900000).toTimeString().substring(0, 5), // 15 min after departure
      });
    }
    
    if (locations.some(loc => loc.toLowerCase().includes('sharjah'))) {
      // If going to/from Sharjah, likely to cross Al Mamzar
      tollGatesCrossed.push({
        ...TOLL_GATES[2], // Al Mamzar
        coordinates: { lat: TOLL_GATES[2].lat, lng: TOLL_GATES[2].lng },
        crossingTime: new Date(departureTime.getTime() + 300000).toTimeString().substring(0, 5), // 5 min after departure
      });
    }
    
    if (locations.some(loc => loc.toLowerCase().includes('airport'))) {
      // If going to/from Airport, likely to cross Airport Tunnel
      tollGatesCrossed.push({
        ...TOLL_GATES[3], // Airport Tunnel
        coordinates: { lat: TOLL_GATES[3].lat, lng: TOLL_GATES[3].lng },
        crossingTime: new Date(departureTime.getTime() + 450000).toTimeString().substring(0, 5), // 7.5 min after departure
      });
    }
    
    if (locations.some(loc => loc.toLowerCase().includes('abu dhabi'))) {
      // If going to/from Abu Dhabi, likely to cross Jebel Ali
      tollGatesCrossed.push({
        ...TOLL_GATES[5], // Jebel Ali
        coordinates: { lat: TOLL_GATES[5].lat, lng: TOLL_GATES[5].lng },
        crossingTime: new Date(departureTime.getTime() + 1800000).toTimeString().substring(0, 5), // 30 min after departure
      });
    }
    
    if (locations.some(loc => loc.toLowerCase().includes('deira'))) {
      // If going to/from Deira, likely to cross a bridge
      tollGatesCrossed.push({
        ...TOLL_GATES[1], // Al Garhoud Bridge
        coordinates: { lat: TOLL_GATES[1].lat, lng: TOLL_GATES[1].lng },
        crossingTime: new Date(departureTime.getTime() + 1200000).toTimeString().substring(0, 5), // 20 min after departure
      });
    }
    
    // If no gates detected, add a default one based on Dubai geography
    if (tollGatesCrossed.length === 0) {
      tollGatesCrossed.push({
        ...TOLL_GATES[4], // Al Safa (common gate)
        coordinates: { lat: TOLL_GATES[4].lat, lng: TOLL_GATES[4].lng },
        crossingTime: new Date(departureTime.getTime() + 600000).toTimeString().substring(0, 5), // 10 min after departure
      });
    }
    
    // Set distance and duration based on number of gates
    distance = tollGatesCrossed.length * 10000; // 10km per gate
    duration = tollGatesCrossed.length * 900; // 15 min per gate
  };
  
  detectGatesByKeywords();
  
  return {
    directions: null, // No actual directions
    tollGatesCrossed,
    distance,
    duration
  };
}
