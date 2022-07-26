import {createContext, useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import firebase from "../../firebase/firebase" ;

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {

    const token = localStorage.getItem('open-slide-auth-token') ;
    const navigate = useNavigate() ;
    const [auth,setAuth] = useState({loading:true, data:null}) ;
    const setAuthData =  (data) =>  {
        setAuth({loading:false, data:data}) ;
        if(data != null) localStorage.setItem('open-slide-auth-token',data?.credential?.accessToken)
        console.log(auth) ;
    }
    useEffect(() => {
        if(!token)
            setAuthData(null) ;
    },[token]) ;
    useEffect(() => {
        if(auth.data === null && !token ){
            navigate('login') ;
        }
    },[auth]) ;

    return <AuthContext.Provider value={{ auth, setAuthData }}>{children}</AuthContext.Provider>
};

export default AuthProvider ;

