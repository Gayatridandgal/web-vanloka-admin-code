import { motion } from 'framer-motion';
import {
    Activity,
    AlertCircle,
    Banknote,
    BarChart4,
    Bell,
    Car,
    CheckCircle2,
    ChevronDown,
    ChevronLeft,
    Clock,
    Download,
    Eye,
    FileText,
    Filter,
    Fuel,
    Search,
    Settings,
    ShieldCheck,
} from 'lucide-react';
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Line,
    Bar,
    ComposedChart,
    PieChart,
    Pie,
    Cell,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer,
    AreaChart,
    Area,
    Radar,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    XAxis,
    YAxis,
} from 'recharts';
import { type PerformanceRecord, INITIAL_REPORT_DATA, scoreVariant } from '../data/reportData';
import { Badge, Pagination } from '../ui/index';

/* ═══════════════════════════════════════════════════
   CHART DATA
   ═══════════════════════════════════════════════════ */
const revenueData = [
    { month: 'Jan', revenue: 24000, costs: 18000 },
    { month: 'Feb', revenue: 26000, costs: 21000 },
    { month: 'Mar', revenue: 35000, costs: 23000 },
    { month: 'Apr', revenue: 32000, costs: 20000 },
    { month: 'May', revenue: 42000, costs: 25000 },
    { month: 'Jun', revenue: 48000, costs: 28000 },
];

const fuelData = [
    { name: 'Heavy Trucks', value: 45, color: '#7C3AED' }, // Indigo/Purple
    { name: 'Delivery Vans', value: 32, color: '#2563EB' }, // Blue
    { name: 'Commercial Sedans', value: 18, color: '#0ea5e9' }, // Sky
    { name: 'Others', value: 5, color: '#94a3b8' }, // Slate
];

/* ═══════════════════════════════════════════════════
   ANIMATION VARIANTS
   ═══════════════════════════════════════════════════ */
const containerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.1 },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: {
        opacity: 1,
        y: 0,
        transition: { type: 'spring' as const, stiffness: 300, damping: 24 },
    },
};

/* ═══════════════════════════════════════════════════
   OVERLAY MODAL
   ═══════════════════════════════════════════════════ */
const ViewOverlay = ({ record, onClose }: { record: PerformanceRecord; onClose: () => void }) => {
    const isGood = record.score === 'Excellent' || record.score === 'High Efficiency';
    const headerBg = isGood
        ? 'linear-gradient(135deg, #059669 0%, #047857 100%)'
        : record.score === 'Moderate'
            ? 'linear-gradient(135deg, #d97706 0%, #b45309 100%)'
            : 'linear-gradient(135deg, #dc2626 0%, #991b1b 100%)';

    const Field = ({ label, value, color }: { label: string; value: string; color?: string }) => (
        <div>
            <div
                style={{
                    fontSize: 10,
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    letterSpacing: '.06em',
                    color: 'var(--muted)',
                    marginBottom: 3,
                }}
            >
                {label}
            </div>
            <div style={{ fontSize: 13, fontWeight: 600, color: color || 'var(--text)' }}>
                {value || '—'}
            </div>
        </div>
    );

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
                padding: 24,
            }}
            onClick={onClose}
        >
            <div
                style={{
                    background: 'white',
                    borderRadius: 16,
                    width: '100%',
                    maxWidth: 600,
                    maxHeight: '90vh',
                    overflow: 'auto',
                    boxShadow: '0 20px 60px rgba(0,0,0,.15)',
                }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div
                    style={{
                        background: headerBg,
                        padding: '24px',
                        borderRadius: '16px 16px 0 0',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        textAlign: 'center',
                        gap: 16,
                        position: 'relative'
                    }}
                    className="md:flex-row md:text-left md:items-center md:gap-[18px]"
                >
                    <div
                        style={{
                            width: 64,
                            height: 64,
                            borderRadius: 16,
                            background: 'rgba(255,255,255,0.2)',
                            color: 'white',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: 22,
                            fontWeight: 900,
                            border: '3px solid rgba(255,255,255,.3)',
                            flexShrink: 0,
                        }}
                    >
                        <Car size={32} />
                    </div>
                    <div style={{ flex: 1 }}>
                        <div
                            style={{
                                fontSize: 20,
                                fontWeight: 900,
                                color: 'white',
                                marginBottom: 4,
                            }}
                        >
                            Performance Report
                        </div>
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 10,
                                flexWrap: 'wrap',
                                justifyContent: 'center',
                            }}
                            className="md:justify-start"
                        >
                            <span
                                style={{
                                    fontSize: 12,
                                    color: 'rgba(255,255,255,.75)',
                                    fontWeight: 600,
                                }}
                            >
                                ID: {record.id}
                            </span>
                            <Badge variant={scoreVariant(record.score)}>{record.score}</Badge>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        style={{
                            background: 'rgba(255,255,255,.15)',
                            border: 'none',
                            borderRadius: 8,
                            width: 36,
                            height: 36,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                            position: 'absolute',
                            top: 20,
                            right: 20,
                        }}
                    >
                        <X size={20} color="white" />
                    </button>
                </div>

                {/* Body */}
                <div style={{ padding: '24px 28px' }}>
                    {/* Quick stats */}
                    <div
                        style={{
                            display: 'grid',
                            gap: 12,
                            marginBottom: 24,
                        }}
                        className="grid-cols-1 md:grid-cols-3"
                    >
                        {[
                            {
                                label: 'Distance',
                                value: `${record.distance.toLocaleString()} km`,
                                icon: <Activity size={20} />,
                                bg: '#EDE9FE',
                                ic: '#7C3AED',
                            },
                            {
                                label: 'Fuel Cost',
                                value: `$${record.fuelCost.toFixed(2)}`,
                                icon: <Fuel size={20} />,
                                bg: '#FEE2E2',
                                ic: '#DC2626',
                            },
                            {
                                label: 'Revenue',
                                value: `$${record.revenue.toFixed(2)}`,
                                icon: <Banknote size={20} />,
                                bg: '#DCFCE7',
                                ic: '#059669',
                            },
                        ].map((s) => (
                            <div
                                key={s.label}
                                style={{
                                    background: s.bg,
                                    borderRadius: 10,
                                    padding: '12px 14px',
                                    textAlign: 'center',
                                }}
                            >
                                <div style={{ color: s.ic, marginBottom: 4 }}>
                                    {s.icon}
                                </div>
                                <div
                                    style={{
                                        fontSize: 14,
                                        fontWeight: 900,
                                        color: 'var(--text)',
                                    }}
                                >
                                    {s.value}
                                </div>
                                <div
                                    style={{
                                        fontSize: 10,
                                        fontWeight: 700,
                                        color: '#64748B',
                                        marginTop: 2,
                                    }}
                                >
                                    {s.label}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Operational Details */}
                    <div
                        style={{
                            fontSize: 11,
                            fontWeight: 900,
                            textTransform: 'uppercase',
                            letterSpacing: '.07em',
                            color: 'var(--primary)',
                            marginBottom: 12,
                            display: 'flex',
                            alignItems: 'center',
                            gap: 6,
                        }}
                    >
                        <Settings size={16} />
                        Operational Details
                    </div>
                    <div
                        style={{
                            display: 'grid',
                            gap: 16,
                            marginBottom: 24,
                        }}
                        className="grid-cols-1 sm:grid-cols-2 md:grid-cols-3"
                    >
                        <Field label="Vehicle Type" value={record.type} />
                        <Field label="Idle Time" value={`${record.idleTime} hrs`} />
                        <Field label="Efficiency" value={`${(record.revenue / record.fuelCost).toFixed(2)} rev/fuel`} />
                    </div>

                    {/* Summary */}
                    <div
                        style={{
                            fontSize: 11,
                            fontWeight: 900,
                            textTransform: 'uppercase',
                            letterSpacing: '.07em',
                            color: 'var(--primary)',
                            marginBottom: 12,
                            display: 'flex',
                            alignItems: 'center',
                            gap: 6,
                        }}
                    >
                        <FileText size={16} />
                        Performance Summary
                    </div>
                    <div
                        style={{
                            fontSize: 13,
                            color: '#64748B',
                            lineHeight: 1.6,
                            padding: '12px 16px',
                            background: 'var(--surface)',
                            borderRadius: 8,
                            border: '1px solid var(--border)',
                        }}
                    >
                        Generating <strong style={{color: '#059669'}}>${(record.revenue / record.fuelCost).toFixed(2)}</strong> for every dollar spent on fuel. 
                        Cost averages <strong style={{color: 'var(--text)'}}>${(record.fuelCost / record.distance).toFixed(2)}</strong> per kilometer driven.
                        {record.idleTime > 15 && ' High idle time detected; routing optimization recommended.'}
                    </div>

                    <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 24 }} className="sm:flex-row">
                        <button className="btn btn-secondary w-full sm:w-auto" onClick={onClose} style={{ minWidth: 120 }}>
                            Close Window
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

/* ═══════════════════════════════════════════════════
   BASIC REPORT VIEW
   ═══════════════════════════════════════════════════ */
const BasicReportView = () => {
    const [records] = useState<PerformanceRecord[]>(INITIAL_REPORT_DATA);
    const [search, setSearch] = useState('');
    const [typeFilter, setTypeFilter] = useState('All');
    const [viewRecord, setViewRecord] = useState<PerformanceRecord | null>(null);

    const filtered = records.filter((r) => {
        const q = search.toLowerCase().trim();
        const matchSearch = !q || r.id.toLowerCase().includes(q);
        const matchType = typeFilter === 'All' || r.type === typeFilter;
        return matchSearch && matchType;
    });

    return (
        <>
            {/* ── Toolbar ── */}
            <div className="toolbar" style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap', background: 'white', padding: '16px 20px', borderRadius: 12, marginBottom: 24, border: '1px solid var(--border)' }}>
                <div style={{ flex: 1 }}>
                    <h2 style={{ fontSize: 16, fontWeight: 900, color: 'var(--text)', margin: 0 }}>Executive Overview</h2>
                    <p style={{ fontSize: 12, color: 'var(--muted)', margin: 0 }}>Real-time intelligence on fleet operations and economics.</p>
                </div>
                <div className="header-actions">
                    <button className="btn btn-secondary px-4 py-2 flex items-center gap-2">
                        <Download size={16} /> Excel Output
                    </button>
                    <button className="btn btn-primary px-4 py-2 flex items-center gap-2">
                        <FileText size={16} /> Print Report
                    </button>
                </div>
            </div>

            {/* ── TREND INSIGHT BANNER ── */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mb-8 p-5 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl shadow-lg border border-emerald-400 text-white flex items-center gap-5"
            >
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm shrink-0">
                    <Activity size={24} className="text-white" />
                </div>
                <div>
                    <h3 className="text-emerald-50 font-bold text-xs uppercase tracking-wider mb-0.5">
                        Trend Insight
                    </h3>
                    <p className="text-base font-semibold leading-snug">
                        Fuel efficiency increased by <span className="font-black text-white">4.2%</span>{' '}
                        across the heavy truck fleet this month, correlating with the recent routing
                        optimization. <strong>VH-4022</strong> still requires maintenance review due to
                        anomalous idling metrics.
                    </p>
                </div>
            </motion.div>

            <div>
                <motion.div variants={containerVariants} initial="hidden" animate="show">
                    {/* ── STATS ROW ── */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                        {[
                            {
                                icon: Car,
                                color: '#2563EB',
                                bg: '#DBEAFE',
                                label: 'Active Fleet',
                                val: '124',
                                trend: '↑ 4.2% ',
                                tc: 'trend-up',
                            },
                            {
                                icon: Banknote,
                                color: '#059669',
                                bg: '#DCFCE7',
                                label: 'Total Revenue',
                                val: '$42,850',
                                trend: '↑ 12.5%',
                                tc: 'trend-up',
                            },
                            {
                                icon: Fuel,
                                color: '#D97706',
                                bg: '#FEF3C7',
                                label: 'Avg Fuel Efficiency',
                                val: '18.4 mpg',
                                trend: '↓ 2.1%',
                                tc: 'trend-down',
                            },
                            {
                                icon: Clock,
                                color: '#7C3AED',
                                bg: '#EDE9FE',
                                label: 'On-Time Rate',
                                val: '98.2%',
                                trend: '0.0%',
                                tc: 'trend-neutral',
                            },
                        ].map((s, i) => (
                            <motion.div
                                key={i}
                                variants={itemVariants}
                                layout
                                className="stat-card"
                            >
                                <div className="stat-icon" style={{ background: s.bg }}>
                                    <div style={{ color: s.color }}>
                                        <s.icon size={22} strokeWidth={2.5} />
                                    </div>
                                </div>
                                <div>
                                    <div className="stat-label">{s.label}</div>
                                    <div className="stat-value">{s.val}</div>
                                    <div className={`stat-trend ${s.tc}`}>{s.trend}</div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* ── CHARTS ROW ── */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                        {/* Area Chart: Revenue vs Costs */}
                        <motion.div
                            variants={itemVariants}
                            layout
                            className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col h-[400px]"
                        >
                            <div className="mb-6 flex justify-between items-start">
                                <div>
                                    <h3 className="text-base font-extrabold text-slate-900 m-0">
                                        Revenue & Operational Costs
                                    </h3>
                                    <p className="text-sm text-slate-500 mt-1">
                                        Historical financial performance over 6 months
                                    </p>
                                </div>
                                <div className="flex gap-2 text-xs font-bold text-slate-500">
                                    <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-emerald-500" /> Revenue</span>
                                    <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-red-500" /> Costs</span>
                                </div>
                            </div>
                            <div className="flex-1 min-h-0 w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart
                                        data={revenueData}
                                        margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                                    >
                                        <defs>
                                            <linearGradient
                                                id="colorRev"
                                                x1="0"
                                                y1="0"
                                                x2="0"
                                                y2="1"
                                            >
                                                <stop
                                                    offset="5%"
                                                    stopColor="#10B981"
                                                    stopOpacity={0.3}
                                                />
                                                <stop
                                                    offset="95%"
                                                    stopColor="#10B981"
                                                    stopOpacity={0}
                                                />
                                            </linearGradient>
                                            <linearGradient
                                                id="colorCost"
                                                x1="0"
                                                y1="0"
                                                x2="0"
                                                y2="1"
                                            >
                                                <stop
                                                    offset="5%"
                                                    stopColor="#EF4444"
                                                    stopOpacity={0.3}
                                                />
                                                <stop
                                                    offset="95%"
                                                    stopColor="#EF4444"
                                                    stopOpacity={0}
                                                />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid
                                            strokeDasharray="3 3"
                                            vertical={false}
                                            stroke="#E2E8F0"
                                        />
                                        <XAxis
                                            dataKey="month"
                                            stroke="#94A3B8"
                                            fontSize={12}
                                            tickLine={false}
                                            axisLine={false}
                                            dy={10}
                                        />
                                        <YAxis
                                            stroke="#94A3B8"
                                            fontSize={12}
                                            tickLine={false}
                                            axisLine={false}
                                            tickFormatter={(value) => `$${value / 1000}k`}
                                        />
                                        <Tooltip
                                            contentStyle={{
                                                borderRadius: 12,
                                                border: 'none',
                                                boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                                                fontWeight: 700,
                                            }}
                                            itemStyle={{ fontWeight: 800 }}
                                            formatter={(value) => [
                                                typeof value === 'number'
                                                    ? `$${value.toLocaleString()}`
                                                    : '$0',
                                                undefined,
                                            ]}
                                        />
                                        <Area
                                            type="monotone"
                                            dataKey="revenue"
                                            name="Revenue"
                                            stroke="#10B981"
                                            strokeWidth={3}
                                            fillOpacity={1}
                                            fill="url(#colorRev)"
                                        />
                                        <Area
                                            type="monotone"
                                            dataKey="costs"
                                            name="Costs"
                                            stroke="#EF4444"
                                            strokeWidth={3}
                                            fillOpacity={1}
                                            fill="url(#colorCost)"
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </motion.div>

                        {/* Donut Chart: Fuel Consumption */}
                        <motion.div
                            variants={itemVariants}
                            layout
                            className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col h-[400px]"
                        >
                            <div className="mb-4">
                                <h3 className="text-base font-extrabold text-slate-900 m-0">
                                    Fuel Consumption Distribution
                                </h3>
                                <p className="text-sm text-slate-500 mt-1">
                                    Volume breakdown by vehicle category
                                </p>
                            </div>
                            <div className="flex flex-1 items-center flex-col sm:flex-row">
                                <div className="flex-1 h-[260px] w-full">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie
                                                data={fuelData}
                                                cx="50%"
                                                cy="50%"
                                                innerRadius={65}
                                                outerRadius={105}
                                                paddingAngle={5}
                                                dataKey="value"
                                                stroke="none"
                                            >
                                                {fuelData.map((entry, index) => (
                                                    <Cell
                                                        key={`cell-${index}`}
                                                        fill={entry.color}
                                                    />
                                                ))}
                                            </Pie>
                                            <Tooltip
                                                contentStyle={{
                                                    borderRadius: 12,
                                                    border: 'none',
                                                    boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                                                    fontWeight: 700,
                                                }}
                                                formatter={(value) => [`${value}%`]}
                                            />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>
                                <div className="flex-1 flex flex-col gap-4 min-w-[150px]">
                                    {fuelData.map((f, i) => (
                                        <div key={i} className="flex items-center gap-3">
                                            <div
                                                className="w-3 h-3 rounded bg-slate-200 shrink-0"
                                                style={{ background: f.color }}
                                            />
                                            <div className="flex-1">
                                                <div className="text-[13px] font-bold text-slate-600">
                                                    {f.name}
                                                </div>
                                                <div className="text-[15px] font-black text-slate-900">
                                                    {f.value}%
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* ── DATA TABLE SECTION ── */}
                    <motion.div variants={itemVariants} layout>
                        <div className="toolbar" style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap', marginBottom: 16 }}>
                            {/* Search */}
                            <div style={{ position: 'relative', flex: 1, minWidth: 240 }}>
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
                                    placeholder="Filter by Vehicle ID..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                            </div>
                            {/* Filter */}
                            <div style={{ position: 'relative' }} className="w-full sm:w-[220px]">
                                <select
                                    className="form-select"
                                    style={{ width: '100%', paddingRight: 32 }}
                                    value={typeFilter}
                                    onChange={(e) => setTypeFilter(e.target.value)}
                                >
                                    <option value="All">All Vehicle Types</option>
                                    <option value="Heavy Truck">Heavy Trucks</option>
                                    <option value="Delivery Van">Delivery Vans</option>
                                    <option value="Commercial Sedan">Commercial Sedans</option>
                                    <option value="Other">Others</option>
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

                        <div className="table-card table-scroll-wrapper" style={{ flex: 1 }}>
                            <table className="data-table" style={{ width: '100%', minWidth: 1000 }}>
                                <thead>
                                    <tr>
                                        <th style={{ width: '14%' }}>Vehicle ID</th>
                                        <th style={{ width: '15%' }}>Type</th>
                                        <th style={{ width: '14%' }}>Distance</th>
                                        <th style={{ width: '12%' }}>Fuel Cost</th>
                                        <th style={{ width: '14%' }}>Revenue</th>
                                        <th style={{ width: '10%' }}>Idle (h)</th>
                                        <th style={{ width: '13%' }}>Score</th>
                                        <th style={{ width: '8%', textAlign: 'center' }}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {filtered.length === 0 ? (
                                    <tr>
                                        <td
                                            colSpan={8}
                                            className="text-center py-16 text-slate-400 text-sm font-bold"
                                        >
                                            <AlertCircle
                                                size={48}
                                                className="mx-auto block mb-3 text-slate-300"
                                            />
                                            No records found{search ? ` matching "${search}"` : ''}.
                                        </td>
                                    </tr>
                                ) : (
                                    filtered.map((r, i) => (
                                        <motion.tr
                                            key={r.id}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: i * 0.05 }}
                                        >
                                            <td>
                                                <b>{r.id}</b>
                                            </td>
                                            <td>{r.type}</td>
                                            <td>{r.distance.toLocaleString()} km</td>
                                            <td style={{ color: '#DC2626', fontWeight: 800 }}>${r.fuelCost.toFixed(2)}</td>
                                            <td style={{ color: '#059669', fontWeight: 800 }}>${r.revenue.toFixed(2)}</td>
                                            <td>{r.idleTime.toFixed(1)}</td>
                                            <td>
                                                <Badge
                                                    variant={scoreVariant(r.score)}
                                                >
                                                    {r.score}
                                                </Badge>
                                            </td>
                                            <td style={{ textAlign: 'center' }}>
                                                 <div className="actions-col" style={{ justifyContent: 'center' }}>
                                                     <button
                                                         className="act-btn act-view"
                                                         title="View Details"
                                                         onClick={() => setViewRecord(r)}
                                                     >
                                                         <Eye size={18} className="ms" />
                                                     </button>
                                                 </div>
                                             </td>
                                        </motion.tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                        <Pagination
                            info={`Showing ${filtered.length} of ${records.length} performance records`}
                            pages={[1, 2, 3]}
                            current={1}
                        />
                        </div>
                    </motion.div>
                </motion.div>
            </div>

            {viewRecord && <ViewOverlay record={viewRecord} onClose={() => setViewRecord(null)} />}
        </>
    );
};

/* ═══════════════════════════════════════════════════
   ADVANCED REPORT VIEW
   ═══════════════════════════════════════════════════ */

// Mock Data for Advanced Analytics
const performanceData = [
    { name: 'Mon', revenue: 4000, distance: 2400 },
    { name: 'Tue', revenue: 3000, distance: 1398 },
    { name: 'Wed', revenue: 2000, distance: 9800 },
    { name: 'Thu', revenue: 2780, distance: 3908 },
    { name: 'Fri', revenue: 1890, distance: 4800 },
    { name: 'Sat', revenue: 2390, distance: 3800 },
    { name: 'Sun', revenue: 3490, distance: 4300 },
];


const safetyRankings = [
    { id: 'DRV-1042', name: 'Raj Kumar', incidents: 0, score: 98, status: 'Excellent' },
    { id: 'DRV-0921', name: 'Amit Singh', incidents: 1, score: 92, status: 'Good' },
    { id: 'DRV-1188', name: 'Sanjay Dutt', incidents: 3, score: 85, status: 'Average' },
    { id: 'DRV-0844', name: 'Vikram Patel', incidents: 8, score: 64, status: 'Needs Training' },
];

const AdvancedReportView = () => {
    return (
        <motion.div variants={containerVariants} initial="hidden" animate="show">
            {/* ── Toolbar ── */}
            <div className="toolbar" style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap', background: 'white', padding: '16px 20px', borderRadius: 12, marginBottom: 24, border: '1px solid var(--border)' }}>
                <div style={{ flex: 1 }}>
                    <h2 style={{ fontSize: 16, fontWeight: 900, color: 'var(--text)', margin: 0 }}>Deep Operational Analytics</h2>
                    <p style={{ fontSize: 12, color: 'var(--muted)', margin: 0 }}>Advanced data modeling for driver behavior and efficiency.</p>
                </div>
                <div className="header-actions">
                    <button className="btn btn-secondary px-4 py-2 flex items-center gap-2">
                        <Filter size={16} /> Filters
                    </button>
                    <button className="btn btn-primary px-4 py-2 flex items-center gap-2">
                        <Download size={16} /> Export Data
                    </button>
                </div>
            </div>

            {/* ── STATS ROW ── */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                {[
                    {
                        icon: Activity,
                        color: '#7C3AED',
                        bg: '#EDE9FE',
                        label: 'Distance vs Revenue',
                        val: '$1.85 / km',
                        trend: '↑ 4.2% ',
                        tc: 'trend-up',
                    },
                    {
                        icon: Clock,
                        color: '#D97706',
                        bg: '#FEF3C7',
                        label: 'Cumulative Idle Time',
                        val: '1,420 hrs',
                        trend: '↓ 5.5%',
                        tc: 'trend-up',
                    },
                    {
                        icon: ShieldCheck,
                        color: '#2563EB',
                        bg: '#DBEAFE',
                        label: 'Avg Safety Score',
                        val: '94 / 100',
                        trend: '↑ 1.2%',
                        tc: 'trend-up',
                    },
                ].map((s, i) => (
                    <motion.div
                        key={i}
                        variants={itemVariants}
                        className="stat-card"
                    >
                        <div className="stat-icon" style={{ background: s.bg }}>
                            <div style={{ color: s.color }}>
                                <s.icon size={22} strokeWidth={2.5} />
                            </div>
                        </div>
                        <div>
                            <div className="stat-label">{s.label}</div>
                            <div className="stat-value">{s.val}</div>
                            <div className={`stat-trend ${s.tc}`}>{s.trend}</div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* ── CHARTS ROW ── */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Chart 1: Distance / Revenue Scatter/Line Composed */}
                <motion.div
                    variants={itemVariants}
                    layout
                    className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col h-[400px]"
                >
                    <div className="mb-6 flex justify-between items-start">
                        <div>
                            <h3 className="text-base font-extrabold text-slate-900 m-0">
                                Distance vs Revenue
                            </h3>
                            <p className="text-sm text-slate-500 mt-1">
                                Operational efficiency per vehicle (Composed View)
                            </p>
                        </div>
                        <div className="flex gap-2 text-xs font-bold text-slate-500">
                            <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-purple-500" /> Revenue</span>
                            <span className="flex items-center gap-1"><div className="w-4 h-1 bg-emerald-500" /> Distance</span>
                        </div>
                    </div>
                    <div className="flex-1 min-h-0 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <ComposedChart
                                data={performanceData}
                                margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
                            >
                                <CartesianGrid
                                    strokeDasharray="3 3"
                                    vertical={false}
                                    stroke="#E2E8F0"
                                />
                                <XAxis
                                    dataKey="name"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fontSize: 12, fill: '#64748B' }}
                                    dy={10}
                                />
                                <YAxis
                                    yAxisId="left"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fontSize: 12, fill: '#64748B' }}
                                    dx={-10}
                                />
                                <YAxis
                                    yAxisId="right"
                                    orientation="right"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fontSize: 12, fill: '#64748B' }}
                                    dx={10}
                                />
                                <Tooltip
                                    cursor={{ fill: 'transparent' }}
                                    contentStyle={{
                                        borderRadius: 12,
                                        border: 'none',
                                        boxShadow:
                                            '0 10px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)',
                                    }}
                                    itemStyle={{ fontSize: 14, fontWeight: 700 }}
                                />
                                <Bar
                                    yAxisId="left"
                                    dataKey="revenue"
                                    fill="#A855F7"
                                    radius={[4, 4, 0, 0]}
                                    barSize={30}
                                    name="Revenue ($)"
                                />
                                <Line
                                    yAxisId="right"
                                    type="monotone"
                                    dataKey="distance"
                                    stroke="#10B981"
                                    strokeWidth={3}
                                    dot={{ r: 4, strokeWidth: 2 }}
                                    activeDot={{ r: 8 }}
                                    name="Distance (km)"
                                />
                            </ComposedChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>


                {/* Chart 2: Driver Safety Radar Chart */}
                <motion.div
                    variants={itemVariants}
                    layout
                    className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col h-[400px]"
                >
                    <div className="mb-4 text-center">
                        <h3 className="text-base font-extrabold text-slate-900 m-0">
                            Fleet Driver Safety Profile
                        </h3>
                        <p className="text-sm text-slate-500 mt-1">
                            Aggregate metrics identifying training focal points
                        </p>
                    </div>
                    <div className="flex-1 w-full min-h-0 relative">
                        <ResponsiveContainer width="100%" height="100%">
                            <RadarChart
                                cx="50%"
                                cy="50%"
                                outerRadius="75%"
                                data={[
                                    { metric: 'Speeding', value: 80, fullMark: 100 },
                                    { metric: 'Harsh Braking', value: 65, fullMark: 100 },
                                    { metric: 'Idle Time', value: 45, fullMark: 100 },
                                    { metric: 'Sharp Turns', value: 72, fullMark: 100 },
                                    { metric: 'Tailgating', value: 55, fullMark: 100 },
                                ]}
                            >
                                <PolarGrid stroke="#E2E8F0" />
                                <PolarAngleAxis
                                    dataKey="metric"
                                    tick={{ fill: '#64748B', fontSize: 12, fontWeight: 600 }}
                                />
                                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                                <Radar
                                    name="Fleet Average"
                                    dataKey="value"
                                    stroke="#3B82F6"
                                    fill="#3B82F6"
                                    fillOpacity={0.4}
                                />
                                <Tooltip
                                    contentStyle={{
                                        borderRadius: 12,
                                        border: 'none',
                                        boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
                                    }}
                                />
                            </RadarChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>
            </div>

            {/* ── DRIVER SAFETY TABLE ── */}
             <motion.div
                 variants={itemVariants}
                 layout
                 className="table-card table-scroll-wrapper"
             >
                <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border)' }}>
                    <h3 style={{ fontSize: 16, fontWeight: 900, color: 'var(--text)', margin: 0 }}>Driver Safety Rankings</h3>
                    <p style={{ fontSize: 13, color: 'var(--muted)', marginTop: 4 }}>Bottom performers identified for target training.</p>
                </div>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Driver ID</th>
                            <th>Name</th>
                            <th>Harsh Incidents</th>
                            <th>Safety Score</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {safetyRankings.map((driver, i) => (
                            <tr key={i}>
                                <td><b>{driver.id}</b></td>
                                <td>{driver.name}</td>
                                <td>{driver.incidents}</td>
                                <td>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                        <div style={{ flex: 1, height: 6, background: '#E2E8F0', borderRadius: 3, overflow: 'hidden' }}>
                                            <div
                                                style={{
                                                    height: '100%',
                                                    width: `${driver.score}%`,
                                                    background: driver.score > 90 ? '#10B981' : driver.score > 80 ? '#F59E0B' : '#EF4444',
                                                }}
                                            />
                                        </div>
                                        <span style={{ fontSize: 13, fontWeight: 800, color: 'var(--text)', minWidth: 24 }}>{driver.score}</span>
                                    </div>
                                </td>
                                <td>
                                    <Badge variant={driver.score > 90 ? 'blue' : driver.score > 80 ? 'orange' : 'red'}>
                                        {driver.status}
                                    </Badge>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </motion.div>
        </motion.div>
    );
};

/* ═══════════════════════════════════════════════════
   COMPLIANCE REPORT VIEW
   ═══════════════════════════════════════════════════ */
const complianceDocs = [
    {
        name: 'Vehicle Insurance',
        total: 145,
        valid: 132,
        expiring: 12,
        expired: 1,
        color: '#3B82F6',
    },
    { name: 'Pollution (PUC)', total: 145, valid: 140, expiring: 4, expired: 1, color: '#10B981' },
    {
        name: 'Fitness Certificate',
        total: 145,
        valid: 128,
        expiring: 15,
        expired: 2,
        color: '#F59E0B',
    },
    {
        name: 'Permit (National/State)',
        total: 145,
        valid: 135,
        expiring: 8,
        expired: 2,
        color: '#8B5CF6',
    },
];

const ComplianceReportView = () => {
    return (
        <motion.div variants={containerVariants} initial="hidden" animate="show" className="flex flex-col h-full gap-6">
            {/* ── Toolbar ── */}
            <div className="toolbar" style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap', background: 'white', padding: '16px 20px', borderRadius: 12, marginBottom: 24, border: '1px solid var(--border)' }}>
                <div style={{ flex: 1 }}>
                    <h2 style={{ fontSize: 16, fontWeight: 900, color: 'var(--text)', margin: 0 }}>Statutory Compliance</h2>
                    <p style={{ fontSize: 12, color: 'var(--muted)', margin: 0 }}>Monitoring vehicle fitness, insurance, and permit validity.</p>
                </div>
                <div className="header-actions">
                    <button className="btn btn-secondary px-4 py-2 flex items-center gap-2">
                        <Bell size={16} /> Notifications
                    </button>
                </div>
            </div>

            {/* ── OVERVIEW CARDS ── */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {complianceDocs.map((doc, i) => (
                    <motion.div
                        key={i}
                        variants={itemVariants}
                        layout
                        className="stat-card"
                    >
                        <div className="flex flex-col w-full">
                            <div className="flex items-center gap-4 mb-4">
                                <div
                                    className="stat-icon"
                                    style={{ background: `${doc.color}15` }}
                                >
                                    <div style={{ color: doc.color }}>
                                        <FileText size={20} strokeWidth={2.5} />
                                    </div>
                                </div>
                                <div>
                                    <div className="stat-label">{doc.name}</div>
                                    <div className="stat-value">
                                        {Math.round((doc.valid / doc.total) * 100)}%
                                    </div>
                                </div>
                            </div>

                            <div className="prog-bar mb-4">
                                <div
                                    className="prog-fill"
                                    style={{
                                        width: `${(doc.valid / doc.total) * 100}%`,
                                        background: doc.color,
                                    }}
                                />
                            </div>
                            <div className="flex justify-between text-[10px] font-bold">
                                <span className="flex items-center gap-1" style={{ color: '#10B981' }}>
                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> {doc.valid} Valid
                                </span>
                                <span className="flex items-center gap-1" style={{ color: '#F59E0B' }}>
                                    <div className="w-1.5 h-1.5 rounded-full bg-amber-500" /> {doc.expiring} Exp
                                </span>
                                <span className="flex items-center gap-1" style={{ color: '#EF4444' }}>
                                    <div className="w-1.5 h-1.5 rounded-full bg-red-500" /> {doc.expired} Exp
                                </span>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* ── MAIN CONTENT (TABLE + SIDEBAR) ── */}
            <div className="grid grid-cols-1 xl:grid-cols-[1fr_380px] gap-6 flex-1 min-h-0 overflow-hidden">
                {/* ── DETAILED TABLE ── */}
                <div className="table-card table-scroll-wrapper flex-1">
                    <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border)', background: 'var(--surface)' }}>
                        <h3 style={{ fontSize: 16, fontWeight: 900, color: 'var(--text)', margin: 0 }}>Statutory Document Tracking</h3>
                        <p style={{ fontSize: 13, color: 'var(--muted)', marginTop: 4 }}>Mandatory vehicle and driver documentation status.</p>
                    </div>
                    <div className="flex-1 overflow-auto">
                        <table className="data-table" style={{ minWidth: 850 }}>
                            <thead>
                                <tr>
                                    <th style={{ paddingLeft: 24 }}>Vehicle ID</th>
                                    <th>Insurance</th>
                                    <th>Pollution</th>
                                    <th>Fitness</th>
                                    <th style={{ paddingRight: 24 }}>Permit Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    {
                                        id: 'VH-4021',
                                        ins: '24 Dec 2026',
                                        pol: '15 Oct 2025',
                                        fit: '10 Jan 2026',
                                        per: 'Valid',
                                        perDate: '05 Mar 2027',
                                    },
                                    {
                                        id: 'VH-4022',
                                        ins: '12 Nov 2025',
                                        pol: '02 Sep 2025',
                                        fit: 'Expired',
                                        per: 'Valid',
                                        perDate: '18 Jun 2026',
                                    },
                                    {
                                        id: 'VH-4023',
                                        ins: '05 Jan 2026',
                                        pol: 'Expiring',
                                        fit: '22 Feb 2026',
                                        per: 'Valid',
                                        perDate: '30 Oct 2026',
                                    },
                                    {
                                        id: 'VH-4024',
                                        ins: '18 Aug 2026',
                                        pol: '20 Jul 2025',
                                        fit: '15 Dec 2025',
                                        per: 'Valid',
                                        perDate: '12 Apr 2027',
                                    },
                                    {
                                        id: 'VH-4105',
                                        ins: '02 Jun 2026',
                                        pol: 'Valid',
                                        fit: 'Valid',
                                        per: 'Expired',
                                        perDate: '15 Jan 2025',
                                    },
                                ].map((v, i) => (
                                    <tr key={i}>
                                        <td style={{ paddingLeft: 24 }}>
                                            <div className="flex items-center gap-2">
                                                <div className="p-1.5 bg-slate-100 rounded-lg text-slate-500">
                                                    <Car size={14} />
                                                </div>
                                                <b className="text-slate-900">{v.id}</b>
                                            </div>
                                        </td>
                                        <td>
                                            <span className="text-slate-600 font-bold text-xs">{v.ins}</span>
                                        </td>
                                        <td>
                                            <Badge variant={v.pol === 'Expiring' ? 'orange' : v.pol === 'Expired' ? 'red' : 'green'}>
                                                {v.pol === 'Valid' ? 'Valid' : v.pol}
                                            </Badge>
                                        </td>
                                        <td>
                                            <Badge variant={v.fit === 'Expired' ? 'red' : 'green'}>{v.fit}</Badge>
                                        </td>
                                        <td style={{ paddingRight: 24 }}>
                                            <div className="flex items-center gap-2">
                                                <Badge variant={v.per === 'Expired' ? 'red' : 'blue'}>{v.per}</Badge>
                                                <span className="text-[10px] text-slate-400 font-black uppercase">{v.perDate}</span>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="white-card flex flex-col h-full overflow-hidden" style={{ padding: 0 }}>
                    <div className="modal-head" style={{ background: 'var(--surface)' }}>
                        <div>
                            <h3 style={{ fontSize: 14, fontWeight: 900, color: 'var(--text)', margin: 0 }}>
                                Action Center
                            </h3>
                            <p style={{ fontSize: 10, fontWeight: 800, color: 'var(--muted)', mt: 1, textTransform: 'uppercase', letterSpacing: '0.07em' }}>
                                Critical Renewals
                            </p>
                        </div>
                        <div style={{ width: 36, height: 36, borderRadius: 10, background: '#FEE2E2', color: '#DC2626', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Bell size={18} strokeWidth={2.5} className="animate-pulse" />
                        </div>
                    </div>
                    <div className="p-4 flex-1 overflow-y-auto custom-scrollbar">
                        <div className="flex flex-col gap-3">
                            {[
                                { vh: 'VH-4022', doc: 'Fitness Certificate', status: 'Expired', days: -12, priority: 'High' },
                                { vh: 'VH-4023', doc: 'Pollution (PUC)', status: 'Expiring', days: 5, priority: 'Medium' },
                                { vh: 'VH-4109', doc: 'Insurance Policy', status: 'Expiring', days: 8, priority: 'Medium' },
                                { vh: 'VH-3984', doc: 'National Permit', status: 'Expiring', days: 14, priority: 'Low' },
                            ].map((action, i) => (
                                <div key={i} className="p-4 rounded-xl border border-slate-100 bg-slate-50/30 hover:bg-white hover:border-red-100 transition-all duration-200">
                                    <div className="flex justify-between items-start mb-3">
                                        <div className="flex items-center gap-2.5">
                                            <div className={`w-1.5 h-1.5 rounded-full ${action.status === 'Expired' ? 'bg-red-500' : 'bg-amber-400'} shadow-sm`} />
                                            <div>
                                                <div className="text-xs font-black text-slate-900">{action.vh}</div>
                                                <div className="text-[10px] font-bold text-slate-500 mt-0.5">{action.doc}</div>
                                            </div>
                                        </div>
                                        <div className={`text-[10px] font-black px-2 py-0.5 rounded-full ${action.status === 'Expired' ? 'bg-red-50 text-red-600' : 'bg-amber-50 text-amber-700'}`}>
                                            {action.status.toUpperCase()}
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-[10px] font-bold text-slate-400">
                                            {action.days < 0 ? `${Math.abs(action.days)} days ago` : `Due in ${action.days} days`}
                                        </span>
                                        <button className="text-[10px] font-black text-primary hover:underline uppercase tracking-widest">
                                            Notify
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

/* ═══════════════════════════════════════════════════
   CUSTOMIZABLE REPORT VIEW
   ═══════════════════════════════════════════════════ */
const CustomizableReportView = () => {
    const categories = [
        {
            name: 'Vehicle Info',
            columns: ['Vehicle ID', 'Engine No', 'Chassis No', 'Make', 'Model', 'Year'],
        },
        { name: 'Organisation', columns: ['Entity Name', 'Branch', 'Department', 'Manager'] },
        {
            name: 'Operational',
            columns: ['Status', 'Last Trip', 'Fuel Type', 'Efficiency', 'Odometer'],
        },
        { name: 'Statutory', columns: ['Insurance Exp', 'PUC Exp', 'Fitness Exp', 'Permit Type'] },
    ];

    const [selectedFields, setSelectedFields] = useState<string[]>(['Vehicle ID', 'Status', 'Make']);

    const handleCheckboxChange = (col: string) => {
        setSelectedFields((prev) =>
            prev.includes(col) ? prev.filter((f) => f !== col) : [...prev, col]
        );
    };

    // Mock data for preview
    const previewData = [
        { 'Vehicle ID': 'VH-4021', 'Engine No': 'ENG1234', 'Make': 'Tata', 'Status': 'Active', 'Odometer': '45,200 km', 'Insurance Exp': '24 Dec 2026' },
        { 'Vehicle ID': 'VH-4022', 'Engine No': 'ENG5678', 'Make': 'Ashok Leyland', 'Status': 'Idle', 'Odometer': '12,450 km', 'Insurance Exp': '12 Nov 2025' },
        { 'Vehicle ID': 'VH-4023', 'Engine No': 'ENG9012', 'Make': 'Mahindra', 'Status': 'Maintenance', 'Odometer': '89,100 km', 'Insurance Exp': '05 Jan 2026' },
    ];

    return (
        <motion.div variants={containerVariants} initial="hidden" animate="show" className="flex flex-col h-full gap-6 overflow-hidden">
            {/* ── Toolbar ── */}
            <div className="toolbar" style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap', background: 'white', padding: '16px 20px', borderRadius: 12, marginBottom: 24, border: '1px solid var(--border)' }}>
                <div style={{ flex: 1 }}>
                    <h2 style={{ fontSize: 16, fontWeight: 900, color: 'var(--text)', margin: 0 }}>Report Builder</h2>
                    <p style={{ fontSize: 12, color: 'var(--muted)', margin: 0 }}>Select operational data points and extract custom reports.</p>
                </div>
                <div className="header-actions">
                    <button className="btn btn-secondary px-4 py-2 flex items-center gap-2">
                        <Filter size={16} /> Filters
                    </button>
                    <button className="btn btn-primary px-4 py-2 flex items-center gap-2">
                        <Download size={16} /> Generate Output
                    </button>
                </div>
            </div>

            <div className="white-card flex-shrink-0">
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8">
                    {/* ── COLUMN SELECTION ── */}
                    <div className="bg-slate-50/50 p-6 rounded-2xl border border-slate-100 shadow-inner">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-10">
                            {categories.map((cat, i) => (
                                <div key={i}>
                                    <h4 className="text-[12px] font-black text-slate-900 uppercase tracking-widest mb-4 flex items-center gap-2 border-b border-slate-200 pb-2">
                                        <div className="w-2 h-2 rounded-sm bg-primary rotate-45" />
                                        {cat.name}
                                    </h4>
                                    <div className="grid grid-cols-1 gap-2">
                                        {cat.columns.map((col) => (
                                            <label
                                                key={col}
                                                className={`group flex items-center gap-3 px-3 py-2 rounded-lg transition-all cursor-pointer ${
                                                    selectedFields.includes(col)
                                                        ? 'bg-primary/5 text-primary'
                                                        : 'hover:bg-white text-slate-600'
                                                }`}
                                            >
                                                <div className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${
                                                    selectedFields.includes(col) 
                                                    ? 'bg-primary border-primary' 
                                                    : 'bg-white border-slate-300 group-hover:border-primary/50'
                                                }`}>
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedFields.includes(col)}
                                                        onChange={() => handleCheckboxChange(col)}
                                                        className="hidden"
                                                    />
                                                    {selectedFields.includes(col) && (
                                                        <CheckCircle2 size={10} className="text-white" strokeWidth={4} />
                                                    )}
                                                </div>
                                                <span className="text-[13px] font-bold">{col}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* ── CONFIGURATION & PRESETS ── */}
                    <div className="flex flex-col gap-6">
                        <div className="p-7 bg-slate-900 rounded-[2rem] text-white shadow-2xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                                <FileText size={80} />
                            </div>
                            
                            <h4 className="text-[10px] font-black uppercase tracking-widest mb-8 text-white relative z-10">
                                Export Configuration
                            </h4>

                            <div className="mb-8 relative z-10">
                                <label className="block text-[10px] font-black text-white uppercase tracking-widest mb-3 text-opacity-70">
                                    Date Range Profile
                                </label>
                                <div className="relative">
                                    <select className="w-full pl-4 pr-10 py-3 rounded-xl border border-slate-700/50 text-sm bg-slate-800/50 text-white focus:outline-none focus:ring-2 focus:ring-primary/40 appearance-none backdrop-blur-sm transition-all hover:bg-slate-800">
                                        <option>Last 30 Days (Recommended)</option>
                                        <option>Previous Quarter</option>
                                        <option>Full Financial Year</option>
                                        <option>Custom Epoch Range</option>
                                    </select>
                                    <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 pointer-events-none" />
                                </div>
                            </div>

                            <div className="relative z-10">
                                <label className="block text-[10px] font-black text-white uppercase tracking-widest mb-4 text-opacity-70">
                                    Output Format
                                </label>
                                <div className="grid grid-cols-3 gap-2.5">
                                    {['CSV', 'Excel', 'PDF'].map(fmt => (
                                        <div 
                                            key={fmt}
                                            className={`py-3.5 rounded-xl text-center text-[11px] font-black cursor-pointer transition-all border-2 ${
                                                fmt === 'Excel' 
                                                ? 'bg-primary border-primary text-white shadow-lg shadow-primary/30' 
                                                : 'bg-slate-800/50 border-slate-700/50 text-white/60 hover:bg-slate-700 hover:text-white'
                                            }`}
                                        >
                                            {fmt}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-[1.5rem] border border-blue-100 shadow-sm">
                            <div className="flex items-start gap-4">
                                <div className="p-2 bg-blue-500 text-white rounded-lg shadow-md shadow-blue-500/20">
                                    <AlertCircle size={18} />
                                </div>
                                <div className="flex-1">
                                    <h5 className="text-[13px] font-black text-blue-900 mb-1">Optimizer Tip</h5>
                                    <p className="text-[11.5px] font-bold text-blue-800/70 leading-relaxed">
                                        Dynamic selection across 10+ columns may impact processing speed. For faster extracts, use indexed fields.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── LIVE PREVIEW TABLE ── */}
            <motion.div variants={itemVariants} className="table-card table-scroll-wrapper flex-1">
                <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border)', background: 'var(--surface)' }}>
                    <div className="flex justify-between items-center">
                        <div>
                            <h3 style={{ fontSize: 16, fontWeight: 900, color: 'var(--text)', margin: 0 }}>Live Data Preview</h3>
                            <p style={{ fontSize: 13, color: 'var(--muted)', marginTop: 4 }}>Validating first 3 records against selected schema.</p>
                        </div>
                        <div className="badge badge-slate">
                            Preview Only
                        </div>
                    </div>
                </div>
                <div className="flex-1 overflow-auto p-4">
                    {selectedFields.length > 0 ? (
                        <table className="data-table" style={{ minWidth: 1000 }}>
                            <thead>
                                <tr>
                                    {selectedFields.map((field) => (
                                        <th key={field} className="bg-slate-50/50">
                                            {field}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {previewData.map((row: any, idx) => (
                                    <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                                        {selectedFields.map((field) => (
                                            <td key={field}>
                                                {field === 'Status' ? (
                                                    <Badge variant={row[field] === 'Active' ? 'green' : row[field] === 'Idle' ? 'orange' : 'red'}>
                                                        {row[field]}
                                                    </Badge>
                                                ) : row[field] ? (
                                                    <span className="font-medium text-slate-700">{row[field]}</span>
                                                ) : (
                                                    <span className="text-slate-300 italic font-medium">
                                                        Not Selected
                                                    </span>
                                                )}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center text-center p-12 text-slate-400">
                            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6 border-2 border-dashed border-slate-200">
                                <Search size={32} className="text-slate-200" />
                            </div>
                            <h4 className="text-lg font-black text-slate-800 mb-2">Build Your Preview</h4>
                            <p className="max-w-[320px] text-sm font-medium leading-relaxed">
                                Select data categories above to generate a real-time preview of your report structure.
                            </p>
                        </div>
                    )}
                </div>
            </motion.div>
        </motion.div>
    );
};

/* ═══════════════════════════════════════════════════
   MAIN PAGE LAYOUT
   ═══════════════════════════════════════════════════ */
export const ReportsPage = () => {
    const { type } = useParams<{ type: string }>();
    const navigate = useNavigate();
    const activeTab = type;

    const tabs = [
        {
            id: 'basic',
            label: 'Basic Report',
            desc: 'Fleet overview',
            icon: BarChart4,
            bgClass: 'bg-blue-50 text-blue-600',
            hoverBorderClass: 'hover:border-blue-200',
            hoverShadowClass: 'group-hover:shadow-[0_12px_24px_-8px_rgba(37,99,235,0.25)]',
        },
        {
            id: 'advanced',
            label: 'Advanced Report',
            desc: 'Deep analytics',
            icon: Activity,
            bgClass: 'bg-indigo-50 text-indigo-600',
            hoverBorderClass: 'hover:border-indigo-200',
            hoverShadowClass: 'group-hover:shadow-[0_12px_24px_-8px_rgba(79,70,229,0.25)]',
        },
        {
            id: 'compliance',
            label: 'Compliance Report',
            desc: 'Statutory status',
            icon: ShieldCheck,
            bgClass: 'bg-emerald-50 text-emerald-600',
            hoverBorderClass: 'hover:border-emerald-200',
            hoverShadowClass: 'group-hover:shadow-[0_12px_24px_-8px_rgba(16,185,129,0.25)]',
        },
        {
            id: 'customizable',
            label: 'Customizable Report',
            desc: 'Flex extract',
            icon: Settings,
            bgClass: 'bg-amber-50 text-amber-600',
            hoverBorderClass: 'hover:border-amber-200',
            hoverShadowClass: 'group-hover:shadow-[0_12px_24px_-8px_rgba(245,158,11,0.25)]',
        },
    ];

    const renderContent = () => {
        switch (activeTab) {
            case 'advanced':
                return <AdvancedReportView />;
            case 'compliance':
                return <ComplianceReportView />;
            case 'customizable':
                return <CustomizableReportView />;
            case 'basic':
                return <BasicReportView />;
            default:
                // When we have no selection, render the full-page selector
                return (
                    <div className="flex flex-col items-center justify-center min-h-[65vh] p-4">
                        <div className="text-center mb-10 max-w-2xl mx-auto">
                            <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-2 tracking-tight">
                                Select Report Category
                            </h2>
                            <p className="text-sm md:text-[15px] text-slate-500 leading-relaxed max-w-[500px] mx-auto">
                                Choose a category to access real-time metrics and data intelligence.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 max-w-2xl mx-auto w-full text-left">
                            {tabs.map((t) => (
                                <div
                                    key={t.id}
                                    onClick={() => navigate(`/reports/${t.id}`)}
                                    className={`group bg-white border border-slate-200 rounded-3xl p-6 cursor-pointer transition-all duration-300 hover:-translate-y-1.5 shadow-sm hover:shadow-xl ${t.hoverBorderClass} flex flex-col items-center gap-3 text-center justify-center min-h-[160px] relative`}
                                >
                                    <div className={`absolute inset-0 rounded-3xl transition-shadow duration-300 opacity-0 group-hover:opacity-100 pointer-events-none ${t.hoverShadowClass}`} />
                                    <div
                                        className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 relative z-10 ${t.bgClass}`}
                                    >
                                        <t.icon size={24} strokeWidth={2.5} />
                                    </div>
                                    <div className="relative z-10">
                                        <h3 className="text-base font-black text-slate-900 mb-0.5">
                                            {t.label}
                                        </h3>
                                        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                                            {t.desc}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                );
        }
    };

    return (
        <>
            {/* ── Page Header ── */}
            <div className="page-header">
                <div>
                    <div className="page-title">
                        <BarChart4 size={18} strokeWidth={2.5} />
                        Intelligence & Reports
                    </div>
                    <div className="breadcrumb">
                        Admin <span>/</span> <span style={{ cursor: 'pointer' }} onClick={() => navigate('/reports')}>Reports</span>
                        {activeTab && (
                            <>
                                <span>/</span>
                                <span>{tabs.find((t) => t.id === activeTab)?.label}</span>
                            </>
                        )}
                    </div>
                </div>
                <div className="header-actions">
                    {activeTab && (
                        <button
                            className="btn btn-secondary"
                            onClick={() => navigate('/reports')}
                        >
                            <ChevronLeft size={16} /> Back to Selection
                        </button>
                    )}
                </div>
            </div>

            {/* ── Page Body ── */}
            <div className="page-body">
                {renderContent()}
            </div>
        </>
    );
};

export default ReportsPage;

