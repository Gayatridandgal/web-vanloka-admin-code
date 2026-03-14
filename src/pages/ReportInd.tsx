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

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-sm"
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
                {/* Dynamic Header */}
                <div
                    className="relative px-8 pt-8 pb-7"
                    style={{
                        background: isGood
                            ? 'linear-gradient(135deg, #059669 0%, #047857 100%)'
                            : record.score === 'Moderate'
                                ? 'linear-gradient(135deg, #d97706 0%, #b45309 100%)'
                                : 'linear-gradient(135deg, #dc2626 0%, #991b1b 100%)',
                    }}
                >
                    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-5 text-center sm:text-left">
                        <div className="flex-shrink-0 flex items-center justify-center w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.3)]">
                            <Car size={32} strokeWidth={1.5} />
                        </div>
                        <div className="flex-1">
                            <h2 className="text-2xl font-black text-white mb-1.5">
                                Vehicle Performance Report
                            </h2>
                            <div className="flex items-center gap-3 flex-wrap">
                                <span className="text-base text-white/90 font-extrabold">
                                    {record.id}
                                </span>
                                <Badge variant={scoreVariant(record.score)}>{record.score}</Badge>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                            <div className="text-[11px] font-extrabold text-slate-500 uppercase tracking-widest mb-1">
                                Vehicle Type
                            </div>
                            <div className="text-sm font-bold text-slate-900">{record.type}</div>
                        </div>
                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                            <div className="text-[11px] font-extrabold text-slate-500 uppercase tracking-widest mb-1">
                                Distance Travelled
                            </div>
                            <div className="text-sm font-bold text-slate-900">
                                {record.distance.toLocaleString()} km
                            </div>
                        </div>
                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                            <div className="text-[11px] font-extrabold text-slate-500 uppercase tracking-widest mb-1">
                                Fuel Expenses
                            </div>
                            <div className="text-sm font-bold text-red-600">
                                ${record.fuelCost.toFixed(2)}
                            </div>
                        </div>
                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                            <div className="text-[11px] font-extrabold text-slate-500 uppercase tracking-widest mb-1">
                                Revenue Yield
                            </div>
                            <div className="text-sm font-bold text-emerald-600">
                                ${record.revenue.toFixed(2)}
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-3 bg-[var(--surface)] p-5 rounded-xl border border-[var(--border)] mb-7">
                        <div className="flex-shrink-0 mt-0.5">
                            {isGood ? (
                                <CheckCircle2 size={20} className="text-emerald-600" />
                            ) : (
                                <AlertCircle size={20} className="text-amber-600" />
                            )}
                        </div>
                        <div>
                            <div className="text-[13px] font-extrabold text-[var(--text)] mb-1">
                                System Analytics
                            </div>
                            <div className="text-[13px] text-slate-600 leading-relaxed">
                                Generating{' '}
                                <strong className="text-emerald-600">
                                    ${(record.revenue / record.fuelCost).toFixed(2)}
                                </strong>{' '}
                                for every dollar spent on fuel. Cost averages{' '}
                                <strong className="text-[var(--text)]">
                                    ${(record.fuelCost / record.distance).toFixed(2)}
                                </strong>{' '}
                                per kilometer driven.
                                {record.idleTime > 15 &&
                                    ' High idle time detected; routing optimization recommended.'}
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end">
                        <button
                            className="btn btn-secondary px-6 py-2.5 rounded-lg"
                            onClick={onClose}
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
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center mb-6">
                <div>
                    <h2 className="text-xl font-black text-slate-900 leading-tight">
                        Executive Overview
                    </h2>
                    <p className="text-sm text-slate-500 font-medium">
                        Real-time intelligence on fleet operations and economics.
                    </p>
                </div>
                <div className="flex gap-3 w-full sm:w-auto">
                    <button className="btn btn-secondary flex-1 sm:flex-none flex items-center justify-center gap-2 rounded-lg px-4 py-2 hover:bg-slate-100 transition-colors text-sm">
                        <Download size={16} /> <span className="hidden xs:inline">Excel Output</span><span className="xs:hidden">Excel</span>
                    </button>
                    <button className="btn btn-primary flex-1 sm:flex-none flex items-center justify-center gap-2 rounded-lg px-4 py-2 shadow-md hover:shadow-lg transition-all text-sm">
                        <FileText size={16} /> <span className="hidden xs:inline">Print Report</span><span className="xs:hidden">Print</span>
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
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        {[
                            {
                                icon: Car,
                                bg: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)',
                                label: 'Active Fleet',
                                val: '124',
                                trend: '↑ 4.2% ',
                                trendColor: 'text-emerald-600',
                            },
                            {
                                icon: Banknote,
                                bg: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                                label: 'Total Revenue',
                                val: '$42,850',
                                trend: '↑ 12.5%',
                                trendColor: 'text-emerald-600',
                            },
                            {
                                icon: Fuel,
                                bg: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
                                label: 'Avg Fuel Efficiency',
                                val: '18.4 mpg',
                                trend: '↓ 2.1%',
                                trendColor: 'text-red-600',
                            },
                            {
                                icon: Clock,
                                bg: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)',
                                label: 'On-Time Rate',
                                val: '98.2%',
                                trend: '+ 0.0%',
                                trendColor: 'text-slate-500',
                            },
                        ].map((s, i) => (
                            <motion.div
                                key={i}
                                variants={itemVariants}
                                layout
                                whileHover={{ scale: 1.02, y: -4 }}
                                className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between"
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <div
                                        className="w-12 h-12 rounded-xl text-white flex items-center justify-center shadow-md"
                                        style={{ background: s.bg }}
                                    >
                                        <s.icon size={24} strokeWidth={2} />
                                    </div>
                                    <Badge
                                        variant="slate"
                                        style={{ backgroundColor: '#F1F5F9', color: '#64748B', fontSize: '10px', padding: '4px 8px' }}
                                    >
                                        Last 30 Days
                                    </Badge>
                                </div>
                                <div>
                                    <div className="text-[13px] font-bold text-slate-500 mb-1">
                                        {s.label}
                                    </div>
                                    <div className="flex items-baseline gap-3">
                                        <span className="text-3xl font-black text-slate-900 tracking-tight">
                                            {s.val}
                                        </span>
                                        <span className={`text-xs font-extrabold ${s.trendColor}`}>
                                            {s.trend}
                                        </span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* ── CHARTS ROW ── */}
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">
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
                            <div className="flex flex-1 items-center flex-col xl:flex-row">
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
                    <motion.div
                        variants={itemVariants}
                        layout
                        className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden"
                    >
                        {/* Filter Bar Inside Card */}
                        <div className="p-4 sm:p-5 border-b border-slate-200 flex justify-between flex-wrap gap-4 bg-white">
                            <div className="relative w-full sm:w-[280px]">
                                <Filter
                                    size={18}
                                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                                />
                                <input
                                    className="w-full pl-10 pr-4 h-10 bg-slate-100 border-none rounded-lg text-[13px] font-semibold text-slate-700 focus:ring-2 focus:ring-emerald-500 transition-all outline-none"
                                    placeholder="Filter by Vehicle ID…"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                            </div>
                            <div className="relative w-full sm:w-auto min-w-[200px]">
                                <select
                                    className="w-full sm:w-[200px] h-10 pl-4 pr-10 bg-slate-100 border-none rounded-lg text-[13px] font-semibold text-slate-600 appearance-none focus:ring-2 focus:ring-emerald-500 transition-all outline-none cursor-pointer"
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
                                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none"
                                />
                            </div>
                        </div>

                        <div className="overflow-x-auto w-full">
                            <table className="w-full bg-white text-left min-w-[800px]">
                                <thead className="bg-[#F8FAFC]">
                                    <tr>
                                        <th className="w-[14%] px-5 py-3.5 font-extrabold text-slate-500 uppercase text-[11px] tracking-wider text-left">
                                            Vehicle ID
                                        </th>
                                        <th className="w-[15%] px-5 py-3.5 font-extrabold text-slate-500 uppercase text-[11px] tracking-wider text-left">
                                            Type
                                        </th>
                                        <th className="w-[14%] px-5 py-3.5 font-extrabold text-slate-500 uppercase text-[11px] tracking-wider text-left">
                                            Distance
                                        </th>
                                        <th className="w-[12%] px-5 py-3.5 font-extrabold text-slate-500 uppercase text-[11px] tracking-wider text-left">
                                            Fuel Cost
                                        </th>
                                        <th className="w-[14%] px-5 py-3.5 font-extrabold text-slate-500 uppercase text-[11px] tracking-wider text-left">
                                            Revenue
                                        </th>
                                        <th className="w-[10%] px-5 py-3.5 font-extrabold text-slate-500 uppercase text-[11px] tracking-wider text-left">
                                            Idle (h)
                                        </th>
                                        <th className="w-[13%] px-5 py-3.5 font-extrabold text-slate-500 uppercase text-[11px] tracking-wider text-left">
                                            Score
                                        </th>
                                        <th className="w-[8%] px-5 py-3.5 font-extrabold text-slate-500 uppercase text-[11px] tracking-wider text-center">
                                            Actions
                                        </th>
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
                                                className="hover:bg-slate-50 border-b border-slate-100 transition-colors"
                                            >
                                                <td className="px-5 py-4 overflow-hidden text-ellipsis whitespace-nowrap">
                                                    <span className="text-[13px] font-extrabold text-slate-900 flex items-center gap-2">
                                                        <Car size={16} className="text-slate-500" />
                                                        {r.id}
                                                    </span>
                                                </td>
                                                <td className="px-5 py-4 overflow-hidden text-ellipsis whitespace-nowrap text-[13px] text-slate-600 font-semibold">
                                                    {r.type}
                                                </td>
                                                <td className="px-5 py-4 text-[13px] font-semibold text-slate-700">
                                                    {r.distance.toLocaleString()} km
                                                </td>
                                                <td className="px-5 py-4 text-[13px] text-red-600 font-extrabold">
                                                    ${r.fuelCost.toFixed(2)}
                                                </td>
                                                <td className="px-5 py-4 text-[13px] text-emerald-600 font-extrabold">
                                                    ${r.revenue.toFixed(2)}
                                                </td>
                                                <td className="px-5 py-4 text-[13px] text-slate-600 font-semibold">
                                                    {r.idleTime.toFixed(1)}
                                                </td>
                                                <td className="px-5 py-4 overflow-hidden text-ellipsis whitespace-nowrap">
                                                    <Badge
                                                        variant={scoreVariant(r.score)}
                                                        style={{ padding: '4px 10px', borderRadius: 6, fontSize: 11 }}
                                                    >
                                                        {r.score}
                                                    </Badge>
                                                </td>
                                                <td className="px-5 py-4 text-center">
                                                    <motion.button
                                                        whileHover={{ scale: 1.1 }}
                                                        whileTap={{ scale: 0.9 }}
                                                        className="inline-flex items-center justify-center w-8 h-8 rounded-lg cursor-pointer border-none bg-slate-100 text-slate-500 hover:bg-slate-200 transition-colors focus:ring-2 focus:ring-emerald-500"
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
                        </div>
                        <div className="bg-white">
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
            {/* ── STATS ROW ── */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {[
                    {
                        icon: Activity,
                        bg: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)',
                        label: 'Distance vs Revenue',
                        val: '$1.85 / km',
                        trend: '↑ 4.2% ',
                        trendColor: '#059669',
                    },
                    {
                        icon: Clock,
                        bg: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
                        label: 'Cumulative Idle Time',
                        val: '1,420 hrs',
                        trend: '↓ 5.5%',
                        trendColor: '#059669', // down is good for idle
                    },
                    {
                        icon: ShieldCheck,
                        bg: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)',
                        label: 'Avg Safety Score',
                        val: '94 / 100',
                        trend: '↑ 1.2%',
                        trendColor: '#059669',
                    },
                ].map((s, i) => (
                    <motion.div
                        key={i}
                        variants={itemVariants}
                        className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <div
                                className="w-12 h-12 rounded-xl text-white flex items-center justify-center shadow-md bg-gradient-to-br from-indigo-500 to-purple-600"
                                style={{ background: s.bg }}
                            >
                                <s.icon size={24} strokeWidth={2} />
                            </div>
                        </div>
                        <div>
                            <div className="text-[13px] font-bold text-slate-500 mb-1">
                                {s.label}
                            </div>
                            <div className="flex items-baseline gap-3">
                                <span className="text-3xl font-black text-slate-900 tracking-tight">
                                    {s.val}
                                </span>
                                <span className={`text-xs font-extrabold ${s.trendColor}`}>
                                    {s.trend}
                                </span>
                            </div>
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
                className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden"
            >
                <div className="p-6 border-b border-slate-200 flex justify-between items-center bg-white">
                    <div>
                        <h3 className="text-base font-extrabold text-slate-900 m-0">
                            Driver Safety Rankings
                        </h3>
                        <p className="text-sm text-slate-500 mt-1">
                            Bottom performers identified for target training.
                        </p>
                    </div>
                </div>

                <div className="overflow-x-auto w-full -webkit-overflow-scrolling-touch">
                    <table className="w-full text-left border-collapse min-w-[600px]">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-200">
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                                    Driver ID
                                </th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                                    Name
                                </th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                                    Harsh Incidents
                                </th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                                    Safety Score
                                </th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                                    Status
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {safetyRankings.map((driver, i) => (
                                <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="px-6 py-4 text-sm font-semibold text-slate-900">
                                        {driver.id}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-slate-600 font-medium">
                                        {driver.name}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-slate-600 font-semibold">
                                        {driver.incidents}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="flex-1 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                                                <div
                                                    className={`h-full rounded-full transition-all duration-500 ease-out ${driver.score > 90
                                                        ? 'bg-emerald-500'
                                                        : driver.score > 80
                                                            ? 'bg-amber-500'
                                                            : 'bg-red-500'
                                                        }`}
                                                    style={{
                                                        width: `${driver.score}%`,
                                                    }}
                                                />
                                            </div>
                                            <span className="text-[13px] font-bold text-slate-600 min-w-[24px]">
                                                {driver.score}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <Badge
                                            variant={
                                                driver.score > 90
                                                    ? 'blue'
                                                    : driver.score > 80
                                                        ? 'orange'
                                                        : 'red'
                                            }
                                        >
                                            {driver.status}
                                        </Badge>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
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
        <motion.div variants={containerVariants} initial="hidden" animate="show">
            {/* ── OVERVIEW CARDS ── */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {complianceDocs.map((doc, i) => (
                    <motion.div
                        key={i}
                        variants={itemVariants}
                        layout
                        whileHover={{ scale: 1.02, y: -4 }}
                        className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between"
                    >
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-sm font-extrabold text-slate-900">
                                {doc.name}
                            </span>
                            <div
                                className="w-8 h-8 rounded-lg flex items-center justify-center"
                                style={{ background: `${doc.color}15`, color: doc.color }}
                            >
                                <FileText size={18} />
                            </div>
                        </div>
                        <div className="flex items-baseline gap-2 mb-3">
                            <span className="text-3xl font-black text-slate-900 tracking-tight">
                                {Math.round((doc.valid / doc.total) * 100)}%
                            </span>
                            <span className="text-xs font-bold text-slate-500">
                                Compliance
                            </span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-100 rounded-full mb-4 overflow-hidden">
                            <div
                                className="h-full rounded-full transition-all duration-500 ease-out"
                                style={{
                                    width: `${(doc.valid / doc.total) * 100}%`,
                                    background: doc.color,
                                }}
                            />
                        </div>
                        <div className="flex justify-between text-[11px] font-bold">
                            <span className="text-emerald-600">{doc.valid} Valid</span>
                            <span className="text-amber-600">{doc.expiring} Expiring</span>
                            <span className="text-red-600">{doc.expired} Expired</span>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* ── MAIN CONTENT (TABLE + SIDEBAR) ── */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* ── DETAILED TABLE ── */}
                <motion.div
                    variants={itemVariants}
                    layout
                    className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col"
                >
                    <div className="p-6 border-b border-slate-200 bg-white">
                        <h3 className="text-base font-extrabold text-slate-900 m-0">
                            Statutory Document Tracking
                        </h3>
                        <p className="text-sm text-slate-500 mt-1">
                            Real-time status of all mandatory vehicle and driver documentation.
                        </p>
                    </div>
                    <div className="overflow-x-auto w-full -webkit-overflow-scrolling-touch flex-1">
                        <table className="w-full text-left border-collapse min-w-[600px]">
                            <thead>
                                <tr className="bg-slate-50 border-b border-slate-200">
                                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                                        Vehicle ID
                                    </th>
                                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                                        Insurance
                                    </th>
                                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                                        Pollution
                                    </th>
                                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                                        Fitness
                                    </th>
                                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                                        Permit
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {[
                                    {
                                        id: 'VH-4021',
                                        ins: '24 Dec 2026',
                                        pol: '15 Oct 2025',
                                        fit: '10 Jan 2026',
                                        per: '05 Mar 2027',
                                    },
                                    {
                                        id: 'VH-4022',
                                        ins: '12 Nov 2025',
                                        pol: '02 Sep 2025',
                                        fit: 'Expired',
                                        per: '18 Jun 2026',
                                    },
                                    {
                                        id: 'VH-4023',
                                        ins: '05 Jan 2026',
                                        pol: 'Expiring',
                                        fit: '22 Feb 2026',
                                        per: '30 Oct 2026',
                                    },
                                    {
                                        id: 'VH-4024',
                                        ins: '18 Aug 2026',
                                        pol: '20 Jul 2025',
                                        fit: '15 Dec 2025',
                                        per: '12 Apr 2027',
                                    },
                                ].map((v, i) => (
                                    <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                                        <td className="px-6 py-4 text-sm font-semibold text-slate-900">
                                            {v.id}
                                        </td>
                                        <td className="px-6 py-4 text-[13px] text-slate-600 font-medium">
                                            {v.ins}
                                        </td>
                                        <td className="px-6 py-4 text-[13px]">
                                            <span
                                                className={v.pol === 'Expiring' ? 'text-amber-600 font-bold' : 'text-slate-600 font-medium'}
                                            >
                                                {v.pol}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-[13px]">
                                            <span
                                                className={v.fit === 'Expired' ? 'text-red-600 font-bold' : 'text-slate-600 font-medium'}
                                            >
                                                {v.fit}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-[13px] text-slate-600 font-medium">
                                            {v.per}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </motion.div>

                {/* ── ACTION CENTER SIDEBAR ── */}
                <motion.div
                    variants={itemVariants}
                    layout
                    className="bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col h-full overflow-hidden"
                >
                    <div className="p-6 border-b border-slate-200 bg-slate-50/50 flex items-center justify-between">
                        <div>
                            <h3 className="text-base font-extrabold text-slate-900 m-0">
                                Action Center
                            </h3>
                            <p className="text-[13px] text-slate-500 mt-1 font-medium">
                                Urgent Renewals
                            </p>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center">
                            <Bell size={16} strokeWidth={2.5} />
                        </div>
                    </div>
                    <div className="p-4 flex-1 overflow-y-auto">
                        <div className="flex flex-col gap-3">
                            {[
                                { vh: 'VH-4022', doc: 'Fitness Certificate', status: 'Expired', days: -12 },
                                { vh: 'VH-4023', doc: 'Pollution (PUC)', status: 'Expiring', days: 5 },
                                { vh: 'VH-4109', doc: 'Insurance', status: 'Expiring', days: 8 },
                                { vh: 'VH-3984', doc: 'National Permit', status: 'Expiring', days: 14 },
                            ].map((action, i) => (
                                <div key={i} className="p-4 rounded-xl border border-slate-100 bg-white shadow-sm hover:border-slate-300 transition-colors">
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <div className="text-sm font-bold text-slate-900">{action.vh}</div>
                                            <div className="text-[12px] font-semibold text-slate-500 mt-0.5">{action.doc}</div>
                                        </div>
                                        <Badge variant={action.status === 'Expired' ? 'red' : 'amber'}>
                                            {action.days < 0 ? `${Math.abs(action.days)}d ago` : `in ${action.days}d`}
                                        </Badge>
                                    </div>
                                    <button className="w-full mt-3 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors">
                                        Notify Driver
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>
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
        <motion.div variants={containerVariants} initial="hidden" animate="show" className="flex flex-col gap-6">
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div>
                        <h3 className="text-lg font-extrabold text-slate-900 m-0">
                            Custom Data Extraction Builder
                        </h3>
                        <p className="text-slate-500 text-sm mt-1">
                            Configure your report by selecting data points and applying global filters.
                        </p>
                    </div>
                    <div className="flex gap-3">
                        <button className="btn btn-secondary flex items-center gap-2">
                            <Filter size={16} /> Filters
                        </button>
                        <button className="btn btn-primary flex items-center gap-2">
                            <Download size={16} /> Generate Report
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8">
                    {/* ── COLUMN SELECTION ── */}
                    <div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {categories.map((cat, i) => (
                                <div key={i}>
                                    <h4 className="text-[13px] font-black text-slate-900 uppercase tracking-widest mb-3 flex items-center gap-2">
                                        <div className="w-1 h-4 bg-primary rounded-sm" />
                                        {cat.name}
                                    </h4>
                                    <div className="flex flex-col gap-2">
                                        {cat.columns.map((col) => (
                                            <label
                                                key={col}
                                                className="px-4 py-2.5 bg-slate-50 rounded-lg border border-slate-200 text-[13px] text-slate-700 cursor-pointer flex items-center gap-3 transition-colors hover:bg-slate-100/70"
                                            >
                                                <input
                                                    type="checkbox"
                                                    checked={selectedFields.includes(col)}
                                                    onChange={() => handleCheckboxChange(col)}
                                                    className="w-4 h-4 cursor-pointer text-primary rounded border-slate-300 focus:ring-primary"
                                                />
                                                <span className="font-medium">{col}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* ── CONFIGURATION ── */}
                    <div className="p-6 bg-slate-50 rounded-xl border border-slate-200 h-fit">
                        <h4 className="text-sm font-extrabold text-slate-900 mb-4">
                            Export Configuration
                        </h4>

                        <div className="mb-5">
                            <label className="block text-xs font-bold text-slate-500 mb-2">
                                Select Date Range
                            </label>
                            <select className="w-full p-2.5 rounded-lg border border-slate-300 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary">
                                <option>Last 30 Days</option>
                                <option>Last quarter</option>
                                <option>Financial Year 2024-25</option>
                                <option>Custom Range</option>
                            </select>
                        </div>

                        <div className="mb-5">
                            <label className="block text-xs font-bold text-slate-500 mb-2">
                                Export Format
                            </label>
                            <div className="flex gap-2">
                                <div className="flex-1 p-3 bg-white border-2 border-primary rounded-lg text-center text-xs font-extrabold text-primary cursor-pointer hover:bg-blue-50 transition-colors">
                                    CSV
                                </div>
                                <div className="flex-1 p-3 bg-white border border-slate-300 rounded-lg text-center text-xs font-bold text-slate-500 cursor-pointer hover:bg-slate-50 transition-colors">
                                    Excel
                                </div>
                                <div className="flex-1 p-3 bg-white border border-slate-300 rounded-lg text-center text-xs font-bold text-slate-500 cursor-pointer hover:bg-slate-50 transition-colors">
                                    PDF
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── LIVE PREVIEW TABLE ── */}
            <motion.div variants={itemVariants} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
                <div className="p-6 border-b border-slate-200 bg-white">
                    <h3 className="text-base font-extrabold text-slate-900 m-0">Live Data Preview</h3>
                    <p className="text-sm text-slate-500 mt-1">Showing first 3 rows based on current extract configuration.</p>
                </div>
                {selectedFields.length > 0 ? (
                    <div className="overflow-x-auto w-full">
                        <table className="w-full text-left border-collapse min-w-[600px]">
                            <thead>
                                <tr className="bg-slate-50 border-b border-slate-200">
                                    {selectedFields.map((field) => (
                                        <th
                                            key={field}
                                            className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap"
                                        >
                                            {field}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {previewData.map((row: any, idx) => (
                                    <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                                        {selectedFields.map((field) => (
                                            <td
                                                key={field}
                                                className="px-6 py-4 text-sm font-medium text-slate-700 whitespace-nowrap"
                                            >
                                                {row[field] || (
                                                    <span className="text-slate-300 italic">
                                                        N/A
                                                    </span>
                                                )}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="p-12 text-center flex flex-col items-center justify-center text-slate-500">
                        <AlertCircle size={32} className="mb-4 text-slate-300" />
                        <p className="text-sm font-medium">
                            Select at least one column above to view the dynamic preview.
                        </p>
                    </div>
                )}
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
                    <div className="flex flex-col items-center justify-center min-h-[80vh] bg-slate-50 -my-6 -mx-8 px-4">
                        <div className="text-center mb-10 max-w-2xl mx-auto">
                            <h2 className="text-3xl font-black text-slate-900 mb-3 tracking-tight">
                                What type of report would you like to view?
                            </h2>
                            <p className="text-[15px] text-slate-500 leading-relaxed max-w-[600px] mx-auto">
                                Select the reporting category that best fits your current
                                operational needs. The dashboard will adapt to display relevant
                                metrics.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto w-full px-4 text-left">
                            {tabs.map((t) => (
                                <div
                                    key={t.id}
                                    onClick={() => navigate(`/reports/${t.id}`)}
                                    className={`group bg-white border-2 border-slate-100 rounded-2xl p-6 sm:p-8 cursor-pointer transition-all duration-300 hover:-translate-y-1 shadow-sm hover:shadow-xl ${t.hoverBorderClass} flex flex-col items-center gap-4 text-center justify-center min-h-[220px] relative`}
                                >
                                    <div className={`absolute inset-0 rounded-2xl transition-shadow duration-300 opacity-0 group-hover:opacity-100 pointer-events-none ${t.hoverShadowClass}`} />
                                    <div
                                        className={`w-16 h-16 rounded-full flex items-center justify-center mb-2 transition-transform duration-300 group-hover:scale-110 relative z-10 ${t.bgClass}`}
                                    >
                                        <t.icon size={32} strokeWidth={2.5} />
                                    </div>
                                    <div className="relative z-10">
                                        <h3 className="text-xl font-extrabold text-slate-900 mb-2">
                                            {t.label}
                                        </h3>
                                        <p className="text-[13px] font-medium text-slate-500 leading-relaxed">
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
        <div className="flex flex-col h-full bg-slate-50">
            {/* ── HEADER ── */}
            <div className="page-header border-b border-slate-200 pb-4 mb-0 bg-white shadow-sm z-10 px-8 pt-6">
                <div>
                    <div className="page-title flex items-center gap-2">
                        <BarChart4 size={24} className="text-primary" strokeWidth={2.5} />
                        Intelligence & Reports
                    </div>
                    <div className="breadcrumb mt-1 flex items-center text-xs font-semibold text-slate-500">
                        <span className="hover:text-slate-800 transition-colors cursor-pointer">Admin</span>
                        <span className="mx-2 text-slate-300">/</span>
                        <span className="hover:text-slate-800 transition-colors cursor-pointer" onClick={() => navigate('/reports')}>Reports</span>
                        {activeTab && (
                            <>
                                <span className="mx-2 text-slate-300">/</span>
                                <span className="text-slate-900">{tabs.find((t) => t.id === activeTab)?.label}</span>
                            </>
                        )}
                    </div>
                </div>
                {activeTab && (
                    <button
                        className="btn btn-secondary flex items-center shrink-0 border-slate-200 hover:bg-slate-100"
                        onClick={() => navigate('/reports')}
                    >
                        <ChevronLeft size={16} className="mr-1" /> Back to Selection
                    </button>
                )}
            </div>

            <div className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8">
                <div className="h-full max-w-[1400px] mx-auto">{renderContent()}</div>
            </div>
        </div>
    );
};

export default ReportsPage;


