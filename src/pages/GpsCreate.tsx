import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Map, CheckCircle2, ArrowLeft, Info, Cpu, CarFront, Save, RefreshCw } from 'lucide-react';

const DUMMY_GPS = [
    { id: 'GPS-201', imei: '864230040510231', simNumber: '+919876543210', provider: 'Airtel', model: 'Teltonika FMB120', firmware: 'v1.2', assignedTo: 'Student Bus A', status: 'Active', remarks: '' },
    { id: 'GPS-202', imei: '864230040510232', simNumber: '+919876543211', provider: 'Vi', model: 'TK103', firmware: 'v2.0', assignedTo: '', status: 'Inactive', remarks: '' },
    { id: 'GPS-203', imei: '864230040510233', simNumber: '+919876543212', provider: 'Jio', model: 'Coban 403', firmware: 'v3.1', assignedTo: 'Staff Van C', status: 'Active', remarks: '' },
];

/* ── Tiny Helpers (matching StaffCreate & BeaconCreate) ── */
const SectionHeader = ({ icon: Icon, title }: { icon: any; title: string }) => (
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

const Grid = ({ children, className = "grid-cols-responsive-2" }: { children: React.ReactNode; className?: string }) => (
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
const UpdateConfirmOverlay = ({ onConfirm, onCancel, title }: { onConfirm: () => void; onCancel: () => void; title: string }) => (
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
                Are you sure you want to update the details for <strong>{title}</strong>? This will modify the existing record in the system.
            </div>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
                <button type="button" className="btn btn-secondary" onClick={onCancel} style={{ minWidth: 120 }}>
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

export const GpsCreatePage = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const isEdit = !!id;

    const [form, setForm] = useState({
        deviceId: '',
        imei: '',
        simNumber: '',
        provider: '',
        model: '',
        firmware: '',
        assignedTo: '',
        status: 'Active',
        remarks: ''
    });

    useEffect(() => {
        if (isEdit) {
            const device = DUMMY_GPS.find(d => d.id === id);
            if (device) {
                setForm({
                    deviceId: device.id,
                    imei: device.imei,
                    simNumber: device.simNumber,
                    provider: device.provider,
                    model: device.model,
                    firmware: device.firmware,
                    assignedTo: device.assignedTo,
                    status: device.status,
                    remarks: device.remarks
                });
            }
        }
    }, [id, isEdit]);

    const [errs, setErrs] = useState<Partial<typeof form>>({});
    const [saved, setSaved] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const handleSave = () => {
        const e: Partial<typeof form> = {};
        if (!form.deviceId.trim()) e.deviceId = 'Device ID / Name is required';
        if (!form.imei.trim()) {
             e.imei = 'IMEI Number is required';
        } else if (!/^\d{15}$/.test(form.imei.replace(/[^0-9]/g, ''))) {
             e.imei = 'IMEI must contain exactly 15 digits';
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
                            <Map size={18} className="ms mr-2" />
                            GPS Devices
                        </div>
                        <div className="breadcrumb">
                            Admin <span>/</span> Masters <span>/</span> GPS Devices
                        </div>
                    </div>
                </div>
                <div className="page-body" style={{ alignItems: 'center', justifyContent: 'center' }}>
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
                        <div style={{ fontSize: 22, fontWeight: 900, color: '#065F46', marginBottom: 8 }}>
                            GPS Tracker {isEdit ? 'Updated' : 'Created'} Successfully
                        </div>
                        <div style={{ fontSize: 13, color: '#059669', marginBottom: 32 }}>
                            <strong>{form.deviceId.toUpperCase()}</strong> (IMEI: {form.imei}) has been {isEdit ? 'updated' : 'registered'} in the system.
                        </div>
                        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
                            <button
                                className="btn btn-secondary"
                                onClick={() => {
                                    setForm({ deviceId: '', imei: '', simNumber: '', provider: '', model: '', firmware: '', assignedTo: '', status: 'Active', remarks: '' });
                                    setSaved(false);
                                }}
                            >
                                Add Another
                            </button>
                            <button className="btn btn-primary" onClick={() => navigate('/masters/gps-devices')}>
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
                        <Map size={18} className="ms mr-2" />
                        {isEdit ? 'Update GPS Device' : 'Add New GPS Device'}
                    </div>
                    <div className="breadcrumb">
                        Admin <span>/</span> Masters <span>/</span> GPS Devices <span>/</span> {isEdit ? 'Update' : 'Add'}
                    </div>
                </div>
                <div className="header-actions">
                    <button className="btn btn-secondary" onClick={() => navigate('/masters/gps-devices')}>
                        <ArrowLeft size={18} className="ms" />
                        Back
                    </button>
                </div>
            </div>

            <div className="page-body">
                <div style={{ maxWidth: 860, width: '100%', margin: '0 auto', display: 'flex', flexDirection: 'column' }}>
                    
                    {/* Basic Info */}
                    <Card>
                        <SectionHeader icon={Info} title="Basic Information" />
                        <Body>
                            <Grid className="grid-cols-responsive-3">
                                <div>
                                    <Label>Device ID / Name *</Label>
                                    <input
                                        className="form-input"
                                        placeholder="e.g. GPS-001"
                                        value={form.deviceId}
                                        onChange={(e) => {
                                            setForm((v) => ({ ...v, deviceId: e.target.value }));
                                            setErrs((e) => ({ ...e, deviceId: undefined }));
                                        }}
                                        style={{ width: '100%', boxSizing: 'border-box', borderColor: errs.deviceId ? '#DC2626' : undefined }}
                                    />
                                    <Err msg={errs.deviceId} />
                                </div>
                                <div className="grid-span-2-desktop">
                                    <Label>IMEI Number *</Label>
                                    <input
                                        className="form-input"
                                        placeholder="e.g. 864230040510231 (15 digits)"
                                        value={form.imei}
                                        onChange={(e) => {
                                            setForm((v) => ({ ...v, imei: e.target.value.replace(/\D/g, '').slice(0, 15) }));
                                            setErrs((e) => ({ ...e, imei: undefined }));
                                        }}
                                        style={{ width: '100%', boxSizing: 'border-box', fontFamily: 'monospace', borderColor: errs.imei ? '#DC2626' : undefined }}
                                    />
                                    <Err msg={errs.imei} />
                                </div>

                                <div>
                                    <Label>SIM Number / Phone</Label>
                                    <input
                                        className="form-input"
                                        placeholder="e.g. +91 9876543210"
                                        value={form.simNumber}
                                        onChange={(e) => setForm((v) => ({ ...v, simNumber: e.target.value }))}
                                        style={{ width: '100%', boxSizing: 'border-box', fontFamily: 'monospace' }}
                                    />
                                </div>
                                <div>
                                    <Label>Network Provider</Label>
                                    <input
                                        className="form-input"
                                        placeholder="e.g. Airtel M2M"
                                        value={form.provider}
                                        onChange={(e) => setForm((v) => ({ ...v, provider: e.target.value }))}
                                        style={{ width: '100%', boxSizing: 'border-box' }}
                                    />
                                </div>
                            </Grid>
                        </Body>
                    </Card>

                    {/* Hardware Info */}
                    <Card>
                        <SectionHeader icon={Cpu} title="Hardware Details" />
                        <Body>
                            <Grid className="grid-cols-responsive-2">
                                <div>
                                    <Label>Device Model</Label>
                                    <input
                                        className="form-input"
                                        placeholder="e.g. Teltonika FMB120"
                                        value={form.model}
                                        onChange={(e) => setForm((v) => ({ ...v, model: e.target.value }))}
                                        style={{ width: '100%', boxSizing: 'border-box' }}
                                    />
                                </div>
                                <div>
                                    <Label>Firmware Version</Label>
                                    <input
                                        className="form-input"
                                        placeholder="e.g. v03.28"
                                        value={form.firmware}
                                        onChange={(e) => setForm((v) => ({ ...v, firmware: e.target.value }))}
                                        style={{ width: '100%', boxSizing: 'border-box' }}
                                    />
                                </div>
                            </Grid>
                        </Body>
                    </Card>

                    {/* Assignment & Status */}
                    <Card>
                        <SectionHeader icon={CarFront} title="Vehicle Assignment" />
                        <Body>
                            <Grid className="grid-cols-responsive-2">
                                <div>
                                    <Label>Assigned To</Label>
                                    <select
                                        className="form-select"
                                        value={form.assignedTo}
                                        onChange={(e) => setForm((v) => ({ ...v, assignedTo: e.target.value }))}
                                        style={{ width: '100%', boxSizing: 'border-box' }}
                                    >
                                        <option value="">-- Unassigned --</option>
                                        <option value="Student Bus A">Student Bus A</option>
                                        <option value="Staff Van C">Staff Van C</option>
                                        <option value="Executive Car 1">Executive Car 1</option>
                                    </select>
                                </div>
                                <div>
                                    <Label>Status</Label>
                                    <select
                                        className="form-select"
                                        value={form.status}
                                        onChange={(e) => setForm((v) => ({ ...v, status: e.target.value }))}
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
                                    placeholder="Add installation notes or issues..."
                                    value={form.remarks}
                                    onChange={(e) => setForm((v) => ({ ...v, remarks: e.target.value }))}
                                    style={{ width: '100%', boxSizing: 'border-box', minHeight: 80, resize: 'vertical' }}
                                />
                            </div>
                        </Body>
                    </Card>

                    {/* ── FOOTER ACTIONS ── */}
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 12, paddingBottom: 40 }}>
                        <button className="btn btn-secondary" onClick={() => navigate('/masters/gps-devices')}>
                            Cancel
                        </button>
                        <button className="btn btn-primary" onClick={handleSave}>
                            <Save size={16} className="ms mr-1" /> {isEdit ? 'Update' : 'Save'} GPS
                        </button>
                    </div>

                </div>
            </div>

            {/* Confirmation Modal */}
            {showConfirm && (
                <UpdateConfirmOverlay 
                    title={form.deviceId}
                    onConfirm={confirmUpdate}
                    onCancel={() => setShowConfirm(false)}
                />
            )}
        </>
    );
};
