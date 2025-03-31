import { initializeApp } from "firebase/app";
import { connectAuthEmulator, getAuth } from "firebase/auth";
import { connectFirestoreEmulator, getFirestore, } from "firebase/firestore";
import { connectFunctionsEmulator, getFunctions, } from "firebase/functions";
const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
};
const modules = (() => {
    try {
        const app = initializeApp(firebaseConfig);
        const auth = getAuth(app);
        const firestore = getFirestore(app);
        const functions = getFunctions(app);
        if (process.env.NODE_ENV !== "production") {
            const currentHost = window.location.hostname;
            connectAuthEmulator(auth, `http://${currentHost}:9099`);
            connectFirestoreEmulator(firestore, currentHost, 8080);
            connectFunctionsEmulator(functions, currentHost, 5001);
        }
        return {
            app,
            auth,
            firestore,
            functions,
        };
    }
    catch (e) {
        console.warn(`Failed to initialize Firebase: ${e}`);
    }
    return {
        app: null,
        auth: null,
        firestore: null,
        functions: null,
    };
})();
export const app = modules.app;
export const auth = modules.auth;
export const firestore = modules.firestore;
export const functions = modules.functions;
//# sourceMappingURL=firebase.js.map