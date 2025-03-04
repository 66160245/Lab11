export default function Loading({ message = "กําลังโหลดข้อมูล..." }) {
  return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <p>{message}</p>
    </div>
  );
}
