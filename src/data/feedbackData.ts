/* ── Shared feedback/complaint types & seed data ── */

export interface FeedbackEntry {
    id: string;
    type: 'feedback' | 'complaint';
    name: string;
    role: 'Staff' | 'Traveller' | 'Trainee' | 'Instructor' | 'Vendor';
    email: string;
    phone: string;
    rating: number; // 0 for complaints
    comment: string;
    target: string;
    targetType: 'vehicle' | 'driver' | 'route' | 'service' | 'general';
    date: string;
    status: 'Open' | 'In Progress' | 'Resolved' | 'Dismissed';
    category: string;
    priority: 'Low' | 'Medium' | 'High' | 'Critical';
}

export const feedbackStatusVariant = (
    s: FeedbackEntry['status']
): 'red' | 'amber' | 'green' | 'slate' => {
    switch (s) {
        case 'Open':
            return 'red';
        case 'In Progress':
            return 'amber';
        case 'Resolved':
            return 'green';
        case 'Dismissed':
            return 'slate';
    }
};

export const priorityVariant = (
    p: FeedbackEntry['priority']
): 'slate' | 'blue' | 'orange' | 'red' => {
    switch (p) {
        case 'Low':
            return 'slate';
        case 'Medium':
            return 'blue';
        case 'High':
            return 'orange';
        case 'Critical':
            return 'red';
    }
};

export const targetTypeIcon = (t: FeedbackEntry['targetType']): string => {
    switch (t) {
        case 'vehicle':
            return 'directions_bus';
        case 'driver':
            return 'person';
        case 'route':
            return 'route';
        case 'service':
            return 'support_agent';
        case 'general':
            return 'info';
    }
};

export const avatarColor = (idx: number): { bg: string; color: string } => {
    const palette = [
        { bg: '#EDE9FE', color: '#7C3AED' },
        { bg: '#DBEAFE', color: '#2563EB' },
        { bg: '#DCFCE7', color: '#059669' },
        { bg: '#FEF3C7', color: '#D97706' },
        { bg: '#FEE2E2', color: '#DC2626' },
        { bg: '#E0E7FF', color: '#4F46E5' },
        { bg: '#CCFBF1', color: '#0D9488' },
        { bg: '#FFEDD5', color: '#EA580C' },
    ];
    return palette[idx % palette.length];
};

export const getInitials = (name: string): string =>
    name
        .split(' ')
        .map((w) => w[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);

export const INITIAL_FEEDBACKS: FeedbackEntry[] = [
    {
        id: 'CMP-2023-8842',
        type: 'complaint',
        name: 'John Doe',
        role: 'Staff',
        email: 'john.doe@company.com',
        phone: '+91 98765 43210',
        rating: 0,
        comment:
            'AC was not working properly in the rear seats. Extremely uncomfortable during the long haul trip on Oct 23rd.',
        target: 'KA-01-2345',
        targetType: 'vehicle',
        date: '2023-10-23',
        status: 'Open',
        category: 'Vehicle Issue',
        priority: 'High',
    },
    {
        id: 'FBK-2023-4401',
        type: 'feedback',
        name: 'Ananya Kulkarni',
        role: 'Traveller',
        email: 'ananya.k@gmail.com',
        phone: '+91 87654 32109',
        rating: 5,
        comment:
            'The driver was very professional and reached exactly on time. Smooth driving throughout the route.',
        target: 'Rahul S.',
        targetType: 'driver',
        date: '2023-10-24',
        status: 'Resolved',
        category: 'Driver Behaviour',
        priority: 'Low',
    },
    {
        id: 'CMP-2023-8843',
        type: 'complaint',
        name: 'Priya Sharma',
        role: 'Traveller',
        email: 'priya.s@outlook.com',
        phone: '+91 99001 22334',
        rating: 0,
        comment:
            'Driver was rude and took a much longer route. Trip took 45 minutes extra compared to estimated time.',
        target: 'Vijay M.',
        targetType: 'driver',
        date: '2023-10-25',
        status: 'Open',
        category: 'Driver Behaviour',
        priority: 'Critical',
    },
    {
        id: 'FBK-2023-4402',
        type: 'feedback',
        name: 'Rajesh Kumar',
        role: 'Staff',
        email: 'rajesh.k@company.com',
        phone: '+91 77665 54433',
        rating: 4,
        comment:
            'New GPS system is working great. Route optimization has improved delivery times by ~20%.',
        target: 'Route #12A',
        targetType: 'route',
        date: '2023-10-26',
        status: 'Resolved',
        category: 'Route / Navigation',
        priority: 'Low',
    },
    {
        id: 'CMP-2023-8844',
        type: 'complaint',
        name: 'Meera Nair',
        role: 'Trainee',
        email: 'meera.n@training.com',
        phone: '+91 88990 11223',
        rating: 0,
        comment:
            'Training vehicle had brake issues. Reported to instructor but no action was taken. Safety concern.',
        target: 'KA-05-7890',
        targetType: 'vehicle',
        date: '2023-10-27',
        status: 'In Progress',
        category: 'Safety Concern',
        priority: 'Critical',
    },
    {
        id: 'FBK-2023-4403',
        type: 'feedback',
        name: 'Sunil Verma',
        role: 'Instructor',
        email: 'sunil.v@mds.com',
        phone: '+91 77880 99001',
        rating: 3,
        comment:
            'Average experience with the new scheduling system. It works but the UI is confusing for older instructors.',
        target: 'Scheduling App',
        targetType: 'service',
        date: '2023-10-28',
        status: 'Resolved',
        category: 'App / Technical',
        priority: 'Medium',
    },
    {
        id: 'CMP-2023-8845',
        type: 'complaint',
        name: 'Deepak Gupta',
        role: 'Vendor',
        email: 'deepak.g@vendor.com',
        phone: '+91 99110 22334',
        rating: 0,
        comment:
            "Payment for October invoice still pending. It's been over 30 days since submission. Please resolve urgently.",
        target: 'Finance Dept.',
        targetType: 'service',
        date: '2023-10-29',
        status: 'Open',
        category: 'Billing / Payment',
        priority: 'High',
    },
    {
        id: 'FBK-2023-4404',
        type: 'feedback',
        name: 'Lakshmi Devi',
        role: 'Traveller',
        email: 'lakshmi.d@gmail.com',
        phone: '+91 66554 33221',
        rating: 5,
        comment:
            'Amazing service! The vehicle was clean, driver was courteous, and the app tracking was accurate.',
        target: 'KA-03-1122',
        targetType: 'vehicle',
        date: '2023-10-30',
        status: 'Resolved',
        category: 'Vehicle Issue',
        priority: 'Low',
    },
    {
        id: 'CMP-2023-8846',
        type: 'complaint',
        name: 'Arun Patel',
        role: 'Staff',
        email: 'arun.p@company.com',
        phone: '+91 88112 33445',
        rating: 0,
        comment:
            'Repeated GPS failure on vehicle KA-02-6789. Have reported this three times already with no fix.',
        target: 'KA-02-6789',
        targetType: 'vehicle',
        date: '2023-11-01',
        status: 'In Progress',
        category: 'App / Technical',
        priority: 'High',
    },
    {
        id: 'FBK-2023-4405',
        type: 'feedback',
        name: 'Kavita Das',
        role: 'Instructor',
        email: 'kavita.d@mds.com',
        phone: '+91 77223 44556',
        rating: 4,
        comment:
            'The new training curriculum is comprehensive. Students are responding well to the practical sessions.',
        target: 'Training Dept.',
        targetType: 'general',
        date: '2023-11-02',
        status: 'Resolved',
        category: 'Other',
        priority: 'Low',
    },
    {
        id: 'CMP-2023-8847',
        type: 'complaint',
        name: 'Mohammed Sharif',
        role: 'Vendor',
        email: 'sharif@vendor.com',
        phone: '+91 99001 22445',
        rating: 0,
        comment:
            'Contract renewal documents not processed. Submitted on Oct 15 but no acknowledgment received yet.',
        target: 'Admin Dept.',
        targetType: 'service',
        date: '2023-11-03',
        status: 'Open',
        category: 'Other',
        priority: 'Medium',
    },
    {
        id: 'FBK-2023-4406',
        type: 'feedback',
        name: 'Harish Menon',
        role: 'Traveller',
        email: 'harish.m@gmail.com',
        phone: '+91 88112 33445',
        rating: 2,
        comment:
            "Pickup was 20 minutes late. Driver didn't know the exact location. Could be improved with better navigation.",
        target: 'Naveen R.',
        targetType: 'driver',
        date: '2023-11-04',
        status: 'Dismissed',
        category: 'Route / Navigation',
        priority: 'Medium',
    },
];
