import React, { useEffect } from "react";
import {
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  Marker,
  Polyline,
} from "react-google-maps";
import { all_geo } from "../../container/MapPage/constant";

const MapModal = ({ selectedVehicle, path, setPath, progress }) => {
  const icon = {
    url: "https://images.vexels.com/media/users/3/154573/isolated/preview/bd08e000a449288c914d851cb9dae110-hatchback-car-top-view-silhouette-by-vexels.png",
    scaledSize: new window.google.maps.Size(30, 30),
    anchor: { x: 10, y: 10 },
  };

  useEffect(() => {
    const newpath =
      all_geo.filter((d, i) => d._id === selectedVehicle)[0].multi_geo &&
      all_geo
        .filter((d, i) => d._id === selectedVehicle)[0]
        ?.multi_geo?.map((cord) => {
          return { lat: cord.geocode.lat, lng: cord.geocode.lng };
        });
    newpath && setPath(newpath);
  }, [selectedVehicle]);

  return (
    <>
      <GoogleMap
        defaultZoom={16}
        center={
          progress.length > 1
            ? progress[progress.length - 1]
            : {
                lat: all_geo?.filter((d, i) => d._id === selectedVehicle)[0]
                  ?.multi_geo[0]?.geocode.lat,
                lng: all_geo?.filter((d, i) => d._id === selectedVehicle)[0]
                  ?.multi_geo[0]?.geocode.lng,
              }
        }
      >
        <Marker
          icon={icon}
          position={
            progress.length > 1
              ? progress[progress.length - 1]
              : {
                  lat: path[0].lat,
                  lng: path[0].lng,
                }
          }
        />
        <Polyline path={progress} options={{ strokeColor: "#FF0000 " }} />
      </GoogleMap>
    </>
  );
};

export const MapComponent = withScriptjs(withGoogleMap(MapModal));
