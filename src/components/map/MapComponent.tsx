import React, { useEffect, useState } from "react";
import GoogleMapReact from "google-map-react";

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

const MapComponent = () => {
  const [mapProps, setMapProps] = useState<MapProps>(initialMapProps);
  return (
    <section>
      <div style={{ width: "50vw", height: "50vh" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: API_KEY as string }}
          center={mapProps.center}
          zoom={mapProps.zoom}
        />
      </div>
    </section>
  );
};

export default MapComponent;
