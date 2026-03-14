import React, { useState } from 'react';
import {
    User, Mail, Phone, Globe, Camera, Eye, EyeOff,
    Bell, Lock, Save, ShieldCheck, CheckCircle2, AlertTriangle,
    Settings, MessageSquare, Smartphone, BarChart3
} from 'lucide-react';
import { motion } from 'framer-motion';

/* ─── Types ──────────────────────────────────────────────── */
interface ProfileForm {
    fullName: string;
    email: string;
    phone: string;
    timezone: string;
}

interface NotifPrefs {
    emailAlerts: boolean;
    smsAlerts: boolean;
    pushNotifs: boolean;
    weeklyReport: boolean;
}

interface PwForm {
    current: string;
    next: string;
    confirm: string;
}

/* ─── Helpers ────────────────────────────────────────────── */
const inputCls =
    'w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm font-medium text-slate-800 ' +
    'placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 ' +
    'hover:border-slate-300 transition-all duration-200 shadow-sm';

const Card = ({ children }: { children: React.ReactNode }) => (
    <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.22, ease: 'easeOut' }}
        className="bg-white rounded-2xl border border-slate-100 shadow-md shadow-slate-100/80 p-6 sm:p-7"
    >
        {children}
    </motion.div>
);

const SectionTitle = ({
    icon,
    title,
    subtitle,
}: {
    icon: React.ReactNode;
    title: string;
    subtitle: string;
}) => (
    <div className="flex items-center gap-3.5 mb-6 pb-5 border-b border-slate-100">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-indigo-500/25">
            {icon}
        </div>
        <div>
            <h2 className="text-base font-black text-slate-800 tracking-tight">{title}</h2>
            <p className="text-xs text-slate-400 font-medium mt-0.5">{subtitle}</p>
        </div>
    </div>
);

const Label = ({ children }: { children: React.ReactNode }) => (
    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
        {children}
    </label>
);

const Toast = ({ msg, ok }: { msg: string; ok: boolean }) => (
    <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold mt-4 ${ok
            ? 'bg-emerald-50 border border-emerald-200 text-emerald-700'
            : 'bg-red-50 border border-red-200 text-red-700'
            }`}
    >
        {ok ? <CheckCircle2 size={15} /> : <AlertTriangle size={15} />}
        {msg}
    </motion.div>
);

/* ─── Main Component ─────────────────────────────────────── */
export const SettingsPage: React.FC = () => {
    /* Profile state */
    const [profile, setProfile] = useState<ProfileForm>({
        fullName: 'Admin User',
        email: 'admin@vanloka.com',
        phone: '+91 9876543210',
        timezone: 'Asia/Kolkata',
    });
    const [profileMsg, setProfileMsg] = useState<{ text: string; ok: boolean } | null>(null);
    const [profileDirty, setProfileDirty] = useState(false);

    function setP(key: keyof ProfileForm, val: string) {
        setProfile(p => ({ ...p, [key]: val }));
        setProfileDirty(true);
        setProfileMsg(null);
    }

    function handleSaveProfile(e: React.FormEvent) {
        e.preventDefault();
        if (!profile.fullName.trim() || !profile.email.trim()) {
            setProfileMsg({ text: 'Full name and email are required.', ok: false });
            return;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profile.email)) {
            setProfileMsg({ text: 'Please enter a valid email address.', ok: false });
            return;
        }
        /* TODO: call API — PATCH /api/admin/profile */
        setProfileDirty(false);
        setProfileMsg({ text: 'Profile saved successfully!', ok: true });
    }

    /* Notification prefs state */
    const [notifs, setNotifs] = useState<NotifPrefs>({
        emailAlerts: true,
        smsAlerts: false,
        pushNotifs: true,
        weeklyReport: true,
    });
    const [notifMsg, setNotifMsg] = useState<{ text: string; ok: boolean } | null>(null);

    function toggleNotif(key: keyof NotifPrefs) {
        setNotifs(n => ({ ...n, [key]: !n[key] }));
        setNotifMsg(null);
    }

    function handleSaveNotifs(e: React.FormEvent) {
        e.preventDefault();
        /* TODO: call API — PATCH /api/admin/notifications */
        setNotifMsg({ text: 'Preferences saved!', ok: true });
    }

    /* Security state */
    const [pw, setPw] = useState<PwForm>({ current: '', next: '', confirm: '' });
    const [showPw, setShowPw] = useState({ current: false, next: false, confirm: false });
    const [pwMsg, setPwMsg] = useState<{ text: string; ok: boolean } | null>(null);

    function setPassword(key: keyof PwForm, val: string) {
        setPw(p => ({ ...p, [key]: val }));
        setPwMsg(null);
    }

    function handleChangePassword(e: React.FormEvent) {
        e.preventDefault();
        if (!pw.current) { setPwMsg({ text: 'Current password is required.', ok: false }); return; }
        if (pw.next.length < 8) { setPwMsg({ text: 'New password must be at least 8 characters.', ok: false }); return; }
        if (pw.next !== pw.confirm) { setPwMsg({ text: 'Passwords do not match.', ok: false }); return; }
        /* TODO: call API — POST /api/admin/change-password */
        setPw({ current: '', next: '', confirm: '' });
        setPwMsg({ text: 'Password changed successfully!', ok: true });
    }

    /* Password strength */
    const strength = (() => {
        const p = pw.next;
        if (!p) return 0;
        let s = 0;
        if (p.length >= 8) s++;
        if (/[A-Z]/.test(p)) s++;
        if (/[0-9]/.test(p)) s++;
        if (/[^A-Za-z0-9]/.test(p)) s++;
        return s;
    })();

    const strengthLabel = ['', 'Weak', 'Fair', 'Good', 'Strong'][strength];
    const strengthColors = ['', 'bg-red-400', 'bg-amber-400', 'bg-blue-400', 'bg-emerald-400'];

    const timezones = [
        'Asia/Kolkata',
        'Asia/Dubai',
        'Asia/Singapore',
        'Europe/London',
        'America/New_York',
        'America/Los_Angeles',
        'UTC',
    ];

    const PwInput = ({
        field,
        placeholder,
        label,
    }: {
        field: keyof PwForm;
        placeholder: string;
        label: string;
    }) => (
        <div>
            <Label>{label}</Label>
            <div className="relative">
                <Lock size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                    type={showPw[field] ? 'text' : 'password'}
                    value={pw[field]}
                    onChange={e => setPassword(field, e.target.value)}
                    placeholder={placeholder}
                    className={`${inputCls} pl-10 pr-10`}
                />
                <button
                    type="button"
                    onClick={() => setShowPw(s => ({ ...s, [field]: !s[field] }))}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                    {showPw[field] ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
            </div>
        </div>
    );

    const ToggleRow = ({
        icon,
        label,
        desc,
        checked,
        onChange,
    }: {
        icon: React.ReactNode;
        label: string;
        desc: string;
        checked: boolean;
        onChange: () => void;
    }) => (
        <div className="flex items-center justify-between py-3.5 border-b border-slate-50 last:border-0">
            <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${checked ? 'bg-indigo-50 text-indigo-600' : 'bg-slate-100 text-slate-400'}`}>
                    {icon}
                </div>
                <div>
                    <p className="text-sm font-bold text-slate-800">{label}</p>
                    <p className="text-xs text-slate-400 font-medium">{desc}</p>
                </div>
            </div>
            <button
                type="button"
                onClick={onChange}
                className={`relative w-11 h-6 rounded-full transition-all duration-300 flex-shrink-0 ${checked ? 'bg-indigo-600' : 'bg-slate-200'}`}
            >
                <span
                    className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-md transition-all duration-300 ${checked ? 'left-[22px]' : 'left-0.5'}`}
                />
            </button>
        </div>
    );

    /* ── RENDER ──────────────────────────────────────────── */
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-100 via-slate-50 to-indigo-50/40">
            <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-6">

                {/* Page Header */}
                <div className="mb-2">
                    <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
                            <Settings size={15} className="text-white" />
                        </div>
                        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Settings</h1>
                    </div>
                    <p className="text-sm text-slate-500 font-medium ml-10">Manage your profile, notifications, and security.</p>
                </div>

                {/* ── PROFILE ──────────────────────────────── */}
                <Card>
                    <SectionTitle
                        icon={<User size={18} className="text-white" />}
                        title="Profile Settings"
                        subtitle="Update your personal information"
                    />
                    <form onSubmit={handleSaveProfile} className="space-y-4">
                        {/* Avatar */}
                        <div className="flex items-center gap-5 mb-2">
                            <div className="relative flex-shrink-0">
                                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/25">
                                    <span className="text-white text-xl font-black">
                                        {profile.fullName.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()}
                                    </span>
                                </div>
                                <button
                                    type="button"
                                    className="absolute -bottom-1.5 -right-1.5 w-7 h-7 bg-indigo-600 text-white rounded-lg shadow-md flex items-center justify-center hover:bg-indigo-700 transition-colors active:scale-90"
                                >
                                    <Camera size={12} />
                                </button>
                            </div>
                            <div>
                                <p className="text-sm font-black text-slate-800">{profile.fullName || 'Admin User'}</p>
                                <p className="text-xs text-slate-400 font-medium mt-0.5">Click the camera to change photo</p>
                            </div>
                        </div>

                        <div>
                            <Label>Full Name</Label>
                            <div className="relative">
                                <User size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                                <input
                                    type="text"
                                    value={profile.fullName}
                                    onChange={e => setP('fullName', e.target.value)}
                                    placeholder="Your full name"
                                    className={`${inputCls} pl-10`}
                                />
                            </div>
                        </div>

                        <div>
                            <Label>Email</Label>
                            <div className="relative">
                                <Mail size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                                <input
                                    type="email"
                                    value={profile.email}
                                    onChange={e => setP('email', e.target.value)}
                                    placeholder="you@example.com"
                                    className={`${inputCls} pl-10`}
                                />
                            </div>
                        </div>

                        <div>
                            <Label>Phone</Label>
                            <div className="relative">
                                <Phone size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                                <input
                                    type="tel"
                                    value={profile.phone}
                                    onChange={e => setP('phone', e.target.value)}
                                    placeholder="+91 9876543210"
                                    className={`${inputCls} pl-10`}
                                />
                            </div>
                        </div>

                        <div>
                            <Label>Timezone</Label>
                            <div className="relative">
                                <Globe size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                                <select
                                    value={profile.timezone}
                                    onChange={e => setP('timezone', e.target.value)}
                                    className={`${inputCls} pl-10 appearance-none`}
                                >
                                    {timezones.map(tz => (
                                        <option key={tz} value={tz}>{tz}{tz === 'Asia/Kolkata' ? ' (IST)' : ''}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {profileMsg && <Toast msg={profileMsg.text} ok={profileMsg.ok} />}

                        <button
                            type="submit"
                            disabled={!profileDirty}
                            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-black text-white bg-gradient-to-r from-indigo-600 to-violet-600 shadow-lg shadow-indigo-500/25 hover:shadow-xl hover:shadow-indigo-500/35 hover:from-indigo-700 hover:to-violet-700 transition-all active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:shadow-lg"
                        >
                            <Save size={14} /> Save Profile
                        </button>
                    </form>
                </Card>

                {/* ── NOTIFICATIONS ────────────────────────── */}
                <Card>
                    <SectionTitle
                        icon={<Bell size={18} className="text-white" />}
                        title="Notification Preferences"
                        subtitle="Choose how you receive platform alerts"
                    />
                    <form onSubmit={handleSaveNotifs}>
                        <ToggleRow
                            icon={<Mail size={16} />}
                            label="Email Alerts"
                            desc="Receive alerts and summaries via email"
                            checked={notifs.emailAlerts}
                            onChange={() => toggleNotif('emailAlerts')}
                        />
                        <ToggleRow
                            icon={<MessageSquare size={16} />}
                            label="SMS Alerts"
                            desc="Critical alerts delivered as SMS"
                            checked={notifs.smsAlerts}
                            onChange={() => toggleNotif('smsAlerts')}
                        />
                        <ToggleRow
                            icon={<Smartphone size={16} />}
                            label="Push Notifications"
                            desc="In-app and browser push notifications"
                            checked={notifs.pushNotifs}
                            onChange={() => toggleNotif('pushNotifs')}
                        />
                        <ToggleRow
                            icon={<BarChart3 size={16} />}
                            label="Weekly Report"
                            desc="Receive a weekly fleet summary email"
                            checked={notifs.weeklyReport}
                            onChange={() => toggleNotif('weeklyReport')}
                        />

                        {notifMsg && <Toast msg={notifMsg.text} ok={notifMsg.ok} />}

                        <button
                            type="submit"
                            className="w-full flex items-center justify-center gap-2 py-2.5 mt-5 rounded-xl text-sm font-black text-white bg-gradient-to-r from-indigo-600 to-violet-600 shadow-lg shadow-indigo-500/25 hover:shadow-xl hover:shadow-indigo-500/35 hover:from-indigo-700 hover:to-violet-700 transition-all active:scale-[0.98]"
                        >
                            <Save size={14} /> Save Preferences
                        </button>
                    </form>
                </Card>

                {/* ── SECURITY ─────────────────────────────── */}
                <Card>
                    <SectionTitle
                        icon={<ShieldCheck size={18} className="text-white" />}
                        title="Security"
                        subtitle="Change your account password"
                    />
                    <form onSubmit={handleChangePassword} className="space-y-4">
                        <PwInput field="current" label="Current Password" placeholder="Enter current password" />
                        <PwInput field="next" label="New Password" placeholder="At least 8 characters" />

                        {/* Strength bar */}
                        {pw.next && (
                            <div>
                                <div className="flex gap-1 mb-1">
                                    {[1, 2, 3, 4].map(i => (
                                        <div
                                            key={i}
                                            className={`flex-1 h-1.5 rounded-full transition-all duration-300 ${i <= strength ? strengthColors[strength] : 'bg-slate-100'}`}
                                        />
                                    ))}
                                </div>
                                <p className={`text-[11px] font-bold ${['', 'text-red-500', 'text-amber-500', 'text-blue-500', 'text-emerald-500'][strength]}`}>
                                    {strengthLabel} password
                                </p>
                            </div>
                        )}

                        <PwInput field="confirm" label="Confirm New Password" placeholder="Re-enter new password" />

                        {pw.next && pw.confirm && pw.next !== pw.confirm && (
                            <p className="text-[11px] text-red-500 font-bold flex items-center gap-1">
                                <AlertTriangle size={11} /> Passwords do not match
                            </p>
                        )}

                        {pwMsg && <Toast msg={pwMsg.text} ok={pwMsg.ok} />}

                        <button
                            type="submit"
                            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-black text-white bg-gradient-to-r from-indigo-600 to-violet-600 shadow-lg shadow-indigo-500/25 hover:shadow-xl hover:shadow-indigo-500/35 hover:from-indigo-700 hover:to-violet-700 transition-all active:scale-[0.98]"
                        >
                            <Lock size={14} /> Change Password
                        </button>
                    </form>
                </Card>

            </div>
        </div>
    );
};
