import React from "react";
import "./App.css";

import { Routes, Route, Link } from "react-router-dom";

import MapComponent from "./components/map/MapComponent";
import ShopList from "./components/shop-list/ShopList";
import UserGuide from "./components/user-guide/UserGuide";

import FirebaseUploader from "./firebase/firebase.uploader";

function App() {
  return (
    <div className="App">
      <header>
        <h1>Vancouver Hot Chocolate Adventure 2022</h1>
      </header>

      <main>
        <FirebaseUploader />
        <Routes>
          <Route path="/" element={<MapComponent />} />
          <Route path="/shop-list" element={<ShopList />} />
          <Route path="/user-guide" element={<UserGuide />} />
        </Routes>
      </main>

      <footer>
        <nav>
          <Link to="/">Map</Link>
          <Link to="/shop-list">Shop List</Link>
          <a
            href="https://hotchocolatefest.com/"
            target="_blank"
            rel="noreferrer"
          >
            Official Website
          </a>
          <Link to="/user-guide">User Guide</Link>
        </nav>
      </footer>
    </div>
  );
}

export default App;
