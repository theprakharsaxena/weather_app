function getDeviceLocation(callback) {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        callback({ latitude, longitude });
      },
      (error) => {
        callback(null, error.message);
      }
    );
  } else {
    callback(null, "Geolocation is not supported by this browser.");
  }
}

export default getDeviceLocation;
