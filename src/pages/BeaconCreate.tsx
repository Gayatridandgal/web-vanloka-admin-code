import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Radio, Info, Cpu, ClipboardList, Save, ArrowLeft, CheckCircle2 } from 'lucide-react';

/* ── Tiny Helpers (matching StaffCreate & RolesCreate) ── */
const SectionHeader = ({
    icon: Icon,
    title,
    highlight,
}: {
    icon: React.ElementType;
    title: string;
    highlight?: boolean;
}) => (
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

const Grid = ({
    children,
    className = 'grid-cols-responsive-2',
}: {
    children: React.ReactNode;
    className?: string;
}) => (
    <div className={className} style={{ gap: 20 }}>
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

export const BeaconCreatePage = () => {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        beaconId: '',
        macAddress: '',
        batteryLevel: '',
        firmware: '',
        assignedTo: '',
        location: '',
        status: 'Active',
        remarks: '',
    });

    const [errs, setErrs] = useState<Partial<typeof form>>({});
    const [saved, setSaved] = useState(false);

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
        setSaved(true);
    };

    /* ── Success Screen ── */
    if (saved) {
        return (
            <>
                <div className="page-header">
                    <div>
                        <div className="page-title">
                            <span className="material-symbols-outlined ms" style={{ fontSize: 18 }}>
                                radio
                            </span>
                            Beacon Devices
                        </div>
                        <div className="breadcrumb">
                            Admin <span>/</span> Masters <span>/</span> Beacon Devices
                        </div>
                    </div>
                </div>
                <div
                    className="page-body"
                    style={{ alignItems: 'center', justifyContent: 'center', padding: '24px 12px' }}
                >
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
                        <div
                            style={{
                                fontSize: 22,
                                fontWeight: 900,
                                color: '#065F46',
                                marginBottom: 8,
                            }}
                        >
                            Beacon Created Successfully
                        </div>
                        <div style={{ fontSize: 13, color: '#059669', marginBottom: 32 }}>
                            <strong>{form.beaconId.toUpperCase()}</strong> (
                            {form.macAddress.toUpperCase()}) has been registered in the system.
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
                                <ArrowLeft size={16} className="ms" /> Back to List
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
                        <Radio size={18} className="ms mr-2" />
                        Add New Beacon
                    </div>
                    <div className="breadcrumb">
                        Admin <span>/</span> Masters <span>/</span> Beacon Devices <span>/</span>{' '}
                        Add
                    </div>
                </div>
                <div style={{ display: 'flex', gap: 12 }}>
                    <button
                        className="btn btn-secondary"
                        onClick={() => navigate('/masters/beacon-devices')}
                    >
                        <ArrowLeft size={16} className="ms" />
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
                            <Grid className="grid-cols-responsive-2">
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
                                <div>
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
                            </Grid>
                        </Body>
                    </Card>

                    {/* Hardware Info */}
                    <Card>
                        <SectionHeader icon={Cpu} title="Hardware Details" />
                        <Body>
                            <Grid className="grid-cols-responsive-2">
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
                                            setForm((v) => ({ ...v, status: e.target.value }))
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
                            <Save size={18} className="ms" /> Save Beacon
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};
