import React, { useState, useEffect } from "react";
import GoogleMapReact from "google-map-react";

import shopListData from "../../firebase/shop-info.json";

import Marker from "./marker-&-info-window/Marker";
import { JsonProps, MapProps } from "../../assets/tsInterface";

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

  const [shops, setShops] = useState<JsonProps[]>([...shopListData]);

  useEffect(() => {
    // setShops()
    console.log(shops);
  }, []);

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
              return shop.latLng.map((val) => {
                console.log(val);
                return <Marker lat={val.lat} lng={val.lng} />;
              });
            })}
        </GoogleMapReact>
      </div>
    </section>
  );
};

export default MapComponent;
