import { initializeApp } from "firebase/app"
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyBSKvjs3I8ERqBqtI9KGZ9TA16I-6Ln-6I",
    authDomain: "circus-4e596.firebaseapp.com",
    projectId: "circus-4e596",
    storageBucket: "circus-4e596.appspot.com",
    messagingSenderId: "715557443674",
    appId: "1:715557443674:web:913563aae230de2224a063"
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const provider = new GoogleAuthProvider()

export { auth, provider, signInWithPopup }