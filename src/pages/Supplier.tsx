import { ChevronDown, Mail, MapPin, Phone, Plus, Search, Trash2, User, X, Package, Warehouse, CheckCircle2, MonitorSmartphone, Eye, Edit, Fingerprint } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Badge, Pagination } from '../ui/index';
import { DUMMY_SUPPLIERS, type Supplier } from '../data/supplierData';

export const SupplierPage = () => {
    const navigate = useNavigate();
    const [suppliers, setSuppliers] = useState<Supplier[]>(DUMMY_SUPPLIERS);
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [page, setPage] = useState(1);

    // Modal States
    const [viewingSupplier, setViewingSupplier] = useState<Supplier | null>(null);
    const [editingSupplier, setEditingSupplier] = useState<Supplier | null>(null);
    const [deletingSupplier, setDeletingSupplier] = useState<Supplier | null>(null);

    const filtered = suppliers.filter(s => {
        const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase()) || 
                             s.location.toLowerCase().includes(search.toLowerCase());
        const matchesStatus = statusFilter === 'All' ? true : s.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const limit = 10;
    const pages = Math.ceil(filtered.length / limit) || 1;
    const safePage = Math.max(1, Math.min(page, pages));
    const paginated = filtered.slice((safePage - 1) * limit, safePage * limit);

    const handleUpdateSupplier = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingSupplier) {
            setSuppliers(suppliers.map(s => s.id === editingSupplier.id ? editingSupplier : s));
            setEditingSupplier(null);
        }
    };

    const handleDeleteSupplier = () => {
        if (deletingSupplier) {
            setSuppliers(suppliers.filter(s => s.id !== deletingSupplier.id));
            setDeletingSupplier(null);
        }
    };

    return (
        <>
            <div className="page-header">
                <div>
                    <div className="page-title">
                        <Package size={20} className="text-primary" style={{ marginRight: 8 }} />
                        Supplier Management
                    </div>
                    <div className="breadcrumb">
                        Admin <span>/</span> Management <span>/</span> Suppliers
                    </div>
                </div>
                <div className="header-actions">
                    <button className="btn btn-primary" onClick={() => navigate('/suppliers/create')}>
                        <Plus size={18} className="ms mr-1" /> Add Supplier
                    </button>
                </div>
            </div>

            <div className="page-body">
                {/* Stat Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-2">
                    {[
                        { label: 'Total Suppliers', val: suppliers.length, color: '#7C3AED', bg: '#F5F3FF', icon: <Warehouse size={16} /> },
                        { label: 'Active Suppliers', val: suppliers.filter(s => s.status === 'Active').length, color: '#059669', bg: '#ECFDF5', icon: <CheckCircle2 size={16} /> },
                        { label: 'Total Devices', val: suppliers.reduce((acc, s) => acc + s.devices.length, 0), color: '#2563EB', bg: '#EFF6FF', icon: <MonitorSmartphone size={16} /> },
                    ].map(s => (
                        <div key={s.label} className="stat-card">
                             <div className="stat-icon" style={{ background: s.bg }}>
                                <div style={{ color: s.color, display: 'flex' }}>{s.icon}</div>
                            </div>
                            <div>
                                <div className="stat-label">{s.label}</div>
                                <div className="stat-value">{s.val}</div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="toolbar" style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
                    <div style={{ position: 'relative', flex: 1, minWidth: 240 }}>
                        <Search size={18} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--muted)' }} />
                        <input 
                            className="search-input" 
                            style={{ width: '100%', paddingLeft: 40 }} 
                            placeholder="Search suppliers by name or location..." 
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                        />
                    </div>
                    <div style={{ position: 'relative' }} className="w-full sm:w-auto">
                        <select className="form-select" style={{ width: '100%', minWidth: 160, paddingRight: 32 }} value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
                            <option value="All">All Status</option>
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                        </select>
                        <ChevronDown size={16} style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--muted)', pointerEvents: 'none' }} />
                    </div>
                </div>

                <div className="table-card table-scroll-wrapper" style={{ border: 'none', background: 'transparent' }}>
                    <div style={{ background: 'white', borderRadius: 16, border: '1.5px solid var(--border)', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th style={{ padding: '16px 24px', width: 60 }}>S.NO</th>
                                    <th>SUPPLIER NAME</th>
                                    <th>LOCATION</th>
                                    <th>DEVICES PROVIDED</th>
                                    <th>STATUS</th>
                                    <th style={{ textAlign: 'right', paddingRight: 24 }}>ACTIONS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paginated.map((s, idx) => (
                                    <tr key={s.id}>
                                        <td style={{ padding: '16px 24px', fontWeight: 700, color: 'var(--muted)' }}>
                                            {(safePage - 1) * limit + idx + 1}
                                        </td>
                                        <td style={{ fontWeight: 800, color: 'var(--text)' }}>
                                            {s.name}
                                        </td>
                                        <td>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#475569', fontSize: 13, fontWeight: 500 }}>
                                                <MapPin size={16} color="#94A3B8" />
                                                {s.location}
                                            </div>
                                        </td>
                                        <td>
                                            <button 
                                                onClick={() => navigate(`/suppliers/${s.id}/devices`)}
                                                style={{ 
                                                    background: '#F0F9FF', 
                                                    color: '#0284C7', 
                                                    border: 'none', 
                                                    padding: '6px 12px', 
                                                    borderRadius: 8, 
                                                    fontSize: 12, 
                                                    fontWeight: 800, 
                                                    cursor: 'pointer',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: 6,
                                                    transition: 'all 0.2s'
                                                }}
                                                onMouseOver={(e) => (e.currentTarget.style.background = '#E0F2FE')}
                                                onMouseOut={(e) => (e.currentTarget.style.background = '#F0F9FF')}
                                            >
                                                <MonitorSmartphone size={16} />
                                                {s.devices.length} Devices
                                            </button>
                                        </td>
                                        <td>
                                            <Badge variant={s.status === 'Active' ? 'green' : 'slate'}>{s.status}</Badge>
                                        </td>
                                        <td style={{ textAlign: 'right', paddingRight: 24 }}>
                                            <div className="actions-col" style={{ justifyContent: 'flex-end' }}>
                                                <button className="act-btn act-view" onClick={() => setViewingSupplier(s)} title="View Details">
                                                    <Eye size={18} className="ms" />
                                                </button>
                                                <button className="act-btn act-edit" onClick={() => setEditingSupplier(s)} title="Edit Supplier">
                                                    <Edit size={18} className="ms" />
                                                </button>
                                                <button className="act-btn act-delete" onClick={() => setDeletingSupplier(s)} title="Delete Supplier">
                                                    <Trash2 size={18} className="ms" />
                                                </button>
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
            {viewingSupplier && (
                <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(4px)' }}>
                    <div style={{ background: 'white', borderRadius: 24, width: '100%', maxWidth: 500, overflow: 'hidden', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)' }}>
                        <div style={{ padding: '24px 32px', borderBottom: '1.5px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <h2 style={{ fontSize: 20, fontWeight: 900, color: 'var(--text)' }}>Supplier Details</h2>
                            <button onClick={() => setViewingSupplier(null)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--muted)' }}><X size={20} /></button>
                        </div>
                        <div style={{ padding: 32 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 32 }}>
                                <div style={{ width: 64, height: 64, borderRadius: 16, background: 'var(--primary-bg)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>
                                    <Warehouse size={32} />
                                </div>
                                <div>
                                    <h3 style={{ fontSize: 22, fontWeight: 900, marginBottom: 4 }}>{viewingSupplier.name}</h3>
                                    <Badge variant={viewingSupplier.status === 'Active' ? 'green' : 'slate'}>{viewingSupplier.status}</Badge>
                                </div>
                            </div>
                            <div style={{ display: 'grid', gap: 24 }} className="grid-cols-1 sm:grid-cols-2">
                                {[
                                    { label: 'Location', val: viewingSupplier.location, icon: <MapPin size={14} /> },
                                    { label: 'Contact Person', val: viewingSupplier.contactPerson, icon: <User size={14} /> },
                                    { label: 'Phone', val: viewingSupplier.phone, icon: <Phone size={14} /> },
                                    { label: 'Email Address', val: viewingSupplier.email, icon: <Mail size={14} /> },
                                    { label: 'Devices Provided', val: `${viewingSupplier.devices.length} Units`, icon: <MonitorSmartphone size={14} /> },
                                    { label: 'Supplier ID', val: viewingSupplier.id, icon: <Fingerprint size={14} /> },
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
                        <div style={{ padding: '20px 32px', background: '#F8FAFC', display: 'flex', justifyContent: 'flex-end', gap: 12, flexDirection: 'column' }} className="sm:flex-row">
                            <button className="btn btn-secondary w-full sm:w-auto" onClick={() => navigate(`/suppliers/${viewingSupplier.id}/devices`)}>Manage Devices</button>
                            <button className="btn btn-primary w-full sm:w-auto" onClick={() => setViewingSupplier(null)}>Close</button>
                        </div>
                    </div>
                </div>
            )}

            {/* ── EDIT MODAL ── */}
            {editingSupplier && (
                <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(4px)' }}>
                    <form onSubmit={handleUpdateSupplier} style={{ background: 'white', borderRadius: 24, width: '100%', maxWidth: 550, overflow: 'hidden', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)' }}>
                        <div style={{ padding: '24px 32px', borderBottom: '1.5px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <h2 style={{ fontSize: 20, fontWeight: 900, color: 'var(--text)' }}>Edit Supplier</h2>
                            <button type="button" onClick={() => setEditingSupplier(null)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--muted)' }}><X size={20} /></button>
                        </div>
                        <div style={{ padding: 32, display: 'flex', flexDirection: 'column', gap: 20 }}>
                            <div className="form-group">
                                <label className="form-label">Supplier Name</label>
                                <input required className="form-input" value={editingSupplier.name} onChange={e => setEditingSupplier({...editingSupplier, name: e.target.value})} />
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-5">
                                <div className="form-group mb-0">
                                    <label className="form-label">Location</label>
                                    <input required className="form-input" value={editingSupplier.location} onChange={e => setEditingSupplier({...editingSupplier, location: e.target.value})} />
                                </div>
                                <div className="form-group mb-0">
                                    <label className="form-label">Contact Person</label>
                                    <input required className="form-input" value={editingSupplier.contactPerson} onChange={e => setEditingSupplier({...editingSupplier, contactPerson: e.target.value})} />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-5">
                                <div className="form-group mb-0">
                                    <label className="form-label">Email Address</label>
                                    <input required type="email" className="form-input" value={editingSupplier.email} onChange={e => setEditingSupplier({...editingSupplier, email: e.target.value})} />
                                </div>
                                <div className="form-group mb-0">
                                    <label className="form-label">Phone Number</label>
                                    <input required className="form-input" value={editingSupplier.phone} onChange={e => setEditingSupplier({...editingSupplier, phone: e.target.value})} />
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="form-label">Status</label>
                                <select className="form-select" value={editingSupplier.status} onChange={e => setEditingSupplier({...editingSupplier, status: e.target.value as any})}>
                                    <option value="Active">Active</option>
                                    <option value="Inactive">Inactive</option>
                                </select>
                            </div>
                        </div>
                        <div style={{ padding: '20px 32px', background: '#F8FAFC', display: 'flex', justifyContent: 'flex-end', gap: 12, flexDirection: 'column' }} className="sm:flex-row">
                            <button type="button" className="btn btn-secondary w-full sm:w-auto" onClick={() => setEditingSupplier(null)}>Cancel</button>
                            <button type="submit" className="btn btn-primary w-full sm:w-auto">Update Supplier</button>
                        </div>
                    </form>
                </div>
            )}

            {/* ── DELETE MODAL ── */}
            {deletingSupplier && (
                <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(4px)' }}>
                    <div style={{ background: 'white', borderRadius: 24, width: '100%', maxWidth: 400, padding: 32, textAlign: 'center', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)' }}>
                        <div style={{ width: 64, height: 64, background: '#FEF2F2', color: '#EF4444', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
                            <Trash2 size={18} className="ms" />
                        </div>
                        <h2 style={{ fontSize: 20, fontWeight: 900, color: 'var(--text)', marginBottom: 12 }}>Delete Supplier?</h2>
                        <p style={{ color: 'var(--muted)', fontSize: 14, lineHeight: 1.6, marginBottom: 32 }}>Are you sure you want to remove <strong>{deletingSupplier.name}</strong>? All associated device records will remain but the link will be detached.</p>
                        <div style={{ display: 'flex', gap: 12, flexDirection: 'column' }} className="sm:flex-row">
                            <button className="btn btn-secondary w-full sm:w-auto" style={{ flex: 1 }} onClick={() => setDeletingSupplier(null)}>Cancel</button>
                            <button className="btn btn-primary w-full sm:w-auto" style={{ flex: 1, background: '#EF4444', borderColor: '#EF4444' }} onClick={handleDeleteSupplier}>Yes, Remove</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};


