import { getApp, getApps, initializeApp } from "firebase/app"
import { applyActionCode, confirmPasswordReset, getAuth, inMemoryPersistence, sendEmailVerification, sendPasswordResetEmail, setPersistence, signInWithEmailAndPassword, signOut, type User } from "firebase/auth"

/* The client firebase variables are safe to expose to client */
const firebaseConfig = {
    apiKey: 'AIzaSyCLjKmfyW7_kOJwNKCNcbFgPZzU9sXSgVo',
    authDomain: 'therajournalapp-27753.firebaseapp.com',
    projectId: 'therajournalapp-27753',
    storageBucket: 'therajournalapp-27753.appspot.com',
    messagingSenderId: '231713676923',
    appId: '1:231713676923:web:3044d6c560bba4246eccde'
}

export const getClientApp = () => {
    if (getApps().length) return getApp()
    const app = initializeApp(firebaseConfig)
    const auth = getAuth(app)
    setPersistence(auth, inMemoryPersistence)
    return app
}

export async function signIn(email: string, password: string) {
    return signInWithEmailAndPassword(fb_auth, email, password)
}

export const firebase = getClientApp()
export const fb_auth = getAuth(firebase);