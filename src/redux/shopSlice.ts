import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { JsonProps, ReduxState } from "../assets/tsInterface";

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

    changeBeenTo: (state, action: PayloadAction<JsonProps>) => {
      const payloadShop = action.payload;

      payloadShop.beenTo
        ? (payloadShop.beenTo = false)
        : (payloadShop.beenTo = true);

      state.shops.map((shop) => {
        return shop.shopName === payloadShop.shopName
          ? (shop = payloadShop)
          : shop;
      });
    },
  },
});

export const { setReduxState, changeIsFav, changeBeenTo } = shopSlice.actions;

export default shopSlice.reducer;
