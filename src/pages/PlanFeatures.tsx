import { ChevronDown, CreditCard, X, Plus, Search, SearchX, Eye, Edit, Trash2, CheckCircle2, Grid } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Badge, Pagination } from '../ui/index';
import { DUMMY_FEATURES } from '../data/planData';

type PlanFeature = typeof DUMMY_FEATURES[number];

const getStatusVariant = (status: string) => {
    switch (status) {
        case 'Active': return 'green';
        case 'Inactive': return 'slate';
        case 'Deprecated': return 'amber';
        default: return 'blue';
    }
};

/* ── VIEW DETAIL OVERLAY ── */
const ViewOverlay = ({ feature, onClose }: { feature: PlanFeature; onClose: () => void }) => {
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
                    background: 'linear-gradient(135deg, #059669 0%, #065F46 100%)',
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
                             <CreditCard size={24} color="white" />
                        </div>
                        <div>
                            <div style={{ fontSize: 18, fontWeight: 900, color: 'white' }}>{feature.name}</div>
                            <div style={{ fontSize: 12, color: 'rgba(255,255,255,.8)', fontWeight: 600 }}>Feature Details</div>
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
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 24 }}>
                        <div>
                            <div style={{ fontSize: 10, fontWeight: 800, textTransform: 'uppercase', color: '#94A3B8', marginBottom: 6, letterSpacing: '.05em' }}>Feature Code</div>
                            <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)', fontFamily: 'monospace' }}>{feature.code}</div>
                        </div>
                         <div>
                            <div style={{ fontSize: 10, fontWeight: 800, textTransform: 'uppercase', color: '#94A3B8', marginBottom: 6, letterSpacing: '.05em' }}>Status</div>
                             <Badge variant={getStatusVariant(feature.status)}>
                                {feature.status}
                            </Badge>
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 24 }}>
                        <div>
                            <div style={{ fontSize: 10, fontWeight: 800, textTransform: 'uppercase', color: '#94A3B8', marginBottom: 6, letterSpacing: '.05em' }}>Category</div>
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
                                {feature.category}
                            </div>
                        </div>
                    </div>

                    <div style={{ marginBottom: 24 }}>
                        <div style={{ fontSize: 10, fontWeight: 800, textTransform: 'uppercase', color: '#94A3B8', marginBottom: 6, letterSpacing: '.05em' }}>Description</div>
                        <div style={{ fontSize: 14, color: '#475569', lineHeight: 1.6, fontWeight: 500 }}>
                            {feature.description || 'No description provided.'}
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

export const PlanFeaturesPage = () => {
    const navigate = useNavigate();
    const [search, setSearch] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('All');
    const [page, setPage] = useState(1);
    const [viewingFeature, setViewingFeature] = useState<PlanFeature | null>(null);

    // Filter Logic
    const filtered = DUMMY_FEATURES.filter((f) => {
        const matchesSearch =
            f.name.toLowerCase().includes(search.toLowerCase()) ||
            f.code.toLowerCase().includes(search.toLowerCase());
        const matchesCategory = categoryFilter === 'All' ? true : f.category === categoryFilter;
        return matchesSearch && matchesCategory;
    });

    // Pagination Logic
    const limit = 10;
    const pages = Math.ceil(filtered.length / limit) || 1;
    const safePage = Math.max(1, Math.min(page, pages));
    const paginated = filtered.slice((safePage - 1) * limit, safePage * limit);

    // Stats
    const totalCount = DUMMY_FEATURES.length;
    const activeCount = DUMMY_FEATURES.filter(f => f.status === 'Active').length;
    const categoriesCount = new Set(DUMMY_FEATURES.map(f => f.category)).size;

    return (
        <>
            {/* ── HEADER ── */}
            <div className="page-header">
                <div>
                    <div className="page-title">
                        <CreditCard size={18} className="ms mr-2" />
                        Plan Features
                    </div>
                    <div className="breadcrumb">
                        Admin <span>/</span> Masters <span>/</span> Plan Features
                    </div>
                </div>
                <div className="header-actions">
                    <button
                        className="btn btn-primary"
                        onClick={() => navigate('/masters/plan-features/create')}
                    >
                        <Plus size={18} className="ms mr-1" /> Add New Feature
                    </button>
                </div>
            </div>

            {/* ── BODY ── */}
            <div className="page-body">
                {/* ── Stat cards ── */}
                <div className="stat-grid stat-grid-4">
                    {[
                        { bg: '#EDE9FE', ic: '#7C3AED', icon: 'credit_card', label: 'Total Features', val: String(totalCount) },
                        { bg: '#DCFCE7', ic: '#059669', icon: 'verified', label: 'Active Features', val: String(activeCount) },
                        { bg: '#EFF6FF', ic: '#2563EB', icon: 'category', label: 'Service Categories', val: String(categoriesCount) },
                    ].map((s) => (
                        <div key={s.label} className="stat-card">
                            <div className="stat-icon" style={{ background: s.bg }}>
                                {s.icon === 'credit_card' && <CreditCard size={20} color={s.ic} />}
                                {s.icon === 'verified' && <CheckCircle2 size={20} color={s.ic} />}
                                {s.icon === 'category' && <Grid size={20} color={s.ic} />}
                            </div>
                            <div>
                                <div className="stat-label">{s.label}</div>
                                <div className="stat-value">{s.val}</div>
                            </div>
                        </div>
                    ))}
                </div>

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
                            placeholder="Search by name or feature code..."
                            value={search}
                            onChange={(e) => {
                                setSearch(e.target.value);
                                setPage(1);
                            }}
                        />
                    </div>
                    {/* Category filter */}
                    <div style={{ position: 'relative', flexShrink: 0 }}>
                        <select
                            className="form-select"
                            style={{ width: 180, paddingRight: 32 }}
                            value={categoryFilter}
                            onChange={(e) => {
                                setCategoryFilter(e.target.value);
                                setPage(1);
                            }}
                        >
                            <option value="All">All Categories</option>
                            <option value="Fleet Management">Fleet Management</option>
                            <option value="Staff Management">Staff Management</option>
                            <option value="Safety & Security">Safety & Security</option>
                            <option value="Reports & Analytics">Reports & Analytics</option>
                        </select>
                        <ChevronDown
                            size={16}
                            style={{
                                position: 'absolute',
                                right: 10,
                                top: '50%',
                                transform: 'translateY(-50%)',
                                color: 'var(--muted)',
                                pointerEvents: 'none',
                            }}
                        />
                    </div>
                </div>

                {/* ── TABLE WRAPPER ── */}
                <div className="table-card">
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>FEATURE NAME</th>
                                <th>CODE</th>
                                <th>CATEGORY</th>
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
                                        No plan features found
                                    </td>
                                </tr>
                            ) : (
                                paginated.map((f) => (
                                    <tr key={f.id}>
                                        <td>
                                            <div style={{ fontWeight: 800, color: 'var(--text)' }}>{f.name}</div>
                                            <div style={{ fontSize: 11, color: 'var(--muted)', maxWidth: 250, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                                {f.description}
                                            </div>
                                        </td>
                                        <td>
                                            <code style={{ 
                                                fontSize: 12, 
                                                fontWeight: 800, 
                                                color: 'var(--primary)',
                                                background: '#EDE9FE',
                                                padding: '2px 6px',
                                                borderRadius: 4
                                            }}>
                                                {f.code}
                                            </code>
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
                                                {f.category}
                                            </div>
                                        </td>
                                        <td>
                                            <Badge variant={getStatusVariant(f.status)}>
                                                {f.status}
                                            </Badge>
                                        </td>
                                        <td>
                                            <div className="actions-col">
                                                <button 
                                                    className="act-btn act-view"
                                                    title="View Feature"
                                                    onClick={() => setViewingFeature(f)}
                                                >
                                                    <Eye size={16} className="ms" />
                                                </button>
                                                <button 
                                                    className="act-btn act-edit"
                                                    title="Edit Feature"
                                                    onClick={() => navigate('/masters/plan-features/create')}
                                                >
                                                    <Edit size={16} className="ms" />
                                                </button>
                                                <button className="act-btn act-delete" title="Delete Feature">
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
                            info={`Page ${safePage} of ${pages}`}
                            onChange={(p) => setPage(p)}
                        />
                    )}
                </div>
            </div>

            {/* View Overlay */}
            {viewingFeature && (
                <ViewOverlay 
                    feature={viewingFeature} 
                    onClose={() => setViewingFeature(null)} 
                />
            )}
        </>
    );
};
