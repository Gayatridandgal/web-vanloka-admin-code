import {
    MessageSquare,
    ArrowLeft,
    CheckCircle2,
    AlertTriangle,
    Bus,
    Calendar,
    Mail,
    Phone,
} from 'lucide-react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { INITIAL_FEEDBACKS } from '../data/feedbackData';
import { Badge } from '../ui/index';

/* ── Types ─────────────────────────────────── */
interface ResolveForm {
    complaintId: string;
    category: string;
    resolutionSummary: string;
    closingRemarks: string;
}

type Errs = Partial<Record<keyof ResolveForm, string>>;

const CATEGORIES = [
    'Vehicle Issue',
    'Driver Behaviour',
    'Route / Navigation',
    'Safety Concern',
    'Billing / Payment',
    'App / Technical',
    'Other',
];

/* ── Helpers ────────────────────────────────── */
const Label = ({ children, required }: { children: React.ReactNode; required?: boolean }) => (
    <label
        style={{
            display: 'block',
            fontSize: 10,
            fontWeight: 900,
            textTransform: 'uppercase',
            letterSpacing: '.08em',
            color: '#64748B',
            marginBottom: 6,
        }}
    >
        {children}
        {required && <span style={{ color: '#DC2626', marginLeft: 2 }}>*</span>}
    </label>
);

const Err = ({ msg }: { msg?: string }) =>
    msg ? (
        <div
            style={{
                fontSize: 10,
                color: '#DC2626',
                fontWeight: 700,
                marginTop: 3,
            }}
        >
            ⚠ {msg}
        </div>
    ) : null;

/* ── Component ──────────────────────────────── */
export const FeedbackResolve = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id?: string }>();

    /* Look up complaint from shared data */
    const complaint = id
        ? INITIAL_FEEDBACKS.find((f) => f.id === id && f.type === 'complaint')
        : INITIAL_FEEDBACKS.find((f) => f.type === 'complaint');

    const [form, setForm] = useState<ResolveForm>({
        complaintId: complaint?.id || 'CMP-UNKNOWN',
        category: complaint?.category || '',
        resolutionSummary: '',
        closingRemarks: '',
    });
    const [errs, setErrs] = useState<Errs>({});
    const [resolved, setResolved] = useState(false);

    const f =
        (key: keyof ResolveForm) =>
        (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
            setForm((v) => ({ ...v, [key]: e.target.value }));
            setErrs((v) => ({ ...v, [key]: undefined }));
        };

    const validate = (): boolean => {
        const e: Errs = {};
        if (!form.category) e.category = 'Select a category';
        if (!form.resolutionSummary.trim()) e.resolutionSummary = 'Resolution summary is required';
        setErrs(e);
        return Object.keys(e).length === 0;
    };

    const handleResolve = () => {
        if (!validate()) {
            const first = document.querySelector('[data-err="1"]');
            if (first) first.scrollIntoView({ behavior: 'smooth', block: 'center' });
            return;
        }
        setResolved(true);
    };

    /* ── Success screen ── */
    if (resolved) {
        return (
            <>
                <div className="page-header">
                    <div>
                        <div className="page-title">
                            <MessageSquare size={18} className="ms mr-2" />
                            Feedbacks &amp; Complaints
                        </div>
                        <div className="breadcrumb">
                            Admin <span>/</span>
                            <span
                                style={{
                                    cursor: 'pointer',
                                    color: 'var(--primary)',
                                    fontWeight: 700,
                                }}
                                onClick={() => navigate('/feedbacks')}
                            >
                                {' '}
                                Feedbacks &amp; Complaints
                            </span>
                            <span>/</span> Resolve Complaint
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
                            padding: '52px 60px',
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
                            Complaint Resolved
                        </div>
                        <div style={{ fontSize: 13, color: '#059669', marginBottom: 6 }}>
                            Complaint <b>{form.complaintId}</b> has been successfully closed.
                        </div>
                        <div
                            style={{
                                fontSize: 12,
                                color: 'var(--muted)',
                                marginBottom: 32,
                            }}
                        >
                            Category:{' '}
                            <span style={{ fontWeight: 800, color: 'var(--primary)' }}>
                                {form.category}
                            </span>{' '}
                            · Status:{' '}
                            <span style={{ fontWeight: 800, color: '#059669' }}>Resolved</span>
                        </div>
                        <div
                            style={{
                                display: 'flex',
                                gap: 12,
                                justifyContent: 'center',
                            }}
                        >
                            <button
                                className="btn btn-primary"
                                onClick={() => navigate('/feedbacks')}
                            >
                                <ArrowLeft size={16} className="ms mr-1" /> Back to Feedbacks
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
            {/* ── PAGE HEADER ── */}
            <div className="page-header">
                <div>
                    <div className="page-title">
                        <MessageSquare size={18} className="ms mr-2" />
                        Feedbacks &amp; Complaints
                    </div>
                    <div className="breadcrumb">
                        Admin <span>/</span>
                        <span
                            style={{
                                cursor: 'pointer',
                                color: 'var(--primary)',
                                fontWeight: 700,
                                marginLeft: 4,
                            }}
                            onClick={() => navigate('/feedbacks')}
                        >
                            Feedbacks &amp; Complaints
                        </span>
                        <span>/</span> Resolve Complaint
                    </div>
                </div>
                <button
                    className="btn btn-secondary"
                    onClick={() => navigate('/feedbacks')}
                    style={{ flexShrink: 0 }}
                >
                    <ArrowLeft size={16} className="ms mr-1" /> Back to List
                </button>
            </div>

            {/* ── PAGE BODY ── */}
            <div className="page-body">
                <div style={{ maxWidth: 860, width: '100%', margin: '0 auto' }}>
                    {/* ── ORIGINAL COMPLAINT DETAILS (at the top for context) ── */}
                    {complaint && (
                        <div
                            style={{
                                background: '#FEF2F2',
                                border: '1.5px solid #FECACA',
                                borderRadius: 16,
                                overflow: 'hidden',
                                marginBottom: 20,
                            }}
                        >
                            <div
                                style={{
                                    padding: '14px 24px',
                                    borderBottom: '1px solid #FECACA',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <span
                                    style={{
                                        fontSize: 10,
                                        fontWeight: 900,
                                        textTransform: 'uppercase',
                                        letterSpacing: '.08em',
                                        color: '#DC2626',
                                    }}
                                >
                                    Original Complaint Details
                                </span>
                                <div style={{ display: 'flex', gap: 6 }}>
                                    <Badge variant="red">{complaint.priority}</Badge>
                                    <Badge variant="amber">{complaint.status}</Badge>
                                </div>
                            </div>
                            <div style={{ padding: '20px 24px' }}>
                                <div
                                    style={{
                                        display: 'flex',
                                        alignItems: 'flex-start',
                                        gap: 14,
                                    }}
                                >
                                    <div
                                        style={{
                                            width: 44,
                                            height: 44,
                                            borderRadius: '50%',
                                            background: '#FEE2E2',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            flexShrink: 0,
                                        }}
                                    >
                                        <AlertTriangle size={22} color="#DC2626" />
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <div
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: 8,
                                                marginBottom: 6,
                                            }}
                                        >
                                            <span
                                                style={{
                                                    fontSize: 15,
                                                    fontWeight: 800,
                                                    color: 'var(--text)',
                                                }}
                                            >
                                                {complaint.name}
                                            </span>
                                            <span
                                                style={{
                                                    fontSize: 11,
                                                    color: 'var(--muted)',
                                                    fontWeight: 600,
                                                }}
                                            >
                                                ({complaint.role})
                                            </span>
                                        </div>
                                        <div
                                            style={{
                                                fontSize: 13,
                                                color: '#475569',
                                                lineHeight: 1.6,
                                                marginBottom: 12,
                                                fontStyle: 'italic',
                                            }}
                                        >
                                            "{complaint.comment}"
                                        </div>
                                        <div
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: 20,
                                                flexWrap: 'wrap',
                                            }}
                                        >
                                            <div
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: 5,
                                                    fontSize: 11,
                                                    color: 'var(--muted)',
                                                    fontWeight: 600,
                                                }}
                                            >
                                                <Bus size={14} />
                                                {complaint.target}
                                            </div>
                                            <div
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: 5,
                                                    fontSize: 11,
                                                    color: 'var(--muted)',
                                                    fontWeight: 600,
                                                }}
                                            >
                                                <Calendar size={14} />
                                                {complaint.date}
                                            </div>
                                            <div
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: 5,
                                                    fontSize: 11,
                                                    color: 'var(--muted)',
                                                    fontWeight: 600,
                                                }}
                                            >
                                                <Mail size={14} />
                                                {complaint.email}
                                            </div>
                                            <div
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: 5,
                                                    fontSize: 11,
                                                    color: 'var(--muted)',
                                                    fontWeight: 600,
                                                }}
                                            >
                                                <Phone size={14} />
                                                {complaint.phone}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* ── RESOLVE FORM CARD ── */}
                    <div
                        style={{
                            background: 'white',
                            border: '1.5px solid var(--border)',
                            borderRadius: 16,
                            overflow: 'hidden',
                            marginBottom: 20,
                        }}
                    >
                        {/* Card header */}
                        <div
                            style={{
                                padding: '22px 28px 16px',
                                borderBottom: '1.5px solid var(--border)',
                            }}
                        >
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 10,
                                    marginBottom: 4,
                                }}
                            >
                                <div
                                    style={{
                                        width: 36,
                                        height: 36,
                                        borderRadius: 8,
                                        background: '#DCFCE7',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <CheckCircle2 size={20} color="#059669" />
                                </div>
                                <div>
                                    <div
                                        style={{
                                            fontSize: 18,
                                            fontWeight: 900,
                                            letterSpacing: '.02em',
                                            color: 'var(--text)',
                                        }}
                                    >
                                        Resolve Complaint Form
                                    </div>
                                    <div
                                        style={{
                                            fontSize: 12,
                                            color: 'var(--muted)',
                                            marginTop: 2,
                                        }}
                                    >
                                        Review and provide a resolution for the reported issue.
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Form body */}
                        <div style={{ padding: '24px 28px' }}>
                            {/* Row 1: Complaint ID + Category */}
                            <div
                                style={{
                                    display: 'grid',
                                    gridTemplateColumns: '1fr 1fr',
                                    gap: 20,
                                    marginBottom: 22,
                                }}
                            >
                                <div>
                                    <Label>Complaint ID</Label>
                                    <input
                                        className="form-input"
                                        value={form.complaintId}
                                        readOnly
                                        style={{ background: '#F8FAFC', cursor: 'not-allowed' }}
                                    />
                                </div>
                                <div data-err={errs.category ? '1' : undefined}>
                                    <Label required>Category</Label>
                                    <select
                                        className="form-select"
                                        value={form.category}
                                        onChange={f('category')}
                                        style={{
                                            borderColor: errs.category ? '#DC2626' : undefined,
                                        }}
                                    >
                                        <option value="">Select Category</option>
                                        {CATEGORIES.map((c) => (
                                            <option key={c}>{c}</option>
                                        ))}
                                    </select>
                                    <Err msg={errs.category} />
                                </div>
                            </div>

                            {/* Resolution Summary */}
                            <div
                                style={{ marginBottom: 22 }}
                                data-err={errs.resolutionSummary ? '1' : undefined}
                            >
                                <Label required>Resolution Summary</Label>
                                <textarea
                                    className="form-input"
                                    rows={4}
                                    placeholder="Describe the steps taken to resolve the complaint..."
                                    value={form.resolutionSummary}
                                    onChange={f('resolutionSummary')}
                                    style={{
                                        width: '100%',
                                        resize: 'vertical',
                                        borderColor: errs.resolutionSummary ? '#DC2626' : undefined,
                                    }}
                                />
                                <Err msg={errs.resolutionSummary} />
                            </div>

                            {/* Closing Remarks */}
                            <div style={{ marginBottom: 28 }}>
                                <Label>Closing Remarks</Label>
                                <textarea
                                    className="form-input"
                                    rows={3}
                                    placeholder="Additional notes for internal records..."
                                    value={form.closingRemarks}
                                    onChange={f('closingRemarks')}
                                    style={{ width: '100%', resize: 'vertical' }}
                                />
                            </div>

                            {/* Footer buttons */}
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'flex-end',
                                    gap: 12,
                                    paddingTop: 4,
                                    borderTop: '1px solid var(--border)',
                                }}
                            >
                                <button
                                    className="btn btn-secondary"
                                    onClick={() => navigate('/feedbacks')}
                                >
                                    Cancel
                                </button>
                                <button
                                    className="btn btn-primary"
                                    onClick={handleResolve}
                                    style={{ minWidth: 160 }}
                                >
                                    <CheckCircle2 size={16} className="ms mr-1" />
                                    Resolve &amp; Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default FeedbackResolve;
