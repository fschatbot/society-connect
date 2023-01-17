import { useEffect, useState } from "react";
import "../../styles/gossip.css";
import { currentAccount, DB, Get, LiveGet } from "../../firebase";
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

	function fetchData() {
		// Fetch the first 10 posts from firebase DB
		// DB.ref('/posts').limitToFirst(10).once('value', (snapshot) => {
		// Fetch the next 10 posts from firebase DB
		console.log(posts.length);
		DB.ref("posts")
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
				console.log(data);
				// Add the new posts to the old posts
				setPosts(data);
				// Check if more posts are available
				if (previousLength == data.length) setHasMore(false);
			});
	}

	useEffect(() => {
		fetchData();
	}, []);

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
								<Icon icon={reactions.liked.includes(post.id) ? "ph:heart-fill" : "ph:heart"} />
								<Icon icon={reactions.disliked.includes(post.id) ? "fluent:thumb-dislike-16-filled" : "fluent:thumb-dislike-16-regular"} />
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
