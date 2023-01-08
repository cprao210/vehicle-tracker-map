import React, { useEffect, useState } from "react";
import DiscreteSliderValues from "../../common-components/SpeedSlider";
import { MapComponent } from "../../components/Map";
import VehiclePreview from "../../components/VehiclePreview";
import { getDistance, getNewPath } from "../../utils/map";
import { moveObject, pathMap } from "../../utils/mapPage";
import { all_geo } from "./constant";
import { StyledMapPage } from "./MapPage.styled";

const MapPage = () => {
  const [selectedVehicle, setSelectedVehicle] = useState(all_geo[0]._id);
  const [velocity, setVelocity] = useState(5);
  const [progress, setProgress] = useState([]);
  const [start, setStart] = useState(false);
  const [path, setPath] = useState(pathMap && pathMap(selectedVehicle));
  const [initialDate, setInitialDate] = useState(new Date());

  useEffect(() => {
    const distance = getDistance(initialDate, velocity);

    if (start) {
      const newPath = [...getNewPath(path)];
      setPath(newPath);
      setTimeout(moveObject, 1000, newPath, progress, distance, setProgress);
    } else if (path.length === progress.length) {
      setStart(false);
      setProgress([]);
      setInitialDate(new Date());
    }
  }, [progress, start]);

  const handleSelectVehiclePreview = (Vehicle) => {
    setSelectedVehicle(Vehicle._id);
    setProgress([]);
    setInitialDate(new Date());
  };

  return (
    <StyledMapPage>
      <div className="sidebar">
        <div className="vehicle_container">
          <h2>Track Vehicle</h2>

          <p>All Vehicle Route</p>
          <div className="vehicle_list">
            {all_geo.map((Vehicle, i) => (
              <VehiclePreview
                Vehicle={Vehicle}
                key={i}
                selectedVehicle={selectedVehicle}
                handleSelectVehiclePreview={handleSelectVehiclePreview}
              />
            ))}
          </div>

          <div className="vehicle_controllers">
            <p> Animation</p>
            <button
              onClick={() => {
                if (path.length === progress.length) {
                  setProgress([]);
                }
                setStart(!start);
              }}
            >
              {start ? "Pause" : "Play"}
            </button>
            <p>Speed </p>
            <DiscreteSliderValues setVelocity={setVelocity} />
          </div>
        </div>
      </div>

      <MapComponent
        googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `100vh`, width: "80%" }} />}
        mapElement={<div style={{ height: `100%` }} />}
        selectedVehicle={selectedVehicle}
        setProgress={setProgress}
        progress={progress}
        setPath={setPath}
        path={path}
      />
    </StyledMapPage>
  );
};

export default MapPage;
