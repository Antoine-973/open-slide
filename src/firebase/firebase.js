import firebaseConfig from "./firebaseConfig.json" ;
import firebase from "firebase/compat";

firebase.initializeApp(firebaseConfig) ;

export const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => {
    try {
        return auth.signInWithPopup(provider).then(user => {
            return user ;
        });
    }catch (error) {
        console.log(error);
    }
    return null ;
}

export default firebase;


