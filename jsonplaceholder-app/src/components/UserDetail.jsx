import { useParams, Link, useNavigate } from "react-router-dom";
import { useApi } from "../hooks/useApi";
import Loading from "./Loading";

export default function UserDetail() {
  const { userId } = useParams();
  const { data: user, loading, error } = useApi(`/users/${userId}`);
  const navigate = useNavigate();

  const handleViewPosts = () => {
    navigate(`/users/${userId}/posts`);
  };

  if (loading) return <Loading message="กําลังโหลดข้อมูลผู้ใช้..." />;
  if (error) return <div className="error">เกิดข้อผิดพลาด: {error}</div>;
  if (!user) return null;

  return (
    <div className="container">
      <Link to="/" className="back-button">
        ← กลับ
      </Link>

      <div className="user-detail">
        <h1>{user.name}</h1>

        <div className="detail-section">
          <h2>ข้อมูล</h2>
          <p>
            <strong>อีเมล:</strong> {user.email}
          </p>
          <p>
            <strong>ชื่อผู้ใช้:</strong> {user.username}
          </p>
          <p>
            <strong>เบอร์โทรศัพท์:</strong> {user.phone}
          </p>
          <p>
            <strong>เว็บไซต์:</strong> {user.website}
          </p>
        </div>

        {/* รายละเอียดอื ่นๆ เหมือนเดิม */}

        <div className="button-container">
          <button onClick={handleViewPosts} className="view-posts-btn">
            ดูโพสต์ทั ้งหมด
          </button>
        </div>
      </div>
    </div>
  );
}
