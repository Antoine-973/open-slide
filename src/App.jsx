import * as React from "react";
import {Routes, Route, useNavigate} from "react-router-dom";
import "./App.css";
import {Slide} from "./Components/Pages/Slide/Slide";
import {DocumentList} from "./Components/Pages/DocumentList/DocumentList";
import {Login} from "./Components/Pages/login/Login" ;
import react, {useEffect, useState} from "react";
import firebase from "firebase/compat";
import {AuthProvider} from "./Components/Provider/AuthProvider";

export const App = () => {
    const [user, setUser] = useState(null);
    const [loaded, setLoaded] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        firebase.auth().onAuthStateChanged(user => {
            setUser(user);
        })
    }, [])

    useEffect(() => {
        setLoaded(true);
    }, [user])

    const ProtectedRoute = ({ user, children }) => {

        if (!loaded) {
            navigate("/login");
        }
        return children;
    };
    return (
        <div className="App">
            <AuthProvider>
                <Routes>
                    <Route path="slide" element={<Slide/>}/>
                    <Route path="/" element={<DocumentList/>}/>
                </Routes>
            </AuthProvider>
            <Routes>
                <Route path="login" element={<Login/>}/>
            </Routes>
        </div>
    );
}