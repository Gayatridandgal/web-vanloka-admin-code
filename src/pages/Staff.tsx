import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { ChevronDown, X, Building2, Briefcase, Calendar, User as UserIcon, Contact, Home, Landmark, StickyNote, Trash2, UploadCloud, FileDown, Palette, ImagePlus, FileText, Eye, Download, Users, UserCheck, Umbrella, MinusCircle, Search, SearchX, UserPlus, Edit } from 'lucide-react';
import { useCallback, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as XLSX from 'xlsx';
import {
    type Staff,
    getAvatarColor,
    getInitials,
    INITIAL_STAFF,
    staffStatusVariant,
} from '../data/staffData';
import { Badge, Pagination } from '../ui/index';

/* ═══════════════════════════════════════════════════
   VIEW DETAIL OVERLAY
   ═══════════════════════════════════════════════════ */
const ViewOverlay = ({
    staff,
    index,
    onClose,
}: {
    staff: Staff;
    index: number;
    onClose: () => void;
}) => {
    const av = getAvatarColor(index);
    const init = getInitials(staff.firstName, staff.lastName);

    const Field = ({ label, value }: { label: string; value: string }) => (
        <div>
            <div
                style={{
                    fontSize: 10,
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    letterSpacing: '.06em',
                    color: '#94A3B8',
                    marginBottom: 3,
                }}
            >
                {label}
            </div>
            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>
                {value || '—'}
            </div>
        </div>
    );

    return (
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
            onClick={onClose}
        >
            <div
                style={{
                    background: 'white',
                    borderRadius: 16,
                    width: '100%',
                    maxWidth: 600,
                    maxHeight: '90vh',
                    overflow: 'auto',
                    boxShadow: '0 20px 60px rgba(0,0,0,.15)',
                }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div
                    style={{
                        background: 'linear-gradient(135deg, #7C3AED 0%, #4F46E5 100%)',
                        padding: '24px',
                        borderRadius: '16px 16px 0 0',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        textAlign: 'center',
                        gap: 16,
                    }}
                    className="md:flex-row md:text-left md:items-center md:gap-[18px]"
                >
                    <div
                        style={{
                            width: 64,
                            height: 64,
                            borderRadius: '50%',
                            background: av.bg,
                            color: av.cl,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: 22,
                            fontWeight: 900,
                            border: '3px solid rgba(255,255,255,.3)',
                            flexShrink: 0,
                        }}
                    >
                        {init}
                    </div>
                    <div style={{ flex: 1 }}>
                        <div
                            style={{
                                fontSize: 20,
                                fontWeight: 900,
                                color: 'white',
                                marginBottom: 4,
                            }}
                        >
                            {staff.firstName} {staff.lastName}
                        </div>
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 10,
                                flexWrap: 'wrap',
                                justifyContent: 'center',
                            }}
                            className="md:justify-start"
                        >
                            <span
                                style={{
                                    fontSize: 12,
                                    color: 'rgba(255,255,255,.75)',
                                    fontWeight: 600,
                                }}
                            >
                                ID: #{staff.id}
                            </span>
                            <Badge variant={staffStatusVariant(staff.status)}>{staff.status}</Badge>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        style={{
                            background: 'rgba(255,255,255,.15)',
                            border: 'none',
                            borderRadius: 8,
                            width: 36,
                            height: 36,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                            position: 'absolute',
                            top: 20,
                            right: 20,
                        }}
                        className="md:static md:mt-0"
                    >
                        <X size={20} color="white" />
                    </button>
                </div>

                {/* Body */}
                <div style={{ padding: '24px 28px' }}>
                    {/* Quick stats */}
                    <div
                        style={{
                            display: 'grid',
                            gap: 12,
                            marginBottom: 24,
                        }}
                        className="grid-cols-1 md:grid-cols-3"
                    >
                        {[
                            {
                                label: 'Department',
                                value: staff.department,
                                icon: <Building2 size={20} />,
                                bg: '#EDE9FE',
                                ic: '#7C3AED',
                            },
                            {
                                label: 'Employment',
                                value: staff.employmentType,
                                icon: <Briefcase size={20} />,
                                bg: '#DBEAFE',
                                ic: '#2563EB',
                            },
                            {
                                label: 'Joined',
                                value: staff.joiningDate,
                                icon: <Calendar size={20} />,
                                bg: '#DCFCE7',
                                ic: '#059669',
                            },
                        ].map((s) => (
                            <div
                                key={s.label}
                                style={{
                                    background: s.bg,
                                    borderRadius: 10,
                                    padding: '12px 14px',
                                    textAlign: 'center',
                                }}
                            >
                                <div style={{ color: s.ic, marginBottom: 4 }}>
                                    {s.icon}
                                </div>
                                <div
                                    style={{
                                        fontSize: 14,
                                        fontWeight: 900,
                                        color: 'var(--text)',
                                    }}
                                >
                                    {s.value}
                                </div>
                                <div
                                    style={{
                                        fontSize: 10,
                                        fontWeight: 700,
                                        color: '#64748B',
                                        marginTop: 2,
                                    }}
                                >
                                    {s.label}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Personal Details */}
                    <div
                        style={{
                            fontSize: 11,
                            fontWeight: 900,
                            textTransform: 'uppercase',
                            letterSpacing: '.07em',
                            color: 'var(--primary)',
                            marginBottom: 12,
                            display: 'flex',
                            alignItems: 'center',
                            gap: 6,
                        }}
                    >
                        <UserIcon size={16} />
                        Personal Information
                    </div>
                    <div
                        style={{
                            display: 'grid',
                            gap: 16,
                            marginBottom: 24,
                        }}
                        className="grid-cols-1 sm:grid-cols-2 md:grid-cols-3"
                    >
                        <Field label="Designation" value={staff.designation} />
                        <Field label="Gender" value={staff.gender} />
                        <Field label="Roles" value={staff.roles.join(', ')} />
                    </div>

                    {/* Contact */}
                    <div
                        style={{
                            fontSize: 11,
                            fontWeight: 900,
                            textTransform: 'uppercase',
                            letterSpacing: '.07em',
                            color: 'var(--primary)',
                            marginBottom: 12,
                            display: 'flex',
                            alignItems: 'center',
                            gap: 6,
                        }}
                    >
                        <Contact size={16} />
                        Contact Details
                    </div>
                    <div
                        style={{
                            display: 'grid',
                            gap: 16,
                            marginBottom: 24,
                        }}
                        className="grid-cols-1 sm:grid-cols-2"
                    >
                        <Field label="Email" value={staff.email} />
                        <Field label="Phone" value={staff.phone} />
                    </div>

                    {/* Address */}
                    <div
                        style={{
                            fontSize: 11,
                            fontWeight: 900,
                            textTransform: 'uppercase',
                            letterSpacing: '.07em',
                            color: 'var(--primary)',
                            marginBottom: 12,
                            display: 'flex',
                            alignItems: 'center',
                            gap: 6,
                        }}
                    >
                        <Home size={16} />
                        Address
                    </div>
                    <div
                        style={{
                            fontSize: 13,
                            color: '#64748B',
                            lineHeight: 1.6,
                            marginBottom: 24,
                            padding: '12px 16px',
                            background: 'var(--surface)',
                            borderRadius: 8,
                            border: '1px solid var(--border)',
                        }}
                    >
                        {staff.address}, {staff.city}, {staff.state} – {staff.pinCode}
                    </div>

                    {/* Bank Details */}
                    <div
                        style={{
                            fontSize: 11,
                            fontWeight: 900,
                            textTransform: 'uppercase',
                            letterSpacing: '.07em',
                            color: 'var(--primary)',
                            marginBottom: 12,
                            display: 'flex',
                            alignItems: 'center',
                            gap: 6,
                        }}
                    >
                        <Landmark size={16} />
                        Bank Details
                    </div>
                    <div
                        style={{
                            display: 'grid',
                            gap: 16,
                            marginBottom: staff.remarks ? 24 : 0,
                        }}
                        className="grid-cols-1 sm:grid-cols-2 md:grid-cols-3"
                    >
                        <Field label="Bank" value={staff.bankName} />
                        <Field label="Account No." value={staff.accountNumber} />
                        <Field label="IFSC" value={staff.ifsc} />
                    </div>

                    {/* Remarks */}
                    {staff.remarks && (
                        <>
                            <div
                                style={{
                                    fontSize: 11,
                                    fontWeight: 900,
                                    textTransform: 'uppercase',
                                    letterSpacing: '.07em',
                                    color: 'var(--primary)',
                                    marginBottom: 12,
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 6,
                                }}
                            >
                                <StickyNote size={16} />
                                Remarks
                            </div>
                            <div
                                style={{
                                    fontSize: 13,
                                    color: '#64748B',
                                    lineHeight: 1.6,
                                    padding: '12px 16px',
                                    background: 'var(--surface)',
                                    borderRadius: 8,
                                    border: '1px solid var(--border)',
                                }}
                            >
                                {staff.remarks}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

/* ═══════════════════════════════════════════════════
   DELETE CONFIRMATION OVERLAY
   ═══════════════════════════════════════════════════ */
const DeleteOverlay = ({
    staff,
    onConfirm,
    onCancel,
}: {
    staff: Staff;
    onConfirm: () => void;
    onCancel: () => void;
}) => (
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
                    background: '#FEE2E2',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 20px',
                }}
            >
                <Trash2 size={36} color="#DC2626" />
            </div>
            <div
                style={{
                    fontSize: 18,
                    fontWeight: 900,
                    color: '#DC2626',
                    marginBottom: 8,
                }}
            >
                Delete Employee?
            </div>
            <div
                style={{
                    fontSize: 13,
                    color: '#64748B',
                    marginBottom: 6,
                    lineHeight: 1.6,
                }}
            >
                You are about to permanently delete
            </div>
            <div
                style={{
                    fontSize: 15,
                    fontWeight: 800,
                    color: 'var(--text)',
                    marginBottom: 4,
                }}
            >
                {staff.firstName} {staff.lastName}
            </div>
            <div
                style={{
                    fontSize: 12,
                    color: 'var(--muted)',
                    marginBottom: 24,
                }}
            >
                ID: #{staff.id} · {staff.designation}
            </div>
            <div
                style={{
                    background: '#FEF2F2',
                    borderRadius: 8,
                    padding: '10px 14px',
                    marginBottom: 24,
                    border: '1px solid #FECACA',
                }}
            >
                <span style={{ fontSize: 11, fontWeight: 700, color: '#DC2626' }}>
                    ⚠ This action cannot be undone. All data associated with this employee will be
                    permanently removed.
                </span>
            </div>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexDirection: 'column' }} className="sm:flex-row">
                <button className="btn btn-secondary w-full sm:w-auto" onClick={onCancel} style={{ minWidth: 120 }}>
                    Cancel
                </button>
                <button
                    className="btn w-full sm:w-auto"
                    onClick={onConfirm}
                    style={{
                        minWidth: 120,
                        background: '#DC2626',
                        color: 'white',
                        border: 'none',
                        fontWeight: 800,
                    }}
                >
                    <Trash2 size={16} className="ms text-white" />
                    Delete
                </button>
            </div>
        </div>
    </div>
);

/* ═══════════════════════════════════════════════════
   IMPORT EXCEL OVERLAY (functional)
   ═══════════════════════════════════════════════════ */
const ImportOverlay = ({
    onClose,
    onImport,
}: {
    onClose: () => void;
    onImport: (rows: Staff[]) => void;
}) => {
    const fileRef = useRef<HTMLInputElement>(null);
    const [fileName, setFileName] = useState<string | null>(null);
    const [parsedRows, setParsedRows] = useState<Staff[]>([]);
    const [error, setError] = useState<string | null>(null);

    const handleFile = (file: File) => {
        setError(null);
        setFileName(file.name);
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = new Uint8Array(e.target!.result as ArrayBuffer);
                const wb = XLSX.read(data, { type: 'array' });
                const ws = wb.Sheets[wb.SheetNames[0]];
                const json: Record<string, string>[] = XLSX.utils.sheet_to_json(ws, {
                    defval: '',
                });

                const rows: Staff[] = json.map((r, i) => {
                    const firstName =
                        (r['First Name'] || r['Name'] || r['firstName'] || '')
                            .toString()
                            .split(' ')[0] || `Staff${i}`;
                    const lastName = (
                        r['Last Name'] ||
                        r['lastName'] ||
                        (r['Name'] || '').toString().split(' ').slice(1).join(' ') ||
                        ''
                    ).toString();
                    return {
                        id: r['ID'] || r['id'] || `IMP-${Date.now()}-${i}`,
                        firstName,
                        lastName,
                        gender: r['Gender'] || r['gender'] || '—',
                        email: r['Email'] || r['email'] || '',
                        phone: r['Phone'] || r['phone'] || r['Mobile'] || '',
                        designation: r['Designation'] || r['Role'] || r['designation'] || '—',
                        department: r['Department'] || r['department'] || '—',
                        employmentType: (r['Employment Type'] ||
                            r['employmentType'] ||
                            'Full Time') as Staff['employmentType'],
                        joiningDate: r['Join Date'] || r['Joining Date'] || r['joiningDate'] || '—',
                        status: (r['Status'] || r['status'] || 'Active') as Staff['status'],
                        roles: (r['Roles'] || r['roles'] || r['Role'] || 'Support')
                            .toString()
                            .split(',')
                            .map((s: string) => s.trim()),
                        address: r['Address'] || r['address'] || '—',
                        city: r['City'] || r['city'] || '—',
                        state: r['State'] || r['state'] || '—',
                        pinCode: r['PIN'] || r['pinCode'] || r['Pin Code'] || '',
                        bankName: r['Bank'] || r['bankName'] || '—',
                        accountNumber: r['Account No'] || r['accountNumber'] || '—',
                        ifsc: r['IFSC'] || r['ifsc'] || '—',
                        remarks: r['Remarks'] || r['remarks'] || '',
                    };
                });
                setParsedRows(rows);
            } catch {
                setError('Failed to parse the file. Please check the format.');
                setParsedRows([]);
            }
        };
        reader.readAsArrayBuffer(file);
    };

    return (
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
            onClick={onClose}
        >
            <div
                style={{
                    background: 'white',
                    borderRadius: 16,
                    width: '100%',
                    maxWidth: 480,
                    boxShadow: '0 20px 60px rgba(0,0,0,.15)',
                    overflow: 'hidden',
                }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div
                    style={{
                        padding: '20px 24px',
                        borderBottom: '1px solid var(--border)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}
                >
                    <div style={{ fontSize: 15, fontWeight: 900, color: 'var(--text)' }}>
                        Import Staff Data
                    </div>
                    <button
                        onClick={onClose}
                        style={{
                            width: 30,
                            height: 30,
                            borderRadius: 8,
                            border: 'none',
                            background: 'var(--surface)',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <X size={17} color="#64748B" />
                    </button>
                </div>
                {/* Body */}
                <div style={{ padding: '22px 24px' }}>
                    {/* Upload zone */}
                    <div
                        className="upload-zone"
                        onClick={() => fileRef.current?.click()}
                        onDragOver={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                        }}
                        onDrop={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]);
                        }}
                        style={{ cursor: 'pointer' }}
                    >
                        <input
                            ref={fileRef}
                            type="file"
                            accept=".xlsx,.xls,.csv"
                            style={{ display: 'none' }}
                            onChange={(e) => {
                                if (e.target.files?.[0]) handleFile(e.target.files[0]);
                            }}
                        />
                        <UploadCloud size={36} className="text-primary mb-2 mx-auto" style={{ display: 'block' }} />
                        {fileName ? (
                            <>
                                <div
                                    style={{
                                        fontSize: 13,
                                        fontWeight: 800,
                                        marginBottom: 4,
                                        color: '#059669',
                                    }}
                                >
                                    📄 {fileName}
                                </div>
                                <div
                                    style={{
                                        fontSize: 12,
                                        color: 'var(--primary)',
                                        fontWeight: 700,
                                    }}
                                >
                                    {parsedRows.length} record{parsedRows.length !== 1 ? 's' : ''}{' '}
                                    found — click to change file
                                </div>
                            </>
                        ) : (
                            <>
                                <div style={{ fontSize: 13, fontWeight: 800, marginBottom: 4 }}>
                                    Drop file here or click to browse
                                </div>
                                <div style={{ fontSize: 12, color: 'var(--muted)' }}>
                                    Supports .xlsx, .xls, .csv — Max 10 MB
                                </div>
                            </>
                        )}
                    </div>

                    {error && (
                        <div
                            style={{
                                marginTop: 12,
                                fontSize: 12,
                                fontWeight: 700,
                                color: '#DC2626',
                                background: '#FEE2E2',
                                padding: '8px 12px',
                                borderRadius: 8,
                            }}
                        >
                            ⚠ {error}
                        </div>
                    )}

                    {/* Hint */}
                    <div
                        style={{
                            marginTop: 14,
                            background: 'var(--primary-light)',
                            borderRadius: 10,
                            padding: '12px 14px',
                            border: '1px solid #ddd6fe',
                        }}
                    >
                        <div
                            style={{
                                fontSize: 11,
                                fontWeight: 800,
                                color: 'var(--primary)',
                                marginBottom: 6,
                            }}
                        >
                            📋 Expected Columns
                        </div>
                        <div
                            style={{
                                fontSize: 11,
                                color: '#5b21b6',
                                fontWeight: 600,
                                lineHeight: 1.8,
                            }}
                        >
                            First Name · Last Name · Email · Phone · Designation · Department · Join
                            Date · Status
                        </div>
                    </div>
                </div>
                {/* Footer */}
                <div
                    style={{
                        padding: '16px 24px',
                        borderTop: '1px solid var(--border)',
                        display: 'flex',
                        gap: 10,
                        justifyContent: 'flex-end',
                        flexDirection: 'column',
                    }}
                    className="sm:flex-row"
                >
                    <button className="btn btn-secondary w-full sm:w-auto" onClick={onClose}>
                        Cancel
                    </button>
                    <button
                        className="btn btn-success w-full sm:w-auto"
                        disabled={parsedRows.length === 0}
                        style={{ opacity: parsedRows.length === 0 ? 0.5 : 1 }}
                        onClick={() => {
                            onImport(parsedRows);
                            onClose();
                        }}
                    >
                        <span className="material-symbols-outlined ms">upload</span>
                        Upload &amp; Import ({parsedRows.length})
                    </button>
                </div>
            </div>
        </div>
    );
};

/* ═══════════════════════════════════════════════════
   EXPORT PDF OVERLAY (with branding + preview)
   ═══════════════════════════════════════════════════ */
const ExportOverlay = ({
    onClose,
    buildPdf,
    title,
    defaultTitle,
    defaultSubtitle,
    fileName,
}: {
    onClose: () => void;
    buildPdf: (opts: {
        logo?: string;
        companyName: string;
        subtitle: string;
        footerText: string;
    }) => InstanceType<typeof jsPDF>;
    title?: string;
    defaultTitle?: string;
    defaultSubtitle?: string;
    fileName?: string;
}) => {
    const logoRef = useRef<HTMLInputElement>(null);
    const [logoData, setLogoData] = useState<string | null>(null);
    const [logoName, setLogoName] = useState<string | null>(null);
    const [companyName, setCompanyName] = useState(defaultTitle || 'Staff Management Report');
    const [subtitle, setSubtitle] = useState(defaultSubtitle || '');
    const [footerText, setFooterText] = useState('Confidential — For internal use only');
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    const handleLogoFile = (file: File) => {
        if (!file.type.startsWith('image/')) return;
        setLogoName(file.name);
        const reader = new FileReader();
        reader.onload = (e) => setLogoData(e.target!.result as string);
        reader.readAsDataURL(file);
    };

    const generatePreview = () => {
        const doc = buildPdf({
            logo: logoData || undefined,
            companyName,
            subtitle,
            footerText,
        });
        const blob = doc.output('blob');
        const url = URL.createObjectURL(blob);
        if (previewUrl) URL.revokeObjectURL(previewUrl);
        setPreviewUrl(url);
    };

    const handleDownload = () => {
        const doc = buildPdf({
            logo: logoData || undefined,
            companyName,
            subtitle,
            footerText,
        });
        doc.save(fileName || 'staff-report.pdf');
    };

    const overlayTitle = title || 'Export Staff Report';

    return (
        <div
            style={{
                position: 'fixed',
                inset: 0,
                zIndex: 1000,
                background: 'rgba(0,0,0,.5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 20,
            }}
            onClick={onClose}
        >
            <div
                style={{
                    background: 'white',
                    borderRadius: 18,
                    width: '100%',
                    maxWidth: 780,
                    maxHeight: '92vh',
                    overflow: 'auto',
                    boxShadow: '0 24px 64px rgba(0,0,0,.2), 0 0 0 1px rgba(124,58,237,.08)',
                }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div
                    style={{
                        background: 'linear-gradient(135deg, #7C3AED 0%, #4F46E5 100%)',
                        padding: '22px 28px',
                        borderRadius: '18px 18px 0 0',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <FileDown size={24} color="white" className="hidden sm:block" />
                        <div>
                            <div style={{ fontSize: 16, fontWeight: 900, color: 'white' }}>
                                {overlayTitle}
                            </div>
                            <div
                                style={{
                                    fontSize: 11,
                                    color: 'rgba(255,255,255,.7)',
                                    fontWeight: 600,
                                }}
                            >
                                Customize branding &amp; preview
                            </div>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        style={{
                            background: 'rgba(255,255,255,.15)',
                            border: 'none',
                            borderRadius: 8,
                            width: 34,
                            height: 34,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <X size={18} color="white" />
                    </button>
                </div>

                {/* Body */}
                <div style={{ padding: '24px 28px' }}>
                    <div style={{ display: 'grid', gap: 20 }} className="grid-cols-1 lg:grid-cols-2">
                        {/* LEFT: Branding options */}
                        <div>
                            <div
                                style={{
                                    fontSize: 12,
                                    fontWeight: 900,
                                    color: '#7C3AED',
                                    textTransform: 'uppercase',
                                    letterSpacing: '.06em',
                                    marginBottom: 14,
                                }}
                            >
                                <Palette
                                    size={14}
                                    style={{
                                        verticalAlign: 'middle',
                                        marginRight: 4,
                                    }}
                                />
                                Branding Options
                            </div>

                            {/* Company Logo */}
                            <label
                                style={{
                                    fontSize: 11,
                                    fontWeight: 800,
                                    color: '#64748B',
                                    display: 'block',
                                    marginBottom: 6,
                                }}
                            >
                                Company Logo (optional)
                            </label>
                            <div
                                onClick={() => logoRef.current?.click()}
                                onDragOver={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                }}
                                onDrop={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    if (e.dataTransfer.files[0])
                                        handleLogoFile(e.dataTransfer.files[0]);
                                }}
                                style={{
                                    border: '2px dashed #DDD6FE',
                                    borderRadius: 12,
                                    padding: '16px 14px',
                                    textAlign: 'center',
                                    cursor: 'pointer',
                                    background: '#FAFAFE',
                                    transition: 'border-color .2s, background .2s',
                                    marginBottom: 16,
                                }}
                            >
                                <input
                                    ref={logoRef}
                                    type="file"
                                    accept="image/*"
                                    style={{ display: 'none' }}
                                    onChange={(e) => {
                                        if (e.target.files?.[0]) handleLogoFile(e.target.files[0]);
                                    }}
                                />
                                {logoData ? (
                                    <div
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 12,
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <img
                                            src={logoData}
                                            alt="logo"
                                            style={{
                                                width: 40,
                                                height: 40,
                                                objectFit: 'contain',
                                                borderRadius: 6,
                                                border: '1px solid #E2E8F0',
                                            }}
                                        />
                                        <div style={{ textAlign: 'left' }}>
                                            <div
                                                style={{
                                                    fontSize: 12,
                                                    fontWeight: 800,
                                                    color: '#059669',
                                                }}
                                            >
                                                ✓ {logoName}
                                            </div>
                                            <div
                                                style={{
                                                    fontSize: 10,
                                                    color: '#7C3AED',
                                                    fontWeight: 600,
                                                    cursor: 'pointer',
                                                }}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setLogoData(null);
                                                    setLogoName(null);
                                                }}
                                            >
                                                Remove
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        <ImagePlus
                                            size={28}
                                            color="#A78BFA"
                                            style={{
                                                display: 'block',
                                                marginBottom: 4,
                                                margin: '0 auto'
                                            }}
                                        />
                                        <div
                                            style={{
                                                fontSize: 11,
                                                fontWeight: 700,
                                                color: '#7C3AED',
                                            }}
                                        >
                                            Drop logo here or click to browse
                                        </div>
                                        <div
                                            style={{ fontSize: 10, color: '#94A3B8', marginTop: 2 }}
                                        >
                                            PNG, JPG, SVG — Max 2 MB
                                        </div>
                                    </>
                                )}
                            </div>

                            {/* Company Name */}
                            <label
                                style={{
                                    fontSize: 11,
                                    fontWeight: 800,
                                    color: '#64748B',
                                    display: 'block',
                                    marginBottom: 6,
                                }}
                            >
                                Report Title
                            </label>
                            <input
                                type="text"
                                value={companyName}
                                onChange={(e) => setCompanyName(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '9px 12px',
                                    borderRadius: 8,
                                    border: '1px solid #E2E8F0',
                                    fontSize: 13,
                                    fontWeight: 600,
                                    outline: 'none',
                                    marginBottom: 14,
                                }}
                                placeholder="e.g. Acme Corp — Staff Report"
                            />

                            {/* Subtitle */}
                            <label
                                style={{
                                    fontSize: 11,
                                    fontWeight: 800,
                                    color: '#64748B',
                                    display: 'block',
                                    marginBottom: 6,
                                }}
                            >
                                Subtitle
                            </label>
                            <input
                                type="text"
                                value={subtitle}
                                onChange={(e) => setSubtitle(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '9px 12px',
                                    borderRadius: 8,
                                    border: '1px solid #E2E8F0',
                                    fontSize: 13,
                                    fontWeight: 600,
                                    outline: 'none',
                                    marginBottom: 14,
                                }}
                                placeholder="e.g. Q1 2024 Employee Registry"
                            />

                            {/* Footer */}
                            <label
                                style={{
                                    fontSize: 11,
                                    fontWeight: 800,
                                    color: '#64748B',
                                    display: 'block',
                                    marginBottom: 6,
                                }}
                            >
                                Footer Text
                            </label>
                            <input
                                type="text"
                                value={footerText}
                                onChange={(e) => setFooterText(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '9px 12px',
                                    borderRadius: 8,
                                    border: '1px solid #E2E8F0',
                                    fontSize: 13,
                                    fontWeight: 600,
                                    outline: 'none',
                                }}
                                placeholder="e.g. Confidential — For internal use only"
                            />
                        </div>

                        {/* RIGHT: Preview */}
                        <div>
                            <div
                                style={{
                                    fontSize: 12,
                                    fontWeight: 900,
                                    color: '#7C3AED',
                                    textTransform: 'uppercase',
                                    letterSpacing: '.06em',
                                    marginBottom: 14,
                                }}
                            >
                                <Eye
                                    size={14}
                                    style={{
                                        verticalAlign: 'middle',
                                        marginRight: 4,
                                    }}
                                />
                                PDF Preview
                            </div>
                            <div
                                style={{
                                    border: '1px solid #E2E8F0',
                                    borderRadius: 12,
                                    overflow: 'hidden',
                                    background: '#F8FAFC',
                                    height: 320,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                {previewUrl ? (
                                    <iframe
                                        src={previewUrl}
                                        title="PDF Preview"
                                        style={{ width: '100%', height: '100%', border: 'none' }}
                                    />
                                ) : (
                                    <div style={{ textAlign: 'center', padding: 20 }}>
                                        <FileText
                                            size={48}
                                            color="#CBD5E1"
                                            style={{
                                                display: 'block',
                                                marginBottom: 8,
                                                margin: '0 auto'
                                            }}
                                        />
                                        <div
                                            style={{
                                                fontSize: 13,
                                                fontWeight: 700,
                                                color: '#94A3B8',
                                            }}
                                        >
                                            Click "Generate Preview" to see your PDF
                                        </div>
                                        <div
                                            style={{ fontSize: 11, color: '#CBD5E1', marginTop: 4 }}
                                        >
                                            Customize branding options first
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div
                    style={{
                        padding: '18px 28px',
                        borderTop: '1px solid #F1F5F9',
                        display: 'flex',
                        gap: 10,
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                        background: '#FAFAFE',
                        borderRadius: '0 0 18px 18px',
                    }}
                >
                    <button
                        className="btn btn-secondary"
                        onClick={onClose}
                        style={{ marginRight: 'auto' }}
                    >
                        Cancel
                    </button>
                    <button
                        className="btn"
                        onClick={generatePreview}
                        style={{
                            background: 'linear-gradient(135deg, #E9D5FF 0%, #DBEAFE 100%)',
                            color: '#7C3AED',
                            fontWeight: 800,
                            border: '1px solid #DDD6FE',
                        }}
                    >
                        <Eye size={16} className="ms" />
                        Generate Preview
                    </button>
                    <button
                        className="btn"
                        onClick={handleDownload}
                        style={{
                            background: 'linear-gradient(135deg, #7C3AED 0%, #4F46E5 100%)',
                            color: 'white',
                            fontWeight: 800,
                            border: 'none',
                            boxShadow: '0 4px 14px rgba(124,58,237,.3)',
                        }}
                    >
                        <Download size={16} className="ms" />
                        Download PDF
                    </button>
                </div>
            </div>
        </div>
    );
};

/* ═══════════════════════════════════════════════════
   STAFF PAGE
   ═══════════════════════════════════════════════════ */
export const StaffPage = () => {
    const navigate = useNavigate();

    /* ── State ── */
    const [staffList, setStaffList] = useState<Staff[]>(INITIAL_STAFF);
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [roleFilter, setRoleFilter] = useState('All');
    const [viewStaff, setViewStaff] = useState<{
        s: Staff;
        idx: number;
    } | null>(null);
    const [deleteStaff, setDeleteStaff] = useState<Staff | null>(null);
    const [showImport, setShowImport] = useState(false);

    /* ── Filtering ── */
    const filtered = staffList.filter((s) => {
        const q = search.toLowerCase().trim();
        const matchSearch =
            !q ||
            `${s.firstName} ${s.lastName}`.toLowerCase().includes(q) ||
            s.email.toLowerCase().includes(q) ||
            s.id.toLowerCase().includes(q) ||
            s.designation.toLowerCase().includes(q) ||
            s.department.toLowerCase().includes(q);
        const matchStatus = statusFilter === 'All' || s.status === statusFilter;
        const matchRole = roleFilter === 'All' || s.roles.some((r) => r === roleFilter);
        return matchSearch && matchStatus && matchRole;
    });

    /* ── Dynamic stats ── */
    const totalStaff = staffList.length;
    const activeCount = staffList.filter((s) => s.status === 'Active').length;
    const onLeaveCount = staffList.filter((s) => s.status === 'On Leave').length;
    const inactiveCount = staffList.filter((s) => s.status === 'Inactive').length;

    /* ── Delete handler ── */
    const handleDelete = () => {
        if (!deleteStaff) return;
        setStaffList((prev) => prev.filter((s) => s.id !== deleteStaff.id));
        setDeleteStaff(null);
    };

    /* ── Import handler ── */
    const handleImport = (rows: Staff[]) => {
        setStaffList((prev) => [...prev, ...rows]);
    };

    /* ── Export PDF handler (used by overlay) ── */
    const buildPdf = useCallback(
        (opts: { logo?: string; companyName: string; subtitle: string; footerText: string }) => {
            const doc = new jsPDF({ orientation: 'landscape' });
            const pw = doc.internal.pageSize.getWidth();

            // Header background
            doc.setFillColor(124, 58, 237);
            doc.rect(0, 0, pw, 38, 'F');

            // Logo (if provided)
            if (opts.logo) {
                try {
                    doc.addImage(opts.logo, 'PNG', 10, 5, 28, 28);
                } catch {
                    /* ignore bad image */
                }
            }
            const textX = opts.logo ? 44 : 14;

            // Company Name
            doc.setFontSize(18);
            doc.setTextColor(255);
            doc.text(opts.companyName || 'Staff Management Report', textX, 18);

            // Subtitle
            doc.setFontSize(9);
            doc.setTextColor(220, 220, 255);
            doc.text(opts.subtitle || `Generated on ${new Date().toLocaleString()}`, textX, 26);

            // Record count
            doc.setFontSize(8);
            doc.text(`${filtered.length} employee records`, textX, 32);

            const startY = 44;

            // Table
            autoTable(doc, {
                startY,
                head: [
                    [
                        'ID',
                        'Name',
                        'Designation',
                        'Department',
                        'Email',
                        'Phone',
                        'Employment',
                        'Joining Date',
                        'Status',
                    ],
                ],
                body: filtered.map((s) => [
                    s.id,
                    `${s.firstName} ${s.lastName}`,
                    s.designation,
                    s.department,
                    s.email,
                    s.phone,
                    s.employmentType,
                    s.joiningDate,
                    s.status,
                ]),
                styles: {
                    fontSize: 7.5,
                    cellPadding: 3,
                    lineColor: [230, 230, 230],
                    lineWidth: 0.3,
                },
                headStyles: {
                    fillColor: [124, 58, 237],
                    textColor: 255,
                    fontStyle: 'bold',
                    fontSize: 8,
                },
                alternateRowStyles: { fillColor: [248, 245, 255] },
                margin: { left: 10, right: 10 },
            });

            // Footer
            const ph = doc.internal.pageSize.getHeight();
            doc.setFillColor(245, 243, 255);
            doc.rect(0, ph - 14, pw, 14, 'F');
            doc.setFontSize(7);
            doc.setTextColor(120);
            doc.text(opts.footerText || 'Confidential — For internal use only', 10, ph - 6);
            doc.text(`Generated: ${new Date().toLocaleString()}`, pw - 10, ph - 6, {
                align: 'right',
            });

            return doc;
        },
        [filtered]
    );

    const [showExport, setShowExport] = useState(false);
    const [exportIndividualStaff, setExportIndividualStaff] = useState<Staff | null>(null);

    /* ── Build Individual PDF (with branding) ── */
    const buildIndividualPdf = useCallback(
        (s: Staff) =>
            (opts: {
                logo?: string;
                companyName: string;
                subtitle: string;
                footerText: string;
            }) => {
                const doc = new jsPDF();
                const purple = [124, 58, 237] as const;
                const pw = doc.internal.pageSize.getWidth();

                // Header banner
                doc.setFillColor(purple[0], purple[1], purple[2]);
                doc.rect(0, 0, pw, 44, 'F');

                // Logo
                if (opts.logo) {
                    try {
                        doc.addImage(opts.logo, 'PNG', 10, 7, 30, 30);
                    } catch {
                        /* skip */
                    }
                }
                const textX = opts.logo ? 46 : 14;

                // Name
                doc.setFontSize(20);
                doc.setTextColor(255);
                doc.text(opts.companyName || `${s.firstName} ${s.lastName}`, textX, 18);
                doc.setFontSize(10);
                doc.setTextColor(220, 220, 255);
                doc.text(
                    opts.subtitle || `ID: ${s.id}  ·  ${s.designation}  ·  ${s.status}`,
                    textX,
                    28
                );
                doc.setFontSize(8);
                doc.text(`${s.department}  ·  ${s.employmentType}`, textX, 36);

                let y = 54;
                const section = (title: string) => {
                    doc.setFontSize(11);
                    doc.setTextColor(purple[0], purple[1], purple[2]);
                    doc.text(title, 14, y);
                    y += 2;
                    doc.setDrawColor(purple[0], purple[1], purple[2]);
                    doc.line(14, y, 196, y);
                    y += 8;
                };
                const row = (label: string, value: string) => {
                    doc.setFontSize(9);
                    doc.setTextColor(100);
                    doc.text(label, 14, y);
                    doc.setTextColor(30);
                    doc.text(value || '—', 70, y);
                    y += 7;
                };

                section('Personal Information');
                row('Full Name', `${s.firstName} ${s.lastName}`);
                row('Gender', s.gender);
                row('Designation', s.designation);
                row('Department', s.department);
                row('Employment Type', s.employmentType);
                row('Joining Date', s.joiningDate);
                row('Status', s.status);
                row('Roles', s.roles.join(', '));
                y += 4;

                section('Contact Details');
                row('Email', s.email);
                row('Phone', s.phone);
                y += 4;

                section('Address');
                row('Address', s.address);
                row('City', s.city);
                row('State', s.state);
                row('PIN Code', s.pinCode);
                y += 4;

                section('Bank Details');
                row('Bank Name', s.bankName);
                row('Account No.', s.accountNumber);
                row('IFSC Code', s.ifsc);

                if (s.remarks) {
                    y += 4;
                    section('Remarks');
                    doc.setFontSize(9);
                    doc.setTextColor(80);
                    doc.text(s.remarks, 14, y, { maxWidth: 180 });
                }

                // Footer
                const ph = doc.internal.pageSize.getHeight();
                doc.setFillColor(245, 243, 255);
                doc.rect(0, ph - 14, pw, 14, 'F');
                doc.setFontSize(7);
                doc.setTextColor(120);
                doc.text(opts.footerText || 'Confidential — For internal use only', 10, ph - 6);
                doc.text(`Generated: ${new Date().toLocaleString()}`, pw - 10, ph - 6, {
                    align: 'right',
                });

                return doc;
            },
        []
    );

    return (
        <>
            <div className="page-header">
                <div>
                    <div className="page-title">
                        <Users size={18} className="ms" />
                        Staff Management
                    </div>
                    <div className="breadcrumb">
                        Admin <span>/</span> Staff Management
                    </div>
                </div>
                <div className="header-actions">
                    <button className="btn btn-success" onClick={() => setShowImport(true)}>
                        <UploadCloud size={18} className="ms mr-1" />
                        Import Excel
                    </button>
                    <button className="btn btn-secondary" onClick={() => setShowExport(true)}>
                        <Download size={18} className="ms mr-1" />
                        Export PDF
                    </button>
                    <button className="btn btn-primary" onClick={() => navigate('/staff/create')}>
                        <UserPlus size={18} className="ms mr-1" />
                        Add Employee
                    </button>
                </div>
            </div>

            <div className="page-body">
                {/* ── Stat cards (dynamic) ── */}
                <div className="stat-grid stat-grid-4">
                    {[
                        {
                            bg: '#EDE9FE',
                            ic: '#7C3AED',
                            icon: <Users size={20} />,
                            label: 'Total Staff',
                            val: String(totalStaff),
                            trend: `${activeCount} active`,
                            tc: 'trend-up',
                        },
                        {
                            bg: '#DCFCE7',
                            ic: '#059669',
                            icon: <UserCheck size={20} />,
                            label: 'Active',
                            val: String(activeCount),
                            trend: '',
                            tc: '',
                        },
                        {
                            bg: '#FEF3C7',
                            ic: '#D97706',
                            icon: <Umbrella size={20} />,
                            label: 'On Leave',
                            val: String(onLeaveCount),
                            trend: '',
                            tc: '',
                        },
                        {
                            bg: '#FEE2E2',
                            ic: '#DC2626',
                            icon: <MinusCircle size={20} />,
                            label: 'Inactive',
                            val: String(inactiveCount),
                            trend: '',
                            tc: '',
                        },
                    ].map((s) => (
                        <div key={s.label} className="stat-card">
                            <div className="stat-icon" style={{ background: s.bg }}>
                                <div style={{ color: s.ic }}>
                                    {s.icon}
                                </div>
                            </div>
                            <div>
                                <div className="stat-label">{s.label}</div>
                                <div className="stat-value">{s.val}</div>
                                {s.trend && <div className={`stat-trend ${s.tc}`}>{s.trend}</div>}
                            </div>
                        </div>
                    ))}
                </div>

                {/* ── Search + filter bar ── */}
                <div className="filter-bar">
                    {/* Search */}
                    <div style={{ position: 'relative', flex: 1, minWidth: 180 }}>
                        <Search
                                    size={18}
                                    style={{
                                        position: 'absolute',
                                        left: 10,
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        color: 'var(--muted)',
                                        pointerEvents: 'none',
                                    }}
                                />
                        <input
                            className="search-input"
                            style={{ width: '100%', paddingLeft: 36 }}
                            placeholder="Search by name, email, role or ID…"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    {/* Role filter */}
                    <div style={{ position: 'relative' }} className="w-full sm:w-[150px]">
                        <select
                            className="form-select"
                            style={{ width: '100%', paddingRight: 32 }}
                            value={roleFilter}
                            onChange={(e) => setRoleFilter(e.target.value)}
                        >
                            <option value="All">All Roles</option>
                            <option value="Manager">Manager</option>
                            <option value="Coordinator">Coordinator</option>
                            <option value="Fleet Operator">Fleet Operator</option>
                            <option value="Support">Support</option>
                        </select>
                        <ChevronDown
                            size={16}
                            style={{
                                position: 'absolute',
                                right: 10,
                                top: '50%',
                                transform: 'translateY(-50%)',
                                color: 'var(--muted)',
                                pointerEvents: 'none',
                            }}
                        />
                    </div>
                    {/* Status filter */}
                    <div style={{ position: 'relative' }} className="w-full sm:w-[140px]">
                        <select
                            className="form-select"
                            style={{ width: '100%', paddingRight: 32 }}
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                        >
                            <option value="All">All Status</option>
                            <option value="Active">Active</option>
                            <option value="On Leave">On Leave</option>
                            <option value="Inactive">Inactive</option>
                        </select>
                        <ChevronDown
                            size={16}
                            style={{
                                position: 'absolute',
                                right: 10,
                                top: '50%',
                                transform: 'translateY(-50%)',
                                color: 'var(--muted)',
                                pointerEvents: 'none',
                            }}
                        />
                    </div>
                </div>

                {/* ── Table ── */}
                <div className="table-card">
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Employee</th>
                                <th>Role</th>
                                <th>Contact Details</th>
                                <th>Join Date</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan={6}
                                        style={{
                                            textAlign: 'center',
                                            padding: '40px 0',
                                            color: 'var(--muted)',
                                            fontSize: 13,
                                            fontWeight: 600,
                                        }}
                                    >
                                        <SearchX
                                            size={40}
                                            color="#CBD5E1"
                                            style={{
                                                display: 'block',
                                                marginBottom: 8,
                                                margin: '0 auto'
                                            }}
                                        />
                                        No employees found
                                        {search ? ` matching "${search}"` : ''}
                                        {statusFilter !== 'All'
                                            ? ` with status "${statusFilter}"`
                                            : ''}
                                    </td>
                                </tr>
                            ) : (
                                filtered.map((s) => {
                                    const globalIdx = staffList.findIndex((x) => x.id === s.id);
                                    const av = getAvatarColor(globalIdx);
                                    const init = getInitials(s.firstName, s.lastName);
                                    return (
                                        <tr key={s.id}>
                                            <td>
                                                <div
                                                    style={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: 9,
                                                    }}
                                                >
                                                    <div
                                                        className="avatar"
                                                        style={{
                                                            background: av.bg,
                                                            color: av.cl,
                                                            width: 36,
                                                            height: 36,
                                                            fontSize: 12,
                                                        }}
                                                    >
                                                        {init}
                                                    </div>
                                                    <div>
                                                        <div style={{ fontWeight: 800 }}>
                                                            {s.firstName} {s.lastName}
                                                        </div>
                                                        <div
                                                            style={{
                                                                fontSize: 11,
                                                                color: 'var(--muted)',
                                                            }}
                                                        >
                                                            ID: {s.id}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <b>{s.designation}</b>
                                            </td>
                                            <td>
                                                <div style={{ fontSize: 12 }}>
                                                    <div>{s.email}</div>
                                                    <div style={{ color: 'var(--muted)' }}>
                                                        {s.phone}
                                                    </div>
                                                </div>
                                            </td>
                                            <td
                                                style={{
                                                    fontSize: 12,
                                                    color: 'var(--muted)',
                                                }}
                                            >
                                                {s.joiningDate}
                                            </td>
                                            <td>
                                                <Badge variant={staffStatusVariant(s.status)}>
                                                    {s.status}
                                                </Badge>
                                            </td>
                                            <td>
                                                <div className="actions-col">
                                                    <button
                                                        className="act-btn act-view"
                                                        title="View Details"
                                                        onClick={() =>
                                                            setViewStaff({ s, idx: globalIdx })
                                                        }
                                                    >
                                                        <Eye size={18} className="ms" />
                                                    </button>
                                                    <button
                                                        className="act-btn act-edit"
                                                        title="Edit Employee"
                                                        onClick={() =>
                                                            navigate(`/staff/edit/${s.id}`)
                                                        }
                                                    >
                                                        <Edit size={18} className="ms" />
                                                    </button>
                                                    <button
                                                        className="act-btn"
                                                        title="Export PDF"
                                                        style={{ color: '#7C3AED' }}
                                                        onClick={() => setExportIndividualStaff(s)}
                                                    >
                                                        <FileDown size={18} className="ms" />
                                                    </button>
                                                    <button
                                                        className="act-btn act-delete"
                                                        title="Delete Employee"
                                                        onClick={() => setDeleteStaff(s)}
                                                    >
                                                        <Trash2 size={18} className="ms" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                    <Pagination
                        info={`Showing ${filtered.length} of ${staffList.length} employees`}
                        pages={[1, 2, 3]}
                        current={1}
                    />
                </div>
            </div>

            {/* ── View overlay ── */}
            {viewStaff && (
                <ViewOverlay
                    staff={viewStaff.s}
                    index={viewStaff.idx}
                    onClose={() => setViewStaff(null)}
                />
            )}

            {/* ── Delete confirmation ── */}
            {deleteStaff && (
                <DeleteOverlay
                    staff={deleteStaff}
                    onConfirm={handleDelete}
                    onCancel={() => setDeleteStaff(null)}
                />
            )}

            {/* ── Import Excel overlay ── */}
            {showImport && (
                <ImportOverlay onClose={() => setShowImport(false)} onImport={handleImport} />
            )}

            {/* ── Export PDF overlay (bulk) ── */}
            {showExport && (
                <ExportOverlay onClose={() => setShowExport(false)} buildPdf={buildPdf} />
            )}

            {/* ── Export PDF overlay (individual) ── */}
            {exportIndividualStaff && (
                <ExportOverlay
                    onClose={() => setExportIndividualStaff(null)}
                    buildPdf={buildIndividualPdf(exportIndividualStaff)}
                    title={`Export ${exportIndividualStaff.firstName} ${exportIndividualStaff.lastName}`}
                    defaultTitle={`${exportIndividualStaff.firstName} ${exportIndividualStaff.lastName}`}
                    defaultSubtitle={`ID: ${exportIndividualStaff.id}  ·  ${exportIndividualStaff.designation}`}
                    fileName={`${exportIndividualStaff.firstName}-${exportIndividualStaff.lastName}-${exportIndividualStaff.id}.pdf`}
                />
            )}
        </>
    );
};
export default StaffPage;
