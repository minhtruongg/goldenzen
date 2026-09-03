'use client';
import { usePathname } from 'next/navigation';

const TABS = [
  { href: '/admin', label: 'Trang chủ', icon: '🏠' },
  { href: '/admin/calendar', label: 'Lịch', icon: '📅' },
  { href: '/admin/customers', label: 'Khách hàng', icon: '👤' },
  { href: '/admin/services', label: 'Dịch vụ', icon: '💇' },
];

export default function NavBar() {
  const pathname = usePathname();
  return (
    <nav className="admin-navbar">
      {TABS.map((tab) => {
        const active = tab.href === '/admin' ? pathname === '/admin' : pathname.startsWith(tab.href);
        return (
          <a key={tab.href} href={tab.href} className={active ? 'active' : ''}>
            <span className="navicon">{tab.icon}</span>
            {tab.label}
          </a>
        );
      })}
    </nav>
  );
}
