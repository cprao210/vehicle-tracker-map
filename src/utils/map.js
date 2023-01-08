export const getDistance = (initialDate, velocity) => {
  // seconds between when the component loaded and now
  const differentInTime = (new Date() - initialDate) / 1000;
  return differentInTime * velocity;
};

export const getNewPath = (path) => {
  const newpath = path?.map((coordinates, i, array) => {
    if (i === 0) {
      return { ...coordinates, distance: 0 };
    }
    const { lat: lat1, lng: lng1 } = coordinates;

    const latLong1 = window.google && new window.google.maps.LatLng(lat1, lng1);
    const { lat: lat2, lng: lng2 } = array[0];
    const latLong2 = window.google && new window.google.maps.LatLng(lat2, lng2);

    const distance =
      window.google &&
      window.google.maps.geometry.spherical.computeDistanceBetween(
        latLong1,
        latLong2
      );

    return { ...coordinates, distance };
  });

  return newpath;
};
