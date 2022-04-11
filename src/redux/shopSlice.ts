import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { JsonProps, LocationPropsF, ReduxState } from "../assets/tsInterface";
import { v4 as uuid } from "uuid";

interface optionsParams {
  enableHighAccuracy: boolean;
  timeout: number;
  maximumAge: number;
}

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

// First, create the thunk
export const changeBeenTo = createAsyncThunk(
  "shops/changeBeenToStatus",
  async (payload: [JsonProps, LocationPropsF, string], thunkAPI) => {
    const payloadShop: JsonProps = payload[0];
    // const shopLocation: LocationPropsF = payload[1];
    const payloadId: string = payload[2];

    // ---- close to current location ----
    const shopLocation: LocationPropsF = {
      lat: 49.2177522,
      lng: -123.0604064,
    };

    // ---- close to library ----
    // const shopLocation: LocationPropsF = {
    //   lat: 49.2785417,
    //   lng: -123.0999191,
    // };

    let currentLocation: LocationPropsF = { lat: 0, lng: 0 };
    // ---- current location ----
    // let currentLocation: LocationPropsF = {
    //   lat: 49.2177376,
    //   lng: -123.0604381,
    // };

    let result: boolean = false;

    // ----- helper functions -----
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
    setReduxState: (state, action: PayloadAction<JsonProps[]>) => {
      const newPayload = action.payload.map((shop) => {
        shop.eachStoreInfo.map((eachStore) => {
          eachStore.eachStoreId = uuid();
          return eachStore;
        });
        return shop;
      });

      state.shops = newPayload;

      console.log("state.shops: ", state.shops);
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
