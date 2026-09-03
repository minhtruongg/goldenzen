import '../admin.css';
import NavBar from './NavBar';

export const metadata = { title: 'GoldenZen — Quản lý' };

export default function AdminLayout({ children }) {
  return (
    <div className="admin-shell">
      <div className="admin-main">{children}</div>
      <NavBar />
    </div>
  );
}
