import { Outlet } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import React, { createContext, useContext } from "react";
import { useState } from "react";

export const userInfoContext = createContext([]);

function App() {
  const [userInfo, setUserInfo] = useState("");
  return (
    <userInfoContext.Provider value={[userInfo, setUserInfo]}>
      <div className="container">
        <Header></Header>
        <Outlet></Outlet>
      </div>
    </userInfoContext.Provider>
  );
}

export default App;
