import { ArrowLeft, CheckCircle2, ChevronDown, Mail, Phone, User, MapPin } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const SupplierCreatePage = () => {
    const navigate = useNavigate();
    const [isSuccess, setIsSuccess] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        location: '',
        contactPerson: '',
        phone: '',
        email: '',
        status: 'Active'
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSuccess(true);
    };

    if (isSuccess) {
        return (
            <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F8FAFC' }}>
                <div style={{ textAlign: 'center', background: 'white', padding: '60px 80px', borderRadius: 24, boxShadow: '0 20px 50px rgba(0,0,0,0.05)', maxWidth: 500 }}>
                    <div style={{ width: 80, height: 80, background: '#DCFCE7', color: '#10B981', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
                        <CheckCircle2 size={40} />
                    </div>
                    <h2 style={{ fontSize: 24, fontWeight: 900, color: '#1E293B', marginBottom: 12 }}>Supplier Registered!</h2>
                    <p style={{ color: '#64748B', lineHeight: 1.6, marginBottom: 32 }}>The new supplier has been successfully added to your management list.</p>
                    <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexDirection: 'column' }} className="sm:flex-row">
                        <button className="btn btn-secondary w-full sm:w-auto" onClick={() => setIsSuccess(false)}>Add Another</button>
                        <button className="btn btn-primary w-full sm:w-auto" onClick={() => navigate('/suppliers')}>Back to Suppliers</button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <div className="page-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }} className="flex-col sm:flex-row sm:items-center">
                    <button type="button" className="btn btn-secondary w-full sm:w-auto" style={{ padding: '8px 12px' }} onClick={() => navigate('/suppliers')}>
                        <ArrowLeft size={18} className="ms mr-1" /> Back
                    </button>
                    <div className="text-center sm:text-left">
                        <div className="page-title">Register New Supplier</div>
                        <div className="breadcrumb">Supplier Management <span>/</span> Create</div>
                    </div>
                </div>
            </div>

            <div className="page-body" style={{ flex: 1, overflowY: 'auto' }}>
                <div style={{ maxWidth: 800, margin: '0 auto', width: '100%', display: 'flex', flexDirection: 'column', gap: 24 }}>
                    
                    {/* Basic Info */}
                    <div style={{ background: 'white', borderRadius: 16, border: '1.5px solid var(--border)', padding: 24 }}>
                        <h3 style={{ fontSize: 14, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--primary)', marginBottom: 20 }}>Basic Information</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                            <div className="form-group">
                                <label className="form-label">Supplier Name*</label>
                                <input required type="text" className="form-input" placeholder="e.g. iTriangle" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Location*</label>
                                <div className="form-input-icon">
                                    <MapPin size={18} className="ms text-slate-400" />
                                    <input required type="text" className="form-input" placeholder="e.g. Bangalore, India" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} />
                                </div>
                            </div>
                        </div>
                        <div className="form-group" style={{ marginTop: 12 }}>
                            <label className="form-label">Default Status</label>
                            <div style={{ position: 'relative', width: 200 }}>
                                <select className="form-select" value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})}>
                                    <option value="Active">Active</option>
                                    <option value="Inactive">Inactive</option>
                                </select>
                                <ChevronDown size={16} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: 'var(--muted)' }} />
                            </div>
                        </div>
                    </div>

                    {/* Contact Person */}
                    <div style={{ background: 'white', borderRadius: 16, border: '1.5px solid var(--border)', padding: 24 }}>
                        <h3 style={{ fontSize: 14, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--primary)', marginBottom: 20 }}>Contact Person</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                            <div className="form-group">
                                <label className="form-label">Full Name*</label>
                                <div style={{ position: 'relative' }}>
                                    <User size={18} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--muted)' }} />
                                    <input required type="text" className="form-input" style={{ paddingLeft: 40 }} placeholder="e.g. Rahul Sharma" value={formData.contactPerson} onChange={e => setFormData({...formData, contactPerson: e.target.value})} />
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="form-label">Phone Number*</label>
                                <div style={{ position: 'relative' }}>
                                    <Phone size={18} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--muted)' }} />
                                    <input required type="tel" className="form-input" style={{ paddingLeft: 40 }} placeholder="+91 XXXXX XXXXX" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                                </div>
                            </div>
                        </div>
                        <div className="form-group" style={{ marginTop: 12 }}>
                            <label className="form-label">Email Address*</label>
                            <div style={{ position: 'relative' }}>
                                <Mail size={18} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--muted)' }} />
                                <input required type="email" className="form-input" style={{ paddingLeft: 40 }} placeholder="email@supplier.com" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div style={{ padding: '20px 24px', background: 'white', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'flex-end', gap: 12, flexDirection: 'column' }} className="sm:flex-row">
                <button type="button" className="btn btn-secondary w-full sm:w-auto" onClick={() => navigate('/suppliers')}>Cancel</button>
                <button type="submit" className="btn btn-primary w-full sm:w-auto">Register Supplier</button>
            </div>
        </form>
    );
};

