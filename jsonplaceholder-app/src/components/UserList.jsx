import { Link } from "react-router-dom";
import { useApi } from "../hooks/useApi";
import Loading from "./Loading";

export default function UserList() {
  const { data: users, loading, error } = useApi("/users");

  if (loading) return <Loading message="กําลังโหลดรายชื่อผู้ใช้..." />;
  if (error) return <div className="error">เกิดข้อผิดพลาด: {error}</div>;

  return (
    <div className="container">
      <h1>รายชื่อผู้ใช้</h1>
      <div className="user-list">
        {users &&
          users.map((user) => (
            <Link to={`/users/${user.id}`} key={user.id} className="user-card">
              <div className="user-info">
                <h2>{user.name}</h2>
                <p>{user.email}</p>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}
