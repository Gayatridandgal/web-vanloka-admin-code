import React, { useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { INITIAL_STAFF } from '../data/staffData';
import { Users, CheckCircle2, ArrowLeft, User, Camera, Briefcase, Home, AlertTriangle, MapPin, Landmark, UploadCloud, Shield, Save } from 'lucide-react';


/* ── Types ─────────────────────────────────────── */
interface Form {
    profilePhoto: File | null;
    employeeId: string;
    firstName: string;
    lastName: string;
    gender: string;
    maritalStatus: string;
    dob: string;
    joiningDate: string;
    employmentType: string;
    designation: string;
    officialEmail: string;
    mobile: string;
    address1: string;
    address2: string;
    landmark: string;
    state: string;
    district: string;
    city: string;
    pinCode: string;
    primaryName: string;
    primaryPhone: string;
    primaryEmail: string;
    secondaryName: string;
    secondaryPhone: string;
    secondaryEmail: string;
    bankName: string;
    accountHolder: string;
    accountNumber: string;
    ifsc: string;
    aadhaarDoc: File | null;
    panDoc: File | null;
    bankDoc: File | null;
    accountStatus: string;
    roles: string[];
    remarks: string;
}

const INIT: Form = {
    profilePhoto: null,
    employeeId: '',
    firstName: '',
    lastName: '',
    gender: '',
    maritalStatus: '',
    dob: '',
    joiningDate: '',
    employmentType: 'Full Time',
    designation: '',
    officialEmail: '',
    mobile: '',
    address1: '',
    address2: '',
    landmark: '',
    state: '',
    district: '',
    city: '',
    pinCode: '',
    primaryName: '',
    primaryPhone: '',
    primaryEmail: '',
    secondaryName: '',
    secondaryPhone: '',
    secondaryEmail: '',
    bankName: '',
    accountHolder: '',
    accountNumber: '',
    ifsc: '',
    aadhaarDoc: null,
    panDoc: null,
    bankDoc: null,
    accountStatus: 'Active',
    roles: [],
    remarks: '',
};

type Errs = Partial<Record<keyof Form, string>>;

const STATES = [
    'Andhra Pradesh',
    'Arunachal Pradesh',
    'Assam',
    'Bihar',
    'Chhattisgarh',
    'Goa',
    'Gujarat',
    'Haryana',
    'Himachal Pradesh',
    'Jharkhand',
    'Karnataka',
    'Kerala',
    'Madhya Pradesh',
    'Maharashtra',
    'Manipur',
    'Meghalaya',
    'Mizoram',
    'Nagaland',
    'Odisha',
    'Punjab',
    'Rajasthan',
    'Sikkim',
    'Tamil Nadu',
    'Telangana',
    'Tripura',
    'Uttar Pradesh',
    'Uttarakhand',
    'West Bengal',
    'Delhi',
];

const ROLES = ['Manager', 'Coordinator', 'Fleet Operator', 'Support'];

/* ── Tiny helpers ──────────────────────────────── */
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

const Card = ({ children }: { children: React.ReactNode }) => (
    <div
        style={{
            background: 'white',
            border: '1.5px solid var(--border)',
            borderRadius: 12,
            marginBottom: 20,
            overflow: 'hidden',
        }}
    >
        {children}
    </div>
);

const Body = ({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) => (
    <div style={{ padding: '20px 22px', ...style }}>{children}</div>
);

const Grid = ({ cols, children, className = "" }: { cols: string; children: React.ReactNode; className?: string }) => (
    <div style={{ display: 'grid', gridTemplateColumns: cols, gap: 16 }} className={className}>{children}</div>
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

/* ── Component ─────────────────────────────────── */
export const StaffCreate = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id?: string }>();
    const isEdit = Boolean(id);

    // Pre-fill form when editing
    const getInitialForm = (): Form => {
        if (!id) return INIT;
        const emp = INITIAL_STAFF.find((s) => s.id === id);
        if (!emp) return INIT;
        return {
            ...INIT,
            employeeId: emp.id,
            firstName: emp.firstName,
            lastName: emp.lastName,
            gender: emp.gender,
            designation: emp.designation,
            officialEmail: emp.email,
            mobile: emp.phone,
            address1: emp.address,
            city: emp.city,
            state: emp.state,
            pinCode: emp.pinCode,
            joiningDate: '',
            employmentType: emp.employmentType,
            bankName: emp.bankName,
            accountNumber: emp.accountNumber,
            ifsc: emp.ifsc,
            accountStatus: emp.status === 'Active' ? 'Active' : 'Inactive / On Hold',
            roles: [...emp.roles],
            remarks: emp.remarks,
        };
    };

    const [form, setForm] = useState<Form>(getInitialForm);
    const [errs, setErrs] = useState<Errs>({});
    const [saved, setSaved] = useState(false);
    const [preview, setPreview] = useState<string | null>(null);
    const photoRef = useRef<HTMLInputElement>(null);

    /* field helpers */
    const f =
        (key: keyof Form) =>
        (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
            setForm((v) => ({ ...v, [key]: e.target.value }));
            setErrs((v) => ({ ...v, [key]: undefined }));
        };

    const toggleRole = (r: string) =>
        setForm((v) => ({
            ...v,
            roles: v.roles.includes(r) ? v.roles.filter((x) => x !== r) : [...v.roles, r],
        }));

    const handlePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setForm((v) => ({ ...v, profilePhoto: file }));
        setPreview(URL.createObjectURL(file));
    };

    const handleDoc =
        (key: 'aadhaarDoc' | 'panDoc' | 'bankDoc') => (e: React.ChangeEvent<HTMLInputElement>) => {
            const file = e.target.files?.[0];
            if (file) setForm((v) => ({ ...v, [key]: file }));
        };

    /* validation */
    const validate = (): boolean => {
        const e: Errs = {};
        if (!form.firstName.trim()) e.firstName = 'First name is required';
        if (!form.lastName.trim()) e.lastName = 'Last name is required';
        if (!form.gender) e.gender = 'Select gender';
        if (!form.dob) e.dob = 'Date of birth is required';
        if (!form.joiningDate) e.joiningDate = 'Joining date is required';
        if (!form.designation.trim()) e.designation = 'Designation is required';
        if (!form.officialEmail.trim()) e.officialEmail = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(form.officialEmail)) e.officialEmail = 'Invalid email';
        if (!form.mobile.trim()) e.mobile = 'Mobile number is required';
        if (!form.address1.trim()) e.address1 = 'Address is required';
        if (!form.state) e.state = 'Select state';
        if (!form.city.trim()) e.city = 'City is required';
        if (!form.pinCode.trim()) e.pinCode = 'PIN code is required';
        else if (!/^\d{6}$/.test(form.pinCode)) e.pinCode = 'Must be 6 digits';
        if (!form.primaryName.trim()) e.primaryName = 'Primary contact name required';
        if (!form.primaryPhone.trim()) e.primaryPhone = 'Primary contact phone required';
        setErrs(e);
        return Object.keys(e).length === 0;
    };

    const handleSave = () => {
        if (!validate()) {
            const first = document.querySelector('[data-err="1"]');
            if (first) first.scrollIntoView({ behavior: 'smooth', block: 'center' });
            return;
        }
        setSaved(true);
    };

    /* ── Success screen ──────────────────────────── */
    if (saved) {
        return (
            <>
                {/* ── HEADER ── */}
                <div className="page-header">
                    <div>
                        <div className="page-title">
                            <Users size={18} className="ms mr-2" />
                            Staff Management
                        </div>
                        <div className="breadcrumb">
                            Admin <span>/</span> Staff Management <span>/</span> Add New Employee
                        </div>
                    </div>
                </div>
                {/* ── BODY ── */}
                <div
                    className="page-body"
                    style={{ alignItems: 'center', justifyContent: 'center' }}
                >
                    <div
                        style={{
                            background: 'white',
                            borderRadius: 20,
                            border: '1.5px solid var(--border)',
                            padding: '40px 24px',
                            textAlign: 'center',
                            maxWidth: 480,
                            width: '100%',
                            boxShadow: '0 8px 40px rgba(5,150,105,.08)',
                        }}
                        className="md:p-[52px_60px]"
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
                            {isEdit
                                ? 'Employee Updated Successfully'
                                : 'Employee Created Successfully'}
                        </div>
                        <div style={{ fontSize: 13, color: '#059669', marginBottom: 6 }}>
                            {form.firstName} {form.lastName}{' '}
                            {isEdit
                                ? 'has been updated successfully.'
                                : 'has been added to the organization.'}
                        </div>
                        <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 32 }}>
                            Status:{' '}
                            <span
                                style={{
                                    fontWeight: 800,
                                    color: form.accountStatus === 'Active' ? '#059669' : '#64748B',
                                }}
                            >
                                {form.accountStatus}
                            </span>
                            {form.roles.length > 0 && (
                                <>
                                    {' '}
                                    · Roles:{' '}
                                    <span style={{ fontWeight: 800, color: 'var(--primary)' }}>
                                        {form.roles.join(', ')}
                                    </span>
                                </>
                            )}
                        </div>
                        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexDirection: 'column' }} className="sm:flex-row">
                            <button
                                className="btn btn-secondary w-full sm:w-auto"
                                onClick={() => {
                                    setForm(INIT);
                                    setSaved(false);
                                    setPreview(null);
                                }}
                            >
                                Add Another
                            </button>
                            <button className="btn btn-primary w-full sm:w-auto" onClick={() => navigate('/staff')}>
                                <ArrowLeft size={16} className="ms mr-1" />{' '}
                                Back to Staff List
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
            {/* ════════════════════════════════════════
          PAGE HEADER — sticky, uses .page-header
      ════════════════════════════════════════ */}
            <div className="page-header">
                <div>
                    <div className="page-title">
                        <Users size={18} className="ms mr-2" />
                        {isEdit ? 'Edit Employee' : 'Add New Employee'}
                    </div>
                    <div className="breadcrumb">
                        <span
                            style={{
                                cursor: 'pointer',
                                color: 'var(--primary)',
                                fontWeight: 700,
                            }}
                            onClick={() => navigate('/staff')}
                        >
                            Staff Management
                        </span>
                        <span>/</span> {isEdit ? 'Edit Employee' : 'Add New Employee'}
                    </div>
                </div>
                <div style={{ display: 'flex', gap: 12 }}>
                    <button className="btn btn-secondary" onClick={() => navigate('/staff')}>
                        <ArrowLeft size={18} className="ms mr-1" />
                        Back
                    </button>
                </div>
            </div>

            {/* ════════════════════════════════════════
          PAGE BODY — uses .page-body which scrolls
      ════════════════════════════════════════ */}
            <div className="page-body">
                <div style={{ maxWidth: 860, width: '100%', margin: '0 auto' }}>
                    {/* ── BASIC INFORMATION ── */}
                    <Card>
                        <SectionHeader icon={User} title="Basic Information" />
                        <Body>
                            <div style={{ display: 'flex', gap: 24, flexDirection: 'column' }} className="md:flex-row">
                                {/* Photo */}
                                <div style={{ flexShrink: 0 }}>
                                    <Label>Profile Photo</Label>
                                    <div
                                        onClick={() => photoRef.current?.click()}
                                        style={{
                                            width: 108,
                                            height: 108,
                                            borderRadius: 12,
                                            border: '2px dashed var(--border)',
                                            background: 'var(--surface)',
                                            cursor: 'pointer',
                                            overflow: 'hidden',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        {preview ? (
                                            <img
                                                src={preview}
                                                alt=""
                                                style={{
                                                    width: '100%',
                                                    height: '100%',
                                                    objectFit: 'cover',
                                                }}
                                            />
                                        ) : (
                                            <>
                                                <Camera size={28} color="#CBD5E1" />
                                                <span
                                                    style={{
                                                        fontSize: 9,
                                                        fontWeight: 800,
                                                        color: '#94A3B8',
                                                        marginTop: 4,
                                                        textTransform: 'uppercase',
                                                    }}
                                                >
                                                    Upload
                                                </span>
                                            </>
                                        )}
                                    </div>
                                    <input
                                        ref={photoRef}
                                        type="file"
                                        accept=".jpg,.jpeg,.png"
                                        style={{ display: 'none' }}
                                        onChange={handlePhoto}
                                    />
                                    <div
                                        style={{
                                            fontSize: 9,
                                            color: '#94A3B8',
                                            textAlign: 'center',
                                            marginTop: 4,
                                        }}
                                    >
                                        JPG, PNG (Max 2MB)
                                    </div>
                                    <div
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            marginTop: 6,
                                        }}
                                    >
                                        <label
                                            style={{
                                                cursor: 'pointer',
                                            }}
                                        >
                                            <span
                                                style={{
                                                    fontSize: 10,
                                                    fontWeight: 700,
                                                    color: 'var(--primary)',
                                                    border: '1px solid var(--primary)',
                                                    borderRadius: 6,
                                                    padding: '3px 10px',
                                                }}
                                            >
                                                Choose File
                                            </span>
                                            <input
                                                type="file"
                                                accept=".jpg,.jpeg,.png"
                                                style={{ display: 'none' }}
                                                onChange={handlePhoto}
                                            />
                                        </label>
                                    </div>
                                </div>

                                {/* Fields */}
                                <div
                                    style={{
                                        flex: 1,
                                        display: 'grid',
                                        gap: 14,
                                    }}
                                    className="grid-cols-1 sm:grid-cols-2 md:grid-cols-3"
                                >
                                    <div>
                                        <Label>Employee ID</Label>
                                        <input
                                            className="form-input"
                                            placeholder="e.g. EMP-1025"
                                            value={form.employeeId}
                                            onChange={f('employeeId')}
                                            style={{ width: '100%', boxSizing: 'border-box' }}
                                        />
                                    </div>
                                    <div data-err={errs.firstName ? '1' : undefined}>
                                        <Label>First Name</Label>
                                        <input
                                            className="form-input"
                                            placeholder="John"
                                            value={form.firstName}
                                            onChange={f('firstName')}
                                            style={{
                                                width: '100%',
                                                boxSizing: 'border-box',
                                                borderColor: errs.firstName ? '#DC2626' : undefined,
                                            }}
                                        />
                                        <Err msg={errs.firstName} />
                                    </div>
                                    <div data-err={errs.lastName ? '1' : undefined}>
                                        <Label>Last Name</Label>
                                        <input
                                            className="form-input"
                                            placeholder="Doe"
                                            value={form.lastName}
                                            onChange={f('lastName')}
                                            style={{
                                                width: '100%',
                                                boxSizing: 'border-box',
                                                borderColor: errs.lastName ? '#DC2626' : undefined,
                                            }}
                                        />
                                        <Err msg={errs.lastName} />
                                    </div>
                                    <div data-err={errs.gender ? '1' : undefined}>
                                        <Label>Gender</Label>
                                        <select
                                            className="form-select"
                                            value={form.gender}
                                            onChange={f('gender')}
                                            style={{
                                                width: '100%',
                                                boxSizing: 'border-box',
                                                borderColor: errs.gender ? '#DC2626' : undefined,
                                            }}
                                        >
                                            <option value="">Select Gender</option>
                                            <option>Male</option>
                                            <option>Female</option>
                                            <option>Other</option>
                                        </select>
                                        <Err msg={errs.gender} />
                                    </div>
                                    <div>
                                        <Label>Marital Status</Label>
                                        <select
                                            className="form-select"
                                            value={form.maritalStatus}
                                            onChange={f('maritalStatus')}
                                            style={{ width: '100%', boxSizing: 'border-box' }}
                                        >
                                            <option value="">Select Status</option>
                                            <option>Single</option>
                                            <option>Married</option>
                                            <option>Divorced</option>
                                        </select>
                                    </div>
                                    <div data-err={errs.dob ? '1' : undefined}>
                                        <Label>Date of Birth</Label>
                                        <input
                                            type="date"
                                            className="form-input"
                                            value={form.dob}
                                            onChange={f('dob')}
                                            style={{
                                                width: '100%',
                                                boxSizing: 'border-box',
                                                borderColor: errs.dob ? '#DC2626' : undefined,
                                            }}
                                        />
                                        <Err msg={errs.dob} />
                                    </div>
                                    <div data-err={errs.joiningDate ? '1' : undefined}>
                                        <Label>Joining Date</Label>
                                        <input
                                            type="date"
                                            className="form-input"
                                            value={form.joiningDate}
                                            onChange={f('joiningDate')}
                                            style={{
                                                width: '100%',
                                                boxSizing: 'border-box',
                                                borderColor: errs.joiningDate
                                                    ? '#DC2626'
                                                    : undefined,
                                            }}
                                        />
                                        <Err msg={errs.joiningDate} />
                                    </div>
                                </div>
                            </div>
                        </Body>
                    </Card>

                    {/* ── PROFESSIONAL INFO ── */}
                    <Card>
                        <SectionHeader icon={Briefcase} title="Professional Info" />
                        <Body>
                            <Grid cols="1fr 1fr" className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-2">
                                <div>
                                    <Label>Employment Type</Label>
                                    <select
                                        className="form-select"
                                        value={form.employmentType}
                                        onChange={f('employmentType')}
                                        style={{ width: '100%', boxSizing: 'border-box' }}
                                    >
                                        <option>Full Time</option>
                                        <option>Part Time</option>
                                        <option>Contract</option>
                                    </select>
                                </div>
                                <div data-err={errs.designation ? '1' : undefined}>
                                    <Label>Designation</Label>
                                    <input
                                        className="form-input"
                                        placeholder="e.g. Operations Manager"
                                        value={form.designation}
                                        onChange={f('designation')}
                                        style={{
                                            width: '100%',
                                            boxSizing: 'border-box',
                                            borderColor: errs.designation ? '#DC2626' : undefined,
                                        }}
                                    />
                                    <Err msg={errs.designation} />
                                </div>
                                <div data-err={errs.officialEmail ? '1' : undefined}>
                                    <Label>Official Email</Label>
                                    <input
                                        type="email"
                                        className="form-input"
                                        placeholder="john.doe@org.com"
                                        value={form.officialEmail}
                                        onChange={f('officialEmail')}
                                        style={{
                                            width: '100%',
                                            boxSizing: 'border-box',
                                            borderColor: errs.officialEmail ? '#DC2626' : undefined,
                                        }}
                                    />
                                    <Err msg={errs.officialEmail} />
                                </div>
                                <div data-err={errs.mobile ? '1' : undefined}>
                                    <Label>Mobile Number</Label>
                                    <input
                                        className="form-input"
                                        placeholder="+91 XXXXX XXXXX"
                                        value={form.mobile}
                                        onChange={f('mobile')}
                                        style={{
                                            width: '100%',
                                            boxSizing: 'border-box',
                                            borderColor: errs.mobile ? '#DC2626' : undefined,
                                        }}
                                    />
                                    <Err msg={errs.mobile} />
                                </div>
                            </Grid>
                        </Body>
                    </Card>

                    {/* ── ADDRESS DETAILS ── */}
                    <Card>
                        <SectionHeader icon={Home} title="Address Details" />
                        <Body>
                            <Grid cols="1fr 1fr" className="grid-cols-1 sm:grid-cols-2">
                                <div data-err={errs.address1 ? '1' : undefined}>
                                    <Label>Address Line 1</Label>
                                    <input
                                        className="form-input"
                                        placeholder="Building/Flat No, Street"
                                        value={form.address1}
                                        onChange={f('address1')}
                                        style={{
                                            width: '100%',
                                            boxSizing: 'border-box',
                                            borderColor: errs.address1 ? '#DC2626' : undefined,
                                        }}
                                    />
                                    <Err msg={errs.address1} />
                                </div>
                                <div>
                                    <Label>Address Line 2</Label>
                                    <input
                                        className="form-input"
                                        placeholder="Area, Locality"
                                        value={form.address2}
                                        onChange={f('address2')}
                                        style={{ width: '100%', boxSizing: 'border-box' }}
                                    />
                                </div>
                                <div>
                                    <Label>Landmark</Label>
                                    <input
                                        className="form-input"
                                        placeholder="Near XYZ School"
                                        value={form.landmark}
                                        onChange={f('landmark')}
                                        style={{ width: '100%', boxSizing: 'border-box' }}
                                    />
                                </div>
                                <div data-err={errs.state ? '1' : undefined}>
                                    <Label>State</Label>
                                    <select
                                        className="form-select"
                                        value={form.state}
                                        onChange={f('state')}
                                        style={{
                                            width: '100%',
                                            boxSizing: 'border-box',
                                            borderColor: errs.state ? '#DC2626' : undefined,
                                        }}
                                    >
                                        <option value="">Select State</option>
                                        {STATES.map((s) => (
                                            <option key={s}>{s}</option>
                                        ))}
                                    </select>
                                    <Err msg={errs.state} />
                                </div>
                                <div>
                                    <Label>District</Label>
                                    <input
                                        className="form-input"
                                        placeholder="District"
                                        value={form.district}
                                        onChange={f('district')}
                                        style={{ width: '100%', boxSizing: 'border-box' }}
                                    />
                                </div>
                                <div data-err={errs.city ? '1' : undefined}>
                                    <Label>City</Label>
                                    <input
                                        className="form-input"
                                        placeholder="City"
                                        value={form.city}
                                        onChange={f('city')}
                                        style={{
                                            width: '100%',
                                            boxSizing: 'border-box',
                                            borderColor: errs.city ? '#DC2626' : undefined,
                                        }}
                                    />
                                    <Err msg={errs.city} />
                                </div>
                                <div data-err={errs.pinCode ? '1' : undefined}>
                                    <Label>PIN Code</Label>
                                    <input
                                        className="form-input"
                                        placeholder="400XXX"
                                        value={form.pinCode}
                                        onChange={f('pinCode')}
                                        maxLength={6}
                                        style={{
                                            width: '100%',
                                            boxSizing: 'border-box',
                                            borderColor: errs.pinCode ? '#DC2626' : undefined,
                                        }}
                                    />
                                    <Err msg={errs.pinCode} />
                                </div>
                            </Grid>
                        </Body>
                    </Card>

                    {/* ── PRIMARY / SECONDARY CONTACT ── */}
                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: '1fr 1fr',
                            gap: 20,
                            marginBottom: 20,
                        }}
                    >
                        {/* Primary */}
                        <div
                            style={{
                                background: 'white',
                                border: '1.5px solid var(--border)',
                                borderRadius: 12,
                                overflow: 'hidden',
                            }}
                        >
                            <div
                                style={{
                                    padding: '12px 20px',
                                    borderBottom: '1.5px solid var(--border)',
                                    background: 'var(--surface)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 8,
                                }}
                            >
                                <AlertTriangle size={16} color="#DC2626" />
                                <span
                                    style={{
                                        fontSize: 11,
                                        fontWeight: 900,
                                        letterSpacing: '.07em',
                                        textTransform: 'uppercase',
                                    }}
                                >
                                    Primary Contact
                                </span>
                            </div>
                            <div style={{ padding: '18px 20px', display: 'grid', gap: 12 }}>
                                <div data-err={errs.primaryName ? '1' : undefined}>
                                    <Label>Name</Label>
                                    <input
                                        className="form-input"
                                        value={form.primaryName}
                                        onChange={f('primaryName')}
                                        style={{
                                            width: '100%',
                                            boxSizing: 'border-box',
                                            borderColor: errs.primaryName ? '#DC2626' : undefined,
                                        }}
                                    />
                                    <Err msg={errs.primaryName} />
                                </div>
                                <Grid cols="1fr 1fr">
                                    <div data-err={errs.primaryPhone ? '1' : undefined}>
                                        <Label>Phone</Label>
                                        <input
                                            className="form-input"
                                            value={form.primaryPhone}
                                            onChange={f('primaryPhone')}
                                            style={{
                                                width: '100%',
                                                boxSizing: 'border-box',
                                                borderColor: errs.primaryPhone
                                                    ? '#DC2626'
                                                    : undefined,
                                            }}
                                        />
                                        <Err msg={errs.primaryPhone} />
                                    </div>
                                    <div>
                                        <Label>Email</Label>
                                        <input
                                            type="email"
                                            className="form-input"
                                            value={form.primaryEmail}
                                            onChange={f('primaryEmail')}
                                            style={{ width: '100%', boxSizing: 'border-box' }}
                                        />
                                    </div>
                                </Grid>
                            </div>
                        </div>

                        {/* Secondary */}
                        <div
                            style={{
                                background: 'white',
                                border: '1.5px solid var(--border)',
                                borderRadius: 12,
                                overflow: 'hidden',
                            }}
                        >
                            <div
                                style={{
                                    padding: '12px 20px',
                                    borderBottom: '1.5px solid var(--border)',
                                    background: 'var(--surface)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 8,
                                }}
                            >
                                <MapPin size={16} color="#2563EB" />
                                <span
                                    style={{
                                        fontSize: 11,
                                        fontWeight: 900,
                                        letterSpacing: '.07em',
                                        textTransform: 'uppercase',
                                    }}
                                >
                                    Secondary Contact
                                </span>
                            </div>
                            <div style={{ padding: '18px 20px', display: 'grid', gap: 12 }}>
                                <div>
                                    <Label>Name</Label>
                                    <input
                                        className="form-input"
                                        value={form.secondaryName}
                                        onChange={f('secondaryName')}
                                        style={{ width: '100%', boxSizing: 'border-box' }}
                                    />
                                </div>
                                <Grid cols="1fr 1fr">
                                    <div>
                                        <Label>Phone</Label>
                                        <input
                                            className="form-input"
                                            value={form.secondaryPhone}
                                            onChange={f('secondaryPhone')}
                                            style={{ width: '100%', boxSizing: 'border-box' }}
                                        />
                                    </div>
                                    <div>
                                        <Label>Email</Label>
                                        <input
                                            type="email"
                                            className="form-input"
                                            value={form.secondaryEmail}
                                            onChange={f('secondaryEmail')}
                                            style={{ width: '100%', boxSizing: 'border-box' }}
                                        />
                                    </div>
                                </Grid>
                            </div>
                        </div>
                    </div>

                    {/* ── BANK DETAILS ── */}
                    <Card>
                        <SectionHeader icon={Landmark} title="Bank Details" />
                        <Body>
                            <Grid cols="1fr 1fr 1fr 1fr">
                                {[
                                    {
                                        label: 'Bank Name',
                                        key: 'bankName' as const,
                                        ph: 'State Bank of India',
                                    },
                                    {
                                        label: 'Account Holder Name',
                                        key: 'accountHolder' as const,
                                        ph: 'John Doe',
                                    },
                                    {
                                        label: 'Account Number',
                                        key: 'accountNumber' as const,
                                        ph: '000000000000',
                                    },
                                    {
                                        label: 'IFSC Code',
                                        key: 'ifsc' as const,
                                        ph: 'SBIN000XXXX',
                                    },
                                ].map(({ label, key, ph }) => (
                                    <div key={key}>
                                        <Label>{label}</Label>
                                        <input
                                            className="form-input"
                                            placeholder={ph}
                                            value={form[key]}
                                            onChange={f(key)}
                                            style={{ width: '100%', boxSizing: 'border-box' }}
                                        />
                                    </div>
                                ))}
                            </Grid>
                        </Body>
                    </Card>

                    {/* ── DOCUMENT UPLOADS ── */}
                    <Card>
                        <SectionHeader icon={UploadCloud} title="Document Uploads" />
                        <Body>
                            <Grid cols="1fr 1fr 1fr">
                                {(
                                    [
                                        {
                                            label: 'Aadhaar Card (Front/Back)',
                                            key: 'aadhaarDoc' as const,
                                        },
                                        { label: 'PAN Card', key: 'panDoc' as const },
                                        {
                                            label: 'Bank Proof (Cheque/Passbook)',
                                            key: 'bankDoc' as const,
                                        },
                                    ] as const
                                ).map(({ label, key }) => (
                                    <div key={key}>
                                        <Label>{label}</Label>
                                        <label
                                            style={
                                                {
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    height: 96,
                                                    borderRadius: 10,
                                                    border: '2px dashed var(--border)',
                                                    background: form[key]
                                                        ? '#F5F3FF'
                                                        : 'var(--surface)',
                                                    cursor: 'pointer',
                                                    gap: 6,
                                                    borderColor: form[key]
                                                        ? 'var(--primary)'
                                                        : undefined,
                                                } as React.CSSProperties
                                            }
                                        >
                                            <UploadCloud size={26} color={form[key] ? 'var(--primary)' : '#CBD5E1'} />
                                            <span
                                                style={{
                                                    fontSize: 10,
                                                    fontWeight: 700,
                                                    color: form[key] ? 'var(--primary)' : '#94A3B8',
                                                    textAlign: 'center',
                                                    padding: '0 8px',
                                                }}
                                            >
                                                {(form[key] as File | null)?.name ||
                                                    'Click or Drag to Upload'}
                                            </span>
                                            <span style={{ fontSize: 9, color: '#CBD5E1' }}>
                                                PDF, JPG up to 5MB
                                            </span>
                                            <input
                                                type="file"
                                                accept=".pdf,.jpg,.jpeg,.png"
                                                style={{ display: 'none' }}
                                                onChange={handleDoc(key)}
                                            />
                                        </label>
                                    </div>
                                ))}
                            </Grid>
                        </Body>
                    </Card>

                    {/* ── SYSTEM ROLES & STATUS ── */}
                    <Card>
                        <SectionHeader icon={Shield} title="System Roles & Status" />
                        <Body>
                            <Grid cols="1fr 1fr">
                                {/* Account Status */}
                                <div>
                                    <Label>Account Status</Label>
                                    <div style={{ display: 'flex', gap: 20, marginTop: 6 }}>
                                        {['Active', 'Inactive / On Hold'].map((s) => (
                                            <label
                                                key={s}
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: 7,
                                                    cursor: 'pointer',
                                                }}
                                            >
                                                <input
                                                    type="radio"
                                                    name="accStatus"
                                                    value={s}
                                                    checked={form.accountStatus === s}
                                                    onChange={f('accountStatus')}
                                                    style={{
                                                        accentColor: 'var(--primary)',
                                                        width: 15,
                                                        height: 15,
                                                    }}
                                                />
                                                <span style={{ fontSize: 13, fontWeight: 700 }}>
                                                    {s}
                                                </span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {/* Assign Roles */}
                                <div>
                                    <Label>Assign Roles</Label>
                                    <div
                                        style={{
                                            display: 'flex',
                                            flexWrap: 'wrap',
                                            gap: 14,
                                            marginTop: 6,
                                        }}
                                    >
                                        {ROLES.map((r) => (
                                            <label
                                                key={r}
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: 7,
                                                    cursor: 'pointer',
                                                }}
                                            >
                                                <input
                                                    type="checkbox"
                                                    checked={form.roles.includes(r)}
                                                    onChange={() => toggleRole(r)}
                                                    style={{
                                                        accentColor: 'var(--primary)',
                                                        width: 15,
                                                        height: 15,
                                                    }}
                                                />
                                                <span style={{ fontSize: 13, fontWeight: 700 }}>
                                                    {r}
                                                </span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            </Grid>

                            {/* Remarks */}
                            <div style={{ marginTop: 18 }}>
                                <Label>Remarks</Label>
                                <textarea
                                    className="form-input"
                                    rows={3}
                                    placeholder="Add any additional notes about the employee…"
                                    value={form.remarks}
                                    onChange={f('remarks')}
                                    style={{
                                        width: '100%',
                                        boxSizing: 'border-box',
                                        resize: 'vertical',
                                    }}
                                />
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
                        <button className="btn btn-secondary" onClick={() => navigate('/staff')}>
                            CANCEL
                        </button>
                        <button
                            className="btn btn-primary"
                            onClick={handleSave}
                            style={{ minWidth: 200 }}
                        >
                            <Save size={16} className="ms mr-1" />{' '}
                            {isEdit ? 'UPDATE EMPLOYEE' : 'SAVE EMPLOYEE RECORD'}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default StaffCreate;
