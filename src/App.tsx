import React, { useEffect, useState } from "react";

import { Routes, Route, Link, useLocation, useParams } from "react-router-dom";

import MapComponent from "./components/map/MapComponent";
import ShopList from "./components/shop-list/ShopList";
import UserGuide from "./components/user-guide/UserGuide";

// ------ json data ------
import shopListData from "./firebase/shop-info.json";

// ------ redux ------
import { useDispatch, useSelector } from "react-redux";
import { setReduxState } from "./redux/shopSlice";

// ------ TS interface ------
import { JsonProps } from "./assets/tsInterface";

// ------ upload json data to firebase ------
import FirebaseUploader from "./firebase/firebase.uploader";
import { TStore } from "./redux/store";

// ------ styled component ------
import { Footer, Nav, StyledLink, Title } from "./App.style";

function App() {
  // ------ redux ------
  const dispatch = useDispatch();
  const shops = useSelector((state: TStore) => state.shops.shops);

  useEffect(() => {
    console.log("shopListData: ", shopListData);

    dispatch(setReduxState(shopListData));
    console.log("shops: ", shops);
  }, []);

  // ------ change nav color depending on page showing ------
  const location = useLocation();
  const [page, setPage] = useState<string>(location.pathname);

  useEffect(() => {
    setPage(location.pathname);
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
          <StyledLink to="/" isOnPage={page === "/" ? true : false}>
            Map
          </StyledLink>
          <StyledLink
            to="/shop-list"
            isOnPage={page === "/shop-list" ? true : false}
          >
            Shop List
          </StyledLink>
          <a
            href="https://hotchocolatefest.com/"
            target="_blank"
            rel="noreferrer"
          >
            Official Website
          </a>
          <StyledLink
            to="/user-guide"
            isOnPage={page === "/user-guide" ? true : false}
          >
            User Guide
          </StyledLink>
        </Nav>
      </Footer>
    </div>
  );
}

export default App;
