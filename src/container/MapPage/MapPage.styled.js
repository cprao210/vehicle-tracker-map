import styled from "styled-components";

export const StyledMapPage = styled.div`
  display: flex;

  width: 100%;
  box-sizing: border-box;
  .sidebar {
    width: 20%;
    background-color: rgb(233, 240, 251);
    p {
      font-weight: 600;
      font-size: 12px;
    }
    .vehicle_container {
      /* height: 100%; */

      .vehicle_list {
        height: 60vh;
        overflow-y: auto;
      }
      .vehicle_controllers {
        padding: 0 12px;
      }

      button {
        padding: 6px 24px;
        background-color: rgb(31, 46, 100);
        border-radius: 4px;
        border: none;
        font-style: normal;
        font-weight: 600;
        word-spacing: 2px;
        color: rgb(255, 255, 255);
        box-sizing: border-box;
      }
    }
  }
`;
