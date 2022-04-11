import styled from "styled-components";

import { MapAreaColor } from "./tsInterface";

export const mapAreaColor: MapAreaColor = {
  "Westside / Kerrisdale": "#FAD02C",
  "North Vancouver / West Vancouver": "#3B9212",
  "Downtown Vancouver": "#FD7F20",
  Burnaby: "#3939FF",
  "Mount Pleasant / East Vancouver": "#0E86D4",
  "South Granville / Kitsilano": "#880ED4",
  "White Rock / Surrey": "#000080",
  Richmond: "#BA0F30",
  Whistler: "#FF5349",
  "Tri-Cities": "#88CA5E",
};

export const Section = styled.section`
  width: 95%;
  background: #fff;
  margin: 0 auto;
  border: solid #84563c 2px;
  box-shadow: 0.3rem 0.4rem #84563c;
`;
