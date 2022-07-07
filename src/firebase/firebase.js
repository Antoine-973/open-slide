import firebaseConfig from "./firebaseConfig.json" ;
import firebase from "firebase/compat";

firebase.initializeApp(firebaseConfig) ;

export const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => {
    try {
        auth.signInWithPopup(provider).then(r => {
            window.location.href = "/";
        });
    }catch (error) {
        console.log(error);
    }
}

export default firebase;


