import "../styles/navbar.css";
import { Icon } from "@iconify/react";
import { NavLink } from "react-router-dom";

function Navbar() {
	let navClass = ({ isActive }) => (isActive ? "active" : null);
	return (
		<nav>
			<ul>
				<li>
					<NavLink to="/gossip" className={navClass}>
						<Icon icon="material-symbols:communication" />
						Gossips
					</NavLink>
				</li>
				<li>
					<NavLink to="/chat" className={navClass}>
						{/* <Icon icon="mingcute:chat-1-line" /> */}
						<Icon icon="cil:chat-bubble" />
						Messages
					</NavLink>
				</li>
				<li>
					<NavLink to="/profile" className={navClass}>
						<img src="https://i.pravatar.cc/150?img=29" alt="profile pic" />
						Profile
					</NavLink>
				</li>
			</ul>
		</nav>
	);
}

export default Navbar;
