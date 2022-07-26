import firebaseConfig from "./firebaseConfig.json" ;
import {getDatabase} from "firebase/database";
import {getAuth, GoogleAuthProvider, signInWithPopup} from "firebase/auth";
import {initializeApp} from "firebase/app";

initializeApp(firebaseConfig) ;

export const auth = getAuth();

const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export const db = getDatabase();

export const signInWithGoogle = () => {
    try {
        return signInWithPopup(auth,provider).then(user => {
            return user ;
        });
    }catch (error) {
        console.log(error);
    }
    return null ;
}


