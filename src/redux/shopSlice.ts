import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { JsonProps, LocationPropsF, ReduxState } from "../assets/tsInterface";
import { v4 as uuid } from "uuid";

const initialState: ReduxState = {
  shops: [],
  //   shopName: "",
  //   flavours: [],
  //   latLng: [],
  //   mapArea: [],
  //   websiteUrl: "",
  //   filtering: [],
  //   isFav: false,
  //   beenTo: false,
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
      const payloadShop = action.payload;

      payloadShop.isFav
        ? (payloadShop.isFav = false)
        : (payloadShop.isFav = true);

      state.shops.map((shop) => {
        return shop.shopName === payloadShop.shopName
          ? (shop = payloadShop)
          : shop;
      });
    },

    changeBeenTo: (
      state,
      action: PayloadAction<[JsonProps, LocationPropsF, string]>
    ) => {
      let payloadShop = action.payload[0];
      const shopLocation = action.payload[1];
      const payloadId = action.payload[2];

      const testLocation: LocationPropsF = { lat: 59.345635, lng: 18.059707 };

      // let currentLocation: LocationPropsF = { lat: 0, lng: 0 };
      let currentLocation: LocationPropsF = { ...shopLocation };

      const getCurrentLocation = (): void => {
        navigator.geolocation.getCurrentPosition((position) => {
          // console.log("current latitude: ",position.coords.latitude);
          // console.log("current longitude: ",position.coords.longitude);

          currentLocation.lat = position.coords.latitude;
          currentLocation.lng = position.coords.longitude;
        });
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

      payloadShop.eachStoreInfo.map((eachStore) => {
        if (eachStore.eachStoreId === payloadId && !eachStore.beenTo) {
          // getCurrentLocation();
          if (arePointsNear(currentLocation, shopLocation, 10)) {
            eachStore.beenTo = true;

            state.shops.map((shop) => {
              return shop.shopName === payloadShop.shopName
                ? (shop = payloadShop)
                : shop;
            });
          } else {
            alert(
              "Come closer to the shop and treat yourself with a warm hot chocolate😉"
            );
          }
        } else {
          alert(
            "You've already been to this place! How was their hot chocolate?"
          );
        }
      });
    },
  },
});

export const { setReduxState, changeIsFav, changeBeenTo } = shopSlice.actions;

export default shopSlice.reducer;
