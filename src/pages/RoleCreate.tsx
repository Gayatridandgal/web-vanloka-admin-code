import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Info, Key, CheckCircle2, ArrowLeft, ShieldCheck, Save } from 'lucide-react';

/* ── Tiny Helpers ──────────────────────────────── */
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
            ...style,
        }}
    >
        {children}
    </div>
);

const Body = ({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) => (
    <div style={{ padding: '20px 22px', ...style }}>{children}</div>
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

/* ── Permissions Data ──────────────────────────── */
const PERMISSIONS = [
    'VIEW DASHBOARD',
    'VIEW APP USERS',
    'EDIT APP USERS',
    'VIEW BEACONS',
    'EDIT BEACONS',
    'VIEW BOOKINGS',
    'EDIT BOOKINGS',
    'VIEW DRIVERS',
    'EDIT DRIVERS',
    'VIEW EMPLOYEES',
    'EDIT EMPLOYEES',
    'VIEW GPS',
    'EDIT GPS',
    'VIEW VEHICLES',
    'EDIT VEHICLES',
    'DELETE VEHICLES',
];

export const RoleCreatePage = () => {
    const navigate = useNavigate();

    const [form, setForm] = useState({ roleName: '', description: '' });
    const [errs, setErrs] = useState<{ roleName?: string }>({});
    const [selectedPerms, setSelectedPerms] = useState<Set<string>>(new Set());
    const [saved, setSaved] = useState(false);

    const isAllSelected = selectedPerms.size === PERMISSIONS.length;

    const toggleAll = () => {
        if (isAllSelected) {
            setSelectedPerms(new Set());
        } else {
            setSelectedPerms(new Set(PERMISSIONS));
        }
    };

    const togglePerm = (perm: string) => {
        const next = new Set(selectedPerms);
        if (next.has(perm)) next.delete(perm);
        else next.add(perm);
        setSelectedPerms(next);
    };

    const handleSave = () => {
        // Validation
        if (!form.roleName.trim()) {
            setErrs({ roleName: 'Role Name is required' });
            return;
        }
        setErrs({});
        setSaved(true);
    };

    /* ── Success screen ──────────────────────────── */
    if (saved) {
        return (
            <>
                <div className="page-header">
                    <div>
                        <div className="page-title">
                            <ShieldCheck size={18} className="ms" />
                            Roles & Permissions
                        </div>
                        <div className="breadcrumb">
                            Admin <span>/</span> Roles & Permissions <span>/</span> Add New
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
                            Role Created Successfully
                        </div>
                        <div style={{ fontSize: 13, color: '#059669', marginBottom: 32 }}>
                            <strong>{form.roleName}</strong> has been added with{' '}
                            {selectedPerms.size} permissions.
                        </div>
                        <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
                            <button
                                className="btn btn-secondary"
                                onClick={() => {
                                    setForm({ roleName: '', description: '' });
                                    setSelectedPerms(new Set());
                                    setSaved(false);
                                }}
                            >
                                Add Another Role
                            </button>
                            <button
                                className="btn btn-primary"
                                onClick={() => navigate('/roles-permissions')}
                            >
                                <ArrowLeft size={16} className="ms" /> Back to Roles
                            </button>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    /* ── Form ────────────────────────────────────── */
    return (
        <>
            {/* ── PAGE HEADER ── */}
            <div className="page-header">
                <div>
                    <div className="page-title">
                        <ShieldCheck size={18} className="ms" />
                        Add New Role
                    </div>
                    <div className="breadcrumb">
                        <span
                            style={{
                                cursor: 'pointer',
                                color: 'var(--primary)',
                                fontWeight: 700,
                            }}
                            onClick={() => navigate('/roles-permissions')}
                        >
                            Roles & Permissions
                        </span>
                        <span>/</span> Add New
                    </div>
                </div>
                <div style={{ display: 'flex', gap: 12 }}>
                    <button
                        className="btn btn-secondary"
                        onClick={() => navigate('/roles-permissions')}
                    >
                        <ArrowLeft size={18} className="ms" />
                        Back
                    </button>
                </div>
            </div>

            {/* ── PAGE BODY ── */}
            <div className="page-body">
                <div style={{ maxWidth: 860, width: '100%', margin: '0 auto' }}>
                    <Card>
                        <SectionHeader icon={Info} title="Role Information" />
                        <Body>
                            <div style={{ marginBottom: 20 }}>
                                <Label>Role Name *</Label>
                                <input
                                    className="form-input"
                                    placeholder="e.g. CONTENT MANAGER"
                                    value={form.roleName}
                                    onChange={(e) => {
                                        setForm((v) => ({
                                            ...v,
                                            roleName: e.target.value.toUpperCase(),
                                        }));
                                        setErrs({});
                                    }}
                                    style={{
                                        width: '100%',
                                        boxSizing: 'border-box',
                                        borderColor: errs.roleName ? '#DC2626' : undefined,
                                    }}
                                />
                                <Err msg={errs.roleName} />
                            </div>
                            <div>
                                <Label>Description (Optional)</Label>
                                <textarea
                                    className="form-input"
                                    placeholder="Describe the role responsibilities..."
                                    value={form.description}
                                    onChange={(e) =>
                                        setForm((v) => ({ ...v, description: e.target.value }))
                                    }
                                    rows={3}
                                    style={{
                                        width: '100%',
                                        boxSizing: 'border-box',
                                        resize: 'vertical',
                                    }}
                                />
                            </div>
                        </Body>
                    </Card>

                    <Card>
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                padding: '12px 20px',
                                borderBottom: '1.5px solid var(--border)',
                                background: 'var(--surface)',
                            }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                <Key size={18} color="var(--primary)" />
                                <span
                                    style={{
                                        fontSize: 11,
                                        fontWeight: 900,
                                        letterSpacing: '.07em',
                                        textTransform: 'uppercase',
                                    }}
                                >
                                    Permissions
                                </span>
                            </div>

                            <label
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 8,
                                    cursor: 'pointer',
                                    fontSize: 12,
                                    fontWeight: 800,
                                    color: 'var(--primary)',
                                    userSelect: 'none',
                                }}
                            >
                                <input
                                    type="checkbox"
                                    checked={isAllSelected}
                                    onChange={toggleAll}
                                    style={{
                                        width: 16,
                                        height: 16,
                                        cursor: 'pointer',
                                        accentColor: 'var(--primary)',
                                    }}
                                />
                                {isAllSelected ? 'DESELECT ALL' : 'SELECT ALL'}
                            </label>
                        </div>
                        <Body>
                            <div
                                style={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                                    gap: 16,
                                }}
                            >
                                {PERMISSIONS.map((p) => (
                                    <label
                                        key={p}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 10,
                                            padding: '12px 16px',
                                            borderRadius: 8,
                                            border: `1px solid ${selectedPerms.has(p) ? 'var(--primary)' : 'var(--border)'}`,
                                            background: selectedPerms.has(p)
                                                ? 'var(--surface)'
                                                : 'white',
                                            cursor: 'pointer',
                                            transition: 'all 0.2s',
                                            userSelect: 'none',
                                        }}
                                    >
                                        <input
                                            type="checkbox"
                                            checked={selectedPerms.has(p)}
                                            onChange={() => togglePerm(p)}
                                            style={{
                                                width: 16,
                                                height: 16,
                                                cursor: 'pointer',
                                                accentColor: 'var(--primary)',
                                                flexShrink: 0,
                                            }}
                                        />
                                        <span
                                            style={{
                                                fontSize: 12,
                                                fontWeight: 700,
                                                color: selectedPerms.has(p)
                                                    ? 'var(--primary)'
                                                    : 'var(--text)',
                                            }}
                                        >
                                            {p}
                                        </span>
                                    </label>
                                ))}
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
                            onClick={() => navigate('/roles-permissions')}
                        >
                            Cancel
                        </button>
                        <button className="btn btn-primary" onClick={handleSave}>
                            <Save size={18} className="ms mr-1" /> Save Role
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};
