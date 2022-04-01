export interface MapProps {
  center: {
    lat: number;
    lng: number;
  };
  zoom: number;
}

export interface MarkerProps {
  lat: string;
  lng: string;
  shop?: JsonProps;
}

export interface JsonProps {
  shopName: string;
  flavours: { flavourName: string; taste: string }[];
  latLng: MarkerProps[];
  mapArea: string[];
  websiteUrl: string;
  filtering: string[];
  isFav?: boolean;
  beenTo?: boolean;
  // filtering: {
  //   takeoutOnly: boolean;
  //   limitedCafeService: boolean;
  //   glutenFree: boolean;
  //   dairyFree: boolean;
  //   vegan: boolean;
  //   openLate: boolean;
  // };
}

// export interface ReduxProps extends JsonProps {
//   isFav: boolean;
//   beenTo: boolean;
// }

export interface ReduxState {
  shops: JsonProps[];
}
