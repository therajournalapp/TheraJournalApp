import { getApp, getApps, initializeApp } from "firebase/app"
import retry from 'async-retry';
import { browserSessionPersistence, confirmPasswordReset, getAuth, sendEmailVerification, sendPasswordResetEmail, setPersistence, signInWithEmailAndPassword, signOut as fbSignOut, type User } from "firebase/auth"
import { signOut as luciaSignOut } from "@lucia-auth/sveltekit/client";


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
    // setPersistence(auth, inMemoryPersistence)
    setPersistence(auth, browserSessionPersistence)
    return app
}

export async function getCurrentUser() {
    let user = getAuth(firebase).currentUser;

    try {
        if (user == null) {
            await retry(
                async () => {
                    user = getAuth(firebase).currentUser
                    if (!user) {
                        throw Error;
                    }
                },
                {
                    retries: 10,
                    minTimeout: 10
                })
        }
    }
    catch {
        user = null
    }

    return user
}

export async function getEmailVerifiedStatus() {
    const user = await getCurrentUser()
    return user?.emailVerified
}

export async function signIn(email: string, password: string) {
    return signInWithEmailAndPassword(fb_auth, email, password)
}

export async function signOut() {
    await luciaSignOut()
    return fbSignOut(fb_auth);
}

export async function sendVerificationEmail(redirect: string) {
    const actionCodeSettings = {
        url: redirect
    }

    const user = await getCurrentUser()

    if (user) {
        return sendEmailVerification(user, actionCodeSettings)
    }
    else {
        return null
    }
}

export async function sendVerificationEmailWithUser(redirect: string, user: User) {
    if (redirect.startsWith("127.0.0.1")) {
        return sendEmailVerification(user)
    }

    const actionCodeSettings = {
        url: redirect
    }
    return sendEmailVerification(user, actionCodeSettings)
}

export async function getCurrentUserEmail() {

    const user = await getCurrentUser()
    return user?.email
}

export const firebase = getClientApp()
export const fb_auth = getAuth(firebase)