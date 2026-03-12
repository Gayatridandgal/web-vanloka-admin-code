/* ── Vehicle types & seed data ── */

export interface Vehicle {
    id: string;
    vehicleNumber: string;
    model: string;
    manufacturer: string;
    vehicleType: string;
    year: string;
    fuelType: string;
    seatingCapacity: string;
    colour: string;
    kilometersDriven: string;
    ownershipType: string;
    ownerName: string;
    assignedDriver: string;
    status: "Active" | "Maintenance" | "Inactive";
    nextService: string;
    gpsDeviceId: string;
    permitType: string;
    permitNumber: string;
    insuranceProvider: string;
    insuranceExpiry: string;
    remarks: string;
}

export const vehicleStatusVariant = (
    s: Vehicle["status"],
): "green" | "amber" | "slate" => {
    switch (s) {
        case "Active":
            return "green";
        case "Maintenance":
            return "amber";
        case "Inactive":
            return "slate";
    }
};

export const vehicleTypeIcon = (
    t: string,
): { icon: string; bg: string; cl: string } => {
    switch (t) {
        case "Bus":
            return { icon: "directions_bus", bg: "#DBEAFE", cl: "#2563EB" };
        case "Van":
            return { icon: "airport_shuttle", bg: "#EDE9FE", cl: "#7C3AED" };
        case "Truck":
            return { icon: "local_shipping", bg: "#FEF3C7", cl: "#D97706" };
        case "Car":
            return { icon: "directions_car", bg: "#DCFCE7", cl: "#059669" };
        case "Two-Wheeler":
            return { icon: "two_wheeler", bg: "#FCE7F3", cl: "#DB2777" };
        default:
            return { icon: "directions_car", bg: "#F1F5F9", cl: "#64748B" };
    }
};

export const INITIAL_VEHICLES: Vehicle[] = [
    {
        id: "VH-2045",
        vehicleNumber: "KA-01-EF-4567",
        model: "Sprinter",
        manufacturer: "Mercedes-Benz",
        vehicleType: "Van",
        year: "2023",
        fuelType: "Diesel",
        seatingCapacity: "16",
        colour: "White",
        kilometersDriven: "12400",
        ownershipType: "Owned",
        ownerName: "MDS Fleet Services",
        assignedDriver: "Rajesh Kumar",
        status: "Active",
        nextService: "12 Oct 2024",
        gpsDeviceId: "GPS-40021",
        permitType: "Commercial",
        permitNumber: "PRM-2045-23",
        insuranceProvider: "New India Assurance",
        insuranceExpiry: "15 Mar 2025",
        remarks: "Luxury shuttle — premium clients only.",
    },
    {
        id: "VH-1102",
        vehicleNumber: "MH-12-GG-8890",
        model: "Traveller",
        manufacturer: "Force",
        vehicleType: "Van",
        year: "2022",
        fuelType: "Diesel",
        seatingCapacity: "26",
        colour: "Silver",
        kilometersDriven: "34800",
        ownershipType: "Owned",
        ownerName: "MDS Fleet Services",
        assignedDriver: "Sunil Sharma",
        status: "Maintenance",
        nextService: "In Shop",
        gpsDeviceId: "GPS-11023",
        permitType: "School",
        permitNumber: "PRM-1102-22",
        insuranceProvider: "ICICI Lombard",
        insuranceExpiry: "28 Nov 2024",
        remarks: "Engine overhaul scheduled.",
    },
    {
        id: "VH-9821",
        vehicleNumber: "DL-3C-AS-1234",
        model: "Commuter",
        manufacturer: "Toyota",
        vehicleType: "Bus",
        year: "2021",
        fuelType: "Diesel",
        seatingCapacity: "30",
        colour: "Blue",
        kilometersDriven: "56200",
        ownershipType: "Leased",
        ownerName: "ABC Leasing Co.",
        assignedDriver: "Amit Patel",
        status: "Active",
        nextService: "28 Sep 2024",
        gpsDeviceId: "GPS-98211",
        permitType: "Commercial",
        permitNumber: "PRM-9821-21",
        insuranceProvider: "Bajaj Allianz",
        insuranceExpiry: "10 Feb 2025",
        remarks: "",
    },
    {
        id: "VH-3340",
        vehicleNumber: "TN-09-CD-5678",
        model: "Eicher 20.15",
        manufacturer: "Eicher",
        vehicleType: "Bus",
        year: "2020",
        fuelType: "Diesel",
        seatingCapacity: "40",
        colour: "Yellow",
        kilometersDriven: "89000",
        ownershipType: "Owned",
        ownerName: "MDS Fleet Services",
        assignedDriver: "Murugan R.",
        status: "Active",
        nextService: "5 Nov 2024",
        gpsDeviceId: "GPS-33401",
        permitType: "School",
        permitNumber: "PRM-3340-20",
        insuranceProvider: "Oriental Insurance",
        insuranceExpiry: "20 Jul 2025",
        remarks: "",
    },
    {
        id: "VH-0756",
        vehicleNumber: "GJ-05-AB-9012",
        model: "Bolero Pickup",
        manufacturer: "Mahindra",
        vehicleType: "Truck",
        year: "2019",
        fuelType: "Diesel",
        seatingCapacity: "3",
        colour: "Grey",
        kilometersDriven: "102000",
        ownershipType: "Contract",
        ownerName: "Patel Transport Co.",
        assignedDriver: "Haresh Patel",
        status: "Inactive",
        nextService: "Overdue",
        gpsDeviceId: "GPS-07561",
        permitType: "Commercial",
        permitNumber: "PRM-0756-19",
        insuranceProvider: "United India",
        insuranceExpiry: "Expired",
        remarks: "Contract expired — pending renewal decision.",
    },
    {
        id: "VH-4401",
        vehicleNumber: "KA-12-MN-3456",
        model: "Nexon EV",
        manufacturer: "Tata",
        vehicleType: "Car",
        year: "2024",
        fuelType: "Electric",
        seatingCapacity: "5",
        colour: "Teal Blue",
        kilometersDriven: "3200",
        ownershipType: "Owned",
        ownerName: "MDS Fleet Services",
        assignedDriver: "Priya Nair",
        status: "Active",
        nextService: "1 Jan 2025",
        gpsDeviceId: "GPS-44012",
        permitType: "Other",
        permitNumber: "PRM-4401-24",
        insuranceProvider: "HDFC Ergo",
        insuranceExpiry: "30 Jun 2025",
        remarks: "Electric — admin pool vehicle.",
    },
    {
        id: "VH-5520",
        vehicleNumber: "MH-01-XY-7890",
        model: "Winger",
        manufacturer: "Tata",
        vehicleType: "Van",
        year: "2022",
        fuelType: "Diesel",
        seatingCapacity: "15",
        colour: "White",
        kilometersDriven: "41500",
        ownershipType: "Owned",
        ownerName: "MDS Fleet Services",
        assignedDriver: "Deepak Kumar",
        status: "Active",
        nextService: "18 Dec 2024",
        gpsDeviceId: "GPS-55201",
        permitType: "Factory",
        permitNumber: "PRM-5520-22",
        insuranceProvider: "Tata AIG",
        insuranceExpiry: "12 May 2025",
        remarks: "",
    },
    {
        id: "VH-6678",
        vehicleNumber: "RJ-14-PQ-2345",
        model: "Starbus",
        manufacturer: "Tata",
        vehicleType: "Bus",
        year: "2021",
        fuelType: "Diesel",
        seatingCapacity: "52",
        colour: "Red & White",
        kilometersDriven: "72000",
        ownershipType: "Leased",
        ownerName: "State Transport Corp",
        assignedDriver: "Bhim Singh",
        status: "Maintenance",
        nextService: "In Shop",
        gpsDeviceId: "GPS-66781",
        permitType: "Tourist",
        permitNumber: "PRM-6678-21",
        insuranceProvider: "National Insurance",
        insuranceExpiry: "8 Sep 2024",
        remarks: "Brake system replacement in progress.",
    },
    {
        id: "VH-7712",
        vehicleNumber: "AP-28-CD-6789",
        model: "Innova Crysta",
        manufacturer: "Toyota",
        vehicleType: "Car",
        year: "2023",
        fuelType: "Petrol",
        seatingCapacity: "7",
        colour: "Pearl White",
        kilometersDriven: "18900",
        ownershipType: "Owned",
        ownerName: "MDS Fleet Services",
        assignedDriver: "Kiran Reddy",
        status: "Active",
        nextService: "22 Nov 2024",
        gpsDeviceId: "GPS-77121",
        permitType: "Commercial",
        permitNumber: "PRM-7712-23",
        insuranceProvider: "SBI General",
        insuranceExpiry: "3 Jan 2026",
        remarks: "",
    },
    {
        id: "VH-8890",
        vehicleNumber: "UP-32-EF-1234",
        model: "Ertiga",
        manufacturer: "Maruti Suzuki",
        vehicleType: "Car",
        year: "2022",
        fuelType: "Hybrid",
        seatingCapacity: "7",
        colour: "Arctic White",
        kilometersDriven: "28700",
        ownershipType: "Owned",
        ownerName: "MDS Fleet Services",
        assignedDriver: "Ravi Tiwari",
        status: "Active",
        nextService: "14 Oct 2024",
        gpsDeviceId: "GPS-88901",
        permitType: "Other",
        permitNumber: "PRM-8890-22",
        insuranceProvider: "Cholamandalam",
        insuranceExpiry: "19 Apr 2025",
        remarks: "",
    },
];
