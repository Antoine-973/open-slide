import firebaseConfig from "./firebaseConfig.json" ;
import {getDatabase} from "firebase/database";
import {getAuth, GoogleAuthProvider, signInWithPopup, setPersistence, browserLocalPersistence} from "firebase/auth";
import {initializeApp} from "firebase/app";

initializeApp(firebaseConfig) ;

export const auth = getAuth();
export const db = getDatabase();

export const signInWithGoogle = async () => {
    try {
         await setPersistence(auth, browserLocalPersistence ).then( async ()=> {
            const provider = new GoogleAuthProvider();
            provider.setCustomParameters({ prompt: 'select_account' });

             return await signInWithPopup(auth,provider).then(user => {
                console.log("User is logged in !" + user) ;
            });
        }) ;
         return getUser() ;
    }catch (error) {
        console.log(error);
    }
}

export const getUser = () => { return auth?.currentUser ?? null };


