import React, { useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { type OrgType, INITIAL_ORGANISATIONS } from '../data/organisationData';

/* ── Types ─────────────────────────────────────── */
interface Form {
    /* common */
    orgName: string;
    orgType: OrgType | '';
    registrationType: string;
    registrationNo: string;
    registrationDate: string;
    udyamNo: string;
    gstNumber: string;
    panNumber: string;
    tanNumber: string;
    email: string;
    phone: string;
    website: string;
    subscriptionPlan: string;

    /* Operational Metrics */
    totalEmployees: string;
    totalVehicles: string;
    gpsDevices: string;
    beaconsDevices: string;
    shifts: string;
    branches: string;
    workingHours: string;
    workingDays: string;

    /* Institution Specifics */
    institutionType: string;
    affiliationBoard: string;
    udiseCode: string;
    emergencyContactName: string;
    emergencyContactNumber: string;
    villageLocality: string;
    numStudents: string;
    numStaff: string;
    numVehiclesOperated: string;
    numDriversAssigned: string;
    numBeaconsAssigned: string;
    numGPSDevicesAssigned: string;
    safetyOfficerName: string;
    safetyOfficerContact: string;
    consentCheckbox: boolean;
    consentTimestamp: string;

    /* Address */
    address1: string;
    address2: string;
    landmark: string;
    state: string;
    district: string;
    city: string;
    pinCode: string;

    /* Primary Contact (Office/Common) */
    primaryContactName: string;
    primaryContactEmail: string;
    primaryContactPhone1: string;
    primaryContactPhone2: string;

    /* Secondary Contact (Office/Common) */
    secondaryContactName: string;
    secondaryContactEmail: string;
    secondaryContactPhone1: string;
    secondaryContactPhone2: string;

    /* Login Credentials */
    adminEmail: string;
    password: string;

    /* Vendor Specifics */
    bankAccountNo: string;
    bankIfsc: string;
    accountHolderName: string;
    aadhaarNumber: string;
    insuranceCoverage: string;
    safetyTrainingCompleted: boolean;
    vehicleNumbers: string;
    vehicleTypes: string[];
    gpsInstalled: string;
    beaconInstalled: string;
    permitValidity: boolean;
    insuranceValidity: boolean;
    fitnessValidity: boolean;
    pollutionValidity: boolean;

    /* Documents (Files) */
    registrationCert: File | null;
    gstCert: File | null;
    panCard: File | null;
    aadhaarCard: File | null;
    bankProof: File | null;
    contractDoc: File | null;
    udyamCert: File | null;
    transportPolicy: File | null;
    safetySop: File | null;
    vendorPolicy: File | null;
    driverVettingPolicy: File | null;
    insuranceCert: File | null;
    subscriptionAgreement: File | null;
    additionalDoc: File | null;
    safetyEquipChecklist: File | null;

    /* Institution Docs */
    udiseProof: File | null;
    maintenancePolicy: File | null;
    cctvPolicy: File | null;
    consentDeclaration: File | null;

    /* MDS Docs */
    rtoLicenseCopy: File | null;
    trainerCertList: File | null;
    fitnessCert: File | null;

    status: string;
    remarks: string;

    /* Compatibility & Legacy / MDS Specifics */
    contactPerson: string;
    officeCode: string;
    numberOfEmployees: string;
    operatingHours: string;
    vendorType: string;
    serviceType: string;
    contractStartDate: string;
    contractEndDate: string;
    vehicleCount: string;
    mdsLicenseNumber: string;
    licenseIssueDate: string;
    licenseExpiryDate: string;
    numTrainingVehicles: string;
    numTrainers: string;
    numStudentsEnrolled: string;
    numGPSDevicesAssignedMds: string;
    numBeaconsAssignedMds: string;
    mdsCourses: string[];
    affiliatedBody: string;
    accreditationNumber: string;
    instituteCourses: string[];
    studentCapacity: string;
    remarksNotes: string;
}

const INIT: Form = {
    orgName: '',
    orgType: '',
    registrationType: '',
    registrationNo: '',
    registrationDate: '',
    udyamNo: '',
    gstNumber: '',
    panNumber: '',
    tanNumber: '',
    email: '',
    phone: '',
    website: '',
    subscriptionPlan: '',

    totalEmployees: '',
    totalVehicles: '',
    gpsDevices: '',
    beaconsDevices: '',
    shifts: '',
    branches: '',
    workingHours: '',
    workingDays: '',

    institutionType: '',
    affiliationBoard: '',
    udiseCode: '',
    emergencyContactName: '',
    emergencyContactNumber: '',
    villageLocality: '',
    numStudents: '',
    numStaff: '',
    numVehiclesOperated: '',
    numDriversAssigned: '',
    numBeaconsAssigned: '',
    numGPSDevicesAssigned: '',
    safetyOfficerName: '',
    safetyOfficerContact: '',
    consentCheckbox: false,
    consentTimestamp: '',

    address1: '',
    address2: '',
    landmark: '',
    state: 'Karnataka',
    district: '',
    city: '',
    pinCode: '',

    primaryContactName: '',
    primaryContactEmail: '',
    primaryContactPhone1: '',
    primaryContactPhone2: '',

    secondaryContactName: '',
    secondaryContactEmail: '',
    secondaryContactPhone1: '',
    secondaryContactPhone2: '',

    adminEmail: '',
    password: '',

    bankAccountNo: '',
    bankIfsc: '',
    accountHolderName: '',
    aadhaarNumber: '',
    insuranceCoverage: 'No',
    safetyTrainingCompleted: false,
    vehicleNumbers: '',
    vehicleTypes: [],
    gpsInstalled: 'No',
    beaconInstalled: 'No',
    permitValidity: false,
    insuranceValidity: false,
    fitnessValidity: false,
    pollutionValidity: false,

    registrationCert: null,
    gstCert: null,
    panCard: null,
    aadhaarCard: null,
    bankProof: null,
    contractDoc: null,
    udyamCert: null,
    transportPolicy: null,
    safetySop: null,
    vendorPolicy: null,
    driverVettingPolicy: null,
    insuranceCert: null,
    subscriptionAgreement: null,
    additionalDoc: null,
    safetyEquipChecklist: null,
    udiseProof: null,
    maintenancePolicy: null,
    cctvPolicy: null,
    consentDeclaration: null,
    rtoLicenseCopy: null,
    trainerCertList: null,
    fitnessCert: null,

    status: 'Active',
    remarks: '',

    contactPerson: '',
    officeCode: '',
    numberOfEmployees: '',
    operatingHours: '',
    vendorType: '',
    serviceType: '',
    contractStartDate: '',
    contractEndDate: '',
    vehicleCount: '',
    mdsLicenseNumber: '',
    licenseIssueDate: '',
    licenseExpiryDate: '',
    numTrainingVehicles: '',
    numTrainers: '',
    numStudentsEnrolled: '',
    numGPSDevicesAssignedMds: '',
    numBeaconsAssignedMds: '',
    mdsCourses: [],
    affiliatedBody: '',
    accreditationNumber: '',
    instituteCourses: [],
    studentCapacity: '',
    remarksNotes: '',
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



const VEHICLE_TYPES = ['Bus', 'Van', 'Car', 'Auto', 'Two-wheeler'];

/* ── Tiny Helpers ──────────────────────────────── */
const SectionHeader = ({ icon, title }: { icon: string; title: string }) => (
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
        <span
            className="material-symbols-outlined"
            style={{ fontSize: 18, color: 'var(--primary)' }}
        >
            {icon}
        </span>
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

const Grid = ({ cols, children, style }: { cols: string; children: React.ReactNode; style?: React.CSSProperties }) => (
    <div style={{ display: 'grid', gridTemplateColumns: cols, gap: 16, ...style }}>{children}</div>
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
export const OrganisationCreate = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id?: string }>();
    const isEdit = Boolean(id);

    /* Pre-fill when editing */
    const getInitialForm = (): Form => {
        if (!id) return INIT;
        const org = INITIAL_ORGANISATIONS.find((o) => o.id === id);
        if (!org) return INIT;
        return {
            ...INIT,
            orgName: org.name,
            orgType: org.type,
            contactPerson: org.contactPerson,
            phone: org.phone,
            email: org.email,
            address1: org.address,
            city: org.city,
            state: org.state,
            pinCode: org.pinCode,
            gstNumber: org.gstNumber,
            panNumber: org.panNumber,
            status: org.status,
            remarks: org.remarks,
            officeCode: org.officeCode || '',
            numberOfEmployees: org.numberOfEmployees != null ? String(org.numberOfEmployees) : '',
            operatingHours: org.operatingHours || '',
            vendorType: org.vendorType || '',
            serviceType: org.serviceType || '',
            contractStartDate: org.contractStartDate || '',
            contractEndDate: org.contractEndDate || '',
            vehicleCount: org.vehicleCount != null ? String(org.vehicleCount) : '',
            mdsLicenseNumber: org.mdsLicenseNumber || '',
            licenseExpiryDate: org.licenseExpiryDate || '',
            totalVehicles: org.totalVehicles != null ? String(org.totalVehicles) : '',
            mdsCourses: org.mdsCourses || [],
            affiliatedBody: org.affiliatedBody || '',
            accreditationNumber: org.accreditationNumber || '',
            instituteCourses: org.instituteCourses || [],
            studentCapacity: org.studentCapacity != null ? String(org.studentCapacity) : '',
        };
    };

    const [form, setForm] = useState<Form>(getInitialForm);
    const [errs, setErrs] = useState<Errs>({});
    const [saved, setSaved] = useState(false);

    /* field helpers */
    const f =
        (key: keyof Form) =>
            (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
                setForm((v) => ({ ...v, [key]: e.target.value }));
                setErrs((v) => ({ ...v, [key]: undefined }));
            };

    const toggleCourse = (list: 'mdsCourses' | 'instituteCourses', course: string) =>
        setForm((v) => ({
            ...v,
            [list]: (v[list] as string[]).includes(course)
                ? (v[list] as string[]).filter((c) => c !== course)
                : [...(v[list] as string[]), course],
        }));

    const handleConsent = (e: React.ChangeEvent<HTMLInputElement>) => {
        const checked = e.target.checked;
        setForm((v) => ({
            ...v,
            consentCheckbox: checked,
            consentTimestamp: checked ? new Date().toLocaleString() : '',
        }));
        setErrs((v) => ({ ...v, consentCheckbox: undefined }));
    };

    const handleDoc =
        (key: keyof Form) =>
            (e: React.ChangeEvent<HTMLInputElement>) => {
                const file = e.target.files?.[0];
                if (file) setForm((v) => ({ ...v, [key]: file }));
            };

    /* validation */
    const validate = (): boolean => {
        const e: Errs = {};
        if (!form.orgName.trim()) e.orgName = 'Organisation name is required';
        if (!form.orgType) e.orgType = 'Select organisation type';

        if (form.orgType === 'Office') {
            if (!form.subscriptionPlan) e.subscriptionPlan = 'Select plan';
            if (!form.email.trim()) e.email = 'Organisation email is required';
            if (!form.phone.trim()) e.phone = 'Organisation phone is required';
            if (!form.address1.trim()) e.address1 = 'Address is required';
            if (!form.state) e.state = 'Select state';
            if (!form.district.trim()) e.district = 'District is required';
            if (!form.city.trim()) e.city = 'City is required';
            if (!form.pinCode.trim()) e.pinCode = 'Pincode is required';

            if (!form.primaryContactName.trim()) e.primaryContactName = 'Name is required';
            if (!form.primaryContactEmail.trim()) e.primaryContactEmail = 'Email is required';
            if (!form.primaryContactPhone1.trim()) e.primaryContactPhone1 = 'Phone is required';

            if (!form.adminEmail.trim()) e.adminEmail = 'Username is required';
            if (!form.password.trim()) e.password = 'Password is required';
        } else if (form.orgType === 'Institute') {
            if (!form.institutionType) e.institutionType = 'Select type';
            if (!form.affiliationBoard) e.affiliationBoard = 'Select board';
            if (!form.registrationType) e.registrationType = 'Select type';
            if (!form.registrationNo.trim()) e.registrationNo = 'Registration number is required';
            if (!form.udiseCode.trim()) e.udiseCode = 'UDISE code is required';
            if (!form.panNumber.trim()) e.panNumber = 'PAN number is required';

            if (!form.primaryContactName.trim()) e.primaryContactName = 'Contact person is required';
            if (!form.primaryContactPhone1.trim()) e.primaryContactPhone1 = 'Mobile is required';
            if (!form.primaryContactEmail.trim()) e.primaryContactEmail = 'Email is required';

            if (!form.emergencyContactName.trim()) e.emergencyContactName = 'Emergency contact name required';
            if (!form.emergencyContactNumber.trim()) e.emergencyContactNumber = 'Emergency contact number required';

            if (!form.address1.trim()) e.address1 = 'Campus address is required';
            if (!form.villageLocality.trim()) e.villageLocality = 'Village/Locality is required';
            if (!form.city.trim()) e.city = 'City is required';
            if (!form.district.trim()) e.district = 'District is required';
            if (!form.state) e.state = 'Select state';
            if (!form.pinCode.trim()) e.pinCode = 'PIN code is required';

            if (!form.numStudents.trim()) e.numStudents = 'Required';
            if (!form.numStaff.trim()) e.numStaff = 'Required';
            if (!form.numVehiclesOperated.trim()) e.numVehiclesOperated = 'Required';
            if (!form.numDriversAssigned.trim()) e.numDriversAssigned = 'Required';
            if (!form.numBeaconsAssigned.trim()) e.numBeaconsAssigned = 'Required';
            if (!form.numGPSDevicesAssigned.trim()) e.numGPSDevicesAssigned = 'Required';
            if (!form.subscriptionPlan) e.subscriptionPlan = 'Select plan';
            if (!form.consentCheckbox) e.consentCheckbox = 'Consent is required';

            /* Institute Mandatory Docs mapping */
            const mandatoryDocs: (keyof Form)[] = [
                'panCard', 'registrationCert', 'udiseProof', 'safetySop',
                'transportPolicy', 'insuranceCert', 'driverVettingPolicy',
                'maintenancePolicy', 'subscriptionAgreement', 'consentDeclaration'
            ];
            mandatoryDocs.forEach(doc => {
                if (!form[doc]) e[doc] = 'Required';
            });
        } else if (form.orgType === 'Vendor') {
            if (!form.orgName.trim()) e.orgName = 'Vendor name is required';
            if (!form.vendorType) e.vendorType = 'Select vendor type';

            if (!form.primaryContactName.trim()) e.primaryContactName = 'Contact person is required';
            if (!form.primaryContactPhone1.trim()) e.primaryContactPhone1 = 'Mobile is required';

            if (!form.emergencyContactName.trim()) e.emergencyContactName = 'Emergency contact required';
            if (!form.emergencyContactNumber.trim()) e.emergencyContactNumber = 'Emergency phone required';

            if (!form.address1.trim()) e.address1 = 'Office address is required';
            if (!form.villageLocality.trim()) e.villageLocality = 'Village/Locality is required';
            if (!form.city.trim()) e.city = 'City is required';
            if (!form.district.trim()) e.district = 'District is required';
            if (!form.state) e.state = 'Select state';
            if (!form.pinCode.trim()) e.pinCode = 'PIN code is required';

            if (!form.gstNumber.trim()) e.gstNumber = 'GST number is required';
            if (!form.panNumber.trim()) e.panNumber = 'PAN number is required';
            if (form.vendorType === 'Individual' && !form.aadhaarNumber.trim()) e.aadhaarNumber = 'Aadhaar required for individual';

            if (!form.bankAccountNo.trim()) e.bankAccountNo = 'Account number required';
            if (!form.bankIfsc.trim()) e.bankIfsc = 'IFSC required';
            if (!form.accountHolderName.trim()) e.accountHolderName = 'Holder name required';

            if (!form.contractStartDate) e.contractStartDate = 'Required';
            if (!form.contractEndDate) e.contractEndDate = 'Required';
            if (!form.insuranceCoverage) e.insuranceCoverage = 'Select status';
            if (!form.consentCheckbox) e.consentCheckbox = 'Consent required';

            if (!form.vehicleCount.trim()) e.vehicleCount = 'Required';
            if (!form.vehicleNumbers.trim()) e.vehicleNumbers = 'Required';
            if (form.vehicleTypes.length === 0) e.vehicleTypes = 'Select at least one';
            if (!form.gpsInstalled) e.gpsInstalled = 'Select status';
            if (!form.beaconInstalled) e.beaconInstalled = 'Select status';

            /* Mandatory Vendor Docs */
            const vendorDocs: (keyof Form)[] = ['panCard', 'gstCert', 'bankProof', 'contractDoc'];
            vendorDocs.forEach(doc => {
                if (!form[doc]) e[doc] = 'Required';
            });
            if (form.vendorType === 'Individual' && !form.aadhaarCard) e.aadhaarCard = 'Required';
            if (form.insuranceCoverage === 'Yes' && !form.insuranceCert) e.insuranceCert = 'Required';

        } else if (form.orgType === 'Motor Driving School') {
            if (!form.orgName.trim()) e.orgName = 'Driving school name is required';
            if (!form.mdsLicenseNumber.trim()) e.mdsLicenseNumber = 'License number is required';
            if (!form.licenseIssueDate.trim()) e.licenseIssueDate = 'Issue date is required';
            if (!form.licenseExpiryDate.trim()) e.licenseExpiryDate = 'Expiry date is required';
            if (!form.registrationType) e.registrationType = 'Select type';
            if (!form.registrationNo.trim()) e.registrationNo = 'Registration number is required';
            if (!form.panNumber.trim()) e.panNumber = 'PAN number is required';

            if (!form.primaryContactName.trim()) e.primaryContactName = 'Contact person is required';
            if (!form.primaryContactPhone1.trim()) e.primaryContactPhone1 = 'Mobile is required';
            if (!form.email.trim()) e.email = 'Email is required';
            if (!form.emergencyContactName.trim()) e.emergencyContactName = 'Emergency contact required';
            if (!form.emergencyContactNumber.trim()) e.emergencyContactNumber = 'Emergency phone required';

            if (!form.address1.trim()) e.address1 = 'Office address is required';
            if (!form.villageLocality.trim()) e.villageLocality = 'Village/Locality is required';
            if (!form.city.trim()) e.city = 'City is required';
            if (!form.district.trim()) e.district = 'District is required';
            if (!form.state) e.state = 'Select state';
            if (!form.pinCode.trim()) e.pinCode = 'PIN code is required';

            if (!form.numTrainingVehicles.trim()) e.numTrainingVehicles = 'Required';
            if (!form.numTrainers.trim()) e.numTrainers = 'Required';
            if (!form.numStudentsEnrolled.trim()) e.numStudentsEnrolled = 'Required';
            if (!form.numGPSDevicesAssignedMds.trim()) e.numGPSDevicesAssignedMds = 'Required';
            if (!form.subscriptionPlan) e.subscriptionPlan = 'Select plan';
            if (!form.consentCheckbox) e.consentCheckbox = 'Consent required';

            /* Mandatory MDS Docs */
            const mdsDocs: (keyof Form)[] = [
                'rtoLicenseCopy', 'panCard', 'registrationCert', 'safetySop',
                'trainerCertList', 'insuranceCert', 'fitnessCert', 'driverVettingPolicy',
                'subscriptionAgreement', 'consentDeclaration'
            ];
            mdsDocs.forEach(doc => {
                if (!form[doc]) e[doc] = 'Required';
            });
        } else {
            /* Standard validation for other types */
            if (!form.contactPerson.trim()) e.contactPerson = 'Contact person is required';
            if (!form.email.trim()) e.email = 'Email is required';
            if (!form.phone.trim()) e.phone = 'Phone is required';
            if (!form.address1.trim()) e.address1 = 'Address is required';
            if (!form.state) e.state = 'Select state';
            if (!form.city.trim()) e.city = 'City is required';
            if (!form.pinCode.trim()) e.pinCode = 'PIN code is required';
        }

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
                <div className="page-header">
                    <div>
                        <div className="page-title">
                            <span
                                className="material-symbols-outlined ms"
                                style={{ fontSize: 18 }}
                            >
                                corporate_fare
                            </span>
                            Organisation Management
                        </div>
                        <div className="breadcrumb">
                            Admin <span>/</span> Organisation Management <span>/</span>{' '}
                            {isEdit ? 'Edit' : 'Add New'}
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
                            <span
                                className="material-symbols-outlined"
                                style={{ fontSize: 44, color: '#059669' }}
                            >
                                check_circle
                            </span>
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
                                ? 'Organisation Updated Successfully'
                                : 'Organisation Created Successfully'}
                        </div>
                        <div style={{ fontSize: 13, color: '#059669', marginBottom: 6 }}>
                            <strong>{form.orgName}</strong>{' '}
                            {isEdit
                                ? 'has been updated successfully.'
                                : 'has been added to the system.'}
                        </div>
                        <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 32 }}>
                            Type:{' '}
                            <span
                                style={{
                                    fontWeight: 800,
                                    color: 'var(--primary)',
                                }}
                            >
                                {form.orgType}
                            </span>
                            {' · '}
                            Status:{' '}
                            <span
                                style={{
                                    fontWeight: 800,
                                    color:
                                        form.status === 'Active' ? '#059669' : '#64748B',
                                }}
                            >
                                {form.status}
                            </span>
                        </div>
                        <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
                            <button
                                className="btn btn-secondary"
                                onClick={() => {
                                    setForm(INIT);
                                    setSaved(false);
                                }}
                            >
                                Add Another
                            </button>
                            <button
                                className="btn btn-primary"
                                onClick={() => navigate('/organisation')}
                            >
                                <span className="material-symbols-outlined ms">arrow_back</span>{' '}
                                Back to List
                            </button>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    /* ── Form ────────────────────────────────────── */
    if (!form.orgType) {
        return (
            <>
                <div className="page-header">
                    <div>
                        <div className="page-title">
                            <span className="material-symbols-outlined ms" style={{ fontSize: 18 }}>
                                corporate_fare
                            </span>
                            {isEdit ? 'Edit Organisation' : 'Add New Organisation'}
                        </div>
                        <div className="breadcrumb">
                            <span
                                style={{
                                    cursor: 'pointer',
                                    color: 'var(--primary)',
                                    fontWeight: 700,
                                }}
                                onClick={() => navigate('/organisation')}
                            >
                                Organisation Management
                            </span>
                            <span>/</span> {isEdit ? 'Edit Organisation' : 'Add New Organisation'}
                        </div>
                    </div>
                    <button
                        className="btn btn-secondary"
                        onClick={() => navigate('/organisation')}
                        style={{ flexShrink: 0 }}
                    >
                        <span className="material-symbols-outlined ms">arrow_back</span> Back to List
                    </button>
                </div>
                <div className="page-body" style={{ alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
                    <div style={{ textAlign: 'center', marginBottom: 40 }}>
                        <h2 style={{ fontSize: 28, fontWeight: 900, color: 'var(--text)', marginBottom: 12 }}>
                            What type of organisation are you onboarding?
                        </h2>
                        <p style={{ fontSize: 15, color: 'var(--muted)', maxWidth: 600, margin: '0 auto' }}>
                            Select the category that best describes the new organisation. The form will adjust automatically to collect the relevant information.
                        </p>
                    </div>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                        gap: 24,
                        maxWidth: 1000,
                        width: '100%',
                        padding: '0 20px'
                    }}>
                        {[
                            { type: 'Office', icon: 'apartment', color: '#2563EB', bg: '#EFF6FF', desc: 'Standard corporate offices or branches', border: '#BFDBFE' },
                            { type: 'Vendor', icon: 'store', color: '#D97706', bg: '#FFFBEB', desc: 'Service providers and suppliers', border: '#FDE68A' },
                            { type: 'Motor Driving School', icon: 'directions_car', color: '#059669', bg: '#ECFDF5', desc: 'Driving instruction centers', border: '#A7F3D0' },
                            { type: 'Institute', icon: 'school', color: '#7C3AED', bg: '#F5F3FF', desc: 'Educational and training institutions', border: '#DDD6FE' }
                        ].map(t => (
                            <div
                                key={t.type}
                                onClick={() => {
                                    setForm(v => ({ ...v, orgType: t.type as OrgType }));
                                    setErrs(v => ({ ...v, orgType: undefined }));
                                }}
                                style={{
                                    background: 'white',
                                    border: `2px solid ${t.border}`,
                                    borderRadius: 16,
                                    padding: '32px 24px',
                                    textAlign: 'center',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    gap: 16,
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-4px)';
                                    e.currentTarget.style.boxShadow = `0 12px 24px -8px ${t.color}40`;
                                    e.currentTarget.style.borderColor = t.color;
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.05)';
                                    e.currentTarget.style.borderColor = t.border;
                                }}
                            >
                                <div style={{
                                    width: 72,
                                    height: 72,
                                    borderRadius: '50%',
                                    background: t.bg,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <span className="material-symbols-outlined" style={{ fontSize: 36, color: t.color }}>
                                        {t.icon}
                                    </span>
                                </div>
                                <div>
                                    <h3 style={{ fontSize: 18, fontWeight: 800, color: 'var(--text)', margin: '0 0 8px 0' }}>
                                        {t.type}
                                    </h3>
                                    <p style={{ fontSize: 13, color: 'var(--muted)', margin: 0, lineHeight: 1.5 }}>
                                        {t.desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            {/* ── PAGE HEADER ── */}
            <div className="page-header">
                <div>
                    <div className="page-title">
                        <span className="material-symbols-outlined ms" style={{ fontSize: 18 }}>
                            corporate_fare
                        </span>
                        {isEdit ? 'Edit Organisation' : 'Add New Organisation'}
                    </div>
                    <div className="breadcrumb">
                        <span
                            style={{
                                cursor: 'pointer',
                                color: 'var(--primary)',
                                fontWeight: 700,
                            }}
                            onClick={() => navigate('/organisation')}
                        >
                            Organisation Management
                        </span>
                        <span>/</span> {isEdit ? `Edit ${form.orgType}` : `Add New ${form.orgType}`}
                    </div>
                </div>
                <div style={{ display: 'flex', gap: 12 }}>
                    {!isEdit && (
                        <button
                            className="btn btn-secondary"
                            onClick={() => setForm(v => ({ ...v, orgType: '' }))}
                        >
                            <span className="material-symbols-outlined ms">sync_alt</span> Change Type
                        </button>
                    )}
                    <button className="btn btn-secondary" onClick={() => navigate('/organisation')}>
                        <span className="material-symbols-outlined ms" style={{ fontSize: 18 }}>arrow_back</span>
                        Back
                    </button>
                </div>
            </div>

            {/* ── PAGE BODY ── */}
            <div className="page-body">
                <div style={{ maxWidth: 860, width: '100%', margin: '0 auto' }}>
                    {/* Type info banner */}
                    <div
                        style={{
                            marginBottom: 20,
                            padding: '16px 20px',
                            borderRadius: 12,
                            background:
                                form.orgType === 'Office'
                                    ? '#EFF6FF'
                                    : form.orgType === 'Vendor'
                                        ? '#FFFBEB'
                                        : form.orgType === 'Motor Driving School'
                                            ? '#ECFDF5'
                                            : '#F5F3FF',
                            border: `1px solid ${form.orgType === 'Office'
                                ? '#BFDBFE'
                                : form.orgType === 'Vendor'
                                    ? '#FDE68A'
                                    : form.orgType === 'Motor Driving School'
                                        ? '#A7F3D0'
                                        : '#DDD6FE'
                                }`,
                            display: 'flex',
                            alignItems: 'center',
                            gap: 16,
                        }}
                    >
                        <div style={{
                            width: 48,
                            height: 48,
                            borderRadius: '50%',
                            background: 'white',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                            boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                        }}>
                            <span
                                className="material-symbols-outlined"
                                style={{
                                    fontSize: 24,
                                    color:
                                        form.orgType === 'Office'
                                            ? '#2563EB'
                                            : form.orgType === 'Vendor'
                                                ? '#D97706'
                                                : form.orgType === 'Motor Driving School'
                                                    ? '#059669'
                                                    : '#7C3AED',
                                }}
                            >
                                {form.orgType === 'Office'
                                    ? 'apartment'
                                    : form.orgType === 'Vendor'
                                        ? 'store'
                                        : form.orgType === 'Motor Driving School'
                                            ? 'directions_car'
                                            : 'school'}
                            </span>
                        </div>
                        <div>
                            <h3 style={{ fontSize: 16, fontWeight: 800, color: 'var(--text)', margin: '0 0 4px 0' }}>
                                Onboarding a {form.orgType}
                            </h3>
                            <p style={{ fontSize: 13, color: 'var(--muted)', margin: 0, lineHeight: 1.5 }}>
                                {form.orgType === 'Office' &&
                                    'Complete the comprehensive office onboarding form including operational metrics and documents.'}
                                {form.orgType === 'Vendor' &&
                                    'Fill in standard details along with vendor specifics like service type and contract details.'}
                                {form.orgType === 'Motor Driving School' &&
                                    'Fill in standard details along with MDS specifics like license number and courses.'}
                                {form.orgType === 'Institute' &&
                                    'Complete the detailed institution onboarding including campus mapping and safety policies.'}
                            </p>
                        </div>
                    </div>

                    {/* ── BASIC INFORMATION ── */}
                    {form.orgType === 'Office' ? (
                        <Card>
                            <SectionHeader icon="business" title="Basic Information" />
                            <Body>
                                <Grid cols="1.5fr 1fr">
                                    <div data-err={errs.orgName ? '1' : undefined}>
                                        <Label>Organisation Name*</Label>
                                        <input className="form-input" placeholder="e.g. VanLoka Branch" value={form.orgName} onChange={f('orgName')} style={{ width: '100%', boxSizing: 'border-box', borderColor: errs.orgName ? '#DC2626' : undefined }} />
                                        <Err msg={errs.orgName} />
                                    </div>
                                    <div>
                                        <Label>Organisation Type</Label>
                                        <input className="form-input" value={form.orgType} readOnly style={{ width: '100%', boxSizing: 'border-box', background: 'var(--surface)' }} />
                                    </div>
                                </Grid>
                                <Grid cols="1fr 1fr 1fr 1fr" style={{ marginTop: 16 }}>
                                    <div>
                                        <Label>Registration Type</Label>
                                        <select className="form-select" value={form.registrationType} onChange={f('registrationType')} style={{ width: '100%', boxSizing: 'border-box' }}>
                                            <option value="">Select</option>
                                            <option>Private Ltd</option>
                                            <option>Public Ltd</option>
                                            <option>Partnership</option>
                                            <option>Proprietorship</option>
                                            <option>Trust/Society</option>
                                        </select>
                                    </div>
                                    <div>
                                        <Label>Registration No.</Label>
                                        <input className="form-input" placeholder="Reg No" value={form.registrationNo} onChange={f('registrationNo')} style={{ width: '100%', boxSizing: 'border-box' }} />
                                    </div>
                                    <div>
                                        <Label>Registration Date</Label>
                                        <input type="date" className="form-input" value={form.registrationDate} onChange={f('registrationDate')} style={{ width: '100%', boxSizing: 'border-box' }} />
                                    </div>
                                    <div>
                                        <Label>UDYAM / MSME No.</Label>
                                        <input className="form-input" placeholder="UDYAM-XX-00-0000000" value={form.udyamNo} onChange={f('udyamNo')} style={{ width: '100%', boxSizing: 'border-box' }} />
                                    </div>
                                </Grid>
                                <Grid cols="1fr 1fr 1fr" style={{ marginTop: 16 }}>
                                    <div>
                                        <Label>GST Number</Label>
                                        <input className="form-input" placeholder="29AABCC1234A1Z5" value={form.gstNumber} onChange={f('gstNumber')} style={{ width: '100%', boxSizing: 'border-box' }} />
                                    </div>
                                    <div>
                                        <Label>PAN Number</Label>
                                        <input className="form-input" placeholder="AABCC1234A" value={form.panNumber} onChange={f('panNumber')} style={{ width: '100%', boxSizing: 'border-box' }} />
                                    </div>
                                    <div>
                                        <Label>Tan Number</Label>
                                        <input className="form-input" placeholder="ABCD12345E" value={form.tanNumber} onChange={f('tanNumber')} style={{ width: '100%', boxSizing: 'border-box' }} />
                                    </div>
                                </Grid>
                                <Grid cols="1fr 1fr 1fr" style={{ marginTop: 16 }}>
                                    <div data-err={errs.email ? '1' : undefined}>
                                        <Label>organisation Email*</Label>
                                        <input type="email" className="form-input" placeholder="org@example.com" value={form.email} onChange={f('email')} style={{ width: '100%', boxSizing: 'border-box', borderColor: errs.email ? '#DC2626' : undefined }} />
                                        <Err msg={errs.email} />
                                    </div>
                                    <div data-err={errs.phone ? '1' : undefined}>
                                        <Label>Organisation Phone*</Label>
                                        <input className="form-input" placeholder="XXXXXXXXXX" value={form.phone} onChange={f('phone')} style={{ width: '100%', boxSizing: 'border-box', borderColor: errs.phone ? '#DC2626' : undefined }} />
                                        <Err msg={errs.phone} />
                                    </div>
                                    <div>
                                        <Label>Website / Domain</Label>
                                        <input className="form-input" placeholder="e.g. company-name.com" value={form.website} onChange={f('website')} style={{ width: '100%', boxSizing: 'border-box' }} />
                                    </div>
                                </Grid>
                                <div style={{ marginTop: 16 }} data-err={errs.subscriptionPlan ? '1' : undefined}>
                                    <Label>Subscription Plan *</Label>
                                    <select className="form-select" value={form.subscriptionPlan} onChange={f('subscriptionPlan')} style={{ width: '100%', boxSizing: 'border-box', borderColor: errs.subscriptionPlan ? '#DC2626' : undefined }}>
                                        <option value="">Select</option>
                                        <option>Basic Plan</option>
                                        <option>Standard Plan</option>
                                        <option>Enterprise Plan</option>
                                    </select>
                                    <Err msg={errs.subscriptionPlan} />
                                </div>
                            </Body>
                        </Card>
                    ) : (
                        (form.orgType !== 'Institute' && form.orgType !== 'Vendor' && form.orgType !== 'Motor Driving School') && (
                            <Card>
                                <SectionHeader icon="business" title="Basic Information" />
                                <Body>
                                    <Grid cols="1fr 1fr">
                                        <div data-err={errs.orgName ? '1' : undefined}>
                                            <Label>Organisation Name *</Label>
                                            <input className="form-input" placeholder="e.g. VanLoka Branch" value={form.orgName} onChange={f('orgName')} style={{ width: '100%', boxSizing: 'border-box', borderColor: errs.orgName ? '#DC2626' : undefined }} />
                                            <Err msg={errs.orgName} />
                                        </div>
                                        <div data-err={errs.contactPerson ? '1' : undefined}>
                                            <Label>Contact Person *</Label>
                                            <input className="form-input" placeholder="Full Name" value={form.contactPerson} onChange={f('contactPerson')} style={{ width: '100%', boxSizing: 'border-box', borderColor: errs.contactPerson ? '#DC2626' : undefined }} />
                                            <Err msg={errs.contactPerson} />
                                        </div>
                                        <div data-err={errs.email ? '1' : undefined}>
                                            <Label>Email *</Label>
                                            <input type="email" className="form-input" placeholder="org@example.com" value={form.email} onChange={f('email')} style={{ width: '100%', boxSizing: 'border-box', borderColor: errs.email ? '#DC2626' : undefined }} />
                                            <Err msg={errs.email} />
                                        </div>
                                        <div data-err={errs.phone ? '1' : undefined}>
                                            <Label>Phone *</Label>
                                            <input className="form-input" placeholder="+91 XXXXX XXXXX" value={form.phone} onChange={f('phone')} style={{ width: '100%', boxSizing: 'border-box', borderColor: errs.phone ? '#DC2626' : undefined }} />
                                            <Err msg={errs.phone} />
                                        </div>
                                    </Grid>
                                </Body>
                            </Card>
                        )
                    )}

                    {/* ── OPERATIONAL METRICS (Office Only) ── */}
                    {form.orgType === 'Office' && (
                        <Card>
                            <SectionHeader icon="analytics" title="Operational Metrics" />
                            <Body>
                                <Grid cols="1fr 1fr 1fr 1fr">
                                    <div>
                                        <Label>Total Employees</Label>
                                        <input type="number" className="form-input" placeholder="0" value={form.totalEmployees} onChange={f('totalEmployees')} style={{ width: '100%', boxSizing: 'border-box' }} />
                                    </div>
                                    <div>
                                        <Label>Total Vehicles</Label>
                                        <input type="number" className="form-input" placeholder="0" value={form.totalVehicles} onChange={f('totalVehicles')} style={{ width: '100%', boxSizing: 'border-box' }} />
                                    </div>
                                    <div>
                                        <Label>GPS Devices</Label>
                                        <input type="number" className="form-input" placeholder="0" value={form.gpsDevices} onChange={f('gpsDevices')} style={{ width: '100%', boxSizing: 'border-box' }} />
                                    </div>
                                    <div>
                                        <Label>Beacons Devices</Label>
                                        <input type="number" className="form-input" placeholder="0" value={form.beaconsDevices} onChange={f('beaconsDevices')} style={{ width: '100%', boxSizing: 'border-box' }} />
                                    </div>
                                </Grid>
                                <Grid cols="1fr 1fr 1fr 1fr" style={{ marginTop: 16 }}>
                                    <div>
                                        <Label>Shifts</Label>
                                        <input type="number" className="form-input" placeholder="e.g. 3" value={form.shifts} onChange={f('shifts')} style={{ width: '100%', boxSizing: 'border-box' }} />
                                    </div>
                                    <div>
                                        <Label>Branches</Label>
                                        <input type="number" className="form-input" placeholder="e.g. 5" value={form.branches} onChange={f('branches')} style={{ width: '100%', boxSizing: 'border-box' }} />
                                    </div>
                                    <div>
                                        <Label>Working Hours</Label>
                                        <input className="form-input" placeholder="e.g. 9:00 AM – 6:00 PM" value={form.workingHours} onChange={f('workingHours')} style={{ width: '100%', boxSizing: 'border-box' }} />
                                    </div>
                                    <div>
                                        <Label>Working Days</Label>
                                        <input className="form-input" placeholder="e.g. Mon - Sat" value={form.workingDays} onChange={f('workingDays')} style={{ width: '100%', boxSizing: 'border-box' }} />
                                    </div>
                                </Grid>
                            </Body>
                        </Card>
                    )}

                    {/* ── ADDRESS DETAILS ── */}
                    {(form.orgType !== 'Institute' && form.orgType !== 'Vendor' && form.orgType !== 'Motor Driving School') && (
                        <Card>
                            <SectionHeader icon="home" title="Address Details" />
                            <Body>
                                <Grid cols="1fr 1fr">
                                    <div data-err={errs.address1 ? '1' : undefined}>
                                        <Label>Address Line 1*</Label>
                                        <input className="form-input" placeholder="Building/Flat No, Street" value={form.address1} onChange={f('address1')} style={{ width: '100%', boxSizing: 'border-box', borderColor: errs.address1 ? '#DC2626' : undefined }} />
                                        <Err msg={errs.address1} />
                                    </div>
                                    <div>
                                        <Label>Address Line 2</Label>
                                        <input className="form-input" placeholder="Area, Locality" value={form.address2} onChange={f('address2')} style={{ width: '100%', boxSizing: 'border-box' }} />
                                    </div>
                                    <div data-err={errs.state ? '1' : undefined}>
                                        <Label>State *</Label>
                                        <select className="form-select" value={form.state} onChange={f('state')} style={{ width: '100%', boxSizing: 'border-box', borderColor: errs.state ? '#DC2626' : undefined }}>
                                            <option value="">Select State</option>
                                            {STATES.map((s) => (
                                                <option key={s}>{s}</option>
                                            ))}
                                        </select>
                                        <Err msg={errs.state} />
                                    </div>
                                    <div data-err={errs.district ? '1' : undefined}>
                                        <Label>District *</Label>
                                        <input className="form-input" placeholder="District" value={form.district} onChange={f('district')} style={{ width: '100%', boxSizing: 'border-box', borderColor: errs.district ? '#DC2626' : undefined }} />
                                        <Err msg={errs.district} />
                                    </div>
                                    <div data-err={errs.city ? '1' : undefined}>
                                        <Label>City*</Label>
                                        <input className="form-input" placeholder="City" value={form.city} onChange={f('city')} style={{ width: '100%', boxSizing: 'border-box', borderColor: errs.city ? '#DC2626' : undefined }} />
                                        <Err msg={errs.city} />
                                    </div>
                                    <div data-err={errs.pinCode ? '1' : undefined}>
                                        <Label>Pincode*</Label>
                                        <input className="form-input" placeholder="400XXX" value={form.pinCode} onChange={f('pinCode')} maxLength={6} style={{ width: '100%', boxSizing: 'border-box', borderColor: errs.pinCode ? '#DC2626' : undefined }} />
                                        <Err msg={errs.pinCode} />
                                    </div>
                                    <div style={{ gridColumn: 'span 2' }}>
                                        <Label>Landmark</Label>
                                        <input className="form-input" placeholder="Near XYZ" value={form.landmark} onChange={f('landmark')} style={{ width: '100%', boxSizing: 'border-box' }} />
                                    </div>
                                </Grid>
                            </Body>
                        </Card>
                    )}

                    {/* ── CONTACT PERSONS (Office Only) ── */}
                    {form.orgType === 'Office' && (
                        <Card>
                            <SectionHeader icon="contacts" title="Contact Persons" />
                            <Body>
                                <div style={{ marginBottom: 20 }}>
                                    <div style={{ fontSize: 13, fontWeight: 800, color: 'var(--primary)', marginBottom: 15, borderBottom: '1px solid var(--border)', paddingBottom: 5 }}>Primary Contact</div>
                                    <Grid cols="1fr 1fr">
                                        <div data-err={errs.primaryContactName ? '1' : undefined}>
                                            <Label>Full Name*</Label>
                                            <input className="form-input" placeholder="Name" value={form.primaryContactName} onChange={f('primaryContactName')} style={{ width: '100%', boxSizing: 'border-box', borderColor: errs.primaryContactName ? '#DC2626' : undefined }} />
                                            <Err msg={errs.primaryContactName} />
                                        </div>
                                        <div data-err={errs.primaryContactEmail ? '1' : undefined}>
                                            <Label>Email*</Label>
                                            <input className="form-input" placeholder="email@example.com" value={form.primaryContactEmail} onChange={f('primaryContactEmail')} style={{ width: '100%', boxSizing: 'border-box', borderColor: errs.primaryContactEmail ? '#DC2626' : undefined }} />
                                            <Err msg={errs.primaryContactEmail} />
                                        </div>
                                        <div data-err={errs.primaryContactPhone1 ? '1' : undefined}>
                                            <Label>Phone 1*</Label>
                                            <input className="form-input" placeholder="XXXXXXXXXX" value={form.primaryContactPhone1} onChange={f('primaryContactPhone1')} style={{ width: '100%', boxSizing: 'border-box', borderColor: errs.primaryContactPhone1 ? '#DC2626' : undefined }} />
                                            <Err msg={errs.primaryContactPhone1} />
                                        </div>
                                        <div>
                                            <Label>Phone 2</Label>
                                            <input className="form-input" placeholder="XXXXXXXXXX" value={form.primaryContactPhone2} onChange={f('primaryContactPhone2')} style={{ width: '100%', boxSizing: 'border-box' }} />
                                        </div>
                                    </Grid>
                                </div>

                                <div>
                                    <div style={{ fontSize: 13, fontWeight: 800, color: 'var(--muted)', marginBottom: 15, borderBottom: '1px solid var(--border)', paddingBottom: 5 }}>Secondary Contact</div>
                                    <Grid cols="1fr 1fr">
                                        <div>
                                            <Label>Full Name</Label>
                                            <input className="form-input" placeholder="Name" value={form.secondaryContactName} onChange={f('secondaryContactName')} style={{ width: '100%', boxSizing: 'border-box' }} />
                                        </div>
                                        <div>
                                            <Label>Email</Label>
                                            <input className="form-input" placeholder="email@example.com" value={form.secondaryContactEmail} onChange={f('secondaryContactEmail')} style={{ width: '100%', boxSizing: 'border-box' }} />
                                        </div>
                                        <div>
                                            <Label>Phone 1</Label>
                                            <input className="form-input" placeholder="XXXXXXXXXX" value={form.secondaryContactPhone1} onChange={f('secondaryContactPhone1')} style={{ width: '100%', boxSizing: 'border-box' }} />
                                        </div>
                                        <div>
                                            <Label>Phone 2</Label>
                                            <input className="form-input" placeholder="XXXXXXXXXX" value={form.secondaryContactPhone2} onChange={f('secondaryContactPhone2')} style={{ width: '100%', boxSizing: 'border-box' }} />
                                        </div>
                                    </Grid>
                                </div>
                            </Body>
                        </Card>
                    )}

                    {/* ── LOGIN CREDENTIALS (Office Only) ── */}
                    {form.orgType === 'Office' && (
                        <Card>
                            <SectionHeader icon="lock" title="Login Credentials" />
                            <Body>
                                <Grid cols="1fr 1fr">
                                    <div data-err={errs.adminEmail ? '1' : undefined}>
                                        <Label>Admin Email (Username)*</Label>
                                        <input className="form-input" placeholder="admin@admin.com" value={form.adminEmail} onChange={f('adminEmail')} style={{ width: '100%', boxSizing: 'border-box', borderColor: errs.adminEmail ? '#DC2626' : undefined }} />
                                        <Err msg={errs.adminEmail} />
                                    </div>
                                    <div data-err={errs.password ? '1' : undefined}>
                                        <Label>Password*</Label>
                                        <input type="password" className="form-input" placeholder="••••••••" value={form.password} onChange={f('password')} style={{ width: '100%', boxSizing: 'border-box', borderColor: errs.password ? '#DC2626' : undefined }} />
                                        <Err msg={errs.password} />
                                    </div>
                                </Grid>
                                <p style={{ fontSize: 11, color: 'var(--muted)', marginTop: 12 }}>
                                    Ensure the password is strong and shared securely with the organization admin.
                                </p>
                            </Body>
                        </Card>
                    )}

                    {/* ── STATUTORY DETAILS (Motor Driving School / Others) ── */}
                    {form.orgType !== 'Office' && form.orgType !== 'Institute' && form.orgType !== 'Vendor' && form.orgType !== 'Motor Driving School' && (
                        <Card>
                            <SectionHeader icon="description" title="Statutory Details" />
                            <Body>
                                <Grid cols="1fr 1fr">
                                    <div>
                                        <Label>GST Number</Label>
                                        <input className="form-input" placeholder="29AABCC1234A1Z5" value={form.gstNumber} onChange={f('gstNumber')} style={{ width: '100%', boxSizing: 'border-box' }} />
                                    </div>
                                    <div>
                                        <Label>PAN Number</Label>
                                        <input className="form-input" placeholder="AABCC1234A" value={form.panNumber} onChange={f('panNumber')} style={{ width: '100%', boxSizing: 'border-box' }} />
                                    </div>
                                </Grid>
                            </Body>
                        </Card>
                    )}


                    {/* ═══════════════════════════════════════
                       TYPE-SPECIFIC SECTIONS
                    ═══════════════════════════════════════ */}


                    {/* ── VENDOR COMPREHENSIVE FORM ── */}
                    {form.orgType === 'Vendor' && (
                        <>
                            {/* ── Basic Info & Contacts ── */}
                            <Card>
                                <SectionHeader icon="store" title="Basic Information & Contacts" />
                                <Body>
                                    <Grid cols="1.5fr 1fr">
                                        <div data-err={errs.orgName ? '1' : undefined}>
                                            <Label>Vendor Name *</Label>
                                            <input className="form-input" placeholder="Legal name of the transport vendor" value={form.orgName} onChange={f('orgName')} style={{ width: '100%', boxSizing: 'border-box', borderColor: errs.orgName ? '#DC2626' : undefined }} />
                                            <Err msg={errs.orgName} />
                                        </div>
                                        <div data-err={errs.vendorType ? '1' : undefined}>
                                            <Label>Vendor Type *</Label>
                                            <select className="form-select" value={form.vendorType} onChange={f('vendorType')} style={{ width: '100%', boxSizing: 'border-box', borderColor: errs.vendorType ? '#DC2626' : undefined }}>
                                                <option value="">Select</option>
                                                <option>Individual</option>
                                                <option>Company</option>
                                                <option>Trust</option>
                                                <option>Cooperative</option>
                                            </select>
                                            <Err msg={errs.vendorType} />
                                        </div>
                                    </Grid>
                                    <Grid cols="1fr 1fr 1fr" style={{ marginTop: 16 }}>
                                        <div data-err={errs.primaryContactName ? '1' : undefined}>
                                            <Label>Contact Person Name *</Label>
                                            <input className="form-input" placeholder="Primary Contact" value={form.primaryContactName} onChange={f('primaryContactName')} style={{ width: '100%', boxSizing: 'border-box', borderColor: errs.primaryContactName ? '#DC2626' : undefined }} />
                                            <Err msg={errs.primaryContactName} />
                                        </div>
                                        <div data-err={errs.primaryContactPhone1 ? '1' : undefined}>
                                            <Label>Contact Mobile Number *</Label>
                                            <input className="form-input" placeholder="XXXXXXXXXX" value={form.primaryContactPhone1} onChange={f('primaryContactPhone1')} style={{ width: '100%', boxSizing: 'border-box', borderColor: errs.primaryContactPhone1 ? '#DC2626' : undefined }} />
                                            <Err msg={errs.primaryContactPhone1} />
                                        </div>
                                        <div>
                                            <Label>Contact Email ID (Optional)</Label>
                                            <input className="form-input" placeholder="email@example.com" value={form.primaryContactEmail} onChange={f('primaryContactEmail')} style={{ width: '100%', boxSizing: 'border-box' }} />
                                        </div>
                                    </Grid>
                                    <Grid cols="1fr 1fr" style={{ marginTop: 16 }}>
                                        <div data-err={errs.emergencyContactName ? '1' : undefined}>
                                            <Label>Emergency Contact Name *</Label>
                                            <input className="form-input" placeholder="Escalation Contact" value={form.emergencyContactName} onChange={f('emergencyContactName')} style={{ width: '100%', boxSizing: 'border-box', borderColor: errs.emergencyContactName ? '#DC2626' : undefined }} />
                                            <Err msg={errs.emergencyContactName} />
                                        </div>
                                        <div data-err={errs.emergencyContactNumber ? '1' : undefined}>
                                            <Label>Emergency Contact Number *</Label>
                                            <input className="form-input" placeholder="XXXXXXXXXX" value={form.emergencyContactNumber} onChange={f('emergencyContactNumber')} style={{ width: '100%', boxSizing: 'border-box', borderColor: errs.emergencyContactNumber ? '#DC2626' : undefined }} />
                                            <Err msg={errs.emergencyContactNumber} />
                                        </div>
                                    </Grid>
                                </Body>
                            </Card>

                            {/* ── Office Address ── */}
                            <Card>
                                <SectionHeader icon="location_on" title="Office Address" />
                                <Body>
                                    <Grid cols="1fr 1fr">
                                        <div data-err={errs.address1 ? '1' : undefined}>
                                            <Label>Office Address Line 1 *</Label>
                                            <input className="form-input" placeholder="Street, Landmark" value={form.address1} onChange={f('address1')} style={{ width: '100%', boxSizing: 'border-box', borderColor: errs.address1 ? '#DC2626' : undefined }} />
                                            <Err msg={errs.address1} />
                                        </div>
                                        <div>
                                            <Label>Office Address Line 2 (Optional)</Label>
                                            <input className="form-input" placeholder="Extension data" value={form.address2} onChange={f('address2')} style={{ width: '100%', boxSizing: 'border-box' }} />
                                        </div>
                                        <div data-err={errs.villageLocality ? '1' : undefined}>
                                            <Label>Village / Locality *</Label>
                                            <input className="form-input" placeholder="Rural/Urban mapping" value={form.villageLocality} onChange={f('villageLocality')} style={{ width: '100%', boxSizing: 'border-box', borderColor: errs.villageLocality ? '#DC2626' : undefined }} />
                                            <Err msg={errs.villageLocality} />
                                        </div>
                                        <div data-err={errs.city ? '1' : undefined}>
                                            <Label>City / Town *</Label>
                                            <input className="form-input" placeholder="City" value={form.city} onChange={f('city')} style={{ width: '100%', boxSizing: 'border-box', borderColor: errs.city ? '#DC2626' : undefined }} />
                                            <Err msg={errs.city} />
                                        </div>
                                        <div data-err={errs.district ? '1' : undefined}>
                                            <Label>District *</Label>
                                            <input className="form-input" placeholder="District" value={form.district} onChange={f('district')} style={{ width: '100%', boxSizing: 'border-box', borderColor: errs.district ? '#DC2626' : undefined }} />
                                            <Err msg={errs.district} />
                                        </div>
                                        <div data-err={errs.state ? '1' : undefined}>
                                            <Label>State *</Label>
                                            <select className="form-select" value={form.state} onChange={f('state')} style={{ width: '100%', boxSizing: 'border-box', borderColor: errs.state ? '#DC2626' : undefined }}>
                                                {STATES.map((s) => <option key={s}>{s}</option>)}
                                            </select>
                                            <Err msg={errs.state} />
                                        </div>
                                        <div data-err={errs.pinCode ? '1' : undefined}>
                                            <Label>PIN Code *</Label>
                                            <input className="form-input" placeholder="6-digit PIN" value={form.pinCode} onChange={f('pinCode')} maxLength={6} style={{ width: '100%', boxSizing: 'border-box', borderColor: errs.pinCode ? '#DC2626' : undefined }} />
                                            <Err msg={errs.pinCode} />
                                        </div>
                                    </Grid>
                                </Body>
                            </Card>

                            {/* ── Statutory & Financial Details ── */}
                            <Card>
                                <SectionHeader icon="receipt_long" title="Statutory & Financial Details" />
                                <Body>
                                    <Grid cols="1fr 1fr 1fr">
                                        <div data-err={errs.gstNumber ? '1' : undefined}>
                                            <Label>GST Number *</Label>
                                            <input className="form-input" placeholder="29AABCC..." value={form.gstNumber} onChange={f('gstNumber')} style={{ width: '100%', boxSizing: 'border-box', borderColor: errs.gstNumber ? '#DC2626' : undefined }} />
                                            <Err msg={errs.gstNumber} />
                                        </div>
                                        <div data-err={errs.panNumber ? '1' : undefined}>
                                            <Label>PAN Number *</Label>
                                            <input className="form-input" placeholder="AABCC1234A" value={form.panNumber} onChange={f('panNumber')} style={{ width: '100%', boxSizing: 'border-box', borderColor: errs.panNumber ? '#DC2626' : undefined }} />
                                            <Err msg={errs.panNumber} />
                                        </div>
                                        {form.vendorType === 'Individual' && (
                                            <div data-err={errs.aadhaarNumber ? '1' : undefined}>
                                                <Label>Aadhaar Number *</Label>
                                                <input className="form-input" placeholder="12-digit Aadhaar" value={form.aadhaarNumber} onChange={f('aadhaarNumber')} maxLength={12} style={{ width: '100%', boxSizing: 'border-box', borderColor: errs.aadhaarNumber ? '#DC2626' : undefined }} />
                                                <Err msg={errs.aadhaarNumber} />
                                            </div>
                                        )}
                                        <div>
                                            <Label>UDYAM / MSME Reg No (Optional)</Label>
                                            <input className="form-input" placeholder="UDYAM-XX-..." value={form.udyamNo} onChange={f('udyamNo')} style={{ width: '100%', boxSizing: 'border-box' }} />
                                        </div>
                                    </Grid>
                                    <Grid cols="1fr 1fr 1fr" style={{ marginTop: 16 }}>
                                        <div data-err={errs.bankAccountNo ? '1' : undefined}>
                                            <Label>Bank Account Number *</Label>
                                            <input className="form-input" placeholder="Account Number" value={form.bankAccountNo} onChange={f('bankAccountNo')} style={{ width: '100%', boxSizing: 'border-box', borderColor: errs.bankAccountNo ? '#DC2626' : undefined }} />
                                            <Err msg={errs.bankAccountNo} />
                                        </div>
                                        <div data-err={errs.bankIfsc ? '1' : undefined}>
                                            <Label>Bank IFSC Code *</Label>
                                            <input className="form-input" placeholder="IFSC0001234" value={form.bankIfsc} onChange={f('bankIfsc')} style={{ width: '100%', boxSizing: 'border-box', borderColor: errs.bankIfsc ? '#DC2626' : undefined }} />
                                            <Err msg={errs.bankIfsc} />
                                        </div>
                                        <div data-err={errs.accountHolderName ? '1' : undefined}>
                                            <Label>Account Holder Name *</Label>
                                            <input className="form-input" placeholder="Must match PAN/Aadhaar" value={form.accountHolderName} onChange={f('accountHolderName')} style={{ width: '100%', boxSizing: 'border-box', borderColor: errs.accountHolderName ? '#DC2626' : undefined }} />
                                            <Err msg={errs.accountHolderName} />
                                        </div>
                                    </Grid>
                                </Body>
                            </Card>

                            {/* ── Contract & Insurance Details ── */}
                            <Card>
                                <SectionHeader icon="history_edu" title="Contract & Insurance Details" />
                                <Body>
                                    <Grid cols="1fr 1fr 1fr">
                                        <div data-err={errs.contractStartDate ? '1' : undefined}>
                                            <Label>Contract Start Date *</Label>
                                            <input type="date" className="form-input" value={form.contractStartDate} onChange={f('contractStartDate')} style={{ width: '100%', boxSizing: 'border-box', borderColor: errs.contractStartDate ? '#DC2626' : undefined }} />
                                            <Err msg={errs.contractStartDate} />
                                        </div>
                                        <div data-err={errs.contractEndDate ? '1' : undefined}>
                                            <Label>Contract End Date *</Label>
                                            <input type="date" className="form-input" value={form.contractEndDate} onChange={f('contractEndDate')} style={{ width: '100%', boxSizing: 'border-box', borderColor: errs.contractEndDate ? '#DC2626' : undefined }} />
                                            <Err msg={errs.contractEndDate} />
                                        </div>
                                        <div data-err={errs.insuranceCoverage ? '1' : undefined}>
                                            <Label>Insurance Liability Coverage *</Label>
                                            <select className="form-select" value={form.insuranceCoverage} onChange={f('insuranceCoverage')} style={{ width: '100%', boxSizing: 'border-box', borderColor: errs.insuranceCoverage ? '#DC2626' : undefined }}>
                                                <option>No</option>
                                                <option>Yes</option>
                                            </select>
                                            <Err msg={errs.insuranceCoverage} />
                                        </div>
                                    </Grid>
                                    <div style={{ marginTop: 16 }}>
                                        <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
                                            <input type="checkbox" checked={form.safetyTrainingCompleted} onChange={(e) => setForm(v => ({ ...v, safetyTrainingCompleted: e.target.checked }))} style={{ width: 16, height: 16 }} />
                                            <span style={{ fontSize: 12, fontWeight: 700 }}>Safety Training Completed (Optional)</span>
                                        </label>
                                    </div>
                                    <div style={{ marginTop: 24, padding: '16px 20px', background: 'var(--surface)', borderRadius: 12, border: '1.5px solid var(--border)' }}>
                                        <label style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }}>
                                            <input type="checkbox" checked={form.consentCheckbox} onChange={handleConsent} style={{ width: 18, height: 18, accentColor: 'var(--primary)' }} />
                                            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)' }}>
                                                I agree to VanLoka’s compliance and safety protocols *
                                            </div>
                                        </label>
                                        {form.consentTimestamp && (
                                            <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 8, marginLeft: 30 }}>
                                                Consent captured on: <strong>{form.consentTimestamp}</strong>
                                            </div>
                                        )}
                                        <Err msg={errs.consentCheckbox} />
                                    </div>
                                </Body>
                            </Card>

                            {/* ── Vehicle Compliance Details ── */}
                            <Card>
                                <SectionHeader icon="local_shipping" title="Vehicle Compliance Details" />
                                <Body>
                                    <Grid cols="1fr 2fr">
                                        <div data-err={errs.vehicleCount ? '1' : undefined}>
                                            <Label>Vehicle Count *</Label>
                                            <input type="number" className="form-input" placeholder="0" value={form.vehicleCount} onChange={f('vehicleCount')} style={{ width: '100%', boxSizing: 'border-box', borderColor: errs.vehicleCount ? '#DC2626' : undefined }} />
                                            <Err msg={errs.vehicleCount} />
                                        </div>
                                        <div data-err={errs.vehicleNumbers ? '1' : undefined}>
                                            <Label>Vehicle Numbers (List) *</Label>
                                            <textarea className="form-input" placeholder="KA-01-XX-1234, KA-02..." value={form.vehicleNumbers} onChange={f('vehicleNumbers')} rows={1} style={{ width: '100%', boxSizing: 'border-box', borderColor: errs.vehicleNumbers ? '#DC2626' : undefined }} />
                                            <Err msg={errs.vehicleNumbers} />
                                        </div>
                                    </Grid>
                                    <div style={{ marginTop: 16 }}>
                                        <Label>Vehicle Types *</Label>
                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                                            {VEHICLE_TYPES.map(type => (
                                                <label key={type} style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: 6,
                                                    padding: '6px 12px',
                                                    background: form.vehicleTypes.includes(type) ? 'var(--primary-bg)' : 'var(--surface)',
                                                    borderRadius: 20,
                                                    border: `1px solid ${form.vehicleTypes.includes(type) ? 'var(--primary)' : 'var(--border)'}`,
                                                    cursor: 'pointer',
                                                    fontSize: 11,
                                                    fontWeight: 700,
                                                    color: form.vehicleTypes.includes(type) ? 'var(--primary)' : 'var(--text)'
                                                }}>
                                                    <input type="checkbox" checked={form.vehicleTypes.includes(type)} onChange={() => {
                                                        const types = form.vehicleTypes.includes(type)
                                                            ? form.vehicleTypes.filter(t => t !== type)
                                                            : [...form.vehicleTypes, type];
                                                        setForm(v => ({ ...v, vehicleTypes: types }));
                                                    }} style={{ display: 'none' }} />
                                                    {type}
                                                </label>
                                            ))}
                                        </div>
                                        <Err msg={errs.vehicleTypes} />
                                    </div>
                                    <Grid cols="1fr 1fr 1fr" style={{ marginTop: 20 }}>
                                        <div data-err={errs.gpsInstalled ? '1' : undefined}>
                                            <Label>GPS Installed *</Label>
                                            <select className="form-select" value={form.gpsInstalled} onChange={f('gpsInstalled')} style={{ width: '100%', boxSizing: 'border-box', borderColor: errs.gpsInstalled ? '#DC2626' : undefined }}>
                                                <option>No</option>
                                                <option>Yes</option>
                                            </select>
                                            <Err msg={errs.gpsInstalled} />
                                        </div>
                                        <div data-err={errs.beaconInstalled ? '1' : undefined}>
                                            <Label>Beacon Installed *</Label>
                                            <select className="form-select" value={form.beaconInstalled} onChange={f('beaconInstalled')} style={{ width: '100%', boxSizing: 'border-box', borderColor: errs.beaconInstalled ? '#DC2626' : undefined }}>
                                                <option>No</option>
                                                <option>Yes</option>
                                            </select>
                                            <Err msg={errs.beaconInstalled} />
                                        </div>
                                    </Grid>
                                    <div style={{ marginTop: 20 }}>
                                        <Label>Compliance Validity Status *</Label>
                                        <Grid cols="1fr 1fr 1fr 1fr">
                                            {[
                                                { label: 'Permit', key: 'permitValidity' },
                                                { label: 'Insurance', key: 'insuranceValidity' },
                                                { label: 'Fitness', key: 'fitnessValidity' },
                                                { label: 'Pollution', key: 'pollutionValidity' }
                                            ].map(item => (
                                                <label key={item.key} style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                                                    <input type="checkbox" checked={form[item.key as keyof Form] as boolean} onChange={(e) => setForm(v => ({ ...v, [item.key]: e.target.checked }))} style={{ width: 16, height: 16 }} />
                                                    <span style={{ fontSize: 11, fontWeight: 700 }}>{item.label}</span>
                                                </label>
                                            ))}
                                        </Grid>
                                    </div>
                                </Body>
                            </Card>
                        </>
                    )}

                    {/* ── MOTOR DRIVING SCHOOL DETAILS ── */}
                    {form.orgType === 'Motor Driving School' && (
                        <>
                            {/* ── Basic Information (License & Registration) ── */}
                            <Card>
                                <SectionHeader icon="directions_car" title="Basic Information" />
                                <Body>
                                    <Grid cols="1.5fr 1fr">
                                        <div data-err={errs.orgName ? '1' : undefined}>
                                            <Label>Driving school Name *</Label>
                                            <input className="form-input" placeholder="Legal name as per RTO license" value={form.orgName} onChange={f('orgName')} style={{ width: '100%', boxSizing: 'border-box', borderColor: errs.orgName ? '#DC2626' : undefined }} />
                                            <Err msg={errs.orgName} />
                                        </div>
                                        <div data-err={errs.mdsLicenseNumber ? '1' : undefined}>
                                            <Label>License Number (RTO) *</Label>
                                            <input className="form-input" placeholder="MDS-XX-0000" value={form.mdsLicenseNumber} onChange={f('mdsLicenseNumber')} style={{ width: '100%', boxSizing: 'border-box', borderColor: errs.mdsLicenseNumber ? '#DC2626' : undefined }} />
                                            <Err msg={errs.mdsLicenseNumber} />
                                        </div>
                                    </Grid>
                                    <Grid cols="1fr 1fr 1fr" style={{ marginTop: 16 }}>
                                        <div data-err={errs.licenseIssueDate ? '1' : undefined}>
                                            <Label>License Issue Date *</Label>
                                            <input type="date" className="form-input" value={form.licenseIssueDate} onChange={f('licenseIssueDate')} style={{ width: '100%', boxSizing: 'border-box', borderColor: errs.licenseIssueDate ? '#DC2626' : undefined }} />
                                            <Err msg={errs.licenseIssueDate} />
                                        </div>
                                        <div data-err={errs.licenseExpiryDate ? '1' : undefined}>
                                            <Label>License Expiry Date *</Label>
                                            <input type="date" className="form-input" value={form.licenseExpiryDate} onChange={f('licenseExpiryDate')} style={{ width: '100%', boxSizing: 'border-box', borderColor: errs.licenseExpiryDate ? '#DC2626' : undefined }} />
                                            <Err msg={errs.licenseExpiryDate} />
                                        </div>
                                        <div data-err={errs.registrationType ? '1' : undefined}>
                                            <Label>Registration Type *</Label>
                                            <select className="form-select" value={form.registrationType} onChange={f('registrationType')} style={{ width: '100%', boxSizing: 'border-box', borderColor: errs.registrationType ? '#DC2626' : undefined }}>
                                                <option value="">Select</option>
                                                <option>Proprietorship</option>
                                                <option>Partnership</option>
                                                <option>Pvt Ltd</option>
                                                <option>Trust</option>
                                            </select>
                                            <Err msg={errs.registrationType} />
                                        </div>
                                    </Grid>
                                    <Grid cols="1fr 1fr 1fr" style={{ marginTop: 16 }}>
                                        <div data-err={errs.registrationNo ? '1' : undefined}>
                                            <Label>Registration Number *</Label>
                                            <input className="form-input" placeholder="Reg No" value={form.registrationNo} onChange={f('registrationNo')} style={{ width: '100%', boxSizing: 'border-box', borderColor: errs.registrationNo ? '#DC2626' : undefined }} />
                                            <Err msg={errs.registrationNo} />
                                        </div>
                                        <div data-err={errs.panNumber ? '1' : undefined}>
                                            <Label>PAN Number *</Label>
                                            <input className="form-input" placeholder="PAN Number" value={form.panNumber} onChange={f('panNumber')} style={{ width: '100%', boxSizing: 'border-box', borderColor: errs.panNumber ? '#DC2626' : undefined }} />
                                            <Err msg={errs.panNumber} />
                                        </div>
                                        <div>
                                            <Label>GST Number (Optional)</Label>
                                            <input className="form-input" placeholder="GST Number" value={form.gstNumber} onChange={f('gstNumber')} style={{ width: '100%', boxSizing: 'border-box' }} />
                                        </div>
                                    </Grid>
                                    <div style={{ marginTop: 16 }}>
                                        <Label>UDYAM / MSME Registration No. (Optional)</Label>
                                        <input className="form-input" placeholder="UDYAM-XX-00-0000000" value={form.udyamNo} onChange={f('udyamNo')} style={{ width: '100%', boxSizing: 'border-box' }} />
                                    </div>
                                </Body>
                            </Card>

                            {/* ── Contact & Location ── */}
                            <Card>
                                <SectionHeader icon="contacts" title="Contact & Location" />
                                <Body>
                                    <Grid cols="1fr 1fr 1fr">
                                        <div data-err={errs.primaryContactName ? '1' : undefined}>
                                            <Label>Contact Person Name *</Label>
                                            <input className="form-input" placeholder="Name" value={form.primaryContactName} onChange={f('primaryContactName')} style={{ width: '100%', boxSizing: 'border-box', borderColor: errs.primaryContactName ? '#DC2626' : undefined }} />
                                            <Err msg={errs.primaryContactName} />
                                        </div>
                                        <div data-err={errs.primaryContactPhone1 ? '1' : undefined}>
                                            <Label>Contact Mobile Number *</Label>
                                            <input className="form-input" placeholder="XXXXXXXXXX" value={form.primaryContactPhone1} onChange={f('primaryContactPhone1')} style={{ width: '100%', boxSizing: 'border-box', borderColor: errs.primaryContactPhone1 ? '#DC2626' : undefined }} />
                                            <Err msg={errs.primaryContactPhone1} />
                                        </div>
                                        <div data-err={errs.email ? '1' : undefined}>
                                            <Label>Contact Email ID *</Label>
                                            <input type="email" className="form-input" placeholder="email@example.com" value={form.email} onChange={f('email')} style={{ width: '100%', boxSizing: 'border-box', borderColor: errs.email ? '#DC2626' : undefined }} />
                                            <Err msg={errs.email} />
                                        </div>
                                    </Grid>
                                    <Grid cols="1fr 1fr" style={{ marginTop: 16 }}>
                                        <div data-err={errs.emergencyContactName ? '1' : undefined}>
                                            <Label>Emergency Contact Name *</Label>
                                            <input className="form-input" placeholder="Escalation Contact" value={form.emergencyContactName} onChange={f('emergencyContactName')} style={{ width: '100%', boxSizing: 'border-box', borderColor: errs.emergencyContactName ? '#DC2626' : undefined }} />
                                            <Err msg={errs.emergencyContactName} />
                                        </div>
                                        <div data-err={errs.emergencyContactNumber ? '1' : undefined}>
                                            <Label>Emergency Contact Number *</Label>
                                            <input className="form-input" placeholder="XXXXXXXXXX" value={form.emergencyContactNumber} onChange={f('emergencyContactNumber')} style={{ width: '100%', boxSizing: 'border-box', borderColor: errs.emergencyContactNumber ? '#DC2626' : undefined }} />
                                            <Err msg={errs.emergencyContactNumber} />
                                        </div>
                                    </Grid>
                                    <Grid cols="1fr 1fr" style={{ marginTop: 16 }}>
                                        <div data-err={errs.address1 ? '1' : undefined}>
                                            <Label>Office Address Line 1 *</Label>
                                            <input className="form-input" placeholder="Street, Landmark" value={form.address1} onChange={f('address1')} style={{ width: '100%', boxSizing: 'border-box', borderColor: errs.address1 ? '#DC2626' : undefined }} />
                                            <Err msg={errs.address1} />
                                        </div>
                                        <div>
                                            <Label>Office Address Line 2 (Optional)</Label>
                                            <input className="form-input" placeholder="Extension data" value={form.address2} onChange={f('address2')} style={{ width: '100%', boxSizing: 'border-box' }} />
                                        </div>
                                        <div data-err={errs.villageLocality ? '1' : undefined}>
                                            <Label>Village / Locality *</Label>
                                            <input className="form-input" placeholder="Village/Locality" value={form.villageLocality} onChange={f('villageLocality')} style={{ width: '100%', boxSizing: 'border-box', borderColor: errs.villageLocality ? '#DC2626' : undefined }} />
                                            <Err msg={errs.villageLocality} />
                                        </div>
                                        <div data-err={errs.city ? '1' : undefined}>
                                            <Label>City / Town *</Label>
                                            <input className="form-input" placeholder="City" value={form.city} onChange={f('city')} style={{ width: '100%', boxSizing: 'border-box', borderColor: errs.city ? '#DC2626' : undefined }} />
                                            <Err msg={errs.city} />
                                        </div>
                                        <div data-err={errs.district ? '1' : undefined}>
                                            <Label>District *</Label>
                                            <input className="form-input" placeholder="District" value={form.district} onChange={f('district')} style={{ width: '100%', boxSizing: 'border-box', borderColor: errs.district ? '#DC2626' : undefined }} />
                                            <Err msg={errs.district} />
                                        </div>
                                        <div data-err={errs.state ? '1' : undefined}>
                                            <Label>State *</Label>
                                            <select className="form-select" value={form.state} onChange={f('state')} style={{ width: '100%', boxSizing: 'border-box', borderColor: errs.state ? '#DC2626' : undefined }}>
                                                {STATES.map((s) => <option key={s}>{s}</option>)}
                                            </select>
                                            <Err msg={errs.state} />
                                        </div>
                                        <div data-err={errs.pinCode ? '1' : undefined}>
                                            <Label>PIN Code *</Label>
                                            <input className="form-input" placeholder="6-digit PIN" value={form.pinCode} onChange={f('pinCode')} maxLength={6} style={{ width: '100%', boxSizing: 'border-box', borderColor: errs.pinCode ? '#DC2626' : undefined }} />
                                            <Err msg={errs.pinCode} />
                                        </div>
                                    </Grid>
                                </Body>
                            </Card>

                            {/* ── Operational & Safety Mapping ── */}
                            <Card>
                                <SectionHeader icon="analytics" title="Operational & Safety Mapping" />
                                <Body>
                                    <Grid cols="1fr 1fr 1fr">
                                        <div data-err={errs.numTrainingVehicles ? '1' : undefined}>
                                            <Label>Number of Training Vehicles *</Label>
                                            <input type="number" className="form-input" placeholder="0" value={form.numTrainingVehicles} onChange={f('numTrainingVehicles')} style={{ width: '100%', boxSizing: 'border-box', borderColor: errs.numTrainingVehicles ? '#DC2626' : undefined }} />
                                            <Err msg={errs.numTrainingVehicles} />
                                        </div>
                                        <div data-err={errs.numTrainers ? '1' : undefined}>
                                            <Label>Number of Trainers *</Label>
                                            <input type="number" className="form-input" placeholder="0" value={form.numTrainers} onChange={f('numTrainers')} style={{ width: '100%', boxSizing: 'border-box', borderColor: errs.numTrainers ? '#DC2626' : undefined }} />
                                            <Err msg={errs.numTrainers} />
                                        </div>
                                        <div data-err={errs.numStudentsEnrolled ? '1' : undefined}>
                                            <Label>Number of Students Enrolled *</Label>
                                            <input type="number" className="form-input" placeholder="0" value={form.numStudentsEnrolled} onChange={f('numStudentsEnrolled')} style={{ width: '100%', boxSizing: 'border-box', borderColor: errs.numStudentsEnrolled ? '#DC2626' : undefined }} />
                                            <Err msg={errs.numStudentsEnrolled} />
                                        </div>
                                    </Grid>
                                    <Grid cols="1fr 1fr 1fr" style={{ marginTop: 16 }}>
                                        <div data-err={errs.numGPSDevicesAssignedMds ? '1' : undefined}>
                                            <Label>Number of GPS Devices Assigned *</Label>
                                            <input type="number" className="form-input" placeholder="0" value={form.numGPSDevicesAssignedMds} onChange={f('numGPSDevicesAssignedMds')} style={{ width: '100%', boxSizing: 'border-box', borderColor: errs.numGPSDevicesAssignedMds ? '#DC2626' : undefined }} />
                                            <Err msg={errs.numGPSDevicesAssignedMds} />
                                        </div>
                                        <div>
                                            <Label>Number of Beacons Assigned (Optional)</Label>
                                            <input type="number" className="form-input" placeholder="0" value={form.numBeaconsAssignedMds} onChange={f('numBeaconsAssignedMds')} style={{ width: '100%', boxSizing: 'border-box' }} />
                                        </div>
                                        <div data-err={errs.subscriptionPlan ? '1' : undefined}>
                                            <Label>Subscription Plan *</Label>
                                            <select className="form-select" value={form.subscriptionPlan} onChange={f('subscriptionPlan')} style={{ width: '100%', boxSizing: 'border-box', borderColor: errs.subscriptionPlan ? '#DC2626' : undefined }}>
                                                <option value="">Select</option>
                                                <option>Basic Plan</option>
                                                <option>Standard Plan</option>
                                                <option>Premium Plan</option>
                                            </select>
                                            <Err msg={errs.subscriptionPlan} />
                                        </div>
                                    </Grid>
                                    <Grid cols="1fr 1fr" style={{ marginTop: 16 }}>
                                        <div>
                                            <Label>Safety Officer Name (Optional)</Label>
                                            <input className="form-input" placeholder="Name" value={form.safetyOfficerName} onChange={f('safetyOfficerName')} style={{ width: '100%', boxSizing: 'border-box' }} />
                                        </div>
                                        <div>
                                            <Label>Safety Officer Contact (Optional)</Label>
                                            <input className="form-input" placeholder="XXXXXXXXXX" value={form.safetyOfficerContact} onChange={f('safetyOfficerContact')} style={{ width: '100%', boxSizing: 'border-box' }} />
                                        </div>
                                    </Grid>
                                    <div style={{ marginTop: 24, padding: '16px 20px', background: 'var(--surface)', borderRadius: 12, border: '1.5px solid var(--border)' }}>
                                        <label style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }}>
                                            <input type="checkbox" checked={form.consentCheckbox} onChange={handleConsent} style={{ width: 18, height: 18, accentColor: 'var(--primary)' }} />
                                            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)' }}>
                                                I agree to VanLoka’s safety and compliance onboarding
                                            </div>
                                        </label>
                                        {form.consentTimestamp && (
                                            <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 8, marginLeft: 30 }}>
                                                Consent captured on: <strong>{form.consentTimestamp}</strong>
                                            </div>
                                        )}
                                        <Err msg={errs.consentCheckbox} />
                                    </div>
                                    <div style={{ marginTop: 16 }}>
                                        <Label>Remarks / Notes (Optional)</Label>
                                        <textarea className="form-input" rows={2} placeholder="Special instructions or conditions" value={form.remarksNotes} onChange={f('remarksNotes')} style={{ width: '100%', boxSizing: 'border-box', resize: 'vertical' }} />
                                    </div>
                                </Body>
                            </Card>
                        </>
                    )}

                    {/* ── INSTITUTE DETAILS ── */}
                    {form.orgType === 'Institute' && (
                        <>
                            {/* ── BASIC INFORMATION (Institution) ── */}
                            <Card>
                                <SectionHeader icon="school" title="Basic Information" />
                                <Body>
                                    <Grid cols="1.5fr 1fr">
                                        <div data-err={errs.orgName ? '1' : undefined}>
                                            <Label>Institution Name *</Label>
                                            <input className="form-input" placeholder="Legal name of the school or college" value={form.orgName} onChange={f('orgName')} style={{ width: '100%', boxSizing: 'border-box', borderColor: errs.orgName ? '#DC2626' : undefined }} />
                                            <Err msg={errs.orgName} />
                                        </div>
                                        <div data-err={errs.institutionType ? '1' : undefined}>
                                            <Label>Institution Type *</Label>
                                            <select className="form-select" value={form.institutionType} onChange={f('institutionType')} style={{ width: '100%', boxSizing: 'border-box', borderColor: errs.institutionType ? '#DC2626' : undefined }}>
                                                <option value="">Select</option>
                                                <option>School</option>
                                                <option>PU College</option>
                                                <option>Degree College</option>
                                                <option>Polytechnic</option>
                                                <option>University</option>
                                            </select>
                                            <Err msg={errs.institutionType} />
                                        </div>
                                    </Grid>
                                    <Grid cols="1fr 1fr 1fr" style={{ marginTop: 16 }}>
                                        <div data-err={errs.affiliationBoard ? '1' : undefined}>
                                            <Label>Affiliation Board / University *</Label>
                                            <select className="form-select" value={form.affiliationBoard} onChange={f('affiliationBoard')} style={{ width: '100%', boxSizing: 'border-box', borderColor: errs.affiliationBoard ? '#DC2626' : undefined }}>
                                                <option value="">Select</option>
                                                <option>CBSE</option>
                                                <option>ICSE</option>
                                                <option>State Board</option>
                                                <option>VTU</option>
                                                <option>Autonomous</option>
                                                <option>Other</option>
                                            </select>
                                            <Err msg={errs.affiliationBoard} />
                                        </div>
                                        <div data-err={errs.registrationType ? '1' : undefined}>
                                            <Label>Registration Type *</Label>
                                            <select className="form-select" value={form.registrationType} onChange={f('registrationType')} style={{ width: '100%', boxSizing: 'border-box', borderColor: errs.registrationType ? '#DC2626' : undefined }}>
                                                <option value="">Select</option>
                                                <option>Trust</option>
                                                <option>Society</option>
                                                <option>Private Ltd</option>
                                                <option>Govt</option>
                                                <option>Aided</option>
                                                <option>Unaided</option>
                                            </select>
                                            <Err msg={errs.registrationType} />
                                        </div>
                                        <div data-err={errs.registrationNo ? '1' : undefined}>
                                            <Label>Registration Number *</Label>
                                            <input className="form-input" placeholder="Registration No" value={form.registrationNo} onChange={f('registrationNo')} style={{ width: '100%', boxSizing: 'border-box', borderColor: errs.registrationNo ? '#DC2626' : undefined }} />
                                            <Err msg={errs.registrationNo} />
                                        </div>
                                    </Grid>
                                    <Grid cols="1fr 1fr 1fr" style={{ marginTop: 16 }}>
                                        <div data-err={errs.udiseCode ? '1' : undefined}>
                                            <Label>UDISE Code / College Code *</Label>
                                            <input className="form-input" placeholder="UDISE-123" value={form.udiseCode} onChange={f('udiseCode')} style={{ width: '100%', boxSizing: 'border-box', borderColor: errs.udiseCode ? '#DC2626' : undefined }} />
                                            <Err msg={errs.udiseCode} />
                                        </div>
                                        <div>
                                            <Label>GST Number (Optional)</Label>
                                            <input className="form-input" placeholder="GST Number" value={form.gstNumber} onChange={f('gstNumber')} style={{ width: '100%', boxSizing: 'border-box' }} />
                                        </div>
                                        <div data-err={errs.panNumber ? '1' : undefined}>
                                            <Label>PAN Number *</Label>
                                            <input className="form-input" placeholder="AABCC1234A" value={form.panNumber} onChange={f('panNumber')} style={{ width: '100%', boxSizing: 'border-box', borderColor: errs.panNumber ? '#DC2626' : undefined }} />
                                            <Err msg={errs.panNumber} />
                                        </div>
                                    </Grid>
                                    <Grid cols="1fr 1fr 1fr" style={{ marginTop: 16 }}>
                                        <div data-err={errs.primaryContactName ? '1' : undefined}>
                                            <Label>Contact Person Name *</Label>
                                            <input className="form-input" placeholder="Principal / Coordinator" value={form.primaryContactName} onChange={f('primaryContactName')} style={{ width: '100%', boxSizing: 'border-box', borderColor: errs.primaryContactName ? '#DC2626' : undefined }} />
                                            <Err msg={errs.primaryContactName} />
                                        </div>
                                        <div data-err={errs.primaryContactPhone1 ? '1' : undefined}>
                                            <Label>Contact Mobile Number *</Label>
                                            <input className="form-input" placeholder="XXXXXXXXXX" value={form.primaryContactPhone1} onChange={f('primaryContactPhone1')} style={{ width: '100%', boxSizing: 'border-box', borderColor: errs.primaryContactPhone1 ? '#DC2626' : undefined }} />
                                            <Err msg={errs.primaryContactPhone1} />
                                        </div>
                                        <div data-err={errs.primaryContactEmail ? '1' : undefined}>
                                            <Label>Contact Email ID *</Label>
                                            <input className="form-input" placeholder="email@example.com" value={form.primaryContactEmail} onChange={f('primaryContactEmail')} style={{ width: '100%', boxSizing: 'border-box', borderColor: errs.primaryContactEmail ? '#DC2626' : undefined }} />
                                            <Err msg={errs.primaryContactEmail} />
                                        </div>
                                    </Grid>
                                    <Grid cols="1fr 1fr" style={{ marginTop: 16 }}>
                                        <div data-err={errs.emergencyContactName ? '1' : undefined}>
                                            <Label>Emergency Contact Name *</Label>
                                            <input className="form-input" placeholder="Escalation contact" value={form.emergencyContactName} onChange={f('emergencyContactName')} style={{ width: '100%', boxSizing: 'border-box', borderColor: errs.emergencyContactName ? '#DC2626' : undefined }} />
                                            <Err msg={errs.emergencyContactName} />
                                        </div>
                                        <div data-err={errs.emergencyContactNumber ? '1' : undefined}>
                                            <Label>Emergency Contact Number *</Label>
                                            <input className="form-input" placeholder="XXXXXXXXXX" value={form.emergencyContactNumber} onChange={f('emergencyContactNumber')} style={{ width: '100%', boxSizing: 'border-box', borderColor: errs.emergencyContactNumber ? '#DC2626' : undefined }} />
                                            <Err msg={errs.emergencyContactNumber} />
                                        </div>
                                    </Grid>
                                </Body>
                            </Card>

                            {/* ── LOCATION & INFRASTRUCTURE ── */}
                            <Card>
                                <SectionHeader icon="location_on" title="Location & Infrastructure" />
                                <Body>
                                    <Grid cols="1fr 1fr">
                                        <div data-err={errs.address1 ? '1' : undefined}>
                                            <Label>Campus Address Line 1 *</Label>
                                            <input className="form-input" placeholder="Street, Landmark" value={form.address1} onChange={f('address1')} style={{ width: '100%', boxSizing: 'border-box', borderColor: errs.address1 ? '#DC2626' : undefined }} />
                                            <Err msg={errs.address1} />
                                        </div>
                                        <div>
                                            <Label>Campus Address Line 2 (Optional)</Label>
                                            <input className="form-input" placeholder="Extension data" value={form.address2} onChange={f('address2')} style={{ width: '100%', boxSizing: 'border-box' }} />
                                        </div>
                                        <div data-err={errs.villageLocality ? '1' : undefined}>
                                            <Label>Village / Locality *</Label>
                                            <input className="form-input" placeholder="Rural/Urban mapping" value={form.villageLocality} onChange={f('villageLocality')} style={{ width: '100%', boxSizing: 'border-box', borderColor: errs.villageLocality ? '#DC2626' : undefined }} />
                                            <Err msg={errs.villageLocality} />
                                        </div>
                                        <div data-err={errs.city ? '1' : undefined}>
                                            <Label>City / Town *</Label>
                                            <input className="form-input" placeholder="Auto-suggested from PIN" value={form.city} onChange={f('city')} style={{ width: '100%', boxSizing: 'border-box', borderColor: errs.city ? '#DC2626' : undefined }} />
                                            <Err msg={errs.city} />
                                        </div>
                                        <div data-err={errs.district ? '1' : undefined}>
                                            <Label>District *</Label>
                                            <select className="form-select" value={form.district} onChange={f('district')} style={{ width: '100%', boxSizing: 'border-box', borderColor: errs.district ? '#DC2626' : undefined }}>
                                                <option value="">Select District</option>
                                                <option>Bengaluru Urban</option>
                                                <option>Bengaluru Rural</option>
                                                <option>Mysuru</option>
                                                <option>Hubli-Dharwad</option>
                                            </select>
                                            <Err msg={errs.district} />
                                        </div>
                                        <div data-err={errs.state ? '1' : undefined}>
                                            <Label>State *</Label>
                                            <select className="form-select" value={form.state} onChange={f('state')} style={{ width: '100%', boxSizing: 'border-box', borderColor: errs.state ? '#DC2626' : undefined }}>
                                                {STATES.map((s) => <option key={s}>{s}</option>)}
                                            </select>
                                            <Err msg={errs.state} />
                                        </div>
                                        <div data-err={errs.pinCode ? '1' : undefined}>
                                            <Label>PIN Code *</Label>
                                            <input className="form-input" placeholder="6-digit validation" value={form.pinCode} onChange={f('pinCode')} maxLength={6} style={{ width: '100%', boxSizing: 'border-box', borderColor: errs.pinCode ? '#DC2626' : undefined }} />
                                            <Err msg={errs.pinCode} />
                                        </div>
                                    </Grid>
                                </Body>
                            </Card>

                            {/* ── OPERATIONAL & SAFETY MAPPING ── */}
                            <Card>
                                <SectionHeader icon="analytics" title="Operational & Safety Mapping" />
                                <Body>
                                    <Grid cols="1fr 1fr 1fr">
                                        <div data-err={errs.numStudents ? '1' : undefined}>
                                            <Label>Number of Students *</Label>
                                            <input type="number" className="form-input" placeholder="0" value={form.numStudents} onChange={f('numStudents')} style={{ width: '100%', boxSizing: 'border-box', borderColor: errs.numStudents ? '#DC2626' : undefined }} />
                                            <Err msg={errs.numStudents} />
                                        </div>
                                        <div data-err={errs.numStaff ? '1' : undefined}>
                                            <Label>Number of Staff *</Label>
                                            <input type="number" className="form-input" placeholder="0" value={form.numStaff} onChange={f('numStaff')} style={{ width: '100%', boxSizing: 'border-box', borderColor: errs.numStaff ? '#DC2626' : undefined }} />
                                            <Err msg={errs.numStaff} />
                                        </div>
                                        <div data-err={errs.numVehiclesOperated ? '1' : undefined}>
                                            <Label>Number of Vehicles Operated *</Label>
                                            <input type="number" className="form-input" placeholder="0" value={form.numVehiclesOperated} onChange={f('numVehiclesOperated')} style={{ width: '100%', boxSizing: 'border-box', borderColor: errs.numVehiclesOperated ? '#DC2626' : undefined }} />
                                            <Err msg={errs.numVehiclesOperated} />
                                        </div>
                                        <div data-err={errs.numDriversAssigned ? '1' : undefined}>
                                            <Label>Number of Drivers Assigned *</Label>
                                            <input type="number" className="form-input" placeholder="0" value={form.numDriversAssigned} onChange={f('numDriversAssigned')} style={{ width: '100%', boxSizing: 'border-box', borderColor: errs.numDriversAssigned ? '#DC2626' : undefined }} />
                                            <Err msg={errs.numDriversAssigned} />
                                        </div>
                                        <div data-err={errs.numBeaconsAssigned ? '1' : undefined}>
                                            <Label>Number of Beacons Assigned *</Label>
                                            <input type="number" className="form-input" placeholder="0" value={form.numBeaconsAssigned} onChange={f('numBeaconsAssigned')} style={{ width: '100%', boxSizing: 'border-box', borderColor: errs.numBeaconsAssigned ? '#DC2626' : undefined }} />
                                            <Err msg={errs.numBeaconsAssigned} />
                                        </div>
                                        <div data-err={errs.numGPSDevicesAssigned ? '1' : undefined}>
                                            <Label>Number of GPS Devices Assigned *</Label>
                                            <input type="number" className="form-input" placeholder="0" value={form.numGPSDevicesAssigned} onChange={f('numGPSDevicesAssigned')} style={{ width: '100%', boxSizing: 'border-box', borderColor: errs.numGPSDevicesAssigned ? '#DC2626' : undefined }} />
                                            <Err msg={errs.numGPSDevicesAssigned} />
                                        </div>
                                        <div data-err={errs.subscriptionPlan ? '1' : undefined}>
                                            <Label>Subscription Plan *</Label>
                                            <select className="form-select" value={form.subscriptionPlan} onChange={f('subscriptionPlan')} style={{ width: '100%', boxSizing: 'border-box', borderColor: errs.subscriptionPlan ? '#DC2626' : undefined }}>
                                                <option value="">Select</option>
                                                <option>Basic Plan</option>
                                                <option>Standard Plan</option>
                                                <option>Premium Plan</option>
                                            </select>
                                            <Err msg={errs.subscriptionPlan} />
                                        </div>
                                        <div>
                                            <Label>Safety Officer Name</Label>
                                            <input className="form-input" placeholder="Name" value={form.safetyOfficerName} onChange={f('safetyOfficerName')} style={{ width: '100%', boxSizing: 'border-box' }} />
                                        </div>
                                        <div>
                                            <Label>Safety Officer Contact</Label>
                                            <input className="form-input" placeholder="XXXXXXXXXX" value={form.safetyOfficerContact} onChange={f('safetyOfficerContact')} style={{ width: '100%', boxSizing: 'border-box' }} />
                                        </div>
                                    </Grid>
                                    <div style={{ marginTop: 24, padding: '16px 20px', background: 'var(--surface)', borderRadius: 12, border: '1.5px solid var(--border)' }}>
                                        <label style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }}>
                                            <input type="checkbox" checked={form.consentCheckbox} onChange={handleConsent} style={{ width: 18, height: 18, accentColor: 'var(--primary)' }} />
                                            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)' }}>
                                                I agree to VanLoka’s safety and compliance onboarding
                                            </div>
                                        </label>
                                        {form.consentTimestamp && (
                                            <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 8, marginLeft: 30 }}>
                                                Consent captured on: <strong>{form.consentTimestamp}</strong>
                                            </div>
                                        )}
                                        <Err msg={errs.consentCheckbox} />
                                    </div>
                                </Body>
                            </Card>
                        </>
                    )}

                    {/* ── DOCUMENT UPLOADS ── */}
                    <Card>
                        <SectionHeader icon="upload_file" title="Document Uploads" />
                        <Body>
                            {(form.orgType === 'Office' || form.orgType === 'Institute' || form.orgType === 'Motor Driving School') && (
                                <div style={{
                                    background: '#FFFBEB',
                                    border: '1px solid #FEF3C7',
                                    padding: '14px 18px',
                                    borderRadius: 12,
                                    marginBottom: 20,
                                    fontSize: 12,
                                    color: '#B45309',
                                    fontWeight: 700,
                                    display: 'flex',
                                    alignItems: 'flex-start',
                                    gap: 12
                                }}>
                                    <span className="material-symbols-outlined" style={{ fontSize: 20, marginTop: 2 }}>info</span>
                                    <div>
                                        <div style={{ textTransform: 'uppercase', marginBottom: 4, letterSpacing: '.05em' }}>Document Guidelines</div>
                                        Compulsory upload required (*) documents. Max file size: 5MB. Formats: PDF, JPG, PNG.
                                    </div>
                                </div>
                            )}

                            <Grid cols="1fr 1fr 1fr">
                                {(form.orgType === 'Institute' ? [
                                    { label: 'PAN Card *', key: 'panCard' },
                                    { label: 'Registration Certificate *', key: 'registrationCert' },
                                    { label: 'UDISE / College Code Proof *', key: 'udiseProof' },
                                    { label: 'Safety SOP *', key: 'safetySop' },
                                    { label: 'Transport Policy *', key: 'transportPolicy' },
                                    { label: 'Insurance Certificate *', key: 'insuranceCert' },
                                    { label: 'Driver Vetting Policy *', key: 'driverVettingPolicy' },
                                    { label: 'Vehicle Maintenance Policy *', key: 'maintenancePolicy' },
                                    { label: 'CCTV / Panic Button Policy', key: 'cctvPolicy' },
                                    { label: 'Subscription Agreement *', key: 'subscriptionAgreement' },
                                    { label: 'Consent Declaration *', key: 'consentDeclaration' },
                                ] : form.orgType === 'Vendor' ? [
                                    { label: 'PAN Card *', key: 'panCard' },
                                    { label: 'GST Certificate *', key: 'gstCert' },
                                    { label: 'Bank Proof (Cancelled Cheque) *', key: 'bankProof' },
                                    { label: 'Signed Contract *', key: 'contractDoc' },
                                    { label: 'Aadhaar Card (if Individual) *', key: 'aadhaarCard' },
                                    { label: 'Insurance Certificate *', key: 'insuranceCert' },
                                    { label: 'UDYAM / MSME Certificate', key: 'udyamCert' },
                                    { label: 'Safety Equipment Checklist', key: 'safetyEquipChecklist' },
                                ] : form.orgType === 'Motor Driving School' ? [
                                    { label: 'RTO License Copy *', key: 'rtoLicenseCopy' },
                                    { label: 'PAN Card *', key: 'panCard' },
                                    { label: 'Registration Certificate *', key: 'registrationCert' },
                                    { label: 'Safety SOP *', key: 'safetySop' },
                                    { label: 'Trainer Certification List *', key: 'trainerCertList' },
                                    { label: 'Vehicle Insurance Certificates *', key: 'insuranceCert' },
                                    { label: 'Vehicle Fitness Certificates *', key: 'fitnessCert' },
                                    { label: 'Driver Vetting Policy *', key: 'driverVettingPolicy' },
                                    { label: 'CCTV / Panic Button Policy', key: 'cctvPolicy' },
                                    { label: 'Subscription Agreement *', key: 'subscriptionAgreement' },
                                    { label: 'Consent Declaration *', key: 'consentDeclaration' },
                                ] : form.orgType === 'Office' ? [
                                    { label: 'Registration Certificate *', key: 'registrationCert' },
                                    { label: 'GST Certificate *', key: 'gstCert' },
                                    { label: 'PAN Card *', key: 'panCard' },
                                    { label: 'UDYAM / MSME Certificate *', key: 'udyamCert' },
                                    { label: 'Transport Policy', key: 'transportPolicy' },
                                    { label: 'Safety SOP', key: 'safetySop' },
                                    { label: 'Vendor Policy', key: 'vendorPolicy' },
                                    { label: 'Driver Vetting Policy', key: 'driverVettingPolicy' },
                                    { label: 'Insurance Certificate', key: 'insuranceCert' },
                                    { label: 'Subscription Agreement', key: 'subscriptionAgreement' },
                                    { label: 'Additional Doc', key: 'additionalDoc' },
                                ] : [
                                    { label: 'Registration Certificate', key: 'registrationCert' },
                                    { label: 'GST Certificate', key: 'gstCert' },
                                    { label: 'PAN Card', key: 'panCard' },
                                ]).map(({ label, key }) => (
                                    <div key={key}>
                                        <Label>{label}</Label>
                                        <label
                                            style={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                height: 96,
                                                borderRadius: 12,
                                                border: '2px dashed var(--border)',
                                                background: form[key as keyof Form] ? '#F5F3FF' : 'var(--surface)',
                                                cursor: 'pointer',
                                                gap: 6,
                                                borderColor: form[key as keyof Form] ? 'var(--primary)' : undefined,
                                                transition: 'all 0.2s'
                                            }}
                                        >
                                            <span className="material-symbols-outlined" style={{ fontSize: 26, color: form[key as keyof Form] ? 'var(--primary)' : '#CBD5E1' }}>
                                                {form[key as keyof Form] ? 'check_circle' : 'cloud_upload'}
                                            </span>
                                            <span style={{ fontSize: 10, fontWeight: 700, color: form[key as keyof Form] ? 'var(--primary)' : (errs[key as keyof Form] ? '#DC2626' : '#94A3B8'), textAlign: 'center', padding: '0 8px' }}>
                                                {form[key as keyof Form] ? (form[key as keyof Form] as File).name : (errs[key as keyof Form] || 'No file chosen')}
                                            </span>
                                            <span style={{ fontSize: 9, color: '#CBD5E1' }}>Click to upload</span>
                                            <input type="file" style={{ display: 'none' }} onChange={handleDoc(key as keyof Form)} />
                                        </label>
                                    </div>
                                ))}
                            </Grid>
                        </Body>
                    </Card>

                    {/* ── STATUS & REMARKS ── */}
                    <Card>
                        <SectionHeader icon="shield_person" title="Status & Remarks" />
                        <Body>
                            <Grid cols="1fr 1fr">
                                <div>
                                    <Label>Status</Label>
                                    <div style={{ display: 'flex', gap: 20, marginTop: 6 }}>
                                        {['Active', 'Inactive', 'Pending'].map((s) => (
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
                                                    name="orgStatus"
                                                    value={s}
                                                    checked={form.status === s}
                                                    onChange={f('status')}
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
                            </Grid>
                            <div style={{ marginTop: 18 }}>
                                <Label>Remarks</Label>
                                <textarea
                                    className="form-input"
                                    rows={3}
                                    placeholder="Add any additional notes…"
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
                        <button
                            className="btn btn-secondary"
                            onClick={() => navigate('/organisation')}
                        >
                            CANCEL
                        </button>
                        <button
                            className="btn btn-primary"
                            onClick={handleSave}
                            style={{ minWidth: 200 }}
                        >
                            <span className="material-symbols-outlined ms">save</span>{' '}
                            {isEdit ? 'UPDATE ORGANISATION' : 'SAVE ORGANISATION'}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default OrganisationCreate;
