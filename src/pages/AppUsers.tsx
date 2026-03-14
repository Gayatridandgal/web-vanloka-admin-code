import { 
    ChevronDown, 
    Mail, 
    Phone, 
    Search, 
    Smartphone, 
    Trash2, 
    X, 
    Eye, 
    Edit2, 
    User, 
    UserCheck, 
    Monitor, 
    Smartphone as Iphone,
    LayoutGrid,
    History,
    Building2,
    Briefcase
} from 'lucide-react';
import { useState } from 'react';
import { Badge, Pagination } from '../ui/index';
import { DUMMY_APP_USERS, type AppUser } from '../data/appUserData';

export const AppUsersPage = () => {
    const [users, setUsers] = useState<AppUser[]>(DUMMY_APP_USERS);
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [page, setPage] = useState(1);

    // Modal States
    const [viewingUser, setViewingUser] = useState<AppUser | null>(null);
    const [editingUser, setEditingUser] = useState<AppUser | null>(null);
    const [deletingUser, setDeletingUser] = useState<AppUser | null>(null);

    const filtered = users.filter(u => {
        const matchesSearch = u.name.toLowerCase().includes(search.toLowerCase()) || 
                             u.organisation.toLowerCase().includes(search.toLowerCase()) ||
                             u.email.toLowerCase().includes(search.toLowerCase());
        const matchesStatus = statusFilter === 'All' ? true : u.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const limit = 10;
    const pages = Math.ceil(filtered.length / limit) || 1;
    const safePage = Math.max(1, Math.min(page, pages));
    const paginated = filtered.slice((safePage - 1) * limit, safePage * limit);

    const handleUpdateUser = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingUser) {
            setUsers(users.map(u => u.id === editingUser.id ? editingUser : u));
            setEditingUser(null);
        }
    };

    const handleDeleteUser = () => {
        if (deletingUser) {
            setUsers(users.filter(u => u.id !== deletingUser.id));
            setDeletingUser(null);
        }
    };

    return (
        <>
            <div className="page-header">
                <div>
                    <div className="page-title">
                        <Smartphone size={18} style={{ marginRight: 8 }} />
                        App Users
                    </div>
                    <div className="breadcrumb">
                        Admin <span>/</span> Management <span>/</span> App Users
                    </div>
                </div>
            </div>

            <div className="page-body">
                {/* Stat Cards - Responsive Grid */}
                <div className="stat-grid stat-grid-4" style={{ marginBottom: 24 }}>
                    {[
                        { label: 'Total Users', val: users.length, color: '#7C3AED', bg: '#F5F3FF', icon: <User size={16} /> },
                        { label: 'Active Users', val: users.filter(u => u.status === 'Active').length, color: '#059669', bg: '#ECFDF5', icon: <UserCheck size={16} /> },
                        { label: 'Android Users', val: users.filter(u => u.device === 'Android').length, color: '#3DDC84', bg: '#F1FDF6', icon: <Monitor size={16} /> },
                        { label: 'iOS Users', val: users.filter(u => u.device === 'iOS').length, color: '#000000', bg: '#F8FAFC', icon: <Iphone size={16} /> },
                    ].map(s => (
                        <div key={s.label} className="stat-card" style={{ padding: '16px 20px' }}>
                             <div className="stat-icon" style={{ background: s.bg, color: s.color, width: 40, height: 40, borderRadius: 10 }}>
                                {s.icon}
                            </div>
                            <div>
                                <div className="stat-label">{s.label}</div>
                                <div className="stat-value" style={{ fontSize: 20 }}>{s.val}</div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="filter-bar" style={{ marginBottom: 20 }}>
                    <div style={{ position: 'relative', flex: 1, minWidth: '240px' }}>
                        <Search size={18} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--muted)' }} />
                        <input 
                            className="search-input" 
                            style={{ width: '100%', paddingLeft: 40 }} 
                            placeholder="Search by name, email, or organisation..." 
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                        />
                    </div>
                    <div style={{ position: 'relative', minWidth: '160px' }}>
                        <select className="form-select" style={{ width: '100%', paddingRight: 32 }} value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
                            <option value="All">All Status</option>
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                            <option value="Blocked">Blocked</option>
                        </select>
                        <ChevronDown size={16} style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--muted)', pointerEvents: 'none' }} />
                    </div>
                </div>

                <div className="table-card">
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th style={{ padding: '16px 24px', width: 60 }}>#</th>
                                <th>USER</th>
                                <th>PHONE</th>
                                <th>ORGANISATION</th>
                                <th>ORG TYPE</th>
                                <th>DEVICE</th>
                                <th>LAST ACTIVE</th>
                                <th>STATUS</th>
                                <th style={{ textAlign: 'right', paddingRight: 24 }}>ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginated.map((u, idx) => (
                                <tr key={u.id}>
                                    <td style={{ padding: '16px 24px', fontWeight: 700, color: 'var(--muted)' }}>
                                        {(safePage - 1) * limit + idx + 1}
                                    </td>
                                    <td>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                            <div style={{ 
                                                width: 36, height: 36, borderRadius: '10px', background: '#F1F5F9', 
                                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                fontWeight: 800, color: 'var(--primary)', fontSize: 13
                                            }}>
                                                {u.name.charAt(0)}
                                            </div>
                                            <div>
                                                <div style={{ fontWeight: 800, color: 'var(--text)', fontSize: 13 }}>{u.name}</div>
                                                <div style={{ fontSize: 11, color: 'var(--muted)' }}>{u.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td style={{ fontWeight: 600, color: '#475569', fontSize: 12 }}>{u.phone}</td>
                                    <td style={{ fontWeight: 700, color: 'var(--text)', fontSize: 13 }}>{u.organisation}</td>
                                    <td>
                                        <Badge variant="blue">{u.orgType}</Badge>
                                    </td>
                                    <td>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, fontWeight: 700, color: '#475569' }}>
                                            {u.device === 'Android' ? (
                                                <Monitor size={14} color="#3DDC84" />
                                            ) : (
                                                <Iphone size={14} color="#000000" />
                                            )}
                                            {u.device}
                                        </div>
                                    </td>
                                    <td style={{ color: '#64748B', fontSize: 12, fontWeight: 600 }}>{u.lastActive}</td>
                                    <td>
                                        <Badge variant={u.status === 'Active' ? 'green' : u.status === 'Inactive' ? 'slate' : 'red'}>
                                            {u.status}
                                        </Badge>
                                    </td>
                                    <td style={{ textAlign: 'right', paddingRight: 24 }}>
                                        <div className="actions-col" style={{ justifyContent: 'flex-end', gap: 6 }}>
                                            <button className="act-btn act-view" onClick={() => setViewingUser(u)} title="View Detail"><Eye size={16} /></button>
                                            <button className="act-btn act-edit" onClick={() => setEditingUser(u)} title="Edit User"><Edit2 size={16} /></button>
                                            <button className="act-btn act-delete" onClick={() => setDeletingUser(u)} title="Delete User"><Trash2 size={16} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {pages > 1 && <Pagination current={safePage} total={pages} onChange={setPage} />}
                </div>
            </div>

            {/* ── VIEW MODAL ── */}
            {viewingUser && (
                <div style={{ position: 'fixed', inset: 0, background: 'rgba(15, 23, 42, 0.65)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(4px)', padding: 20 }}>
                    <div style={{ background: 'white', borderRadius: 24, width: '100%', maxWidth: 500, overflow: 'hidden', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)', animation: 'modalIn 0.3s ease-out' }}>
                        <div style={{ padding: '24px 32px', borderBottom: '1.5px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <h2 style={{ fontSize: 18, fontWeight: 900, color: 'var(--text)', display: 'flex', alignItems: 'center', gap: 10 }}>
                                <LayoutGrid size={20} color="var(--primary)" />
                                User Details
                            </h2>
                            <button onClick={() => setViewingUser(null)} style={{ background: '#F1F5F9', border: 'none', cursor: 'pointer', color: '#64748B', width: 32, height: 32, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><X size={18} /></button>
                        </div>
                        <div style={{ padding: 32 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 32, background: '#F8FAFC', padding: 20, borderRadius: 20 }}>
                                <div style={{ width: 64, height: 64, borderRadius: 16, background: 'linear-gradient(135deg, var(--primary) 0%, #4F46E5 100%)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, fontWeight: 900, boxShadow: '0 10px 15px -3px rgba(99, 102, 241, 0.3)' }}>{viewingUser.name.charAt(0)}</div>
                                <div>
                                    <h3 style={{ fontSize: 20, fontWeight: 900, color: '#1E293B', marginBottom: 4 }}>{viewingUser.name}</h3>
                                    <Badge variant={viewingUser.status === 'Active' ? 'green' : 'red'}>{viewingUser.status}</Badge>
                                </div>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 24 }}>
                                {[
                                    { label: 'Email Address', val: viewingUser.email, icon: <Mail size={14} /> },
                                    { label: 'Phone Number', val: viewingUser.phone, icon: <Phone size={14} /> },
                                    { label: 'Organisation', val: viewingUser.organisation, icon: <Building2 size={14} /> },
                                    { label: 'Org Type', val: viewingUser.orgType, icon: <Briefcase size={14} /> },
                                    { label: 'Platform', val: viewingUser.device, icon: <Smartphone size={14} /> },
                                    { label: 'Last active', val: viewingUser.lastActive, icon: <History size={14} /> },
                                ].map(item => (
                                    <div key={item.label}>
                                        <div style={{ fontSize: 10, fontWeight: 800, textTransform: 'uppercase', color: 'var(--muted)', letterSpacing: '0.05em', marginBottom: 6, display: 'flex', alignItems: 'center', gap: 6 }}>
                                            {item.icon} {item.label}
                                        </div>
                                        <div style={{ fontWeight: 700, color: 'var(--text)', fontSize: 13 }}>{item.val}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div style={{ padding: '20px 32px', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'flex-end' }}>
                            <button className="btn btn-primary" onClick={() => setViewingUser(null)} style={{ borderRadius: 12 }}>Close</button>
                        </div>
                    </div>
                </div>
            )}

            {/* ── EDIT MODAL ── */}
            {editingUser && (
                <div style={{ position: 'fixed', inset: 0, background: 'rgba(15, 23, 42, 0.65)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(4px)', padding: 20 }}>
                    <form onSubmit={handleUpdateUser} style={{ background: 'white', borderRadius: 24, width: '100%', maxWidth: 550, overflow: 'hidden', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)', animation: 'modalIn 0.3s ease-out' }}>
                        <div style={{ padding: '24px 32px', borderBottom: '1.5px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <h2 style={{ fontSize: 18, fontWeight: 900, color: 'var(--text)', display: 'flex', alignItems: 'center', gap: 10 }}>
                                <Edit2 size={20} color="var(--primary)" />
                                Edit User Profile
                            </h2>
                            <button type="button" onClick={() => setEditingUser(null)} style={{ background: '#F1F5F9', border: 'none', cursor: 'pointer', color: '#64748B', width: 32, height: 32, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><X size={18} /></button>
                        </div>
                        <div style={{ padding: 32, display: 'flex', flexDirection: 'column', gap: 20 }}>
                            <div className="form-group">
                                <label className="form-label">Full Name</label>
                                <input required className="form-input" style={{ borderRadius: 12 }} value={editingUser.name} onChange={e => setEditingUser({...editingUser, name: e.target.value})} />
                            </div>
                            <div className="form-grid form-grid-2">
                                <div className="form-group">
                                    <label className="form-label">Email Address</label>
                                    <input required type="email" className="form-input" style={{ borderRadius: 12 }} value={editingUser.email} onChange={e => setEditingUser({...editingUser, email: e.target.value})} />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Phone Number</label>
                                    <input required className="form-input" style={{ borderRadius: 12 }} value={editingUser.phone} onChange={e => setEditingUser({...editingUser, phone: e.target.value})} />
                                </div>
                            </div>
                            <div className="form-grid form-grid-2">
                                <div className="form-group">
                                    <label className="form-label">Organisation</label>
                                    <input required className="form-input" style={{ borderRadius: 12 }} value={editingUser.organisation} onChange={e => setEditingUser({...editingUser, organisation: e.target.value})} />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Account Status</label>
                                    <select className="form-select" style={{ borderRadius: 12 }} value={editingUser.status} onChange={e => setEditingUser({...editingUser, status: e.target.value as any})}>
                                        <option value="Active">Active</option>
                                        <option value="Inactive">Inactive</option>
                                        <option value="Blocked">Blocked</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div style={{ padding: '20px 32px', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
                            <button type="button" className="btn btn-secondary" style={{ borderRadius: 12 }} onClick={() => setEditingUser(null)}>Cancel</button>
                            <button type="submit" className="btn btn-primary" style={{ borderRadius: 12 }}>Save Changes</button>
                        </div>
                    </form>
                </div>
            )}

            {/* ── DELETE MODAL ── */}
            {deletingUser && (
                <div style={{ position: 'fixed', inset: 0, background: 'rgba(15, 23, 42, 0.65)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(4px)', padding: 20 }}>
                    <div style={{ background: 'white', borderRadius: 24, width: '100%', maxWidth: 400, padding: 32, textAlign: 'center', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)', animation: 'modalIn 0.3s ease-out' }}>
                        <div style={{ width: 64, height: 64, background: '#FEF2F2', color: '#EF4444', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', boxShadow: '0 10px 15px -3px rgba(239, 68, 68, 0.2)' }}>
                            <Trash2 size={32} />
                        </div>
                        <h2 style={{ fontSize: 20, fontWeight: 900, color: '#0F172A', marginBottom: 12 }}>Delete User?</h2>
                        <p style={{ color: '#64748B', fontSize: 14, lineHeight: 1.6, marginBottom: 32 }}>Are you sure you want to delete <strong>{deletingUser.name}</strong>? This action cannot be undone.</p>
                        <div style={{ display: 'flex', gap: 12 }}>
                            <button className="btn btn-secondary" style={{ flex: 1, borderRadius: 12 }} onClick={() => setDeletingUser(null)}>Cancel</button>
                            <button className="btn btn-primary" style={{ flex: 1, background: '#EF4444', borderColor: '#EF4444', borderRadius: 12 }} onClick={handleDeleteUser}>Yes, Delete</button>
                        </div>
                    </div>
                </div>
            )}

            <style dangerouslySetInnerHTML={{ __html: `
                @keyframes modalIn {
                    from { opacity: 0; transform: scale(0.95) translateY(10px); }
                    to { opacity: 1; transform: scale(1) translateY(0); }
                }
            `}} />
        </>
    );
};
