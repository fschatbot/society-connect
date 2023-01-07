// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { equalTo, getDatabase, onValue, push, query, ref, remove, set, update } from "firebase/database";
import { getAnalytics } from "firebase/analytics";
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
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const DB = new getDatabase();

const refer = (_ref) => ref(DB, _ref);

function LiveGet(_ref, func) {
	return onValue(refer(_ref), func);
}

function Get(_ref, func) {
	return onValue(refer(_ref), func, { onlyOnce: true });
}

function Set(_ref, value) {
	return set(refer(_ref), value);
}
function Update(_ref, data, _child = null) {
	return update(refer(_ref), data);
}
function Remove(_ref) {
	remove(refer(_ref));
}
function Push(_ref, data) {
	return push(refer(_ref), data);
}

export default DB;
export { refer, LiveGet, Get, Set, Update, Remove, DB, Push };
