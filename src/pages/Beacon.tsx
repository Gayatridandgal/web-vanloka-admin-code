import {
    ChevronDown,
    Radio,
    X,
    RadioReceiver,
    Plus,
    Search,
    SearchX,
    Settings2,
    BatteryWarning,
    MapPin,
    Eye,
    Edit,
    Trash2,
    CheckCircle2,
} from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Badge, Pagination } from '../ui/index';

type BeaconStatus = 'Active' | 'Inactive' | 'Maintenance';

interface Beacon {
    id: string;
    macAddress: string;
    assignedTo: string;
    location: string;
    batteryLevel: number;
    status: BeaconStatus;
    lastPing: string;
}

const DUMMY_BEACONS: Beacon[] = [
    {
        id: 'BCN-001',
        macAddress: '00:1A:2B:3C:4D:5E',
        assignedTo: 'Student Bus A',
        location: 'Gate 1',
        batteryLevel: 98,
        status: 'Active',
        lastPing: '2 mins ago',
    },
    {
        id: 'BCN-002',
        macAddress: '00:1A:2B:3C:4D:5F',
        assignedTo: 'Unassigned',
        location: 'Storage',
        batteryLevel: 100,
        status: 'Inactive',
        lastPing: '1 day ago',
    },
    {
        id: 'BCN-003',
        macAddress: '00:1A:2B:3C:4D:60',
        assignedTo: 'Staff Van C',
        location: 'Parking B',
        batteryLevel: 15,
        status: 'Active',
        lastPing: '5 mins ago',
    },
    {
        id: 'BCN-004',
        macAddress: '00:1A:2B:3C:4D:61',
        assignedTo: 'Visitor Pass 1',
        location: 'Reception',
        batteryLevel: 45,
        status: 'Maintenance',
        lastPing: '2 hrs ago',
    },
    {
        id: 'BCN-005',
        macAddress: '00:1A:2B:3C:4D:62',
        assignedTo: 'Student Bus B',
        location: 'Gate 2',
        batteryLevel: 82,
        status: 'Active',
        lastPing: '1 min ago',
    },
];

const getStatusVariant = (status: BeaconStatus) => {
    switch (status) {
        case 'Active':
            return 'green';
        case 'Inactive':
            return 'slate';
        case 'Maintenance':
            return 'amber';
        default:
            return 'blue';
    }
};

/* ── VIEW DETAIL OVERLAY ── */
const ViewOverlay = ({ beacon, onClose }: { beacon: Beacon; onClose: () => void }) => {
    return (
        <div
            style={{
                position: 'fixed',
                inset: 0,
                zIndex: 1000,
                background: 'rgba(0,0,0,.45)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: window.innerWidth < 640 ? 12 : 24,
            }}
            onClick={onClose}
        >
            <div
                style={{
                    background: 'white',
                    borderRadius: 16,
                    width: '100%',
                    maxWidth: 480,
                    maxHeight: 'calc(100vh - 40px)',
                    overflow: 'auto',
                    boxShadow: '0 20px 60px rgba(0,0,0,.15)',
                }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div
                    style={{
                        background: 'linear-gradient(135deg, #0369A1 0%, #075985 100%)',
                        padding: '24px 28px',
                        borderRadius: '16px 16px 0 0',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                        <div
                            style={{
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
                            }}
                        >
                            <RadioReceiver size={24} />
                        </div>
                        <div>
                            <div style={{ fontSize: 18, fontWeight: 900, color: 'white' }}>
                                {beacon.id}
                            </div>
                            <div
                                style={{
                                    fontSize: 12,
                                    color: 'rgba(255,255,255,.8)',
                                    fontWeight: 600,
                                }}
                            >
                                Beacon Details
                            </div>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        style={{
                            background: 'rgba(255,255,255,.1)',
                            border: 'none',
                            borderRadius: 8,
                            width: 32,
                            height: 32,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <X color="white" size={18} />
                    </button>
                </div>

                {/* Body */}
                <div style={{ padding: '28px' }}>
                    <div className="grid-cols-responsive-2" style={{ gap: 20, marginBottom: 24 }}>
                        <div>
                            <div
                                style={{
                                    fontSize: 10,
                                    fontWeight: 800,
                                    textTransform: 'uppercase',
                                    color: '#94A3B8',
                                    marginBottom: 6,
                                    letterSpacing: '.05em',
                                }}
                            >
                                MAC Address
                            </div>
                            <div
                                style={{
                                    fontSize: 14,
                                    fontWeight: 700,
                                    color: 'var(--text)',
                                    fontFamily: 'monospace',
                                }}
                            >
                                {beacon.macAddress}
                            </div>
                        </div>
                        <div>
                            <div
                                style={{
                                    fontSize: 10,
                                    fontWeight: 800,
                                    textTransform: 'uppercase',
                                    color: '#94A3B8',
                                    marginBottom: 6,
                                    letterSpacing: '.05em',
                                }}
                            >
                                Status
                            </div>
                            <Badge variant={getStatusVariant(beacon.status)}>{beacon.status}</Badge>
                        </div>
                    </div>

                    <div className="grid-cols-responsive-2" style={{ gap: 20, marginBottom: 24 }}>
                        <div>
                            <div
                                style={{
                                    fontSize: 10,
                                    fontWeight: 800,
                                    textTransform: 'uppercase',
                                    color: '#94A3B8',
                                    marginBottom: 6,
                                    letterSpacing: '.05em',
                                }}
                            >
                                Assigned To
                            </div>
                            <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)' }}>
                                {beacon.assignedTo}
                            </div>
                        </div>
                        <div>
                            <div
                                style={{
                                    fontSize: 10,
                                    fontWeight: 800,
                                    textTransform: 'uppercase',
                                    color: '#94A3B8',
                                    marginBottom: 6,
                                    letterSpacing: '.05em',
                                }}
                            >
                                Location
                            </div>
                            <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)' }}>
                                {beacon.location}
                            </div>
                        </div>
                    </div>

                    <div className="grid-cols-responsive-2" style={{ gap: 20, marginBottom: 24 }}>
                        <div>
                            <div
                                style={{
                                    fontSize: 10,
                                    fontWeight: 800,
                                    textTransform: 'uppercase',
                                    color: '#94A3B8',
                                    marginBottom: 6,
                                    letterSpacing: '.05em',
                                }}
                            >
                                Battery Level
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                <div
                                    style={{
                                        width: 48,
                                        height: 8,
                                        background: '#E2E8F0',
                                        borderRadius: 10,
                                        overflow: 'hidden',
                                    }}
                                >
                                    <div
                                        style={{
                                            height: '100%',
                                            width: `${beacon.batteryLevel}%`,
                                            background:
                                                beacon.batteryLevel > 50
                                                    ? '#10B981'
                                                    : beacon.batteryLevel > 20
                                                      ? '#F59E0B'
                                                      : '#EF4444',
                                        }}
                                    />
                                </div>
                                <span style={{ fontSize: 14, fontWeight: 800, color: '#475569' }}>
                                    {beacon.batteryLevel}%
                                </span>
                            </div>
                        </div>
                        <div>
                            <div
                                style={{
                                    fontSize: 10,
                                    fontWeight: 800,
                                    textTransform: 'uppercase',
                                    color: '#94A3B8',
                                    marginBottom: 6,
                                    letterSpacing: '.05em',
                                }}
                            >
                                Last Ping
                            </div>
                            <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)' }}>
                                {beacon.lastPing}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div
                    style={{
                        padding: '20px 28px',
                        borderTop: '1px solid var(--border)',
                        display: 'flex',
                        justifyContent: 'flex-end',
                        background: 'var(--surface)',
                    }}
                >
                    <button
                        className="btn btn-secondary"
                        onClick={onClose}
                        style={{ fontWeight: 800 }}
                    >
                        Close Overview
                    </button>
                </div>
            </div>
        </div>
    );
};

export const BeaconPage = () => {
    const navigate = useNavigate();
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [page, setPage] = useState(1);
    const [viewingBeacon, setViewingBeacon] = useState<Beacon | null>(null);

    // Filter Logic
    const filtered = DUMMY_BEACONS.filter((b) => {
        const matchesSearch =
            b.id.toLowerCase().includes(search.toLowerCase()) ||
            b.macAddress.toLowerCase().includes(search.toLowerCase()) ||
            b.assignedTo.toLowerCase().includes(search.toLowerCase());
        const matchesStatus = statusFilter === 'All' ? true : b.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    // Pagination Logic
    const limit = 10;
    const pages = Math.ceil(filtered.length / limit) || 1;
    const safePage = Math.max(1, Math.min(page, pages));
    const paginated = filtered.slice((safePage - 1) * limit, safePage * limit);

    // Stats
    const totalCount = DUMMY_BEACONS.length;
    const activeCount = DUMMY_BEACONS.filter((b) => b.status === 'Active').length;
    const lowBatteryCount = DUMMY_BEACONS.filter((b) => b.batteryLevel < 20).length;
    const maintenanceCount = DUMMY_BEACONS.filter((b) => b.status === 'Maintenance').length;

    return (
        <>
            {/* ── HEADER ── */}
            <div className="page-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <button
                        className="md:hidden p-2 -ml-2 text-slate-600 hover:bg-slate-100 rounded-lg"
                        onClick={() => {
                            /* This will be handled by App.tsx logic */
                        }}
                    >
                        {/* The sidebar toggle is in AdminLayout, but we can add a placeholder or rely on layout */}
                    </button>
                    <div>
                        <div className="page-title">
                            <Radio size={18} className="ms mr-2" />
                            Beacon Devices
                        </div>
                        <div className="breadcrumb">
                            Admin <span>/</span> Masters <span>/</span> Beacon Devices
                        </div>
                    </div>
                </div>
                <div className="header-actions">
                    <button
                        className="btn btn-primary"
                        onClick={() => navigate('/masters/beacon-devices/create')}
                    >
                        <Plus size={18} className="ms mr-1" /> Add Beacon
                    </button>
                </div>
            </div>

            {/* ── BODY ── */}
            <div className="page-body">
                {/* ── Stat cards ── */}
                <div className="stat-grid stat-grid-4">
                    {[
                        {
                            bg: '#EDE9FE',
                            ic: '#7C3AED',
                            icon: 'radio',
                            label: 'Total Beacons',
                            val: String(totalCount),
                            tc: '',
                        },
                        {
                            bg: '#DCFCE7',
                            ic: '#059669',
                            icon: 'check_circle',
                            label: 'Active',
                            val: String(activeCount),
                            tc: '',
                        },
                        {
                            bg: '#FEE2E2',
                            ic: '#DC2626',
                            icon: 'battery_alert',
                            label: 'Low Battery',
                            val: String(lowBatteryCount),
                            tc: 'trend-down',
                        },
                        {
                            bg: '#FEF3C7',
                            ic: '#D97706',
                            icon: 'maintenance',
                            label: 'Maintenance',
                            val: String(maintenanceCount),
                            tc: '',
                        },
                    ].map((s) => (
                        <div key={s.label} className="stat-card">
                            <div className="stat-icon" style={{ background: s.bg }}>
                                {s.icon === 'radio' && <RadioReceiver size={18} color={s.ic} />}
                                {s.icon === 'check_circle' && (
                                    <CheckCircle2 size={18} color={s.ic} />
                                )}
                                {s.icon === 'battery_alert' && (
                                    <BatteryWarning size={18} color={s.ic} />
                                )}
                                {s.icon === 'maintenance' && <Settings2 size={18} color={s.ic} />}
                            </div>
                            <div>
                                <div className="stat-label">{s.label}</div>
                                <div className="stat-value">{s.val}</div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* ── Search + filter bar ── */}
                <div className="filter-bar" style={{ flexWrap: 'wrap' }}>
                    {/* Search */}
                    <div style={{ position: 'relative', flex: 1, minWidth: 180 }}>
                        <Search
                            style={{
                                position: 'absolute',
                                left: 10,
                                top: '50%',
                                transform: 'translateY(-50%)',
                                color: 'var(--muted)',
                                pointerEvents: 'none',
                            }}
                            size={18}
                        />
                        <input
                            className="search-input"
                            style={{ width: '100%', paddingLeft: 36 }}
                            placeholder="Search by ID, MAC Address, or Assignment..."
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
                <div className="table-card table-scroll-wrapper">
                    <table className="data-table" style={{ minWidth: '800px' }}>
                        <thead>
                            <tr>
                                <th>BEACON DETAILS</th>
                                <th>ASSIGNED TO / LOCATION</th>
                                <th>BATTERY & HEALTH</th>
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
                                        <SearchX
                                            size={40}
                                            color="#CBD5E1"
                                            style={{
                                                display: 'block',
                                                marginBottom: 8,
                                                margin: '0 auto',
                                            }}
                                        />
                                        No beacons found
                                        {search ? ` matching "${search}"` : ''}
                                        {statusFilter !== 'All'
                                            ? ` with status "${statusFilter}"`
                                            : ''}
                                    </td>
                                </tr>
                            ) : (
                                paginated.map((b) => (
                                    <tr key={b.id}>
                                        <td>
                                            <div
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: 9,
                                                }}
                                            >
                                                <div
                                                    className="avatar"
                                                    style={{
                                                        background: '#EFF6FF',
                                                        color: '#2563EB',
                                                        width: 36,
                                                        height: 36,
                                                    }}
                                                >
                                                    <Settings2 size={18} />
                                                </div>
                                                <div>
                                                    <div
                                                        style={{
                                                            fontWeight: 800,
                                                            color: 'var(--text)',
                                                        }}
                                                    >
                                                        {b.id}
                                                    </div>
                                                    <div
                                                        style={{
                                                            fontSize: 11,
                                                            color: 'var(--muted)',
                                                            fontFamily: 'monospace',
                                                        }}
                                                    >
                                                        {b.macAddress}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div
                                                style={{
                                                    fontSize: 13,
                                                    fontWeight: 600,
                                                    color: 'var(--text)',
                                                }}
                                            >
                                                {b.assignedTo}
                                            </div>
                                            <div style={{ fontSize: 11, color: 'var(--muted)' }}>
                                                <MapPin
                                                    size={12}
                                                    style={{
                                                        verticalAlign: '-2px',
                                                        marginRight: 2,
                                                    }}
                                                />
                                                {b.location}
                                            </div>
                                        </td>
                                        <td>
                                            <div
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: 6,
                                                }}
                                            >
                                                <div
                                                    style={{
                                                        width: 40,
                                                        height: 6,
                                                        background: '#E2E8F0',
                                                        borderRadius: 10,
                                                        overflow: 'hidden',
                                                    }}
                                                >
                                                    <div
                                                        style={{
                                                            height: '100%',
                                                            width: `${b.batteryLevel}%`,
                                                            background:
                                                                b.batteryLevel > 50
                                                                    ? '#10B981'
                                                                    : b.batteryLevel > 20
                                                                      ? '#F59E0B'
                                                                      : '#EF4444',
                                                        }}
                                                    />
                                                </div>
                                                <span
                                                    style={{
                                                        fontSize: 12,
                                                        fontWeight: 700,
                                                        color: '#475569',
                                                    }}
                                                >
                                                    {b.batteryLevel}%
                                                </span>
                                            </div>
                                        </td>
                                        <td style={{ fontSize: 12, color: 'var(--muted)' }}>
                                            {b.lastPing}
                                        </td>
                                        <td>
                                            <Badge variant={getStatusVariant(b.status)}>
                                                {b.status}
                                            </Badge>
                                        </td>
                                        <td>
                                            <div className="actions-col">
                                                <button
                                                    className="act-btn act-view"
                                                    title="View Beacon"
                                                    onClick={() => setViewingBeacon(b)}
                                                >
                                                    <Eye size={16} className="ms" />
                                                </button>
                                                <button
                                                    className="act-btn act-edit"
                                                    title="Edit Beacon"
                                                    onClick={() =>
                                                        navigate('/masters/beacon-devices/create')
                                                    }
                                                >
                                                    <Edit size={16} className="ms" />
                                                </button>
                                                <button
                                                    className="act-btn act-delete"
                                                    title="Delete Beacon"
                                                >
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
                        <Pagination current={safePage} total={pages} onChange={(p) => setPage(p)} />
                    )}
                </div>
            </div>

            {/* View Overlay */}
            {viewingBeacon && (
                <ViewOverlay beacon={viewingBeacon} onClose={() => setViewingBeacon(null)} />
            )}
        </>
    );
};
