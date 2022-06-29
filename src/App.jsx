import * as React from "react";
import {Routes, Route} from "react-router-dom";
import "./App.css";
import {Slide} from "./Components/Pages/Slide/Slide";
import {DocumentList} from "./Components/Pages/DocumentList/DocumentList";
import {Login} from "./Components/Pages/login/Login" ;

export const App = () => {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<DocumentList />} />
                {/*<Route path="about" element={<Login />} />*/}
                {/*<Route path="about" element={<Document />} />*/}
                <Route path="slide" element={<Slide/>}/>
                <Route path="login" element={<Login/>}/>
            </Routes>
        </div>
    );
}