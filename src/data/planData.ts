export type FeatureStatus = 'Active' | 'Inactive' | 'Deprecated';

export interface PlanFeature {
    id: string;
    code: string;
    name: string;
    category:
        | 'Tracking'
        | 'Safety'
        | 'Security'
        | 'Admin'
        | 'Workflow'
        | 'Analytics'
        | 'Enterprise'
        | 'Reporting'
        | 'Developer'
        | 'Miscellaneous';
    description: string;
    status: FeatureStatus;
    lastUpdated: string;
}

export const DUMMY_FEATURES: PlanFeature[] = [
    {
        id: 'FT-001',
        code: 'GPS_BLE_TRACK',
        name: 'GPS + BLE vehicle tracking',
        category: 'Tracking',
        description: 'Dual-mode tracking using satellite GPS and Bluetooth Low Energy.',
        status: 'Active',
        lastUpdated: 'Mar 12, 2026',
    },
    {
        id: 'FT-002',
        code: 'BEACON_PAIR',
        name: 'Traveller beacon pairing',
        category: 'Tracking',
        description: 'Dynamic pairing of passenger beacons with vehicle units.',
        status: 'Active',
        lastUpdated: 'Mar 12, 2026',
    },
    {
        id: 'FT-003',
        code: 'EMERGENCY_APP',
        name: 'Emergency alert (App)',
        category: 'Safety',
        description: 'Instant SOS triggers via the mobile application.',
        status: 'Active',
        lastUpdated: 'Mar 12, 2026',
    },
    {
        id: 'FT-004',
        code: 'GEO_FENCE_GRP',
        name: 'Geo-fencing (Zones)',
        category: 'Tracking',
        description: 'Automated alerts for arrival/departure at pickup or training zones.',
        status: 'Active',
        lastUpdated: 'Mar 12, 2026',
    },
    {
        id: 'FT-005',
        code: 'ADMIN_DASH',
        name: 'Admin dashboard',
        category: 'Admin',
        description: 'Centralized control panel for system configuration and onboarding.',
        status: 'Active',
        lastUpdated: 'Mar 12, 2026',
    },
    {
        id: 'FT-006',
        code: 'ONBOARDING',
        name: 'Driver & vehicle onboarding',
        category: 'Admin',
        description: 'Digital workflows for registering new fleet assets and staff.',
        status: 'Active',
        lastUpdated: 'Mar 12, 2026',
    },
    {
        id: 'FT-007',
        code: 'BOOKING_WF',
        name: 'Booking & assignment',
        category: 'Workflow',
        description: 'Streamlined workflow for trip requests and vehicle allocation.',
        status: 'Active',
        lastUpdated: 'Mar 12, 2026',
    },
    {
        id: 'FT-008',
        code: 'LIVE_TRACK_APP',
        name: 'Real-time tracking (App)',
        category: 'Tracking',
        description: 'Passenger view for live vehicle position and ETA.',
        status: 'Active',
        lastUpdated: 'Mar 12, 2026',
    },
    {
        id: 'FT-009',
        code: 'COMPLIANCE',
        name: 'Consent & compliance logs',
        category: 'Admin',
        description: 'Legal logging of user consents and system compliance checks.',
        status: 'Active',
        lastUpdated: 'Mar 12, 2026',
    },
    {
        id: 'FT-010',
        code: 'CUSTOM_GEO',
        name: 'Custom geo-fence zones',
        category: 'Tracking',
        description: 'Users can define their own virtual boundaries for alerts.',
        status: 'Active',
        lastUpdated: 'Mar 12, 2026',
    },
    {
        id: 'FT-011',
        code: 'ROUTE_DEV',
        name: 'Route deviation alerts',
        category: 'Safety',
        description: 'Real-time alerts if a vehicle leaves the planned path.',
        status: 'Active',
        lastUpdated: 'Mar 12, 2026',
    },
    {
        id: 'FT-012',
        code: 'PERMIT_EXP',
        name: 'Permit/license alerts',
        category: 'Admin',
        description: 'Proactive reminders for document renewals and expiries.',
        status: 'Active',
        lastUpdated: 'Mar 12, 2026',
    },
    {
        id: 'FT-013',
        code: 'AUDIT_LOGS',
        name: 'Exportable audit logs',
        category: 'Enterprise',
        description: 'Comprehensive history logs exportable in various formats.',
        status: 'Active',
        lastUpdated: 'Mar 12, 2026',
    },
    {
        id: 'FT-014',
        code: 'BATT_MON',
        name: 'Battery health (BLE)',
        category: 'Analytics',
        description: 'Monitoring of beacon and tracker battery levels.',
        status: 'Active',
        lastUpdated: 'Mar 12, 2026',
    },
    {
        id: 'FT-015',
        code: 'AI_ANOMALY',
        name: 'AI anomaly detection',
        category: 'Analytics',
        description: 'Smart detection of unusual driving patterns or system behavior.',
        status: 'Active',
        lastUpdated: 'Mar 12, 2026',
    },
    {
        id: 'FT-016',
        code: 'MULTI_ORG',
        name: 'Multi-org support',
        category: 'Enterprise',
        description: 'Manage multiple branches or sub-organisations from one account.',
        status: 'Active',
        lastUpdated: 'Mar 12, 2026',
    },
];

export type PlanType =
    | 'Workplace'
    | 'EduTrack'
    | 'DriveSecure'
    | 'Trial'
    | 'Commercial'
    | 'Enterprise';

export interface Plan {
    id: string;
    name: string;
    type: PlanType;
    monthlyPrice: number;
    yearlyPrice: number;
    vehiclesIncluded: string;
    beaconsIncluded: string;
    gpsIncluded: string;
    support: string;
    trialPeriod: number;
    status: 'Active' | 'Inactive';
    description: string;
    features: string[]; // IDs of PlanFeature
}

export const INITIAL_PLANS: Plan[] = [
    // Workplace
    {
        id: 'PLN-W-BASIC',
        name: 'Workplace Basic',
        type: 'Workplace',
        monthlyPrice: 99,
        yearlyPrice: 1000,
        vehiclesIncluded: 'Up to 3',
        beaconsIncluded: '25 free, ₹150/unit after',
        gpsIncluded: '1 free, ₹3,500/unit after',
        support: 'Email only',
        trialPeriod: 7,
        status: 'Active',
        description: 'Essential tracking for small offices.',
        features: [
            'FT-001',
            'FT-002',
            'FT-003',
            'FT-004',
            'FT-005',
            'FT-006',
            'FT-007',
            'FT-008',
            'FT-009',
            'FT-010',
        ],
    },
    {
        id: 'PLN-W-PREM',
        name: 'Workplace Premium',
        type: 'Workplace',
        monthlyPrice: 129,
        yearlyPrice: 1200,
        vehiclesIncluded: 'Up to 15',
        beaconsIncluded: '150 free, ₹120/unit after',
        gpsIncluded: '5 free, ₹3,000/unit after',
        support: 'Priority phone + email',
        trialPeriod: 14,
        status: 'Active',
        description: 'Full analytics for growing workplaces.',
        features: [
            'FT-001',
            'FT-002',
            'FT-003',
            'FT-004',
            'FT-005',
            'FT-006',
            'FT-007',
            'FT-008',
            'FT-009',
            'FT-010',
            'FT-011',
            'FT-012',
            'FT-013',
            'FT-014',
            'FT-015',
            'FT-016',
        ],
    },
    // EduTrack
    {
        id: 'PLN-E-BASIC',
        name: 'EduTrack Basic',
        type: 'EduTrack',
        monthlyPrice: 79,
        yearlyPrice: 800,
        vehiclesIncluded: 'Up to 5',
        beaconsIncluded: '50 free, ₹140/unit after',
        gpsIncluded: '2 free, ₹3,200/unit after',
        support: 'Email only',
        trialPeriod: 7,
        status: 'Active',
        description: 'Safe tracking for school fleets.',
        features: [
            'FT-001',
            'FT-002',
            'FT-003',
            'FT-004',
            'FT-005',
            'FT-006',
            'FT-007',
            'FT-008',
            'FT-009',
            'FT-010',
            'FT-012',
            'FT-013',
            'FT-014',
        ],
    },
    {
        id: 'PLN-E-PREM',
        name: 'EduTrack Premium',
        type: 'EduTrack',
        monthlyPrice: 99,
        yearlyPrice: 1000,
        vehiclesIncluded: 'Up to 20',
        beaconsIncluded: '250 free, ₹110/unit after',
        gpsIncluded: '10 free, ₹2,800/unit after',
        support: 'Priority phone + email',
        trialPeriod: 14,
        status: 'Active',
        description: 'Advanced safety for large institutions.',
        features: [
            'FT-001',
            'FT-002',
            'FT-003',
            'FT-004',
            'FT-005',
            'FT-006',
            'FT-007',
            'FT-008',
            'FT-009',
            'FT-010',
            'FT-011',
            'FT-012',
            'FT-013',
            'FT-014',
            'FT-016',
        ],
    },
    // DriveSecure
    {
        id: 'PLN-D-BASIC',
        name: 'DriveSecure Basic',
        type: 'DriveSecure',
        monthlyPrice: 149,
        yearlyPrice: 1500,
        vehiclesIncluded: 'Up to 2',
        beaconsIncluded: '15 free, ₹130/unit after',
        gpsIncluded: '1 free, ₹3,000/unit after',
        support: 'Email only',
        trialPeriod: 7,
        status: 'Active',
        description: 'Basic metrics for training schools.',
        features: [
            'FT-001',
            'FT-002',
            'FT-003',
            'FT-004',
            'FT-005',
            'FT-006',
            'FT-008',
            'FT-009',
            'FT-010',
            'FT-011',
            'FT-012',
            'FT-013',
            'FT-014',
            'FT-015',
        ],
    },
    {
        id: 'PLN-D-PREM',
        name: 'DriveSecure Premium',
        type: 'DriveSecure',
        monthlyPrice: 199,
        yearlyPrice: 2000,
        vehiclesIncluded: 'Up to 10',
        beaconsIncluded: '75 free, ₹100/unit after',
        gpsIncluded: '5 free, ₹2,500/unit after',
        support: 'Priority phone + email',
        trialPeriod: 14,
        status: 'Active',
        description: 'Professional analytics for driving academies.',
        features: [
            'FT-001',
            'FT-002',
            'FT-003',
            'FT-004',
            'FT-005',
            'FT-006',
            'FT-007',
            'FT-008',
            'FT-009',
            'FT-010',
            'FT-011',
            'FT-012',
            'FT-013',
            'FT-014',
            'FT-015',
        ],
    },
];
