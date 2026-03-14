import { ChevronDown, X, LayoutGrid, Flag, Shield, User, MessageSquare, AlertCircle, Trash2, Download, Star, CheckCircle2, Search, SearchX, Eye, Reply } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    type FeedbackEntry,
    INITIAL_FEEDBACKS,
    avatarColor,
    feedbackStatusVariant,
    getInitials,
    priorityVariant,
    targetTypeIcon,
} from '../data/feedbackData';
import { Badge, Pagination, Stars } from '../ui/index';

/* ═══════════════════════════════════════════════════
   VIEW DETAIL OVERLAY
   ══════════════════════════════════════════════════ */
const ViewOverlay = ({
    entry,
    index,
    onClose,
}: {
    entry: FeedbackEntry;
    index: number;
    onClose: () => void;
}) => {
    const ac = avatarColor(index);

    const Field = ({ label, value }: { label: string; value: string }) => (
        <div>
            <div
                style={{
                    fontSize: 10,
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    letterSpacing: '.06em',
                    color: '#94A3B8',
                    marginBottom: 3,
                }}
            >
                {label}
            </div>
            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>
                {value || '—'}
            </div>
        </div>
    );

    const isComplaint = entry.type === 'complaint';
    const gradientStart = isComplaint ? '#DC2626' : '#059669';
    const gradientEnd = isComplaint ? '#B91C1C' : '#047857';

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
                    maxWidth: 620,
                    maxHeight: '90vh',
                    overflow: 'auto',
                    boxShadow: '0 20px 60px rgba(0,0,0,.15)',
                }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div
                    style={{
                        background: `linear-gradient(135deg, ${gradientStart} 0%, ${gradientEnd} 100%)`,
                        padding: '28px 28px 24px',
                        borderRadius: '16px 16px 0 0',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 18,
                    }}
                >
                    <div
                        style={{
                            width: 52,
                            height: 52,
                            borderRadius: 12,
                            background: ac.bg,
                            color: ac.color,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 900,
                            fontSize: 16,
                            flexShrink: 0,
                        }}
                    >
                        {getInitials(entry.name)}
                    </div>
                    <div style={{ flex: 1 }}>
                        <div
                            style={{
                                fontSize: 18,
                                fontWeight: 900,
                                color: 'white',
                                marginBottom: 4,
                            }}
                        >
                            {entry.name}
                        </div>
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 10,
                                flexWrap: 'wrap',
                            }}
                        >
                            <span
                                style={{
                                    fontSize: 12,
                                    color: 'rgba(255,255,255,.7)',
                                    fontWeight: 600,
                                }}
                            >
                                #{entry.id}
                            </span>
                            <Badge variant={isComplaint ? 'red' : 'green'}>
                                {isComplaint ? 'Complaint' : 'Feedback'}
                            </Badge>
                            <Badge variant={feedbackStatusVariant(entry.status)}>
                                {entry.status}
                            </Badge>
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
                        }}
                    >
                        <X color="white" size={20} />
                    </button>
                </div>

                {/* Body */}
                <div style={{ padding: '24px 28px' }}>
                    {/* Quick stats */}
                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: '1fr 1fr 1fr 1fr',
                            gap: 12,
                            marginBottom: 24,
                        }}
                    >
                        {[
                            {
                                label: 'Category',
                                value: entry.category,
                                icon: LayoutGrid,
                                bg: '#EDE9FE',
                                ic: '#7C3AED',
                            },
                            {
                                label: 'Priority',
                                value: entry.priority,
                                icon: Flag,
                                bg:
                                    entry.priority === 'Critical'
                                        ? '#FEE2E2'
                                        : entry.priority === 'High'
                                          ? '#FFEDD5'
                                          : '#DBEAFE',
                                ic:
                                    entry.priority === 'Critical'
                                        ? '#DC2626'
                                        : entry.priority === 'High'
                                          ? '#EA580C'
                                          : '#2563EB',
                            },
                            {
                                label: 'Target',
                                value: entry.target,
                                icon: targetTypeIcon(entry.targetType),
                                bg: '#FEF3C7',
                                ic: '#D97706',
                            },
                            {
                                label: 'Role',
                                value: entry.role,
                                icon: Shield,
                                bg: '#DCFCE7',
                                ic: '#059669',
                            },
                        ].map((s) => (
                            <div
                                key={s.label}
                                style={{
                                    background: s.bg,
                                    borderRadius: 10,
                                    padding: '12px 10px',
                                    textAlign: 'center',
                                }}
                            >
                                    {s.icon === LayoutGrid && <LayoutGrid size={20} color={s.ic} style={{ marginBottom: 4, display: 'block' }} />}
                                    {s.icon === Flag && <Flag size={20} color={s.ic} style={{ marginBottom: 4, display: 'block' }} />}
                                    {s.icon === Shield && <Shield size={20} color={s.ic} style={{ marginBottom: 4, display: 'block' }} />}
                                    {s.icon !== LayoutGrid && s.icon !== Flag && s.icon !== Shield && (
                                        <span
                                            className="material-symbols-outlined"
                                            style={{
                                                fontSize: 20,
                                                color: s.ic,
                                                marginBottom: 4,
                                                display: 'block',
                                            }}
                                        >
                                            {s.icon as any}
                                        </span>
                                    )}
                                <div
                                    style={{
                                        fontSize: 12,
                                        fontWeight: 900,
                                        color: 'var(--text)',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap',
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

                    {/* Contact Info */}
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
                        <User size={16} />
                        Contact Info
                    </div>
                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: '1fr 1fr',
                            gap: 16,
                            marginBottom: 24,
                        }}
                    >
                        <Field label="Email" value={entry.email} />
                        <Field label="Phone" value={entry.phone} />
                        <Field label="Date Submitted" value={entry.date} />
                        {entry.rating > 0 && (
                            <div>
                                <div
                                    style={{
                                        fontSize: 10,
                                        fontWeight: 800,
                                        textTransform: 'uppercase',
                                        letterSpacing: '.06em',
                                        color: '#94A3B8',
                                        marginBottom: 3,
                                    }}
                                >
                                    Rating
                                </div>
                                <Stars rating={entry.rating} />
                            </div>
                        )}
                    </div>

                    {/* Comment */}
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
                        {isComplaint ? <AlertCircle size={16} /> : <MessageSquare size={16} />}
                        {isComplaint ? 'Complaint Details' : 'Feedback Comment'}
                    </div>
                    <div
                        style={{
                            fontSize: 13,
                            lineHeight: 1.7,
                            color: '#475569',
                            background: isComplaint ? '#FEF2F2' : 'var(--surface)',
                            borderRadius: 10,
                            padding: '14px 18px',
                            border: `1px solid ${isComplaint ? '#FECACA' : 'var(--border)'}`,
                            fontStyle: 'italic',
                        }}
                    >
                        "{entry.comment}"
                    </div>
                </div>
            </div>
        </div>
    );
};

/* ═══════════════════════════════════════════════════
   DELETE CONFIRMATION OVERLAY
   ═══════════════════════════════════════════════════ */
const DeleteOverlay = ({
    entry,
    onConfirm,
    onCancel,
}: {
    entry: FeedbackEntry;
    onConfirm: () => void;
    onCancel: () => void;
}) => (
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
        onClick={onCancel}
    >
        <div
            style={{
                background: 'white',
                borderRadius: 16,
                width: '100%',
                maxWidth: 420,
                padding: '36px 32px 28px',
                textAlign: 'center',
                boxShadow: '0 20px 60px rgba(0,0,0,.15)',
            }}
            onClick={(e) => e.stopPropagation()}
        >
            <div
                style={{
                    width: 64,
                    height: 64,
                    borderRadius: '50%',
                    background: '#FEE2E2',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 20px',
                }}
            >
                <Trash2 size={36} color="#DC2626" />
            </div>
            <div
                style={{
                    fontSize: 18,
                    fontWeight: 900,
                    color: '#DC2626',
                    marginBottom: 8,
                }}
            >
                Delete {entry.type === 'complaint' ? 'Complaint' : 'Feedback'}?
            </div>
            <div
                style={{
                    fontSize: 13,
                    color: '#64748B',
                    marginBottom: 6,
                    lineHeight: 1.6,
                }}
            >
                You are about to permanently delete
            </div>
            <div
                style={{
                    fontSize: 14,
                    fontWeight: 800,
                    color: 'var(--text)',
                    marginBottom: 4,
                }}
            >
                {entry.name}'s {entry.type}
            </div>
            <div
                style={{
                    fontSize: 12,
                    color: 'var(--muted)',
                    marginBottom: 24,
                }}
            >
                ID: #{entry.id} · {entry.category}
            </div>
            <div
                style={{
                    background: '#FEF2F2',
                    borderRadius: 8,
                    padding: '10px 14px',
                    marginBottom: 24,
                    border: '1px solid #FECACA',
                }}
            >
                <span style={{ fontSize: 11, fontWeight: 700, color: '#DC2626' }}>
                    ⚠ This action cannot be undone. The{' '}
                    {entry.type === 'complaint'
                        ? 'complaint and its resolution history'
                        : 'feedback record'}{' '}
                    will be permanently removed.
                </span>
            </div>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
                <button className="btn btn-secondary" onClick={onCancel} style={{ minWidth: 120 }}>
                    Cancel
                </button>
                <button
                    className="btn"
                    onClick={onConfirm}
                    style={{
                        minWidth: 120,
                        background: '#DC2626',
                        color: 'white',
                        border: 'none',
                        fontWeight: 800,
                    }}
                >
                    <Trash2 size={16} className="ms mr-1" />
                    Delete
                </button>
            </div>
        </div>
    </div>
);

/* ═══════════════════════════════════════════════════
   REPLY OVERLAY (for feedbacks — acknowledge/reply)
   ═══════════════════════════════════════════════════ */
const ReplyOverlay = ({
    entry,
    onSend,
    onCancel,
}: {
    entry: FeedbackEntry;
    onSend: (msg: string) => void;
    onCancel: () => void;
}) => {
    const [msg, setMsg] = useState('');
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
            onClick={onCancel}
        >
            <div
                style={{
                    background: 'white',
                    borderRadius: 16,
                    width: '100%',
                    maxWidth: 480,
                    boxShadow: '0 20px 60px rgba(0,0,0,.15)',
                }}
                onClick={(e) => e.stopPropagation()}
            >
                <div
                    style={{
                        padding: '20px 24px',
                        borderBottom: '1px solid var(--border)',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <div>
                        <div style={{ fontSize: 16, fontWeight: 900, color: 'var(--text)' }}>
                            Reply to {entry.name}
                        </div>
                        <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 2 }}>
                            #{entry.id} · {entry.category}
                        </div>
                    </div>
                    <button
                        onClick={onCancel}
                        style={{
                            background: 'var(--surface)',
                            border: '1px solid var(--border)',
                            borderRadius: 8,
                            width: 32,
                            height: 32,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <X size={18} color="#64748B" />
                    </button>
                </div>

                <div style={{ padding: '20px 24px' }}>
                    {/* Original comment */}
                    <div
                        style={{
                            background: 'var(--surface)',
                            borderRadius: 10,
                            padding: '12px 16px',
                            marginBottom: 16,
                            border: '1px solid var(--border)',
                            fontSize: 12,
                            color: '#475569',
                            fontStyle: 'italic',
                        }}
                    >
                        "{entry.comment}"
                    </div>

                    <label
                        style={{
                            display: 'block',
                            fontSize: 10,
                            fontWeight: 900,
                            textTransform: 'uppercase',
                            letterSpacing: '.06em',
                            color: '#64748B',
                            marginBottom: 6,
                        }}
                    >
                        Your Reply <span style={{ color: '#DC2626' }}>*</span>
                    </label>
                    <textarea
                        className="form-input"
                        rows={4}
                        placeholder="Write your acknowledgment or reply…"
                        value={msg}
                        onChange={(e) => setMsg(e.target.value)}
                        style={{ width: '100%', resize: 'vertical' }}
                    />
                    <div
                        style={{
                            display: 'flex',
                            gap: 12,
                            justifyContent: 'flex-end',
                            marginTop: 16,
                        }}
                    >
                        <button className="btn btn-secondary" onClick={onCancel}>
                            Cancel
                        </button>
                        <button
                            className="btn btn-primary"
                            disabled={!msg.trim()}
                            onClick={() => onSend(msg)}
                            style={{ minWidth: 120, opacity: msg.trim() ? 1 : 0.5 }}
                        >
                            <span className="material-symbols-outlined ms">send</span>
                            Send Reply
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

/* ═══════════════════════════════════════════════════
   FEEDBACKS & COMPLAINTS PAGE
   ═══════════════════════════════════════════════════ */

type FeedbackTab = 'all' | 'feedbacks' | 'complaints';

export const FeedbacksPage = () => {
    const navigate = useNavigate();

    const [entries, setEntries] = useState<FeedbackEntry[]>(INITIAL_FEEDBACKS);
    const [search, setSearch] = useState('');
    const [activeTab, setActiveTab] = useState<FeedbackTab>('all');
    const [statusFilter, setStatusFilter] = useState('All');
    const [priorityFilter, setPriorityFilter] = useState('All');
    const [viewEntry, setViewEntry] = useState<{
        entry: FeedbackEntry;
        idx: number;
    } | null>(null);
    const [deleteEntry, setDeleteEntry] = useState<FeedbackEntry | null>(null);
    const [replyEntry, setReplyEntry] = useState<FeedbackEntry | null>(null);

    /* ── Filtering ── */
    const filtered = entries.filter((e) => {
        const q = search.toLowerCase().trim();
        const matchSearch =
            !q ||
            e.name.toLowerCase().includes(q) ||
            e.comment.toLowerCase().includes(q) ||
            e.target.toLowerCase().includes(q) ||
            e.id.toLowerCase().includes(q) ||
            e.category.toLowerCase().includes(q);
        const matchTab =
            activeTab === 'all' ||
            (activeTab === 'complaints' && e.type === 'complaint') ||
            (activeTab === 'feedbacks' && e.type === 'feedback');
        const matchStatus = statusFilter === 'All' || e.status === statusFilter;
        const matchPriority = priorityFilter === 'All' || e.priority === priorityFilter;
        return matchSearch && matchTab && matchStatus && matchPriority;
    });

    /* ── Dynamic stats ── */
    const totalEntries = entries.length;
    const feedbackCount = entries.filter((e) => e.type === 'feedback').length;
    const openComplaints = entries.filter(
        (e) => e.type === 'complaint' && e.status === 'Open'
    ).length;
    const resolvedCount = entries.filter((e) => e.status === 'Resolved').length;
    const avgRating =
        entries.filter((e) => e.rating > 0).length > 0
            ? (
                  entries.filter((e) => e.rating > 0).reduce((s, e) => s + e.rating, 0) /
                  entries.filter((e) => e.rating > 0).length
              ).toFixed(1)
            : '—';

    /* ── Handlers ── */
    const handleDelete = () => {
        if (!deleteEntry) return;
        setEntries((prev) => prev.filter((e) => e.id !== deleteEntry.id));
        setDeleteEntry(null);
    };

    const handleReply = () => {
        // In real app, this would send the reply. Here we just close the overlay.
        setReplyEntry(null);
    };

    const tabBtn = (tab: FeedbackTab, label: React.ReactNode) => (
        <button
            className={activeTab === tab ? 'btn btn-primary' : 'btn btn-secondary'}
            style={{ fontSize: 12, padding: '8px 14px' }}
            onClick={() => setActiveTab(tab)}
        >
            {label}
        </button>
    );

    return (
        <>
            <div className="page-header">
                <div>
                    <div className="page-title">
                        <MessageSquare size={18} className="ms mr-2" />
                        Feedbacks &amp; Complaints
                    </div>
                    <div className="breadcrumb">
                        Admin <span>/</span> Feedbacks &amp; Complaints
                    </div>
                </div>
                <div className="header-actions">
                    <button className="btn btn-secondary">
                        <Download size={16} className="ms mr-1" />
                        Export
                    </button>
                    {/* <button
            className="btn btn-primary"
            onClick={() => navigate("/feedbacks/complaint")}
          >
            <span className="material-symbols-outlined ms">add</span>Submit
            Complaint
          </button> */}
                </div>
            </div>

            <div className="page-body">
                {/* ── Stat cards ── */}
                <div className="stat-grid stat-grid-4">
                    {[
                        {
                            bg: '#FEF3C7',
                            ic: '#D97706',
                            icon: Star,
                            label: 'Average Rating',
                            val: String(avgRating),
                            trend: 'From feedbacks',
                            tc: 'trend-neutral',
                        },
                        {
                            bg: '#EDE9FE',
                            ic: '#7C3AED',
                            icon: MessageSquare,
                            label: 'Total Submissions',
                            val: String(totalEntries),
                            trend: `${feedbackCount} feedbacks`,
                            tc: 'trend-neutral',
                        },
                        {
                            bg: '#FEE2E2',
                            ic: '#DC2626',
                            icon: Flag,
                            label: 'Open Complaints',
                            val: String(openComplaints).padStart(2, '0'),
                            trend: 'Requires action',
                            tc: 'trend-down',
                        },
                        {
                            bg: '#DCFCE7',
                            ic: '#059669',
                            icon: CheckCircle2,
                            label: 'Resolved',
                            val: String(resolvedCount),
                            trend: '',
                            tc: '',
                        },
                    ].map((s) => (
                        <div key={s.label} className="stat-card">
                            <div className="stat-icon" style={{ background: s.bg }}>
                                    {s.icon === Star && <Star size={24} color={s.ic} />}
                                    {s.icon === MessageSquare && <MessageSquare size={24} color={s.ic} />}
                                    {s.icon === Flag && <Flag size={24} color={s.ic} />}
                                    {s.icon === CheckCircle2 && <CheckCircle2 size={24} color={s.ic} />}
                            </div>
                            <div>
                                <div className="stat-label">{s.label}</div>
                                <div className="stat-value">{s.val}</div>
                                {s.trend && <div className={`stat-trend ${s.tc}`}>{s.trend}</div>}
                            </div>
                        </div>
                    ))}
                </div>

                {/* ── Filter bar ── */}
                <div className="filter-bar">
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
                            placeholder="Search comments, users or IDs…"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>

                    {/* Tabs */}
                    {tabBtn('all', 'All')}
                    {tabBtn('feedbacks', 'Feedbacks')}
                    {tabBtn(
                        'complaints',
                        <>
                            Complaints{' '}
                            {openComplaints > 0 && (
                                <Badge variant="red" style={{ marginLeft: 4 }}>
                                    {openComplaints}
                                </Badge>
                            )}
                        </>
                    )}

                    {/* Status filter */}
                    <div style={{ position: 'relative', flexShrink: 0 }}>
                        <select
                            className="form-select"
                            style={{ width: 140, paddingRight: 32 }}
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                        >
                            <option value="All">All Status</option>
                            <option value="Open">Open</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Resolved">Resolved</option>
                            <option value="Dismissed">Dismissed</option>
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
                    {/* Priority filter */}
                    <div style={{ position: 'relative', flexShrink: 0 }}>
                        <select
                            className="form-select"
                            style={{ width: 130, paddingRight: 32 }}
                            value={priorityFilter}
                            onChange={(e) => setPriorityFilter(e.target.value)}
                        >
                            <option value="All">All Priority</option>
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                            <option value="Critical">Critical</option>
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

                {/* ── Table ── */}
                <div className="table-card">
                    <table className="data-table" style={{ tableLayout: 'fixed', width: '100%' }}>
                        <thead>
                            <tr>
                                <th style={{ width: '14%' }}>Reviewer</th>
                                <th style={{ width: '8%' }}>Type</th>
                                <th style={{ width: '8%' }}>Rating</th>
                                <th style={{ width: '22%' }}>Comment</th>
                                <th style={{ width: '10%' }}>Target</th>
                                <th style={{ width: '8%' }}>Priority</th>
                                <th style={{ width: '8%' }}>Status</th>
                                <th style={{ width: '9%' }}>Date</th>
                                <th style={{ width: '13%' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan={9}
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
                                        No{' '}
                                        {activeTab === 'all'
                                            ? 'entries'
                                            : activeTab === 'complaints'
                                              ? 'complaints'
                                              : 'feedbacks'}{' '}
                                        found
                                        {search ? ` matching "${search}"` : ''}.
                                    </td>
                                </tr>
                            ) : (
                                filtered.map((e) => {
                                    const globalIdx = entries.findIndex((x) => x.id === e.id);
                                    const ac = avatarColor(globalIdx);
                                    return (
                                        <tr key={e.id}>
                                            <td>
                                                <div
                                                    style={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: 8,
                                                    }}
                                                >
                                                    <div
                                                        className="avatar"
                                                        style={{
                                                            background: ac.bg,
                                                            color: ac.color,
                                                        }}
                                                    >
                                                        {getInitials(e.name)}
                                                    </div>
                                                    <div>
                                                        <b>{e.name}</b>
                                                        <div
                                                            style={{
                                                                fontSize: 11,
                                                                color: 'var(--muted)',
                                                            }}
                                                        >
                                                            {e.role}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                {e.type === 'complaint' ? (
                                                    <Badge variant="red">Complaint</Badge>
                                                ) : (
                                                    <Badge variant="green">Feedback</Badge>
                                                )}
                                            </td>
                                            <td>
                                                <Stars rating={e.rating} />
                                            </td>
                                            <td
                                                style={{
                                                    fontSize: 12,
                                                    color: '#475569',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    whiteSpace: 'nowrap',
                                                }}
                                                title={e.comment}
                                            >
                                                {e.comment}
                                            </td>
                                            <td
                                                style={{
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    whiteSpace: 'nowrap',
                                                }}
                                            >
                                                <div
                                                    style={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: 4,
                                                        overflow: 'hidden',
                                                    }}
                                                >
                                                    <span
                                                        className="material-symbols-outlined"
                                                        style={{
                                                            fontSize: 14,
                                                            color: 'var(--muted)',
                                                            flexShrink: 0,
                                                        }}
                                                    >
                                                        {targetTypeIcon(e.targetType)}
                                                    </span>
                                                    <span
                                                        style={{
                                                            fontSize: 12,
                                                            fontWeight: 700,
                                                            overflow: 'hidden',
                                                            textOverflow: 'ellipsis',
                                                            whiteSpace: 'nowrap',
                                                        }}
                                                    >
                                                        {e.target}
                                                    </span>
                                                </div>
                                            </td>
                                            <td>
                                                <Badge variant={priorityVariant(e.priority)}>
                                                    {e.priority}
                                                </Badge>
                                            </td>
                                            <td>
                                                <Badge variant={feedbackStatusVariant(e.status)}>
                                                    {e.status}
                                                </Badge>
                                            </td>
                                            <td
                                                style={{
                                                    fontSize: 12,
                                                    color: 'var(--muted)',
                                                    whiteSpace: 'nowrap',
                                                }}
                                            >
                                                {e.date}
                                            </td>
                                            <td>
                                                {e.type === 'complaint' ? (
                                                    <div className="actions-col">
                                                        <button
                                                            className="act-btn act-view"
                                                            title="View Details"
                                                            onClick={() =>
                                                                setViewEntry({
                                                                    entry: e,
                                                                    idx: globalIdx,
                                                                })
                                                            }
                                                        >
                                                            <Eye size={16} className="ms" />
                                                        </button>
                                                        {e.status !== 'Resolved' &&
                                                            e.status !== 'Dismissed' && (
                                                                <button
                                                                    className="act-btn act-check"
                                                                    title="Resolve Complaint"
                                                                    onClick={() =>
                                                                        navigate(
                                                                            `/feedbacks/resolve/${e.id}`
                                                                        )
                                                                    }
                                                                >
                                                                    <CheckCircle2 size={16} className="ms" />
                                                                </button>
                                                            )}
                                                        <button
                                                            className="act-btn act-delete"
                                                            title="Delete"
                                                            onClick={() => setDeleteEntry(e)}
                                                        >
                                                            <Trash2 size={16} className="ms" />
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <div className="actions-col">
                                                        <button
                                                            className="act-btn act-view"
                                                            title="View Details"
                                                            onClick={() =>
                                                                setViewEntry({
                                                                    entry: e,
                                                                    idx: globalIdx,
                                                                })
                                                            }
                                                        >
                                                            <Eye size={16} className="ms" />
                                                        </button>
                                                        <button
                                                            className="act-btn"
                                                            style={{ color: 'var(--primary)' }}
                                                            title="Reply"
                                                            onClick={() => setReplyEntry(e)}
                                                        >
                                                            <Reply size={16} className="ms" />
                                                        </button>
                                                        <button
                                                            className="act-btn act-delete"
                                                            title="Delete"
                                                            onClick={() => setDeleteEntry(e)}
                                                        >
                                                            <Trash2 size={16} className="ms" />
                                                        </button>
                                                    </div>
                                                )}
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                    <Pagination
                        info={`Showing ${filtered.length} of ${entries.length} entries`}
                        pages={[1, 2, 3]}
                        current={1}
                    />
                </div>
            </div>

            {/* ── View overlay ── */}
            {viewEntry && (
                <ViewOverlay
                    entry={viewEntry.entry}
                    index={viewEntry.idx}
                    onClose={() => setViewEntry(null)}
                />
            )}

            {/* ── Delete confirmation ── */}
            {deleteEntry && (
                <DeleteOverlay
                    entry={deleteEntry}
                    onConfirm={handleDelete}
                    onCancel={() => setDeleteEntry(null)}
                />
            )}

            {/* ── Reply overlay ── */}
            {replyEntry && (
                <ReplyOverlay
                    entry={replyEntry}
                    onSend={handleReply}
                    onCancel={() => setReplyEntry(null)}
                />
            )}
        </>
    );
};
