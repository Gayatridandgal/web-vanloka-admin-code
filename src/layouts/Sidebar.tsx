import { useLocation, useNavigate } from 'react-router-dom';
import type { UserInfo } from '../types'; // ← "import type" for TS-only type

const navItems = [
    { path: '/dashboard', icon: 'dashboard', label: 'Dashboard' },
    { path: '/roles', icon: 'shield', label: 'Roles & Permissions' },
    { path: '/staff', icon: 'group', label: 'Staff Management' },
    { path: '/vehicle', icon: 'directions_car', label: 'Vehicle Management' },
    { path: '/instructor', icon: 'badge', label: 'Instructor Management' },
    { path: '/trainee', icon: 'school', label: 'Trainee Management' },
    { path: '/session', icon: 'calendar_month', label: 'Session Management' },
    { path: '/vendor', icon: 'store', label: 'Vendor Management' },
    { path: '/feedbacks', icon: 'chat_bubble', label: 'Feedbacks & Complaints' },
    { path: '/compliance', icon: 'gavel', label: 'Compliance & Laws' },
    { path: '/reports', icon: 'bar_chart', label: 'Reports' },
    { path: '/bulk', icon: 'campaign', label: 'Bulk Communication' },
    { path: '/settings', icon: 'settings', label: 'Settings' },
];

interface Props {
    onLogout: () => void;
    user: UserInfo;
}

export const Sidebar = ({ onLogout, user }: Props) => {
    const navigate = useNavigate();
    const { pathname } = useLocation();

    return (
        <aside className="sidebar">
            {/* ── Brand ── */}
            <div className="sidebar-brand">
                <div className="sidebar-brand-inner">
                    <div className="brand-icon">
                        <span className="material-symbols-outlined ms">local_shipping</span>
                    </div>
                    <div>
                        <div className="brand-name">VANLOKA</div>
                        <div className="brand-sub">Admin Panel</div>
                    </div>
                </div>
            </div>

            <div className="sidebar-divider" />

            {/* ── Nav ── */}
            <nav className="sidebar-nav">
                {navItems.map(({ path, icon, label }) => (
                    <div
                        key={path}
                        className={`nav-item ${pathname === path ? 'active' : ''}`}
                        onClick={() => navigate(path)}
                    >
                        <span className="material-symbols-outlined ms">{icon}</span>
                        {label}
                    </div>
                ))}
            </nav>

            {/* ── User / Logout ── */}
            <div className="sidebar-user">
                <div className="user-row" onClick={onLogout} title="Logout">
                    <div
                        className="avi"
                        style={{
                            background: '#EDE9FE',
                            color: 'var(--primary)',
                            flexShrink: 0,
                        }}
                    >
                        {user.initials}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                        <div
                            style={{
                                fontSize: 12,
                                fontWeight: 800,
                                color: 'var(--text)',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                            }}
                        >
                            {user.name}
                        </div>
                        <div
                            style={{
                                fontSize: 10,
                                color: 'var(--muted)',
                                fontWeight: 600,
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                            }}
                        >
                            {user.email}
                        </div>
                    </div>
                    <span
                        className="material-symbols-outlined ms"
                        style={{ fontSize: 17, color: 'var(--muted)', flexShrink: 0 }}
                    >
                        logout
                    </span>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
