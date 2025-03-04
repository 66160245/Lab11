import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useApi } from "../hooks/useApi";
import Loading from "./Loading";
import PostComments from "./PostComments";

export default function UserPosts() {
  const { userId } = useParams();
  const {
    data: posts,
    loading: postsLoading,
    error: postsError,
  } = useApi(`/users/${userId}/posts`);
  const {
    data: user,
    loading: userLoading,
    error: userError,
  } = useApi(`/users/${userId}`);

  // สถานะสําหรับเก็บ ID ของโพสต์ที ่กําลังแสดงความคิดเห็น
  const [activeCommentPostId, setActiveCommentPostId] = useState(null);

  const toggleComments = (postId) => {
    setActiveCommentPostId(activeCommentPostId === postId ? null : postId);
  };

  if (postsLoading || userLoading)
    return <Loading message="กําลังโหลดโพสต์..." />;
  if (postsError || userError)
    return (
      <div className="error">เกิดข้อผิดพลาด: {postsError || userError}</div>
    );
  if (!posts || !user) return null;

  return (
    <div className="container">
      <Link
        to="#"
        onClick={() => window.history.back()}
        className="back-button"
      >
        ← กลับ
      </Link>

      <h1>โพสต์ของ {user.name}</h1>
      <div className="posts-list">
        {posts.map((post) => (
          <div key={post.id} className="post-card">
            <h2>{post.title}</h2>
            <p>{post.body}</p>
            <button
              onClick={() => toggleComments(post.id)}
              className="comment-button"
            >
              {activeCommentPostId === post.id
                ? "ซ่อนความคิดเห็น"
                : "ดูความคิดเห็น"}
            </button>

            {activeCommentPostId === post.id && (
              <PostComments postId={post.id} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
