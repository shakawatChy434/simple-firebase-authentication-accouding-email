import { initializeApp } from "firebase/app";
import firebaseConfig from "./Firebase.cofig";


const initializeaAuthentication = () => {
    initializeApp(firebaseConfig);
}

export default initializeaAuthentication;