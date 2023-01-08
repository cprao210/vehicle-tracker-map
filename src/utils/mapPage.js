import { all_geo } from "../container/MapPage/constant";

export const moveObject = (newPath, newProgress, distance, setProgress) => {
  if (!distance) {
    return;
  }
  newProgress = newPath.filter((coordinates) => {
    return coordinates.distance < distance;
  });
  const nextLine = newPath.find(
    (coordinates) => coordinates.distance > distance
  );
  if (!nextLine) {
    setProgress(newProgress);
    return true; // it's the end!
  }
  const lastLine = newProgress[newProgress.length - 1];

  const lastLineLatLng = new window.google.maps.LatLng(
    lastLine.lat,
    lastLine.lng
  );

  const nextLineLatLng = new window.google.maps.LatLng(
    nextLine.lat,
    nextLine.lng
  );

  // distance of this line
  const totalDistance = nextLine.distance - lastLine.distance;
  const percentage = (distance - lastLine.distance) / totalDistance;

  const position = window.google.maps.geometry.spherical.interpolate(
    lastLineLatLng,
    nextLineLatLng,
    percentage
  );

  newProgress = newProgress.concat(position);

  setProgress([...newProgress]);

  let point1, point2;

  if (nextLine) {
    point1 = newProgress[newProgress.length - 2];
    point2 = nextLine;
  } else {
    // it's the end, so use the latest 2
    point1 = newProgress[newProgress.length - 3];
    point2 = newProgress[newProgress.length - 2];
  }

  const point1LatLng = new window.google.maps.LatLng(point1.lat, point1.lng);
  const point2LatLng = new window.google.maps.LatLng(point2.lat, point2.lng);

  const angle = window.google.maps.geometry.spherical.computeHeading(
    point1LatLng,
    point2LatLng
  );

  const actualAngle = angle - 90;

  const markerUrl =
    "https://images.vexels.com/media/users/3/154573/isolated/preview/bd08e000a449288c914d851cb9dae110-hatchback-car-top-view-silhouette-by-vexels.png";
  const marker = document.querySelector(`[src="${markerUrl}"]`);

  if (marker) {
    // when it hasn't loaded, it's null
    marker.style.transform = `rotate(${actualAngle}deg)`;
  }
  if (newPath.length === newProgress.length) {
    return true;
  }
};

export const pathMap = (selectedVehicle) => {
  return (
    all_geo.filter((d, i) => d._id === selectedVehicle)[0].multi_geo &&
    all_geo
      .filter((d, i) => d._id === selectedVehicle)[0]
      .multi_geo.map((cord) => {
        return { lat: cord.geocode.lat, lng: cord.geocode.lng };
      })
  );
};
