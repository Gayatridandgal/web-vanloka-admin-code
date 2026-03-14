import React, { useState, type ChangeEvent, type CSSProperties, type FormEvent } from 'react';
import type { UserInfo } from '../types';

/* ─── Internal screen type ───────────────────────────────────────── */
type Screen = 'login' | 'forgot' | 'otp' | 'reset' | 'success';
interface LoginForm {
    email: string;
    password: string;
    remember: boolean;
}
interface ResetForm {
    newPassword: string;
    confirmPassword: string;
}

/* ─── Password rules ─────────────────────────────────────────────── */
interface Rule {
    label: string;
    test: (pw: string) => boolean;
}
const PW_RULES: Rule[] = [
    { label: 'At least 8 characters', test: (pw) => pw.length >= 8 },
    { label: 'One uppercase letter (A–Z)', test: (pw) => /[A-Z]/.test(pw) },
    { label: 'One lowercase letter (a–z)', test: (pw) => /[a-z]/.test(pw) },
    { label: 'One number (0–9)', test: (pw) => /[0-9]/.test(pw) },
    {
        label: 'One special character (!@#$…)',
        test: (pw) => /[^A-Za-z0-9]/.test(pw),
    },
];
const getStrength = (pw: string) => PW_RULES.filter((r) => r.test(pw)).length;
const strengthLabel = (n: number) =>
    n <= 1 ? 'Very Weak' : n === 2 ? 'Weak' : n === 3 ? 'Fair' : n === 4 ? 'Strong' : 'Very Strong';
const strengthColor = (n: number) =>
    n <= 1
        ? '#ef4444'
        : n === 2
          ? '#f97316'
          : n === 3
            ? '#eab308'
            : n === 4
              ? '#22c55e'
              : '#16a34a';

/* ─── Derive UserInfo from email ─────────────────────────────────── */
const emailToUser = (email: string): UserInfo => {
    const local = email.split('@')[0];
    const name =
        local
            .replace(/[._]/g, ' ')
            .replace(/\b\w/g, (c) => c.toUpperCase())
            .trim() || 'Admin';
    const parts = name.split(' ');
    const initials =
        parts.length >= 2
            ? (parts[0][0] + parts[1][0]).toUpperCase()
            : name.slice(0, 2).toUpperCase();
    return { name, email, initials };
};

/* ─── Icons ──────────────────────────────────────────────────────── */
const VanIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M1 3h15v13H1z" stroke="white" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M16 8h4l3 3v5h-7V8z" stroke="white" strokeWidth="1.8" strokeLinejoin="round" />
        <circle cx="5.5" cy="18.5" r="2.5" stroke="white" strokeWidth="1.8" />
        <circle cx="18.5" cy="18.5" r="2.5" stroke="white" strokeWidth="1.8" />
    </svg>
);
const ShieldIcon = () => (
    <svg width="38" height="38" viewBox="0 0 24 24" fill="none">
        <path
            d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
            stroke="#7C3AED"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="rgba(124,58,237,0.10)"
        />
        <circle cx="12" cy="11" r="2.5" fill="#7C3AED" />
        <path d="M12 13.5v2.5" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" />
    </svg>
);
const MailIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <rect x="2" y="4" width="20" height="16" rx="2" stroke="#94A3B8" strokeWidth="1.8" />
        <path d="m2 7 10 7 10-7" stroke="#94A3B8" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
);
const LockIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="11" width="18" height="11" rx="2" stroke="#94A3B8" strokeWidth="1.8" />
        <path
            d="M7 11V7a5 5 0 0 1 10 0v4"
            stroke="#94A3B8"
            strokeWidth="1.8"
            strokeLinecap="round"
        />
    </svg>
);
const EyeOpen = () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="#94A3B8" strokeWidth="1.8" />
        <circle cx="12" cy="12" r="3" stroke="#94A3B8" strokeWidth="1.8" />
    </svg>
);
const EyeOff = () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
        <path
            d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"
            stroke="#94A3B8"
            strokeWidth="1.8"
            strokeLinecap="round"
        />
        <path
            d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"
            stroke="#94A3B8"
            strokeWidth="1.8"
            strokeLinecap="round"
        />
        <line
            x1="1"
            y1="1"
            x2="23"
            y2="23"
            stroke="#94A3B8"
            strokeWidth="1.8"
            strokeLinecap="round"
        />
    </svg>
);
const ArrowIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <line
            x1="5"
            y1="12"
            x2="19"
            y2="12"
            stroke="white"
            strokeWidth="2.2"
            strokeLinecap="round"
        />
        <polyline
            points="12 5 19 12 12 19"
            stroke="white"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);
const BackIcon = () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
        <line
            x1="19"
            y1="12"
            x2="5"
            y2="12"
            stroke="#7C3AED"
            strokeWidth="2"
            strokeLinecap="round"
        />
        <polyline
            points="12 19 5 12 12 5"
            stroke="#7C3AED"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);
const CheckSm = () => (
    <svg width="8" height="8" viewBox="0 0 10 8" fill="none">
        <path
            d="M1 4l3 3 5-6"
            stroke="white"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);
const Spinner = () => (
    <>
        <style>{`@keyframes _vl_sp{to{transform:rotate(360deg)}}`}</style>
        <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            style={{ animation: '_vl_sp 0.75s linear infinite', flexShrink: 0 }}
        >
            <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.25)" strokeWidth="3" />
            <path
                d="M12 2a10 10 0 0 1 10 10"
                stroke="white"
                strokeWidth="3"
                strokeLinecap="round"
            />
        </svg>
    </>
);

/* ─── Shared styles ──────────────────────────────────────────────── */
const iBox = (focused: boolean, hasErr: boolean): CSSProperties => ({
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    padding: '10px 13px',
    background: 'white',
    border: `1.5px solid ${hasErr ? '#f87171' : focused ? '#7C3AED' : '#e2e8f0'}`,
    borderRadius: 9,
    boxShadow: hasErr
        ? '0 0 0 3px rgba(248,113,113,0.10)'
        : focused
          ? '0 0 0 3px rgba(124,58,237,0.09)'
          : 'none',
    transition: 'border-color 0.15s,box-shadow 0.15s',
});
const iStyle: CSSProperties = {
    flex: 1,
    border: 'none',
    outline: 'none',
    background: 'transparent',
    fontSize: 13.5,
    fontWeight: 500,
    color: '#1e293b',
    fontFamily: "'Manrope',sans-serif",
};
const lbl: CSSProperties = {
    fontSize: 12.5,
    fontWeight: 700,
    color: '#374151',
};
const errStyle: CSSProperties = {
    fontSize: 11.5,
    color: '#ef4444',
    fontWeight: 600,
};

/* ─── Purple button ──────────────────────────────────────────────── */
const PBtn = ({
    children,
    loading,
    disabled,
    onClick,
    type = 'submit',
}: {
    children: React.ReactNode;
    loading?: boolean;
    disabled?: boolean;
    onClick?: () => void;
    type?: 'submit' | 'button';
}) => {
    const [h, setH] = useState(false);
    return (
        <button
            type={type}
            disabled={loading || disabled}
            onClick={onClick}
            onMouseEnter={() => setH(true)}
            onMouseLeave={() => setH(false)}
            style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                padding: '13px 20px',
                borderRadius: 10,
                border: 'none',
                background: loading || disabled ? '#a78bfa' : h ? '#6D28D9' : '#7C3AED',
                color: 'white',
                fontSize: 14,
                fontWeight: 700,
                cursor: loading || disabled ? 'not-allowed' : 'pointer',
                boxShadow:
                    h && !loading && !disabled
                        ? '0 6px 22px rgba(124,58,237,0.38)'
                        : '0 3px 14px rgba(124,58,237,0.24)',
                transform: h && !loading && !disabled ? 'translateY(-1px)' : 'translateY(0)',
                transition: 'background 0.15s,box-shadow 0.15s,transform 0.1s',
                fontFamily: "'Manrope',sans-serif",
            }}
        >
            {loading ? (
                <>
                    <Spinner /> Processing…
                </>
            ) : (
                children
            )}
        </button>
    );
};

/* ─── Password strength widget ───────────────────────────────────── */
const PwStrength = ({ pw }: { pw: string }) => {
    const s = getStrength(pw);
    if (!pw) return null;
    return (
        <div style={{ marginTop: 4 }}>
            <div style={{ display: 'flex', gap: 3, marginBottom: 4 }}>
                {[1, 2, 3, 4, 5].map((i) => (
                    <div
                        key={i}
                        style={{
                            flex: 1,
                            height: 3,
                            borderRadius: 3,
                            background: i <= s ? strengthColor(s) : '#e2e8f0',
                            transition: 'background 0.2s',
                        }}
                    />
                ))}
            </div>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: 6,
                }}
            >
                <span style={{ fontSize: 11, color: '#64748b', fontWeight: 500 }}>Strength</span>
                <span style={{ fontSize: 11, fontWeight: 700, color: strengthColor(s) }}>
                    {strengthLabel(s)}
                </span>
            </div>
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '3px 8px',
                }}
            >
                {PW_RULES.map((rule) => {
                    const ok = rule.test(pw);
                    return (
                        <div
                            key={rule.label}
                            style={{ display: 'flex', alignItems: 'center', gap: 5 }}
                        >
                            <div
                                style={{
                                    width: 13,
                                    height: 13,
                                    borderRadius: '50%',
                                    flexShrink: 0,
                                    background: ok ? '#7C3AED' : '#e2e8f0',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    transition: 'background 0.2s',
                                }}
                            >
                                {ok && <CheckSm />}
                            </div>
                            <span
                                style={{
                                    fontSize: 11,
                                    color: ok ? '#374151' : '#94a3b8',
                                    fontWeight: ok ? 600 : 400,
                                }}
                            >
                                {rule.label}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

/* ════════════════════════════════════════════════════════
   LEFT PANEL
════════════════════════════════════════════════════════ */
const LeftPanel = () => (
    <div className="login-left">
        <div
            style={{
                position: 'absolute',
                top: -120,
                right: -80,
                width: 320,
                height: 320,
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.05)',
                pointerEvents: 'none',
            }}
        />
        <div
            style={{
                position: 'absolute',
                bottom: -100,
                left: -80,
                width: 280,
                height: 280,
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.05)',
                pointerEvents: 'none',
            }}
        />
        <div
            style={{
                position: 'absolute',
                inset: 0,
                pointerEvents: 'none',
                backgroundImage:
                    'radial-gradient(circle,rgba(255,255,255,0.06) 1px,transparent 1px)',
                backgroundSize: '34px 34px',
            }}
        />

        {/* Logo */}
        <div
            style={{
                position: 'absolute',
                top: 32,
                left: 44,
                display: 'flex',
                alignItems: 'center',
                gap: 10,
            }}
        >
            <div
                style={{
                    width: 40,
                    height: 40,
                    borderRadius: 11,
                    background: 'rgba(255,255,255,0.18)',
                    border: '1px solid rgba(255,255,255,0.28)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
                }}
            >
                <VanIcon />
            </div>
            <span
                style={{
                    fontSize: 19,
                    fontWeight: 800,
                    color: 'white',
                    letterSpacing: '-0.2px',
                }}
            >
                VanLoka
            </span>
        </div>

        {/* Center content */}
        <div
            style={{
                textAlign: 'center',
                position: 'relative',
                zIndex: 1,
                maxWidth: 320,
            }}
        >
            <div
                style={{
                    width: 88,
                    height: 88,
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,0.12)',
                    border: '1px solid rgba(255,255,255,0.18)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 28px',
                    boxShadow: '0 0 50px rgba(255,255,255,0.10),0 8px 28px rgba(0,0,0,0.18)',
                }}
            >
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                    <path
                        d="M1 3h15v13H1z"
                        stroke="white"
                        strokeWidth="1.6"
                        strokeLinejoin="round"
                        fill="rgba(255,255,255,0.1)"
                    />
                    <path
                        d="M16 8h4l3 3v5h-7V8z"
                        stroke="white"
                        strokeWidth="1.6"
                        strokeLinejoin="round"
                        fill="rgba(255,255,255,0.1)"
                    />
                    <circle
                        cx="5.5"
                        cy="18.5"
                        r="2.5"
                        stroke="white"
                        strokeWidth="1.6"
                        fill="rgba(255,255,255,0.15)"
                    />
                    <circle
                        cx="18.5"
                        cy="18.5"
                        r="2.5"
                        stroke="white"
                        strokeWidth="1.6"
                        fill="rgba(255,255,255,0.15)"
                    />
                </svg>
            </div>
            <h1
                style={{
                    fontSize: 32,
                    fontWeight: 900,
                    color: 'white',
                    letterSpacing: '-0.6px',
                    lineHeight: 1.18,
                    margin: '0 0 14px',
                }}
            >
                Drive smarter.
                <br />
                Manage better.
            </h1>
            <p
                style={{
                    fontSize: 14,
                    color: 'rgba(255,255,255,0.62)',
                    lineHeight: 1.68,
                    margin: '0 0 36px',
                }}
            >
                Your complete fleet operations platform — built for speed, reliability, and scale.
            </p>
            <div
                style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 9,
                    justifyContent: 'center',
                }}
            >
                {['🛰️ GPS Tracking', '📋 Compliance', '📊 Analytics'].map((b) => (
                    <span
                        key={b}
                        style={{
                            padding: '7px 16px',
                            background: 'rgba(255,255,255,0.12)',
                            border: '1px solid rgba(255,255,255,0.20)',
                            borderRadius: 100,
                            fontSize: 12.5,
                            fontWeight: 600,
                            color: 'rgba(255,255,255,0.90)',
                        }}
                    >
                        {b}
                    </span>
                ))}
            </div>
        </div>

        <div
            style={{
                position: 'absolute',
                bottom: 28,
                left: 0,
                right: 0,
                textAlign: 'center',
            }}
        >
            <p
                style={{
                    fontSize: 12,
                    color: 'rgba(255,255,255,0.38)',
                    fontWeight: 500,
                    margin: 0,
                }}
            ></p>
        </div>
    </div>
);

/* ════════════════════════════════════════════════════════
   LOGIN FORM SCREEN
════════════════════════════════════════════════════════ */
const LoginFormScreen = ({
    onForgot,
    onSuccess,
}: {
    onForgot: () => void;
    onSuccess: (u: UserInfo) => void;
}) => {
    const [form, setForm] = useState<LoginForm>({
        email: '',
        password: '',
        remember: false,
    });
    const [showPw, setShowPw] = useState(false);
    const [focus, setFocus] = useState<'e' | 'p' | null>(null);
    const [errs, setErrs] = useState<{ email?: string; password?: string }>({});
    const [loading, setLoading] = useState(false);
    const [pwTouched, setPwTouched] = useState(false);
    const strength = getStrength(form.password);

    const handle = (f: keyof LoginForm) => (e: ChangeEvent<HTMLInputElement>) => {
        const v = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setForm((p) => ({ ...p, [f]: v }));
        setErrs((p) => ({ ...p, [f]: '' }));
        if (f === 'password') setPwTouched(true);
    };

    const validate = () => {
        const e: { email?: string; password?: string } = {};
        if (!form.email.trim()) e.email = 'Email is required.';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email.';
        if (!form.password) e.password = 'Password is required.';
        else if (strength < 5) e.password = 'Password does not meet all requirements.';
        setErrs(e);
        return !Object.keys(e).length;
    };

    const submit = async (e: FormEvent) => {
        e.preventDefault();
        if (!validate()) return;
        setLoading(true);
        await new Promise((r) => setTimeout(r, 1500));
        setLoading(false);
        onSuccess(emailToUser(form.email));
    };

    return (
        <>
            <div style={{ textAlign: 'center', marginBottom: 20 }}>
                <div
                    style={{
                        width: 64,
                        height: 64,
                        borderRadius: '50%',
                        background: '#F3EEFF',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 14px',
                    }}
                >
                    <ShieldIcon />
                </div>
                <h2
                    style={{
                        fontSize: 22,
                        fontWeight: 900,
                        color: '#0f172a',
                        margin: '0 0 4px',
                        letterSpacing: '-0.4px',
                    }}
                >
                    Admin Login
                </h2>
                <p
                    style={{
                        fontSize: 12.5,
                        color: '#94a3b8',
                        fontWeight: 500,
                        margin: 0,
                    }}
                >
                    Manage your fleet and logistics operations
                </p>
            </div>

            <form
                onSubmit={submit}
                noValidate
                style={{ display: 'flex', flexDirection: 'column', gap: 14 }}
            >
                {/* Email */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                    <label style={lbl}>Email Address</label>
                    <div style={iBox(focus === 'e', !!errs.email)}>
                        <MailIcon />
                        <input
                            type="email"
                            value={form.email}
                            onChange={handle('email')}
                            onFocus={() => setFocus('e')}
                            onBlur={() => setFocus(null)}
                            placeholder="admin@vanloka.com"
                            autoComplete="email"
                            style={iStyle}
                        />
                    </div>
                    {errs.email && <span style={errStyle}>{errs.email}</span>}
                </div>

                {/* Password */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}
                    >
                        <label style={lbl}>Password</label>
                        <button
                            type="button"
                            onClick={onForgot}
                            style={{
                                background: 'none',
                                border: 'none',
                                fontSize: 12.5,
                                fontWeight: 700,
                                color: '#7C3AED',
                                cursor: 'pointer',
                                padding: 0,
                                fontFamily: "'Manrope',sans-serif",
                            }}
                        >
                            Forgot Password?
                        </button>
                    </div>
                    <div style={iBox(focus === 'p', !!errs.password)}>
                        <LockIcon />
                        <input
                            type={showPw ? 'text' : 'password'}
                            value={form.password}
                            onChange={handle('password')}
                            onFocus={() => setFocus('p')}
                            onBlur={() => setFocus(null)}
                            placeholder="••••••••"
                            autoComplete="current-password"
                            style={{ ...iStyle, letterSpacing: showPw ? 'normal' : '2px' }}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPw((v) => !v)}
                            style={{
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                padding: 3,
                                borderRadius: 5,
                                display: 'flex',
                            }}
                        >
                            {showPw ? <EyeOpen /> : <EyeOff />}
                        </button>
                    </div>
                    {pwTouched && <PwStrength pw={form.password} />}
                    {errs.password && <span style={errStyle}>{errs.password}</span>}
                </div>

                {/* Remember me */}
                <label
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8,
                        cursor: 'pointer',
                    }}
                >
                    <div
                        onClick={() => setForm((p) => ({ ...p, remember: !p.remember }))}
                        style={{
                            width: 16,
                            height: 16,
                            borderRadius: 4,
                            flexShrink: 0,
                            border: `2px solid ${form.remember ? '#7C3AED' : '#cbd5e1'}`,
                            background: form.remember ? '#7C3AED' : 'white',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'all 0.15s',
                            cursor: 'pointer',
                        }}
                    >
                        {form.remember && <CheckSm />}
                    </div>
                    <span
                        style={{
                            fontSize: 13,
                            fontWeight: 500,
                            color: '#475569',
                            userSelect: 'none',
                        }}
                    >
                        Remember this device
                    </span>
                </label>

                <div style={{ marginTop: 2 }}>
                    <PBtn loading={loading}>
                        Sign In to Dashboard <ArrowIcon />
                    </PBtn>
                </div>
            </form>
        </>
    );
};

/* ════════════════════════════════════════════════════════
   FORGOT PASSWORD SCREEN
════════════════════════════════════════════════════════ */
const ForgotFormScreen = ({
    onBack,
    onSent,
}: {
    onBack: () => void;
    onSent: (e: string) => void;
}) => {
    const [email, setEmail] = useState('');
    const [e, setE] = useState('');
    const [f, setF] = useState(false);
    const [loading, setLoading] = useState(false);

    const submit = async (ev: FormEvent) => {
        ev.preventDefault();
        if (!email.trim()) {
            setE('Email is required.');
            return;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setE('Enter a valid email.');
            return;
        }
        setLoading(true);
        await new Promise((r) => setTimeout(r, 1400));
        setLoading(false);
        onSent(email);
    };
    return (
        <>
            <button
                onClick={onBack}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: 12.5,
                    fontWeight: 700,
                    color: '#7C3AED',
                    padding: '0 0 18px',
                    fontFamily: "'Manrope',sans-serif",
                }}
            >
                <BackIcon /> Back to Login
            </button>
            <div style={{ textAlign: 'center', marginBottom: 22 }}>
                <div
                    style={{
                        width: 64,
                        height: 64,
                        borderRadius: '50%',
                        background: '#EFF6FF',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 14px',
                    }}
                >
                    <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
                        <rect
                            x="2"
                            y="4"
                            width="20"
                            height="16"
                            rx="2"
                            stroke="#3B82F6"
                            strokeWidth="1.8"
                            fill="rgba(59,130,246,0.08)"
                        />
                        <path
                            d="m2 7 10 7 10-7"
                            stroke="#3B82F6"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                        />
                    </svg>
                </div>
                <h2
                    style={{
                        fontSize: 22,
                        fontWeight: 900,
                        color: '#0f172a',
                        margin: '0 0 5px',
                        letterSpacing: '-0.3px',
                    }}
                >
                    Forgot Password?
                </h2>
                <p
                    style={{
                        fontSize: 12.5,
                        color: '#94a3b8',
                        fontWeight: 500,
                        margin: 0,
                        lineHeight: 1.6,
                    }}
                >
                    Enter your email — we'll send a 6-digit reset code.
                </p>
            </div>
            <form
                onSubmit={submit}
                noValidate
                style={{ display: 'flex', flexDirection: 'column', gap: 14 }}
            >
                <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                    <label style={lbl}>Email Address</label>
                    <div style={iBox(f, !!e)}>
                        <MailIcon />
                        <input
                            type="email"
                            value={email}
                            onChange={(ev) => {
                                setEmail(ev.target.value);
                                setE('');
                            }}
                            onFocus={() => setF(true)}
                            onBlur={() => setF(false)}
                            placeholder="admin@vanloka.com"
                            autoComplete="email"
                            style={iStyle}
                        />
                    </div>
                    {e && <span style={errStyle}>{e}</span>}
                </div>
                <PBtn loading={loading}>
                    Send Reset Code <ArrowIcon />
                </PBtn>
            </form>
        </>
    );
};

/* ════════════════════════════════════════════════════════
   OTP SCREEN
════════════════════════════════════════════════════════ */
const OtpFormScreen = ({
    email,
    onBack,
    onVerified,
}: {
    email: string;
    onBack: () => void;
    onVerified: () => void;
}) => {
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [e, setE] = useState('');
    const [loading, setLoading] = useState(false);
    const [cd, setCd] = useState(30);

    React.useEffect(() => {
        if (cd <= 0) return;
        const t = setTimeout(() => setCd((c) => c - 1), 1000);
        return () => clearTimeout(t);
    }, [cd]);

    const change = (i: number, v: string) => {
        if (!/^\d*$/.test(v)) return;
        const n = [...otp];
        n[i] = v.slice(-1);
        setOtp(n);
        setE('');
        if (v && i < 5) document.getElementById(`vl-otp-${i + 1}`)?.focus();
    };
    const keydown = (i: number, ev: React.KeyboardEvent) => {
        if (ev.key === 'Backspace' && !otp[i] && i > 0)
            document.getElementById(`vl-otp-${i - 1}`)?.focus();
    };
    const paste = (ev: React.ClipboardEvent) => {
        ev.preventDefault();
        const t = ev.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
        const n = [...otp];
        for (let i = 0; i < 6; i++) n[i] = t[i] || '';
        setOtp(n);
    };
    const submit = async (ev: FormEvent) => {
        ev.preventDefault();
        const code = otp.join('');
        if (code.length < 6) {
            setE('Enter the complete 6-digit code.');
            return;
        }
        if (code !== '123456') {
            setE('Invalid code. (Demo: use 123456)');
            return;
        }
        setLoading(true);
        await new Promise((r) => setTimeout(r, 1200));
        setLoading(false);
        onVerified();
    };
    return (
        <>
            <button
                onClick={onBack}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: 12.5,
                    fontWeight: 700,
                    color: '#7C3AED',
                    padding: '0 0 18px',
                    fontFamily: "'Manrope',sans-serif",
                }}
            >
                <BackIcon /> Back
            </button>
            <div style={{ textAlign: 'center', marginBottom: 22 }}>
                <div
                    style={{
                        width: 64,
                        height: 64,
                        borderRadius: '50%',
                        background: '#FFF7ED',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 14px',
                    }}
                >
                    <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
                        <rect
                            x="5"
                            y="2"
                            width="14"
                            height="20"
                            rx="2"
                            stroke="#F97316"
                            strokeWidth="1.8"
                            fill="rgba(249,115,22,0.08)"
                        />
                        <line
                            x1="9"
                            y1="7"
                            x2="15"
                            y2="7"
                            stroke="#F97316"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                        />
                        <line
                            x1="9"
                            y1="11"
                            x2="15"
                            y2="11"
                            stroke="#F97316"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                        />
                        <circle cx="12" cy="16" r="1.5" fill="#F97316" />
                    </svg>
                </div>
                <h2
                    style={{
                        fontSize: 22,
                        fontWeight: 900,
                        color: '#0f172a',
                        margin: '0 0 5px',
                        letterSpacing: '-0.3px',
                    }}
                >
                    Enter OTP
                </h2>
                <p
                    style={{
                        fontSize: 12.5,
                        color: '#94a3b8',
                        fontWeight: 500,
                        margin: 0,
                        lineHeight: 1.6,
                    }}
                >
                    We sent a code to <strong style={{ color: '#374151' }}>{email}</strong>
                </p>
            </div>
            <form
                onSubmit={submit}
                noValidate
                style={{ display: 'flex', flexDirection: 'column', gap: 16 }}
            >
                <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }} onPaste={paste}>
                    {otp.map((d, i) => (
                        <input
                            key={i}
                            id={`vl-otp-${i}`}
                            type="text"
                            inputMode="numeric"
                            maxLength={1}
                            value={d}
                            onChange={(ev) => change(i, ev.target.value)}
                            onKeyDown={(ev) => keydown(i, ev)}
                            style={{
                                width: 46,
                                height: 52,
                                textAlign: 'center',
                                fontSize: 20,
                                fontWeight: 800,
                                color: '#0f172a',
                                border: `2px solid ${e ? '#f87171' : d ? '#7C3AED' : '#e2e8f0'}`,
                                borderRadius: 10,
                                outline: 'none',
                                background: d ? '#F3EEFF' : 'white',
                                fontFamily: "'Manrope',sans-serif",
                                transition: 'border-color 0.15s,background 0.15s',
                            }}
                        />
                    ))}
                </div>
                {e && <span style={{ ...errStyle, textAlign: 'center' }}>{e}</span>}
                <PBtn loading={loading}>
                    Verify Code <ArrowIcon />
                </PBtn>
                <p
                    style={{
                        textAlign: 'center',
                        fontSize: 12.5,
                        color: '#94a3b8',
                        margin: 0,
                    }}
                >
                    Didn't receive it?{' '}
                    {cd > 0 ? (
                        <span style={{ fontWeight: 600 }}>Resend in {cd}s</span>
                    ) : (
                        <button
                            type="button"
                            onClick={() => setCd(30)}
                            style={{
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                fontSize: 12.5,
                                fontWeight: 700,
                                color: '#7C3AED',
                                fontFamily: "'Manrope',sans-serif",
                                padding: 0,
                            }}
                        >
                            Resend Code
                        </button>
                    )}
                </p>
            </form>
        </>
    );
};

/* ════════════════════════════════════════════════════════
   RESET PASSWORD SCREEN
════════════════════════════════════════════════════════ */
const ResetFormScreen = ({ onDone }: { onDone: () => void }) => {
    const [form, setForm] = useState<ResetForm>({
        newPassword: '',
        confirmPassword: '',
    });
    const [show, setShow] = useState({ n: false, c: false });
    const [focus, setFocus] = useState<'n' | 'c' | null>(null);
    const [errs, setErrs] = useState<{ np?: string; cp?: string }>({});
    const [loading, setLoading] = useState(false);
    const [touched, setTouched] = useState(false);
    const s = getStrength(form.newPassword);

    const handle = (f: keyof ResetForm) => (e: ChangeEvent<HTMLInputElement>) => {
        setForm((p) => ({ ...p, [f]: e.target.value }));
        setErrs((p) => ({ ...p, [f === 'newPassword' ? 'np' : 'cp']: '' }));
        if (f === 'newPassword') setTouched(true);
    };
    const validate = () => {
        const e: { np?: string; cp?: string } = {};
        if (!form.newPassword) e.np = 'New password is required.';
        else if (s < 5) e.np = 'Password does not meet all requirements.';
        if (!form.confirmPassword) e.cp = 'Please confirm your password.';
        else if (form.newPassword !== form.confirmPassword) e.cp = 'Passwords do not match.';
        setErrs(e);
        return !Object.keys(e).length;
    };
    const submit = async (e: FormEvent) => {
        e.preventDefault();
        if (!validate()) return;
        setLoading(true);
        await new Promise((r) => setTimeout(r, 1400));
        setLoading(false);
        onDone();
    };
    return (
        <>
            <div style={{ textAlign: 'center', marginBottom: 20 }}>
                <div
                    style={{
                        width: 64,
                        height: 64,
                        borderRadius: '50%',
                        background: '#F0FDF4',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 14px',
                    }}
                >
                    <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
                        <rect
                            x="3"
                            y="11"
                            width="18"
                            height="11"
                            rx="2"
                            stroke="#22c55e"
                            strokeWidth="1.8"
                            fill="rgba(34,197,94,0.08)"
                        />
                        <path
                            d="M7 11V7a5 5 0 0 1 10 0v4"
                            stroke="#22c55e"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                        />
                        <circle cx="12" cy="16" r="1.5" fill="#22c55e" />
                    </svg>
                </div>
                <h2
                    style={{
                        fontSize: 22,
                        fontWeight: 900,
                        color: '#0f172a',
                        margin: '0 0 4px',
                        letterSpacing: '-0.3px',
                    }}
                >
                    Set New Password
                </h2>
                <p
                    style={{
                        fontSize: 12.5,
                        color: '#94a3b8',
                        fontWeight: 500,
                        margin: 0,
                    }}
                >
                    Must meet all requirements below
                </p>
            </div>
            <form
                onSubmit={submit}
                noValidate
                style={{ display: 'flex', flexDirection: 'column', gap: 14 }}
            >
                <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                    <label style={lbl}>New Password</label>
                    <div style={iBox(focus === 'n', !!errs.np)}>
                        <LockIcon />
                        <input
                            type={show.n ? 'text' : 'password'}
                            value={form.newPassword}
                            onChange={handle('newPassword')}
                            onFocus={() => setFocus('n')}
                            onBlur={() => setFocus(null)}
                            placeholder="Create a strong password"
                            style={{ ...iStyle, letterSpacing: show.n ? 'normal' : '2px' }}
                        />
                        <button
                            type="button"
                            onClick={() => setShow((s) => ({ ...s, n: !s.n }))}
                            style={{
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                padding: 3,
                                borderRadius: 5,
                                display: 'flex',
                            }}
                        >
                            {show.n ? <EyeOpen /> : <EyeOff />}
                        </button>
                    </div>
                    {touched && <PwStrength pw={form.newPassword} />}
                    {errs.np && <span style={errStyle}>{errs.np}</span>}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                    <label style={lbl}>Confirm Password</label>
                    <div style={iBox(focus === 'c', !!errs.cp)}>
                        <LockIcon />
                        <input
                            type={show.c ? 'text' : 'password'}
                            value={form.confirmPassword}
                            onChange={handle('confirmPassword')}
                            onFocus={() => setFocus('c')}
                            onBlur={() => setFocus(null)}
                            placeholder="Re-enter your password"
                            style={{ ...iStyle, letterSpacing: show.c ? 'normal' : '2px' }}
                        />
                        <button
                            type="button"
                            onClick={() => setShow((s) => ({ ...s, c: !s.c }))}
                            style={{
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                padding: 3,
                                borderRadius: 5,
                                display: 'flex',
                            }}
                        >
                            {show.c ? <EyeOpen /> : <EyeOff />}
                        </button>
                    </div>
                    {form.confirmPassword.length > 0 && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                            <div
                                style={{
                                    width: 7,
                                    height: 7,
                                    borderRadius: '50%',
                                    background:
                                        form.newPassword === form.confirmPassword
                                            ? '#22c55e'
                                            : '#ef4444',
                                }}
                            />
                            <span
                                style={{
                                    fontSize: 11.5,
                                    fontWeight: 600,
                                    color:
                                        form.newPassword === form.confirmPassword
                                            ? '#22c55e'
                                            : '#ef4444',
                                }}
                            >
                                {form.newPassword === form.confirmPassword
                                    ? 'Passwords match'
                                    : 'Passwords do not match'}
                            </span>
                        </div>
                    )}
                    {errs.cp && <span style={errStyle}>{errs.cp}</span>}
                </div>
                <div style={{ marginTop: 2 }}>
                    <PBtn loading={loading} disabled={s < 5}>
                        Reset Password <ArrowIcon />
                    </PBtn>
                </div>
            </form>
        </>
    );
};

/* ════════════════════════════════════════════════════════
   SUCCESS SCREEN
════════════════════════════════════════════════════════ */
const PasswordSuccessFormScreen = ({ onLogin }: { onLogin: () => void }) => (
    <div style={{ textAlign: 'center', padding: '8px 0' }}>
        <div
            style={{
                width: 80,
                height: 80,
                borderRadius: '50%',
                background: '#F0FDF4',
                border: '2px solid #bbf7d0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px',
            }}
        >
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
                <path
                    d="M20 6L9 17l-5-5"
                    stroke="#16a34a"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        </div>
        <h2
            style={{
                fontSize: 22,
                fontWeight: 900,
                color: '#0f172a',
                margin: '0 0 8px',
                letterSpacing: '-0.3px',
            }}
        >
            Password Reset!
        </h2>
        <p
            style={{
                fontSize: 13.5,
                color: '#64748b',
                margin: '0 0 28px',
                lineHeight: 1.65,
            }}
        >
            Your password has been successfully reset.
            <br />
            You can now log in with your new password.
        </p>
        <PBtn onClick={onLogin} type="button">
            Back to Login <ArrowIcon />
        </PBtn>
    </div>
);

/* ════════════════════════════════════════════════════════
   ROOT — exported, receives onLogin callback
════════════════════════════════════════════════════════ */
interface Props {
    onLogin: (user: UserInfo) => void;
}

export const LoginScreen = ({ onLogin }: Props) => {
    const [screen, setScreen] = useState<Screen>('login');
    const [resetEmail, setResetEmail] = useState('');

    return (
        <div className="login-root">
            <LeftPanel />

            {/* Right side */}
            <div className="login-right">
                {/* Topbar */}
                <div className="login-topbar">
                    {['Support', 'Documentation'].map((link) => (
                        <a
                            key={link}
                            href="#"
                            style={{
                                fontSize: 13,
                                fontWeight: 500,
                                color: '#64748b',
                                textDecoration: 'none',
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.color = '#7C3AED')}
                            onMouseLeave={(e) => (e.currentTarget.style.color = '#64748b')}
                        >
                            {link}
                        </a>
                    ))}
                </div>

                {/* Form area */}
                <div
                    className="login-card-container"
                    style={{
                        flex: 1,
                        overflowY: 'auto',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '20px 40px',
                    }}
                >
                    <div style={{ width: '100%', maxWidth: 420 }}>
                        {/* Card */}
                        <div
                            style={{
                                background: 'white',
                                borderRadius: 18,
                                border: '1px solid #eef0f5',
                                boxShadow:
                                    '0 4px 28px rgba(124,58,237,0.07),0 1px 4px rgba(0,0,0,0.04)',
                                padding: '32px 36px 28px',
                            }}
                        >
                            {screen === 'login' && (
                                <LoginFormScreen
                                    onForgot={() => setScreen('forgot')}
                                    onSuccess={onLogin}
                                />
                            )}
                            {screen === 'forgot' && (
                                <ForgotFormScreen
                                    onBack={() => setScreen('login')}
                                    onSent={(e) => {
                                        setResetEmail(e);
                                        setScreen('otp');
                                    }}
                                />
                            )}
                            {screen === 'otp' && (
                                <OtpFormScreen
                                    email={resetEmail}
                                    onBack={() => setScreen('forgot')}
                                    onVerified={() => setScreen('reset')}
                                />
                            )}
                            {screen === 'reset' && (
                                <ResetFormScreen onDone={() => setScreen('success')} />
                            )}
                            {screen === 'success' && (
                                <PasswordSuccessFormScreen onLogin={() => setScreen('login')} />
                            )}
                        </div>

                        <p
                            style={{
                                textAlign: 'center',
                                fontSize: 11.5,
                                color: '#94a3b8',
                                fontWeight: 500,
                                marginTop: 16,
                                lineHeight: 1.8,
                            }}
                        >
                            © 2026 VanLoka. All rights reserved. · Protected by 256-bit encryption.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginScreen;
