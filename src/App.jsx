import * as React from "react";
import { Routes, Route, Link } from "react-router-dom";
import "./App.css";
import {Presentation} from "./Components/Pages/Slide/Presentation";

export const App = () => {
  return (
      <div className="App">
        <Routes>
          {/*<Route path="/" element={<Home />} />*/}
          {/*<Route path="about" element={<Login />} />*/}
          {/*<Route path="about" element={<Document />} />*/}
          <Route path="presentation" element={<Presentation />} />
        </Routes>
      </div>
  );
}