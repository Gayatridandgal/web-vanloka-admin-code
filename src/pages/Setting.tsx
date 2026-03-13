import { useState } from 'react';
import { Toggle } from '../ui/index';
import { 
    Layout, 
    Mail, 
    CreditCard, 
    MessageSquare, 
    Globe, 
    ShieldCheck, 
    Settings, 
    Save, 
    RotateCcw,
    Image as ImageIcon,
    Key,
    User,
    Lock,
    Bell,
    Link as LinkIcon,
    Search,
    Camera,
    Clock,
    Shield,
    Activity,
    ChevronRight,
    LogOut,
    CheckCircle2,
    AlertCircle
} from 'lucide-react';

/* ══════════ SETTINGS ══════════ */
export const SettingsPage = () => {
    const [activeTab, setActiveTab] = useState<'profile' | 'security' | 'notifications' | 'general' | 'email' | 'payments' | 'sms' | 'seo'>('profile');
    const [maintenanceMode, setMaintenanceMode] = useState(false);

    const tabs = [
        { id: 'profile', label: 'My Profile', icon: <User size={16} /> },
        { id: 'security', label: 'Security', icon: <Lock size={16} /> },
        { id: 'notifications', label: 'Notifications', icon: <Bell size={16} /> },
        { id: 'general', label: 'Website', icon: <Layout size={16} /> },
        { id: 'email', label: 'Email (SMTP)', icon: <Mail size={16} /> },
        { id: 'payments', label: 'Payments', icon: <CreditCard size={16} /> },
        { id: 'sms', label: 'SMS Gateway', icon: <MessageSquare size={16} /> },
        { id: 'seo', label: 'SEO & Social', icon: <Globe size={16} /> },
    ] as const;

    return (
        <div style={{ animation: 'fadeIn 0.4s ease-out' }}>
            <div className="page-header" style={{ marginBottom: 32 }}>
                <div>
                    <div className="page-title" style={{ fontSize: 24, fontWeight: 900, letterSpacing: '-0.02em' }}>
                        <div style={{ 
                            width: 32, height: 32, borderRadius: 10, background: 'var(--primary)', 
                            display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: 12,
                            boxShadow: '0 4px 12px rgba(99, 102, 241, 0.3)'
                        }}>
                            <Settings size={18} color="white" />
                        </div>
                        System Settings
                    </div>
                    <div className="breadcrumb" style={{ marginLeft: 44 }}>
                        Admin <span>/</span> Configuration <span>/</span> <span style={{ color: 'var(--primary)', fontWeight: 700 }}>{tabs.find(t => t.id === activeTab)?.label}</span>
                    </div>
                </div>
                <div className="header-actions">
                    <button className="btn btn-secondary" style={{ borderRadius: 12, padding: '10px 20px', fontWeight: 700 }}>
                        <RotateCcw size={16} /> Discard
                    </button>
                    <button className="btn btn-primary" style={{ borderRadius: 12, padding: '10px 24px', fontWeight: 700, boxShadow: '0 4px 14px var(--primary-light)' }}>
                        <Save size={16} /> Save Changes
                    </button>
                </div>
            </div>

            <div className="page-body">
                {/* ── Premium Tab Navigation ── */}
                <div style={{ 
                    display: 'flex', 
                    gap: 4, 
                    marginBottom: 32, 
                    background: '#F8FAFC', 
                    padding: 6, 
                    borderRadius: 16, 
                    border: '1px solid #E2E8F0',
                    overflowX: 'auto',
                    whiteSpace: 'nowrap',
                    boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.02)'
                }}>
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as any)}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 8,
                                padding: '10px 18px',
                                borderRadius: 12,
                                fontSize: 13,
                                fontWeight: 700,
                                cursor: 'pointer',
                                border: 'none',
                                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                background: activeTab === tab.id ? 'white' : 'transparent',
                                color: activeTab === tab.id ? 'var(--primary)' : '#64748B',
                                boxShadow: activeTab === tab.id ? '0 4px 12px rgba(0,0,0,0.05), 0 1px 3px rgba(0,0,0,0.02)' : 'none',
                                transform: activeTab === tab.id ? 'translateY(-1px)' : 'none'
                            }}
                        >
                            <span style={{ 
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                color: activeTab === tab.id ? 'var(--primary)' : '#94A3B8'
                            }}>
                                {tab.icon}
                            </span>
                            {tab.label}
                        </button>
                    ))}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 32, alignItems: 'start' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                        
                        {/* ── PROFILE SETTINGS ── */}
                        {activeTab === 'profile' && (
                            <div className="white-card" style={{ padding: 32, borderRadius: 24 }}>
                                <div className="card-title" style={{ fontSize: 18, marginBottom: 32 }}>
                                    <div style={{ width: 32, height: 32, borderRadius: 8, background: 'rgba(99, 102, 241, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: 12 }}>
                                        <User size={18} color="var(--primary)" />
                                    </div>
                                    Profile Information
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
                                        <div style={{ position: 'relative' }}>
                                            <div style={{ 
                                                width: 100, height: 100, borderRadius: 28, background: 'linear-gradient(135deg, var(--primary) 0%, #4F46E5 100%)', 
                                                color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                fontSize: 36, fontWeight: 900, border: '6px solid white', boxShadow: '0 8px 24px rgba(99, 102, 241, 0.2)'
                                            }}>
                                                A
                                            </div>
                                            <button style={{ 
                                                position: 'absolute', bottom: -5, right: -5, width: 36, height: 36, 
                                                borderRadius: 12, background: 'white', border: '1px solid #E2E8F0',
                                                display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--primary)',
                                                boxShadow: '0 4px 12px rgba(0,0,0,0.1)', transition: 'transform 0.2s'
                                            }} onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}>
                                                <Camera size={16} />
                                            </button>
                                        </div>
                                        <div>
                                            <h3 style={{ fontSize: 18, fontWeight: 800, color: '#1E293B', marginBottom: 6 }}>Profile Photo</h3>
                                            <p style={{ fontSize: 13, color: '#64748B', marginBottom: 16 }}>This photo will be visible to your team members.</p>
                                            <div style={{ display: 'flex', gap: 12 }}>
                                                <button className="btn btn-primary btn-sm" style={{ padding: '8px 16px', borderRadius: 10 }}>Update Image</button>
                                                <button className="btn btn-secondary btn-sm" style={{ padding: '8px 16px', borderRadius: 10, color: '#EF4444', borderColor: 'transparent', background: '#FEF2F2' }}>Delete</button>
                                            </div>
                                        </div>
                                    </div>

                                    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                                        <div className="form-grid form-grid-2">
                                            <div className="form-group">
                                                <label className="form-label" style={{ color: '#64748B', fontWeight: 600 }}>Full Name</label>
                                                <input className="form-input" style={{ borderRadius: 12, padding: '12px 16px' }} defaultValue="Admin User" />
                                            </div>
                                            <div className="form-group">
                                                <label className="form-label" style={{ color: '#64748B', fontWeight: 600 }}>Email Address</label>
                                                <input className="form-input" style={{ borderRadius: 12, padding: '12px 16px' }} defaultValue="admin@vanloka.com" />
                                            </div>
                                        </div>
                                        <div className="form-grid form-grid-2">
                                            <div className="form-group">
                                                <label className="form-label" style={{ color: '#64748B', fontWeight: 600 }}>Phone Number</label>
                                                <input className="form-input" style={{ borderRadius: 12, padding: '12px 16px' }} defaultValue="+91 9876543210" />
                                            </div>
                                            <div className="form-group">
                                                <label className="form-label" style={{ color: '#64748B', fontWeight: 600 }}>Timezone</label>
                                                <div style={{ position: 'relative' }}>
                                                    <Clock size={16} style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
                                                    <select className="form-select" style={{ borderRadius: 12, padding: '12px 16px 12px 44px' }}>
                                                        <option>Asia/Kolkata (IST)</option>
                                                        <option>UTC (Coordinated Universal Time)</option>
                                                        <option>America/New_York (EST)</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'flex-end', borderTop: '1px solid #F1F5F9', paddingTop: 24 }}>
                                        <button className="btn btn-primary" style={{ borderRadius: 12, padding: '12px 28px' }}>Update Profile Details</button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* ── SECURITY SETTINGS ── */}
                        {activeTab === 'security' && (
                            <div className="white-card" style={{ padding: 32, borderRadius: 24 }}>
                                <div className="card-title" style={{ fontSize: 18 }}>
                                    <div style={{ width: 32, height: 32, borderRadius: 8, background: 'rgba(15, 23, 42, 0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: 12 }}>
                                        <Lock size={18} color="#0F172A" />
                                    </div>
                                    Security & Password
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                                    <div className="form-group" style={{ maxWidth: 460 }}>
                                        <label className="form-label" style={{ color: '#64748B', fontWeight: 600 }}>Current Password</label>
                                        <input className="form-input" style={{ borderRadius: 12, padding: '12px 16px' }} type="password" defaultValue="••••••••" />
                                        <p style={{ fontSize: 12, color: '#94A3B8', marginTop: 8 }}>Password must be at least 8 characters long.</p>
                                    </div>
                                    <div style={{ height: 1, background: '#F1F5F9', margin: '8px 0' }} />
                                    <div className="form-grid form-grid-2">
                                        <div className="form-group">
                                            <label className="form-label" style={{ color: '#64748B', fontWeight: 600 }}>New Password</label>
                                            <input className="form-input" style={{ borderRadius: 12, padding: '12px 16px' }} type="password" placeholder="New strong password" />
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label" style={{ color: '#64748B', fontWeight: 600 }}>Confirm New Password</label>
                                            <input className="form-input" style={{ borderRadius: 12, padding: '12px 16px' }} type="password" />
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: 16 }}>
                                        <button className="btn btn-primary" style={{ borderRadius: 12, padding: '12px 28px', background: '#0F172A', borderColor: '#0F172A' }}>Change My Password</button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* ── NOTIFICATION SETTINGS ── */}
                        {activeTab === 'notifications' && (
                            <div className="white-card" style={{ padding: 32, borderRadius: 24 }}>
                                <div className="card-title" style={{ fontSize: 18 }}>
                                    <div style={{ width: 32, height: 32, borderRadius: 8, background: 'rgba(245, 158, 11, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: 12 }}>
                                        <Bell size={18} color="#D97706" />
                                    </div>
                                    Manage Notifications
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                                    {[
                                        { label: 'Email Alerts', sub: 'Receive daily activity reports and system logs via email', type: 'email' },
                                        { label: 'SMS Alerts', sub: 'Get urgent maintenance alerts directly on your mobile', type: 'sms' },
                                        { label: 'Push Notifications', sub: 'Receive browser notifications for session events and updates', type: 'push' },
                                        { label: 'Weekly Summary', sub: 'A detailed performance report delivered every Monday', type: 'weekly' },
                                    ].map((n, i) => (
                                        <div key={n.type} style={{ 
                                            padding: '24px 0', 
                                            borderBottom: i === 3 ? 'none' : '1px solid #F1F5F9',
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center'
                                        }}>
                                            <div style={{ paddingRight: 40 }}>
                                                <div style={{ fontSize: 15, fontWeight: 800, color: '#1E293B', marginBottom: 4 }}>{n.label}</div>
                                                <div style={{ fontSize: 13, color: '#64748B', lineHeight: 1.5 }}>{n.sub}</div>
                                            </div>
                                            <Toggle checked={i < 2} onChange={() => {}} />
                                        </div>
                                    ))}
                                    <div style={{ display: 'flex', justifyContent: 'flex-end', borderTop: '1px solid #F1F5F9', paddingTop: 32, marginTop: 12 }}>
                                        <button className="btn btn-primary" style={{ borderRadius: 12, padding: '12px 28px' }}>Save All Preferences</button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* ── WEBSITE BRANDING (Optimized) ── */}
                        {activeTab === 'general' && (
                            <div className="white-card" style={{ padding: 32, borderRadius: 24 }}>
                                <div className="card-title" style={{ fontSize: 18 }}>
                                    <div style={{ width: 32, height: 32, borderRadius: 8, background: 'rgba(99, 102, 241, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: 12 }}>
                                        <Layout size={18} color="var(--primary)" />
                                    </div>
                                    System Appearance
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                                    <div className="form-grid form-grid-2">
                                        <div className="form-group">
                                            <label className="form-label" style={{ fontWeight: 600 }}>Site Title</label>
                                            <input className="form-input" style={{ borderRadius: 12 }} defaultValue="VanLoka Admin Panel" />
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label" style={{ fontWeight: 600 }}>Support Email</label>
                                            <input className="form-input" style={{ borderRadius: 12 }} defaultValue="support@vanloka.com" />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label" style={{ fontWeight: 600 }}>System Description</label>
                                        <textarea className="form-input" style={{ minHeight: 100, borderRadius: 12, padding: 16 }} defaultValue="Premium vehicle and logistics management system for modern enterprises." />
                                    </div>
                                    <div className="form-grid form-grid-2">
                                        <div className="form-group" style={{ padding: 20, background: '#F8FAFC', borderRadius: 16, border: '1px solid #E2E8F0' }}>
                                            <label className="form-label" style={{ fontWeight: 700, marginBottom: 12 }}>Application Logo</label>
                                            <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                                                <div style={{ width: 56, height: 56, borderRadius: 14, background: 'white', border: '1px solid #CBD5E1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                    <ImageIcon size={24} color="#94A3B8" />
                                                </div>
                                                <button className="btn btn-secondary btn-sm" style={{ padding: '8px 14px', borderRadius: 10 }}>Update Logo</button>
                                            </div>
                                        </div>
                                        <div className="form-group" style={{ padding: 20, background: '#F8FAFC', borderRadius: 16, border: '1px solid #E2E8F0' }}>
                                            <label className="form-label" style={{ fontWeight: 700, marginBottom: 12 }}>Site Favicon</label>
                                            <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                                                <div style={{ width: 56, height: 56, borderRadius: 14, background: 'white', border: '1px solid #CBD5E1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                    <ImageIcon size={24} color="#94A3B8" />
                                                </div>
                                                <button className="btn btn-secondary btn-sm" style={{ padding: '8px 14px', borderRadius: 10 }}>Update Icon</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        
                        {/* ── SMTP Configuration (Optimized) ── */}
                        {activeTab === 'email' && (
                            <div className="white-card" style={{ padding: 32, borderRadius: 24 }}>
                                <div className="card-title" style={{ fontSize: 18 }}>
                                    <div style={{ width: 32, height: 32, borderRadius: 8, background: 'rgba(71, 85, 105, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: 12 }}>
                                        <Mail size={18} color="#475569" />
                                    </div>
                                    SMTP Server Config
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                                    <div className="form-grid form-grid-2">
                                        <div className="form-group">
                                            <label className="form-label">SMTP Host</label>
                                            <input className="form-input" style={{ borderRadius: 12 }} defaultValue="smtp.gmail.com" />
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">SMTP Port</label>
                                            <input className="form-input" style={{ borderRadius: 12 }} defaultValue="587" />
                                        </div>
                                    </div>
                                    <div className="form-grid form-grid-2">
                                        <div className="form-group">
                                            <label className="form-label">Username</label>
                                            <input className="form-input" style={{ borderRadius: 12 }} defaultValue="notifications@vanloka.com" />
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">Password</label>
                                            <input className="form-input" style={{ borderRadius: 12 }} type="password" defaultValue="••••••••••••" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Fallback for other tabs */}
                        {(['payments', 'sms', 'seo'].includes(activeTab)) && (
                             <div className="white-card" style={{ padding: 48, borderRadius: 24, textAlign: 'center' }}>
                                <div style={{ 
                                    width: 64, height: 64, borderRadius: 20, background: '#F8FAFC', 
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px'
                                }}>
                                    <Settings size={32} color="#CBD5E1" />
                                </div>
                                <h3 style={{ fontSize: 18, fontWeight: 800, marginBottom: 8 }}>Under Construction</h3>
                                <p style={{ color: '#64748B' }}>This module configuration is currently being optimized for enhanced performance.</p>
                             </div>
                        )}
                    </div>

                    {/* ── Sidebar Panels (Glassmorphism Inspired) ── */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                        {/* Status Card */}
                        <div className="white-card" style={{ 
                            padding: 24, borderRadius: 24, border: '1px solid #E2E8F0',
                            background: 'linear-gradient(180deg, white 0%, #F8FAFC 100%)',
                            boxShadow: '0 10px 25px -5px rgba(0,0,0,0.05)'
                        }}>
                            <div className="card-title" style={{ fontSize: 15, marginBottom: 20 }}>
                                <div style={{ width: 28, height: 28, borderRadius: 6, background: 'rgba(16, 185, 129, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: 10 }}>
                                    <Shield size={16} color="#10B981" />
                                </div>
                                System Integrity
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                                <div style={{ 
                                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                                    padding: '12px 14px', background: 'white', borderRadius: 14, border: '1px solid #F1F5F9'
                                }}>
                                    <div>
                                        <div style={{ fontSize: 13, fontWeight: 700, color: '#1E293B' }}>Maintenance</div>
                                        <div style={{ fontSize: 11, color: '#94A3B8' }}>Restricts access</div>
                                    </div>
                                    <Toggle checked={maintenanceMode} onChange={() => setMaintenanceMode(!maintenanceMode)} />
                                </div>
                                
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: '4px' }}>
                                    {[
                                        { label: 'Cloud Server', status: 'Online', icon: <Activity size={12} />, color: '#10B981', pulse: true },
                                        { label: 'Database', status: 'Healthy', icon: <ShieldCheck size={12} />, color: '#10B981' },
                                        { label: 'S3 Origins', status: 'Optimized', icon: <CheckCircle2 size={12} />, color: '#10B981' },
                                        { label: 'SMTP Node', status: 'Latency', icon: <AlertCircle size={12} />, color: '#F59E0B' },
                                    ].map(s => (
                                        <div key={s.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#64748B', fontSize: 12, fontWeight: 600 }}>
                                                {s.icon}
                                                {s.label}
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                                {s.pulse && (
                                                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: s.color, boxShadow: `0 0 0 4px ${s.color}20`, animation: 'pulse 2s infinite' }} />
                                                )}
                                                <span style={{ fontWeight: 800, color: s.color, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{s.status}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Quick links Panel */}
                        <div className="white-card" style={{ 
                            padding: 24, borderRadius: 24, border: '1px solid #E2E8F0',
                            background: 'white'
                        }}>
                            <div className="card-title" style={{ fontSize: 15, marginBottom: 16 }}>
                                <Key size={16} color="var(--primary)" style={{ marginRight: 10 }} />
                                Security Quicklinks
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                                {[
                                    { label: 'API Key Management', icon: <LinkIcon size={14} /> },
                                    { label: 'Audit Activity Logs', icon: <Search size={14} /> },
                                    { label: 'Active Session Map', icon: <Globe size={14} /> },
                                    { label: 'Terminate All Sessions', icon: <LogOut size={14} />, dangerous: true },
                                ].map(link => (
                                    <div key={link.label} style={{ 
                                        display: 'flex', alignItems: 'center', justifyContent: 'space-between', 
                                        padding: '10px 12px', borderRadius: 12, cursor: 'pointer',
                                        transition: 'background 0.2s',
                                        background: 'transparent'
                                    }} onMouseEnter={(e) => e.currentTarget.style.background = '#F8FAFC'} onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, fontWeight: 700, color: link.dangerous ? '#EF4444' : '#475569' }}>
                                            {link.icon}
                                            {link.label}
                                        </div>
                                        <ChevronRight size={14} color="#CBD5E1" />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* App Version Info */}
                        <div style={{ textAlign: 'center', padding: '0 20px' }}>
                            <div style={{ fontSize: 11, color: '#94A3B8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                                VanLoka Enterprise Edition
                            </div>
                            <div style={{ fontSize: 12, color: '#64748B', fontWeight: 700, marginTop: 4 }}>
                                v2.4.0-build.8291
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* In-page Animations */}
            <style dangerouslySetInnerHTML={{ __html: `
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes pulse {
                    0% { transform: scale(0.95); opacity: 0.9; }
                    70% { transform: scale(1); opacity: 0; }
                    100% { transform: scale(0.95); opacity: 0; }
                }
                .form-input:focus {
                    border-color: var(--primary) !important;
                    box-shadow: 0 0 0 4px var(--primary-light) !important;
                    outline: none;
                }
                ::-webkit-scrollbar {
                    height: 4px;
                }
                ::-webkit-scrollbar-thumb {
                    background: #E2E8F0;
                    border-radius: 10px;
                }
            `}} />
        </div>
    );
};
