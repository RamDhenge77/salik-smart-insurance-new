
import React, { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLoadScript } from "@react-google-maps/api";

const libraries = ["places"];

interface LocationInputProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const LocationInput = ({
  id,
  label,
  value,
  onChange,
  placeholder = "Enter location..."
}: LocationInputProps) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<{ place_id: string; description: string }[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const autocompleteRef = useRef<google.maps.places.AutocompleteService | null>(null);
  const sessTokenRef = useRef<google.maps.places.AutocompleteSessionToken | null>(null);

  // Use Vite's approach for environment variables
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "YOUR_GOOGLE_MAPS_API_KEY";
  
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: apiKey,
    libraries: libraries as any,
  });

  useEffect(() => {
    if (!isLoaded) return;

    const initAutocomplete = () => {
      autocompleteRef.current = new window.google.maps.places.AutocompleteService();
      sessTokenRef.current = new window.google.maps.places.AutocompleteSessionToken();
    };

    initAutocomplete();
  }, [isLoaded]);

  useEffect(() => {
    if (!isLoaded || !autocompleteRef.current || !value || value.length < 3) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    const fetchPredictions = async () => {
      if (!autocompleteRef.current) return;

      const request = {
        input: value,
        sessionToken: sessTokenRef.current,
        componentRestrictions: { country: 'ae' }, // Limit to UAE
        types: ['geocode', 'establishment'] // Addresses and establishments
      };

      autocompleteRef.current.getPlacePredictions(
        request,
        (predictions, status) => {
          if (status !== google.maps.places.PlacesServiceStatus.OK || !predictions) {
            console.error("Error fetching place predictions:", status);
            setSuggestions([]);
            setShowSuggestions(false);
            return;
          }

          const formattedSuggestions = predictions.map(prediction => ({
            place_id: prediction.place_id,
            description: prediction.description
          }));
          
          setSuggestions(formattedSuggestions);
          setShowSuggestions(true);
        }
      );
    };

    const timeoutId = setTimeout(fetchPredictions, 300);
    return () => clearTimeout(timeoutId);
  }, [value, isLoaded]);

  // Fallback to Dubai locations when Google API is not loaded
  useEffect(() => {
    if (!isLoaded && value.length > 2) {
      const dubaiLocations = [
        "Dubai Mall, Dubai",
        "Mall of the Emirates, Dubai",
        "Burj Khalifa, Dubai",
        "Palm Jumeirah, Dubai",
        "Dubai Marina, Dubai",
        "Dubai International Airport, Dubai",
        "Sharjah City Centre, Sharjah",
        "Abu Dhabi Mall, Abu Dhabi",
        "Jumeirah Beach Residence, Dubai",
        "Al Mamzar Beach Park, Dubai",
        "Deira City Centre, Dubai",
        "Ibn Battuta Mall, Dubai",
        "Business Bay, Dubai",
        "Dubai Silicon Oasis, Dubai",
        "Dubai Hills Estate, Dubai",
        "Dubai Media City, Dubai",
        "Sheikh Zayed Road, Dubai",
        "Al Qusais, Dubai",
        "Al Nahda, Dubai",
        "Mirdif, Dubai",
        "International City, Dubai",
        "Dubai Sports City, Dubai",
        "Jumeirah Lake Towers, Dubai",
        "The Greens, Dubai",
        "Discovery Gardens, Dubai"
      ];
      
      const filteredSuggestions = dubaiLocations
        .filter(location => location.toLowerCase().includes(value.toLowerCase()))
        .map(location => ({ 
          place_id: location, 
          description: location 
        }));
      
      setSuggestions(filteredSuggestions);
      setShowSuggestions(filteredSuggestions.length > 0);
    }
  }, [value, isLoaded]);

  const handleSelectSuggestion = (suggestion: { place_id: string, description: string }) => {
    onChange(suggestion.description);
    setShowSuggestions(false);
  };

  return (
    <div className="mb-4 relative">
      <Label htmlFor={id} className="text-sm font-medium mb-1 block">
        {label}
      </Label>
      <Input
        id={id}
        ref={inputRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-white"
      />
      
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg max-h-60 overflow-auto">
          {suggestions.map((suggestion) => (
            <div
              key={suggestion.place_id}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleSelectSuggestion(suggestion)}
            >
              {suggestion.description}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LocationInput;
