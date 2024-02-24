// Check if the Geolocation API is supported by the browser
if ("geolocation" in navigator) {
    // Geolocation is supported
    navigator.geolocation.getCurrentPosition(function(position) {
      // Get the latitude and longitude coordinates
      var latitude = position.coords.latitude;
      var longitude = position.coords.longitude;
  
      // Do something with the coordinates
      console.log("Latitude: " + latitude + ", Longitude: " + longitude);
    });
  } else {
    // Geolocation is not supported by the browser
    console.log("Geolocation is not supported by this browser.");
  }
  