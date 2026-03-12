/* ── Staff types & seed data ── */

export interface Staff {
    id: string;
    firstName: string;
    lastName: string;
    gender: string;
    email: string;
    phone: string;
    designation: string;
    department: string;
    employmentType: 'Full Time' | 'Part Time' | 'Contract';
    joiningDate: string;
    status: 'Active' | 'On Leave' | 'Inactive';
    roles: string[];
    address: string;
    city: string;
    state: string;
    pinCode: string;
    bankName: string;
    accountNumber: string;
    ifsc: string;
    remarks: string;
}

export const staffStatusVariant = (s: Staff['status']): 'green' | 'amber' | 'slate' => {
    switch (s) {
        case 'Active':
            return 'green';
        case 'On Leave':
            return 'amber';
        case 'Inactive':
            return 'slate';
    }
};

export const avatarColors = [
    { bg: '#EDE9FE', cl: '#7C3AED' },
    { bg: '#DBEAFE', cl: '#2563EB' },
    { bg: '#FEF3C7', cl: '#D97706' },
    { bg: '#FEE2E2', cl: '#DC2626' },
    { bg: '#DCFCE7', cl: '#059669' },
    { bg: '#E0F2FE', cl: '#0284C7' },
    { bg: '#FCE7F3', cl: '#DB2777' },
    { bg: '#F3E8FF', cl: '#9333EA' },
];

export const getAvatarColor = (idx: number) => avatarColors[idx % avatarColors.length];

export const getInitials = (first: string, last: string) =>
    `${first.charAt(0)}${last.charAt(0)}`.toUpperCase();

export const INITIAL_STAFF: Staff[] = [
    {
        id: 'EMP-1024',
        firstName: 'Rahul',
        lastName: 'Sharma',
        gender: 'Male',
        email: 'rahul.sharma@example.com',
        phone: '+91 98765 43210',
        designation: 'Operations Manager',
        department: 'Operations',
        employmentType: 'Full Time',
        joiningDate: '12 Jan 2022',
        status: 'Active',
        roles: ['Manager'],
        address: '42, MG Road, Sector 14',
        city: 'Mumbai',
        state: 'Maharashtra',
        pinCode: '400001',
        bankName: 'State Bank of India',
        accountNumber: 'XXXX XXXX 4521',
        ifsc: 'SBIN0001234',
        remarks: 'Team lead for fleet operations.',
    },
    {
        id: 'EMP-1032',
        firstName: 'Ananya',
        lastName: 'Gupta',
        gender: 'Female',
        email: 'ananya.g@example.com',
        phone: '+91 98765 43221',
        designation: 'Fleet Dispatcher',
        department: 'Fleet Operations',
        employmentType: 'Full Time',
        joiningDate: '5 Mar 2021',
        status: 'Active',
        roles: ['Coordinator'],
        address: '15, Park Street',
        city: 'Delhi',
        state: 'Delhi',
        pinCode: '110001',
        bankName: 'HDFC Bank',
        accountNumber: 'XXXX XXXX 7823',
        ifsc: 'HDFC0002345',
        remarks: '',
    },
    {
        id: 'EMP-0988',
        firstName: 'Vikram',
        lastName: 'Patel',
        gender: 'Male',
        email: 'v.patel@example.com',
        phone: '+91 98765 43232',
        designation: 'Sr. Coordinator',
        department: 'Training',
        employmentType: 'Full Time',
        joiningDate: '20 Aug 2023',
        status: 'On Leave',
        roles: ['Coordinator'],
        address: '8, Nehru Nagar',
        city: 'Ahmedabad',
        state: 'Gujarat',
        pinCode: '380015',
        bankName: 'ICICI Bank',
        accountNumber: 'XXXX XXXX 3456',
        ifsc: 'ICIC0003456',
        remarks: 'On medical leave until Nov 2023.',
    },
    {
        id: 'EMP-1120',
        firstName: 'Sonia',
        lastName: 'Mehra',
        gender: 'Female',
        email: 'sonia.m@example.com',
        phone: '+91 98765 43256',
        designation: 'HR Associate',
        department: 'Human Resources',
        employmentType: 'Part Time',
        joiningDate: '3 Nov 2023',
        status: 'Inactive',
        roles: ['Support'],
        address: '22, Laxmi Nagar',
        city: 'Jaipur',
        state: 'Rajasthan',
        pinCode: '302001',
        bankName: 'Axis Bank',
        accountNumber: 'XXXX XXXX 8901',
        ifsc: 'UTIB0004567',
        remarks: 'Account deactivated — contract ended.',
    },
    {
        id: 'EMP-1045',
        firstName: 'Deepak',
        lastName: 'Kumar',
        gender: 'Male',
        email: 'deepak.k@example.com',
        phone: '+91 98765 43267',
        designation: 'Driver Supervisor',
        department: 'Fleet Operations',
        employmentType: 'Full Time',
        joiningDate: '15 Jun 2020',
        status: 'Active',
        roles: ['Fleet Operator'],
        address: '101, Gandhi Road',
        city: 'Chennai',
        state: 'Tamil Nadu',
        pinCode: '600001',
        bankName: 'Indian Bank',
        accountNumber: 'XXXX XXXX 5678',
        ifsc: 'IDIB0005678',
        remarks: '',
    },
    {
        id: 'EMP-1078',
        firstName: 'Priya',
        lastName: 'Nair',
        gender: 'Female',
        email: 'priya.n@example.com',
        phone: '+91 98765 43278',
        designation: 'Training Coordinator',
        department: 'Training',
        employmentType: 'Full Time',
        joiningDate: '10 Feb 2022',
        status: 'Active',
        roles: ['Coordinator'],
        address: '33, MG Road',
        city: 'Bangalore',
        state: 'Karnataka',
        pinCode: '560001',
        bankName: 'Canara Bank',
        accountNumber: 'XXXX XXXX 2345',
        ifsc: 'CNRB0006789',
        remarks: '',
    },
    {
        id: 'EMP-1092',
        firstName: 'Amit',
        lastName: 'Singh',
        gender: 'Male',
        email: 'amit.s@example.com',
        phone: '+91 98765 43289',
        designation: 'IT Support Engineer',
        department: 'IT',
        employmentType: 'Contract',
        joiningDate: '1 Sep 2023',
        status: 'Active',
        roles: ['Support'],
        address: '56, Rajpur Road',
        city: 'Dehradun',
        state: 'Uttarakhand',
        pinCode: '248001',
        bankName: 'Punjab National Bank',
        accountNumber: 'XXXX XXXX 6789',
        ifsc: 'PUNB0007890',
        remarks: '6-month contract — renewable.',
    },
    {
        id: 'EMP-1105',
        firstName: 'Meera',
        lastName: 'Joshi',
        gender: 'Female',
        email: 'meera.j@example.com',
        phone: '+91 98765 43290',
        designation: 'Finance Executive',
        department: 'Finance',
        employmentType: 'Full Time',
        joiningDate: '28 Apr 2021',
        status: 'Active',
        roles: ['Manager'],
        address: '7, Civil Lines',
        city: 'Pune',
        state: 'Maharashtra',
        pinCode: '411001',
        bankName: 'Kotak Mahindra Bank',
        accountNumber: 'XXXX XXXX 9012',
        ifsc: 'KKBK0008901',
        remarks: '',
    },
    {
        id: 'EMP-1118',
        firstName: 'Karan',
        lastName: 'Verma',
        gender: 'Male',
        email: 'karan.v@example.com',
        phone: '+91 98765 43301',
        designation: 'Operations Assistant',
        department: 'Operations',
        employmentType: 'Part Time',
        joiningDate: '12 Jul 2023',
        status: 'On Leave',
        roles: ['Support'],
        address: '14, Station Road',
        city: 'Lucknow',
        state: 'Uttar Pradesh',
        pinCode: '226001',
        bankName: 'Bank of Baroda',
        accountNumber: 'XXXX XXXX 3456',
        ifsc: 'BARB0009012',
        remarks: 'Personal leave — returning Dec 2023.',
    },
    {
        id: 'EMP-1130',
        firstName: 'Neha',
        lastName: 'Reddy',
        gender: 'Female',
        email: 'neha.r@example.com',
        phone: '+91 98765 43312',
        designation: 'Compliance Officer',
        department: 'Compliance',
        employmentType: 'Full Time',
        joiningDate: '6 Oct 2022',
        status: 'Active',
        roles: ['Manager', 'Coordinator'],
        address: '29, Jubilee Hills',
        city: 'Hyderabad',
        state: 'Telangana',
        pinCode: '500033',
        bankName: 'Union Bank of India',
        accountNumber: 'XXXX XXXX 7890',
        ifsc: 'UBIN0010123',
        remarks: '',
    },
];
