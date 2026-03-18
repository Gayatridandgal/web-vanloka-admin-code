import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useCallback, useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import { INITIAL_INSTRUCTORS } from '../data/instructorData';
import { INITIAL_TRAINEES } from '../data/traineeData';
import { INITIAL_VEHICLES } from '../data/vehicleData';
import {
    LayoutDashboard,
    Bus,
    Users,
    Activity as ActivityIcon,
    ShieldCheck,
    Clock,
    MapPin,
    RotateCw,
    Calendar,
    Radio
} from 'lucide-react';
import { Badge } from '../ui';

// Fix leaflet default icons
delete (L.Icon.Default.prototype as unknown as Record<string, unknown>)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const INACTIVITY_MS = 5 * 60 * 1000;

/* ─── Status items ───────────────────────────────────────────────── */
const STATUS_ITEMS = [
    {
        label: 'Server',
        dotCls: 'dot-green',
        badgeCls: 'badge-green',
        text: 'Online',
    },
    {
        label: 'Database',
        dotCls: 'dot-green',
        badgeCls: 'badge-green',
        text: 'Healthy',
    },
    {
        label: 'GPS Tracking',
        dotCls: 'dot-green',
        badgeCls: 'badge-green',
        text: 'Active',
    },
    {
        label: 'Payments',
        dotCls: 'dot-amber',
        badgeCls: 'badge-amber',
        text: 'Partial',
    },
];

/* ─── Props ──────────────────────────────────────────────────────── */
interface Props {
    onViewSessions: () => void;
}

/* ═══════════════════════════════════════════════════════════════════
   DASHBOARD
═══════════════════════════════════════════════════════════════════ */
export const Dashboard = ({ onViewSessions }: Props) => {
    const [showTimeout, setShowTimeout] = useState(false);
    const [countdown, setCountdown] = useState(Math.floor(INACTIVITY_MS / 1000));
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const countdownRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const startTimer = useCallback(() => {
        if (timerRef.current) clearTimeout(timerRef.current);
        if (countdownRef.current) clearInterval(countdownRef.current);

        countdownRef.current = setInterval(() => {
            setCountdown((prev) => (prev <= 1 ? 0 : prev - 1));
        }, 1000);

        timerRef.current = setTimeout(() => {
            if (countdownRef.current) clearInterval(countdownRef.current);
            setCountdown(0);
            setShowTimeout(true);
        }, INACTIVITY_MS);
    }, []);

    const resetTimer = useCallback(() => {
        setShowTimeout((prev) => {
            if (!prev) {
                setCountdown(Math.floor(INACTIVITY_MS / 1000));
                startTimer();
            }
            return prev;
        });
    }, [startTimer]);

    useEffect(() => {
        startTimer();

        const events = ['mousedown', 'mousemove', 'keydown', 'scroll', 'touchstart', 'click'];
        events.forEach((e) => window.addEventListener(e, resetTimer, { passive: true }));

        return () => {
            events.forEach((e) => window.removeEventListener(e, resetTimer));
            if (timerRef.current) clearTimeout(timerRef.current);
            if (countdownRef.current) clearInterval(countdownRef.current);
        };
    }, [startTimer, resetTimer]);

    const mmss = `${String(Math.floor(countdown / 60)).padStart(2, '0')}:${String(countdown % 60).padStart(2, '0')}`;

    return (
        <>
            {/* ══ INACTIVITY OVERLAY ══════════════════════════════════════ */}
            {showTimeout && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[9999] flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl p-10 text-center max-w-md w-full shadow-2xl">
                        <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Clock size={32} />
                        </div>
                        <h3 className="text-xl font-black text-slate-900 mb-2">Session Timed Out</h3>
                        <p className="text-sm text-slate-500 leading-relaxed mb-8">
                            You've been inactive for <strong>5 minutes</strong>. Please refresh the page to continue.
                        </p>
                        <button
                            className="btn btn-primary w-full py-3"
                            onClick={() => window.location.reload()}
                        >
                            Refresh Now
                        </button>
                    </div>
                </div>
            )}

            {/* ── Page Header ── */}
            <div className="page-header">
                <div>
                    <div className="page-title">
                        <LayoutDashboard size={18} strokeWidth={2.5} className="mr-2 text-indigo-600" />
                        Intelligence Dashboard
                    </div>
                    <div className="breadcrumb">
                        Admin <span>/</span> Operational Overview
                    </div>
                </div>
                <div className="header-actions">
                    <span className="badge badge-live">
                        <span className="hidden sm:inline">● System Operational</span>
                        <span className="sm:hidden">● Online</span>
                    </span>
                </div>
            </div>

            {/* ── Page Body ── */}
            <div className="page-body">
                {/* Top stats row */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
                    {/* Total Vehicles */}
                    <div className="stat-card">
                        <div className="stat-icon" style={{ background: '#DBEAFE', color: '#2563EB' }}>
                            <Bus size={22} strokeWidth={2.5} />
                        </div>
                        <div>
                            <div className="stat-label">Total Vehicles</div>
                            <div className="stat-value">{INITIAL_VEHICLES.length}</div>
                        </div>
                    </div>

                    {/* Total Instructors */}
                    <div className="stat-card">
                        <div className="stat-icon" style={{ background: '#EDE9FE', color: '#7C3AED' }}>
                            <ShieldCheck size={22} strokeWidth={2.5} />
                        </div>
                        <div>
                            <div className="stat-label">Total Instructors</div>
                            <div className="stat-value">{INITIAL_INSTRUCTORS.length}</div>
                        </div>
                    </div>

                    {/* Total Trainees */}
                    <div className="stat-card">
                        <div className="stat-icon" style={{ background: '#FEF3C7', color: '#D97706' }}>
                            <Users size={22} strokeWidth={2.5} />
                        </div>
                        <div>
                            <div className="stat-label">Total Trainees</div>
                            <div className="stat-value">{INITIAL_TRAINEES.length}</div>
                        </div>
                    </div>

                    {/* System Status */}
                    <div className="stat-card">
                        <div className="stat-icon" style={{ background: '#DCFCE7', color: '#059669' }}>
                            <ActivityIcon size={22} strokeWidth={2.5} />
                        </div>
                        <div>
                            <div className="stat-label">System Status</div>
                            <div className="flex items-center gap-1.5 mt-0.5">
                                <div className="status-dot dot-green" />
                                <span className="text-[14px] font-black text-emerald-600 uppercase tracking-tight">ONLINE</span>
                            </div>
                        </div>
                    </div>

                    {/* Session Timeout */}
                    <div className="stat-card">
                        <div className="stat-icon" style={{ background: '#FEE2E2', color: '#DC2626' }}>
                            <Clock size={22} strokeWidth={2.5} />
                        </div>
                        <div>
                            <div className="stat-label">Session Timeout</div>
                            <div className="stat-value" style={{ color: countdown < 60 ? '#DC2626' : 'inherit' }}>
                                {mmss}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Dashboard Layout */}
                <div className="dashboard-grid" style={{ padding: '0 24px 24px' }}>
                    {/* Left: Map + Recent Activity */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                        {/* Map & Live Tracking Header */}
                        <div style={{ background: 'white', borderRadius: 24, border: '1px solid var(--border)', overflow: 'hidden', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                            <div style={{ padding: '16px 24px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'linear-gradient(to right, #ffffff, #f8fafc)' }}>
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                    <span style={{ fontSize: 13, fontWeight: 900, color: '#0f172a', textTransform: 'uppercase', letterSpacing: '0.02em' }}>Live Fleet Tracking</span>
                                </div>
                                <div className="flex gap-2">
                                    <button 
                                        className="btn btn-secondary" 
                                        style={{ fontSize: 11, padding: '6px 12px' }}
                                        onClick={() => {
                                            const map = (window as unknown as { dashMap: unknown }).dashMap;
                                            if (map) (map as { invalidateSize: () => void }).invalidateSize();
                                        }}
                                    >
                                        <RotateCw size={14} className="mr-1" /> Refresh
                                    </button>
                                </div>
                            </div>
                            
                            <div className="map-container" style={{ position: 'relative', minHeight: 480, border: 'none', borderRadius: 0 }}>
                                <MapContainer
                                    center={[15.8497, 74.4977]}
                                    zoom={13}
                                    scrollWheelZoom={true}
                                    style={{ height: '100%', width: '100%', minHeight: 480 }}
                                    zoomControl={true}
                                    ref={(m) => {
                                        if (m) (window as unknown as { dashMap: typeof m }).dashMap = m;
                                    }}
                                >
                                    <TileLayer
                                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    />
                                </MapContainer>

                                {/* Map Overlay for Empty State */}
                                <div className="map-overlay-content">
                                    <div className="bg-white/95 backdrop-blur-md rounded-2xl p-8 text-center shadow-xl border border-slate-200 max-w-[340px]">
                                        <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-5 text-slate-300">
                                            <MapPin size={32} />
                                        </div>
                                        <h4 className="text-base font-black text-slate-900 mb-2 uppercase tracking-wide">
                                            No Active Vehicles
                                        </h4>
                                        <p className="text-sm text-slate-500 font-medium leading-relaxed">
                                            Your fleet is currently offline. Connect vehicle devices to begin real-time operational tracking.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Recent Activity Section */}
                        <div style={{ background: 'white', borderRadius: 24, border: '1px solid var(--border)', padding: '24px 32px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
                                <div>
                                    <h3 style={{ fontSize: 16, fontWeight: 900, color: '#0F172A', margin: 0 }}>Recent System Events</h3>
                                    <p style={{ fontSize: 12, color: '#64748b', marginTop: 4, fontWeight: 600 }}>Real-time logs for session overrides & admin actions.</p>
                                </div>
                                <button className="btn btn-secondary" style={{ fontSize: 11, padding: '8px 16px', borderRadius: 12 }} onClick={onViewSessions}>View Audit Log</button>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                                {[
                                    { user: 'Rahul Sharma', action: 'Admin Login', time: '2 mins ago', icon: '👤', color: '#7C3AED', tag: 'SECURITY' },
                                    { user: 'Suresh Menon', action: 'Session Initialized', time: '15 mins ago', icon: '📝', color: '#059669', tag: 'SESSION' },
                                    { user: 'System', action: 'Cache Optimization', time: '1 hour ago', icon: '⚙️', color: '#64748B', tag: 'HYGIENE' },
                                    { user: 'Aditya Raj', action: 'Manual GPS Override', time: '3 hours ago', icon: '📡', color: '#DC2626', tag: 'OVERRIDE' }
                                ].map((act, i) => (
                                    <div key={i} className="group" style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '16px', borderRadius: 16, border: '1px solid transparent', transition: 'all 0.2s', cursor: 'default' }}>
                                        <div style={{ width: 44, height: 44, borderRadius: 14, background: '#F8FAFC', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, border: '1px solid #f1f5f9' }}>
                                            {act.icon}
                                        </div>
                                        <div style={{ flex: 1 }}>
                                            <div className="flex items-center gap-2">
                                                <span style={{ fontSize: 14, fontWeight: 900, color: '#111827' }}>{act.user}</span>
                                                <span style={{ fontSize: 9, fontWeight: 900, padding: '2px 6px', borderRadius: 6, background: `${act.color}10`, color: act.color, letterSpacing: '0.05em' }}>{act.tag}</span>
                                            </div>
                                            <div style={{ fontSize: 12, color: '#64748B', marginTop: 2, fontWeight: 600 }}>{act.action}</div>
                                        </div>
                                        <div style={{ textAlign: 'right' }}>
                                            <div style={{ fontSize: 11, fontWeight: 800, color: '#94A3B8' }}>{act.time}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Panel: Operational Status + Configuration */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                        <div className="vehicle-select-panel" style={{ width: '100%', borderRadius: 24, padding: 32, border: '1px solid var(--border)', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                            <div className="flex flex-col items-center text-center">
                                <div style={{ 
                                    width: 72, 
                                    height: 72, 
                                    background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)', 
                                    color: '#94a3b8', 
                                    borderRadius: 24, 
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    justifyContent: 'center', 
                                    marginBottom: 20,
                                    border: '1px solid #e2e8f0'
                                }}>
                                    <Radio size={36} />
                                </div>
                                <h4 style={{ fontSize: 15, fontWeight: 900, color: '#0f172a', textTransform: 'uppercase', letterSpacing: '0.02em', marginBottom: 6 }}>
                                    Fleet Operations
                                </h4>
                                <p style={{ fontSize: 12, color: '#64748b', fontWeight: 600, lineHeight: 1.5, marginBottom: 32 }}>
                                    Select a vehicle on the map to begin live telemetry override.
                                </p>
                            </div>

                            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 16 }}>
                                <div style={{ fontSize: 10, fontWeight: 900, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 4 }}>System Integrity</div>
                                {STATUS_ITEMS.map((s) => (
                                    <div
                                        key={s.label}
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            padding: '8px 0'
                                        }}
                                    >
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                            <div className={`status-dot ${s.dotCls}`} style={{ width: 6, height: 6 }} />
                                            <span style={{ fontSize: 13, fontWeight: 800, color: '#334155' }}>{s.label}</span>
                                        </div>
                                        <Badge variant={s.badgeCls.includes('green') ? 'green' : s.badgeCls.includes('amber') ? 'orange' : 'red'}>
                                            {s.text}
                                        </Badge>
                                    </div>
                                ))}

                                <div style={{ marginTop: 12, padding: '20px', background: '#f8fafc', borderRadius: 20, border: '1px solid #f1f5f9' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                                        <span style={{ fontSize: 11, fontWeight: 900, color: '#64748b', textTransform: 'uppercase' }}>Database Storage</span>
                                        <span style={{ fontSize: 11, fontWeight: 900, color: '#0f172a' }}>65%</span>
                                    </div>
                                    <div className="prog-bar" style={{ height: 6, background: '#e2e8f0' }}>
                                        <div className="prog-fill" style={{ width: '65%', background: 'linear-gradient(to right, #7C3AED, #A855F7)', borderRadius: 10 }} />
                                    </div>
                                </div>
                            </div>

                            <button
                                className="btn btn-primary w-full py-3.5 mt-8 flex items-center justify-center gap-2 font-black text-xs uppercase tracking-widest bg-slate-900 rounded-xl shadow-lg shadow-slate-900/10 hover:shadow-xl transition-all"
                                onClick={onViewSessions}
                            >
                                <Calendar size={16} /> Manage All Sessions
                            </button>
                        </div>
                        
                        <div style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', borderRadius: 24, padding: 32, textAlign: 'center', color: 'white', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }}>
                            <div style={{ fontSize: 11, fontWeight: 900, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12 }}>Network Performance</div>
                            <div style={{ fontSize: 32, fontWeight: 900, color: '#10b981', letterSpacing: '-0.02em' }}>98.2%</div>
                            <div style={{ fontSize: 11, color: '#10b981', fontWeight: 900, marginTop: 8, background: 'rgba(16,185,129,0.1)', display: 'inline-block', padding: '4px 12px', borderRadius: 100 }}>OPTIMAL HEALTH</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
