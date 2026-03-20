export interface SupplierDevice {
    id: string;
    imei: string;
    model: string;
    type: 'AIS140' | 'Basic' | 'OBD';
    status: 'In Stock' | 'Assigned' | 'Faulty';
    addedDate: string;
    assignedOrg?: string;
    orgType?: string;
}

export interface Supplier {
    id: string;
    name: string;
    location: string;
    contactPerson: string;
    phone: string;
    email: string;
    status: 'Active' | 'Inactive';
    devices: SupplierDevice[];
}

export const DUMMY_SUPPLIERS: Supplier[] = [
    {
        id: 'SUP-001',
        name: 'iTriangle',
        location: 'Bangalore',
        contactPerson: 'Rahul Sharma',
        phone: '+91 98765 43210',
        email: 'rahul@itriangle.com',
        status: 'Active',
        devices: Array.from({ length: 10 }).map((_, i) => ({
            id: `DEV-100${i}`,
            imei: i === 0 ? '86420104000100' : `86420104000${100 + i}`,
            model: i === 0 ? 'Aqua G2' : 'Aqua G2',
            type: 'AIS140',
            status: i === 0 ? 'Assigned' : i % 3 === 0 ? 'Assigned' : 'In Stock',
            addedDate: 'Mar 01, 2026',
            assignedOrg: i === 0 ? 'BHARAT_MOTORS' : i % 3 === 0 ? 'City Logistics' : undefined,
            orgType: i === 0 ? 'MDS' : i % 3 === 0 ? 'Vendor' : undefined,
        })),
    },
    {
        id: 'SUP-002',
        name: 'Teltonika',
        location: 'Delhi',
        contactPerson: 'Anita Singh',
        phone: '+91 91234 56789',
        email: 'anita@teltonika.in',
        status: 'Active',
        devices: Array.from({ length: 5 }).map((_, i) => ({
            id: `DEV-200${i}`,
            imei: `35467810000${200 + i}`,
            model: 'FMB920',
            type: 'Basic',
            status: 'In Stock',
            addedDate: 'Mar 05, 2026',
        })),
    },
];
