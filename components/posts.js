"use client";
import { formatDate } from "@/lib/format";
import { useOptimistic } from "react";
import LikeButton from "./like-icon";
import { toggleLikeOnPost } from "@/actions/posts-actions";

function Post({ post, action }) {
  return (
    <article className="post">
      <div className="post-image">
        <img src={post.image} alt={post.title} />
      </div>
      <div className="post-content">
        <header>
          <div>
            <h2>{post.title}</h2>
            <p>
              Shared by {post.userFirstName} on{" "}
              <time dateTime={post.createdAt}>
                {formatDate(post.createdAt)}
              </time>
            </p>
          </div>
          <div>
            <form
              action={action.bind(null, post.id)}
              className={post.isLiked ? "liked" : null}
            >
              <LikeButton />
            </form>
          </div>
        </header>
        <p>{post.content}</p>
      </div>
    </article>
  );
}

export default function Posts({ posts }) {
  const [updatedPosts, updateOptimisticPost] = useOptimistic(
    posts,
    (prevPosts, updatedPostId) => {
      const updatedPostIndex = prevPosts.findIndex(
        (post) => post.id == updatedPostId
      );

      if (updatedPostIndex === -1) {
        return prevPosts;
      }

      const updatedPost = { ...prevPosts[updatedPostIndex] };
      updatedPost.likes = updatedPost.likes + (updatedPost.isLiked ? -1 : 1);
      updatedPost.isLiked = !updatedPost.isLiked;
      const newPost = [...prevPosts];
      newPost[updatedPostIndex] = updatedPost;
      return newPost;
    }
  );

  if (!updatedPosts || updatedPosts.length === 0) {
    return <p>There are no posts yet. Maybe start sharing some?</p>;
  }

  async function updatePosts(postId) {
    updateOptimisticPost(postId);
    await toggleLikeOnPost(postId);
  }

  return (
    <ul className="posts">
      {updatedPosts.map((post) => (
        <li key={post.id}>
          <Post post={post} action={updatePosts} />
        </li>
      ))}
    </ul>
  );
}
