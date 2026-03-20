import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Info, FileText, CheckCircle2, ArrowLeft, CreditCard, Save, RefreshCw } from 'lucide-react';
import { DUMMY_FEATURES } from '../data/planData';

/* ── Tiny Helpers (matching the latest Creation Form pattern) ── */
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

const Grid = ({ children }: { children: React.ReactNode }) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">{children}</div>
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
            marginBottom: 8,
        }}
    >
        {children}
    </label>
);

const Err = ({ msg }: { msg?: string }) =>
    msg ? (
        <div style={{ fontSize: 10, color: '#DC2626', fontWeight: 700, marginTop: 4 }}>⚠ {msg}</div>
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

export const PlanFeatureCreatePage = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const isEdit = !!id;

    const [form, setForm] = useState({
        name: '',
        code: '',
        category: 'Tracking',
        description: '',
        status: 'Active',
    });

    useEffect(() => {
        if (isEdit) {
            const feature = DUMMY_FEATURES.find((f) => f.id === id);
            if (feature) {
                setForm({
                    name: feature.name,
                    code: feature.code,
                    category: feature.category,
                    description: feature.description,
                    status: feature.status,
                });
            }
        }
    }, [id, isEdit]);

    const [errs, setErrs] = useState<Partial<typeof form>>({});
    const [saved, setSaved] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const handleSave = () => {
        const e: Partial<typeof form> = {};
        if (!form.name.trim()) e.name = 'Feature Name is required';
        if (!form.code.trim()) e.code = 'Feature Code is required';

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
                            <CreditCard size={18} className="ms" />
                            Plan Features
                        </div>
                        <div className="breadcrumb">
                            Admin <span>/</span> Masters <span>/</span> Plan Features
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
                            Feature {isEdit ? 'Updated' : 'Created'} Successfully
                        </div>
                        <div style={{ fontSize: 13, color: '#059669', marginBottom: 32 }}>
                            <strong>{form.name}</strong> has been{' '}
                            {isEdit ? 'updated' : 'registered'} in the subscription system with
                            code: <code>{form.code.toUpperCase()}</code>.
                        </div>
                        <div
                            style={{
                                display: 'flex',
                                gap: 12,
                                justifyContent: 'center',
                                flexDirection: 'column',
                            }}
                            className="sm:flex-row"
                        >
                            <button
                                className="btn btn-secondary w-full sm:w-auto"
                                onClick={() => {
                                    setForm({
                                        name: '',
                                        code: '',
                                        category: 'Tracking',
                                        description: '',
                                        status: 'Active',
                                    });
                                    setSaved(false);
                                }}
                            >
                                Add Another
                            </button>
                            <button
                                className="btn btn-primary w-full sm:w-auto"
                                onClick={() => navigate('/masters/plan-features')}
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
                <div
                    style={{ display: 'flex', alignItems: 'center', gap: 16 }}
                    className="flex-col sm:flex-row sm:items-center"
                >
                    <button
                        className="btn btn-secondary w-full sm:w-auto"
                        onClick={() => navigate('/masters/plan-features')}
                    >
                        <ArrowLeft size={18} className="ms" />
                        Back
                    </button>
                    <div className="text-center sm:text-left">
                        <div className="page-title">
                            {isEdit ? 'Update Plan Feature' : 'Add New Plan Feature'}
                        </div>
                        <div className="breadcrumb">
                            Admin <span>/</span> Masters <span>/</span> Plan Features <span>/</span>{' '}
                            {isEdit ? 'Update' : 'Add'}
                        </div>
                    </div>
                </div>
            </div>

            <div className="page-body">
                <div style={{ maxWidth: 860, width: '100%', margin: '0 auto' }}>
                    {/* Basic Info */}
                    <Card>
                        <SectionHeader icon={Info} title="Basic Information" highlight />
                        <Body>
                            <Grid>
                                <div>
                                    <Label>Feature Name *</Label>
                                    <input
                                        className="form-input"
                                        placeholder="e.g. Geofencing Alerts"
                                        value={form.name}
                                        onChange={(e) => {
                                            setForm((v) => ({ ...v, name: e.target.value }));
                                            setErrs((e) => ({ ...e, name: undefined }));
                                        }}
                                        style={{
                                            width: '100%',
                                            boxSizing: 'border-box',
                                            borderColor: errs.name ? '#DC2626' : undefined,
                                        }}
                                    />
                                    <Err msg={errs.name} />
                                </div>
                                <div>
                                    <Label>Feature Code *</Label>
                                    <input
                                        className="form-input"
                                        placeholder="e.g. GEO_FENCE_01"
                                        value={form.code}
                                        onChange={(e) => {
                                            setForm((v) => ({
                                                ...v,
                                                code: e.target.value
                                                    .toUpperCase()
                                                    .replace(/\s+/g, '_'),
                                            }));
                                            setErrs((e) => ({ ...e, code: undefined }));
                                        }}
                                        style={{
                                            width: '100%',
                                            boxSizing: 'border-box',
                                            fontFamily: 'monospace',
                                            borderColor: errs.code ? '#DC2626' : undefined,
                                        }}
                                    />
                                    <Err msg={errs.code} />
                                </div>
                                <div>
                                    <Label>Category</Label>
                                    <select
                                        className="form-select"
                                        value={form.category}
                                        onChange={(e) =>
                                            setForm((v) => ({ ...v, category: e.target.value }))
                                        }
                                        style={{ width: '100%', boxSizing: 'border-box' }}
                                    >
                                        <option value="Tracking">Tracking</option>
                                        <option value="Security">Security</option>
                                        <option value="Analytics">Analytics</option>
                                        <option value="Reporting">Reporting</option>
                                        <option value="Admin">Administrative</option>
                                        <option value="Workflow">Workflow / Logic</option>
                                        <option value="Enterprise">Enterprise Features</option>
                                        <option value="Developer">Developer Tools</option>
                                        <option value="Miscellaneous">Miscellaneous</option>
                                    </select>
                                </div>
                                <div>
                                    <Label>Availability Status</Label>
                                    <select
                                        className="form-select"
                                        value={form.status}
                                        onChange={(e) =>
                                            setForm((v) => ({ ...v, status: e.target.value }))
                                        }
                                        style={{ width: '100%', boxSizing: 'border-box' }}
                                    >
                                        <option value="Active">Active</option>
                                        <option value="Beta">Experimental / Beta</option>
                                        <option value="Deprecated">Deprecated / Legacy</option>
                                    </select>
                                </div>
                            </Grid>
                        </Body>
                    </Card>

                    {/* Description Area */}
                    <Card>
                        <SectionHeader icon={FileText} title="Feature Capabilities" />
                        <Body>
                            <div>
                                <Label>Description</Label>
                                <textarea
                                    className="form-input"
                                    placeholder="Explain what this feature enables for the end user..."
                                    value={form.description}
                                    onChange={(e) =>
                                        setForm((v) => ({ ...v, description: e.target.value }))
                                    }
                                    style={{
                                        width: '100%',
                                        boxSizing: 'border-box',
                                        minHeight: 120,
                                        resize: 'vertical',
                                    }}
                                />
                            </div>
                        </Body>
                    </Card>

                    {/* Footer Actions: Cancel and Save */}
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            gap: 12,
                            marginTop: 12,
                            paddingBottom: 40,
                            flexDirection: 'column',
                        }}
                        className="sm:flex-row mb-8 sm:mb-0"
                    >
                        <button
                            className="btn btn-secondary w-full sm:w-auto"
                            onClick={() => navigate('/masters/plan-features')}
                        >
                            Cancel
                        </button>
                        <button className="btn btn-primary w-full sm:w-auto" onClick={handleSave}>
                            <Save size={18} className="ms mr-1" /> {isEdit ? 'Update' : 'Save'}{' '}
                            Feature
                        </button>
                    </div>
                </div>
            </div>

            {/* Confirmation Modal */}
            {showConfirm && (
                <UpdateConfirmOverlay
                    title={form.name}
                    onConfirm={confirmUpdate}
                    onCancel={() => setShowConfirm(false)}
                />
            )}
        </>
    );
};
