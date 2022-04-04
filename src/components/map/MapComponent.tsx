import React, { useState } from "react";

// ------ google map react ------
import GoogleMapReact from "google-map-react";

// ------ redux ------
import { useSelector } from "react-redux";
import { TStore } from "../../redux/store";

// ------ TS interface ------
import { MapProps } from "../../assets/tsInterface";

// ------ components ------
import Marker from "./marker-&-info-window/Marker";

const initialMapProps: MapProps = {
  center: {
    lat: 49.27389842076915,
    lng: -123.10383790605684,
  },
  zoom: 9,
};

// ------ google map api key ------
const API_KEY: string | undefined = process.env.REACT_APP_GOOGLE_MAP_API;

// #######################
// データをFIREBASEからとってくる
// 一回のみでOK？　変更しないので
// reduxに収納し、isFavやbeenToを追加

// locationをmarker propsに入れてmap
// #######################

const MapComponent = () => {
  // ------ google map react ------
  const [mapProps, setMapProps] = useState<MapProps>(initialMapProps);

  // ------ redux ------
  const shops = useSelector((state: TStore) => state.shops.shops);

  return (
    <section>
      <div style={{ width: "50vw", height: "50vh" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: API_KEY as string }}
          center={mapProps.center}
          zoom={mapProps.zoom}
        >
          {/* <Marker lat="49.258822" lng="-123.100979" />
          <Marker lat="49.248942" lng="-123.100634" /> */}

          {shops.length > 0 &&
            shops.map((shop) => {
              return shop.eachStoreInfo.map((eachStore) => {
                return (
                  <Marker
                    lat={eachStore.location.lat}
                    lng={eachStore.location.lng}
                    shop={shop}
                    beenTo={eachStore.beenTo}
                    eachStoreId={eachStore.eachStoreId as string}
                  />
                );
              });
            })}
        </GoogleMapReact>
      </div>
    </section>
  );
};

export default MapComponent;
