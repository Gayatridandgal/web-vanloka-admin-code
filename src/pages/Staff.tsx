import { useNavigate } from 'react-router-dom';
import type { ModalName } from '../types';
import { Badge, Pagination } from '../ui/index';

const staff = [
    {
        init: 'RS',
        bg: '#EDE9FE',
        cl: '#7C3AED',
        name: 'Rahul Sharma',
        id: 'EMP-1024',
        role: 'Operations Manager',
        email: 'rahul.sharma@example.com',
        phone: '+91 98765 43210',
        date: '12 Jan 2022',
        status: 'green' as const,
        sLabel: 'Active',
    },
    {
        init: 'AG',
        bg: '#DBEAFE',
        cl: '#2563EB',
        name: 'Ananya Gupta',
        id: 'EMP-1032',
        role: 'Fleet Dispatcher',
        email: 'ananya.g@example.com',
        phone: '+91 98765 43221',
        date: '5 Mar 2021',
        status: 'green' as const,
        sLabel: 'Active',
    },
    {
        init: 'VP',
        bg: '#FEF3C7',
        cl: '#D97706',
        name: 'Vikram Patel',
        id: 'EMP-0988',
        role: 'Sr. Coordinator',
        email: 'v.patel@example.com',
        phone: '+91 98765 43232',
        date: '20 Aug 2023',
        status: 'amber' as const,
        sLabel: 'On Leave',
    },
    {
        init: 'SM',
        bg: '#FEE2E2',
        cl: '#DC2626',
        name: 'Sonia Mehra',
        id: 'EMP-1120',
        role: 'HR Associate',
        email: 'sonia.m@example.com',
        phone: '+91 98765 43256',
        date: '3 Nov 2023',
        status: 'slate' as const,
        sLabel: 'Inactive',
    },
];

export const StaffPage = ({ openModal }: { openModal: (m: ModalName) => void }) => {
    const navigate = useNavigate();

    return (
        <>
            <div className="page-header">
                <div>
                    <div className="page-title">
                        <span className="material-symbols-outlined ms" style={{ fontSize: 18 }}>
                            group
                        </span>
                        Staff Management
                    </div>
                    <div className="breadcrumb">
                        Admin <span>/</span> Staff Management
                    </div>
                </div>
                <div className="header-actions">
                    <button className="btn btn-success" onClick={() => openModal('excel-staff')}>
                        <span className="material-symbols-outlined ms">upload_file</span>
                        Import Excel
                    </button>
                    <button className="btn btn-secondary">
                        <span className="material-symbols-outlined ms">download</span>Export
                    </button>
                    {/* ← navigates to full-page create form */}
                    <button className="btn btn-primary" onClick={() => navigate('/staff/create')}>
                        <span className="material-symbols-outlined ms">person_add</span>Add Employee
                    </button>
                </div>
            </div>

            <div className="page-body">
                <div className="stat-grid stat-grid-4">
                    {[
                        {
                            bg: '#EDE9FE',
                            ic: '#7C3AED',
                            icon: 'group',
                            label: 'Total Staff',
                            val: '124',
                        },
                        {
                            bg: '#DCFCE7',
                            ic: '#059669',
                            icon: 'check_circle',
                            label: 'Active',
                            val: '118',
                        },
                        {
                            bg: '#FEF3C7',
                            ic: '#D97706',
                            icon: 'beach_access',
                            label: 'On Leave',
                            val: '4',
                        },
                        {
                            bg: '#FEE2E2',
                            ic: '#DC2626',
                            icon: 'block',
                            label: 'Inactive',
                            val: '2',
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
                            </div>
                        </div>
                    ))}
                </div>

                <div className="filter-bar">
                    <div className="search-wrap">
                        <span className="material-symbols-outlined ms">search</span>
                        <input
                            className="search-input"
                            placeholder="Search by name, email or role…"
                        />
                    </div>
                    <select className="form-select" style={{ width: 150 }}>
                        <option>All Roles</option>
                        <option>Manager</option>
                        <option>Coordinator</option>
                        <option>Support</option>
                    </select>
                    <select className="form-select" style={{ width: 130 }}>
                        <option>All Status</option>
                        <option>Active</option>
                        <option>On Leave</option>
                        <option>Inactive</option>
                    </select>
                </div>

                <div className="table-card">
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Employee</th>
                                <th>Role</th>
                                <th>Contact Details</th>
                                <th>Join Date</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {staff.map((s) => (
                                <tr key={s.id}>
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
                                                    background: s.bg,
                                                    color: s.cl,
                                                    width: 36,
                                                    height: 36,
                                                    fontSize: 12,
                                                }}
                                            >
                                                {s.init}
                                            </div>
                                            <div>
                                                <div style={{ fontWeight: 800 }}>{s.name}</div>
                                                <div
                                                    style={{ fontSize: 11, color: 'var(--muted)' }}
                                                >
                                                    ID: {s.id}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <b>{s.role}</b>
                                    </td>
                                    <td>
                                        <div style={{ fontSize: 12 }}>
                                            <div>{s.email}</div>
                                            <div style={{ color: 'var(--muted)' }}>{s.phone}</div>
                                        </div>
                                    </td>
                                    <td style={{ fontSize: 12, color: 'var(--muted)' }}>
                                        {s.date}
                                    </td>
                                    <td>
                                        <Badge variant={s.status}>{s.sLabel}</Badge>
                                    </td>
                                    <td>
                                        <div className="actions-col">
                                            <button
                                                className="act-btn act-view"
                                                onClick={() => openModal('staff-view')}
                                            >
                                                <span className="material-symbols-outlined ms">
                                                    visibility
                                                </span>
                                            </button>
                                            <button
                                                className="act-btn act-edit"
                                                onClick={() => openModal('staff-edit')}
                                            >
                                                <span className="material-symbols-outlined ms">
                                                    edit
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
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <Pagination
                        info="Showing 1 to 5 of 124 results"
                        pages={['Prev', 1, 2, 'Next']}
                        current={1}
                    />
                </div>
            </div>
        </>
    );
};

export default StaffPage;
