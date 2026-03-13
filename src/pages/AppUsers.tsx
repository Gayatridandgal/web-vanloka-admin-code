import { ChevronDown, Mail, Phone, Search, Smartphone, Trash2, X } from 'lucide-react';
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
                {/* Stat Cards */}
                <div style={{ display: 'flex', gap: 12, marginBottom: 8 }}>
                    {[
                        { label: 'Total Users', val: users.length, color: '#7C3AED', bg: '#F5F3FF', icon: 'person' },
                        { label: 'Active Users', val: users.filter(u => u.status === 'Active').length, color: '#059669', bg: '#ECFDF5', icon: 'how_to_reg' },
                        { label: 'Android Users', val: users.filter(u => u.device === 'Android').length, color: '#3DDC84', bg: '#F1FDF6', icon: 'android' },
                        { label: 'iOS Users', val: users.filter(u => u.device === 'iOS').length, color: '#000000', bg: '#F8FAFC', icon: 'phone_iphone' },
                    ].map(s => (
                        <div key={s.label} style={{ 
                            background: 'white', border: '1.5px solid var(--border)', borderRadius: 12, 
                            padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 10, flex: '1' 
                        }}>
                             <div style={{ 
                                width: 32, height: 32, borderRadius: 8, background: s.bg, 
                                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 
                            }}>
                                <span className="material-symbols-outlined" style={{ color: s.color, fontSize: 16 }}>{s.icon}</span>
                            </div>
                            <div>
                                <div style={{ fontSize: 9, fontWeight: 800, textTransform: 'uppercase', color: 'var(--muted)', letterSpacing: '0.05em' }}>{s.label}</div>
                                <div style={{ fontSize: 18, fontWeight: 900, color: 'var(--text)', lineHeight: 1 }}>{s.val}</div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="filter-bar">
                    <div style={{ position: 'relative', flex: 1 }}>
                        <Search size={18} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--muted)' }} />
                        <input 
                            className="search-input" 
                            style={{ width: '100%', paddingLeft: 40 }} 
                            placeholder="Search by name, email, or organisation..." 
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                        />
                    </div>
                    <div style={{ position: 'relative' }}>
                        <select className="form-select" style={{ width: 160, paddingRight: 32 }} value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
                            <option value="All">All Status</option>
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                            <option value="Blocked">Blocked</option>
                        </select>
                        <ChevronDown size={16} style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--muted)', pointerEvents: 'none' }} />
                    </div>
                </div>

                <div className="table-card" style={{ border: 'none', background: 'transparent' }}>
                    <div style={{ background: 'white', borderRadius: 16, border: '1.5px solid var(--border)', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
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
                                                    width: 36, height: 36, borderRadius: '50%', background: '#F1F5F9', 
                                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                    fontWeight: 800, color: 'var(--primary)', fontSize: 13
                                                }}>
                                                    {u.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <div style={{ fontWeight: 800, color: 'var(--text)', fontSize: 14 }}>{u.name}</div>
                                                    <div style={{ fontSize: 11, color: 'var(--muted)' }}>{u.email}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td style={{ fontWeight: 600, color: '#475569', fontSize: 13 }}>{u.phone}</td>
                                        <td style={{ fontWeight: 700, color: 'var(--text)' }}>{u.organisation}</td>
                                        <td>
                                            <Badge variant="blue">{u.orgType}</Badge>
                                        </td>
                                        <td>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 600 }}>
                                                {u.device === 'Android' ? (
                                                    <span className="material-symbols-outlined" style={{ color: '#3DDC84', fontSize: 18 }}>android</span>
                                                ) : (
                                                    <span className="material-symbols-outlined" style={{ color: '#000000', fontSize: 18 }}>phone_iphone</span>
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
                                            <div className="actions-col" style={{ justifyContent: 'flex-end' }}>
                                                <button className="act-btn act-view" onClick={() => setViewingUser(u)} title="View Detail"><span className="material-symbols-outlined">visibility</span></button>
                                                <button className="act-btn act-edit" onClick={() => setEditingUser(u)} title="Edit User"><span className="material-symbols-outlined">edit</span></button>
                                                <button className="act-btn act-delete" onClick={() => setDeletingUser(u)} title="Delete User"><span className="material-symbols-outlined">delete</span></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {pages > 1 && <Pagination current={safePage} total={pages} onChange={setPage} />}
                </div>
            </div>

            {/* ── VIEW MODAL ── */}
            {viewingUser && (
                <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(4px)' }}>
                    <div style={{ background: 'white', borderRadius: 24, width: '100%', maxWidth: 500, overflow: 'hidden', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)' }}>
                        <div style={{ padding: '24px 32px', borderBottom: '1.5px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <h2 style={{ fontSize: 20, fontWeight: 900, color: 'var(--text)' }}>User Details</h2>
                            <button onClick={() => setViewingUser(null)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--muted)' }}><X size={20} /></button>
                        </div>
                        <div style={{ padding: 32 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 32 }}>
                                <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'var(--primary-bg)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, fontWeight: 900 }}>{viewingUser.name.charAt(0)}</div>
                                <div>
                                    <h3 style={{ fontSize: 22, fontWeight: 900, marginBottom: 4 }}>{viewingUser.name}</h3>
                                    <Badge variant={viewingUser.status === 'Active' ? 'green' : 'red'}>{viewingUser.status}</Badge>
                                </div>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
                                {[
                                    { label: 'Email Address', val: viewingUser.email, icon: <Mail size={14} /> },
                                    { label: 'Phone Number', val: viewingUser.phone, icon: <Phone size={14} /> },
                                    { label: 'Organisation', val: viewingUser.organisation, icon: <span className="material-symbols-outlined" style={{ fontSize: 14 }}>corporate_fare</span> },
                                    { label: 'Org Type', val: viewingUser.orgType, icon: <span className="material-symbols-outlined" style={{ fontSize: 14 }}>category</span> },
                                    { label: 'Device platform', val: viewingUser.device, icon: <Smartphone size={14} /> },
                                    { label: 'Last active', val: viewingUser.lastActive, icon: <span className="material-symbols-outlined" style={{ fontSize: 14 }}>history</span> },
                                ].map(item => (
                                    <div key={item.label}>
                                        <div style={{ fontSize: 10, fontWeight: 800, textTransform: 'uppercase', color: 'var(--muted)', letterSpacing: '0.05em', marginBottom: 6, display: 'flex', alignItems: 'center', gap: 6 }}>
                                            {item.icon} {item.label}
                                        </div>
                                        <div style={{ fontWeight: 700, color: 'var(--text)', fontSize: 14 }}>{item.val}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div style={{ padding: '20px 32px', background: '#F8FAFC', display: 'flex', justifyContent: 'flex-end' }}>
                            <button className="btn btn-primary" onClick={() => setViewingUser(null)}>Close Details</button>
                        </div>
                    </div>
                </div>
            )}

            {/* ── EDIT MODAL ── */}
            {editingUser && (
                <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(4px)' }}>
                    <form onSubmit={handleUpdateUser} style={{ background: 'white', borderRadius: 24, width: '100%', maxWidth: 550, overflow: 'hidden', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)' }}>
                        <div style={{ padding: '24px 32px', borderBottom: '1.5px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <h2 style={{ fontSize: 20, fontWeight: 900, color: 'var(--text)' }}>Edit User Profile</h2>
                            <button type="button" onClick={() => setEditingUser(null)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--muted)' }}><X size={20} /></button>
                        </div>
                        <div style={{ padding: 32, display: 'flex', flexDirection: 'column', gap: 20 }}>
                            <div className="form-group">
                                <label className="form-label">Full Name</label>
                                <input required className="form-input" value={editingUser.name} onChange={e => setEditingUser({...editingUser, name: e.target.value})} />
                            </div>
                            <div className="form-grid form-grid-2">
                                <div className="form-group">
                                    <label className="form-label">Email Address</label>
                                    <input required type="email" className="form-input" value={editingUser.email} onChange={e => setEditingUser({...editingUser, email: e.target.value})} />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Phone Number</label>
                                    <input required className="form-input" value={editingUser.phone} onChange={e => setEditingUser({...editingUser, phone: e.target.value})} />
                                </div>
                            </div>
                            <div className="form-grid form-grid-2">
                                <div className="form-group">
                                    <label className="form-label">Organisation</label>
                                    <input required className="form-input" value={editingUser.organisation} onChange={e => setEditingUser({...editingUser, organisation: e.target.value})} />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Account Status</label>
                                    <select className="form-select" value={editingUser.status} onChange={e => setEditingUser({...editingUser, status: e.target.value as any})}>
                                        <option value="Active">Active</option>
                                        <option value="Inactive">Inactive</option>
                                        <option value="Blocked">Blocked</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div style={{ padding: '20px 32px', background: '#F8FAFC', display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
                            <button type="button" className="btn btn-secondary" onClick={() => setEditingUser(null)}>Cancel</button>
                            <button type="submit" className="btn btn-primary">Save Changes</button>
                        </div>
                    </form>
                </div>
            )}

            {/* ── DELETE MODAL ── */}
            {deletingUser && (
                <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(4px)' }}>
                    <div style={{ background: 'white', borderRadius: 24, width: '100%', maxWidth: 400, padding: 32, textAlign: 'center', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)' }}>
                        <div style={{ width: 64, height: 64, background: '#FEF2F2', color: '#EF4444', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
                            <Trash2 size={32} />
                        </div>
                        <h2 style={{ fontSize: 20, fontWeight: 900, color: 'var(--text)', marginBottom: 12 }}>Delete User?</h2>
                        <p style={{ color: 'var(--muted)', fontSize: 14, lineHeight: 1.6, marginBottom: 32 }}>Are you sure you want to delete <strong>{deletingUser.name}</strong>? This action cannot be undone.</p>
                        <div style={{ display: 'flex', gap: 12 }}>
                            <button className="btn btn-secondary" style={{ flex: 1 }} onClick={() => setDeletingUser(null)}>Cancel</button>
                            <button className="btn btn-primary" style={{ flex: 1, background: '#EF4444', borderColor: '#EF4444' }} onClick={handleDeleteUser}>Yes, Delete</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
