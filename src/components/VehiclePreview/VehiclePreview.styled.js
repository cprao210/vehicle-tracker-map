import styled from "styled-components";

export const StyledVehiclePreview = styled.div`
  cursor: pointer;
  width: 100%;
  position: relative;
  padding: 6px 10px;
  background: ${(props) => (props.active ? "#0B6AB029" : "#fff")};
  border-bottom: 1px solid #808080;

  box-sizing: border-box;

  &:hover {
    background: ${(props) => (props.active ? "#0B6AB029" : "#f2f2f2")};
  }

  .vehicle_id {
    font-weight: 600;
    font-size: 12px;
  }

  .distance {
    font-weight: 400;
    font-size: 10px;
  }
`;
