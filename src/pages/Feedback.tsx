import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { ModalName } from '../types';
import { Badge, Pagination, Stars } from '../ui/index';

/* ══════════ FEEDBACKS ══════════ */

type FeedbackTab = 'all' | 'feedbacks' | 'complaints';

const ALL_ROWS = [
    {
        type: 'complaint' as const,
        initials: 'JD',
        avatarBg: '#EDE9FE',
        avatarColor: 'var(--primary)',
        name: 'John Doe',
        role: 'Staff',
        rating: 0,
        comment: 'AC was not working properly in the rear seats…',
        targetVariant: 'blue' as const,
        target: 'KA-01-2345',
        date: 'Oct 23, 2023',
    },
    {
        type: 'feedback' as const,
        initials: 'AK',
        avatarBg: '#DBEAFE',
        avatarColor: '#2563EB',
        name: 'Ananya Kulkarni',
        role: 'Traveller',
        rating: 5,
        comment: 'The driver was very professional and reached…',
        targetVariant: 'purple' as const,
        target: 'Rahul S.',
        date: 'Oct 24, 2023',
    },
];

export const FeedbacksPage = ({ openModal }: { openModal: (m: ModalName) => void }) => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<FeedbackTab>('all');
    const [search, setSearch] = useState('');

    const visibleRows = ALL_ROWS.filter((r) => {
        const matchTab =
            activeTab === 'all' ||
            (activeTab === 'complaints' && r.type === 'complaint') ||
            (activeTab === 'feedbacks' && r.type === 'feedback');
        const matchSearch =
            search.trim() === '' ||
            r.name.toLowerCase().includes(search.toLowerCase()) ||
            r.comment.toLowerCase().includes(search.toLowerCase()) ||
            r.target.toLowerCase().includes(search.toLowerCase());
        return matchTab && matchSearch;
    });

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
                        <span className="material-symbols-outlined ms" style={{ fontSize: 18 }}>
                            chat_bubble
                        </span>
                        Feedbacks &amp; Complaints
                    </div>
                    <div className="breadcrumb">
                        Admin <span>/</span> Feedbacks &amp; Complaints
                    </div>
                </div>
                <div className="header-actions">
                    <button className="btn btn-secondary">
                        <span className="material-symbols-outlined ms">download</span>Export
                    </button>
                    <button
                        className="btn btn-primary"
                        onClick={() => navigate('/feedbacks/complaint')}
                    >
                        <span className="material-symbols-outlined ms">add</span>Submit Complaint
                    </button>
                </div>
            </div>
            <div className="page-body">
                <div className="stat-grid stat-grid-4">
                    {[
                        {
                            bg: '#FEF3C7',
                            ic: '#D97706',
                            icon: 'star',
                            label: 'Average Rating',
                            val: '4.8',
                            trend: '+0.2 from last month',
                            tc: 'trend-up',
                        },
                        {
                            bg: '#EDE9FE',
                            ic: '#7C3AED',
                            icon: 'chat_bubble',
                            label: 'Total Submissions',
                            val: '1,284',
                            trend: 'All time',
                            tc: 'trend-neutral',
                        },
                        {
                            bg: '#FEE2E2',
                            ic: '#DC2626',
                            icon: 'flag',
                            label: 'Open Complaints',
                            val: '08',
                            trend: 'Requires action',
                            tc: 'trend-down',
                        },
                        {
                            bg: '#DCFCE7',
                            ic: '#059669',
                            icon: 'check_circle',
                            label: 'Resolved',
                            val: '1,276',
                            trend: '',
                            tc: '',
                        },
                    ].map((s) => (
                        <div key={s.label} className="stat-card">
                            <div className="stat-icon" style={{ background: s.bg }}>
                                <span
                                    className="material-symbols-outlined ms"
                                    style={{ color: s.ic }}
                                >
                                    {s.icon}
                                </span>
                            </div>
                            <div>
                                <div className="stat-label">{s.label}</div>
                                <div className="stat-value">{s.val}</div>
                                {s.trend && <div className={`stat-trend ${s.tc}`}>{s.trend}</div>}
                            </div>
                        </div>
                    ))}
                </div>

                {/* ── Filter bar with working tabs ── */}
                <div className="filter-bar">
                    <div className="search-wrap">
                        <span className="material-symbols-outlined ms">search</span>
                        <input
                            className="search-input"
                            placeholder="Search comments, users or complaint IDs…"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    {tabBtn('all', 'All')}
                    {tabBtn('feedbacks', 'Feedbacks')}
                    {tabBtn(
                        'complaints',
                        <>
                            Complaints{' '}
                            <Badge variant="red" style={{ marginLeft: 4 }}>
                                8
                            </Badge>
                        </>
                    )}
                </div>

                {/* ── Table ── */}
                <div className="table-card">
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Reviewer</th>
                                <th>Type</th>
                                <th>Rating</th>
                                <th>Comment</th>
                                <th>Target</th>
                                <th>Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {visibleRows.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan={7}
                                        style={{
                                            textAlign: 'center',
                                            padding: '32px 0',
                                            color: 'var(--muted)',
                                            fontSize: 13,
                                            fontWeight: 600,
                                        }}
                                    >
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
                                visibleRows.map((r) => (
                                    <tr key={r.name + r.date}>
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
                                                        background: r.avatarBg,
                                                        color: r.avatarColor,
                                                    }}
                                                >
                                                    {r.initials}
                                                </div>
                                                <div>
                                                    <b>{r.name}</b>
                                                    <div
                                                        style={{
                                                            fontSize: 11,
                                                            color: 'var(--muted)',
                                                        }}
                                                    >
                                                        {r.role}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            {r.type === 'complaint' ? (
                                                <Badge variant="red">Complaint</Badge>
                                            ) : (
                                                <Badge variant="green">Feedback</Badge>
                                            )}
                                        </td>
                                        <td>
                                            <Stars rating={r.rating} />
                                        </td>
                                        <td
                                            style={{
                                                fontSize: 12,
                                                maxWidth: 200,
                                                color: '#475569',
                                            }}
                                        >
                                            {r.comment}
                                        </td>
                                        <td>
                                            <Badge variant={r.targetVariant}>{r.target}</Badge>
                                        </td>
                                        <td style={{ fontSize: 12, color: 'var(--muted)' }}>
                                            {r.date}
                                        </td>
                                        <td>
                                            {r.type === 'complaint' ? (
                                                <div className="actions-col">
                                                    <button
                                                        className="act-btn act-view"
                                                        onClick={() =>
                                                            navigate('/feedbacks/resolve')
                                                        }
                                                    >
                                                        <span className="material-symbols-outlined ms">
                                                            visibility
                                                        </span>
                                                    </button>
                                                    <button
                                                        className="act-btn act-check"
                                                        onClick={() =>
                                                            navigate('/feedbacks/resolve')
                                                        }
                                                    >
                                                        <span className="material-symbols-outlined ms">
                                                            check_circle
                                                        </span>
                                                    </button>
                                                    <button
                                                        className="act-btn act-delete"
                                                        onClick={() => openModal('delete-confirm')}
                                                    >
                                                        <span className="material-symbols-outlined ms">
                                                            delete
                                                        </span>
                                                    </button>
                                                </div>
                                            ) : (
                                                <div className="actions-col">
                                                    <button className="act-btn act-view">
                                                        <span className="material-symbols-outlined ms">
                                                            visibility
                                                        </span>
                                                    </button>
                                                    <button
                                                        className="act-btn"
                                                        style={{ color: 'var(--primary)' }}
                                                    >
                                                        <span className="material-symbols-outlined ms">
                                                            reply
                                                        </span>
                                                    </button>
                                                    <button
                                                        className="act-btn act-delete"
                                                        onClick={() => openModal('delete-confirm')}
                                                    >
                                                        <span className="material-symbols-outlined ms">
                                                            delete
                                                        </span>
                                                    </button>
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                    <Pagination
                        info={`Showing ${visibleRows.length} of 1,284 entries`}
                        pages={['Prev', 1, 2, 3, 'Next']}
                        current={1}
                    />
                </div>
            </div>
        </>
    );
};
