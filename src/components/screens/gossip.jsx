import { useEffect, useRef, useState } from "react";
import "../../styles/gossip.css";
import { currentAccount, DB } from "../../firebase";
import firebase from "firebase/app";

import { Icon } from "@iconify/react";
import InfiniteScroll from "react-infinite-scroll-component";

function Gossip() {
	return (
		<>
			<nav className="gossipNav">
				<h1>Gossip</h1>
				<Icon icon="ph:plus-circle" />
			</nav>
			<PostScroll />
		</>
	);
}

function PostScroll({ filter }) {
	let [posts, setPosts] = useState([]);
	let [HasMore, setHasMore] = useState(true);
	let [reactions, setReactions] = useState({ liked: [], disliked: [] });

	useEffect(() => {
		currentAccount().then((user) => {
			const { liked, disliked } = user;
			setReactions({ liked, disliked });
		});
	}, []);

	// Fetching data functions
	function fetchData() {
		// Fetch the first 10 posts from firebase DB
		// DB.ref('/posts').limitToFirst(10).once('value', (snapshot) => {
		// Fetch the next 10 posts from firebase DB
		return DB.ref("posts")
			.limitToFirst(posts.length + 10)
			.once("value")
			.then((snap) => {
				let data = [];
				const previousLength = posts.length;
				snap.forEach((snapChild) => {
					let post = snapChild.val();
					post.id = snapChild.key;
					post.authorPFP = "https://i.pravatar.cc/150?img=29";
					data.push(post);
				});
				// Add the new posts to the old posts
				setPosts(data);
				// Check if more posts are available
				if (previousLength === data.length) setHasMore(false);
			});
	}

	const fetchDataRef = useRef(fetchData);

	useEffect(() => {
		fetchDataRef.current();
	}, [fetchDataRef]);

	// Liking and disliking a post function
	function likePost(id) {
		let updatedReactions = { ...reactions };
		let updates = {};
		// Update the client side DB
		if (!reactions.liked.includes(id)) {
			// In this we are switching from disliking to liking or just liking
			updatedReactions.liked.push(id);
			updatedReactions.disliked = reactions.disliked.filter((post) => post !== id);

			// Update the server side DB
			updates[`accounts/${localStorage.user}/liked`] = updatedReactions.liked;
			updates[`posts/${id}/liked`] = firebase.database.ServerValue.increment(1);
			if (reactions.disliked.includes(id)) {
				updates[`accounts/${localStorage.user}/disliked`] = updatedReactions.disliked;
				updates[`posts/${id}/disliked`] = firebase.database.ServerValue.increment(-1);
			}
		} else {
			// In this we are just unliking
			updatedReactions.liked = reactions.liked.filter((post) => post !== id);

			// Update the server side DB
			updates[`accounts/${localStorage.user}/liked`] = updatedReactions.liked;
			updates[`posts/${id}/liked`] = firebase.database.ServerValue.increment(-1);
		}

		// Run the update
		console.log(updates);
		DB.ref().update(updates);
		setReactions({ ...updatedReactions });
	}
	function dislikePost(id) {
		let updatedReactions = { ...reactions };
		let updates = {};
		// Update the client side DB
		if (!reactions.disliked.includes(id)) {
			// In this we are switching from liking to disliking or just disliking
			updatedReactions.disliked.push(id);
			updatedReactions.liked = reactions.liked.filter((post) => post !== id);

			// Update the server side DB
			updates[`accounts/${localStorage.user}/disliked`] = updatedReactions.disliked;
			updates[`posts/${id}/disliked`] = firebase.database.ServerValue.increment(1);
			if (reactions.liked.includes(id)) {
				updates[`accounts/${localStorage.user}/liked`] = updatedReactions.liked;
				updates[`posts/${id}/liked`] = firebase.database.ServerValue.increment(-1);
			}
		} else {
			// In this we are just undisliking
			updatedReactions.disliked = reactions.disliked.filter((post) => post !== id);

			// Update the server side DB
			updates[`accounts/${localStorage.user}/disliked`] = updatedReactions.disliked;
			updates[`posts/${id}/disliked`] = firebase.database.ServerValue.increment(-1);
		}

		// Run the update
		console.log(updates);
		DB.ref().update(updates);
		setReactions({ ...updatedReactions });
	}

	return (
		<InfiniteScroll
			dataLength={posts.length} //This is important field to render the next data
			next={fetchData}
			hasMore={HasMore}
			loader={<h4>Loading...</h4>}
			endMessage={
				<p style={{ textAlign: "center" }}>
					<b>Yay! You have seen it all</b>
				</p>
			}>
			{posts.map((post) => {
				return (
					<div className="post" key={post.id}>
						{/* POST IMAGE */}
						<img className="post__image" src={post.image} alt="" />
						<div className="bar">
							<div className="title">
								<img className="PFP" src={post.authorPFP} alt="" />
								<h1>{post.title}</h1>
							</div>
							<div className="reactions">
								<Icon
									icon={reactions.liked.includes(post.id) ? "ph:heart-fill" : "ph:heart"}
									color={reactions.liked.includes(post.id) ? "rgb(229 66 148)" : "rgb(48 48 191)"}
									onClick={() => likePost(post.id)}
								/>
								{post.liked}
								<Icon
									icon={reactions.disliked.includes(post.id) ? "fluent:thumb-dislike-16-filled" : "fluent:thumb-dislike-16-regular"}
									color={reactions.disliked.includes(post.id) ? "#98571b" : "rgb(48 48 191)"}
									onClick={() => dislikePost(post.id)}
								/>
								{post.disliked}
							</div>
						</div>
						<p className="description">{post.description}</p>
					</div>
				);
			})}
		</InfiniteScroll>
	);
}

export default Gossip;
export { PostScroll };
