/* ── Organisation types & seed data ── */

export type OrgType = 'Office' | 'Vendor' | 'Motor Driving School' | 'Institute';

export interface Organisation {
    id: string;
    name: string;
    type: OrgType;
    contactPerson: string;
    phone: string;
    email: string;
    address: string;
    city: string;
    state: string;
    pinCode: string;
    status: 'Active' | 'Inactive' | 'Pending';
    gstNumber: string;
    panNumber: string;
    remarks: string;
    /* Office-specific */
    officeCode?: string;
    numberOfEmployees?: number;
    operatingHours?: string;
    /* Vendor-specific */
    vendorType?: 'Individual' | 'Company' | 'Trust' | 'Cooperative';
    serviceType?: string;
    contractStartDate?: string;
    contractEndDate?: string;
    vehicleCount?: number;
    /* Motor Driving School-specific */
    mdsLicenseNumber?: string;
    licenseExpiryDate?: string;
    totalVehicles?: number;
    mdsCourses?: string[];
    /* Institute-specific */
    affiliatedBody?: string;
    accreditationNumber?: string;
    instituteCourses?: string[];
    studentCapacity?: number;
}

export const orgStatusVariant = (s: Organisation['status']): 'green' | 'slate' | 'amber' => {
    switch (s) {
        case 'Active':
            return 'green';
        case 'Inactive':
            return 'slate';
        case 'Pending':
            return 'amber';
    }
};

export const orgTypeIcon = (t: OrgType): string => {
    switch (t) {
        case 'Office':
            return 'apartment';
        case 'Vendor':
            return 'store';
        case 'Motor Driving School':
            return 'directions_car';
        case 'Institute':
            return 'school';
    }
};

export const orgTypeColor = (t: OrgType): { bg: string; color: string; label: string } => {
    switch (t) {
        case 'Office':
            return { bg: '#DBEAFE', color: '#2563EB', label: 'Office' };
        case 'Vendor':
            return { bg: '#FEF3C7', color: '#D97706', label: 'Vendor' };
        case 'Motor Driving School':
            return { bg: '#DCFCE7', color: '#059669', label: 'MDS' };
        case 'Institute':
            return { bg: '#EDE9FE', color: '#7C3AED', label: 'Institute' };
    }
};

export const getOrgInitials = (name: string): string =>
    name
        .split(' ')
        .map((w) => w[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);

export const orgAvatarColor = (idx: number): { bg: string; cl: string } => {
    const palette = [
        { bg: '#EDE9FE', cl: '#7C3AED' },
        { bg: '#DBEAFE', cl: '#2563EB' },
        { bg: '#DCFCE7', cl: '#059669' },
        { bg: '#FEF3C7', cl: '#D97706' },
        { bg: '#FEE2E2', cl: '#DC2626' },
        { bg: '#E0E7FF', cl: '#4F46E5' },
        { bg: '#CCFBF1', cl: '#0D9488' },
        { bg: '#FFEDD5', cl: '#EA580C' },
    ];
    return palette[idx % palette.length];
};

/* ── Dummy organisations (3 per type = 12 total) ── */

export const INITIAL_ORGANISATIONS: Organisation[] = [
    /* ── Offices ── */
    {
        id: 'ORG-1001',
        name: 'VanLoka Head Office',
        type: 'Office',
        contactPerson: 'Rajesh Malhotra',
        phone: '+91 98765 11001',
        email: 'rajesh.m@vanloka.com',
        address: '12th Floor, Prestige Tower, MG Road',
        city: 'Bengaluru',
        state: 'Karnataka',
        pinCode: '560001',
        status: 'Active',
        gstNumber: '29AABCV1234A1Z5',
        panNumber: 'AABCV1234A',
        remarks: 'Central administration hub.',
        officeCode: 'HO-BLR-01',
        numberOfEmployees: 120,
        operatingHours: '9:00 AM – 6:00 PM',
    },
    {
        id: 'ORG-1002',
        name: 'VanLoka Regional Office – Mumbai',
        type: 'Office',
        contactPerson: 'Sneha Kapoor',
        phone: '+91 98765 11002',
        email: 'sneha.k@vanloka.com',
        address: 'Unit 8, BKC Complex, Bandra East',
        city: 'Mumbai',
        state: 'Maharashtra',
        pinCode: '400051',
        status: 'Active',
        gstNumber: '27BVLOK5678B2Y8',
        panNumber: 'BVLOK5678B',
        remarks: '',
        officeCode: 'RO-MUM-01',
        numberOfEmployees: 45,
        operatingHours: '9:30 AM – 6:30 PM',
    },
    {
        id: 'ORG-1003',
        name: 'VanLoka Branch – Chennai',
        type: 'Office',
        contactPerson: 'Karthik Subramanian',
        phone: '+91 98765 11003',
        email: 'karthik.s@vanloka.com',
        address: '3rd Floor, Anna Salai Tower',
        city: 'Chennai',
        state: 'Tamil Nadu',
        pinCode: '600002',
        status: 'Pending',
        gstNumber: '33CVLOK9012C3X1',
        panNumber: 'CVLOK9012C',
        remarks: 'New branch — setup in progress.',
        officeCode: 'BR-CHE-01',
        numberOfEmployees: 18,
        operatingHours: '10:00 AM – 7:00 PM',
    },

    /* ── Vendors ── */
    {
        id: 'ORG-2001',
        name: 'Apex Fuel Solutions',
        type: 'Vendor',
        contactPerson: 'Robert Johnson',
        phone: '+91 98765 22001',
        email: 'robert.j@apexfuel.com',
        address: 'Plot 45, Industrial Area Phase II',
        city: 'Bengaluru',
        state: 'Karnataka',
        pinCode: '560058',
        status: 'Active',
        gstNumber: '29AABCA0000A1Z5',
        panNumber: 'AABCA0000A',
        remarks: 'Premium fuel supplier.',
        vendorType: 'Company',
        serviceType: 'Fuel Supply',
        contractStartDate: '2024-01-15',
        contractEndDate: '2025-12-15',
        vehicleCount: 12,
    },
    {
        id: 'ORG-2002',
        name: 'Premier Garage Services',
        type: 'Vendor',
        contactPerson: 'Sarah Miller',
        phone: '+91 87654 22002',
        email: 'sarah.m@premiergar.com',
        address: '42B, Rajkumar Road, Rajajinagar',
        city: 'Bengaluru',
        state: 'Karnataka',
        pinCode: '560010',
        status: 'Active',
        gstNumber: '29BPREM1234B2Z8',
        panNumber: 'BPREM1234B',
        remarks: '',
        vendorType: 'Company',
        serviceType: 'Maintenance',
        contractStartDate: '2024-03-01',
        contractEndDate: '2025-10-01',
        vehicleCount: 0,
    },
    {
        id: 'ORG-2003',
        name: 'Rajesh Kumar Transport',
        type: 'Vendor',
        contactPerson: 'Rajesh Kumar',
        phone: '+91 77665 22003',
        email: 'rajesh.kumar@gmail.com',
        address: 'No. 8, 3rd Cross, JP Nagar',
        city: 'Bengaluru',
        state: 'Karnataka',
        pinCode: '560078',
        status: 'Inactive',
        gstNumber: '29DRAJE9012D4Y7',
        panNumber: 'DRAJE9012D',
        remarks: 'Contract ended.',
        vendorType: 'Individual',
        serviceType: 'Fleet Management',
        contractStartDate: '2023-02-01',
        contractEndDate: '2024-02-01',
        vehicleCount: 8,
    },

    /* ── Motor Driving Schools ── */
    {
        id: 'ORG-3001',
        name: 'SafeDrive Motor Training School',
        type: 'Motor Driving School',
        contactPerson: 'Amit Verma',
        phone: '+91 98765 33001',
        email: 'amit@safedrive.in',
        address: '22, Outer Ring Road, HSR Layout',
        city: 'Bengaluru',
        state: 'Karnataka',
        pinCode: '560102',
        status: 'Active',
        gstNumber: '29ESAFE3456E5T3',
        panNumber: 'ESAFE3456E',
        remarks: 'Top-rated MDS in South Bengaluru.',
        mdsLicenseNumber: 'MDS-KA-2021-0045',
        licenseExpiryDate: '2026-06-30',
        totalVehicles: 25,
        mdsCourses: ['LMV', 'HMV', 'Two Wheeler'],
    },
    {
        id: 'ORG-3002',
        name: 'RoadMaster Driving Academy',
        type: 'Motor Driving School',
        contactPerson: 'Priya Krishnan',
        phone: '+91 98765 33002',
        email: 'priya@roadmaster.co.in',
        address: '56, 100 Feet Road, Indiranagar',
        city: 'Bengaluru',
        state: 'Karnataka',
        pinCode: '560038',
        status: 'Active',
        gstNumber: '29FROAD7890F6R2',
        panNumber: 'FROAD7890F',
        remarks: '',
        mdsLicenseNumber: 'MDS-KA-2022-0112',
        licenseExpiryDate: '2027-03-15',
        totalVehicles: 18,
        mdsCourses: ['LMV', 'Two Wheeler', 'Auto Rickshaw'],
    },
    {
        id: 'ORG-3003',
        name: 'CityDrive Training Centre',
        type: 'Motor Driving School',
        contactPerson: 'Suresh Babu',
        phone: '+91 77880 33003',
        email: 'suresh@citydrive.in',
        address: '14, Service Road, Majestic',
        city: 'Bengaluru',
        state: 'Karnataka',
        pinCode: '560009',
        status: 'Pending',
        gstNumber: '29GCITY1234G7M5',
        panNumber: 'GCITY1234G',
        remarks: 'License renewal pending.',
        mdsLicenseNumber: 'MDS-KA-2020-0033',
        licenseExpiryDate: '2025-01-31',
        totalVehicles: 10,
        mdsCourses: ['LMV', 'HMV'],
    },

    /* ── Institutes ── */
    {
        id: 'ORG-4001',
        name: 'National Institute of Road Safety',
        type: 'Institute',
        contactPerson: 'Dr. Lakshmi Narayan',
        phone: '+91 98765 44001',
        email: 'lakshmi@nirs.edu.in',
        address: 'Campus II, Tumkur Road',
        city: 'Bengaluru',
        state: 'Karnataka',
        pinCode: '560073',
        status: 'Active',
        gstNumber: '29HNIRS5678H8K9',
        panNumber: 'HNIRS5678H',
        remarks: 'Government-affiliated institute.',
        affiliatedBody: 'Ministry of Road Transport & Highways',
        accreditationNumber: 'NAAC-A-2023-1045',
        instituteCourses: [
            'Road Safety Diploma',
            'Advanced Driving Instructor',
            'Fleet Management',
        ],
        studentCapacity: 500,
    },
    {
        id: 'ORG-4002',
        name: 'Bangalore Transport Training Institute',
        type: 'Institute',
        contactPerson: 'Venkatesh Murthy',
        phone: '+91 98765 44002',
        email: 'venkatesh@btti.ac.in',
        address: 'Sector 3, Electronic City',
        city: 'Bengaluru',
        state: 'Karnataka',
        pinCode: '560100',
        status: 'Active',
        gstNumber: '29IBTTI9012I9J6',
        panNumber: 'IBTTI9012I',
        remarks: '',
        affiliatedBody: 'Karnataka State Board of Technical Education',
        accreditationNumber: 'KSBTE-2022-0789',
        instituteCourses: ['Commercial Vehicle Operation', 'Defensive Driving'],
        studentCapacity: 200,
    },
    {
        id: 'ORG-4003',
        name: 'Southern Academy of Logistics',
        type: 'Institute',
        contactPerson: 'Anitha Rao',
        phone: '+91 98765 44003',
        email: 'anitha@salacademy.in',
        address: '88, Whitefield Main Road',
        city: 'Bengaluru',
        state: 'Karnataka',
        pinCode: '560066',
        status: 'Inactive',
        gstNumber: '29JSALA3456J0L3',
        panNumber: 'JSALA3456J',
        remarks: 'Temporarily closed for renovation.',
        affiliatedBody: 'AICTE',
        accreditationNumber: 'AICTE-2021-0432',
        instituteCourses: ['Logistics Management', 'Supply Chain'],
        studentCapacity: 350,
    },
];
