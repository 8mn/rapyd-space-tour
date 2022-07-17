// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

import {
	GoogleAuthProvider,
	getAuth,
	signInWithPopup,
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
	sendPasswordResetEmail,
	signOut,
} from "firebase/auth";

import {
	getFirestore,
	query,
	getDocs,
	collection,
	where,
	addDoc,
	setDoc,
	doc,
} from "firebase/firestore";
import toast from "react-hot-toast";

const firebaseConfig = {
	apiKey: "AIzaSyD6XN80hdyrpydYhIU_nV69ILkOJk689mA",

	authDomain: "rapyd-space-tour.firebaseapp.com",

	projectId: "rapyd-space-tour",

	storageBucket: "rapyd-space-tour.appspot.com",

	messagingSenderId: "470419423624",

	appId: "1:470419423624:web:3d99fffb5dac6d66b17a3d",

	measurementId: "G-PNDWGY16B4",
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);

const storage = getStorage(app);

const googleProvider = new GoogleAuthProvider();
const signInWithGoogle = async () => {
	try {
		const res = await signInWithPopup(auth, googleProvider);
		const user = res.user;
		const q = query(collection(db, "users"), where("uid", "==", user.uid));
		const docs = await getDocs(q);
		if (docs.docs.length === 0) {
			await setDoc(doc(db, "users", user.uid), {
				uid: user.uid,
				name: user.displayName,
				authProvider: "google",
				email: user.email,
				wallet_id: "",
				depositPaid: false,
			});
		}
	} catch (error) {
		console.log(error);
		alert(error.message);
	}
};

const logInWithEmailAndPassword = async (email, password) => {
	try {
		await signInWithEmailAndPassword(auth, email, password);
	} catch (error) {
		console.log(error);
		toast.error(error.message);
	}
};

const registerWithEmailAndPassword = async (name, email, password) => {
	try {
		const res = await createUserWithEmailAndPassword(auth, email, password);
		const user = res.user;
		await setDoc(doc(db, "users", user.uid), {
			uid: user.uid,
			name,
			authProvider: "local",
			email,
			wallet_id: "",
			depositPaid: false,
		});
	} catch (error) {
		console.log(error.message);
		toast.error(error.message);
	}
};

const sendPasswordReset = async (email) => {
	try {
		await sendPasswordResetEmail(auth, email);
	} catch (error) {
		console.log(error);
		alert(error.message);
	}
};

const logout = () => {
	signOut(auth);
};

export {
	auth,
	db,
	signInWithGoogle,
	logInWithEmailAndPassword,
	registerWithEmailAndPassword,
	sendPasswordReset,
	logout,
	storage,
};
