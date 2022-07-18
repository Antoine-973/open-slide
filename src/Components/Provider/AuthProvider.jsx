import {createContext, useContext, useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import firebase from "firebase/compat";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    useEffect(() => {
        firebase.auth().onAuthStateChanged(user => {
            console.log("user", user);
            setUser(user);
        })
    }, [])

    console.log(firebase);
    /* Delete user if token is not present */
    useEffect(() => {
        console.log(token);
        if (!token) {
            setUser(null);
        }
    }, [token])

    useEffect(() => {
        if (user?.auth?.currentUser.accessToken) {
            navigate("/");
        }else {
            navigate("/login")
        }
    }, [user])

    return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    return useContext(AuthContext);
};