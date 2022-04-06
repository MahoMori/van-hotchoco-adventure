import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { JsonProps, LocationPropsF, ReduxState } from "../assets/tsInterface";
import { v4 as uuid } from "uuid";

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

    changeBeenTo: (
      state,
      action: PayloadAction<[JsonProps, LocationPropsF, string]>
    ) => {
      let payloadShop: JsonProps = { ...action.payload[0] };
      // const shopLocation: LocationPropsF = action.payload[1];
      const payloadId: string = action.payload[2];

      // ---- close to current location ----
      const shopLocation: LocationPropsF = {
        lat: 49.217789,
        lng: -123.060396,
      };

      let currentLocation: LocationPropsF = { lat: 0, lng: 0 };
      // ---- current location ----
      // let currentLocation: LocationPropsF = {
      //   lat: 49.2177376,
      //   lng: -123.0604381,
      // };

      // ----- helper functions -----
      const getCurrentLocation = (): void => {
        navigator.geolocation.getCurrentPosition((position) => {
          currentLocation.lat = position.coords.latitude;
          currentLocation.lng = position.coords.longitude;

          console.log("inside getCurrentPosition", currentLocation);
        });
        console.log("outside getCurrentPosition", currentLocation);
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
      // ----- -----

      getCurrentLocation();

      if (arePointsNear(currentLocation, shopLocation, 0.1)) {
        const newEachStoreInfo = payloadShop.eachStoreInfo.map((eachStore) => {
          let newEachStore = { ...eachStore };

          if (newEachStore.eachStoreId === payloadId) {
            if (!newEachStore.beenTo) {
              newEachStore.beenTo = true;
            } else {
              alert(
                "You've already been to this place! How was their hot chocolate?😋"
              );
            }
          }

          return newEachStore;
        });

        payloadShop.eachStoreInfo = newEachStoreInfo;

        state.shops = state.shops.map((shop) => {
          return shop.shopName === payloadShop.shopName
            ? (shop = payloadShop)
            : shop;
        });
      } else {
        alert(
          "Come closer to the shop and treat yourself with a warm hot chocolate😉"
        );
      }
    },
  },
});

export const { setReduxState, changeIsFav, changeBeenTo } = shopSlice.actions;

export default shopSlice.reducer;
