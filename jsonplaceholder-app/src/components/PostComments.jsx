import { useApi } from "../hooks/useApi";
import Loading from "./Loading";

export default function PostComments({ postId }) {
  const {
    data: comments,
    loading,
    error,
  } = useApi(`/posts/${postId}/comments`);

  if (loading) return <Loading message="กําลังโหลดความคิดเห็น..." />;
  if (error) return <div className="error">เกิดข้อผิดพลาด: {error}</div>;
  if (!comments) return null;

  return (
    <div className="comments-section">
      <h3>ความคิดเห็น ({comments.length})</h3>
      <div className="comments-list">
        {comments.map((comment) => (
          <div key={comment.id} className="comment-card">
            <h4>{comment.name}</h4>
            <p className="comment-email">{comment.email}</p>
            <p>{comment.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
