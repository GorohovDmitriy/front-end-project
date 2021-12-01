import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth'


const firebaseConfig = {
	apiKey: "AIzaSyCEtsmzaE51IH7f3FQvHrdqXVcfado2NxE",
	authDomain: "reviews-8ab02.firebaseapp.com",
	projectId: "reviews-8ab02",
	storageBucket: "reviews-8ab02.appspot.com",
	messagingSenderId: "5514614755",
	appId: "1:5514614755:web:55182f8d01c5e67cdbb2d6",
	measurementId: "G-WPCLQTJ5M7"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)

export const providerGoogle = new GoogleAuthProvider()

