import { initializeApp } from "firebase/app";
import { getFirestore, collection } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyCm0ZLTHGqA093V63-wcc7h5_3308v_Fco",
    authDomain: "filmyverse-70581.firebaseapp.com",
    projectId: "filmyverse-70581",
    storageBucket: "filmyverse-70581.appspot.com",
    messagingSenderId: "778617961879",
    appId: "1:778617961879:web:c6f06005d08dc734c058d2"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const moviesRef = collection(db, 'movies')
export const reviewsRef = collection(db, 'reviews')
export const usersRef = collection(db, "users");

export default app;