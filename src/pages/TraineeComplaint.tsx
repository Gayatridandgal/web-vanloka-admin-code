import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Flag, CheckCircle2, ArrowLeft, Send, MailCheck, Search } from 'lucide-react';

/* ── Types ─────────────────────────────────── */
interface ComplaintForm {
    traineeName: string;
    traineeId: string;
    mobile: string;
    category: string;
    vehicleNumber: string;
    targetPerson: string;
    incidentDate: string;
    complaintDetails: string;
    additionalNotes: string;
}

type Errs = Partial<Record<keyof ComplaintForm, string>>;

const CATEGORIES = [
    'Vehicle Issue',
    'Driver / Instructor Behaviour',
    'Route / Navigation',
    'Safety Concern',
    'Billing / Payment',
    'App / Technical',
    'Scheduling Issue',
    'Other',
];

/* ── Label ── */
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
        <div style={{ fontSize: 10, color: '#DC2626', fontWeight: 700, marginTop: 3 }}>⚠ {msg}</div>
    ) : null;

const OptBadge = () => (
    <span
        style={{
            fontSize: 9,
            fontWeight: 700,
            color: '#94A3B8',
            background: '#F1F5F9',
            borderRadius: 4,
            padding: '1px 5px',
            marginLeft: 5,
            verticalAlign: 'middle',
        }}
    >
        OPT
    </span>
);

/* ── Component ──────────────────────────────── */
export const TraineeComplaint = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState<ComplaintForm>({
        traineeName: '',
        traineeId: '',
        mobile: '',
        category: '',
        vehicleNumber: '',
        targetPerson: '',
        incidentDate: '',
        complaintDetails: '',
        additionalNotes: '',
    });
    const [errs, setErrs] = useState<Errs>({});
    const [submitted, setSubmitted] = useState(false);
    const [refId] = useState(
        () => 'CMP-' + new Date().getFullYear() + '-' + Math.floor(1000 + Math.random() * 9000)
    );

    const f =
        (key: keyof ComplaintForm) =>
        (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
            setForm((v) => ({ ...v, [key]: e.target.value }));
            setErrs((v) => ({ ...v, [key]: undefined }));
        };

    const validate = (): boolean => {
        const e: Errs = {};
        if (!form.traineeName.trim()) e.traineeName = 'Name is required';
        if (!form.mobile.trim()) e.mobile = 'Mobile number is required';
        else if (!/^\d{10}$/.test(form.mobile.replace(/\s/g, '')))
            e.mobile = 'Enter a valid 10-digit number';
        if (!form.category) e.category = 'Select a category';
        if (!form.incidentDate) e.incidentDate = 'Select the incident date';
        if (!form.complaintDetails.trim()) e.complaintDetails = 'Please describe your complaint';
        setErrs(e);
        return Object.keys(e).length === 0;
    };

    const handleSubmit = () => {
        if (!validate()) {
            const first = document.querySelector('[data-err="1"]');
            if (first) first.scrollIntoView({ behavior: 'smooth', block: 'center' });
            return;
        }
        setSubmitted(true);
    };

    /* ── Success screen ── */
    if (submitted) {
        return (
            <>
                <div className="page-header">
                    <div>
                        <div className="page-title">
                            <Flag size={18} className="text-primary" />
                            Submit a Complaint
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
                            <span>/</span> Submit Complaint
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
                            maxWidth: 500,
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
                            Complaint Submitted
                        </div>
                        <div style={{ fontSize: 13, color: '#059669', marginBottom: 6 }}>
                            Your complaint has been registered successfully.
                        </div>
                        <div
                            style={{
                                display: 'inline-block',
                                background: 'var(--primary-light)',
                                border: '1.5px solid var(--primary)',
                                borderRadius: 10,
                                padding: '10px 24px',
                                margin: '8px 0 20px',
                            }}
                        >
                            <div
                                style={{
                                    fontSize: 10,
                                    fontWeight: 800,
                                    color: 'var(--primary)',
                                    textTransform: 'uppercase',
                                    letterSpacing: '.06em',
                                    marginBottom: 4,
                                }}
                            >
                                Reference ID
                            </div>
                            <div
                                style={{
                                    fontSize: 18,
                                    fontWeight: 900,
                                    color: 'var(--primary)',
                                }}
                            >
                                {refId}
                            </div>
                        </div>
                        <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 32 }}>
                            Category:{' '}
                            <span style={{ fontWeight: 800, color: 'var(--primary)' }}>
                                {form.category}
                            </span>
                            <br />
                            Our team will review and respond within 2–3 business days.
                        </div>
                        <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
                            <button
                                className="btn btn-secondary"
                                onClick={() => {
                                    setForm({
                                        traineeName: '',
                                        traineeId: '',
                                        mobile: '',
                                        category: '',
                                        vehicleNumber: '',
                                        targetPerson: '',
                                        incidentDate: '',
                                        complaintDetails: '',
                                        additionalNotes: '',
                                    });
                                    setSubmitted(false);
                                }}
                            >
                                Submit Another
                            </button>
                            <button
                                className="btn btn-primary"
                                onClick={() => navigate('/feedbacks')}
                            >
                                <ArrowLeft size={18} className="ms" />{' '}
                                Back to Feedbacks
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
                        <Flag size={18} className="text-primary" />
                        Submit a Complaint
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
                        <span>/</span> Submit Complaint
                    </div>
                </div>
                <button
                    className="btn btn-secondary"
                    onClick={() => navigate('/feedbacks')}
                    style={{ flexShrink: 0 }}
                >
                    <ArrowLeft size={18} className="ms mr-1" /> Back to List
                </button>
            </div>

            {/* ── PAGE BODY ── */}
            <div className="page-body">
                <div style={{ maxWidth: 860, width: '100%', margin: '0 auto' }}>
                    {/* ── MAIN FORM CARD ── */}
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
                                padding: '22px 28px 18px',
                                borderBottom: '1.5px solid var(--border)',
                                display: 'flex',
                                alignItems: 'center',
                                gap: 12,
                            }}
                        >
                            <button
                                onClick={() => navigate('/feedbacks')}
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    padding: 0,
                                    display: 'flex',
                                    alignItems: 'center',
                                }}
                            >
                                <ArrowLeft size={22} color="#64748B" />
                            </button>
                            <div>
                                <div
                                    style={{
                                        fontSize: 20,
                                        fontWeight: 900,
                                        letterSpacing: '.02em',
                                        color: 'var(--text)',
                                        textTransform: 'uppercase',
                                    }}
                                >
                                    Submit Complaint Form
                                </div>
                                <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 2 }}>
                                    Fill in the details below to register your complaint with the
                                    VanLoka team.
                                </div>
                            </div>
                        </div>

                        {/* Form body */}
                        <div style={{ padding: '24px 28px' }}>
                            {/* Row 1 — Trainee Name + ID */}
                            <div
                                style={{
                                    display: 'grid',
                                    gridTemplateColumns: '1fr 1fr',
                                    gap: 20,
                                    marginBottom: 20,
                                }}
                            >
                                <div data-err={errs.traineeName ? '1' : undefined}>
                                    <Label required>Trainee Name</Label>
                                    <input
                                        className="form-input"
                                        placeholder="Your full name"
                                        value={form.traineeName}
                                        onChange={f('traineeName')}
                                        style={{
                                            borderColor: errs.traineeName ? '#DC2626' : undefined,
                                        }}
                                    />
                                    <Err msg={errs.traineeName} />
                                </div>
                                <div>
                                    <Label>
                                        Trainee ID <OptBadge />
                                    </Label>
                                    <input
                                        className="form-input"
                                        placeholder="e.g. TRN-2024-001"
                                        value={form.traineeId}
                                        onChange={f('traineeId')}
                                    />
                                </div>
                            </div>

                            {/* Row 2 — Mobile + Category */}
                            <div
                                style={{
                                    display: 'grid',
                                    gridTemplateColumns: '1fr 1fr',
                                    gap: 20,
                                    marginBottom: 20,
                                }}
                            >
                                <div data-err={errs.mobile ? '1' : undefined}>
                                    <Label required>Mobile Number</Label>
                                    <input
                                        className="form-input"
                                        placeholder="10-digit number"
                                        value={form.mobile}
                                        onChange={f('mobile')}
                                        style={{ borderColor: errs.mobile ? '#DC2626' : undefined }}
                                    />
                                    <Err msg={errs.mobile} />
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

                            {/* Row 3 — Vehicle No + Target Person + Incident Date */}
                            <div
                                style={{
                                    display: 'grid',
                                    gridTemplateColumns: '1fr 1fr 1fr',
                                    gap: 20,
                                    marginBottom: 20,
                                }}
                            >
                                <div>
                                    <Label>
                                        Vehicle Number <OptBadge />
                                    </Label>
                                    <input
                                        className="form-input"
                                        placeholder="e.g. KA-01-2345"
                                        value={form.vehicleNumber}
                                        onChange={f('vehicleNumber')}
                                    />
                                </div>
                                <div>
                                    <Label>
                                        Complained Against <OptBadge />
                                    </Label>
                                    <input
                                        className="form-input"
                                        placeholder="Instructor / Driver name"
                                        value={form.targetPerson}
                                        onChange={f('targetPerson')}
                                    />
                                </div>
                                <div data-err={errs.incidentDate ? '1' : undefined}>
                                    <Label required>Incident Date</Label>
                                    <input
                                        type="date"
                                        className="form-input"
                                        value={form.incidentDate}
                                        onChange={f('incidentDate')}
                                        style={{
                                            borderColor: errs.incidentDate ? '#DC2626' : undefined,
                                        }}
                                    />
                                    <Err msg={errs.incidentDate} />
                                </div>
                            </div>

                            {/* Complaint Details */}
                            <div
                                style={{ marginBottom: 20 }}
                                data-err={errs.complaintDetails ? '1' : undefined}
                            >
                                <Label required>Complaint Details</Label>
                                <textarea
                                    className="form-input"
                                    rows={4}
                                    placeholder="Describe the steps taken to resolve the complaint..."
                                    value={form.complaintDetails}
                                    onChange={f('complaintDetails')}
                                    style={{
                                        width: '100%',
                                        resize: 'vertical',
                                        borderColor: errs.complaintDetails ? '#DC2626' : undefined,
                                    }}
                                />
                                <Err msg={errs.complaintDetails} />
                            </div>

                            {/* Additional Notes */}
                            <div style={{ marginBottom: 28 }}>
                                <Label>
                                    Additional Notes <OptBadge />
                                </Label>
                                <textarea
                                    className="form-input"
                                    rows={3}
                                    placeholder="Additional notes for internal records..."
                                    value={form.additionalNotes}
                                    onChange={f('additionalNotes')}
                                    style={{ width: '100%', resize: 'vertical' }}
                                />
                            </div>

                            {/* Footer */}
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
                                    onClick={handleSubmit}
                                    style={{ minWidth: 160 }}
                                >
                                    <Send size={16} />
                                    Submit Complaint
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* ── INFO PANEL ── */}
                    <div
                        style={{
                            background: '#F8FAFC',
                            border: '1.5px solid var(--border)',
                            borderRadius: 16,
                            overflow: 'hidden',
                            marginBottom: 8,
                        }}
                    >
                        <div
                            style={{
                                padding: '14px 24px',
                                borderBottom: '1px solid var(--border)',
                            }}
                        >
                            <span
                                style={{
                                    fontSize: 10,
                                    fontWeight: 900,
                                    textTransform: 'uppercase',
                                    letterSpacing: '.08em',
                                    color: '#64748B',
                                }}
                            >
                                What happens next?
                            </span>
                        </div>
                        <div
                            style={{
                                padding: '20px 24px',
                                display: 'grid',
                                gridTemplateColumns: '1fr 1fr 1fr',
                                gap: 20,
                            }}
                        >
                            {[
                                {
                                    icon: 'mark_email_read',
                                    color: '#7C3AED',
                                    bg: '#EDE9FE',
                                    title: 'Acknowledgement',
                                    desc: "You'll receive a reference ID immediately after submission.",
                                },
                                {
                                    icon: 'manage_search',
                                    color: '#D97706',
                                    bg: '#FEF3C7',
                                    title: 'Review',
                                    desc: 'Our team will investigate and review your complaint within 2–3 business days.',
                                },
                                {
                                    icon: 'check_circle',
                                    color: '#059669',
                                    bg: '#DCFCE7',
                                    title: 'Resolution',
                                    desc: "You'll be notified once the complaint has been resolved and closed.",
                                },
                            ].map((item) => (
                                <div
                                    key={item.title}
                                    style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}
                                >
                                    <div
                                        style={{
                                            width: 36,
                                            height: 36,
                                            borderRadius: '50%',
                                            background: item.bg,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            flexShrink: 0,
                                        }}
                                    >
                                        {item.icon === 'mark_email_read' && <MailCheck size={18} color={item.color} />}
                                        {item.icon === 'manage_search' && <Search size={18} color={item.color} />}
                                        {item.icon === 'check_circle' && <CheckCircle2 size={18} color={item.color} />}
                                    </div>
                                    <div>
                                        <div
                                            style={{
                                                fontSize: 13,
                                                fontWeight: 800,
                                                color: 'var(--text)',
                                                marginBottom: 4,
                                            }}
                                        >
                                            {item.title}
                                        </div>
                                        <div
                                            style={{
                                                fontSize: 12,
                                                color: '#64748B',
                                                lineHeight: 1.5,
                                            }}
                                        >
                                            {item.desc}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TraineeComplaint;


