import React, { useEffect, useState } from "react";
import GoogleMapReact from "google-map-react";

import { BiCoffeeTogo } from "react-icons/bi";

import Marker from "./marker-&-info-window/Marker";

interface MapProps {
  center: {
    lat: number;
    lng: number;
  };
  zoom: number;
}

const initialMapProps: MapProps = {
  center: {
    lat: 49.27389842076915,
    lng: -123.10383790605684,
  },
  zoom: 9,
};

const API_KEY: string | undefined = process.env.REACT_APP_GOOGLE_MAP_API;

// #######################
// データをFIREBASEからとってくる
// 一回のみでOK？　変更しないので
// reduxに収納し、isFavやbeenToを追加

// locationをmarker propsに入れてmap
// #######################

const MapComponent = () => {
  const [mapProps, setMapProps] = useState<MapProps>(initialMapProps);

  return (
    <section>
      <div style={{ width: "50vw", height: "50vh" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: API_KEY as string }}
          center={mapProps.center}
          zoom={mapProps.zoom}
        >
          <Marker lat="49.27389842076915" lng="-123.10383790605684" />
        </GoogleMapReact>
      </div>
    </section>
  );
};

// interface MarkerProps {
//   lat: string;
//   lng: string;
// }

// const Marker = (props: MarkerProps) => {
//   return (
//     <BiCoffeeTogo
//       style={{ height: "50px", width: "50px", color: "red" }}
//       onClick={(): void => console.log("clicked")}
//     ></BiCoffeeTogo>
//   );
// };

export default MapComponent;
