import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import {
  JsonProps,
  LocationPropsF,
  ReduxState,
  optionsParams,
} from "../assets/tsInterface";
import { v4 as uuid } from "uuid";

import { testShopLocation } from "./locationForTesting";

const getCoordinates = (options?: optionsParams) => {
  return new Promise((resolve, reject) =>
    navigator.geolocation.getCurrentPosition(resolve, reject, options)
  );
};

const arePointsNear = (
  userLocation: LocationPropsF,
  hcShopLocation: LocationPropsF,
  km: number
): boolean => {
  const ky = 40000 / 360;
  const kx = Math.cos((Math.PI * hcShopLocation.lat) / 180.0) * ky;
  const dx = Math.abs(hcShopLocation.lng - userLocation.lng) * kx;
  const dy = Math.abs(hcShopLocation.lat - userLocation.lat) * ky;

  return Math.sqrt(dx * dx + dy * dy) <= km;
};

export const changeBeenTo = createAsyncThunk(
  "shops/changeBeenToStatus",
  async (payload: [JsonProps, LocationPropsF, string], thunkAPI) => {
    const payloadShop: JsonProps = payload[0];
    // const shopLocation: LocationPropsF = payload[1];
    const shopLocation = testShopLocation;
    const payloadId: string = payload[2];

    let currentLocation: LocationPropsF = { lat: 0, lng: 0 };

    let result: boolean = false;

    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };

    try {
      const position: any = await getCoordinates(options);
      currentLocation.lat = position.coords.latitude;
      currentLocation.lng = position.coords.longitude;

      result = arePointsNear(currentLocation, shopLocation, 1.5);
      console.log("I'll get printed first", currentLocation, result);
    } catch (err: any) {
      throw new Error(`Unable to get current location (${err.message})`);
    }

    console.log("outside getCurrentPosition", currentLocation);

    return {
      shop: payloadShop,
      shopId: payloadId,
      result,
    };
  }
);

const initialState: ReduxState = {
  shops: [],
};

export const shopSlice = createSlice({
  name: "shops",
  initialState,
  reducers: {
    setReduxState: (state, action: PayloadAction<JsonProps>) => {
      let newPayload = action.payload;
      const newEachStoreInfo = newPayload.eachStoreInfo.map((eachStore) => {
        eachStore.eachStoreId = uuid();
        return eachStore;
      });
      newPayload.eachStoreInfo = newEachStoreInfo;

      state.shops = [...state.shops, newPayload];
    },

    changeIsFav: (state, action: PayloadAction<JsonProps>) => {
      const payloadShop: JsonProps = { ...action.payload };

      payloadShop.isFav
        ? (payloadShop.isFav = false)
        : (payloadShop.isFav = true);

      console.log(payloadShop);

      state.shops = state.shops.map((shop) => {
        return shop.shopName === payloadShop.shopName
          ? (shop = payloadShop)
          : shop;
      });
    },
  },

  extraReducers: (builder) => {
    builder.addCase(changeBeenTo.fulfilled, (state, action) => {
      const shopToUpdate = state.shops.find(
        (shop) => shop.shopName === action.payload.shop.shopName
      );

      if (action.payload.result && shopToUpdate) {
        const eachStore = shopToUpdate.eachStoreInfo.find(
          (store) => store.eachStoreId === action.payload.shopId
        );
        if (eachStore) {
          if (!eachStore.beenTo) {
            eachStore.beenTo = true;
            console.log(eachStore.beenTo);
          }
        }
      } else {
        alert(
          "Come closer to the shop and treat yourself with a warm hot chocolate😉"
        );
      }
    });
  },
});

export const { setReduxState, changeIsFav } = shopSlice.actions;

export default shopSlice.reducer;
