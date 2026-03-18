import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { ChevronDown, X, Building2, MapPin, CheckCircle2, Contact, Home, FileText, Building, Store, Car, GraduationCap, StickyNote, Trash2, UploadCloud, Download, FileDown, Plus, Search, Eye, Edit } from 'lucide-react';
import { useCallback, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as XLSX from 'xlsx';
import {
    type Organisation,
    type OrgType,
    INITIAL_ORGANISATIONS,
    orgStatusVariant,
    orgTypeColor,
    getOrgInitials,
    orgAvatarColor,
} from '../data/organisationData';
import { Badge, Pagination } from '../ui/index';

/* ═══════════════════════════════════════════════════
   VIEW DETAIL OVERLAY
   ═══════════════════════════════════════════════════ */
const ViewOverlay = ({
    org,
    index,
    onClose,
}: {
    org: Organisation;
    index: number;
    onClose: () => void;
}) => {
    const av = orgAvatarColor(index);
    const init = getOrgInitials(org.name);
    const tc = orgTypeColor(org.type);

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
                    maxWidth: 640,
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
                        padding: '28px 28px 24px',
                        borderRadius: '16px 16px 0 0',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 18,
                    }}
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
                            {org.name}
                        </div>
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 10,
                                flexWrap: 'wrap',
                            }}
                        >
                            <span
                                style={{
                                    fontSize: 12,
                                    color: 'rgba(255,255,255,.75)',
                                    fontWeight: 600,
                                }}
                            >
                                ID: #{org.id}
                            </span>
                            <Badge variant={orgStatusVariant(org.status)}>{org.status}</Badge>
                            <span
                                style={{
                                    fontSize: 10,
                                    fontWeight: 800,
                                    padding: '2px 8px',
                                    borderRadius: 6,
                                    background: tc.bg,
                                    color: tc.color,
                                }}
                            >
                                {org.type}
                            </span>
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
                        }}
                    >
                        <X size={20} color="white" />
                    </button>
                </div>

                {/* Body */}
                <div style={{ padding: '24px 28px' }}>
                    {/* Quick stats */}
                    <div className="grid-cols-responsive-3" style={{ marginBottom: 24 }}>
                        {[
                            {
                                label: 'Type',
                                value: org.type,
                                icon: Building2,
                                bg: '#EDE9FE',
                                ic: '#7C3AED',
                            },
                            {
                                label: 'City',
                                value: org.city,
                                icon: MapPin,
                                bg: '#DBEAFE',
                                ic: '#2563EB',
                            },
                            {
                                label: 'Status',
                                value: org.status,
                                icon: CheckCircle2,
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
                                <s.icon size={20} color={s.ic} style={{ marginBottom: 4, display: 'block', margin: '0 auto' }} />
                                <div style={{ fontSize: 14, fontWeight: 900, color: 'var(--text)' }}>
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

                    {/* Contact */}
                    <SectionLabel icon={Contact} title="Contact Details" />
                    <div className="grid-cols-responsive-3" style={{ marginBottom: 24 }}>
                        <Field label="Contact Person" value={org.contactPerson} />
                        <Field label="Email" value={org.email} />
                        <Field label="Phone" value={org.phone} />
                    </div>

                    {/* Address */}
                    <SectionLabel icon={Home} title="Address" />
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
                        {org.address}, {org.city}, {org.state} – {org.pinCode}
                    </div>

                    {/* Statutory */}
                    <SectionLabel icon={FileText} title="Statutory Details" />
                    <div className="grid-cols-responsive-2" style={{ marginBottom: 24 }}>
                        <Field label="GST Number" value={org.gstNumber} />
                        <Field label="PAN Number" value={org.panNumber} />
                    </div>

                    {/* Type-specific details */}
                    {org.type === 'Office' && (
                        <>
                            <SectionLabel icon={Building} title="Office Details" />
                            <div
                                style={{
                                    display: 'grid',
                                    gridTemplateColumns: '1fr 1fr 1fr',
                                    gap: 16,
                                    marginBottom: 24,
                                }}
                            >
                                <Field label="Office Code" value={org.officeCode || ''} />
                                <Field
                                    label="Employees"
                                    value={String(org.numberOfEmployees ?? '—')}
                                />
                                <Field label="Operating Hours" value={org.operatingHours || ''} />
                            </div>
                        </>
                    )}

                    {org.type === 'Vendor' && (
                        <>
                            <SectionLabel icon={Store} title="Vendor Details" />
                            <div
                                style={{
                                    display: 'grid',
                                    gridTemplateColumns: '1fr 1fr 1fr',
                                    gap: 16,
                                    marginBottom: 24,
                                }}
                            >
                                <Field label="Vendor Type" value={org.vendorType || ''} />
                                <Field label="Service Type" value={org.serviceType || ''} />
                                <Field
                                    label="Vehicles"
                                    value={String(org.vehicleCount ?? '—')}
                                />
                            </div>
                            <div
                                style={{
                                    display: 'grid',
                                    gridTemplateColumns: '1fr 1fr',
                                    gap: 16,
                                    marginBottom: 24,
                                }}
                            >
                                <Field
                                    label="Contract Start"
                                    value={org.contractStartDate || ''}
                                />
                                <Field label="Contract End" value={org.contractEndDate || ''} />
                            </div>
                        </>
                    )}

                    {org.type === 'Motor Driving School' && (
                        <>
                            <SectionLabel icon={Car} title="MDS Details" />
                            <div className="grid-cols-responsive-3" style={{ marginBottom: 24 }}>
                                <Field
                                    label="License Number"
                                    value={org.mdsLicenseNumber || ''}
                                />
                                <Field
                                    label="License Expiry"
                                    value={org.licenseExpiryDate || ''}
                                />
                                <Field
                                    label="Total Vehicles"
                                    value={String(org.totalVehicles ?? '—')}
                                />
                            </div>
                            {org.mdsCourses && org.mdsCourses.length > 0 && (
                                <div style={{ marginBottom: 24 }}>
                                    <Field
                                        label="Courses Offered"
                                        value={org.mdsCourses.join(', ')}
                                    />
                                </div>
                            )}
                        </>
                    )}

                    {org.type === 'Institute' && (
                        <>
                            <SectionLabel icon={GraduationCap} title="Institute Details" />
                            <div className="grid-cols-responsive-2" style={{ marginBottom: 24 }}>
                                <Field label="Affiliated Body" value={org.affiliatedBody || ''} />
                                <Field
                                    label="Accreditation No."
                                    value={org.accreditationNumber || ''}
                                />
                            </div>
                            <div className="grid-cols-responsive-2" style={{ marginBottom: 24 }}>
                                <Field
                                    label="Student Capacity"
                                    value={String(org.studentCapacity ?? '—')}
                                />
                                <Field
                                    label="Courses"
                                    value={(org.instituteCourses || []).join(', ')}
                                />
                            </div>
                        </>
                    )}

                    {/* Remarks */}
                    {org.remarks && (
                        <>
                            <SectionLabel icon={StickyNote} title="Remarks" />
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
                                {org.remarks}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

/* tiny helper for the overlay's section headers */
const SectionLabel = ({ icon: Icon, title }: { icon: React.ElementType; title: string }) => (
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
        <Icon size={16} />
        {title}
    </div>
);

/* ═══════════════════════════════════════════════════
   DELETE CONFIRMATION OVERLAY
   ═══════════════════════════════════════════════════ */
const DeleteOverlay = ({
    org,
    onConfirm,
    onCancel,
}: {
    org: Organisation;
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
                Delete Organisation?
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
                {org.name}
            </div>
            <div
                style={{
                    fontSize: 12,
                    color: 'var(--muted)',
                    marginBottom: 24,
                }}
            >
                ID: #{org.id} · {org.type}
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
                    ⚠ This action cannot be undone. All data associated with this organisation will
                    be permanently removed.
                </span>
            </div>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
                <button className="btn btn-secondary" onClick={onCancel} style={{ minWidth: 120 }}>
                    Cancel
                </button>
                <button
                    className="btn"
                    onClick={onConfirm}
                    style={{
                        minWidth: 120,
                        background: '#DC2626',
                        color: 'white',
                        border: 'none',
                        fontWeight: 800,
                    }}
                >
                    <Trash2 size={18} className="ms" />
                    Delete
                </button>
            </div>
        </div>
    </div>
);

/* ═══════════════════════════════════════════════════
   IMPORT EXCEL OVERLAY
   ═══════════════════════════════════════════════════ */
const ImportOverlay = ({
    onClose,
    onImport,
}: {
    onClose: () => void;
    onImport: (rows: Organisation[]) => void;
}) => {
    const fileRef = useRef<HTMLInputElement>(null);
    const [fileName, setFileName] = useState<string | null>(null);
    const [parsedRows, setParsedRows] = useState<Organisation[]>([]);
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

                const rows: Organisation[] = json.map((r, i) => ({
                    id: r['ID'] || r['id'] || `IMP-${Date.now()}-${i}`,
                    name: r['Name'] || r['Organisation Name'] || `Organisation ${i + 1}`,
                    type: (r['Type'] || r['type'] || 'Office') as OrgType,
                    contactPerson: r['Contact Person'] || '',
                    phone: r['Phone'] || r['phone'] || '',
                    email: r['Email'] || r['email'] || '',
                    address: r['Address'] || '',
                    city: r['City'] || '',
                    state: r['State'] || '',
                    pinCode: r['PIN'] || r['Pin Code'] || '',
                    status: (r['Status'] || 'Active') as Organisation['status'],
                    gstNumber: r['GST'] || '',
                    panNumber: r['PAN'] || '',
                    remarks: r['Remarks'] || '',
                }));
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
                        Import Organisation Data
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
                <div style={{ padding: '22px 24px' }}>
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
                        <UploadCloud size={36} color="var(--primary)" style={{ display: 'block', marginBottom: 8, margin: '0 auto' }} />
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
                            Name · Type · Contact Person · Phone · Email · City · State · Status
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div
                    style={{
                        padding: '14px 24px 20px',
                        display: 'flex',
                        justifyContent: 'flex-end',
                        gap: 10,
                    }}
                >
                    <button className="btn btn-secondary" onClick={onClose}>
                        Cancel
                    </button>
                    <button
                        className="btn btn-primary"
                        disabled={parsedRows.length === 0}
                        onClick={() => {
                            onImport(parsedRows);
                            onClose();
                        }}
                        style={
                            parsedRows.length === 0
                                ? { opacity: 0.5, cursor: 'not-allowed' }
                                : undefined
                        }
                    >
                        <UploadCloud size={16} className="ms" />
                        Import {parsedRows.length} Record{parsedRows.length !== 1 ? 's' : ''}
                    </button>
                </div>
            </div>
        </div>
    );
};

/* ═══════════════════════════════════════════════════
   MAIN PAGE COMPONENT
   ═══════════════════════════════════════════════════ */
const PER_PAGE = 8;
const ORG_TYPES: OrgType[] = ['Office', 'Vendor', 'Motor Driving School', 'Institute'];

export const OrganisationPage = () => {
    const navigate = useNavigate();
    const [list, setList] = useState<Organisation[]>(INITIAL_ORGANISATIONS);
    const [query, setQuery] = useState('');
    const [typeFilter, setTypeFilter] = useState<OrgType | ''>('');
    const [statusFilter, setStatusFilter] = useState<Organisation['status'] | ''>('');
    const [page, setPage] = useState(1);
    const [viewIdx, setViewIdx] = useState<number | null>(null);
    const [delIdx, setDelIdx] = useState<number | null>(null);
    const [showImport, setShowImport] = useState(false);
    const [showExport, setShowExport] = useState(false);
    const exportRef = useRef<HTMLDivElement>(null);

    /* ── Filtering ── */
    const filtered = list.filter((o) => {
        const q = query.toLowerCase();
        const matchesQ =
            !q ||
            o.name.toLowerCase().includes(q) ||
            o.id.toLowerCase().includes(q) ||
            o.contactPerson.toLowerCase().includes(q) ||
            o.city.toLowerCase().includes(q);
        const matchesType = !typeFilter || o.type === typeFilter;
        const matchesStatus = !statusFilter || o.status === statusFilter;
        return matchesQ && matchesType && matchesStatus;
    });

    const pages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
    const safePage = Math.min(page, pages);
    const slice = filtered.slice((safePage - 1) * PER_PAGE, safePage * PER_PAGE);

    /* ── Delete ── */
    const confirmDelete = useCallback(() => {
        if (delIdx == null) return;
        setList((prev) => prev.filter((_, i) => i !== delIdx));
        setDelIdx(null);
    }, [delIdx]);

    /* ── Export ── */
    const exportPdf = useCallback(() => {
        const doc = new jsPDF({ orientation: 'landscape' });
        doc.setFontSize(16);
        doc.text('Organisation Report', 14, 18);
        autoTable(doc, {
            startY: 26,
            head: [['ID', 'Name', 'Type', 'Contact', 'Phone', 'City', 'Status']],
            body: filtered.map((o) => [
                o.id,
                o.name,
                o.type,
                o.contactPerson,
                o.phone,
                o.city,
                o.status,
            ]),
            styles: { fontSize: 9 },
            headStyles: { fillColor: [124, 58, 237] },
        });
        doc.save('organisation-report.pdf');
        setShowExport(false);
    }, [filtered]);

    const exportXlsx = useCallback(() => {
        const ws = XLSX.utils.json_to_sheet(
            filtered.map((o) => ({
                ID: o.id,
                Name: o.name,
                Type: o.type,
                Contact: o.contactPerson,
                Phone: o.phone,
                Email: o.email,
                City: o.city,
                State: o.state,
                Status: o.status,
            }))
        );
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Organisations');
        XLSX.writeFile(wb, 'organisation-report.xlsx');
        setShowExport(false);
    }, [filtered]);

    /* ── Close export menu on outside click ── */
    const closeExport = useCallback(
        (e: MouseEvent) => {
            if (exportRef.current && !exportRef.current.contains(e.target as Node))
                setShowExport(false);
        },
        []
    );
    if (showExport) {
        document.addEventListener('mousedown', closeExport);
    } else {
        document.removeEventListener('mousedown', closeExport);
    }

    /* ── Type summary cards ── */
    const counts = {
        Office: list.filter((o) => o.type === 'Office').length,
        Vendor: list.filter((o) => o.type === 'Vendor').length,
        'Motor Driving School': list.filter((o) => o.type === 'Motor Driving School').length,
        Institute: list.filter((o) => o.type === 'Institute').length,
    };

    return (
        <>
            {/* Overlays */}
            {viewIdx != null && (
                <ViewOverlay org={list[viewIdx]} index={viewIdx} onClose={() => setViewIdx(null)} />
            )}
            {delIdx != null && (
                <DeleteOverlay
                    org={list[delIdx]}
                    onConfirm={confirmDelete}
                    onCancel={() => setDelIdx(null)}
                />
            )}
            {showImport && (
                <ImportOverlay
                    onClose={() => setShowImport(false)}
                    onImport={(rows) => setList((prev) => [...rows, ...prev])}
                />
            )}

            {/* ── HEADER ── */}
            <div className="page-header">
                <div>
                    <div className="page-title">
                        <Building2 size={18} className="ms mr-2" />
                        Organisation Management
                    </div>
                    <div className="breadcrumb">
                        Admin <span>/</span> Organisation Management
                    </div>
                </div>
                <div className="header-actions">
                    <div className="responsive-btn-group">
                        <button
                            className="btn btn-success flex-1 justify-center whitespace-nowrap"
                            onClick={() => setShowImport(true)}
                        >
                            <UploadCloud size={18} className="ms mr-1" /> Import
                        </button>
                        <div ref={exportRef} style={{ position: 'relative' }} className="flex-1">
                            <button
                                className="btn btn-secondary w-full justify-center whitespace-nowrap"
                                onClick={() => setShowExport(!showExport)}
                            >
                                <Download size={18} className="ms mr-1" /> Export
                                <ChevronDown size={14} style={{ marginLeft: 4 }} />
                            </button>
                            {showExport && (
                                <div
                                    className="absolute right-0 top-[110%] bg-white border border-[var(--border)] rounded-xl shadow-lg overflow-hidden z-[100] min-w-[180px]"
                                >
                                    <div
                                        className="p-3 cursor-pointer text-xs font-black flex items-center gap-2 hover:bg-slate-50 uppercase tracking-wider"
                                        onClick={exportPdf}
                                    >
                                        <FileDown size={18} className="ms text-red-500" />
                                        Export as PDF
                                    </div>
                                    <div
                                        className="p-3 cursor-pointer text-xs font-black flex items-center gap-2 hover:bg-slate-50 border-t border-[var(--border)] uppercase tracking-wider"
                                        onClick={exportXlsx}
                                    >
                                        <Download size={16} className="text-emerald-500" />
                                        Export as Excel
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    <button
                        className="btn btn-primary whitespace-nowrap"
                        onClick={() => navigate('/organisation/create')}
                    >
                        <Plus size={18} className="ms mr-1" /> Add Organisation
                    </button>
                </div>
            </div>

            {/* ═══ PAGE BODY ═══ */}
            <div className="page-body">
                {/* Summary cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    {ORG_TYPES.map((t) => {
                        const tc = orgTypeColor(t);
                        const isFiltered = typeFilter === t;
                        return (
                            <div
                                key={t}
                                className={`stat-card ${isFiltered ? 'active-filter' : ''}`}
                                style={{
                                    cursor: 'pointer',
                                    borderColor: isFiltered ? 'var(--primary)' : 'var(--border)',
                                    background: isFiltered ? 'var(--primary-light)' : 'white'
                                }}
                                onClick={() => setTypeFilter(prev => prev === t ? '' : t)}
                            >
                                <div 
                                    className="stat-icon" 
                                    style={{ 
                                        background: isFiltered ? 'white' : tc.bg,
                                        boxShadow: isFiltered ? '0 4px 12px rgba(124, 58, 237, 0.15)' : 'none'
                                    }}
                                >
                                    <div style={{ color: isFiltered ? 'var(--primary)' : tc.color }}>
                                        {t === 'Office' && <Building size={20} />}
                                        {t === 'Vendor' && <Store size={20} />}
                                        {t === 'Motor Driving School' && <Car size={20} />}
                                        {t === 'Institute' && <GraduationCap size={20} />}
                                    </div>
                                </div>
                                <div>
                                    <div className="stat-label">
                                        {t === 'Motor Driving School' ? 'MDS' : t}
                                    </div>
                                    <div className="stat-value">{counts[t]}</div>
                                    {isFiltered && <div className="stat-trend trend-up">Filtered</div>}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Toolbar */}
                <div className="toolbar">
                    <div className="toolbar-left">
                        <div style={{ position: 'relative', flex: '1 1 240px' }}>
                            <Search
                                size={17}
                                color="#94A3B8"
                                style={{
                                    position: 'absolute',
                                    left: 12,
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                }}
                            />
                            <input
                                className="form-input"
                                style={{
                                    width: '100%',
                                    boxSizing: 'border-box',
                                    paddingLeft: 36,
                                }}
                                placeholder="Search organisations…"
                                value={query}
                                onChange={(e) => {
                                    setQuery(e.target.value);
                                    setPage(1);
                                }}
                            />
                        </div>
                        <select
                            className="form-select flex-1 sm:flex-none sm:w-[180px]"
                            value={typeFilter}
                            onChange={(e) => {
                                setTypeFilter(e.target.value as OrgType | '');
                                setPage(1);
                            }}
                        >
                            <option value="">All Types</option>
                            {ORG_TYPES.map((t) => (
                                <option key={t} value={t}>
                                    {t === 'Motor Driving School' ? 'MDS' : t}
                                </option>
                            ))}
                        </select>
                        <select
                            className="form-select flex-1 sm:flex-none sm:w-[150px]"
                            value={statusFilter}
                            onChange={(e) => {
                                setStatusFilter(e.target.value as Organisation['status'] | '');
                                setPage(1);
                            }}
                        >
                            <option value="">All Statuses</option>
                            <option>Active</option>
                            <option>Inactive</option>
                            <option>Pending</option>
                        </select>
                    </div>

                    <div className="toolbar-right">
                        <div
                            className="stats-text"
                            style={{
                                fontSize: 12,
                                fontWeight: 700,
                                color: '#64748B',
                            }}
                        >
                            Showing <b>{slice.length}</b> of <b>{filtered.length}</b> organisations
                        </div>
                    </div>
                </div>

                {/* Table */}
                <div className="table-scroll-wrapper">
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr
                                style={{
                                    background: 'var(--surface)',
                                    borderBottom: '1.5px solid var(--border)',
                                }}
                            >
                                {[
                                    'Organisation',
                                    'Type',
                                    'Contact Person',
                                    'City',
                                    'Status',
                                    'Actions',
                                ].map((h) => (
                                    <th
                                        key={h}
                                        style={{
                                            padding: '12px 16px',
                                            textAlign: 'left',
                                            fontSize: 10,
                                            fontWeight: 900,
                                            textTransform: 'uppercase',
                                            letterSpacing: '.06em',
                                            color: '#64748B',
                                        }}
                                    >
                                        {h}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {slice.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan={6}
                                        style={{
                                            padding: 40,
                                            textAlign: 'center',
                                            color: '#94A3B8',
                                            fontWeight: 700,
                                        }}
                                    >
                                        No organisations found.
                                    </td>
                                </tr>
                            ) : (
                                slice.map((o) => {
                                    const realIdx = list.indexOf(o);
                                    const av = orgAvatarColor(realIdx);
                                    const tc = orgTypeColor(o.type);
                                    return (
                                        <tr
                                            key={o.id}
                                            style={{
                                                borderBottom: '1px solid var(--border)',
                                                cursor: 'pointer',
                                                transition: 'background .12s',
                                            }}
                                            onMouseEnter={(e) =>
                                                (e.currentTarget.style.background =
                                                    'var(--surface)')
                                            }
                                            onMouseLeave={(e) =>
                                                (e.currentTarget.style.background = 'transparent')
                                            }
                                            onClick={() => setViewIdx(realIdx)}
                                        >
                                            {/* Organisation */}
                                            <td style={{ padding: '12px 16px' }}>
                                                <div
                                                    style={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: 12,
                                                    }}
                                                >
                                                    <div
                                                        style={{
                                                            width: 36,
                                                            height: 36,
                                                            borderRadius: '50%',
                                                            background: av.bg,
                                                            color: av.cl,
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            fontSize: 12,
                                                            fontWeight: 900,
                                                            flexShrink: 0,
                                                        }}
                                                    >
                                                        {getOrgInitials(o.name)}
                                                    </div>
                                                    <div>
                                                        <div
                                                            style={{
                                                                fontSize: 13,
                                                                fontWeight: 800,
                                                                color: 'var(--text)',
                                                            }}
                                                        >
                                                            {o.name}
                                                        </div>
                                                        <div
                                                            style={{
                                                                fontSize: 11,
                                                                color: '#94A3B8',
                                                                fontWeight: 600,
                                                            }}
                                                        >
                                                            {o.id}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            {/* Type */}
                                            <td style={{ padding: '12px 16px' }}>
                                                <span
                                                    style={{
                                                        fontSize: 11,
                                                        fontWeight: 800,
                                                        padding: '3px 10px',
                                                        borderRadius: 6,
                                                        background: tc.bg,
                                                        color: tc.color,
                                                    }}
                                                >
                                                    {tc.label}
                                                </span>
                                            </td>
                                            {/* Contact */}
                                            <td
                                                style={{
                                                    padding: '12px 16px',
                                                    fontSize: 13,
                                                    fontWeight: 600,
                                                    color: 'var(--text)',
                                                }}
                                            >
                                                {o.contactPerson}
                                            </td>
                                            {/* City */}
                                            <td
                                                style={{
                                                    padding: '12px 16px',
                                                    fontSize: 13,
                                                    color: '#64748B',
                                                    fontWeight: 600,
                                                }}
                                            >
                                                {o.city}
                                            </td>
                                            {/* Status */}
                                            <td style={{ padding: '12px 16px' }}>
                                                <Badge variant={orgStatusVariant(o.status)}>
                                                    {o.status}
                                                </Badge>
                                            </td>
                                            {/* Actions */}
                                            <td onClick={(e) => e.stopPropagation()}>
                                                <div className="actions-col">
                                                    <button
                                                        className="act-btn act-view"
                                                        onClick={() => setViewIdx(realIdx)}
                                                        title="View"
                                                    >
                                                        <Eye size={18} className="ms" />
                                                    </button>
                                                    <button
                                                        className="act-btn act-edit"
                                                        onClick={() =>
                                                            navigate(
                                                                `/organisation/edit/${o.id}`
                                                            )
                                                        }
                                                        title="Edit"
                                                    >
                                                        <Edit size={18} className="ms" />
                                                    </button>
                                                    <button
                                                        className="act-btn act-delete"
                                                        onClick={() => setDelIdx(realIdx)}
                                                        title="Delete"
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
                </div>

                {/* Pagination */}
                {pages > 1 && (
                    <Pagination
                        current={safePage}
                        total={pages}
                        onChange={(p: number) => setPage(p)}
                    />
                )}
            </div>
        </>
    );
};

export default OrganisationPage;
