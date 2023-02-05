// Import the functions you need from the SDKs you need
import firebase from "firebase/app";
import "firebase/database";
import "firebase/storage";
// import "firebase/app-check";

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
const storage = firebase.storage(app);
const storageRef = storage.ref();
// const appCheck = firebase.appCheck();
// appCheck.activate("6LfG7UMkAAAAALPNSbhBLVhdvciBHT_tOwclnqNZ", true);

export { DB, storageRef };

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

export { LiveGet, Get, Set, Push, Update, Remove };

async function isLoggedIn() {
	const ID = localStorage.getItem("user");
	// Returns a promise that resolves to false
	if (!ID) return new Promise((resolve) => resolve(false));

	return Get(`accounts/${ID}`).then((snap) => snap.exists());
}

async function currentAccount() {
	// Returns the current logged in accounts data

	return isLoggedIn().then((loggedIn) => {
		if (!loggedIn) return accounts_schema;

		const ID = localStorage.getItem("user");
		return Get(`accounts/${ID}`).then((snap) => snap.val());
	});
}
export { isLoggedIn, currentAccount };

const accounts_schema = {
	username: "", // Username of the person
	building: "", // EX: B404, C405
	password: "", // Either plain, base64 or sha256
	liked: [], // List of post ids that the person liked
	disliked: [], // List of post ids that the person disliked
	PFP: "", // URL to the profile picture
	posts: [], // List of posts made by the person
	bio: "", // Short bio that is to be displayed
};

const post_schema = {
	author: "", // Author's post ID
	title: "", // Title of the post
	description: "", // Description of the post
	liked: 0, // Liked by
	disliked: 0, // Disliked by
	anonymous: false, // Boleean value
	image: "", // URL to the image
};

const message_schema = {
	message: "",
	author: "",
	timestamp: 0, // Date.now()
	file: {
		url: "", // null | file link (Firebase Storage)
		height: 0, // 0 | height of the image
		width: 0, // 0 | width of the image
	},
};

export { message_schema, post_schema, accounts_schema };
