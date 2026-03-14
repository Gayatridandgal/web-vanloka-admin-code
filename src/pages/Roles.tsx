import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Pagination } from '../ui/index';
import { ShieldCheck, X, Plus, Search, SearchX, Eye, Edit, Trash2, Users } from 'lucide-react';

type RoleInfo = {
    id: string;
    name: string;
    description: string;
    usersCount: number;
    status: 'Active' | 'Inactive';
};

const DUMMY_ROLES: RoleInfo[] = [
    { id: '1', name: 'Administrator', description: 'Full access to all system modules and settings', usersCount: 2, status: 'Active' },
    { id: '2', name: 'Content Manager', description: 'Can manage pages, notifications, and media', usersCount: 5, status: 'Active' },
    { id: '3', name: 'Support Agent', description: 'Access to feedback and trainee complaints only', usersCount: 12, status: 'Active' },
    { id: '4', name: 'Analytics Viewer', description: 'Read-only access to dashboard and reports', usersCount: 3, status: 'Active' },
    { id: '5', name: 'Guest Role', description: 'Limited read-only access', usersCount: 0, status: 'Inactive' },
];


/* ── VIEW DETAIL OVERLAY ── */
const ViewOverlay = ({ role, onClose }: { role: RoleInfo; onClose: () => void }) => {
    return (
        <div style={{
            position: 'fixed',
            inset: 0,
            zIndex: 1000,
            background: 'rgba(0,0,0,.45)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 24,
        }} onClick={onClose}>
            <div style={{
                background: 'white',
                borderRadius: 16,
                width: '100%',
                maxWidth: 480,
                maxHeight: '90vh',
                overflow: 'auto',
                boxShadow: '0 20px 60px rgba(0,0,0,.15)',
            }} onClick={e => e.stopPropagation()}>
                {/* Header */}
                <div style={{
                    background: 'linear-gradient(135deg, #7C3AED 0%, #4F46E5 100%)',
                    padding: '24px 28px',
                    borderRadius: '16px 16px 0 0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                        <div style={{
                            width: 48,
                            height: 48,
                            borderRadius: '50%',
                            background: 'rgba(255,255,255,.2)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            fontSize: 18,
                            fontWeight: 900,
                        }}>
                             {role.name.substring(0, 2).toUpperCase()}
                        </div>
                        <div>
                            <div style={{ fontSize: 18, fontWeight: 900, color: 'white' }}>{role.name}</div>
                            <div style={{ fontSize: 12, color: 'rgba(255,255,255,.8)', fontWeight: 600 }}>Role Details</div>
                        </div>
                    </div>
                    <button onClick={onClose} style={{
                        background: 'rgba(255,255,255,.1)',
                        border: 'none',
                        borderRadius: 8,
                        width: 32,
                        height: 32,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <X size={18} color="white" />
                    </button>
                </div>

                {/* Body */}
                <div style={{ padding: '28px' }}>
                    <div style={{ marginBottom: 24 }}>
                        <div style={{ fontSize: 10, fontWeight: 800, textTransform: 'uppercase', color: '#94A3B8', marginBottom: 6, letterSpacing: '.05em' }}>Description</div>
                        <div style={{ fontSize: 14, color: '#475569', lineHeight: 1.6, fontWeight: 500 }}>
                            {role.description || 'No description provided.'}
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 24 }}>
                        <div>
                            <div style={{ fontSize: 10, fontWeight: 800, textTransform: 'uppercase', color: '#94A3B8', marginBottom: 6, letterSpacing: '.05em' }}>Users Count</div>
                            <div style={{ fontSize: 16, fontWeight: 800, color: 'var(--text)' }}>{role.usersCount} Users</div>
                        </div>
                        <div>
                            <div style={{ fontSize: 10, fontWeight: 800, textTransform: 'uppercase', color: '#94A3B8', marginBottom: 6, letterSpacing: '.05em' }}>Status</div>
                             <span style={{
                                display: 'inline-block',
                                padding: '4px 12px',
                                borderRadius: 100,
                                fontSize: 11,
                                fontWeight: 800,
                                textTransform: 'uppercase',
                                background: role.status === 'Active' ? '#DCFCE7' : '#F1F5F9',
                                color: role.status === 'Active' ? '#059669' : '#64748B',
                            }}>
                                {role.status}
                            </span>
                        </div>
                    </div>

                    <div>
                        <div style={{ fontSize: 10, fontWeight: 800, textTransform: 'uppercase', color: '#94A3B8', marginBottom: 12, letterSpacing: '.05em' }}>Permissions Overview</div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                            {['VIEW DASHBOARD', 'VIEW APP USERS', 'EDIT APP USERS', 'VIEW BEACONS'].map(p => (
                                <div key={p} style={{
                                    fontSize: 10,
                                    fontWeight: 700,
                                    padding: '5px 10px',
                                    borderRadius: 6,
                                    background: '#F1F5F9',
                                    color: '#475569',
                                    border: '1px solid var(--border)'
                                }}>
                                    {p}
                                </div>
                            ))}
                            <div style={{ fontSize: 10, fontWeight: 700, padding: '5px 10px', borderRadius: 6, background: 'var(--surface)', color: 'var(--primary)', border: '1px solid var(--primary)' }}>
                                + {Math.floor(Math.random() * 10) + 5} More
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div style={{ padding: '20px 28px', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'flex-end', background: 'var(--surface)' }}>
                    <button className="btn btn-secondary" onClick={onClose} style={{ fontWeight: 800 }}>Close Overview</button>
                </div>
            </div>
        </div>
    );
};

export const RolesPage = () => {
    const navigate = useNavigate();
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [viewingRole, setViewingRole] = useState<RoleInfo | null>(null);
    
    // Filter
    const filtered = DUMMY_ROLES.filter((r) =>
        r.name.toLowerCase().includes(search.toLowerCase()) ||
        r.description.toLowerCase().includes(search.toLowerCase())
    );

    // Pagination
    const limit = 10;
    const pages = Math.ceil(filtered.length / limit) || 1;
    const safePage = Math.max(1, Math.min(page, pages));
    const paginated = filtered.slice((safePage - 1) * limit, safePage * limit);

    return (
        <>
            {/* ── HEADER ── */}
            <div className="page-header">
                <div>
                    <div className="page-title">
                        <ShieldCheck size={20} className="text-primary" style={{ marginRight: 8 }} />
                        Roles & Permissions
                    </div>
                    <div className="breadcrumb">
                        Admin <span>/</span> Roles & Permissions
                    </div>
                </div>
                <div className="header-actions">
                    <button
                        className="btn btn-primary"
                        onClick={() => navigate('/roles-permissions/create')}
                    >
                        <Plus size={18} className="ms mr-1" /> Add New Role
                    </button>
                </div>
            </div>

            {/* ── BODY ── */}
            <div className="page-body">
                {/* ── Search + filter bar ── */}
                <div className="filter-bar">
                    {/* Search */}
                    <div style={{ position: 'relative', flex: 1, minWidth: 180 }}>
                        <Search
                            size={18}
                            style={{
                                position: 'absolute',
                                left: 10,
                                top: '50%',
                                transform: 'translateY(-50%)',
                                color: 'var(--muted)',
                                pointerEvents: 'none',
                            }}
                        />
                        <input
                            className="search-input"
                            style={{ width: '100%', paddingLeft: 36 }}
                            placeholder="Search roles by name or description..."
                            value={search}
                            onChange={(e) => {
                                setSearch(e.target.value);
                                setPage(1);
                            }}
                        />
                    </div>
                </div>

                {/* ── TABLE WRAPPER ── */}
                <div className="table-card">
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>ROLE NAME</th>
                                <th>DESCRIPTION</th>
                                <th>USERS WITH ROLE</th>
                                <th>STATUS</th>
                                <th>ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginated.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan={5}
                                        style={{
                                            textAlign: 'center',
                                            padding: '40px 0',
                                            color: 'var(--muted)',
                                            fontSize: 13,
                                            fontWeight: 600,
                                        }}
                                    >
                                        <SearchX
                                            size={40}
                                            color="#CBD5E1"
                                            style={{
                                                display: 'block',
                                                marginBottom: 8,
                                                margin: '0 auto'
                                            }}
                                        />
                                        No roles found matching "{search}"
                                    </td>
                                </tr>
                            ) : (
                                paginated.map((r) => (
                                    <tr key={r.id}>
                                        <td>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                                                <div className="avatar" style={{ background: '#EDE9FE', color: '#7C3AED', width: 36, height: 36, fontSize: 12 }}>
                                                    {r.name.substring(0, 2).toUpperCase()}
                                                </div>
                                                <div>
                                                    <div style={{ fontWeight: 800 }}>{r.name}</div>
                                                    <div style={{ fontSize: 11, color: 'var(--muted)' }}>ID: {r.id}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td style={{ maxWidth: 300, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontSize: 13, color: '#475569' }}>
                                            {r.description || '—'}
                                        </td>
                                        <td>
                                            <div style={{
                                                display: 'inline-flex',
                                                alignItems: 'center',
                                                gap: 6,
                                                padding: '4px 10px',
                                                borderRadius: 100,
                                                background: '#F1F5F9',
                                                fontSize: 12,
                                                fontWeight: 800,
                                                color: '#475569'
                                            }}>
                                                <Users size={14} />
                                                {r.usersCount}
                                            </div>
                                        </td>
                                        <td>
                                            <span style={{
                                                display: 'inline-block',
                                                padding: '4px 10px',
                                                borderRadius: 100,
                                                fontSize: 11,
                                                fontWeight: 800,
                                                textTransform: 'uppercase',
                                                letterSpacing: '.05em',
                                                background: r.status === 'Active' ? '#DCFCE7' : '#F1F5F9',
                                                color: r.status === 'Active' ? '#059669' : '#64748B',
                                            }}>
                                                {r.status}
                                            </span>
                                        </td>
                                        <td>
                                            <div className="actions-col">
                                                <button 
                                                    className="act-btn act-view"
                                                    title="View Role"
                                                    onClick={() => setViewingRole(r)}
                                                >
                                                    <Eye size={16} className="ms" />
                                                </button>
                                                <button 
                                                    className="act-btn act-edit"
                                                    title="Edit Role"
                                                    onClick={() => navigate('/roles-permissions/create')}
                                                >
                                                    <Edit size={16} className="ms" />
                                                </button>
                                                <button className="act-btn act-delete" title="Delete Role">
                                                    <Trash2 size={16} className="ms" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>

                    {/* ── PAGINATION ── */}
                    {pages > 0 && (
                        <Pagination
                            current={safePage}
                            total={pages}
                            onChange={(p) => setPage(p)}
                        />
                    )}
                </div>
            </div>

            {/* View Overlay */}
            {viewingRole && (
                <ViewOverlay 
                    role={viewingRole} 
                    onClose={() => setViewingRole(null)} 
                />
            )}
        </>
    );
};
