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
}

export interface JsonProps {
  shopName: string;
  flavours: { flavourName: string; taste: string }[];
  latLng: MarkerProps[];
  mapArea: string[];
  websiteUrl: string;
  filtering: string[];
  // filtering: {
  //   takeoutOnly: boolean;
  //   limitedCafeService: boolean;
  //   glutenFree: boolean;
  //   dairyFree: boolean;
  //   vegan: boolean;
  //   openLate: boolean;
  // };
}
