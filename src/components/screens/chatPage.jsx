import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { accounts_schema, Get, LiveGet, message_schema, Push } from "../../firebase";
import "../../styles/chatPage.css";
import { Icon } from "@iconify/react";

function ChatPage() {
	const [account, setAccount] = useState(accounts_schema);
	const [messages, setMessages] = useState([]);
	const [newChat, setNewChat] = useState(false);
	const messageInput = useRef();
	const [currMessage, setCurrMessage] = useState("");
	const [currFile, setCurrFile] = useState(null);
	const { id: participant } = useParams();
	const navigate = useNavigate();
	let participants = [localStorage.user, participant].sort();
	const chatLocation = `messages/${participants[0]}|${participants[1]}`;

	// Fetching participant's data
	useEffect(() => {
		Get(`accounts/${participant}`).then((snap) => {
			const account = snap.val();
			account.id = snap.key;
			setAccount(account);
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
	}, [participant]);

	// Sending the messages
	const sendMessage = async () => {
		const message = messageInput.current.value;
		if (message === "") return;
		messageInput.current.value = "";

		let data = message_schema;
		data.message = message;
		data.author = localStorage.user;
		data.timestamp = Date.now();

		Push(chatLocation, data).then(() => {
			setCurrMessage("");
			setCurrFile(null);
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
			let reader = new FileReader();
			reader.onload = (e) => {
				setCurrFile(e.target.result);
			};
			reader.readAsDataURL(file);
		};
		fileInput.click();
	}

	let currTime = new Date().toLocaleTimeString("en-US", {
		hour: "numeric",
		minute: "numeric",
		hour12: true,
	});

	return (
		<div className="chatPage">
			<nav>
				<Icon icon="material-symbols:arrow-back-ios-new-rounded" onClick={() => navigate(-1)} />
				<div className="account">
					<div className="PFP" style={{ "--pfp": `url(${account.PFP})` }}></div>
					<h1>{account.username}</h1>
				</div>
			</nav>
			<div className="messages">
				{newChat && <h1 className="firstMessageHeader">Send the first message!! 😊</h1>}

				{messages.map((message) => (
					<Message message={message} />
				))}

				{(currFile || currMessage) && <Message message={{ message: currMessage, timestamp: Date.now(), file: currFile, author: localStorage.user }} preview={true} />}
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

function Message({ message, preview }) {
	let time = new Date(message.timestamp).toLocaleTimeString("en-US", {
		hour: "numeric",
		minute: "numeric",
		hour12: true,
	});

	const [ratio, setRatio] = useState(100);

	// Get the image's aspect ratio
	if (message.file) {
		let img = new Image();
		img.onload = () => setRatio(img.height / img.width);
		img.src = message.file;
	}

	return (
		<div key={message.id} className={`messageBox ${message.author === localStorage.user ? "self" : "other"} ${preview && "preview"}`}>
			{message.file && <div className="img" style={{ "--url": `url("${message.file}")`, "--ratio": `${ratio * 100}%` }} />}
			{/* {message.file && <img src={message.file} />} */}
			{message.message && <p>{message.message}</p>}
			<span className="timestamp">{time}</span>
		</div>
	);
}

export default ChatPage;
