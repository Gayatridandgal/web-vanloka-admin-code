import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Check, X, User, Edit2, CheckCircle2,
    Mail, MessageSquare, Bell, Calendar,
    Shield, Lock, Monitor, Smartphone, LogOut,
    Eye, EyeOff
} from 'lucide-react';/* ─── Types ──────────────────────────────── */
interface ProfileForm { fullName: string; email: string; phone: string; timezone: string; }
interface NotifPrefs { emailAlerts: boolean; smsAlerts: boolean; pushNotifs: boolean; weeklyReport: boolean; }
interface PwForm { current: string; next: string; confirm: string; }
interface SessionInfo { device: string; location: string; time: string; current: boolean; }

const SESSIONS: SessionInfo[] = [
    { device: 'Chrome · Windows 11', location: 'Mumbai, IN', time: 'Active now', current: true },
    { device: 'Safari · iPhone 15', location: 'Delhi, IN', time: '2 hours ago', current: false },
    { device: 'Firefox · MacOS', location: 'Bengaluru, IN', time: 'Yesterday, 14:30', current: false },
];

const TIMEZONES = ['Asia/Kolkata', 'Asia/Dubai', 'Asia/Singapore', 'Europe/London', 'America/New_York', 'UTC'];

/* ─── Styles ─────────────────────────────── */
const inputCls =
    'w-full px-4 py-3 bg-white/50 backdrop-blur-sm border border-gray-200/50 rounded-xl text-sm text-gray-800 ' +
    'placeholder:text-gray-400 outline-none focus:ring-4 focus:ring-violet-500/10 focus:border-violet-400 transition-all font-[DM_Sans] shadow-sm';

const cardCls =
    'bg-white/70 backdrop-blur-md border border-white/40 rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.04)] overflow-hidden transition-all';

/* ─── Helpers ────────────────────────────── */
function Toast({ msg, ok, onClose }: { msg: string; ok: boolean; onClose: () => void }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold mt-4 shadow-sm ${ok
                ? 'bg-emerald-50 border-[1.5px] border-emerald-200 text-emerald-700'
                : 'bg-red-50 border-[1.5px] border-red-100 text-red-600'}`}
        >
            {ok ? <CheckCircle2 size={18} /> : <X size={18} />}
            <span className="flex-1">{msg}</span>
            <button onClick={onClose} className="opacity-50 hover:opacity-100 transition-opacity p-1 hover:bg-black/5 rounded-md">
                <X size={14} />
            </button>
        </motion.div>
    );
}

function Field({ label, value }: { label: string; value: string }) {
    return (
        <div className="p-3.5 bg-gray-50/50 rounded-xl border border-gray-100 transition-colors hover:bg-gray-50">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.08em] mb-1">{label}</p>
            <p className="text-[13px] font-medium text-gray-800 font-mono">{value || '—'}</p>
        </div>
    );
}

function SectionCard({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) {
    return (
        <motion.div
            layout
            className={cardCls + " hover:shadow-[0_8px_32px_rgba(124,58,237,0.08)] hover:border-violet-200/50 transition-all duration-500"}
        >
            <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100/50 bg-gradient-to-r from-violet-500/[0.03] to-transparent">
                <div className="w-8 h-8 flex items-center justify-center bg-violet-50 border border-violet-100/50 rounded-xl text-violet-600 flex-shrink-0 shadow-sm">
                    {icon}
                </div>
                <h2 className="text-[15px] font-bold text-gray-900 tracking-tight">{title}</h2>
            </div>
            <div className="p-6">{children}</div>
        </motion.div>
    );
}

function EditBtn({ onClick, label = 'Edit' }: { onClick: () => void; label?: string }) {
    return (
        <motion.button
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.98 }}
            type="button"
            onClick={onClick}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-violet-600 bg-violet-50 hover:bg-violet-100 transition-colors"
        >
            <Edit2 size={12} />
            {label}
        </motion.button>
    );
}

function ActionRow({ onCancel }: { onCancel: () => void }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 mt-6 pt-5 border-t border-gray-100/50"
        >
            <motion.button
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-[13px] font-bold text-white bg-gradient-to-br from-violet-500 to-violet-700 shadow-[0_4px_14px_rgba(124,58,237,0.25)] hover:shadow-[0_6px_20px_rgba(124,58,237,0.35)]"
            >
                <Check size={16} />
                Save Changes
            </motion.button>
            <motion.button
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={onCancel}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-[13px] font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors"
            >
                <X size={16} />
                Cancel
            </motion.button>
        </motion.div>
    );
}

/* ════════════════════════════════════════════
   MAIN
════════════════════════════════════════════ */
export const SettingsPage: React.FC = () => {

    const [activeTab, setActiveTab] = useState<'profile' | 'security' | 'notifications' | 'sessions'>('profile');

    /* ── Profile ── */
    const [profile, setProfile] = useState<ProfileForm>({
        fullName: 'Admin User', email: 'admin@vanloka.com',
        phone: '+91 9876543210', timezone: 'Asia/Kolkata',
    });
    const [editingProfile, setEditingProfile] = useState(false);
    const [profileDraft, setProfileDraft] = useState<ProfileForm>(profile);
    const [profileMsg, setProfileMsg] = useState<{ text: string; ok: boolean } | null>(null);

    function openProfileEdit() { setProfileDraft(profile); setProfileMsg(null); setEditingProfile(true); }
    function cancelProfileEdit() { setEditingProfile(false); setProfileMsg(null); }
    function saveProfile(e: React.FormEvent) {
        e.preventDefault();
        if (!profileDraft.fullName.trim() || !profileDraft.email.trim()) {
            setProfileMsg({ text: 'Name and email are required.', ok: false }); return;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profileDraft.email)) {
            setProfileMsg({ text: 'Please enter a valid email address.', ok: false }); return;
        }
        setProfile(profileDraft);
        setEditingProfile(false);
        setProfileMsg({ text: 'Profile updated successfully.', ok: true });
    }

    /* ── Notifications ── */
    const [notifs, setNotifs] = useState<NotifPrefs>({ emailAlerts: true, smsAlerts: false, pushNotifs: true, weeklyReport: true });
    const [editingNotifs, setEditingNotifs] = useState(false);
    const [notifDraft, setNotifDraft] = useState<NotifPrefs>(notifs);
    const [notifMsg, setNotifMsg] = useState<{ text: string; ok: boolean } | null>(null);

    function openNotifEdit() { setNotifDraft(notifs); setNotifMsg(null); setEditingNotifs(true); }
    function cancelNotifEdit() { setEditingNotifs(false); setNotifMsg(null); }
    function saveNotifs(e: React.FormEvent) {
        e.preventDefault();
        setNotifs(notifDraft);
        setEditingNotifs(false);
        setNotifMsg({ text: 'Notification preferences saved.', ok: true });
    }

    /* ── Password ── */
    const [editingPw, setEditingPw] = useState(false);
    const [pw, setPw] = useState<PwForm>({ current: '', next: '', confirm: '' });
    const [showPw, setShowPw] = useState({ current: false, next: false, confirm: false });
    const [pwMsg, setPwMsg] = useState<{ text: string; ok: boolean } | null>(null);

    function openPwEdit() { setPw({ current: '', next: '', confirm: '' }); setPwMsg(null); setEditingPw(true); }
    function cancelPwEdit() { setEditingPw(false); setPwMsg(null); }
    function savePw(e: React.FormEvent) {
        e.preventDefault();
        if (!pw.current) { setPwMsg({ text: 'Current password is required.', ok: false }); return; }
        if (pw.next.length < 8) { setPwMsg({ text: 'New password must be at least 8 characters.', ok: false }); return; }
        if (pw.next !== pw.confirm) { setPwMsg({ text: 'Passwords do not match.', ok: false }); return; }
        setPw({ current: '', next: '', confirm: '' });
        setEditingPw(false);
        setPwMsg({ text: 'Password changed successfully.', ok: true });
    }

    /* ── Sessions ── */
    const [sessions, setSessions] = useState<SessionInfo[]>(SESSIONS);

    /* ── Password strength ── */
    const strength = (() => {
        const p = pw.next; if (!p) return 0; let s = 0;
        if (p.length >= 8) s++; if (/[A-Z]/.test(p)) s++; if (/[0-9]/.test(p)) s++; if (/[^A-Za-z0-9]/.test(p)) s++;
        return s;
    })();
    const strengthColorMap = ['', 'bg-red-400', 'bg-amber-400', 'bg-blue-400', 'bg-emerald-500'];
    const strengthLabel = ['', 'Weak', 'Fair', 'Good', 'Strong'][strength];

    const initials = profile.fullName.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();

    /* ── Sub-components ── */
    function PwInput({ field, label, placeholder }: { field: keyof PwForm; label: string; placeholder: string }) {
        return (
            <div>
                <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-[0.07em] mb-1.5">{label}</label>
                <div className="relative">
                    <input
                        type={showPw[field] ? 'text' : 'password'}
                        value={pw[field]}
                        onChange={e => { setPw(p => ({ ...p, [field]: e.target.value })); setPwMsg(null); }}
                        placeholder={placeholder}
                        className={`${inputCls} pr-10 ${field === 'confirm' && pw.next && pw.confirm && pw.next !== pw.confirm ? 'border-red-400 focus:ring-red-500/20' : ''}`}
                    />
                    <button type="button"
                        onClick={() => setShowPw(s => ({ ...s, [field]: !s[field] }))}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors">
                        {showPw[field] ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                </div>
            </div>
        );
    }

    function NotifToggle({ label, desc, icon, field }: { label: string; desc: string; icon: React.ReactNode; field: keyof NotifPrefs }) {
        const val = notifDraft[field];
        return (
            <div className={`flex items-center justify-between p-3 rounded-xl border transition-all ${val ? 'border-violet-100 bg-violet-50/30' : 'border-gray-100 bg-gray-50/60 hover:bg-white hover:border-gray-200'}`}>
                <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 flex items-center justify-center rounded-lg transition-all ${val ? 'bg-violet-50 text-violet-600 border border-violet-100' : 'bg-gray-100 text-gray-400'}`}>
                        {icon}
                    </div>
                    <div>
                        <p className="text-[13px] font-semibold text-gray-800">{label}</p>
                        <p className="text-[11px] text-gray-400 mt-0.5">{desc}</p>
                    </div>
                </div>
                <button type="button"
                    onClick={() => setNotifDraft(n => ({ ...n, [field]: !n[field] }))}
                    className={`relative w-10 h-[22px] rounded-full transition-all flex-shrink-0 ${val ? 'bg-gradient-to-br from-violet-500 to-violet-700' : 'bg-gray-200'}`}>
                    <span className={`absolute top-[3px] w-4 h-4 bg-white rounded-full shadow-[0_1px_3px_rgba(0,0,0,0.2)] transition-all duration-200 ${val ? 'left-[21px]' : 'left-[3px]'}`} />
                </button>
            </div>
        );
    }

    const navItems = [
        { id: 'profile', label: 'Profile', icon: <User size={18} /> },
        { id: 'security', label: 'Security', icon: <Shield size={18} /> },
        { id: 'notifications', label: 'Notifications', icon: <Bell size={18} /> },
        { id: 'sessions', label: 'Sessions', icon: <Monitor size={18} /> },
    ];

    return (
        <div className="min-h-screen bg-[#f8f9fd] flex flex-col w-full relative overflow-hidden" style={{
            backgroundImage: `
                radial-gradient(circle at 10% 20%, rgba(124,58,237,0.05) 0%, transparent 40%),
                radial-gradient(circle at 90% 80%, rgba(139,92,246,0.04) 0%, transparent 40%),
                radial-gradient(circle at 50% 50%, rgba(255,255,255,0.8) 0%, transparent 100%)
            `
        }}>
            {/* Animated Background Blobs */}
            <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] bg-violet-200/20 rounded-full blur-[120px] pointer-events-none animate-pulse" />
            <div className="absolute bottom-[-5%] right-[-5%] w-[35%] h-[35%] bg-indigo-200/20 rounded-full blur-[120px] pointer-events-none" />

            <div className="relative flex flex-col h-screen overflow-hidden">
                {/* ── HEADER ── */}
                <header className="flex-shrink-0 px-6 py-5 border-b border-gray-200/50 flex items-center justify-between bg-white/40 backdrop-blur-xl z-20">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-violet-600 to-indigo-600 flex items-center justify-center text-white shadow-lg">
                            <Shield size={22} className="opacity-90" />
                        </div>
                        <div>
                            <h1 className="text-xl font-extrabold text-gray-900 tracking-tight leading-none">Settings</h1>
                            <p className="text-xs text-gray-500 mt-1 font-medium font-[DM_Sans]">Manage your workspace preferences</p>
                        </div>
                    </div>

                    <div className="hidden sm:flex items-center gap-3 p-1 bg-gray-100/50 border border-gray-200/50 rounded-2xl backdrop-blur-sm">
                        <div className="px-3 py-1.5 text-[11px] font-bold text-gray-600 font-mono flex items-center gap-2">
                            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.4)]" />
                            {profile.email}
                        </div>
                    </div>
                </header>

                <div className="flex flex-1 overflow-hidden relative">
                    {/* ── SIDE NAVIGATION ── */}
                    <aside className="w-72 flex-shrink-0 border-r border-gray-200/50 bg-white/20 backdrop-blur-md hidden lg:flex flex-col p-6 space-y-2 z-10">
                        <div className="mb-4 px-2">
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Configuration</p>
                        </div>
                        {navItems.map(item => (
                            <button
                                key={item.id}
                                onClick={() => setActiveTab(item.id as any)}
                                className={`group flex items-center gap-3.5 px-4 py-3.5 rounded-2xl text-[13px] font-bold transition-all duration-300 relative ${activeTab === item.id
                                    ? 'text-violet-700 bg-white shadow-[0_4px_20px_rgba(124,58,237,0.12)] border border-violet-100'
                                    : 'text-gray-500 hover:text-gray-900 hover:bg-white/50'
                                    }`}
                            >
                                <span className={`transition-transform duration-300 ${activeTab === item.id ? 'scale-110 text-violet-600' : 'group-hover:scale-110'}`}>
                                    {item.icon}
                                </span>
                                {item.label}
                                {activeTab === item.id && (
                                    <motion.div
                                        layoutId="active-pill"
                                        className="absolute left-[-2px] w-1.5 h-6 bg-violet-600 rounded-full shadow-[2px_0_10px_rgba(124,58,237,0.4)]"
                                    />
                                )}
                            </button>
                        ))}
                    </aside>

                    {/* ── MAIN CONTENT ── */}
                    <main className="flex-1 overflow-y-auto overflow-x-hidden p-4 sm:p-8 lg:p-12 scrollbar-hide">
                        <div className="max-w-4xl mx-auto space-y-8 pb-12">

                            {/* Mobile Navigation Pills */}
                            <div className="lg:hidden flex gap-2 overflow-x-auto pb-4 scrollbar-hide mask-fade-edges">
                                {navItems.map(item => (
                                    <button
                                        key={item.id}
                                        onClick={() => setActiveTab(item.id as any)}
                                        className={`whitespace-nowrap px-5 py-2.5 rounded-full text-[12px] font-bold transition-all border ${activeTab === item.id
                                            ? 'bg-violet-600 text-white border-violet-500 shadow-md'
                                            : 'bg-white text-gray-500 border-gray-200 shadow-sm'
                                            }`}
                                    >
                                        {item.label}
                                    </button>
                                ))}
                            </div>

                            <AnimatePresence mode="wait">
                                {activeTab === 'profile' && (
                                    <motion.div
                                        key="profile"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        transition={{ duration: 0.3 }}
                                        className="space-y-6"
                                    >
                                        <SectionCard title="Personal Profile" icon={<User size={18} />}>
                                            <AnimatePresence mode="popLayout">
                                                {!editingProfile ? (
                                                    <motion.div key="view" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                                        <div className="flex items-center justify-between mb-8 group">
                                                            <div className="flex items-center gap-5">
                                                                <div className="w-16 h-16 rounded-[24px] bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white text-xl font-black shadow-[0_10px_25px_rgba(99,102,241,0.3)] border-2 border-white/20 relative group-hover:scale-105 transition-transform duration-500">
                                                                    {initials}
                                                                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-emerald-500 border-2 border-white rounded-full shadow-md flex items-center justify-center">
                                                                        <Check size={12} className="text-white" />
                                                                    </div>
                                                                </div>
                                                                <div>
                                                                    <h3 className="text-xl font-extrabold text-gray-900 tracking-tight">{profile.fullName}</h3>
                                                                    <p className="text-sm text-violet-600 font-bold mt-1 flex items-center gap-1.5 opacity-80 uppercase tracking-tighter">
                                                                        <Shield size={14} />
                                                                        System Administrator
                                                                    </p>
                                                                </div>
                                                            </div>
                                                            <EditBtn onClick={openProfileEdit} />
                                                        </div>
                                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                                            <Field label="Primary Email" value={profile.email} />
                                                            <Field label="Mobile Phone" value={profile.phone} />
                                                            <Field label="System Timezone" value={profile.timezone} />
                                                        </div>
                                                        <AnimatePresence>
                                                            {profileMsg && <Toast msg={profileMsg.text} ok={profileMsg.ok} onClose={() => setProfileMsg(null)} />}
                                                        </AnimatePresence>
                                                    </motion.div>
                                                ) : (
                                                    <motion.form key="edit" onSubmit={saveProfile} className="space-y-6">
                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                                            <div>
                                                                <label className="block text-[11px] font-black text-gray-400 uppercase tracking-wider mb-2 ml-1">Full Name</label>
                                                                <input type="text" value={profileDraft.fullName} onChange={e => setProfileDraft(p => ({ ...p, fullName: e.target.value }))} className={inputCls} />
                                                            </div>
                                                            <div>
                                                                <label className="block text-[11px] font-black text-gray-400 uppercase tracking-wider mb-2 ml-1">Email Address</label>
                                                                <input type="email" value={profileDraft.email} onChange={e => setProfileDraft(p => ({ ...p, email: e.target.value }))} className={inputCls} />
                                                            </div>
                                                            <div>
                                                                <label className="block text-[11px] font-black text-gray-400 uppercase tracking-wider mb-2 ml-1">Phone</label>
                                                                <input type="tel" value={profileDraft.phone} onChange={e => setProfileDraft(p => ({ ...p, phone: e.target.value }))} className={inputCls} />
                                                            </div>
                                                            <div>
                                                                <label className="block text-[11px] font-black text-gray-400 uppercase tracking-wider mb-2 ml-1">Timezone</label>
                                                                <select value={profileDraft.timezone} onChange={e => setProfileDraft(p => ({ ...p, timezone: e.target.value }))} className={`${inputCls} appearance-none`}>
                                                                    {TIMEZONES.map(tz => <option key={tz}>{tz}</option>)}
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <AnimatePresence>
                                                            {profileMsg && <Toast msg={profileMsg.text} ok={profileMsg.ok} onClose={() => setProfileMsg(null)} />}
                                                        </AnimatePresence>
                                                        <ActionRow onCancel={cancelProfileEdit} />
                                                    </motion.form>
                                                )}
                                            </AnimatePresence>
                                        </SectionCard>
                                    </motion.div>
                                )}

                                {activeTab === 'security' && (
                                    <motion.div
                                        key="security"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        transition={{ duration: 0.3 }}
                                        className="space-y-6"
                                    >
                                        <SectionCard title="Security & Authentication" icon={<Lock size={18} />}>
                                            <AnimatePresence mode="popLayout">
                                                {!editingPw ? (
                                                    <motion.div key="view" className="bg-gray-50/30 p-6 rounded-3xl border border-gray-100 flex items-center justify-between group hover:border-violet-200 transition-colors duration-300">
                                                        <div className="flex items-center gap-5">
                                                            <div className="w-12 h-12 rounded-2xl bg-white shadow-md border border-gray-100 flex items-center justify-center text-violet-600 transition-transform group-hover:rotate-12">
                                                                <Lock size={22} />
                                                            </div>
                                                            <div>
                                                                <h4 className="font-extrabold text-gray-900 tracking-tight">Account Password</h4>
                                                                <p className="text-xs text-gray-500 mt-1 font-medium italic">Secure your account with a strong password</p>
                                                            </div>
                                                        </div>
                                                        <EditBtn onClick={openPwEdit} label="Modify" />
                                                    </motion.div>
                                                ) : (
                                                    <motion.form key="edit" onSubmit={savePw} className="space-y-6">
                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                                            <PwInput field="current" label="Current Passphrase" placeholder="••••••••" />
                                                            <div className="space-y-4">
                                                                <PwInput field="next" label="New Secure Password" placeholder="••••••••" />
                                                                {pw.next && (
                                                                    <div className="bg-white/50 p-4 rounded-2xl border border-gray-100 space-y-2">
                                                                        <div className="flex justify-between text-[11px] font-black uppercase tracking-widest mb-1">
                                                                            <span className="text-gray-400">Strength Indicator</span>
                                                                            <span className={strength === 4 ? 'text-emerald-500' : 'text-violet-500'}>{strengthLabel}</span>
                                                                        </div>
                                                                        <div className="flex gap-1.5">
                                                                            {[1, 2, 3, 4].map(i => (
                                                                                <div key={i} className={`flex-1 h-2 rounded-full transition-all duration-500 ${i <= strength ? strengthColorMap[strength] : 'bg-gray-100'}`} />
                                                                            ))}
                                                                        </div>
                                                                    </div>
                                                                )}
                                                            </div>
                                                            <PwInput field="confirm" label="Verify New Password" placeholder="••••••••" />
                                                        </div>
                                                        <AnimatePresence>
                                                            {pwMsg && <Toast msg={pwMsg.text} ok={pwMsg.ok} onClose={() => setPwMsg(null)} />}
                                                        </AnimatePresence>
                                                        <ActionRow onCancel={cancelPwEdit} />
                                                    </motion.form>
                                                )}
                                            </AnimatePresence>
                                        </SectionCard>
                                    </motion.div>
                                )}

                                {activeTab === 'notifications' && (
                                    <motion.div
                                        key="notifications"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        transition={{ duration: 0.3 }}
                                        className="space-y-6"
                                    >
                                        <SectionCard title="Notification Preferences" icon={<Bell size={18} />}>
                                            <div className="flex justify-between items-center mb-6">
                                                <p className="text-sm font-medium text-gray-500">Configure how you receive important updates</p>
                                                {!editingNotifs && <EditBtn onClick={openNotifEdit} />}
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                {!editingNotifs ? (
                                                    <>
                                                        <div className={`p-5 rounded-3xl border-2 flex items-center justify-between transition-all ${notifs.emailAlerts ? 'bg-violet-50/50 border-violet-100' : 'bg-white border-gray-100'}`}>
                                                            <div className="flex items-center gap-4">
                                                                <div className={`w-11 h-11 rounded-2xl flex items-center justify-center shadow-inner ${notifs.emailAlerts ? 'bg-violet-600 text-white' : 'bg-gray-100 text-gray-400'}`}>
                                                                    <Mail size={20} />
                                                                </div>
                                                                <div>
                                                                    <p className="font-bold text-gray-900">Email Alerts</p>
                                                                    <p className="text-[11px] font-medium text-gray-500">Enabled for critical events</p>
                                                                </div>
                                                            </div>
                                                            <div className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-full ${notifs.emailAlerts ? 'text-violet-700 bg-violet-100' : 'text-gray-400 bg-gray-100'}`}>
                                                                {notifs.emailAlerts ? 'Active' : 'Off'}
                                                            </div>
                                                        </div>
                                                        <div className={`p-5 rounded-3xl border-2 flex items-center justify-between transition-all ${notifs.smsAlerts ? 'bg-indigo-50/50 border-indigo-100' : 'bg-white border-gray-100'}`}>
                                                            <div className="flex items-center gap-4">
                                                                <div className={`w-11 h-11 rounded-2xl flex items-center justify-center shadow-inner ${notifs.smsAlerts ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-400'}`}>
                                                                    <MessageSquare size={20} />
                                                                </div>
                                                                <div>
                                                                    <p className="font-bold text-gray-900">SMS Gateway</p>
                                                                    <p className="text-[11px] font-medium text-gray-500">Alerts via primary mobile</p>
                                                                </div>
                                                            </div>
                                                            <div className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-full ${notifs.smsAlerts ? 'text-indigo-700 bg-indigo-100' : 'text-gray-400 bg-gray-100'}`}>
                                                                {notifs.smsAlerts ? 'Active' : 'Off'}
                                                            </div>
                                                        </div>
                                                        <div className={`p-5 rounded-3xl border-2 flex items-center justify-between transition-all ${notifs.pushNotifs ? 'bg-blue-50/50 border-blue-100' : 'bg-white border-gray-100'}`}>
                                                            <div className="flex items-center gap-4">
                                                                <div className={`w-11 h-11 rounded-2xl flex items-center justify-center shadow-inner ${notifs.pushNotifs ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-400'}`}>
                                                                    <Smartphone size={20} />
                                                                </div>
                                                                <div>
                                                                    <p className="font-bold text-gray-900">Push Delivery</p>
                                                                    <p className="text-[11px] font-medium text-gray-500">In-browser notifications</p>
                                                                </div>
                                                            </div>
                                                            <div className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-full ${notifs.pushNotifs ? 'text-blue-700 bg-blue-100' : 'text-gray-400 bg-gray-100'}`}>
                                                                {notifs.pushNotifs ? 'Active' : 'Off'}
                                                            </div>
                                                        </div>
                                                        <div className={`p-5 rounded-3xl border-2 flex items-center justify-between transition-all ${notifs.weeklyReport ? 'bg-emerald-50/50 border-emerald-100' : 'bg-white border-gray-100'}`}>
                                                            <div className="flex items-center gap-4">
                                                                <div className={`w-11 h-11 rounded-2xl flex items-center justify-center shadow-inner ${notifs.weeklyReport ? 'bg-emerald-600 text-white' : 'bg-gray-100 text-gray-400'}`}>
                                                                    <Calendar size={20} />
                                                                </div>
                                                                <div>
                                                                    <p className="font-bold text-gray-900">Weekly Digest</p>
                                                                    <p className="text-[11px] font-medium text-gray-500">Email summary every Monday</p>
                                                                </div>
                                                            </div>
                                                            <div className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-full ${notifs.weeklyReport ? 'text-emerald-700 bg-emerald-100' : 'text-gray-400 bg-gray-100'}`}>
                                                                {notifs.weeklyReport ? 'Active' : 'Off'}
                                                            </div>
                                                        </div>
                                                    </>
                                                ) : (
                                                    <motion.form key="edit-notifs" onSubmit={saveNotifs} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="col-span-full space-y-4">
                                                        <NotifToggle label="Email Alerts" desc="Alerts and summaries to your email" icon={<Mail size={16} />} field="emailAlerts" />
                                                        <NotifToggle label="SMS Gateway" desc="Critical alerts via primary mobile" icon={<MessageSquare size={16} />} field="smsAlerts" />
                                                        <NotifToggle label="Push Delivery" desc="In-browser and device notifications" icon={<Smartphone size={16} />} field="pushNotifs" />
                                                        <NotifToggle label="Weekly Digest" desc="Fleet summary report every Monday" icon={<Calendar size={16} />} field="weeklyReport" />
                                                        <ActionRow onCancel={cancelNotifEdit} />
                                                    </motion.form>
                                                )}
                                            </div>
                                            <AnimatePresence>
                                                {notifMsg && <Toast msg={notifMsg.text} ok={notifMsg.ok} onClose={() => setNotifMsg(null)} />}
                                            </AnimatePresence>
                                        </SectionCard>
                                    </motion.div>
                                )}

                                {activeTab === 'sessions' && (
                                    <motion.div
                                        key="sessions"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        transition={{ duration: 0.3 }}
                                        className="space-y-6"
                                    >
                                        <SectionCard title="Active Connectivity Sessions" icon={<Monitor size={18} />}>
                                            <div className="bg-amber-50 border border-amber-100 p-4 rounded-2xl mb-8 flex gap-3 items-start">
                                                <div className="p-2 bg-white rounded-xl text-amber-600 shadow-sm"><Shield size={16} /></div>
                                                <div>
                                                    <p className="text-xs font-black text-amber-800 uppercase tracking-tighter">Security Recommendation</p>
                                                    <p className="text-[12px] text-amber-700 font-medium mt-1 leading-relaxed">Regularly review your active sessions to ensure account integrity.</p>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                                <AnimatePresence mode="popLayout">
                                                    {sessions.map((s, i) => (
                                                        <motion.div
                                                            key={i}
                                                            layout
                                                            initial={{ opacity: 0, scale: 0.9 }}
                                                            animate={{ opacity: 1, scale: 1 }}
                                                            exit={{ opacity: 0, scale: 0.8 }}
                                                            className={`p-5 rounded-3xl border-2 transition-all relative overflow-hidden flex flex-col justify-between min-h-[160px] ${s.current ? 'bg-white border-violet-200 shadow-xl' : 'bg-gray-50/50 border-gray-100 opacity-80'
                                                                }`}
                                                        >
                                                            {s.current && <div className="absolute top-0 right-0 px-4 py-1.5 bg-violet-600 text-white text-[9px] font-black uppercase tracking-widest rounded-bl-2xl shadow-md">Primary</div>}

                                                            <div className="flex items-center gap-4 mb-4">
                                                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg transition-transform hover:scale-110 ${s.current ? 'bg-violet-600 text-white' : 'bg-white border border-gray-200 text-gray-400'}`}>
                                                                    {s.device.includes('iPhone') || s.device.includes('Android') ? <Smartphone size={22} /> : <Monitor size={22} />}
                                                                </div>
                                                                <div className="flex-1 overflow-hidden">
                                                                    <p className="text-[15px] font-black text-gray-900 truncate tracking-tight">{s.device}</p>
                                                                    <div className="flex items-center gap-2 mt-1">
                                                                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.3)]"></div>
                                                                        <p className="text-[11px] font-bold text-gray-400 font-mono italic truncate">{s.location}</p>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="flex items-center justify-between mt-auto">
                                                                <div className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest bg-gray-100/80 px-3 py-1.5 rounded-full">
                                                                    <Calendar size={12} />
                                                                    {s.time === 'Active now' ? 'Just Now' : s.time}
                                                                </div>
                                                                {!s.current && (
                                                                    <motion.button
                                                                        whileHover={{ scale: 1.05 }}
                                                                        whileTap={{ scale: 0.95 }}
                                                                        onClick={() => setSessions(prev => prev.filter((_, idx) => idx !== i))}
                                                                        className="text-[11px] font-black text-red-600 hover:text-white bg-red-50 hover:bg-red-600 border border-red-100 hover:border-red-600 px-4 py-1.5 rounded-xl transition-all duration-300 shadow-sm"
                                                                    >
                                                                        Terminate
                                                                    </motion.button>
                                                                )}
                                                            </div>
                                                        </motion.div>
                                                    ))}
                                                </AnimatePresence>
                                            </div>

                                            {sessions.length > 1 && (
                                                <button
                                                    onClick={() => setSessions(prev => prev.filter(s => s.current))}
                                                    className="w-full py-4 text-[13px] font-black text-red-600 bg-white border-2 border-red-100 hover:bg-red-50 hover:border-red-200 rounded-3xl transition-all duration-300 shadow-sm flex items-center justify-center gap-2 uppercase tracking-widest"
                                                >
                                                    <LogOut size={16} />
                                                    Force Log out all other devices
                                                </button>
                                            )}
                                        </SectionCard>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </main>
                </div>
            </div>

            <style>{`
                .scrollbar-hide::-webkit-scrollbar { display: none; }
                .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
                .mask-fade-edges {
                    mask-image: linear-gradient(to right, transparent, black 5%, black 95%, transparent);
                }
            `}</style>
        </div>
    );
};

export default SettingsPage;