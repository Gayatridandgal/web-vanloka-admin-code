/* ── Shared vendor types & seed data ── */

export interface Vendor {
  id: string;
  vendorName: string;
  vendorType: "Individual" | "Company" | "Trust" | "Cooperative";
  contactPersonName: string;
  contactMobile: string;
  contactEmail: string;
  emergencyContactName: string;
  emergencyContactNumber: string;
  address1: string;
  address2: string;
  locality: string;
  city: string;
  district: string;
  state: string;
  pinCode: string;
  gstNumber: string;
  panNumber: string;
  serviceType: string;
  contractStartDate: string;
  contractEndDate: string;
  status: "Active" | "Inactive" | "Expiring Soon" | "Pending";
  vehicleCount: number;
  rating: number; // 1-5
}

export const vendorStatusVariant = (
  s: Vendor["status"],
): "green" | "red" | "orange" | "amber" => {
  switch (s) {
    case "Active":
      return "green";
    case "Inactive":
      return "red";
    case "Expiring Soon":
      return "orange";
    case "Pending":
      return "amber";
  }
};

export const serviceTypeVariant = (
  s: string,
): "blue" | "amber" | "green" | "purple" | "orange" | "slate" => {
  switch (s) {
    case "Fuel Supply":
      return "blue";
    case "Maintenance":
      return "amber";
    case "Insurance":
      return "green";
    case "Fleet Management":
      return "purple";
    case "Tyre & Spares":
      return "orange";
    default:
      return "slate";
  }
};

export const getVendorInitials = (name: string): string =>
  name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

export const vendorAvatarColor = (
  idx: number,
): { bg: string; color: string } => {
  const palette = [
    { bg: "#EDE9FE", color: "#7C3AED" },
    { bg: "#DBEAFE", color: "#2563EB" },
    { bg: "#DCFCE7", color: "#059669" },
    { bg: "#FEF3C7", color: "#D97706" },
    { bg: "#FEE2E2", color: "#DC2626" },
    { bg: "#E0E7FF", color: "#4F46E5" },
    { bg: "#CCFBF1", color: "#0D9488" },
    { bg: "#FFEDD5", color: "#EA580C" },
  ];
  return palette[idx % palette.length];
};

export const INITIAL_VENDORS: Vendor[] = [
  {
    id: "VND-4492",
    vendorName: "Apex Fuel Solutions",
    vendorType: "Company",
    contactPersonName: "Robert Johnson",
    contactMobile: "+91 98765 43210",
    contactEmail: "robert.j@apexfuel.com",
    emergencyContactName: "Lisa Moore",
    emergencyContactNumber: "+91 98765 43211",
    address1: "Plot 45, Industrial Area Phase II",
    address2: "Near KSRTC Depot",
    locality: "Peenya",
    city: "Bengaluru",
    district: "Bengaluru Urban",
    state: "Karnataka",
    pinCode: "560058",
    gstNumber: "29AABCA0000A1Z5",
    panNumber: "AABCA0000A",
    serviceType: "Fuel Supply",
    contractStartDate: "2024-01-15",
    contractEndDate: "2025-12-15",
    status: "Active",
    vehicleCount: 12,
    rating: 5,
  },
  {
    id: "VND-1203",
    vendorName: "Premier Garage Services",
    vendorType: "Company",
    contactPersonName: "Sarah Miller",
    contactMobile: "+91 87654 32109",
    contactEmail: "sarah.m@premiergar.com",
    emergencyContactName: "James Patel",
    emergencyContactNumber: "+91 87654 32110",
    address1: "42B, Rajkumar Road",
    address2: "",
    locality: "Rajajinagar",
    city: "Bengaluru",
    district: "Bengaluru Urban",
    state: "Karnataka",
    pinCode: "560010",
    gstNumber: "29BPREM1234B2Z8",
    panNumber: "BPREM1234B",
    serviceType: "Maintenance",
    contractStartDate: "2024-03-01",
    contractEndDate: "2024-10-02",
    status: "Expiring Soon",
    vehicleCount: 0,
    rating: 4,
  },
  {
    id: "VND-3301",
    vendorName: "SafeGuard Insurance Pvt Ltd",
    vendorType: "Company",
    contactPersonName: "Ananya Rao",
    contactMobile: "+91 99887 76655",
    contactEmail: "ananya.r@safeguard.in",
    emergencyContactName: "Vikram Singh",
    emergencyContactNumber: "+91 99887 76656",
    address1: "12th Floor, Brigade Gateway",
    address2: "Orion Mall Complex",
    locality: "Malleswaram",
    city: "Bengaluru",
    district: "Bengaluru Urban",
    state: "Karnataka",
    pinCode: "560055",
    gstNumber: "29CSAFE5678C3Q1",
    panNumber: "CSAFE5678C",
    serviceType: "Insurance",
    contractStartDate: "2024-06-01",
    contractEndDate: "2025-06-01",
    status: "Active",
    vehicleCount: 0,
    rating: 4,
  },
  {
    id: "VND-2210",
    vendorName: "Rajesh Kumar Transport",
    vendorType: "Individual",
    contactPersonName: "Rajesh Kumar",
    contactMobile: "+91 77665 54433",
    contactEmail: "rajesh.kumar@gmail.com",
    emergencyContactName: "Priya Kumar",
    emergencyContactNumber: "+91 77665 54434",
    address1: "No. 8, 3rd Cross, JP Nagar",
    address2: "",
    locality: "JP Nagar Phase 3",
    city: "Bengaluru",
    district: "Bengaluru Urban",
    state: "Karnataka",
    pinCode: "560078",
    gstNumber: "29DRAJE9012D4Y7",
    panNumber: "DRAJE9012D",
    serviceType: "Fleet Management",
    contractStartDate: "2024-02-01",
    contractEndDate: "2025-02-01",
    status: "Active",
    vehicleCount: 8,
    rating: 3,
  },
  {
    id: "VND-5578",
    vendorName: "TyrePro India Llp",
    vendorType: "Company",
    contactPersonName: "Deepak Sharma",
    contactMobile: "+91 88776 65544",
    contactEmail: "deepak@tyreproindia.com",
    emergencyContactName: "Anil Gupta",
    emergencyContactNumber: "+91 88776 65545",
    address1: "Sector 12, Industrial Belt",
    address2: "Behind Petrol Pump",
    locality: "Bommanahalli",
    city: "Bengaluru",
    district: "Bengaluru Urban",
    state: "Karnataka",
    pinCode: "560068",
    gstNumber: "29ETYRE3456E5T3",
    panNumber: "ETYRE3456E",
    serviceType: "Tyre & Spares",
    contractStartDate: "2024-04-15",
    contractEndDate: "2025-04-15",
    status: "Active",
    vehicleCount: 0,
    rating: 5,
  },
  {
    id: "VND-6691",
    vendorName: "NovaDrive Fleet Solutions",
    vendorType: "Company",
    contactPersonName: "Priya Mehta",
    contactMobile: "+91 99110 22334",
    contactEmail: "priya.m@novadrive.in",
    emergencyContactName: "Rakesh Sinha",
    emergencyContactNumber: "+91 99110 22335",
    address1: "123, MG Road",
    address2: "Suite 400",
    locality: "MG Road",
    city: "Bengaluru",
    district: "Bengaluru Urban",
    state: "Karnataka",
    pinCode: "560001",
    gstNumber: "29FNOVA7890F6R2",
    panNumber: "FNOVA7890F",
    serviceType: "Fleet Management",
    contractStartDate: "2024-07-01",
    contractEndDate: "2025-07-01",
    status: "Active",
    vehicleCount: 22,
    rating: 4,
  },
  {
    id: "VND-7742",
    vendorName: "GreenFuel Bio Energy",
    vendorType: "Trust",
    contactPersonName: "Dr. Karthik Naidu",
    contactMobile: "+91 88990 11223",
    contactEmail: "karthik@greenfuel.org",
    emergencyContactName: "Sunita Reddy",
    emergencyContactNumber: "+91 88990 11224",
    address1: "Plot 78, KIADB",
    address2: "Renewable Energy Park",
    locality: "Electronic City",
    city: "Bengaluru",
    district: "Bengaluru Urban",
    state: "Karnataka",
    pinCode: "560100",
    gstNumber: "29GFUEL1234G7M5",
    panNumber: "GFUEL1234G",
    serviceType: "Fuel Supply",
    contractStartDate: "2024-09-01",
    contractEndDate: "2025-09-01",
    status: "Pending",
    vehicleCount: 0,
    rating: 0,
  },
  {
    id: "VND-8813",
    vendorName: "Metro Maintenance Hub",
    vendorType: "Cooperative",
    contactPersonName: "Suresh Babu",
    contactMobile: "+91 77880 99001",
    contactEmail: "suresh@metrohub.co.in",
    emergencyContactName: "Lakshmi Devi",
    emergencyContactNumber: "+91 77880 99002",
    address1: "45, Service Road",
    address2: "Opp. Bus Terminus",
    locality: "Majestic",
    city: "Bengaluru",
    district: "Bengaluru Urban",
    state: "Karnataka",
    pinCode: "560009",
    gstNumber: "29HMETR5678H8K9",
    panNumber: "HMETR5678H",
    serviceType: "Maintenance",
    contractStartDate: "2023-12-01",
    contractEndDate: "2024-12-01",
    status: "Expiring Soon",
    vehicleCount: 0,
    rating: 3,
  },
  {
    id: "VND-9904",
    vendorName: "QuickFix Auto Spares",
    vendorType: "Individual",
    contactPersonName: "Mohammed Sharif",
    contactMobile: "+91 99001 22445",
    contactEmail: "sharif@quickfixauto.com",
    emergencyContactName: "Nasreen Banu",
    emergencyContactNumber: "+91 99001 22446",
    address1: "Shop 6, Suddaguntepalya",
    address2: "",
    locality: "HSR Layout",
    city: "Bengaluru",
    district: "Bengaluru Urban",
    state: "Karnataka",
    pinCode: "560102",
    gstNumber: "29IQUIC9012I9J6",
    panNumber: "IQUIC9012I",
    serviceType: "Tyre & Spares",
    contractStartDate: "2024-05-01",
    contractEndDate: "2025-05-01",
    status: "Active",
    vehicleCount: 0,
    rating: 4,
  },
  {
    id: "VND-1105",
    vendorName: "ShieldCover General Insurance",
    vendorType: "Company",
    contactPersonName: "Harish Menon",
    contactMobile: "+91 88112 33445",
    contactEmail: "harish@shieldcover.in",
    emergencyContactName: "Divya Nair",
    emergencyContactNumber: "+91 88112 33446",
    address1: "Level 5, Embassy Tech Village",
    address2: "",
    locality: "Devarabisanahalli",
    city: "Bengaluru",
    district: "Bengaluru Urban",
    state: "Karnataka",
    pinCode: "560103",
    gstNumber: "29JSHIE3456J0L3",
    panNumber: "JSHIE3456J",
    serviceType: "Insurance",
    contractStartDate: "2024-01-01",
    contractEndDate: "2024-06-30",
    status: "Inactive",
    vehicleCount: 0,
    rating: 2,
  },
  {
    id: "VND-1206",
    vendorName: "TransLogix Pvt Ltd",
    vendorType: "Company",
    contactPersonName: "Vikram Chauhan",
    contactMobile: "+91 77223 44556",
    contactEmail: "vikram@translogix.in",
    emergencyContactName: "Neeta Chauhan",
    emergencyContactNumber: "+91 77223 44557",
    address1: "Tower B, Salarpuria Sattva",
    address2: "Outer Ring Road",
    locality: "Marathahalli",
    city: "Bengaluru",
    district: "Bengaluru Urban",
    state: "Karnataka",
    pinCode: "560037",
    gstNumber: "29KTRAN7890K1N8",
    panNumber: "KTRAN7890K",
    serviceType: "Fleet Management",
    contractStartDate: "2024-08-01",
    contractEndDate: "2025-08-01",
    status: "Active",
    vehicleCount: 35,
    rating: 5,
  },
  {
    id: "VND-1307",
    vendorName: "EcoWash Vehicle Care",
    vendorType: "Company",
    contactPersonName: "Nandini Hegde",
    contactMobile: "+91 66554 33221",
    contactEmail: "nandini@ecowash.co.in",
    emergencyContactName: "Ravi Hegde",
    emergencyContactNumber: "+91 66554 33222",
    address1: "14, 1st Main Road",
    address2: "",
    locality: "Indiranagar",
    city: "Bengaluru",
    district: "Bengaluru Urban",
    state: "Karnataka",
    pinCode: "560038",
    gstNumber: "29LECOW1234L2P5",
    panNumber: "LECOW1234L",
    serviceType: "Maintenance",
    contractStartDate: "2024-10-01",
    contractEndDate: "2025-10-01",
    status: "Active",
    vehicleCount: 0,
    rating: 4,
  },
];
