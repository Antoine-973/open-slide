import {initializeApp} from "firebase/app" ;
import {GoogleAuthProvider, onAuthStateChanged, getAuth, signInWithPopup} from "firebase/auth" ;
import firebaseConfig from "./firebaseConfig.json" ;

const googleProvider = new GoogleAuthProvider() ;
let user ;
let accessToken ;
const auth = getAuth();
const app = initializeApp(firebaseConfig) ;

export default async function login(callback) {
    try {
        const result = await signInWithPopup(auth,googleProvider);
        if (result) {
            accessToken = GoogleAuthProvider.credentialFromResult(result).accessToken ;
            user = result.user ;
            callback(user) ;
        }
    } catch (error) {
        console.error(error) ;
    }


}

