import {
    BarChart2,
    Building2,
    CreditCard,
    Database,
    LayoutDashboard,
    MapPin,
    MessageSquare,
    Radio,
    Settings2,
    ShieldCheck,
    Smartphone,
    Users,
    Warehouse,
} from 'lucide-react';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import type { UserInfo } from '../types';

interface NavItem {
    label: string;
    path: string;
    icon: React.ReactNode;
    children?: NavItem[];
}

const navItems: NavItem[] = [
    { label: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard size={16} /> },
    { label: 'Organisation Mgmt', path: '/organisation', icon: <Building2 size={16} /> },
    { label: 'Roles & Permissions', path: '/roles-permissions', icon: <ShieldCheck size={16} /> },
    {
        label: 'Masters',
        path: '/masters',
        icon: <Database size={16} />,
        children: [
            { label: 'Beacon Devices', path: '/masters/beacon-devices', icon: <Radio size={16} /> },
            { label: 'GPS Devices', path: '/masters/gps-devices', icon: <MapPin size={16} /> },
            {
                label: 'Plan Features',
                path: '/masters/plan-features',
                icon: <CreditCard size={16} />,
            },
        ],
    },
    { label: 'Plan Management', path: '/plan', icon: <CreditCard size={16} /> },
    { label: 'Staff Management', path: '/staff', icon: <Users size={16} /> },
    { label: 'Supplier Management', path: '/suppliers', icon: <Warehouse size={16} /> },
    { label: 'App Users', path: '/app-users', icon: <Smartphone size={16} /> },
    { label: 'Feedbacks', path: '/feedbacks', icon: <MessageSquare size={16} /> },
    { label: 'Reports', path: '/reports', icon: <BarChart2 size={16} /> },
    { label: 'Settings', path: '/settings', icon: <Settings2 size={16} /> },
];

interface Props {
    onLogout: () => void;
    user: UserInfo;
}

export const Sidebar = ({ onLogout, user }: Props) => {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({});

    const toggleGroup = (path: string) =>
        setExpandedGroups((prev) => ({ ...prev, [path]: !prev[path] }));

    const isActive = (path: string) =>
        pathname === path || pathname.startsWith(path + '/');

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
                {navItems.map((item) => {
                    if (item.children) {
                        const isExpanded = expandedGroups[item.path] ?? false;
                        const hasActiveChild = item.children.some((c) => isActive(c.path));
                        return (
                            <div key={item.path}>
                                <div
                                    className={`nav-item ${hasActiveChild ? 'active' : ''}`}
                                    onClick={() => toggleGroup(item.path)}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                    }}
                                >
                                    <span
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 10,
                                        }}
                                    >
                                        {item.icon}
                                        {item.label}
                                    </span>
                                    <span
                                        className="material-symbols-outlined"
                                        style={{
                                            fontSize: 16,
                                            transition: 'transform .2s',
                                            transform: isExpanded
                                                ? 'rotate(180deg)'
                                                : 'rotate(0)',
                                        }}
                                    >
                                        expand_more
                                    </span>
                                </div>
                                {isExpanded && (
                                    <div style={{ paddingLeft: 18 }}>
                                        {item.children.map((child) => (
                                            <div
                                                key={child.path}
                                                className={`nav-item ${isActive(child.path) ? 'active' : ''}`}
                                                onClick={() => navigate(child.path)}
                                                style={{ fontSize: 12 }}
                                            >
                                                {child.icon}
                                                {child.label}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        );
                    }
                    return (
                        <div
                            key={item.path}
                            className={`nav-item ${isActive(item.path) ? 'active' : ''}`}
                            onClick={() => navigate(item.path)}
                        >
                            {item.icon}
                            {item.label}
                        </div>
                    );
                })}
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
