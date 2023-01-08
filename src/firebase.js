// Import the functions you need from the SDKs you need
import firebase from "firebase/app";
import "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyAJUdnQ8I2K6Ekt8qFoo0TNzLdOQ9h8tC8",
	authDomain: "society-connect-fd846.firebaseapp.com",
	databaseURL: "https://society-connect-fd846-default-rtdb.asia-southeast1.firebasedatabase.app",
	projectId: "society-connect-fd846",
	storageBucket: "society-connect-fd846.appspot.com",
	messagingSenderId: "825838398347",
	appId: "1:825838398347:web:14ff8ab330f59fdb76dd8e",
	measurementId: "G-4M1WG4WJEJ",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const DB = firebase.database(app);

function LiveGet(_ref, func) {
	return DB.ref(_ref).on("value", func);
}
function Get(_ref, func) {
	// Returns a promise
	return DB.ref(_ref).once("value");
}
function Set(_ref, value, callback = undefined) {
	return DB.ref(_ref).set(value, callback);
}
function Update(_ref, value, callback = undefined) {
	return DB.ref(_ref).update(value, callback);
}
function Remove(_ref) {
	// Returns a promise
	return DB.ref(_ref).remove();
}
function Push(_ref, data) {
	// Returns a promise (works as a ref too)
	return DB.ref(_ref).push(data);
}

const accounts_scheme = {
	username: "", // Username of the person
	building: "", // EX: B404, C405
	password: "", // Either plain, base64 or sha256
	liked: [], // List of post ids that the person liked
	disliked: [], // List of post ids that the person disliked
	PFP: "", // URL to the profile picture
	posts: [], // List of posts made by the person
};

const post_scheme = {
	author: "", // Authors post ID
	title: "", // Title of the post
	description: "", // Description of the post
	liked: 0, // Liked by
	disliked: 0, // Disliked by
	anonymous: false, // Boleean value
};

async function isLoggedIn() {
	const ID = localStorage.getItem("user");
	// Returns a promise that resolves to false
	if (!ID) return new Promise((resolve) => resolve(false));

	return DB.ref(`accounts/${ID}`)
		.once("value")
		.then((snap) => snap.exists());
}

export default DB;
export { DB, isLoggedIn, LiveGet, Get, Set, Push, Update, Remove };
