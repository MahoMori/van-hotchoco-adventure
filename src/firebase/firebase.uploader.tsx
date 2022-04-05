// #######################
// データをFirestoreに送る
// jsonデータをmapして送信
// #######################

import React, { useEffect } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "./firebase.util";

import shopInfo from "./shop-info.json";
import { JsonProps } from "../assets/tsInterface";

const FirebaseUploader = () => {
  const writeShopInfo = async (...args: JsonProps[]) => {
    try {
      const {
        shopName,
        flavours,
        eachStoreInfo,
        websiteUrl,
        filtering,
        isFav,
      } = args[0];
      await addDoc(collection(db, "shop-info"), {
        shopName,
        flavours,
        eachStoreInfo,
        websiteUrl,
        filtering,
        isFav,
      });
    } catch {
      console.log("Something went wrong.");
    }
  };

  useEffect(() => {
    shopInfo.map((shop) => {
      writeShopInfo(shop);
    });
  }, []);

  return <div></div>;
};

export default FirebaseUploader;
