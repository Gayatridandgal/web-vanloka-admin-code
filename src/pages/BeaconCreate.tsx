import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
    RadioReceiver,
    Info,
    ClipboardList,
    Save,
    ArrowLeft,
    CheckCircle2,
    RefreshCw,
} from 'lucide-react';

const DUMMY_BEACONS = [
    {
        id: 'BCN-001',
        macAddress: '00:1A:2B:3C:4D:5E',
        assignedTo: 'Student Bus A',
        location: 'Gate 1',
        batteryLevel: '98',
        status: 'Active',
        firmware: 'v2.1',
        remarks: '',
    },
    {
        id: 'BCN-002',
        macAddress: '00:1A:2B:3C:4D:5F',
        assignedTo: '',
        location: 'Storage',
        batteryLevel: '100',
        status: 'Inactive',
        firmware: 'v2.0',
        remarks: '',
    },
    {
        id: 'BCN-003',
        macAddress: '00:1A:2B:3C:4D:60',
        assignedTo: 'Staff Van C',
        location: 'Parking B',
        batteryLevel: '15',
        status: 'Active',
        firmware: 'v1.9',
        remarks: '',
    },
    {
        id: 'BCN-004',
        macAddress: '00:1A:2B:3C:4D:61',
        assignedTo: 'Visitor Pass 1',
        location: 'Reception',
        batteryLevel: '45',
        status: 'Maintenance',
        firmware: 'v2.1',
        remarks: '',
    },
    {
        id: 'BCN-005',
        macAddress: '00:1A:2B:3C:4D:62',
        assignedTo: 'Student Bus B',
        location: 'Gate 2',
        batteryLevel: '82',
        status: 'Active',
        firmware: 'v2.2',
        remarks: '',
    },
];

/* ── Tiny Helpers (matching StaffCreate & RolesCreate) ── */
const SectionHeader = ({ icon: Icon, title }: { icon: React.ElementType; title: string }) => (
    <div
        style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            padding: '12px 20px',
            borderBottom: '1.5px solid var(--border)',
            background: 'var(--surface)',
        }}
    >
        <Icon size={18} color="var(--primary)" />
        <span
            style={{
                fontSize: 11,
                fontWeight: 900,
                letterSpacing: '.07em',
                textTransform: 'uppercase',
                color: 'var(--text)',
            }}
        >
            {title}
        </span>
    </div>
);

const Card = ({ children }: { children: React.ReactNode }) => (
    <div
        style={{
            background: 'white',
            border: '1.5px solid var(--border)',
            borderRadius: 12,
            marginBottom: 20,
            overflow: 'hidden',
        }}
    >
        {children}
    </div>
);

const Body = ({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) => (
    <div style={{ padding: '20px 22px', ...style }}>{children}</div>
);

const Grid = ({
    children,
    className = 'grid-cols-responsive-2',
}: {
    children: React.ReactNode;
    className?: string;
}) => (
    <div className={className} style={{ display: 'grid', gap: 16 }}>
        {children}
    </div>
);

const Label = ({ children }: { children: React.ReactNode }) => (
    <label
        style={{
            display: 'block',
            fontSize: 10,
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '.06em',
            color: '#64748B',
            marginBottom: 5,
        }}
    >
        {children}
    </label>
);

const Err = ({ msg }: { msg?: string }) =>
    msg ? (
        <div style={{ fontSize: 10, color: '#DC2626', fontWeight: 700, marginTop: 3 }}>⚠ {msg}</div>
    ) : null;

/* ── Confirmation Overlay ── */
const UpdateConfirmOverlay = ({
    onConfirm,
    onCancel,
    title,
}: {
    onConfirm: () => void;
    onCancel: () => void;
    title: string;
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
                    background: '#EFF6FF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 20px',
                }}
            >
                <RefreshCw size={36} color="#2563EB" />
            </div>
            <div
                style={{
                    fontSize: 18,
                    fontWeight: 900,
                    color: '#1E40AF',
                    marginBottom: 8,
                }}
            >
                Confirm Update?
            </div>
            <div
                style={{
                    fontSize: 13,
                    color: '#64748B',
                    marginBottom: 24,
                    lineHeight: 1.6,
                }}
            >
                Are you sure you want to update the details for <strong>{title}</strong>? This will
                modify the existing record in the system.
            </div>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
                <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={onCancel}
                    style={{ minWidth: 120 }}
                >
                    Cancel
                </button>
                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={onConfirm}
                    style={{ minWidth: 120 }}
                >
                    Confirm Update
                </button>
            </div>
        </div>
    </div>
);

export const BeaconCreatePage = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const isEdit = !!id;

    const [form, setForm] = useState({
        beaconId: '',
        macAddress: '',
        batteryLevel: '',
        firmware: '',
        assignedTo: '',
        location: '',
        status: 'Active' as 'Active' | 'Inactive' | 'Maintenance',
        remarks: '',
    });

    useEffect(() => {
        if (isEdit) {
            const beacon = DUMMY_BEACONS.find((b) => b.id === id);
            if (beacon) {
                setForm({
                    beaconId: beacon.id,
                    macAddress: beacon.macAddress,
                    batteryLevel: beacon.batteryLevel,
                    firmware: beacon.firmware,
                    assignedTo: beacon.assignedTo,
                    location: beacon.location,
                    status: beacon.status as typeof form.status,
                    remarks: beacon.remarks || '',
                });
            }
        }
    }, [id, isEdit]);

    const [errs, setErrs] = useState<Partial<typeof form>>({});
    const [saved, setSaved] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const handleSave = () => {
        const e: Partial<typeof form> = {};
        if (!form.beaconId.trim()) e.beaconId = 'Beacon ID / Name is required';
        if (!form.macAddress.trim()) e.macAddress = 'MAC Address is required';
        else if (!/^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/.test(form.macAddress)) {
            e.macAddress = 'Invalid MAC Address format. E.g. 00:1A:2B:3C:4D:5E';
        }

        if (Object.keys(e).length > 0) {
            setErrs(e);
            return;
        }

        setErrs({});
        if (isEdit) {
            setShowConfirm(true);
        } else {
            setSaved(true);
        }
    };

    const confirmUpdate = () => {
        setShowConfirm(false);
        setSaved(true);
    };

    /* ── Success Screen ── */
    if (saved) {
        return (
            <>
                <div className="page-header">
                    <div>
                        <div className="page-title">
                            <RadioReceiver size={18} className="ms mr-2" />
                            Beacon Devices
                        </div>
                        <div className="breadcrumb">
                            Admin <span>/</span> Masters <span>/</span> Beacon Devices
                        </div>
                    </div>
                </div>
                <div
                    className="page-body"
                    style={{ alignItems: 'center', justifyContent: 'center' }}
                >
                    <div
                        style={{
                            background: 'white',
                            borderRadius: 20,
                            border: '1.5px solid var(--border)',
                            padding: '40px 24px',
                            textAlign: 'center',
                            maxWidth: 480,
                            width: '100%',
                            margin: '0 auto',
                            boxShadow: '0 8px 40px rgba(5,150,105,.08)',
                        }}
                        className="md:p-[52px_60px]"
                    >
                        <div
                            style={{
                                width: 80,
                                height: 80,
                                borderRadius: '50%',
                                background: '#DCFCE7',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                margin: '0 auto 24px',
                            }}
                        >
                            <CheckCircle2 size={44} color="#059669" />
                        </div>
                        <div
                            style={{
                                fontSize: 22,
                                fontWeight: 900,
                                color: '#065F46',
                                marginBottom: 8,
                            }}
                        >
                            Beacon {isEdit ? 'Updated' : 'Created'} Successfully
                        </div>
                        <div style={{ fontSize: 13, color: '#059669', marginBottom: 32 }}>
                            <strong>{form.beaconId.toUpperCase()}</strong> (
                            {form.macAddress.toUpperCase()}) has been{' '}
                            {isEdit ? 'updated' : 'registered'} in the system.
                        </div>
                        <div
                            style={{
                                display: 'flex',
                                gap: 12,
                                justifyContent: 'center',
                                flexWrap: 'wrap',
                            }}
                        >
                            <button
                                className="btn btn-secondary"
                                onClick={() => {
                                    setForm({
                                        beaconId: '',
                                        macAddress: '',
                                        batteryLevel: '',
                                        firmware: '',
                                        assignedTo: '',
                                        location: '',
                                        status: 'Active',
                                        remarks: '',
                                    });
                                    setSaved(false);
                                }}
                            >
                                Add Another
                            </button>
                            <button
                                className="btn btn-primary"
                                onClick={() => navigate('/masters/beacon-devices')}
                            >
                                <ArrowLeft size={18} className="ms mr-1" /> Back to List
                            </button>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    /* ── Form ── */
    return (
        <>
            <div className="page-header">
                <div>
                    <div className="page-title">
                        <RadioReceiver size={18} className="ms mr-2" />
                        {isEdit ? 'Update Beacon' : 'Add New Beacon'}
                    </div>
                    <div className="breadcrumb">
                        Admin <span>/</span> Masters <span>/</span> Beacon Devices <span>/</span>{' '}
                        {isEdit ? 'Update' : 'Add'}
                    </div>
                </div>
                <div className="header-actions">
                    <button
                        className="btn btn-secondary"
                        onClick={() => navigate('/masters/beacon-devices')}
                    >
                        <ArrowLeft size={18} className="ms" />
                        Back
                    </button>
                </div>
            </div>

            <div className="page-body">
                <div
                    style={{
                        maxWidth: 860,
                        width: '100%',
                        margin: '0 auto',
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    {/* Basic Info */}
                    <Card>
                        <SectionHeader icon={Info} title="Basic Information" />
                        <Body>
                            <Grid className="grid-cols-responsive-3">
                                <div>
                                    <Label>Beacon ID / Name *</Label>
                                    <input
                                        className="form-input"
                                        placeholder="e.g. BCN-001"
                                        value={form.beaconId}
                                        onChange={(e) => {
                                            setForm((v) => ({ ...v, beaconId: e.target.value }));
                                            setErrs((e) => ({ ...e, beaconId: undefined }));
                                        }}
                                        style={{
                                            width: '100%',
                                            boxSizing: 'border-box',
                                            borderColor: errs.beaconId ? '#DC2626' : undefined,
                                        }}
                                    />
                                    <Err msg={errs.beaconId} />
                                </div>
                                <div className="grid-span-2-desktop">
                                    <Label>MAC Address *</Label>
                                    <input
                                        className="form-input"
                                        placeholder="e.g. 00:1A:2B:3C:4D:5E"
                                        value={form.macAddress}
                                        onChange={(e) => {
                                            setForm((v) => ({ ...v, macAddress: e.target.value }));
                                            setErrs((e) => ({ ...e, macAddress: undefined }));
                                        }}
                                        style={{
                                            width: '100%',
                                            boxSizing: 'border-box',
                                            fontFamily: 'monospace',
                                            borderColor: errs.macAddress ? '#DC2626' : undefined,
                                        }}
                                    />
                                    <Err msg={errs.macAddress} />
                                </div>
                                <div>
                                    <Label>Battery Level (%)</Label>
                                    <input
                                        type="number"
                                        min="0"
                                        max="100"
                                        className="form-input"
                                        placeholder="e.g. 100"
                                        value={form.batteryLevel}
                                        onChange={(e) =>
                                            setForm((v) => ({ ...v, batteryLevel: e.target.value }))
                                        }
                                        style={{ width: '100%', boxSizing: 'border-box' }}
                                    />
                                </div>
                                <div>
                                    <Label>Firmware Version</Label>
                                    <input
                                        className="form-input"
                                        placeholder="e.g. v2.1.0"
                                        value={form.firmware}
                                        onChange={(e) =>
                                            setForm((v) => ({ ...v, firmware: e.target.value }))
                                        }
                                        style={{ width: '100%', boxSizing: 'border-box' }}
                                    />
                                </div>
                            </Grid>
                        </Body>
                    </Card>

                    {/* Assignment & Status */}
                    <Card>
                        <SectionHeader icon={ClipboardList} title="Assignment & Status" />
                        <Body>
                            <Grid className="grid-cols-responsive-3">
                                <div>
                                    <Label>Assigned To</Label>
                                    <select
                                        className="form-select"
                                        value={form.assignedTo}
                                        onChange={(e) =>
                                            setForm((v) => ({ ...v, assignedTo: e.target.value }))
                                        }
                                        style={{ width: '100%', boxSizing: 'border-box' }}
                                    >
                                        <option value="">-- Unassigned --</option>
                                        <option value="Student Bus A">Student Bus A</option>
                                        <option value="Staff Van C">Staff Van C</option>
                                        <option value="Visitor Pass 1">Visitor Pass 1</option>
                                    </select>
                                </div>
                                <div>
                                    <Label>Current Location</Label>
                                    <input
                                        className="form-input"
                                        placeholder="e.g. Storage"
                                        value={form.location}
                                        onChange={(e) =>
                                            setForm((v) => ({ ...v, location: e.target.value }))
                                        }
                                        style={{ width: '100%', boxSizing: 'border-box' }}
                                    />
                                </div>
                                <div>
                                    <Label>Status</Label>
                                    <select
                                        className="form-select"
                                        value={form.status}
                                        onChange={(e) =>
                                            setForm((v) => ({
                                                ...v,
                                                status: e.target.value as typeof form.status,
                                            }))
                                        }
                                        style={{ width: '100%', boxSizing: 'border-box' }}
                                    >
                                        <option value="Active">Active</option>
                                        <option value="Inactive">Inactive</option>
                                        <option value="Maintenance">Maintenance</option>
                                    </select>
                                </div>
                            </Grid>
                            <div style={{ marginTop: 20 }}>
                                <Label>Remarks</Label>
                                <textarea
                                    className="form-input"
                                    placeholder="Add any additional notes about this beacon..."
                                    value={form.remarks}
                                    onChange={(e) =>
                                        setForm((v) => ({ ...v, remarks: e.target.value }))
                                    }
                                    style={{
                                        width: '100%',
                                        boxSizing: 'border-box',
                                        minHeight: 80,
                                        resize: 'vertical',
                                    }}
                                />
                            </div>
                        </Body>
                    </Card>

                    {/* ── FOOTER ACTIONS ── */}
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            gap: 12,
                            marginTop: 12,
                            paddingBottom: 40,
                        }}
                    >
                        <button
                            className="btn btn-secondary"
                            onClick={() => navigate('/masters/beacon-devices')}
                        >
                            Cancel
                        </button>
                        <button className="btn btn-primary" onClick={handleSave}>
                            <Save size={16} className="ms mr-1" /> {isEdit ? 'Update' : 'Save'}{' '}
                            Beacon
                        </button>
                    </div>
                </div>
            </div>

            {/* Confirmation Modal */}
            {showConfirm && (
                <UpdateConfirmOverlay
                    title={form.beaconId}
                    onConfirm={confirmUpdate}
                    onCancel={() => setShowConfirm(false)}
                />
            )}
        </>
    );
};
