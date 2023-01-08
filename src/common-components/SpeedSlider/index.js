import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

export default function DiscreteSliderValues({ setVelocity }) {
  return (
    <Box sx={{ width: "100%" }}>
      <Slider
        defaultValue={5}
        valueLabelDisplay="auto"
        min={0}
        max={10}
        step={1}
        onChange={(e) => {
          setVelocity(e.target.value);
        }}
        marks
      />
    </Box>
  );
}
