import * as React from "react";
import { Routes, Route, Link } from "react-router-dom";
import "./App.css";
import {Slide} from "./Components/Pages/Slide/Slide";

export const App = () => {
  return (
      <div className="App">
        <h1>Welcome to React Router!</h1>
        <Routes>
          {/*<Route path="/" element={<Home />} />*/}
          {/*<Route path="about" element={<Login />} />*/}
          {/*<Route path="about" element={<Document />} />*/}
          <Route path="slide" element={<Slide />} />
        </Routes>
      </div>
  );
}