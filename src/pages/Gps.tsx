import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Badge, Pagination } from '../ui/index';

type GpsStatus = 'Active' | 'Inactive' | 'Maintenance';

interface GpsDevice {
    id: string;
    imei: string;
    simNumber: string;
    assignedTo: string;
    location: string;
    networkSignal: number;
    status: GpsStatus;
    lastPing: string;
}

const DUMMY_GPS: GpsDevice[] = [
    { id: 'GPS-201', imei: '864230040510231', simNumber: '+919876543210', assignedTo: 'Student Bus A', location: 'Route 42 (Main St)', networkSignal: 95, status: 'Active', lastPing: 'Just now' },
    { id: 'GPS-202', imei: '864230040510232', simNumber: '+919876543211', assignedTo: 'Unassigned', location: 'Storage', networkSignal: 0, status: 'Inactive', lastPing: '1 week ago' },
    { id: 'GPS-203', imei: '864230040510233', simNumber: '+919876543212', assignedTo: 'Staff Van C', location: 'Parking B', networkSignal: 30, status: 'Active', lastPing: '3 mins ago' },
    { id: 'GPS-204', imei: '864230040510234', simNumber: '+919876543213', assignedTo: 'Executive Car 1', location: 'Workshop', networkSignal: 65, status: 'Maintenance', lastPing: '4 hrs ago' },
    { id: 'GPS-205', imei: '864230040510235', simNumber: '+919876543214', assignedTo: 'Student Bus B', location: 'Route 15 (East Ave)', networkSignal: 88, status: 'Active', lastPing: '1 min ago' },
];

const getStatusVariant = (status: GpsStatus) => {
    switch (status) {
        case 'Active': return 'green';
        case 'Inactive': return 'slate';
        case 'Maintenance': return 'amber';
        default: return 'blue';
    }
};


/* ── VIEW DETAIL OVERLAY ── */
const ViewOverlay = ({ gps, onClose }: { gps: GpsDevice; onClose: () => void }) => {
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
                    background: 'linear-gradient(135deg, #701A75 0%, #4A044E 100%)',
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
                             <span className="material-symbols-outlined" style={{ fontSize: 24 }}>my_location</span>
                        </div>
                        <div>
                            <div style={{ fontSize: 18, fontWeight: 900, color: 'white' }}>{gps.id}</div>
                            <div style={{ fontSize: 12, color: 'rgba(255,255,255,.8)', fontWeight: 600 }}>GPS Device Details</div>
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
                        <span className="material-symbols-outlined" style={{ color: 'white', fontSize: 18 }}>close</span>
                    </button>
                </div>

                {/* Body */}
                <div style={{ padding: '28px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 24 }}>
                        <div>
                            <div style={{ fontSize: 10, fontWeight: 800, textTransform: 'uppercase', color: '#94A3B8', marginBottom: 6, letterSpacing: '.05em' }}>IMEI Number</div>
                            <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)', fontFamily: 'monospace' }}>{gps.imei}</div>
                        </div>
                        <div>
                            <div style={{ fontSize: 10, fontWeight: 800, textTransform: 'uppercase', color: '#94A3B8', marginBottom: 6, letterSpacing: '.05em' }}>Status</div>
                             <Badge variant={getStatusVariant(gps.status)}>
                                {gps.status}
                            </Badge>
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 24 }}>
                        <div>
                            <div style={{ fontSize: 10, fontWeight: 800, textTransform: 'uppercase', color: '#94A3B8', marginBottom: 6, letterSpacing: '.05em' }}>SIM Number</div>
                            <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)' }}>{gps.simNumber}</div>
                        </div>
                        <div>
                            <div style={{ fontSize: 10, fontWeight: 800, textTransform: 'uppercase', color: '#94A3B8', marginBottom: 6, letterSpacing: '.05em' }}>Assigned To</div>
                            <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)' }}>{gps.assignedTo}</div>
                        </div>
                    </div>

                     <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 24 }}>
                        <div>
                            <div style={{ fontSize: 10, fontWeight: 800, textTransform: 'uppercase', color: '#94A3B8', marginBottom: 6, letterSpacing: '.05em' }}>Network Signal</div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                <div style={{ 
                                    width: 48, height: 8, 
                                    background: '#E2E8F0', 
                                    borderRadius: 10,
                                    overflow: 'hidden'
                                }}>
                                    <div style={{ 
                                        height: '100%', 
                                        width: `${gps.networkSignal}%`,
                                        background: gps.networkSignal > 60 ? '#10B981' : gps.networkSignal > 30 ? '#F59E0B' : '#EF4444' 
                                    }} />
                                </div>
                                <span style={{ fontSize: 14, fontWeight: 800, color: '#475569' }}>
                                    {gps.networkSignal}%
                                </span>
                            </div>
                        </div>
                        <div>
                            <div style={{ fontSize: 10, fontWeight: 800, textTransform: 'uppercase', color: '#94A3B8', marginBottom: 6, letterSpacing: '.05em' }}>Last Ping</div>
                            <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)' }}>{gps.lastPing}</div>
                        </div>
                    </div>

                    <div style={{ marginBottom: 24 }}>
                        <div style={{ fontSize: 10, fontWeight: 800, textTransform: 'uppercase', color: '#94A3B8', marginBottom: 6, letterSpacing: '.05em' }}>Current Location</div>
                        <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)' }}>
                            <span className="material-symbols-outlined" style={{ fontSize: 16, verticalAlign: '-3px', marginRight: 6, color: 'var(--primary)' }}>explore</span>
                            {gps.location}
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

export const GpsPage = () => {
    const navigate = useNavigate();
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [page, setPage] = useState(1);
    const [viewingGps, setViewingGps] = useState<GpsDevice | null>(null);

    // Filter Logic
    const filtered = DUMMY_GPS.filter((g) => {
        const matchesSearch =
            g.id.toLowerCase().includes(search.toLowerCase()) ||
            g.imei.toLowerCase().includes(search.toLowerCase()) ||
            g.assignedTo.toLowerCase().includes(search.toLowerCase());
        const matchesStatus = statusFilter === 'All' ? true : g.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    // Pagination Logic
    const limit = 10;
    const pages = Math.ceil(filtered.length / limit) || 1;
    const safePage = Math.max(1, Math.min(page, pages));
    const paginated = filtered.slice((safePage - 1) * limit, safePage * limit);

    // Stats
    const totalCount = DUMMY_GPS.length;
    const activeCount = DUMMY_GPS.filter(g => g.status === 'Active').length;
    const weakSignalCount = DUMMY_GPS.filter(g => g.networkSignal > 0 && g.networkSignal < 40).length;
    const inactiveCount = DUMMY_GPS.filter(g => g.status === 'Inactive').length;

    return (
        <>
            {/* ── HEADER ── */}
            <div className="page-header">
                <div>
                    <div className="page-title">
                        <span className="material-symbols-outlined ms" style={{ fontSize: 18 }}>
                            map
                        </span>
                        GPS Devices
                    </div>
                    <div className="breadcrumb">
                        Admin <span>/</span> Masters <span>/</span> GPS Devices
                    </div>
                </div>
                <div className="header-actions">
                    <button
                        className="btn btn-primary"
                        onClick={() => navigate('/masters/gps-devices/create')}
                    >
                        <span className="material-symbols-outlined ms">add</span> Add GPS Device
                    </button>
                </div>
            </div>

            {/* ── BODY ── */}
            <div className="page-body">
                {/* ── Stat cards ── */}
                <div className="stat-grid stat-grid-4">
                    {[
                        { bg: '#EDE9FE', ic: '#7C3AED', icon: 'map', label: 'Total Trackers', val: String(totalCount), tc: '' },
                        { bg: '#DCFCE7', ic: '#059669', icon: 'check_circle', label: 'Active', val: String(activeCount), tc: '' },
                        { bg: '#FEF3C7', ic: '#D97706', icon: 'signal_cellular_connected_no_internet_4_bar', label: 'Weak Signal', val: String(weakSignalCount), tc: 'trend-down' },
                        { bg: '#F1F5F9', ic: '#64748B', icon: 'gps_off', label: 'Inactive', val: String(inactiveCount), tc: '' },
                    ].map((s) => (
                        <div key={s.label} className="stat-card">
                            <div className="stat-icon" style={{ background: s.bg }}>
                                <span className="material-symbols-outlined ms" style={{ color: s.ic }}>
                                    {s.icon}
                                </span>
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
                        <span
                            className="material-symbols-outlined"
                            style={{
                                position: 'absolute',
                                left: 10,
                                top: '50%',
                                transform: 'translateY(-50%)',
                                fontSize: 18,
                                color: 'var(--muted)',
                                pointerEvents: 'none',
                            }}
                        >
                            search
                        </span>
                        <input
                            className="search-input"
                            style={{ width: '100%', paddingLeft: 36 }}
                            placeholder="Search by ID, IMEI Number, or Assignment..."
                            value={search}
                            onChange={(e) => {
                                setSearch(e.target.value);
                                setPage(1);
                            }}
                        />
                    </div>
                    {/* Status filter */}
                    <div style={{ position: 'relative', flexShrink: 0 }}>
                        <select
                            className="form-select"
                            style={{ width: 150, paddingRight: 32 }}
                            value={statusFilter}
                            onChange={(e) => {
                                setStatusFilter(e.target.value);
                                setPage(1);
                            }}
                        >
                            <option value="All">All Status</option>
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                            <option value="Maintenance">Maintenance</option>
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
                                <th>GPS DETAILS</th>
                                <th>ASSIGNED TO / LOCATION</th>
                                <th>NETWORK SIGNAL</th>
                                <th>LAST PING</th>
                                <th>STATUS</th>
                                <th>ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginated.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan={6}
                                        style={{
                                            textAlign: 'center',
                                            padding: '40px 0',
                                            color: 'var(--muted)',
                                            fontSize: 13,
                                            fontWeight: 600,
                                        }}
                                    >
                                        <span
                                            className="material-symbols-outlined"
                                            style={{
                                                fontSize: 40,
                                                display: 'block',
                                                marginBottom: 8,
                                                color: '#CBD5E1',
                                            }}
                                        >
                                            search_off
                                        </span>
                                        No GPS devices found
                                        {search ? ` matching "${search}"` : ''}
                                        {statusFilter !== 'All' ? ` with status "${statusFilter}"` : ''}
                                    </td>
                                </tr>
                            ) : (
                                paginated.map((g) => (
                                    <tr key={g.id}>
                                        <td>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                                                <div 
                                                    className="avatar" 
                                                    style={{ 
                                                        background: '#FDF4FF', 
                                                        color: '#C026D3', 
                                                        width: 36, 
                                                        height: 36 
                                                    }}
                                                >
                                                    <span className="material-symbols-outlined ms" style={{ fontSize: 18 }}>
                                                        my_location
                                                    </span>
                                                </div>
                                                <div>
                                                    <div style={{ fontWeight: 800, color: 'var(--text)' }}>{g.id}</div>
                                                    <div style={{ fontSize: 11, color: 'var(--muted)', fontFamily: 'monospace' }}>
                                                        IMEI: {g.imei}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>
                                                {g.assignedTo}
                                            </div>
                                            <div style={{ fontSize: 11, color: 'var(--muted)' }}>
                                                <span className="material-symbols-outlined" style={{ fontSize: 12, verticalAlign: '-2px', marginRight: 2 }}>
                                                    explore
                                                </span>
                                                {g.location}
                                            </div>
                                        </td>
                                        <td>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                                <div style={{ 
                                                    width: 40, height: 6, 
                                                    background: '#E2E8F0', 
                                                    borderRadius: 10,
                                                    overflow: 'hidden'
                                                }}>
                                                    <div style={{ 
                                                        height: '100%', 
                                                        width: `${g.networkSignal}%`,
                                                        background: g.networkSignal > 60 ? '#10B981' : g.networkSignal > 30 ? '#F59E0B' : '#EF4444' 
                                                    }} />
                                                </div>
                                                <span style={{ fontSize: 12, fontWeight: 700, color: '#475569' }}>
                                                    {g.networkSignal > 0 ? `${g.networkSignal}%` : 'Offline'}
                                                </span>
                                            </div>
                                        </td>
                                        <td style={{ fontSize: 12, color: 'var(--muted)' }}>
                                            {g.lastPing}
                                        </td>
                                        <td>
                                            <Badge variant={getStatusVariant(g.status)}>
                                                {g.status}
                                            </Badge>
                                        </td>
                                        <td>
                                            <div className="actions-col">
                                                <button 
                                                    className="act-btn act-view"
                                                    title="View GPS Device"
                                                    onClick={() => setViewingGps(g)}
                                                >
                                                    <span className="material-symbols-outlined ms">visibility</span>
                                                </button>
                                                <button 
                                                    className="act-btn act-edit"
                                                    title="Edit GPS Device"
                                                    onClick={() => navigate('/masters/gps-devices/create')}
                                                >
                                                    <span className="material-symbols-outlined ms">edit</span>
                                                </button>
                                                <button className="act-btn act-delete" title="Delete GPS Device">
                                                    <span className="material-symbols-outlined ms">delete</span>
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
            {viewingGps && (
                <ViewOverlay 
                    gps={viewingGps} 
                    onClose={() => setViewingGps(null)} 
                />
            )}
        </>
    );
};
