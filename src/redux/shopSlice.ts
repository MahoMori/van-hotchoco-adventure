import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { JsonProps, LocationProps, ReduxState } from "../assets/tsInterface";

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
        shop.isFav = false;
        shop.beenTo = false;
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
      action: PayloadAction<[JsonProps, LocationProps]>
    ) => {
      const payloadShop = action.payload[0];
      const shopLocation = action.payload[1];
      const testLocation: LocationProps = { lat: 59.345635, lng: 18.059707 };

      let currentLocation: LocationProps = { lat: 0, lng: 0 };

      const getCurrentLocation = (): void => {
        navigator.geolocation.getCurrentPosition((position) => {
          // console.log("current latitude: ",position.coords.latitude);
          // console.log("current longitude: ",position.coords.longitude);

          currentLocation.lat = position.coords.latitude;
          currentLocation.lng = position.coords.longitude;
        });
      };

      const arePointsNear = (
        userLocation: LocationProps,
        hcShopLocation: LocationProps,
        km: number
      ): boolean => {
        const ky = 40000 / 360;
        const kx = Math.cos((Math.PI * hcShopLocation.lat) / 180.0) * ky;
        const dx = Math.abs(hcShopLocation.lng - userLocation.lng) * kx;
        const dy = Math.abs(hcShopLocation.lat - userLocation.lat) * ky;
        return Math.sqrt(dx * dx + dy * dy) <= km;
      };

      if (!payloadShop.beenTo) {
        getCurrentLocation();
        if (arePointsNear(currentLocation, testLocation, 10)) {
          payloadShop.beenTo = true;
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

      // payloadShop.beenTo
      //   ? alert("You've already been to this place! How was their hot chocolate?")
      //   : arePointsNear(currentLocation, testLocation, 10) ? (payloadShop.beenTo = true) : alert("Come closer to the shop and treat yourself with a warm hot chocolate😉")

      // state.shops.map((shop) => {
      //   return shop.shopName === payloadShop.shopName
      //     ? (shop = payloadShop)
      //     : shop;
      // });
    },
  },
});

export const { setReduxState, changeIsFav, changeBeenTo } = shopSlice.actions;

export default shopSlice.reducer;
