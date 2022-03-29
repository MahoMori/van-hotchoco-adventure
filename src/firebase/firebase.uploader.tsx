// #######################
// データをFirestoreに送る
// jsonデータをmapして送信
// #######################

import React, { useEffect } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "./firebase.util";

import shopInfo from "./shop-info.json";

interface jsonProps {
  shopName: string;
  flavours: { flavourName: string; availability: string }[];
  address: string[];
  mapArea: string[];
  websiteUrl: string;
  filtering: {
    takeoutOnly: boolean;
    limitedCafeService: boolean;
    glutenFree: boolean;
    dairyFree: boolean;
    vegan: boolean;
    openLate: boolean;
  };
}

const FirebaseUploader = () => {
  const writeShopInfo = async (...args: jsonProps[]) => {
    try {
      const { shopName, flavours, address, mapArea, websiteUrl, filtering } =
        args[0];
      await addDoc(collection(db, "shop-info"), {
        shopName,
        flavours,
        address,
        mapArea,
        websiteUrl,
        filtering,
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
