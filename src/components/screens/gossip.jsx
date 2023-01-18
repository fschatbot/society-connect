import { useEffect, useState } from "react";
import "../../styles/gossip.css";
import { currentAccount, DB } from "../../firebase";
import firebase from "firebase/app";
import { Icon } from "@iconify/react";
import useInfiniteScroll from "react-infinite-scroll-hook";
import { InfinitySpin } from "react-loader-spinner";

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

function PostScroll({ filter = () => !0 }) {
	let [posts, setPosts] = useState([]);
	let [HasMore, setHasMore] = useState(true);
	const [loading, setLoading] = useState(false);
	let [reactions, setReactions] = useState({ liked: [], disliked: [] });

	useEffect(() => {
		currentAccount().then((user) => {
			const { liked, disliked } = user;
			setReactions({ liked, disliked });
		});
	}, []);

	// Fetching data functions

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

	// Logic for infinite scroll
	const [sentryRef] = useInfiniteScroll({
		loading,
		hasNextPage: HasMore,
		onLoadMore: fetchData,
		rootMargin: "0px 0px 400px 0px",
	});

	function fetchData() {
		console.log("Fetching data");
		setLoading(true);
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
					if (filter(post)) data.push(post);
				});
				console.log(data);
				// Add the new posts to the old posts
				setPosts(data);
				// Check if more posts are available
				if (previousLength === data.length) setHasMore(false);
				setLoading(false);
			});
	}

	function Post(post) {
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
	}

	return (
		<div className="postList">
			{posts.map(Post)}
			{(loading || HasMore) && (
				<div ref={sentryRef}>
					<InfinitySpin color="#36d7b7" className="loader" />
				</div>
			)}
		</div>
	);
}

export default Gossip;
export { PostScroll };
