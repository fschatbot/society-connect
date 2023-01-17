import "../../styles/chat.css";
import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import { Get } from "../../firebase";
import { Link } from "react-router-dom";

function Chat() {
	return (
		<>
			<nav className="ChatNav">
				<h1>Messages</h1>
			</nav>
			<div className="searchBox">
				<input className="search" type="text" placeholder="Search..." />
				<Icon icon="uil:search" />
			</div>
			<div className="chatList">
				<Link className="bigChat" to={"/chat/society"}>
					<div className="chatData">
						<Icon icon="lucide:building-2" />
						Society Chat
					</div>
					<Icon icon="ic:round-keyboard-arrow-right" />
				</Link>
				<Link className="bigChat" to={"/chat/building"}>
					<div className="chatData">
						<Icon icon="lucide:building" />
						Building Chat
					</div>
					<Icon icon="ic:round-keyboard-arrow-right" />
				</Link>
				{ChatList()}
			</div>
		</>
	);
}

function ChatList() {
	const [accounts, setAccounts] = useState([]);

	useEffect(() => {
		Get("accounts").then((snap) => setAccounts(Object.values(snap.val())));
	}, []);

	return accounts.map((account) => {
		return (
			<Link to={`/chat/${account.username}`} className="chat" key={account.username}>
				<div className="chatData">
					<img className="PFP" src={account.PFP} />
					<div className="nameWrapper">
						<h1>{account.username}</h1>
						<h2>Last Message...</h2>
					</div>
				</div>
				<Icon icon="ic:round-keyboard-arrow-right" />
			</Link>
		);
	});
}

export default Chat;
