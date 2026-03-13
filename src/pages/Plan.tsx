import { Plus, Search } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Badge, Pagination } from '../ui/index';
import { INITIAL_PLANS } from '../data/planData';

export const PlanPage = () => {
    const navigate = useNavigate();
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [page, setPage] = useState(1);

    const filtered = INITIAL_PLANS.filter(p => {
        const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || 
                             p.type.toLowerCase().includes(search.toLowerCase());
        const matchesStatus = statusFilter === 'All' ? true : p.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const limit = 10;
    const pages = Math.ceil(filtered.length / limit) || 1;
    const safePage = Math.max(1, Math.min(page, pages));
    const paginated = filtered.slice((safePage - 1) * limit, safePage * limit);

    return (
        <>
            <div className="page-header">
                <div>
                    <div className="page-title">
                        <span className="material-symbols-outlined ms" style={{ fontSize: 18 }}>
                            subscriptions
                        </span>
                        Plan Management
                    </div>
                    <div className="breadcrumb">
                        Admin <span>/</span> Management <span>/</span> Plans
                    </div>
                </div>
                <div className="header-actions">
                    <button className="btn btn-primary" onClick={() => navigate('/plan/create')}>
                        <Plus size={18} /> Add New Plan
                    </button>
                </div>
            </div>

            <div className="page-body">
                {/* Stat Cards */}
                <div style={{ display: 'flex', gap: 12, marginBottom: 8 }}>
                    {[
                        { label: 'Total Plans', val: INITIAL_PLANS.length, color: '#7C3AED', bg: '#F5F3FF', icon: 'list_alt' },
                        { label: 'Active Plans', val: INITIAL_PLANS.filter(p => p.status === 'Active').length, color: '#059669', bg: '#ECFDF5', icon: 'check_circle' },
                        { label: 'Trial Plans', val: INITIAL_PLANS.filter(p => p.type === 'Trial').length, color: '#2563EB', bg: '#EFF6FF', icon: 'timer' },
                    ].map(s => (
                        <div key={s.label} style={{ 
                            background: 'white', border: '1.5px solid var(--border)', borderRadius: 12, 
                            padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 10, flex: '0 1 180px' 
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
                            placeholder="Search plans..." 
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                        />
                    </div>
                    <select className="form-select" style={{ width: 160 }} value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
                        <option value="All">All Status</option>
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                    </select>
                </div>

                <div className="table-card" style={{ border: 'none', background: 'transparent' }}>
                    <div style={{ background: 'white', borderRadius: 16, border: '1.5px solid var(--border)', overflow: 'hidden' }}>
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th style={{ padding: '16px 20px' }}>PLAN NAME</th>
                                    <th>TYPE</th>
                                    <th>MONTHLY</th>
                                    <th>YEARLY</th>
                                    <th>VEHICLES</th>
                                    <th>BEACONS</th>
                                    <th>GPS</th>
                                    <th>SUPPORT</th>
                                    <th>STATUS</th>
                                    <th style={{ textAlign: 'right' }}>ACTIONS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paginated.map(p => (
                                    <tr key={p.id}>
                                        <td style={{ padding: '16px 20px' }}>
                                            <div style={{ fontWeight: 800, color: 'var(--text)', fontSize: 13 }}>{p.name}</div>
                                            <div style={{ fontSize: 10, color: 'var(--muted)' }}>{p.id}</div>
                                        </td>
                                        <td>
                                            <Badge variant="blue" style={{ fontSize: 10 }}>{p.type}</Badge>
                                        </td>
                                        <td style={{ fontWeight: 700, fontSize: 13 }}>₹{p.monthlyPrice}</td>
                                        <td style={{ fontWeight: 700, fontSize: 13 }}>₹{p.yearlyPrice}</td>
                                        <td style={{ fontSize: 12, fontWeight: 600, color: '#475569' }}>{p.vehiclesIncluded}</td>
                                        <td style={{ fontSize: 11, color: 'var(--muted)', maxWidth: 120 }}>{p.beaconsIncluded}</td>
                                        <td style={{ fontSize: 11, color: 'var(--muted)', maxWidth: 120 }}>{p.gpsIncluded}</td>
                                        <td style={{ fontSize: 12, fontWeight: 600 }}>{p.support}</td>
                                        <td>
                                            <Badge variant={p.status === 'Active' ? 'green' : 'slate'} style={{ fontSize: 10 }}>{p.status}</Badge>
                                        </td>
                                        <td style={{ textAlign: 'right', paddingRight: 20 }}>
                                            <div className="actions-col" style={{ justifyContent: 'flex-end' }}>
                                                <button className="act-btn act-edit"><span className="material-symbols-outlined">edit</span></button>
                                                <button className="act-btn act-delete"><span className="material-symbols-outlined">delete</span></button>
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
        </>
    );
};
