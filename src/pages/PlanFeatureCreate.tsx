import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Info, FileText, CheckCircle2, ArrowLeft, CreditCard, Save } from 'lucide-react';

/* ── Tiny Helpers (matching the latest Creation Form pattern) ── */
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

export const PlanFeatureCreatePage = () => {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: '',
        code: '',
        category: 'Tracking',
        description: '',
        status: 'Active',
    });

    const [errs, setErrs] = useState<Partial<typeof form>>({});
    const [saved, setSaved] = useState(false);

    const handleSave = () => {
        const e: Partial<typeof form> = {};
        if (!form.name.trim()) e.name = 'Feature Name is required';
        if (!form.code.trim()) e.code = 'Feature Code is required';

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
                            <CreditCard size={18} className="ms" />
                            Plan Features
                        </div>
                        <div className="breadcrumb">
                            Admin <span>/</span> Masters <span>/</span> Plan Features
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
                            Feature Created Successfully
                        </div>
                        <div style={{ fontSize: 13, color: '#059669', marginBottom: 32 }}>
                            <strong>{form.name}</strong> has been registered in the subscription system with code: <code>{form.code.toUpperCase()}</code>.
                        </div>
                        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
                            <button
                                className="btn btn-secondary"
                                onClick={() => {
                                    setForm({ name: '', code: '', category: 'Tracking', description: '', status: 'Active' });
                                    setSaved(false);
                                }}
                            >
                                Add Another
                            </button>
                            <button className="btn btn-primary" onClick={() => navigate('/masters/plan-features')}>
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
                        <CreditCard size={18} className="ms" />
                        Add New Plan Feature
                    </div>
                    <div className="breadcrumb">
                        Admin <span>/</span> Masters <span>/</span> Plan Features <span>/</span> Add
                    </div>
                </div>
                {/* Header Actions: Back Button Only */}
                <div style={{ display: 'flex', gap: 12 }}>
                    <button className="btn btn-secondary" onClick={() => navigate('/masters/plan-features')}>
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
                            <Grid cols={2}>
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
                                        style={{ width: '100%', boxSizing: 'border-box', borderColor: errs.name ? '#DC2626' : undefined }}
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
                                            setForm((v) => ({ ...v, code: e.target.value.toUpperCase().replace(/\s+/g, '_') }));
                                            setErrs((e) => ({ ...e, code: undefined }));
                                        }}
                                        style={{ width: '100%', boxSizing: 'border-box', fontFamily: 'monospace', borderColor: errs.code ? '#DC2626' : undefined }}
                                    />
                                    <Err msg={errs.code} />
                                </div>
                                <div>
                                    <Label>Category</Label>
                                    <select
                                        className="form-select"
                                        value={form.category}
                                        onChange={(e) => setForm((v) => ({ ...v, category: e.target.value }))}
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
                                        onChange={(e) => setForm((v) => ({ ...v, status: e.target.value }))}
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
                                    onChange={(e) => setForm((v) => ({ ...v, description: e.target.value }))}
                                    style={{ width: '100%', boxSizing: 'border-box', minHeight: 120, resize: 'vertical' }}
                                />
                            </div>
                        </Body>
                    </Card>

                    {/* Footer Actions: Cancel and Save */}
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 12, paddingBottom: 40 }}>
                        <button className="btn btn-secondary" onClick={() => navigate('/masters/plan-features')}>
                            Cancel
                        </button>
                        <button className="btn btn-primary" onClick={handleSave}>
                            <Save size={18} className="ms mr-1" /> Save Feature
                        </button>
                    </div>

                </div>
            </div>
        </>
    );
};
