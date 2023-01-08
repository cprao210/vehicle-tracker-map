import React from "react";
import { StyledVehiclePreview } from "./VehiclePreview.styled";

const VehiclePreview = ({
  Vehicle,
  selectedVehicle,
  handleSelectVehiclePreview,
}) => {
  return (
    <StyledVehiclePreview
      active={selectedVehicle === Vehicle._id}
      onClick={() => {
        handleSelectVehiclePreview(Vehicle);
      }}
    >
      <div className="vehicle_id">vehicle id: {Vehicle.vehicle_id}</div>
      <div className="distance">Distance Traveled:{Vehicle.dist_sp}</div>
    </StyledVehiclePreview>
  );
};

export default VehiclePreview;
