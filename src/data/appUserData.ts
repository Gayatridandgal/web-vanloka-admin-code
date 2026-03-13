
export interface AppUser {
    id: string;
    name: string;
    email: string;
    phone: string;
    organisation: string;
    orgType: 'Office' | 'Vendor' | 'Institute' | 'MDS';
    device: 'Android' | 'iOS' | 'Web';
    lastActive: string;
    status: 'Active' | 'Inactive' | 'Blocked';
}

export const DUMMY_APP_USERS: AppUser[] = [
    {
        id: 'USR-001',
        name: 'Rahul Sharma',
        email: 'user1@example.com',
        phone: '+91 9800000000',
        organisation: 'TechCorp',
        orgType: 'Office',
        device: 'Android',
        lastActive: '1 min ago',
        status: 'Active'
    },
    {
        id: 'USR-002',
        name: 'Priya Mehta',
        email: 'user2@example.com',
        phone: '+91 9800000001',
        organisation: 'InfoSys',
        orgType: 'Institute',
        device: 'iOS',
        lastActive: '2 min ago',
        status: 'Active'
    }
];
