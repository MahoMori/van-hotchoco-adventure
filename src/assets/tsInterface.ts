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
  shop: JsonProps;
  beenTo: boolean;
  eachStoreId: string;
}

export interface JsonProps {
  shopName: string;
  flavours: { flavourName: string; taste: string }[];
  eachStoreInfo: {
    areaName: string;
    location: { [key: string]: string };
    beenTo: boolean;
    eachStoreId?: string;
  }[];
  websiteUrl: string;
  filtering: string[];
  isFav: boolean;
}

export interface ReduxState {
  shops: JsonProps[];
}

export interface MapAreaColor {
  [key: string]: string;
}

export interface LocationPropsF {
  [key: string]: number;
}

export interface BeenToIconProps {
  shop: JsonProps;
  beenTo: boolean;
  storeLocation?: LocationPropsF;
  eachStoreId: string;
  kw: string;
}
