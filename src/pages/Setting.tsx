import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    X, User, Edit2, CheckCircle2,
    Mail, MessageSquare, Bell,
    Shield, Lock, Eye, EyeOff,
    Smartphone
} from 'lucide-react';
import './Setting.css';

/* ─── Types ──────────────────────────────── */
interface ProfileForm { fullName: string; email: string; phone: string; timezone: string; }
interface NotifPrefs { emailAlerts: boolean; smsAlerts: boolean; pushNotifs: boolean; weeklyReport: boolean; }
interface PwForm { current: string; next: string; confirm: string; }

const TIMEZONES = ['Asia/Kolkata', 'Asia/Dubai', 'Asia/Singapore', 'Europe/London', 'America/New_York', 'UTC'];

/* ─── Toast ──────────────────────────────── */
function Toast({ msg, ok, onClose }: { msg: string; ok: boolean; onClose: () => void }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            className={`s-toast ${ok ? 'toast-ok' : 'toast-err'}`}
        >
            {ok ? <CheckCircle2 size={16} /> : <X size={16} />}
            <span className="flex-1">{msg}</span>
            <button onClick={onClose} className="toast-close"><X size={13} /></button>
        </motion.div>
    );
}

/* ─── Field (read-only) ───────────────────── */
function Field({ label, value }: { label: string; value: string }) {
    return (
        <div className="field-block">
            <p className="field-label">{label}</p>
            <p className="field-value">{value || '—'}</p>
        </div>
    );
}

/* ─── SectionCard ────────────────────────── */
function SectionCard({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) {
    return (
        <div className="section-card">
            <div className="section-header">
                <span className="section-icon">{icon}</span>
                <h2 className="section-title">{title}</h2>
            </div>
            <div className="section-body">{children}</div>
        </div>
    );
}

/* ════════════════════════════════════════════
   MAIN COMPONENT
════════════════════════════════════════════ */
export const SettingsPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'profile' | 'security' | 'notifications'>('profile');

    /* ── Profile ── */
    const [profile, setProfile] = useState<ProfileForm>({
        fullName: 'Admin User',
        email: 'admin@vanloka.com',
        phone: '+91 9876543210',
        timezone: 'Asia/Kolkata',
    });
    const [editingProfile, setEditingProfile] = useState(false);
    const [profileDraft, setProfileDraft] = useState<ProfileForm>(profile);
    const [profileMsg, setProfileMsg] = useState<{ text: string; ok: boolean } | null>(null);

    function openProfileEdit() { setProfileDraft(profile); setProfileMsg(null); setEditingProfile(true); }
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
    const [notifs, setNotifs] = useState<NotifPrefs>({
        emailAlerts: true, smsAlerts: false, pushNotifs: true, weeklyReport: true
    });
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

    /* ── Password strength ── */
    const strength = (() => {
        const p = pw.next; if (!p) return 0; let s = 0;
        if (p.length >= 8) s++; if (/[A-Z]/.test(p)) s++; if (/[0-9]/.test(p)) s++; if (/[^A-Za-z0-9]/.test(p)) s++;
        return s;
    })();
    const strengthLabel = ['', 'Weak', 'Fair', 'Good', 'Strong'][strength];
    const strengthColor = ['', '#ef4444', '#f59e0b', '#3b82f6', '#10b981'][strength];

    const initials = profile.fullName.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();

    /* ── PwInput ── */
    function PwInput({ field, label, placeholder }: { field: keyof PwForm; label: string; placeholder: string }) {
        const mismatch = field === 'confirm' && pw.next && pw.confirm && pw.next !== pw.confirm;
        return (
            <div className="input-group">
                <label className="input-label">{label}</label>
                <div className="input-wrap">
                    <input
                        type={showPw[field] ? 'text' : 'password'}
                        value={pw[field]}
                        onChange={e => { setPw(p => ({ ...p, [field]: e.target.value })); setPwMsg(null); }}
                        placeholder={placeholder}
                        className={`s-input pr-10 ${mismatch ? 'input-error' : ''}`}
                    />
                    <button type="button"
                        onClick={() => setShowPw(s => ({ ...s, [field]: !s[field] }))}
                        className="eye-btn">
                        {showPw[field] ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                </div>
            </div>
        );
    }

    /* ── NotifToggle ── */
    function NotifToggle({ label, desc, icon, field }: { label: string; desc: string; icon: React.ReactNode; field: keyof NotifPrefs }) {
        const val = notifDraft[field];
        return (
            <div className={`notif-toggle ${val ? 'notif-toggle-on' : 'notif-toggle-off'}`}>
                <div className="notif-left">
                    <div className={`notif-icon-wrap ${val ? 'notif-icon-on' : 'notif-icon-off'}`}>{icon}</div>
                    <div>
                        <p className="notif-name">{label}</p>
                        <p className="notif-desc">{desc}</p>
                    </div>
                </div>
                <button type="button"
                    onClick={() => setNotifDraft(n => ({ ...n, [field]: !n[field] }))}
                    className={`toggle-track ${val ? 'toggle-on' : 'toggle-off'}`}>
                    <span className={`toggle-thumb ${val ? 'thumb-on' : 'thumb-off'}`} />
                </button>
            </div>
        );
    }

    const tabs = [
        { id: 'profile', label: 'Profile', icon: <User size={15} /> },
        { id: 'security', label: 'Security', icon: <Shield size={15} /> },
        { id: 'notifications', label: 'Notifications', icon: <Bell size={15} /> },
    ] as const;

    return (
        <div className="settings-page">

            {/* ── Page Header ── */}
            <div className="page-header">
                <h1 className="page-title">Settings</h1>
                <p className="page-sub">Manage your profile, security and notification preferences</p>
            </div>

            {/* ── Tab Bar ── */}
            <div className="tab-bar">
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`tab-btn ${activeTab === tab.id ? 'tab-active' : 'tab-inactive'}`}
                    >
                        {tab.icon}
                        <span className="tab-label">{tab.label}</span>
                        {activeTab === tab.id && (
                            <motion.div layoutId="tab-underline" className="tab-underline" />
                        )}
                    </button>
                ))}
            </div>

            {/* ── Tab Content ── */}
            <div className="tab-content">

                {/* PROFILE */}
                {activeTab === 'profile' && (
                    <motion.div key="profile" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="tab-pane">
                        <div className="profile-card">
                            <div className="profile-body">
                                <div className="profile-top-row">
                                    <div className="profile-id">
                                        <div className="avatar">{initials}</div>
                                        <div className="profile-meta">
                                            <h3 className="profile-name">{profile.fullName}</h3>
                                            <p className="profile-role"><span className="role-dot" />System Administrator</p>
                                        </div>
                                    </div>
                                    {!editingProfile ? (
                                        <button onClick={openProfileEdit} className="btn-primary">
                                            <Edit2 size={14} /> Edit Profile
                                        </button>
                                    ) : (
                                        <button onClick={() => setEditingProfile(false)} className="btn-ghost">
                                            <X size={14} /> Discard
                                        </button>
                                    )}
                                </div>

                                {!editingProfile ? (
                                    <div className="fields-grid">
                                        <Field label="Email Address" value={profile.email} />
                                        <Field label="Phone Number" value={profile.phone} />
                                        <Field label="Timezone" value={profile.timezone} />
                                    </div>
                                ) : (
                                    <form onSubmit={saveProfile} className="edit-form">
                                        <div className="edit-grid">
                                            <div className="input-group">
                                                <label className="input-label">Full Name</label>
                                                <input type="text" value={profileDraft.fullName}
                                                    onChange={e => setProfileDraft(p => ({ ...p, fullName: e.target.value }))}
                                                    className="s-input" />
                                            </div>
                                            <div className="input-group">
                                                <label className="input-label">Email Address</label>
                                                <input type="email" value={profileDraft.email}
                                                    onChange={e => setProfileDraft(p => ({ ...p, email: e.target.value }))}
                                                    className="s-input" />
                                            </div>
                                            <div className="input-group">
                                                <label className="input-label">Phone Number</label>
                                                <input type="tel" value={profileDraft.phone}
                                                    onChange={e => setProfileDraft(p => ({ ...p, phone: e.target.value }))}
                                                    className="s-input" />
                                            </div>
                                            <div className="input-group">
                                                <label className="input-label">Timezone</label>
                                                <select value={profileDraft.timezone}
                                                    onChange={e => setProfileDraft(p => ({ ...p, timezone: e.target.value }))}
                                                    className="s-input">
                                                    {TIMEZONES.map(tz => <option key={tz}>{tz}</option>)}
                                                </select>
                                            </div>
                                        </div>
                                        <div className="form-actions">
                                            <button type="submit" className="btn-primary">Save Changes</button>
                                        </div>
                                    </form>
                                )}
                            </div>
                        </div>
                        <AnimatePresence>
                            {profileMsg && <Toast msg={profileMsg.text} ok={profileMsg.ok} onClose={() => setProfileMsg(null)} />}
                        </AnimatePresence>
                    </motion.div>
                )}

                {/* SECURITY */}
                {activeTab === 'security' && (
                    <motion.div key="security" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="tab-pane">
                        <SectionCard title="Password & Security" icon={<Lock size={15} />}>
                            <div className="pw-header-row">
                                <div>
                                    <h4 className="card-heading">Change Account Password</h4>
                                    <p className="card-sub">Use at least 8 characters with numbers and symbols.</p>
                                </div>
                                {!editingPw && (
                                    <button onClick={openPwEdit} className="btn-primary">Update Password</button>
                                )}
                            </div>

                            {editingPw && (
                                <form onSubmit={savePw} className="pw-form">
                                    <div className="pw-grid">
                                        <PwInput field="current" label="Current Password" placeholder="••••••••" />
                                        <div className="pw-right-col">
                                            <PwInput field="next" label="New Password" placeholder="••••••••" />
                                            {pw.next && (
                                                <div className="strength-bar-wrap">
                                                    <div className="strength-meta">
                                                        <span className="strength-label-text">Password Strength</span>
                                                        <span className="strength-value" style={{ color: strengthColor }}>{strengthLabel}</span>
                                                    </div>
                                                    <div className="strength-bars">
                                                        {[1, 2, 3, 4].map(i => (
                                                            <div key={i} className="strength-seg"
                                                                style={{ background: i <= strength ? strengthColor : '#e5e7eb' }} />
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                            <PwInput field="confirm" label="Confirm New Password" placeholder="••••••••" />
                                        </div>
                                    </div>
                                    <div className="form-actions gap-3">
                                        <button type="button" onClick={cancelPwEdit} className="btn-ghost">Cancel</button>
                                        <button type="submit" className="btn-primary">Save Password</button>
                                    </div>
                                </form>
                            )}

                            <AnimatePresence>
                                {pwMsg && <Toast msg={pwMsg.text} ok={pwMsg.ok} onClose={() => setPwMsg(null)} />}
                            </AnimatePresence>
                        </SectionCard>

                        <div className="tfa-banner">
                            <div className="tfa-icon"><Shield size={19} /></div>
                            <div>
                                <h5 className="tfa-title">Two-Factor Authentication</h5>
                                <p className="tfa-body">Add an extra security layer using Google Authenticator or Authy.</p>
                                <button className="tfa-link">Configure 2FA →</button>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* NOTIFICATIONS */}
                {activeTab === 'notifications' && (
                    <motion.div key="notifications" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="tab-pane">
                        <SectionCard title="Notification Preferences" icon={<Bell size={15} />}>
                            <div className="notif-header-row">
                                <p className="card-sub">Control how and when you receive alerts and reports.</p>
                                {!editingNotifs && (
                                    <button onClick={openNotifEdit} className="btn-outline">
                                        <Edit2 size={13} /> Configure
                                    </button>
                                )}
                            </div>

                            {!editingNotifs ? (
                                <div className="notif-status-grid">
                                    {([
                                        { label: 'Email Alerts', icon: <Mail size={16} />, key: 'emailAlerts' },
                                        { label: 'SMS Alerts', icon: <MessageSquare size={16} />, key: 'smsAlerts' },
                                        { label: 'Push Notifications', icon: <Bell size={16} />, key: 'pushNotifs' },
                                        { label: 'Weekly Report', icon: <Smartphone size={16} />, key: 'weeklyReport' },
                                    ] as { label: string; icon: React.ReactNode; key: keyof NotifPrefs }[]).map(item => (
                                        <div key={item.key} className={`status-chip ${notifs[item.key] ? 'chip-on' : 'chip-off'}`}>
                                            <span className={notifs[item.key] ? 'chip-icon-on' : 'chip-icon-off'}>{item.icon}</span>
                                            <span className="chip-label">{item.label}</span>
                                            <span className={`chip-badge ${notifs[item.key] ? 'badge-on' : 'badge-off'}`}>
                                                {notifs[item.key] ? 'ON' : 'OFF'}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <form onSubmit={saveNotifs} className="notif-edit-form">
                                    <div className="notif-toggles">
                                        <NotifToggle label="Email Summaries" desc="Daily digest to your inbox" icon={<Mail size={16} />} field="emailAlerts" />
                                        <NotifToggle label="SMS Alerts" desc="Critical alerts to your mobile" icon={<MessageSquare size={16} />} field="smsAlerts" />
                                        <NotifToggle label="Push Notifications" desc="In-app and browser notifications" icon={<Bell size={16} />} field="pushNotifs" />
                                        <NotifToggle label="Weekly Report" desc="Activity summary every Monday" icon={<Smartphone size={16} />} field="weeklyReport" />
                                    </div>
                                    <div className="form-actions gap-3">
                                        <button type="button" onClick={cancelNotifEdit} className="btn-ghost">Cancel</button>
                                        <button type="submit" className="btn-primary">Save Preferences</button>
                                    </div>
                                </form>
                            )}
                        </SectionCard>

                        <AnimatePresence>
                            {notifMsg && <Toast msg={notifMsg.text} ok={notifMsg.ok} onClose={() => setNotifMsg(null)} />}
                        </AnimatePresence>
                    </motion.div>
                )}

            </div>
        </div>
    );
};

export default SettingsPage;