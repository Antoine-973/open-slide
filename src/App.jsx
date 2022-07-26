import * as React from "react";
import {Routes, Route} from "react-router-dom";
import "./App.css";
import {Slide} from "./Components/Pages/Slide/Slide";
import {DocumentList} from "./Components/Pages/DocumentList/DocumentList";
import {Login} from "./Components/Pages/login/Login" ;
import {AuthProvider} from "./Components/Provider/AuthProvider";


export const App = () => {

    return (
        <div className="App">
            <AuthProvider >
                <Routes>
                    <Route  path="slide" element={<Slide/>}/>
                    <Route  path="/" element={<DocumentList/>}/>
                    <Route path="login"  element={<Login/>}/>
                </Routes>
            </AuthProvider>
        </div>

    );
}