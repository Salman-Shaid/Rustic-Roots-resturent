
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyD_tUQCzBNmLtKP_CHcejQv-cX5u_U18vY",
    authDomain: "assignment11-6503f.firebaseapp.com",
    projectId: "assignment11-6503f",
    storageBucket: "assignment11-6503f.firebasestorage.app",
    messagingSenderId: "637795105964",
    appId: "1:637795105964:web:d3dbc1a707764aa4a63309"
  };


const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
export default auth