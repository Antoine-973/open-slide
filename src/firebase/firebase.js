import {initializeApp} from "firebase/app" ;
import {GoogleAuthProvider, onAuthStateChanged, getAuth, signInWithPopup} from "firebase/auth" ;
import firebaseConfig from "./firebaseConfig.json" ;

const googleProvider = new GoogleAuthProvider() ;
let user ;
let accessToken ;
const app = initializeApp(firebaseConfig) ;
const auth = getAuth(app);

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

