// #######################
// データをFirestoreに送る
// jsonデータをmapして送信
// #######################

import React, { useEffect } from "react";
import { doc, setDoc } from "firebase/firestore";
import { db } from "./firebase.util";

import usersData from "./users.json";

const FirebaseUploader = () => {
  // Add a new document in collection "cities"
  const writeUserData = async (userId: string, name: string, email: string) => {
    await setDoc(doc(db, "users", userId), {
      name,
      email,
    });
  };
  useEffect(() => {
    usersData.map((user) => {
      writeUserData(user.userId, user.name, user.email);
    });
  }, []);

  return <div></div>;
};

export default FirebaseUploader;
