import "../../styles/profile.css";
import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import { PostScroll } from "./gossip";
import { currentAccount, Get } from "../../firebase";
import { useParams, Link, useLocation } from "react-router-dom";
import { CopyToClipboard } from "react-copy-to-clipboard";

function Profile(props) {
	let [info, setInfo] = useState(null);
	const { id } = useParams();
	const [shareUrl, setShareUrl] = useState(window.location.href);
	// TODO: FIX THE shareUrl

	useEffect(() => {
		Get(`accounts/${id || localStorage.user}`)
			.then((snapshot) => {
				if (snapshot.exists()) return snapshot;
				setShareUrl(shareUrl + id);
				return currentAccount();
			})
			.then((snapshot) => setInfo(snapshot.val()));
	}, [id]);

	return (
		<>
			<div className="profile_topBlock">
				<CopyToClipboard text={shareUrl}>
					<div className="profile_icon top-5 left-5" to={shareUrl}>
						<Icon icon="material-symbols:share-outline" />
					</div>
				</CopyToClipboard>
				<div className="profile_img" style={{ "--pfp": `url("${info?.PFP}")` }}></div>
				<div className="profile_icon right-5 bottom-0 translate-y-1/2">
					<Icon icon="fluent:edit-28-regular" />
				</div>
			</div>

			<h1 className="text-center text-3xl font-bold">{info?.username}</h1>
			<h3 className="text-center text-xl font-medium">{info?.bio}</h3>

			<PostScroll filter={(post) => post.author === info?.id} />

			{/* This for rounded corners (Thx: https://dev.to/afif/css-shapes-with-rounded-corners-56h) */}
			<svg style={{ visibility: "hidden", position: "absolute" }} width="0" height="0" xmlns="http://www.w3.org/2000/svg" version="1.1">
				<defs>
					<filter id="round">
						<feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
						<feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 19 -9" result="goo" />
						<feComposite in="SourceGraphic" in2="goo" operator="atop" />
					</filter>
				</defs>
			</svg>
		</>
	);
}

export default Profile;
