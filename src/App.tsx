import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation, Link } from "react-router-dom";

// ------ icon ------
import { HiOutlineExternalLink } from "react-icons/hi";

// ------ redux ------
import { useDispatch, useSelector } from "react-redux";
import { setReduxState } from "./redux/shopSlice";

// ------ upload json data to firebase ------
import FirebaseUploader from "./firebase/firebase.uploader";
import { TStore } from "./redux/store";

// ------ get data from firebase ------
import { Footer, Nav, StyledLink, Title } from "./App.style";
import { db } from "./firebase/firebase.util";

// ------ components ------
import MapComponent from "./components/map/MapComponent";
import ShopList from "./components/shop-list/ShopList";
import UserGuide from "./components/user-guide/UserGuide";

// ------ styled component ------
import {
  collection,
  DocumentData,
  getDocs,
  QuerySnapshot,
} from "@firebase/firestore";

function App() {
  // ------ redux, getting data from firebase ------
  const dispatch = useDispatch();
  const shops = useSelector((state: TStore) => state.shops.shops);

  const getDataFromFirebase = async () => {
    try {
      const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(
        collection(db, "shop-info")
      );
      querySnapshot.forEach((doc: { data: () => any }) => {
        const data = doc.data();
        dispatch(
          setReduxState({
            shopName: data.shopName,
            flavours: data.flavours,
            eachStoreInfo: data.eachStoreInfo,
            websiteUrl: data.websiteUrl,
            filtering: data.filtering,
            isFav: data.isFav,
          })
        );
      });
      console.log(shops);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getDataFromFirebase();

    // dispatch(setReduxState(shopListData));
    console.log("shops: ", shops);
  }, []);

  // ------ change nav color depending on page showing ------
  const location = useLocation();
  const [page, setPage] = useState<string>(location.pathname);

  useEffect(() => {
    setPage(location.pathname);
    console.log(location);
  }, [location]);

  return (
    <div className="App">
      <header>
        <Title>Vancouver Hot&nbsp;Chocolate Adventure 2022</Title>
      </header>

      <main>
        {/* <FirebaseUploader /> */}

        <Routes>
          <Route path="/" element={<MapComponent />} />
          <Route path="/shop-list" element={<ShopList />} />
          <Route path="/user-guide" element={<UserGuide />} />
        </Routes>
      </main>

      <Footer>
        <Nav>
          <Link
            to="/"
            // isOnPage={page === "/" ? true : false}
            style={
              page === "/"
                ? { background: "#c70000", color: "#fff" }
                : { color: "#c70000", background: "#fff" }
            }
          >
            Map
          </Link>
          <Link
            to="/shop-list"
            // isOnPage={page === "/shop-list" ? true : false}
            style={
              page === "/shop-list"
                ? { background: "#c70000", color: "#fff" }
                : { color: "#c70000", background: "#fff" }
            }
          >
            Shop List
          </Link>
          <a
            href="https://hotchocolatefest.com/"
            target="_blank"
            rel="noreferrer"
          >
            Official Website
            <HiOutlineExternalLink />
          </a>
          <Link
            to="/user-guide"
            // isOnPage={page === "/user-guide" ? true : false}
            style={
              page === "/user-guide"
                ? { background: "#c70000", color: "#fff" }
                : { color: "#c70000", background: "#fff" }
            }
          >
            User Guide
          </Link>
        </Nav>
      </Footer>
    </div>
  );
}

export default App;
