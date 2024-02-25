import React, { useState, useEffect } from 'react';

const LocationTracker = () => {
  const [coordinates, setCoordinates] = useState([]);
  const [tracking, setTracking] = useState(false);
  const [prevCoords, setPrevCoords] = useState(null);
  const [distanceThreshold, setDistanceThreshold] = useState(10); // Threshold in meters

  useEffect(() => {
    let watchId;
    if (tracking) {
      // Start watching for location updates
      watchId = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const newCoord = { latitude, longitude };
          if (
            !prevCoords ||
            getDistance(prevCoords.latitude, prevCoords.longitude, latitude, longitude) > distanceThreshold
          ) {
            setCoordinates(prevCoords => [...prevCoords, newCoord]);
            setPrevCoords(newCoord);
          }
        },
        (error) => console.error(error),
        { enableHighAccuracy: true }
      );
    }

    return () => {
      // Clean up when component unmounts or tracking is stopped
      if (watchId) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, [tracking, distanceThreshold]);

  const handleStartTracking = () => {
    setTracking(true);
  };

  const handleStopTracking = () => {
    setTracking(false);
    console.log(coordinates); // Print coordinates array
  };

  const getDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in km
    return d * 1000; // Distance in meters
  };

  const deg2rad = (deg) => {
    return deg * (Math.PI / 180);
  };

  return (
    <div>
      <button onClick={handleStartTracking}>Start Tracking</button>
      <button onClick={handleStopTracking}>Stop Tracking</button>
      <input
        type="number"
        value={distanceThreshold}
        onChange={(e) => setDistanceThreshold(parseFloat(e.target.value))}
        placeholder="Distance Threshold (m)"
      />
    </div>
  );
};

export default LocationTracker;
