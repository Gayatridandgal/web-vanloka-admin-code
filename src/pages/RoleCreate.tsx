import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Info, Key, CheckCircle2, ArrowLeft, ShieldCheck, Save, RefreshCw, Menu } from 'lucide-react';

const DUMMY_ROLES = [
    { id: '1', name: 'Administrator', description: 'Full access to all system modules and settings', permissions: new Set(['VIEW DASHBOARD', 'VIEW APP USERS', 'EDIT APP USERS', 'VIEW BEACONS']) },
    { id: '2', name: 'Content Manager', description: 'Can manage pages, notifications, and media', permissions: new Set(['VIEW DASHBOARD', 'VIEW APP USERS']) },
];

/* ── Tiny Helpers ──────────────────────────────── */
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
    <div style={{ padding: '24px 28px', ...style }}>{children}</div>
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
                    background: '#F5F3FF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 20px',
                }}
            >
                <RefreshCw size={36} color="var(--primary)" />
            </div>
            <div
                style={{
                    fontSize: 18,
                    fontWeight: 900,
                    color: '#4338CA',
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
                Are you sure you want to update the role <strong>{title}</strong>? This will modify its permissions and details across the system.
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
    const { id } = useParams();
    const isEdit = !!id;

    const [form, setForm] = useState({ roleName: '', description: '' });
    const [errs, setErrs] = useState<{ roleName?: string }>({});
    const [selectedPerms, setSelectedPerms] = useState<Set<string>>(new Set());
    const [success, setSuccess] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (isEdit) {
            const role = DUMMY_ROLES.find(r => r.id === id);
            if (role) {
                setForm({ roleName: role.name, description: role.description });
                setSelectedPerms(new Set(role.permissions));
            }
        }
    }, [id, isEdit]);

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
        if (!form.roleName.trim()) {
            setErrs({ roleName: 'Role Name is required' });
            return;
        }
        setErrs({});
        if (isEdit) {
            setShowConfirm(true);
        } else {
            setSaving(true);
            setTimeout(() => {
                setSaving(false);
                setSuccess(true);
            }, 800);
        }
    };

    const confirmUpdate = () => {
        setShowConfirm(false);
        setSaving(true);
        setTimeout(() => {
            setSaving(false);
            setSuccess(true);
        }, 800);
    };

    return (
        <div className="page relative">
            <button className="lg:hidden absolute top-[13px] right-4 z-30 p-1.5 bg-white text-slate-600 rounded-lg shadow-sm border border-slate-200 hover:bg-slate-50 transition-colors" aria-label="Open Menu">
                <Menu size={22} strokeWidth={2.5} />
            </button>

            {/* ── PAGE HEADER ── */}
            <div className="page-header">
                <div>
                    <div className="page-title">
                        <ShieldCheck size={18} className="ms mr-2" />
                        {isEdit ? 'Edit Role' : 'Add New Role'}
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
                        <span>/</span> {isEdit ? 'Edit Role' : 'Add New'}
                    </div>
                </div>
                <div style={{ display: 'flex', gap: 12 }}>
                    <button className="btn btn-secondary hidden sm:flex" onClick={() => navigate('/roles-permissions')}>
                        <ArrowLeft size={18} className="ms mr-1" />
                        Back
                    </button>
                </div>
            </div>

            {/* ── PAGE BODY ── */}
            <div className="page-body">
                <div style={{ maxWidth: 1100, width: '100%', margin: '0 auto', boxSizing: 'border-box' }} className="px-1 sm:px-0">
                    
                    {/* Role Information Card */}
                    <Card>
                        <SectionHeader icon={Info} title="Role Information" />
                        <Body style={{ padding: '24px 28px' }}>
                            <div className="grid grid-cols-1 gap-6" style={{ boxSizing: 'border-box' }}>
                                <div className="space-y-5">
                                    <div>
                                        <Label>Role Name *</Label>
                                        <input
                                            className="form-input"
                                            placeholder="e.g. CONTENT MANAGER"
                                            value={form.roleName}
                                            onChange={(e) => {
                                                setForm((v) => ({ ...v, roleName: e.target.value.toUpperCase() }));
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
                                            onChange={(e) => setForm((v) => ({ ...v, description: e.target.value }))}
                                            rows={3}
                                            style={{ width: '100%', boxSizing: 'border-box', resize: 'vertical' }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </Body>
                    </Card>

                    {/* Permissions Settings Card */}
                    <Card style={{ marginTop: 20 }}>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '12px 20px',
                            borderBottom: '1.5px solid var(--border)',
                            background: 'var(--surface)'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                <Key size={18} color="var(--primary)" />
                                <span style={{ fontSize: 11, fontWeight: 900, letterSpacing: '0.07em', textTransform: 'uppercase' }}>
                                    Permissions Settings
                                </span>
                            </div>
                            <label style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 8,
                                cursor: 'pointer',
                                fontSize: 10,
                                fontWeight: 800,
                                color: 'var(--primary)',
                                userSelect: 'none',
                                background: 'white',
                                padding: '4px 10px',
                                borderRadius: 6,
                                border: '1px solid var(--primary)'
                            }}>
                                <input
                                    type="checkbox"
                                    style={{ display: 'none' }}
                                    checked={isAllSelected}
                                    onChange={toggleAll}
                                />
                                {isAllSelected ? 'DESELECT ALL' : 'SELECT ALL'}
                            </label>
                        </div>
                        
                        <Body style={{ padding: '20px 22px' }}>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3" style={{ boxSizing: 'border-box' }}>
                                {PERMISSIONS.map(p => (
                                    <label key={p} style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 10,
                                        padding: '12px 14px',
                                        borderRadius: 8,
                                        border: `1px solid ${selectedPerms.has(p) ? 'var(--primary)' : 'var(--border)'}`,
                                        background: selectedPerms.has(p) ? 'var(--surface)' : 'white',
                                        cursor: 'pointer',
                                        transition: 'all 0.1s ease-in-out',
                                        userSelect: 'none',
                                        minWidth: 0,
                                        boxSizing: 'border-box'
                                    }}
                                    className="hover:shadow-sm transition-all active:scale-[0.98]"
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
                                                flexShrink: 0
                                            }}
                                        />
                                        <span style={{ 
                                            fontSize: 11, 
                                            fontWeight: 700, 
                                            letterSpacing: '0.01em',
                                            color: selectedPerms.has(p) ? 'var(--primary)' : '#475569',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            whiteSpace: 'nowrap'
                                        }}>
                                            {p}
                                        </span>
                                    </label>
                                ))}
                            </div>
                        </Body>
                    </Card>

                    {/* Footer Actions */}
                    <div style={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        gap: 12,
                        marginTop: 12,
                        paddingBottom: 40
                    }} className="flex-col sm:flex-row">
                        <button
                            className="btn btn-secondary w-full sm:w-auto"
                            onClick={() => navigate('/roles-permissions')}
                            style={{ minWidth: 120 }}
                        >
                            Cancel
                        </button>
                        <button
                            className="btn btn-primary w-full sm:w-auto"
                            onClick={handleSave}
                            disabled={saving}
                            style={{ minWidth: 140 }}
                        >
                            {saving ? (
                                <RefreshCw className="animate-spin mr-2" size={18} />
                            ) : (
                                <Save size={18} className="ms mr-2" />
                            )}
                            {isEdit ? 'Update Role' : 'Create Role'}
                        </button>
                    </div>
                </div>
            </div>

            {/* ── SUCCESS MESSAGE ── */}
            {success && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'rgba(255,255,255,0.9)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1000
                }}>
                    <div style={{ textAlign: 'center' }}>
                        <div style={{
                            width: 80,
                            height: 80,
                            borderRadius: '50%',
                            background: '#ECFDF5',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 auto 24px auto',
                            boxShadow: '0 4px 12px rgba(16, 185, 129, 0.2)'
                        }}>
                            <CheckCircle2 size={40} color="#10B981" />
                        </div>
                        <h2 style={{ fontSize: 24, fontWeight: 900, marginBottom: 12, color: 'var(--text)' }}>
                            Role {isEdit ? 'Updated' : 'Created'} Successfully!
                        </h2>
                        <p style={{ color: 'var(--muted)', marginBottom: 32 }}>
                            The {form.roleName} role has been successfully {isEdit ? 'updated in' : 'added to'} the system.
                        </p>
                        <button
                            className="btn btn-primary"
                            onClick={() => navigate('/roles-permissions')}
                            style={{ minWidth: 200 }}
                        >
                            Return to Role List
                        </button>
                    </div>
                </div>
            )}

            {/* Confirmation Modal */}
            {showConfirm && (
                <UpdateConfirmOverlay 
                    title={form.roleName}
                    onConfirm={confirmUpdate}
                    onCancel={() => setShowConfirm(false)}
                />
            )}
        </div>
    );
};
