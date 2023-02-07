import { useEffect, useState, useRef, memo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { accounts_schema, Get, LiveGet, message_schema, Push, Set, storageRef } from "../../firebase";
import "../../styles/chatPage.css";
import firebase from "firebase/app";
import { Icon } from "@iconify/react";

function ChatPage() {
	const [account, setAccount] = useState(accounts_schema);
	const [messages, setMessages] = useState([]);
	const [newChat, setNewChat] = useState(false);
	const messageInput = useRef();
	const [currMessage, setCurrMessage] = useState("");
	const [currFile, setCurrFile] = useState({
		url: "",
		height: 0,
		width: 0,
	});
	const [file, setFile] = useState(null);
	const { id: participant } = useParams();
	// TODO: Change this to introduce the /society and /building routes
	let participants = [localStorage.user, participant].sort();
	const chatLocation = `messages/${participants[0]}|${participants[1]}`;

	// Fetching participant's data
	useEffect(() => {
		const capitalizeFirstAlphabet = (string) => string.substring(0, 1).toUpperCase() + string.substring(1);
		
		if (participant !== "society" && participant !== "building")
			Get(`accounts/${participant}`).then((snap) => {
				const account = snap.val();
				account.id = snap.key;
				setAccount(account);
			});
		else
			setAccount({
				username: capitalizeFirstAlphabet(participant),
				PFP: "https://media.istockphoto.com/id/935695192/vector/office-building-outline-icon-pixel-perfect.jpg?s=170667a&w=0&k=20&c=A3-wNyF3DOdmRYYb_FI-4mY3jCog0jI0Mb6ijLFU7YY=",
			});
	}, [participant]);

	// Fetching messages
	useEffect(() => {
		LiveGet(chatLocation, (snap) => {
			if (!snap.exists()) {
				setNewChat(true);
				return;
			} else setNewChat(false);
			let messages = [];
			snap.forEach((snapChild) => {
				let data = snapChild.val();
				data.id = snapChild.key;
				messages.push(
					Get(`accounts/${data.author}/PFP`).then((PFP) => {
						data.PFP = PFP.val();
						return data;
					})
				);
			});
			Promise.all(messages).then(setMessages);
		});
	}, [participant, chatLocation]);

	// Sending the messages
	const sendMessage = async () => {
		if (currMessage === "" && !currFile.url) return;
		messageInput.current.value = "";

		let data = message_schema;
		data.message = currMessage;
		data.author = localStorage.user;
		data.timestamp = firebase.database.ServerValue.TIMESTAMP;
		// Set a shiny gray file url temporarily
		if (currFile.url)
			data.file = {
				url: `https://singlecolorimage.com/get/4ade80/${currFile.width}x${currFile.height}`,
				height: currFile.height,
				width: currFile.width,
			};

		Push(chatLocation, data).then((snap) => {
			setCurrMessage("");
			setCurrFile({});
			setFile(null);

			if (currFile.url) {
				const imageRef = storageRef.child(`${participants[0]}|${participants[1]}/${snap.key}`);
				imageRef
					.put(file)
					.then(() => imageRef.getDownloadURL())
					.then((url) => Set(`${chatLocation}/${snap.key}/file/url`, url));
			}
		});
	};

	function checkEnter(callback) {
		return (e) => {
			if (e.key === "Enter") callback();
		};
	}

	function updateMessage() {
		setCurrMessage(messageInput.current.value);
	}

	function addFile() {
		let fileInput = document.createElement("input");
		fileInput.type = "file";
		fileInput.accept = "image/*";
		fileInput.onchange = (e) => {
			let file = e.target.files[0];
			if (!file) return;
			if (file.size > 10_000_000) return alert("File too large! (Max 10MB)");
			if (!file.type.includes("image")) return alert("File is not an image!");
			setFile(file);
			console.log("File validated");

			let reader = new FileReader();
			reader.onload = (e) => {
				console.log("File read!");

				let img = new Image();
				img.onload = () => {
					console.log("Image dimensions aquired!");
					setCurrFile({ url: e.target.result, height: img.height, width: img.width });
				};
				img.src = e.target.result;
			};
			reader.readAsDataURL(file);
		};
		fileInput.click();
	}

	return (
		<div className="chatPage">
			<ChatNav account={account} />
			<div className="messages">
				{newChat && <h1 className="firstMessageHeader">Send the first message!! 😊</h1>}

				{messages.map((data) => {
					return <Message message={data} key={data.id} />;
				})}

				{(currFile.url || currMessage) && <Message message={{ message: currMessage, timestamp: Date.now(), file: currFile, author: localStorage.user }} preview={true} />}
			</div>
			<div className="messageInput">
				<button className="addFile" onClick={addFile}>
					<Icon icon="material-symbols:attach-file-add-rounded" />
				</button>
				<input type="text" placeholder="Type a message" onKeyUp={checkEnter(sendMessage)} onKeyUpCapture={updateMessage} ref={messageInput} />
				<button className="send" onClick={sendMessage}>
					<Icon icon="carbon:send-filled" />
				</button>
			</div>
		</div>
	);
}

const Message = memo(({ message, preview }) => {
	let time = new Date(message.timestamp).toLocaleTimeString("en-US", {
		hour: "numeric",
		minute: "numeric",
		hour12: true,
	});
	const containerClass = `messageBox ${message.author === localStorage.user ? "self" : "other"} ${preview ? "preview" : ""}`;
	const { url, height, width } = message.file;
	const img_style = { "--url": `url("${url}")`, "--ratio": `${(height / width) * 100}%` };

	return (
		<div key={message.id} className={containerClass}>
			{message.file.url && <div className="img" style={img_style} />}
			{message.message && <p>{message.message}</p>}
			<span className="timestamp">{time}</span>
		</div>
	);
});

const ChatNav = memo(({ account }) => {
	const navigate = useNavigate();
	return (
		<nav>
			<Icon icon="material-symbols:arrow-back-ios-new-rounded" onClick={() => navigate(-1)} />
			<div className="account">
				<div className="PFP" style={{ "--pfp": `url(${account.PFP})` }}></div>
				<h1>{account.username}</h1>
			</div>
		</nav>
	);
});

export default ChatPage;
