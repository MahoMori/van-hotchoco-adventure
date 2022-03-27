// #######################
// データをFirestoreに送る
// jsonデータをmapして送信
// #######################

import React, { useEffect } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "./firebase.util";

import usersData from "./users.json";

const FirebaseUploader = () => {
  // Add a new document in collection "cities"
  const writeUserData = async (userId: string, name: string, email: string) => {
    try {
      await addDoc(collection(db, "users"), {
        name,
        email,
      });
    } catch {
      console.log("Something went wrong.");
    }
  };
  useEffect(() => {
    usersData.map((user) => {
      writeUserData(user.userId, user.name, user.email);
    });
  }, []);

  return <div></div>;
};

export default FirebaseUploader;
