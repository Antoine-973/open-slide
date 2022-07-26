import {createContext, useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import firebase from "../../firebase/firebase" ;

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {

    const navigate = useNavigate() ;
    const [auth,setAuth] = useState({loading:true, data:null}) ;
    const setAuthData =  (data) =>  {
        setAuth({loading:false, data:data}) ;
        console.log(auth) ;
    }
    useEffect(() => {
        if(auth.data === null){
            navigate('login') ;
        }
    },[auth]) ;

    return <AuthContext.Provider value={{ auth, setAuthData }}>{children}</AuthContext.Provider>
};

export default AuthProvider ;

