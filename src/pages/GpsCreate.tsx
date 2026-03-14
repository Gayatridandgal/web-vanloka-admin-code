import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Map, CheckCircle2, ArrowLeft, Info, Cpu, CarFront, Save } from 'lucide-react';

/* ── Tiny Helpers (matching StaffCreate & BeaconCreate) ── */
const SectionHeader = ({ icon: Icon, title, highlight }: { icon: any; title: string, highlight?: boolean }) => (
    <div
        style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            padding: '12px 20px',
            borderBottom: '1.5px solid var(--border)',
            background: highlight ? 'var(--highlight-blue)' : 'var(--surface)',
        }}
    >
        <Icon size={18} color={highlight ? '#2563EB' : 'var(--primary)'} />
        <span
            style={{
                fontSize: 11,
                fontWeight: 900,
                letterSpacing: '.07em',
                textTransform: 'uppercase',
                color: highlight ? '#1E40AF' : 'var(--text)',
            }}
        >
            {title}
        </span>
    </div>
);

const Card = ({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) => (
    <div
        style={{
            background: 'white',
            border: '1.5px solid var(--border)',
            borderRadius: 12,
            marginBottom: 20,
            overflow: 'hidden',
            boxShadow: '0 4px 20px rgba(0,0,0,0.02)',
            ...style,
        }}
    >
        {children}
    </div>
);

const Body = ({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) => (
    <div style={{ padding: '24px 26px', ...style }}>{children}</div>
);

const Grid = ({ children, cols = 2 }: { children: React.ReactNode; cols?: number }) => (
    <div className={cols === 2 ? "grid-cols-responsive-2" : "grid-cols-responsive-3"} style={{ gap: 20 }}>
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
            marginBottom: 6,
        }}
    >
        {children}
    </label>
);

const Err = ({ msg }: { msg?: string }) =>
    msg ? (
        <div style={{ fontSize: 10, color: '#DC2626', fontWeight: 700, marginTop: 4 }}>⚠ {msg}</div>
    ) : null;

export const GpsCreatePage = () => {
    const navigate = useNavigate();

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

    const [errs, setErrs] = useState<Partial<typeof form>>({});
    const [saved, setSaved] = useState(false);

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
                <div className="page-body" style={{ alignItems: 'center', justifyContent: 'center', padding: '24px 12px' }}>
                    <div
                        style={{
                            background: 'white',
                            borderRadius: 20,
                            border: '1.5px solid var(--border)',
                            padding: 'min(52px, 8vw) min(60px, 8vw)',
                            textAlign: 'center',
                            maxWidth: 480,
                            width: '100%',
                            boxShadow: '0 8px 40px rgba(5,150,105,.08)',
                        }}
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
                            GPS Tracker Created Successfully
                        </div>
                        <div style={{ fontSize: 13, color: '#059669', marginBottom: 32 }}>
                            <strong>{form.deviceId.toUpperCase()}</strong> (IMEI: {form.imei}) has been registered in the system.
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
                                <ArrowLeft size={16} className="ms mr-1" /> Back to List
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
                        Add New GPS Device
                    </div>
                    <div className="breadcrumb">
                        Admin <span>/</span> Masters <span>/</span> GPS Devices <span>/</span> Add
                    </div>
                </div>
                <div style={{ display: 'flex', gap: 12 }}>
                    <button className="btn btn-secondary" onClick={() => navigate('/masters/gps-devices')}>
                        <ArrowLeft size={18} className="ms" />
                        Back
                    </button>
                </div>
            </div>

            <div className="page-body">
                <div style={{ maxWidth: 860, width: '100%', margin: '0 auto' }}>
                    
                    {/* Basic Info */}
                    <Card>
                        <SectionHeader icon={Info} title="Basic Information" highlight />
                        <Body>
                            <Grid cols={3}>
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
                                <div style={{ gridColumn: 'span 2' }}>
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
                            <Grid>
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
                            <Grid cols={2}>
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
                            <Save size={16} className="ms mr-1" /> Save GPS
                        </button>
                    </div>

                </div>
            </div>
        </>
    );
};
