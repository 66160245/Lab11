import { Routes, Route } from "react-router-dom";
import UserList from "./components/UserList";
import UserDetail from "./components/UserDetail";
import UserPosts from "./components/UserPosts";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<UserList />} />
      <Route path="/users/:userId" element={<UserDetail />} />
      <Route path="/users/:userId/posts" element={<UserPosts />} />
    </Routes>
  );
}
