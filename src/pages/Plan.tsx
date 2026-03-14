import { Plus, Search, Youtube, List, CheckCircle2, Timer, Edit, Trash2, Eye, X, Package, Shield, Activity } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Badge, Pagination } from '../ui/index';
import { INITIAL_PLANS, type Plan } from '../data/planData';

const ViewOverlay = ({ plan, onClose }: { plan: Plan; onClose: () => void }) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] flex items-center justify-center p-4 sm:p-6 bg-slate-900/40 backdrop-blur-sm"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                transition={{ type: 'spring', duration: 0.5, bounce: 0.3 }}
                className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div style={{ background: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)', padding: '24px 32px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div style={{ color: 'white' }}>
                            <h2 style={{ fontSize: 24, fontWeight: 900, margin: 0, marginBottom: 4 }}>{plan.name}</h2>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                <span style={{ opacity: 0.9, fontWeight: 600 }}>{plan.id}</span>
                                <Badge variant={plan.status === 'Active' ? 'green' : 'slate'}>{plan.status}</Badge>
                            </div>
                        </div>
                        <button onClick={onClose} style={{ background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: 8, padding: 8, color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <X size={20} />
                        </button>
                    </div>
                </div>

                {/* Body */}
                <div style={{ padding: 32, maxHeight: 'calc(100vh - 200px)', overflowY: 'auto' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 16, marginBottom: 32 }}>
                        <div style={{ background: '#F8FAFC', padding: 16, borderRadius: 12, border: '1px solid #E2E8F0' }}>
                            <div style={{ fontSize: 11, fontWeight: 800, color: '#64748B', textTransform: 'uppercase', marginBottom: 4 }}>Plan Type</div>
                            <div style={{ fontSize: 14, fontWeight: 700, color: '#0F172A' }}>{plan.type}</div>
                        </div>
                        <div style={{ background: '#F8FAFC', padding: 16, borderRadius: 12, border: '1px solid #E2E8F0' }}>
                            <div style={{ fontSize: 11, fontWeight: 800, color: '#64748B', textTransform: 'uppercase', marginBottom: 4 }}>Trial Period</div>
                            <div style={{ fontSize: 14, fontWeight: 700, color: '#0F172A' }}>{plan.trialPeriod} Days</div>
                        </div>
                        <div style={{ background: '#F8FAFC', padding: 16, borderRadius: 12, border: '1px solid #E2E8F0' }}>
                            <div style={{ fontSize: 11, fontWeight: 800, color: '#64748B', textTransform: 'uppercase', marginBottom: 4 }}>Pricing</div>
                            <div style={{ fontSize: 14, fontWeight: 700, color: '#0F172A' }}>₹{plan.monthlyPrice}/mo or ₹{plan.yearlyPrice}/yr</div>
                        </div>
                        <div style={{ background: '#F8FAFC', padding: 16, borderRadius: 12, border: '1px solid #E2E8F0' }}>
                            <div style={{ fontSize: 11, fontWeight: 800, color: '#64748B', textTransform: 'uppercase', marginBottom: 4 }}>Support Level</div>
                            <div style={{ fontSize: 14, fontWeight: 700, color: '#0F172A' }}>{plan.support}</div>
                        </div>
                    </div>

                    <div style={{ marginBottom: 24 }}>
                        <h3 style={{ fontSize: 14, fontWeight: 800, color: '#1E293B', marginBottom: 16, borderBottom: '1px solid #E2E8F0', paddingBottom: 8 }}>Included Resources</h3>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                <div style={{ width: 40, height: 40, borderRadius: 10, background: '#EFF6FF', color: '#3B82F6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Package size={20} />
                                </div>
                                <div>
                                    <div style={{ fontSize: 12, fontWeight: 800, color: '#64748B' }}>Vehicles</div>
                                    <div style={{ fontSize: 13, fontWeight: 700, color: '#0F172A' }}>{plan.vehiclesIncluded}</div>
                                </div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                <div style={{ width: 40, height: 40, borderRadius: 10, background: '#F0FDF4', color: '#10B981', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Activity size={20} />
                                </div>
                                <div>
                                    <div style={{ fontSize: 12, fontWeight: 800, color: '#64748B' }}>Beacons</div>
                                    <div style={{ fontSize: 13, fontWeight: 700, color: '#0F172A' }}>{plan.beaconsIncluded}</div>
                                </div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                <div style={{ width: 40, height: 40, borderRadius: 10, background: '#FEF2F2', color: '#EF4444', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Shield size={20} />
                                </div>
                                <div>
                                    <div style={{ fontSize: 12, fontWeight: 800, color: '#64748B' }}>GPS Devices</div>
                                    <div style={{ fontSize: 13, fontWeight: 700, color: '#0F172A' }}>{plan.gpsIncluded}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3 style={{ fontSize: 14, fontWeight: 800, color: '#1E293B', marginBottom: 12, borderBottom: '1px solid #E2E8F0', paddingBottom: 8 }}>Description</h3>
                        <p style={{ fontSize: 14, color: '#475569', lineHeight: 1.6, margin: 0 }}>{plan.description}</p>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

export const PlanPage = () => {
    const navigate = useNavigate();
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [page, setPage] = useState(1);
    const [viewingPlan, setViewingPlan] = useState<Plan | null>(null);

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
                        <Youtube size={18} className="ms mr-2" />
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
                                {s.icon === 'list_alt' && <List size={16} color={s.color} />}
                                {s.icon === 'check_circle' && <CheckCircle2 size={16} color={s.color} />}
                                {s.icon === 'timer' && <Timer size={16} color={s.color} />}
                            </div>
                            <div>
                                <div style={{ fontSize: 9, fontWeight: 800, textTransform: 'uppercase', color: 'var(--muted)', letterSpacing: '0.05em' }}>{s.label}</div>
                                <div style={{ fontSize: 18, fontWeight: 900, color: 'var(--text)', lineHeight: 1 }}>{s.val}</div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="filter-bar" style={{ flexWrap: 'wrap' }}>
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

                <div className="table-card table-scroll-wrapper" style={{ border: 'none', background: 'transparent' }}>
                    <div style={{ background: 'white', borderRadius: 16, border: '1.5px solid var(--border)', overflow: 'hidden' }}>
                        <table className="data-table" style={{ minWidth: 800 }}>
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
                                            <div className="actions-col" style={{ justifyContent: 'flex-end', display: 'flex', gap: '8px' }}>
                                                <button 
                                                    className="act-btn act-view" 
                                                    title="View Plan"
                                                    onClick={() => setViewingPlan(p)}
                                                >
                                                    <Eye size={16} />
                                                </button>
                                                <button 
                                                    className="act-btn act-edit" 
                                                    title="Edit Plan"
                                                    onClick={() => navigate(`/plan/create`)}
                                                >
                                                    <Edit size={16} />
                                                </button>
                                                <button 
                                                    className="act-btn act-delete" 
                                                    title="Delete Plan"
                                                    onClick={() => {
                                                        if (window.confirm(`Are you sure you want to delete ${p.name}?`)) {
                                                            alert(`Successfully deleted plan: ${p.name}`);
                                                        }
                                                    }}
                                                >
                                                    <Trash2 size={16} />
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
            
            <AnimatePresence>
                {viewingPlan && <ViewOverlay plan={viewingPlan} onClose={() => setViewingPlan(null)} />}
            </AnimatePresence>
        </>
    );
};
