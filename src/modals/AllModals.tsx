import React, { useState } from 'react';
import type { ModalName } from '../types';
import { Modal } from '../ui/Modal';

interface Props {
    active: ModalName;
    close: () => void;
    goto: (m: ModalName) => void;
}

const Btn = ({
    variant,
    children,
    onClick,
}: {
    variant: string;
    children: React.ReactNode;
    onClick?: () => void;
}) => (
    <button className={`btn btn-${variant}`} onClick={onClick}>
        {children}
    </button>
);

const ExcelModal = ({
    open,
    onClose,
    title,
    cols,
}: {
    open: boolean;
    onClose: () => void;
    title: string;
    cols: string;
}) => (
    <Modal
        open={open}
        onClose={onClose}
        title={title}
        size="sm"
        footer={
            <>
                <Btn variant="secondary" onClick={onClose}>
                    Cancel
                </Btn>
                <Btn variant="success">
                    <span className="material-symbols-outlined ms">upload</span>Upload &amp; Import
                </Btn>
            </>
        }
    >
        <div className="upload-zone">
            <span className="material-symbols-outlined">cloud_upload</span>
            <div style={{ fontSize: 13, fontWeight: 800, marginBottom: 4 }}>
                Drop file here or click to browse
            </div>
            <div style={{ fontSize: 12, color: 'var(--muted)' }}>
                Supports .xlsx, .xls, .csv — Max 10 MB
            </div>
        </div>
        <div className="excel-hint" style={{ marginTop: 14 }}>
            <div className="excel-hint-title">📋 Expected Columns</div>
            <div className="excel-hint-cols">{cols}</div>
        </div>
    </Modal>
);

/* ── Permissions list for role-create ── */
const PERMISSIONS = [
    'View Dashboard',
    'View Drivers',
    'View Employees',
    'View Bookings',
    'View Instructors',
    'View Trainees',
    'View Vehicles',
    'View Reports',
    'View Vendors',
    'View Support Tickets',
    'Role Permissions',
    'View Basic Reports',
];

export const AllModals = ({ active, close, goto }: Props) => {
    const is = (n: ModalName) => active === n;

    /* ── Role Create state ── */
    const [checkedPerms, setCheckedPerms] = useState<string[]>([]);
    const [roleName, setRoleName] = useState('');
    const [roleSuccess, setRoleSuccess] = useState(false);
    const [roleError, setRoleError] = useState('');

    const togglePerm = (p: string) => {
        setRoleError('');
        setCheckedPerms((prev) => (prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p]));
    };

    const handleCreateRole = () => {
        if (!roleName.trim()) {
            setRoleError('Please enter a role name.');
            return;
        }
        if (checkedPerms.length === 0) {
            setRoleError('Please select at least one permission.');
            return;
        }
        setRoleError('');
        setRoleSuccess(true);
        setTimeout(() => {
            setRoleSuccess(false);
            setRoleName('');
            setCheckedPerms([]);
            close();
        }, 1800);
    };

    return (
        <>
            {/* ── Success Toast ── */}
            {roleSuccess && (
                <div
                    style={{
                        position: 'fixed',
                        top: 24,
                        right: 24,
                        zIndex: 10000,
                        background: 'white',
                        borderRadius: 14,
                        padding: '14px 20px',
                        boxShadow: '0 8px 32px rgba(5,150,105,0.18)',
                        border: '1.5px solid #DCFCE7',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 12,
                        minWidth: 280,
                    }}
                >
                    <div
                        style={{
                            width: 36,
                            height: 36,
                            background: '#DCFCE7',
                            borderRadius: '50%',
                            flexShrink: 0,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <span
                            className="material-symbols-outlined ms"
                            style={{ fontSize: 20, color: '#059669' }}
                        >
                            check_circle
                        </span>
                    </div>
                    <div>
                        <div style={{ fontSize: 13, fontWeight: 900, color: '#065F46' }}>
                            Role Created Successfully
                        </div>
                        <div
                            style={{
                                fontSize: 11,
                                color: '#059669',
                                fontWeight: 600,
                                marginTop: 1,
                            }}
                        >
                            New role has been added to the system
                        </div>
                    </div>
                </div>
            )}

            {/* ── Delete Confirm ── */}
            <div
                className={`modal-backdrop ${is('delete-confirm') ? 'open' : ''}`}
                onClick={(e) => e.target === e.currentTarget && close()}
            >
                <div className="modal-box-sm">
                    <div className="modal-body" style={{ textAlign: 'center', padding: 28 }}>
                        <div className="danger-icon-box">
                            <span className="material-symbols-outlined ms">delete</span>
                        </div>
                        <div style={{ fontSize: 16, fontWeight: 900, marginBottom: 8 }}>
                            Confirm Deletion
                        </div>
                        <div
                            style={{
                                fontSize: 13,
                                color: '#64748B',
                                lineHeight: 1.6,
                                marginBottom: 22,
                            }}
                        >
                            This record will be permanently deleted. This action cannot be undone.
                        </div>
                        <div style={{ display: 'flex', gap: 10 }}>
                            <button
                                className="btn btn-secondary"
                                style={{ flex: 1 }}
                                onClick={close}
                            >
                                Cancel
                            </button>
                            <button className="btn btn-danger" style={{ flex: 1 }} onClick={close}>
                                <span className="material-symbols-outlined ms">delete</span>Yes,
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Excel Imports ── */}
            <ExcelModal
                open={is('excel-staff')}
                onClose={close}
                title="Import Staff Data"
                cols="Name · Email · Phone · Role · Department · Join Date · Status"
            />
            <ExcelModal
                open={is('excel-vehicle')}
                onClose={close}
                title="Import Vehicle Data"
                cols="Brand · Model · Type · Year · Plate No. · Status · Next Service Date"
            />
            <ExcelModal
                open={is('excel-instructor')}
                onClose={close}
                title="Import Instructor Data"
                cols="Name · Email · Phone · License No. · Specialization · Status"
            />
            <ExcelModal
                open={is('excel-trainee')}
                onClose={close}
                title="Import Trainee Data"
                cols="Name · DOB · Aadhar No. · Phone · Email · Course · Enrol Date"
            />

            {/* ── Role Create ── */}
            <Modal
                open={is('role-create')}
                onClose={close}
                title="Create New System Role"
                footer={
                    <>
                        <Btn
                            variant="secondary"
                            onClick={() => {
                                setRoleError('');
                                close();
                            }}
                        >
                            Cancel
                        </Btn>
                        <Btn variant="primary" onClick={handleCreateRole}>
                            <span className="material-symbols-outlined ms">add</span>Create Role
                        </Btn>
                    </>
                }
            >
                {/* Role Name */}
                <div className="form-group">
                    <label className="form-label">Role Name</label>
                    <input
                        className="form-input"
                        placeholder="e.g. Operations Manager"
                        value={roleName}
                        style={{
                            borderColor: roleError && !roleName.trim() ? '#DC2626' : undefined,
                        }}
                        onChange={(e) => {
                            setRoleName(e.target.value);
                            setRoleError('');
                        }}
                    />
                    {/* ── Inline error message ── */}
                    {roleError && (
                        <div
                            style={{
                                fontSize: 11,
                                color: '#DC2626',
                                fontWeight: 700,
                                marginTop: 5,
                            }}
                        >
                            ⚠ {roleError}
                        </div>
                    )}
                </div>

                {/* Permissions */}
                <div className="form-group">
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'flex-start',
                            marginBottom: 12,
                        }}
                    >
                        <div>
                            <label className="form-label" style={{ marginBottom: 2 }}>
                                Assign Permissions
                            </label>
                            <div style={{ fontSize: 12, color: 'var(--muted)', fontWeight: 500 }}>
                                Define what this role can see and do
                            </div>
                        </div>
                        <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
                            {/* ✅ Select All — wired to setCheckedPerms */}
                            <button
                                style={{
                                    fontSize: 12,
                                    color: 'var(--primary)',
                                    fontWeight: 800,
                                    cursor: 'pointer',
                                    background: 'none',
                                    border: 'none',
                                    padding: 0,
                                }}
                                onClick={() => {
                                    setCheckedPerms([...PERMISSIONS]);
                                    setRoleError('');
                                }}
                            >
                                Select All
                            </button>
                            <span style={{ color: 'var(--border)' }}>|</span>
                            {/* ✅ Deselect All — wired to setCheckedPerms */}
                            <button
                                style={{
                                    fontSize: 12,
                                    color: 'var(--muted)',
                                    fontWeight: 700,
                                    cursor: 'pointer',
                                    background: 'none',
                                    border: 'none',
                                    padding: 0,
                                }}
                                onClick={() => setCheckedPerms([])}
                            >
                                Deselect All
                            </button>
                        </div>
                    </div>

                    {/* 3-column card grid */}
                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: '1fr 1fr 1fr',
                            gap: 8,
                        }}
                    >
                        {PERMISSIONS.map((p) => {
                            const checked = checkedPerms.includes(p);
                            return (
                                <div
                                    key={p}
                                    onClick={() => togglePerm(p)}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 10,
                                        padding: '10px 12px',
                                        borderRadius: 10,
                                        cursor: 'pointer',
                                        border: `1.5px solid ${checked ? 'var(--primary)' : 'var(--border)'}`,
                                        background: checked ? '#F5F3FF' : 'var(--surface)',
                                        transition: 'all .15s',
                                        userSelect: 'none',
                                    }}
                                >
                                    {/* Circle checkbox */}
                                    <div
                                        style={{
                                            width: 18,
                                            height: 18,
                                            borderRadius: '50%',
                                            flexShrink: 0,
                                            border: `2px solid ${checked ? 'var(--primary)' : '#CBD5E1'}`,
                                            background: checked ? 'var(--primary)' : 'white',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            transition: 'all .15s',
                                        }}
                                    >
                                        {checked && (
                                            <svg
                                                width="10"
                                                height="10"
                                                viewBox="0 0 10 10"
                                                fill="none"
                                            >
                                                <path
                                                    d="M2 5l2.5 2.5L8 3"
                                                    stroke="white"
                                                    strokeWidth="1.8"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>
                                        )}
                                    </div>
                                    <span
                                        style={{
                                            fontSize: 11,
                                            fontWeight: 800,
                                            lineHeight: 1.3,
                                            color: checked ? 'var(--primary)' : '#64748B',
                                            textTransform: 'uppercase',
                                            letterSpacing: '.04em',
                                        }}
                                    >
                                        {p}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </Modal>

            {/* ── Role View ── */}
            <Modal
                open={is('role-view')}
                onClose={close}
                title="Role Details — BUS-ADMIN"
                size="sm"
                footer={
                    <Btn variant="secondary" onClick={close}>
                        Close
                    </Btn>
                }
            >
                {[
                    ['Role Name', 'BUS-ADMIN'],
                    ['Description', 'Fleet Operations • Full Access'],
                    ['Assigned Users', '4 users'],
                    ['Last Modified', 'Oct 24, 2023'],
                ].map(([k, v]) => (
                    <div key={k} className="detail-row">
                        <span className="detail-key">{k}</span>
                        <span className="detail-val">{v}</span>
                    </div>
                ))}
                <div className="detail-row">
                    <span className="detail-key">Status</span>
                    <span className="badge badge-green">Active</span>
                </div>
                <div className="detail-row">
                    <span className="detail-key">Permissions</span>
                    <span className="badge badge-purple">All Access</span>
                </div>
            </Modal>

            {/* ── Role Edit ── */}
            <Modal
                open={is('role-edit')}
                onClose={close}
                title="Edit Role"
                size="sm"
                footer={
                    <>
                        <Btn variant="secondary" onClick={close}>
                            Cancel
                        </Btn>
                        <Btn variant="primary">
                            <span className="material-symbols-outlined ms">save</span>Save Changes
                        </Btn>
                    </>
                }
            >
                <div className="form-group">
                    <label className="form-label">Role Name</label>
                    <input className="form-input" defaultValue="BUS-ADMIN" />
                </div>
                <div className="form-group">
                    <label className="form-label">Status</label>
                    <select className="form-select">
                        <option>Active</option>
                        <option>Inactive</option>
                    </select>
                </div>
            </Modal>

            {/* ── Staff Create ── */}
            <Modal
                open={is('staff-create')}
                onClose={close}
                title="Add New Employee"
                footer={
                    <>
                        <Btn variant="secondary" onClick={close}>
                            Cancel
                        </Btn>
                        <Btn variant="primary">
                            <span className="material-symbols-outlined ms">person_add</span>
                            Save Employee Record
                        </Btn>
                    </>
                }
            >
                <div className="form-grid form-grid-2">
                    {[
                        ['First Name', 'John', 'text'],
                        ['Last Name', 'Doe', 'text'],
                        ['Email', 'john.doe@org.com', 'email'],
                        ['Mobile Number', '+91 XXXXX XXXXX', 'text'],
                        ['Designation', 'e.g. Operations Manager', 'text'],
                    ].map(([l, p, t]) => (
                        <div key={l}>
                            <label className="form-label">{l}</label>
                            <input className="form-input" type={t} placeholder={p} />
                        </div>
                    ))}
                    {[
                        ['Employment Type', ['Full Time', 'Part Time', 'Contract']],
                        ['Gender', ['Select Gender', 'Male', 'Female', 'Other']],
                        ['Account Status', ['Active', 'Inactive', 'On Leave']],
                    ].map(([l, opts]) => (
                        <div key={l as string}>
                            <label className="form-label">{l as string}</label>
                            <select className="form-select">
                                {(opts as string[]).map((o) => (
                                    <option key={o}>{o}</option>
                                ))}
                            </select>
                        </div>
                    ))}
                    <div>
                        <label className="form-label">Date of Birth</label>
                        <input className="form-input" type="date" />
                    </div>
                    <div>
                        <label className="form-label">Joining Date</label>
                        <input className="form-input" type="date" />
                    </div>
                </div>
                <div style={{ marginTop: 14 }}>
                    <label className="form-label">Remarks</label>
                    <textarea
                        className="form-input"
                        rows={2}
                        placeholder="Add any additional notes…"
                    />
                </div>
            </Modal>

            {/* ── Staff View ── */}
            <Modal
                open={is('staff-view')}
                onClose={close}
                title="Employee Details"
                size="sm"
                footer={
                    <>
                        <Btn variant="secondary" onClick={close}>
                            Close
                        </Btn>
                        <Btn
                            variant="primary"
                            onClick={() => {
                                close();
                                goto('staff-edit');
                            }}
                        >
                            <span className="material-symbols-outlined ms">edit</span>Edit
                        </Btn>
                    </>
                }
            >
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 14,
                        padding: 14,
                        background: 'var(--surface)',
                        borderRadius: 12,
                        marginBottom: 16,
                    }}
                >
                    <div
                        className="avatar"
                        style={{
                            width: 48,
                            height: 48,
                            fontSize: 16,
                            background: '#EDE9FE',
                            color: 'var(--primary)',
                        }}
                    >
                        RS
                    </div>
                    <div>
                        <div style={{ fontSize: 15, fontWeight: 900 }}>Rahul Sharma</div>
                        <div style={{ fontSize: 12, color: 'var(--muted)' }}>
                            EMP-1024 · Operations Manager
                        </div>
                    </div>
                    <span className="badge badge-green" style={{ marginLeft: 'auto' }}>
                        Active
                    </span>
                </div>
                {[
                    ['Email', 'rahul.sharma@example.com'],
                    ['Phone', '+91 98765 43210'],
                    ['Employment Type', 'Full Time'],
                    ['Join Date', '12 January 2022'],
                    ['Assigned Role', 'Operations Manager'],
                ].map(([k, v]) => (
                    <div key={k} className="detail-row">
                        <span className="detail-key">{k}</span>
                        <span className="detail-val">{v}</span>
                    </div>
                ))}
            </Modal>

            {/* ── Staff Edit ── */}
            <Modal
                open={is('staff-edit')}
                onClose={close}
                title="Edit Employee"
                size="sm"
                footer={
                    <>
                        <Btn variant="secondary" onClick={close}>
                            Cancel
                        </Btn>
                        <Btn variant="primary">
                            <span className="material-symbols-outlined ms">save</span>Save Changes
                        </Btn>
                    </>
                }
            >
                <div className="form-grid form-grid-2">
                    <div>
                        <label className="form-label">Full Name</label>
                        <input className="form-input" defaultValue="Rahul Sharma" />
                    </div>
                    <div>
                        <label className="form-label">Status</label>
                        <select className="form-select">
                            <option>Active</option>
                            <option>On Leave</option>
                            <option>Inactive</option>
                        </select>
                    </div>
                    <div>
                        <label className="form-label">Designation</label>
                        <input className="form-input" defaultValue="Operations Manager" />
                    </div>
                    <div>
                        <label className="form-label">Mobile</label>
                        <input className="form-input" defaultValue="+91 98765 43210" />
                    </div>
                </div>
            </Modal>

            {/* ── Vehicle Create ── */}
            <Modal
                open={is('vehicle-create')}
                onClose={close}
                title="Add New Fleet Vehicle"
                footer={
                    <>
                        <Btn variant="secondary" onClick={close}>
                            Cancel
                        </Btn>
                        <Btn variant="primary">
                            <span className="material-symbols-outlined ms">save</span>Save Vehicle
                        </Btn>
                    </>
                }
            >
                <div className="form-grid form-grid-2">
                    <div>
                        <label className="form-label">Vehicle Number *</label>
                        <input className="form-input" placeholder="e.g. DL-01-AB-1234" />
                    </div>
                    <div>
                        <label className="form-label">Vehicle Type *</label>
                        <select className="form-select">
                            <option>Select Type</option>
                            <option>Car (LMV)</option>
                            <option>Two-Wheeler</option>
                            <option>Heavy Vehicle</option>
                        </select>
                    </div>
                    <div>
                        <label className="form-label">Manufacturer *</label>
                        <input className="form-input" placeholder="e.g. Tata Motors" />
                    </div>
                    <div>
                        <label className="form-label">Vehicle Model *</label>
                        <input className="form-input" placeholder="e.g. Starbus" />
                    </div>
                    <div>
                        <label className="form-label">Manufacturing Year *</label>
                        <input className="form-input" type="number" placeholder="YYYY" />
                    </div>
                    <div>
                        <label className="form-label">Fuel Type *</label>
                        <select className="form-select">
                            <option>Select Fuel</option>
                            <option>Petrol</option>
                            <option>Diesel</option>
                            <option>CNG</option>
                            <option>EV</option>
                        </select>
                    </div>
                    <div>
                        <label className="form-label">Seating Capacity *</label>
                        <input className="form-input" type="number" placeholder="Total seats" />
                    </div>
                    <div>
                        <label className="form-label">Ownership Type *</label>
                        <select className="form-select">
                            <option>Owned</option>
                            <option>Leased</option>
                            <option>Rented</option>
                        </select>
                    </div>
                    <div>
                        <label className="form-label">GPS Device ID *</label>
                        <input className="form-input" placeholder="Device Serial No." />
                    </div>
                    <div>
                        <label className="form-label">Assigned Driver</label>
                        <select className="form-select">
                            <option>Select Driver</option>
                            <option>Rajesh Kumar</option>
                            <option>Sunil Sharma</option>
                        </select>
                    </div>
                </div>
                <div style={{ marginTop: 14 }}>
                    <label className="form-label">Vehicle Remarks</label>
                    <textarea className="form-input" rows={2} placeholder="Additional details…" />
                </div>
            </Modal>

            {/* ── Vehicle View ── */}
            <Modal
                open={is('vehicle-view')}
                onClose={close}
                title="Vehicle Details"
                size="sm"
                footer={
                    <>
                        <Btn variant="secondary" onClick={close}>
                            Close
                        </Btn>
                        <Btn
                            variant="primary"
                            onClick={() => {
                                close();
                                goto('vehicle-edit');
                            }}
                        >
                            <span className="material-symbols-outlined ms">edit</span>Edit
                        </Btn>
                    </>
                }
            >
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 14,
                        padding: 14,
                        background: 'var(--surface)',
                        borderRadius: 12,
                        marginBottom: 16,
                    }}
                >
                    <div
                        style={{
                            width: 48,
                            height: 48,
                            background: '#DBEAFE',
                            borderRadius: 12,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <span
                            className="material-symbols-outlined"
                            style={{ fontSize: 24, color: '#2563EB' }}
                        >
                            directions_car
                        </span>
                    </div>
                    <div>
                        <div style={{ fontSize: 15, fontWeight: 900 }}>Mercedes-Benz Sprinter</div>
                        <div style={{ fontSize: 12, color: 'var(--muted)' }}>
                            VH-2045 · KA-01-EF-4567
                        </div>
                    </div>
                    <span className="badge badge-green" style={{ marginLeft: 'auto' }}>
                        Active
                    </span>
                </div>
                {[
                    ['Type', 'Luxury Shuttle (LMV)'],
                    ['Year', '2023'],
                    ['Fuel Type', 'Diesel'],
                    ['Assigned Driver', 'Rajesh Kumar'],
                    ['Next Service', '12 October 2024'],
                    ['GPS Device', 'GPS-88290-KA'],
                ].map(([k, v]) => (
                    <div key={k} className="detail-row">
                        <span className="detail-key">{k}</span>
                        <span className="detail-val">{v}</span>
                    </div>
                ))}
            </Modal>

            {/* ── Vehicle Edit ── */}
            <Modal
                open={is('vehicle-edit')}
                onClose={close}
                title="Edit Vehicle"
                size="sm"
                footer={
                    <>
                        <Btn variant="secondary" onClick={close}>
                            Cancel
                        </Btn>
                        <Btn variant="primary">
                            <span className="material-symbols-outlined ms">save</span>Save Changes
                        </Btn>
                    </>
                }
            >
                <div className="form-grid form-grid-2">
                    <div>
                        <label className="form-label">Plate Number</label>
                        <input className="form-input" defaultValue="KA-01-EF-4567" />
                    </div>
                    <div>
                        <label className="form-label">Status</label>
                        <select className="form-select">
                            <option>Active</option>
                            <option>Maintenance</option>
                            <option>Inactive</option>
                        </select>
                    </div>
                    <div>
                        <label className="form-label">Assigned Driver</label>
                        <select className="form-select">
                            <option>Rajesh Kumar</option>
                            <option>Sunil Sharma</option>
                        </select>
                    </div>
                    <div>
                        <label className="form-label">Next Service Date</label>
                        <input className="form-input" type="date" defaultValue="2024-10-12" />
                    </div>
                </div>
            </Modal>

            {/* ── Instructor Create ── */}
            <Modal
                open={is('instructor-create')}
                onClose={close}
                title="Instructor Onboarding"
                footer={
                    <>
                        <Btn variant="secondary" onClick={close}>
                            Discard
                        </Btn>
                        <Btn variant="primary">
                            <span className="material-symbols-outlined ms">save</span>Save
                            Instructor
                        </Btn>
                    </>
                }
            >
                <div className="form-grid form-grid-2">
                    {[
                        ['First Name *', 'text', 'Enter first name'],
                        ['Last Name *', 'text', 'Enter last name'],
                        ['Email Address', 'email', 'instructor@example.com'],
                        ['Mobile Number *', 'text', '+1 (000) 000-0000'],
                    ].map(([l, t, p]) => (
                        <div key={l}>
                            <label className="form-label">{l}</label>
                            <input className="form-input" type={t} placeholder={p} />
                        </div>
                    ))}
                    <div>
                        <label className="form-label">DOB *</label>
                        <input className="form-input" type="date" />
                    </div>
                    <div>
                        <label className="form-label">Gender *</label>
                        <select className="form-select">
                            <option>Select Gender</option>
                            <option>Male</option>
                            <option>Female</option>
                            <option>Other</option>
                        </select>
                    </div>
                    <div>
                        <label className="form-label">Employment Type</label>
                        <select className="form-select">
                            <option>Full-time</option>
                            <option>Part-time</option>
                        </select>
                    </div>
                    <div>
                        <label className="form-label">Employee ID</label>
                        <input className="form-input" placeholder="INS-2024-XXXX" />
                    </div>
                    <div>
                        <label className="form-label">Experience (Years)</label>
                        <input className="form-input" type="number" placeholder="Years" />
                    </div>
                    <div>
                        <label className="form-label">Safety Training</label>
                        <select className="form-select">
                            <option>Completed</option>
                            <option>Pending</option>
                        </select>
                    </div>
                    <div>
                        <label className="form-label">Medical Fitness</label>
                        <select className="form-select">
                            <option>Fit</option>
                            <option>Conditional</option>
                        </select>
                    </div>
                    <div>
                        <label className="form-label">Police Verification</label>
                        <select className="form-select">
                            <option>Verified</option>
                            <option>Pending</option>
                        </select>
                    </div>
                </div>
            </Modal>

            {/* ── Instructor View ── */}
            <Modal
                open={is('ins-view')}
                onClose={close}
                title="Instructor Details"
                size="sm"
                footer={
                    <>
                        <Btn variant="secondary" onClick={close}>
                            Close
                        </Btn>
                        <Btn
                            variant="primary"
                            onClick={() => {
                                close();
                                goto('ins-edit');
                            }}
                        >
                            <span className="material-symbols-outlined ms">edit</span>Edit
                        </Btn>
                    </>
                }
            >
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 14,
                        padding: 14,
                        background: 'var(--surface)',
                        borderRadius: 12,
                        marginBottom: 16,
                    }}
                >
                    <div
                        className="avatar"
                        style={{
                            width: 48,
                            height: 48,
                            fontSize: 16,
                            background: '#EDE9FE',
                            color: 'var(--primary)',
                        }}
                    >
                        MR
                    </div>
                    <div>
                        <div style={{ fontSize: 15, fontWeight: 900 }}>Marcus Richardson</div>
                        <div style={{ fontSize: 12, color: 'var(--muted)' }}>INS-7712-X</div>
                    </div>
                    <span className="badge badge-green" style={{ marginLeft: 'auto' }}>
                        Active
                    </span>
                </div>
                {[
                    ['Certification', 'CRT-112233445 · Exp: Jan 2028'],
                    ['Assigned Vehicle', 'Scania K410 · Reg: BUS-0010'],
                    ['Total Sessions', '54 sessions'],
                ].map(([k, v]) => (
                    <div key={k} className="detail-row">
                        <span className="detail-key">{k}</span>
                        <span className="detail-val">{v}</span>
                    </div>
                ))}
                <div className="detail-row">
                    <span className="detail-key">Rating</span>
                    <div className="stars">
                        <span className="star-on">★</span>
                        <span className="star-on">★</span>
                        <span className="star-on">★</span>
                        <span className="star-on">★</span>
                        <span className="star-off">★</span>
                    </div>
                </div>
            </Modal>

            {/* ── Instructor Edit ── */}
            <Modal
                open={is('ins-edit')}
                onClose={close}
                title="Edit Instructor"
                size="sm"
                footer={
                    <>
                        <Btn variant="secondary" onClick={close}>
                            Cancel
                        </Btn>
                        <Btn variant="primary">
                            <span className="material-symbols-outlined ms">save</span>Save Changes
                        </Btn>
                    </>
                }
            >
                <div className="form-grid form-grid-2">
                    <div>
                        <label className="form-label">Full Name</label>
                        <input className="form-input" defaultValue="Marcus Richardson" />
                    </div>
                    <div>
                        <label className="form-label">Status</label>
                        <select className="form-select">
                            <option>Active</option>
                            <option>Break</option>
                            <option>In Session</option>
                            <option>Off-duty</option>
                        </select>
                    </div>
                    <div>
                        <label className="form-label">Assigned Vehicle</label>
                        <select className="form-select">
                            <option>Scania K410</option>
                            <option>Volvo XC90</option>
                        </select>
                    </div>
                    <div>
                        <label className="form-label">Cert. Expiry</label>
                        <input className="form-input" type="date" defaultValue="2028-01-15" />
                    </div>
                </div>
            </Modal>

            {/* ── Trainee Create ── */}
            <Modal
                open={is('trainee-create')}
                onClose={close}
                title="Add New Trainee"
                footer={
                    <>
                        <Btn variant="secondary" onClick={close}>
                            Discard
                        </Btn>
                        <Btn variant="primary">
                            <span className="material-symbols-outlined ms">save</span>Save Trainee
                        </Btn>
                    </>
                }
            >
                <div className="form-grid form-grid-2">
                    <div>
                        <label className="form-label">First Name</label>
                        <input className="form-input" placeholder="e.g. Rahul" />
                    </div>
                    <div>
                        <label className="form-label">Last Name</label>
                        <input className="form-input" placeholder="e.g. Sharma" />
                    </div>
                    <div>
                        <label className="form-label">Date of Birth</label>
                        <input className="form-input" type="date" />
                    </div>
                    <div>
                        <label className="form-label">Gender</label>
                        <select className="form-select">
                            <option>Male</option>
                            <option>Female</option>
                            <option>Other</option>
                        </select>
                    </div>
                    <div>
                        <label className="form-label">Aadhaar Number</label>
                        <input className="form-input" placeholder="XXXX XXXX XXXX" />
                    </div>
                    <div>
                        <label className="form-label">Blood Group</label>
                        <select className="form-select">
                            <option>Select Blood Group</option>
                            <option>A+</option>
                            <option>B+</option>
                            <option>O+</option>
                            <option>AB+</option>
                        </select>
                    </div>
                    <div>
                        <label className="form-label">Assigned Beacon ID</label>
                        <input className="form-input" placeholder="BCN-XXXX-XXXX" />
                    </div>
                    <div>
                        <label className="form-label">Relationship to User</label>
                        <select className="form-select">
                            <option>Select Relationship</option>
                            <option>Self</option>
                            <option>Parent</option>
                            <option>Spouse</option>
                        </select>
                    </div>
                </div>
                <div style={{ marginTop: 12 }}>
                    <label className="form-label">Remarks / Special Notes</label>
                    <textarea
                        className="form-input"
                        rows={2}
                        placeholder="Any medical conditions, emergency contact info or general notes…"
                    />
                </div>
            </Modal>

            {/* ── Trainee View ── */}
            <Modal
                open={is('trainee-view')}
                onClose={close}
                title="Trainee Details"
                size="sm"
                footer={
                    <>
                        <Btn variant="secondary" onClick={close}>
                            Close
                        </Btn>
                        <Btn
                            variant="primary"
                            onClick={() => {
                                close();
                                goto('trainee-edit');
                            }}
                        >
                            <span className="material-symbols-outlined ms">edit</span>Edit
                        </Btn>
                    </>
                }
            >
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 14,
                        padding: 14,
                        background: 'var(--surface)',
                        borderRadius: 12,
                        marginBottom: 16,
                    }}
                >
                    <div
                        className="avatar"
                        style={{
                            width: 48,
                            height: 48,
                            fontSize: 16,
                            background: '#EDE9FE',
                            color: 'var(--primary)',
                        }}
                    >
                        AK
                    </div>
                    <div>
                        <div style={{ fontSize: 15, fontWeight: 900 }}>Ankit Kumar</div>
                        <div style={{ fontSize: 12, color: 'var(--muted)' }}>#TRN-8901</div>
                    </div>
                    <span className="badge badge-green" style={{ marginLeft: 'auto' }}>
                        Active
                    </span>
                </div>
                {[
                    ['Email', 'ankit.k@example.com'],
                    ['Phone', '+91 98765 43210'],
                    ['Last Trip', 'Oct 24, 2023'],
                    ['Total Bookings', '12'],
                    ['Special Request', 'Wheelchair Access'],
                ].map(([k, v]) => (
                    <div key={k} className="detail-row">
                        <span className="detail-key">{k}</span>
                        <span className="detail-val">{v}</span>
                    </div>
                ))}
            </Modal>

            {/* ── Trainee Edit ── */}
            <Modal
                open={is('trainee-edit')}
                onClose={close}
                title="Edit Trainee"
                size="sm"
                footer={
                    <>
                        <Btn variant="secondary" onClick={close}>
                            Cancel
                        </Btn>
                        <Btn variant="primary">
                            <span className="material-symbols-outlined ms">save</span>Save Changes
                        </Btn>
                    </>
                }
            >
                <div className="form-grid form-grid-2">
                    <div>
                        <label className="form-label">Full Name</label>
                        <input className="form-input" defaultValue="Ankit Kumar" />
                    </div>
                    <div>
                        <label className="form-label">Status</label>
                        <select className="form-select">
                            <option>Active</option>
                            <option>Inactive</option>
                        </select>
                    </div>
                    <div>
                        <label className="form-label">Phone</label>
                        <input className="form-input" defaultValue="+91 98765 43210" />
                    </div>
                    <div>
                        <label className="form-label">Email</label>
                        <input className="form-input" defaultValue="ankit.k@example.com" />
                    </div>
                </div>
                <div style={{ marginTop: 12 }}>
                    <label className="form-label">Special Requests / Notes</label>
                    <textarea
                        className="form-input"
                        rows={2}
                        defaultValue="Wheelchair Access — Needs vehicle with ramp"
                    />
                </div>
            </Modal>

            {/* ── Session Create ── */}
            <Modal
                open={is('session-create')}
                onClose={close}
                title="Create General Session"
                footer={
                    <>
                        <Btn variant="secondary" onClick={close}>
                            Cancel
                        </Btn>
                        <Btn variant="primary">
                            <span className="material-symbols-outlined ms">add</span>Create Session
                        </Btn>
                    </>
                }
            >
                <div className="form-grid form-grid-2">
                    <div style={{ gridColumn: '1/-1' }}>
                        <label className="form-label">Session Title</label>
                        <input
                            className="form-input"
                            placeholder="e.g. Annual Safety Compliance Protocol"
                        />
                    </div>
                    <div>
                        <label className="form-label">Guideline Reference ID</label>
                        <input className="form-input" placeholder="RTO-2024-GS-001" />
                    </div>
                    <div>
                        <label className="form-label">Category</label>
                        <select className="form-select">
                            <option>Compliance Training</option>
                            <option>Skill Development</option>
                            <option>Safety</option>
                        </select>
                    </div>
                    <div>
                        <label className="form-label">Date &amp; Time</label>
                        <input className="form-input" type="datetime-local" />
                    </div>
                    <div>
                        <label className="form-label">Duration (Minutes)</label>
                        <input className="form-input" type="number" placeholder="60" />
                    </div>
                </div>
                <div style={{ marginTop: 12 }}>
                    <label className="form-label">Description / Notes</label>
                    <textarea
                        className="form-input"
                        rows={3}
                        placeholder="Enter session details and key objectives…"
                    />
                </div>
            </Modal>

            {/* ── Assign Instructor ── */}
            <Modal
                open={is('ins-assign')}
                onClose={close}
                title="Assign Instructor"
                size="sm"
                footer={
                    <>
                        <Btn variant="secondary" onClick={close}>
                            Cancel
                        </Btn>
                        <Btn variant="primary">
                            <span className="material-symbols-outlined ms">person_add</span>
                            Assign &amp; Notify
                        </Btn>
                    </>
                }
            >
                <div
                    style={{
                        background: '#DCFCE7',
                        borderRadius: 10,
                        padding: 12,
                        marginBottom: 14,
                        fontSize: 12,
                        fontWeight: 700,
                        color: '#15803D',
                    }}
                >
                    Assigning for: <b>Aditya Sharma · Oct 24, 2024 10:00 AM</b>
                </div>
                <div className="form-group">
                    <label className="form-label">Select Instructor</label>
                    <select className="form-select">
                        <option>Marcus Richardson (Active)</option>
                        <option>Elena Rodriguez (Active)</option>
                        <option>James Wilson (Available)</option>
                    </select>
                </div>
                <div className="form-group">
                    <label className="form-label">Notes</label>
                    <textarea
                        className="form-input"
                        rows={2}
                        placeholder="Any special instructions…"
                    />
                </div>
            </Modal>

            {/* ── Session View ── */}
            <Modal
                open={is('ses-view')}
                onClose={close}
                title="Session Details — SES-1042"
                size="sm"
                footer={
                    <Btn variant="secondary" onClick={close}>
                        Close
                    </Btn>
                }
            >
                {[
                    ['Trainee', 'Rahul Kumar'],
                    ['Instructor', 'Suresh Menon'],
                    ['Vehicle', 'KA-01-EF-4567'],
                    ['Date & Time', '6 Mar 2026, 10:00 AM'],
                ].map(([k, v]) => (
                    <div key={k} className="detail-row">
                        <span className="detail-key">{k}</span>
                        <span className="detail-val">{v}</span>
                    </div>
                ))}
                <div className="detail-row">
                    <span className="detail-key">Type</span>
                    <span className="badge badge-purple">Theory</span>
                </div>
                <div className="detail-row">
                    <span className="detail-key">Status</span>
                    <span className="badge badge-green">Completed</span>
                </div>
            </Modal>

            {/* ── Vendor Create ── */}
            <Modal
                open={is('vendor-create')}
                onClose={close}
                title="Add New Vendor"
                footer={
                    <>
                        <Btn variant="secondary" onClick={close}>
                            Cancel
                        </Btn>
                        <Btn variant="primary">
                            <span className="material-symbols-outlined ms">save</span>Save Vendor
                        </Btn>
                    </>
                }
            >
                <div className="form-grid form-grid-2">
                    <div>
                        <label className="form-label">Vendor Name *</label>
                        <input className="form-input" placeholder="Legal Entity Name" />
                    </div>
                    <div>
                        <label className="form-label">Vendor Type *</label>
                        <select className="form-select">
                            <option>Select Type</option>
                            <option>Fuel Supply</option>
                            <option>Maintenance</option>
                            <option>Insurance</option>
                            <option>Cleaning</option>
                        </select>
                    </div>
                    <div>
                        <label className="form-label">Contact Person *</label>
                        <input className="form-input" placeholder="Full Name" />
                    </div>
                    <div>
                        <label className="form-label">Mobile Number *</label>
                        <input className="form-input" placeholder="+91 XXXXX XXXXX" />
                    </div>
                    <div>
                        <label className="form-label">Email ID</label>
                        <input className="form-input" type="email" placeholder="vendor@email.com" />
                    </div>
                    <div>
                        <label className="form-label">Emergency Contact</label>
                        <input className="form-input" placeholder="Name, +91…" />
                    </div>
                    <div>
                        <label className="form-label">Contract Start Date *</label>
                        <input className="form-input" type="date" />
                    </div>
                    <div>
                        <label className="form-label">Contract End Date *</label>
                        <input className="form-input" type="date" />
                    </div>
                    <div>
                        <label className="form-label">GST Number *</label>
                        <input className="form-input" placeholder="GSTIN" />
                    </div>
                    <div>
                        <label className="form-label">PAN Number *</label>
                        <input className="form-input" placeholder="Permanent Account Number" />
                    </div>
                </div>
                <div style={{ marginTop: 12 }}>
                    <label className="form-label">Remarks / Notes</label>
                    <textarea className="form-input" rows={2} placeholder="Additional details…" />
                </div>
            </Modal>

            {/* ── Vendor View ── */}
            <Modal
                open={is('vendor-view')}
                onClose={close}
                title="Vendor Details"
                size="sm"
                footer={
                    <Btn variant="secondary" onClick={close}>
                        Close
                    </Btn>
                }
            >
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 14,
                        padding: 14,
                        background: 'var(--surface)',
                        borderRadius: 12,
                        marginBottom: 16,
                    }}
                >
                    <div
                        className="avatar"
                        style={{
                            width: 48,
                            height: 48,
                            fontSize: 16,
                            background: '#DBEAFE',
                            color: '#2563EB',
                        }}
                    >
                        AF
                    </div>
                    <div>
                        <div style={{ fontSize: 15, fontWeight: 900 }}>Apex Fuel Solutions</div>
                        <div style={{ fontSize: 12, color: 'var(--muted)' }}>
                            VND-4492 · Fuel Supply
                        </div>
                    </div>
                    <span className="badge badge-green" style={{ marginLeft: 'auto' }}>
                        Active
                    </span>
                </div>
                {[
                    ['Contact Person', 'Robert Johnson'],
                    ['Email', 'robert.j@apexfuel.com'],
                    ['Contract End', 'Dec 15, 2024'],
                    ['GST Number', '27AABCU9603R1ZM'],
                ].map(([k, v]) => (
                    <div key={k} className="detail-row">
                        <span className="detail-key">{k}</span>
                        <span className="detail-val">{v}</span>
                    </div>
                ))}
            </Modal>

            {/* ── Feedback Resolve ── */}
            <Modal
                open={is('feedback-resolve')}
                onClose={close}
                title="Resolve Complaint — CMP-2023-8842"
                footer={
                    <>
                        <Btn variant="secondary" onClick={close}>
                            Cancel
                        </Btn>
                        <Btn variant="primary" onClick={close}>
                            <span className="material-symbols-outlined ms">check_circle</span>
                            Resolve &amp; Close
                        </Btn>
                    </>
                }
            >
                <div
                    style={{
                        background: '#FEF2F2',
                        border: '1px solid #FECACA',
                        borderRadius: 10,
                        padding: 14,
                        marginBottom: 16,
                    }}
                >
                    <div
                        style={{
                            fontSize: 11,
                            fontWeight: 800,
                            color: '#DC2626',
                            textTransform: 'uppercase',
                            letterSpacing: '.05em',
                            marginBottom: 6,
                        }}
                    >
                        Original Complaint
                    </div>
                    <div
                        style={{
                            fontSize: 13,
                            fontWeight: 700,
                            color: 'var(--text)',
                            marginBottom: 4,
                        }}
                    >
                        John Doe (Staff) · KA-01-2345 · Oct 23, 2023
                    </div>
                    <div style={{ fontSize: 12, color: '#64748B', lineHeight: 1.6 }}>
                        "AC was not working properly in the rear seats. Extremely uncomfortable
                        during the long haul trip on Oct 23rd."
                    </div>
                </div>
                <div className="form-group">
                    <label className="form-label">Category</label>
                    <select className="form-select">
                        <option>Select Category</option>
                        <option>Vehicle Issue</option>
                        <option>Driver Issue</option>
                        <option>System Issue</option>
                    </select>
                </div>
                <div className="form-group">
                    <label className="form-label">Resolution Summary</label>
                    <textarea
                        className="form-input"
                        rows={3}
                        placeholder="Describe the steps taken to resolve the complaint…"
                    />
                </div>
                <div className="form-group">
                    <label className="form-label">Closing Remarks</label>
                    <textarea
                        className="form-input"
                        rows={2}
                        placeholder="Additional notes for internal records…"
                    />
                </div>
            </Modal>

            {/* ── Compliance Create ── */}
            <Modal
                open={is('compliance-create')}
                onClose={close}
                title="Add Compliance Record"
                size="sm"
                footer={
                    <>
                        <Btn variant="secondary" onClick={close}>
                            Cancel
                        </Btn>
                        <Btn variant="primary">
                            <span className="material-symbols-outlined ms">save</span>Add Record
                        </Btn>
                    </>
                }
            >
                <div className="form-grid form-grid-2">
                    <div>
                        <label className="form-label">Registration No.</label>
                        <input className="form-input" placeholder="e.g. RTO-2024-001" />
                    </div>
                    <div>
                        <label className="form-label">Category</label>
                        <select className="form-select">
                            <option>License</option>
                            <option>Insurance</option>
                            <option>Safety</option>
                            <option>Tax</option>
                        </select>
                    </div>
                    <div style={{ gridColumn: '1/-1' }}>
                        <label className="form-label">Document / Rule Name</label>
                        <input className="form-input" placeholder="e.g. Driving School License" />
                    </div>
                    <div>
                        <label className="form-label">Authority</label>
                        <input className="form-input" placeholder="e.g. RTO Karnataka" />
                    </div>
                    <div>
                        <label className="form-label">Expiry Date</label>
                        <input className="form-input" type="date" />
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default AllModals;
