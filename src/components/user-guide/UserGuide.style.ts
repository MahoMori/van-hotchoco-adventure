import styled from "styled-components";
import { GoogleMapContainer } from "../map/MapComponent.style";

export const TempContainer = styled(GoogleMapContainer)`
  display: flex;
  justify-content: center;
  align-items: center;

  & p {
    font-size: 1.5rem;
  }
`;
