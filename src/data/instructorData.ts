/* ── Instructor types & seed data ── */

export interface Instructor {
    id: string;
    firstName: string;
    lastName: string;
    gender: string;
    email: string;
    mobile: string;
    certificationNumber: string;
    certExpiryDate: string;
    instructorType: string;
    assignedVehicle: string;
    vehicleReg: string;
    rating: number;
    sessions: number;
    status: "Active" | "In Session" | "Off-duty";
    drivingSchoolName: string;
    drivingExperience: string;
    languagesTaught: string[];
    trainingModules: string[];
    city: string;
    state: string;
    remarks: string;
}

export const instructorStatusVariant = (
    s: Instructor["status"],
): "green" | "blue" | "slate" => {
    switch (s) {
        case "Active":
            return "green";
        case "In Session":
            return "blue";
        case "Off-duty":
            return "slate";
    }
};

export const avatarColors = [
    { bg: "#EDE9FE", cl: "#7C3AED" },
    { bg: "#DBEAFE", cl: "#2563EB" },
    { bg: "#DCFCE7", cl: "#059669" },
    { bg: "#FEF3C7", cl: "#D97706" },
    { bg: "#FEE2E2", cl: "#DC2626" },
    { bg: "#E0F2FE", cl: "#0284C7" },
    { bg: "#FCE7F3", cl: "#DB2777" },
    { bg: "#F3E8FF", cl: "#9333EA" },
];

export const getAvatarColor = (idx: number) =>
    avatarColors[idx % avatarColors.length];

export const getInitials = (first: string, last: string) =>
    `${first.charAt(0)}${last.charAt(0)}`.toUpperCase();

export const INITIAL_INSTRUCTORS: Instructor[] = [
    {
        id: "INS-7712-X",
        firstName: "Marcus",
        lastName: "Richardson",
        gender: "Male",
        email: "marcus.r@driveschool.com",
        mobile: "+91 98765 11001",
        certificationNumber: "CRT-112233445",
        certExpiryDate: "Jan 2028",
        instructorType: "Instructor",
        assignedVehicle: "Scania K410",
        vehicleReg: "BUS-0010",
        rating: 4,
        sessions: 54,
        status: "Active",
        drivingSchoolName: "MDS Driving Academy",
        drivingExperience: "12 years",
        languagesTaught: ["English", "Hindi"],
        trainingModules: ["Road Safety", "Highway Driving", "Emergency Handling"],
        city: "Bangalore",
        state: "Karnataka",
        remarks: "Specializes in heavy vehicle training.",
    },
    {
        id: "INS-9082-1",
        firstName: "Elena",
        lastName: "Rodriguez",
        gender: "Female",
        email: "elena.r@driveschool.com",
        mobile: "+91 98765 11002",
        certificationNumber: "CRT-734551203",
        certExpiryDate: "Dec 2026",
        instructorType: "Instructor",
        assignedVehicle: "Volvo XC90",
        vehicleReg: "ABC-1234",
        rating: 5,
        sessions: 120,
        status: "In Session",
        drivingSchoolName: "MDS Driving Academy",
        drivingExperience: "15 years",
        languagesTaught: ["English", "Hindi", "Tamil"],
        trainingModules: ["Road Safety", "Traffic Rules", "Vehicle Control", "First Aid"],
        city: "Chennai",
        state: "Tamil Nadu",
        remarks: "Top-rated instructor. Handles advanced courses.",
    },
    {
        id: "INS-4421-5",
        firstName: "James",
        lastName: "Wilson",
        gender: "Male",
        email: "james.w@driveschool.com",
        mobile: "+91 98765 11003",
        certificationNumber: "CRT-890023155",
        certExpiryDate: "May 2025",
        instructorType: "Instructor",
        assignedVehicle: "Mercedes Sprinter",
        vehicleReg: "VAN-9922",
        rating: 5,
        sessions: 245,
        status: "Off-duty",
        drivingSchoolName: "SafeDrive Institute",
        drivingExperience: "20 years",
        languagesTaught: ["English"],
        trainingModules: ["Road Safety", "Traffic Rules", "Highway Driving"],
        city: "Delhi",
        state: "Delhi",
        remarks: "On scheduled leave until next month.",
    },
    {
        id: "INS-3310-7",
        firstName: "Priya",
        lastName: "Sharma",
        gender: "Female",
        email: "priya.s@driveschool.com",
        mobile: "+91 98765 11004",
        certificationNumber: "CRT-445566778",
        certExpiryDate: "Sep 2027",
        instructorType: "Instructor",
        assignedVehicle: "Maruti Suzuki Ertiga",
        vehicleReg: "LMV-5501",
        rating: 4,
        sessions: 32,
        status: "Active",
        drivingSchoolName: "MDS Driving Academy",
        drivingExperience: "5 years",
        languagesTaught: ["Hindi", "Kannada"],
        trainingModules: ["Road Safety", "Traffic Rules", "Vehicle Control"],
        city: "Bangalore",
        state: "Karnataka",
        remarks: "",
    },
    {
        id: "INS-5590-2",
        firstName: "Arjun",
        lastName: "Nair",
        gender: "Male",
        email: "arjun.n@driveschool.com",
        mobile: "+91 98765 11005",
        certificationNumber: "CRT-223344556",
        certExpiryDate: "Mar 2026",
        instructorType: "Instructor",
        assignedVehicle: "Tata Winger",
        vehicleReg: "VAN-7781",
        rating: 3,
        sessions: 88,
        status: "Active",
        drivingSchoolName: "SafeDrive Institute",
        drivingExperience: "10 years",
        languagesTaught: ["English", "Hindi", "Marathi"],
        trainingModules: ["Road Safety", "Emergency Handling"],
        city: "Pune",
        state: "Maharashtra",
        remarks: "",
    },
    {
        id: "INS-6643-8",
        firstName: "Kavitha",
        lastName: "Reddy",
        gender: "Female",
        email: "kavitha.r@driveschool.com",
        mobile: "+91 98765 11006",
        certificationNumber: "CRT-556677889",
        certExpiryDate: "Jul 2027",
        instructorType: "Instructor",
        assignedVehicle: "Toyota Innova",
        vehicleReg: "CAR-3345",
        rating: 5,
        sessions: 156,
        status: "In Session",
        drivingSchoolName: "MDS Driving Academy",
        drivingExperience: "14 years",
        languagesTaught: ["Telugu", "English", "Hindi"],
        trainingModules: ["Road Safety", "Traffic Rules", "Vehicle Control", "Highway Driving", "First Aid"],
        city: "Hyderabad",
        state: "Telangana",
        remarks: "Lead trainer for women's batch.",
    },
    {
        id: "INS-7780-4",
        firstName: "Raj",
        lastName: "Patel",
        gender: "Male",
        email: "raj.p@driveschool.com",
        mobile: "+91 98765 11007",
        certificationNumber: "CRT-667788990",
        certExpiryDate: "Nov 2025",
        instructorType: "Instructor",
        assignedVehicle: "Honda City",
        vehicleReg: "LMV-2201",
        rating: 4,
        sessions: 45,
        status: "Active",
        drivingSchoolName: "DriveRight Academy",
        drivingExperience: "6 years",
        languagesTaught: ["Hindi", "Gujarati"],
        trainingModules: ["Road Safety", "Traffic Rules"],
        city: "Ahmedabad",
        state: "Gujarat",
        remarks: "",
    },
    {
        id: "INS-8892-3",
        firstName: "Sneha",
        lastName: "Joshi",
        gender: "Female",
        email: "sneha.j@driveschool.com",
        mobile: "+91 98765 11008",
        certificationNumber: "CRT-778899001",
        certExpiryDate: "Feb 2028",
        instructorType: "Instructor",
        assignedVehicle: "Force Traveller",
        vehicleReg: "BUS-4456",
        rating: 4,
        sessions: 98,
        status: "Off-duty",
        drivingSchoolName: "MDS Driving Academy",
        drivingExperience: "11 years",
        languagesTaught: ["English", "Hindi", "Bengali"],
        trainingModules: ["Road Safety", "Traffic Rules", "Emergency Handling", "First Aid"],
        city: "Kolkata",
        state: "West Bengal",
        remarks: "Maternity leave — returning Jan 2024.",
    },
    {
        id: "INS-9901-6",
        firstName: "Vikram",
        lastName: "Singh",
        gender: "Male",
        email: "vikram.s@driveschool.com",
        mobile: "+91 98765 11009",
        certificationNumber: "CRT-889900112",
        certExpiryDate: "Aug 2026",
        instructorType: "Instructor",
        assignedVehicle: "Eicher 20.15",
        vehicleReg: "BUS-8890",
        rating: 5,
        sessions: 210,
        status: "Active",
        drivingSchoolName: "SafeDrive Institute",
        drivingExperience: "18 years",
        languagesTaught: ["Hindi", "English"],
        trainingModules: ["Road Safety", "Highway Driving", "Emergency Handling", "Vehicle Control"],
        city: "Jaipur",
        state: "Rajasthan",
        remarks: "",
    },
    {
        id: "INS-1023-9",
        firstName: "Deepa",
        lastName: "Menon",
        gender: "Female",
        email: "deepa.m@driveschool.com",
        mobile: "+91 98765 11010",
        certificationNumber: "CRT-990011223",
        certExpiryDate: "Jun 2027",
        instructorType: "Instructor",
        assignedVehicle: "Maruti Swift",
        vehicleReg: "LMV-1120",
        rating: 3,
        sessions: 22,
        status: "Active",
        drivingSchoolName: "DriveRight Academy",
        drivingExperience: "3 years",
        languagesTaught: ["English", "Hindi", "Malayalam"],
        trainingModules: ["Road Safety", "Traffic Rules"],
        city: "Kochi",
        state: "Kerala",
        remarks: "New instructor — under mentorship.",
    },
];
