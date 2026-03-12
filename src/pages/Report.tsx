import { motion } from 'framer-motion';
import {
    AlertCircle,
    Banknote,
    BarChart4,
    Car,
    CheckCircle2,
    ChevronDown,
    Clock,
    Download,
    Eye,
    FileText,
    Filter,
    Fuel,
} from 'lucide-react';
import { useState } from 'react';
import {
    Area,
    AreaChart,
    CartesianGrid,
    Cell,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
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

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
                position: 'fixed',
                inset: 0,
                zIndex: 1000,
                background: 'rgba(15, 23, 42, 0.4)',
                backdropFilter: 'blur(4px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 24,
            }}
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ type: 'spring', duration: 0.5, bounce: 0.3 }}
                style={{
                    background: 'white',
                    borderRadius: 20,
                    width: '100%',
                    maxWidth: 600,
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                    overflow: 'hidden',
                }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Dynamic Header */}
                <div
                    style={{
                        background: isGood
                            ? 'linear-gradient(135deg, #059669 0%, #047857 100%)'
                            : record.score === 'Moderate'
                              ? 'linear-gradient(135deg, #d97706 0%, #b45309 100%)'
                              : 'linear-gradient(135deg, #dc2626 0%, #991b1b 100%)',
                        padding: '32px 32px 28px',
                        position: 'relative',
                    }}
                >
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 20 }}>
                        <div
                            style={{
                                width: 64,
                                height: 64,
                                borderRadius: 16,
                                background: 'rgba(255,255,255,0.2)',
                                backdropFilter: 'blur(10px)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'white',
                                flexShrink: 0,
                                boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.3)',
                            }}
                        >
                            <Car size={32} strokeWidth={1.5} />
                        </div>
                        <div style={{ flex: 1 }}>
                            <h2
                                style={{
                                    fontSize: 22,
                                    fontWeight: 900,
                                    color: 'white',
                                    margin: '0 0 6px 0',
                                }}
                            >
                                Vehicle Performance Report
                            </h2>
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 12,
                                    flexWrap: 'wrap',
                                }}
                            >
                                <span
                                    style={{
                                        fontSize: 16,
                                        color: 'rgba(255,255,255,0.9)',
                                        fontWeight: 800,
                                    }}
                                >
                                    {record.id}
                                </span>
                                <Badge variant={scoreVariant(record.score)}>{record.score}</Badge>
                            </div>
                        </div>
                    </div>
                </div>

                <div style={{ padding: '32px' }}>
                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: '1fr 1fr',
                            gap: 24,
                            marginBottom: 32,
                        }}
                    >
                        <div
                            style={{
                                background: '#F8FAFC',
                                padding: '16px',
                                borderRadius: 12,
                                border: '1px solid #E2E8F0',
                            }}
                        >
                            <div
                                style={{
                                    fontSize: 11,
                                    fontWeight: 800,
                                    color: '#64748B',
                                    textTransform: 'uppercase',
                                    letterSpacing: '.05em',
                                    marginBottom: 4,
                                }}
                            >
                                Vehicle Type
                            </div>
                            <div style={{ fontSize: 15, fontWeight: 700, color: '#0F172A' }}>
                                {record.type}
                            </div>
                        </div>
                        <div
                            style={{
                                background: '#F8FAFC',
                                padding: '16px',
                                borderRadius: 12,
                                border: '1px solid #E2E8F0',
                            }}
                        >
                            <div
                                style={{
                                    fontSize: 11,
                                    fontWeight: 800,
                                    color: '#64748B',
                                    textTransform: 'uppercase',
                                    letterSpacing: '.05em',
                                    marginBottom: 4,
                                }}
                            >
                                Distance Travelled
                            </div>
                            <div style={{ fontSize: 15, fontWeight: 700, color: '#0F172A' }}>
                                {record.distance.toLocaleString()} km
                            </div>
                        </div>
                        <div
                            style={{
                                background: '#F8FAFC',
                                padding: '16px',
                                borderRadius: 12,
                                border: '1px solid #E2E8F0',
                            }}
                        >
                            <div
                                style={{
                                    fontSize: 11,
                                    fontWeight: 800,
                                    color: '#64748B',
                                    textTransform: 'uppercase',
                                    letterSpacing: '.05em',
                                    marginBottom: 4,
                                }}
                            >
                                Fuel Expenses
                            </div>
                            <div style={{ fontSize: 15, fontWeight: 700, color: '#DC2626' }}>
                                ${record.fuelCost.toFixed(2)}
                            </div>
                        </div>
                        <div
                            style={{
                                background: '#F8FAFC',
                                padding: '16px',
                                borderRadius: 12,
                                border: '1px solid #E2E8F0',
                            }}
                        >
                            <div
                                style={{
                                    fontSize: 11,
                                    fontWeight: 800,
                                    color: '#64748B',
                                    textTransform: 'uppercase',
                                    letterSpacing: '.05em',
                                    marginBottom: 4,
                                }}
                            >
                                Revenue Yield
                            </div>
                            <div style={{ fontSize: 15, fontWeight: 700, color: '#059669' }}>
                                ${record.revenue.toFixed(2)}
                            </div>
                        </div>
                    </div>

                    <div
                        style={{
                            display: 'flex',
                            gap: 12,
                            background: 'var(--surface)',
                            padding: '20px',
                            borderRadius: 12,
                            border: '1px solid var(--border)',
                            marginBottom: 28,
                        }}
                    >
                        <div style={{ flexShrink: 0, marginTop: 2 }}>
                            {isGood ? (
                                <CheckCircle2 size={20} color="#059669" />
                            ) : (
                                <AlertCircle size={20} color="#D97706" />
                            )}
                        </div>
                        <div>
                            <div
                                style={{
                                    fontSize: 13,
                                    fontWeight: 800,
                                    color: 'var(--text)',
                                    marginBottom: 4,
                                }}
                            >
                                System Analytics
                            </div>
                            <div style={{ fontSize: 13, color: '#475569', lineHeight: 1.6 }}>
                                Generating{' '}
                                <strong style={{ color: '#059669' }}>
                                    ${(record.revenue / record.fuelCost).toFixed(2)}
                                </strong>{' '}
                                for every dollar spent on fuel. Cost averages{' '}
                                <strong style={{ color: 'var(--text)' }}>
                                    ${(record.fuelCost / record.distance).toFixed(2)}
                                </strong>{' '}
                                per kilometer driven.
                                {record.idleTime > 15 &&
                                    ' High idle time detected; routing optimization recommended.'}
                            </div>
                        </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <button
                            className="btn btn-secondary"
                            onClick={onClose}
                            style={{ padding: '10px 24px', borderRadius: 8 }}
                        >
                            Close Window
                        </button>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

/* ═══════════════════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════════════════ */
export const ReportsPage = () => {
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
            {/* ── HEADER ── */}
            <div className="page-header" style={{ borderBottom: '1px solid #E2E8F0' }}>
                <div>
                    <div
                        className="page-title"
                        style={{ display: 'flex', alignItems: 'center', gap: 8 }}
                    >
                        <BarChart4 size={20} color="var(--primary)" strokeWidth={2.5} />
                        Fleet Performance Dashboard
                    </div>
                    <div className="breadcrumb">
                        Admin <span>/</span> Intelligence & Reports
                    </div>
                </div>
                <div className="header-actions">
                    <button
                        className="btn btn-secondary"
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 6,
                            borderRadius: 8,
                            padding: '8px 16px',
                        }}
                    >
                        <Download size={16} /> Excel
                    </button>
                    <button
                        className="btn btn-primary"
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 6,
                            borderRadius: 8,
                            padding: '8px 16px',
                        }}
                    >
                        <FileText size={16} /> PDF Export
                    </button>
                </div>
            </div>

            <div className="page-body" style={{ padding: '24px 32px', background: '#F8FAFC' }}>
                <motion.div variants={containerVariants} initial="hidden" animate="show">
                    {/* ── STATS ROW ── */}
                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                            gap: 20,
                            marginBottom: 24,
                        }}
                    >
                        {[
                            {
                                icon: Car,
                                bg: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)',
                                label: 'Active Fleet',
                                val: '124',
                                trend: '↑ 4.2% ',
                                trendColor: '#059669',
                            },
                            {
                                icon: Banknote,
                                bg: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                                label: 'Total Revenue',
                                val: '$42,850',
                                trend: '↑ 12.5%',
                                trendColor: '#059669',
                            },
                            {
                                icon: Fuel,
                                bg: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
                                label: 'Avg Fuel Efficiency',
                                val: '18.4 mpg',
                                trend: '↓ 2.1%',
                                trendColor: '#DC2626',
                            },
                            {
                                icon: Clock,
                                bg: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)',
                                label: 'On-Time Rate',
                                val: '98.2%',
                                trend: '+ 0.0%',
                                trendColor: '#64748B',
                            },
                        ].map((s, i) => (
                            <motion.div
                                key={i}
                                variants={itemVariants}
                                style={{
                                    background: 'white',
                                    padding: '24px',
                                    borderRadius: 16,
                                    border: '1px solid #E2E8F0',
                                    boxShadow:
                                        '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -2px rgba(0, 0, 0, 0.05)',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <div
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'flex-start',
                                        marginBottom: 16,
                                    }}
                                >
                                    <div
                                        style={{
                                            width: 48,
                                            height: 48,
                                            borderRadius: 12,
                                            background: s.bg,
                                            color: 'white',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                                        }}
                                    >
                                        <s.icon size={24} strokeWidth={2} />
                                    </div>
                                    <Badge
                                        variant="slate"
                                        style={{
                                            background: '#F1F5F9',
                                            color: '#64748B',
                                            fontSize: 10,
                                            padding: '4px 8px',
                                        }}
                                    >
                                        Last 30 Days
                                    </Badge>
                                </div>
                                <div>
                                    <div
                                        style={{
                                            fontSize: 13,
                                            fontWeight: 700,
                                            color: '#64748B',
                                            marginBottom: 4,
                                        }}
                                    >
                                        {s.label}
                                    </div>
                                    <div
                                        style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}
                                    >
                                        <span
                                            style={{
                                                fontSize: 28,
                                                fontWeight: 900,
                                                color: '#0F172A',
                                                letterSpacing: '-0.02em',
                                            }}
                                        >
                                            {s.val}
                                        </span>
                                        <span
                                            style={{
                                                fontSize: 12,
                                                fontWeight: 800,
                                                color: s.trendColor,
                                            }}
                                        >
                                            {s.trend}
                                        </span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* ── CHARTS ROW ── */}
                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
                            gap: 20,
                            marginBottom: 24,
                        }}
                    >
                        {/* Area Chart: Revenue vs Costs */}
                        <motion.div
                            variants={itemVariants}
                            style={{
                                background: 'white',
                                borderRadius: 16,
                                padding: '24px',
                                border: '1px solid #E2E8F0',
                                boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
                                height: 380,
                                display: 'flex',
                                flexDirection: 'column',
                            }}
                        >
                            <div style={{ marginBottom: 20 }}>
                                <h3
                                    style={{
                                        fontSize: 16,
                                        fontWeight: 800,
                                        color: '#0F172A',
                                        margin: 0,
                                    }}
                                >
                                    Revenue & Operational Costs
                                </h3>
                                <p
                                    style={{
                                        fontSize: 13,
                                        color: '#64748B',
                                        margin: '4px 0 0 0',
                                    }}
                                >
                                    Historical financial performance over 6 months
                                </p>
                            </div>
                            <div style={{ flex: 1, minHeight: 0, width: '100%' }}>
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
                            style={{
                                background: 'white',
                                borderRadius: 16,
                                padding: '24px',
                                border: '1px solid #E2E8F0',
                                boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
                                display: 'flex',
                                flexDirection: 'column',
                            }}
                        >
                            <div style={{ marginBottom: 12 }}>
                                <h3
                                    style={{
                                        fontSize: 16,
                                        fontWeight: 800,
                                        color: '#0F172A',
                                        margin: 0,
                                    }}
                                >
                                    Fuel Consumption Distribution
                                </h3>
                                <p
                                    style={{
                                        fontSize: 13,
                                        color: '#64748B',
                                        margin: '4px 0 0 0',
                                    }}
                                >
                                    Volume breakdown by vehicle category
                                </p>
                            </div>
                            <div style={{ display: 'flex', flex: 1, alignItems: 'center' }}>
                                <div style={{ flex: 1, height: 260 }}>
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie
                                                data={fuelData}
                                                cx="50%"
                                                cy="50%"
                                                innerRadius={60}
                                                outerRadius={100}
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
                                <div
                                    style={{
                                        flex: 1,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: 16,
                                    }}
                                >
                                    {fuelData.map((f, i) => (
                                        <div
                                            key={i}
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: 12,
                                            }}
                                        >
                                            <div
                                                style={{
                                                    width: 12,
                                                    height: 12,
                                                    borderRadius: 4,
                                                    background: f.color,
                                                    flexShrink: 0,
                                                }}
                                            />
                                            <div style={{ flex: 1 }}>
                                                <div
                                                    style={{
                                                        fontSize: 13,
                                                        fontWeight: 700,
                                                        color: '#475569',
                                                    }}
                                                >
                                                    {f.name}
                                                </div>
                                                <div
                                                    style={{
                                                        fontSize: 15,
                                                        fontWeight: 800,
                                                        color: '#0F172A',
                                                    }}
                                                >
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
                    <motion.div
                        variants={itemVariants}
                        className="table-card"
                        style={{
                            borderRadius: 16,
                            border: '1px solid #E2E8F0',
                            overflow: 'hidden',
                            boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
                        }}
                    >
                        {/* Filter Bar Inside Card */}
                        <div
                            style={{
                                padding: '16px 20px',
                                borderBottom: '1px solid var(--border)',
                                display: 'flex',
                                justifyContent: 'space-between',
                                flexWrap: 'wrap',
                                gap: 16,
                                background: 'white',
                            }}
                        >
                            <div style={{ position: 'relative', width: 280 }}>
                                <Filter
                                    size={18}
                                    style={{
                                        position: 'absolute',
                                        left: 14,
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        color: 'var(--muted)',
                                        pointerEvents: 'none',
                                    }}
                                />
                                <input
                                    className="search-input"
                                    style={{
                                        width: '100%',
                                        paddingLeft: 42,
                                        background: '#F1F5F9',
                                        border: 'none',
                                        borderRadius: 8,
                                        height: 40,
                                        fontSize: 13,
                                        fontWeight: 600,
                                    }}
                                    placeholder="Filter by Vehicle ID…"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                            </div>
                            <div style={{ position: 'relative' }}>
                                <select
                                    className="form-select"
                                    style={{
                                        width: 200,
                                        paddingRight: 36,
                                        background: '#F1F5F9',
                                        border: 'none',
                                        borderRadius: 8,
                                        height: 40,
                                        fontSize: 13,
                                        fontWeight: 600,
                                        color: '#475569',
                                        appearance: 'none',
                                    }}
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
                                    size={18}
                                    strokeWidth={2.5}
                                    style={{
                                        position: 'absolute',
                                        right: 14,
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        color: '#64748B',
                                        pointerEvents: 'none',
                                    }}
                                />
                            </div>
                        </div>

                        <table
                            className="data-table"
                            style={{
                                tableLayout: 'fixed',
                                width: '100%',
                                background: 'white',
                            }}
                        >
                            <thead style={{ background: '#F8FAFC' }}>
                                <tr>
                                    <th
                                        style={{
                                            width: '14%',
                                            padding: '14px 20px',
                                            fontWeight: 800,
                                            color: '#64748B',
                                            textTransform: 'uppercase',
                                            fontSize: 11,
                                            letterSpacing: '.05em',
                                        }}
                                    >
                                        Vehicle ID
                                    </th>
                                    <th
                                        style={{
                                            width: '15%',
                                            padding: '14px 20px',
                                            fontWeight: 800,
                                            color: '#64748B',
                                            textTransform: 'uppercase',
                                            fontSize: 11,
                                            letterSpacing: '.05em',
                                        }}
                                    >
                                        Type
                                    </th>
                                    <th
                                        style={{
                                            width: '14%',
                                            padding: '14px 20px',
                                            fontWeight: 800,
                                            color: '#64748B',
                                            textTransform: 'uppercase',
                                            fontSize: 11,
                                            letterSpacing: '.05em',
                                        }}
                                    >
                                        Distance
                                    </th>
                                    <th
                                        style={{
                                            width: '12%',
                                            padding: '14px 20px',
                                            fontWeight: 800,
                                            color: '#64748B',
                                            textTransform: 'uppercase',
                                            fontSize: 11,
                                            letterSpacing: '.05em',
                                        }}
                                    >
                                        Fuel Cost
                                    </th>
                                    <th
                                        style={{
                                            width: '14%',
                                            padding: '14px 20px',
                                            fontWeight: 800,
                                            color: '#64748B',
                                            textTransform: 'uppercase',
                                            fontSize: 11,
                                            letterSpacing: '.05em',
                                        }}
                                    >
                                        Revenue
                                    </th>
                                    <th
                                        style={{
                                            width: '10%',
                                            padding: '14px 20px',
                                            fontWeight: 800,
                                            color: '#64748B',
                                            textTransform: 'uppercase',
                                            fontSize: 11,
                                            letterSpacing: '.05em',
                                        }}
                                    >
                                        Idle (h)
                                    </th>
                                    <th
                                        style={{
                                            width: '13%',
                                            padding: '14px 20px',
                                            fontWeight: 800,
                                            color: '#64748B',
                                            textTransform: 'uppercase',
                                            fontSize: 11,
                                            letterSpacing: '.05em',
                                        }}
                                    >
                                        Score
                                    </th>
                                    <th
                                        style={{
                                            width: '8%',
                                            padding: '14px 20px',
                                            textAlign: 'center',
                                            fontWeight: 800,
                                            color: '#64748B',
                                            textTransform: 'uppercase',
                                            fontSize: 11,
                                            letterSpacing: '.05em',
                                        }}
                                    >
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {filtered.length === 0 ? (
                                    <tr>
                                        <td
                                            colSpan={8}
                                            style={{
                                                textAlign: 'center',
                                                padding: '60px 0',
                                                color: 'var(--muted)',
                                                fontSize: 14,
                                                fontWeight: 700,
                                            }}
                                        >
                                            <AlertCircle
                                                size={48}
                                                color="#CBD5E1"
                                                style={{ display: 'block', margin: '0 auto 12px' }}
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
                                            className="hover:bg-[#F8FAFC]"
                                            style={{
                                                borderBottom: '1px solid #F1F5F9',
                                                transition: 'background 0.2s',
                                            }}
                                        >
                                            <td
                                                style={{
                                                    padding: '16px 20px',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    whiteSpace: 'nowrap',
                                                }}
                                            >
                                                <span
                                                    style={{
                                                        fontSize: 13,
                                                        fontWeight: 800,
                                                        color: '#0F172A',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: 8,
                                                    }}
                                                >
                                                    <Car size={16} color="#64748B" />
                                                    {r.id}
                                                </span>
                                            </td>
                                            <td
                                                style={{
                                                    padding: '16px 20px',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    whiteSpace: 'nowrap',
                                                    fontSize: 13,
                                                    color: '#475569',
                                                    fontWeight: 600,
                                                }}
                                            >
                                                {r.type}
                                            </td>
                                            <td
                                                style={{
                                                    padding: '16px 20px',
                                                    fontSize: 13,
                                                    fontWeight: 600,
                                                    color: '#334155',
                                                }}
                                            >
                                                {r.distance.toLocaleString()} km
                                            </td>
                                            <td
                                                style={{
                                                    padding: '16px 20px',
                                                    fontSize: 13,
                                                    color: '#DC2626',
                                                    fontWeight: 800,
                                                }}
                                            >
                                                ${r.fuelCost.toFixed(2)}
                                            </td>
                                            <td
                                                style={{
                                                    padding: '16px 20px',
                                                    fontSize: 13,
                                                    color: '#059669',
                                                    fontWeight: 800,
                                                }}
                                            >
                                                ${r.revenue.toFixed(2)}
                                            </td>
                                            <td
                                                style={{
                                                    padding: '16px 20px',
                                                    fontSize: 13,
                                                    color: '#475569',
                                                    fontWeight: 600,
                                                }}
                                            >
                                                {r.idleTime.toFixed(1)}
                                            </td>
                                            <td
                                                style={{
                                                    padding: '16px 20px',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    whiteSpace: 'nowrap',
                                                }}
                                            >
                                                <Badge
                                                    variant={scoreVariant(r.score)}
                                                    style={{
                                                        padding: '4px 10px',
                                                        borderRadius: 6,
                                                        fontSize: 11,
                                                    }}
                                                >
                                                    {r.score}
                                                </Badge>
                                            </td>
                                            <td
                                                style={{
                                                    padding: '16px 20px',
                                                    textAlign: 'center',
                                                }}
                                            >
                                                <motion.button
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.9 }}
                                                    className="act-btn act-view"
                                                    style={{
                                                        background: '#F1F5F9',
                                                        width: 32,
                                                        height: 32,
                                                        display: 'inline-flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        borderRadius: 8,
                                                        cursor: 'pointer',
                                                        border: 'none',
                                                        color: '#64748B',
                                                    }}
                                                    title="View Details"
                                                    onClick={() => setViewRecord(r)}
                                                >
                                                    <Eye size={16} strokeWidth={2.5} />
                                                </motion.button>
                                            </td>
                                        </motion.tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                        <div style={{ background: 'white' }}>
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

export default ReportsPage;
