import {createContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {getUser, auth as Auth} from "../../firebase/firebase";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {

    const navigate = useNavigate() ;
    const [loader,setLoader] = useState(true) ;
    const [auth,setAuth] = useState() ;
    const setAuthData =  () =>  {
        setAuth(getUser) ;
        console.log(auth) ;
    }

    useEffect(()=>{
        Auth.onAuthStateChanged((user) => {
            if(user) {
                setAuth(user) ;
                setLoader(false) ;
            }
        })
    },[auth]) ;

    useEffect(() => {
        if(!loader) {
            if( getUser() === null ){
                navigate('login') ;
            }
        }
    },[auth,loader]) ;

    return <AuthContext.Provider value={{ auth, setAuthData }}>
        {
            loader === true ?  'JE CHARGE ZEUBI' :  children
        }
    </AuthContext.Provider>
};

export default AuthProvider ;

