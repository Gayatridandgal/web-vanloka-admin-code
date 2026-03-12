/* ── Shared compliance types & seed data ── */

export interface ComplianceRecord {
  id: string; // Document Reg. No.
  documentName: string;
  subLaw: string;
  category:
    | "License"
    | "Insurance"
    | "Safety"
    | "Environmental"
    | "Tax & Finance"
    | "Labour"
    | "Vehicle Certification"
    | "Other";
  authority: string;
  authorityContact: string;
  issueDate: string;
  expiryDate: string;
  renewalReminderDays: string;
  status: "Compliant" | "Non-Compliant" | "Expiring" | "Pending Review";
  appliesTo: string[];
  remarks: string;
  consent: boolean;
  consentTimestamp: string;
}

export const complianceStatusVariant = (
  s: ComplianceRecord["status"],
): "green" | "red" | "orange" | "blue" => {
  switch (s) {
    case "Compliant":
      return "green";
    case "Non-Compliant":
      return "red";
    case "Expiring":
      return "orange";
    case "Pending Review":
      return "blue";
    default:
      return "blue";
  }
};

export const categoryVariant = (
  c: string,
): "purple" | "blue" | "red" | "green" | "amber" | "slate" => {
  switch (c) {
    case "License":
      return "purple";
    case "Insurance":
      return "blue";
    case "Safety":
      return "red";
    case "Environmental":
      return "green";
    case "Tax & Finance":
      return "amber";
    case "Labour":
      return "slate";
    case "Vehicle Certification":
      return "blue";
    default:
      return "slate";
  }
};

export const INITIAL_COMPLIANCE: ComplianceRecord[] = [
  {
    id: "RTO-2021-001",
    documentName: "Driving School License",
    subLaw: "State Motor Vehicles Act",
    category: "License",
    authority: "RTO Karnataka",
    authorityContact: "rto-ka@gov.in",
    issueDate: "2021-12-01",
    expiryDate: "2026-12-01",
    renewalReminderDays: "90",
    status: "Compliant",
    appliesTo: ["Premises / Infrastructure"],
    remarks: "Main license for operating the school.",
    consent: true,
    consentTimestamp: "2021-12-01T10:00:00Z",
  },
  {
    id: "INS-POL-024",
    documentName: "Fleet Insurance Policy",
    subLaw: "Motor Vehicles Act 1988",
    category: "Insurance",
    authority: "IRDAI",
    authorityContact: "support@insurance.com",
    issueDate: "2023-04-15",
    expiryDate: "2024-04-15",
    renewalReminderDays: "30",
    status: "Expiring",
    appliesTo: ["All Vehicles"],
    remarks: "Comprehensive commercial insurance.",
    consent: true,
    consentTimestamp: "2023-04-15T11:30:00Z",
  },
  {
    id: "FIRE-2023-009",
    documentName: "Fire Safety Certificate",
    subLaw: "Fire Services Act",
    category: "Safety",
    authority: "Fire Department",
    authorityContact: "firedept@city.gov",
    issueDate: "2022-01-10",
    expiryDate: "2023-01-10",
    renewalReminderDays: "30",
    status: "Non-Compliant",
    appliesTo: ["Premises / Infrastructure"],
    remarks: "Overdue for renewal, pending inspection.",
    consent: true,
    consentTimestamp: "2022-01-10T09:15:00Z",
  },
  {
    id: "ENV-2023-055",
    documentName: "Pollution Under Control (PUC)",
    subLaw: "Environmental Protection Act",
    category: "Environmental",
    authority: "State Transport Authority",
    authorityContact: "sta@example.com",
    issueDate: "2023-08-20",
    expiryDate: "2024-02-20",
    renewalReminderDays: "14",
    status: "Compliant",
    appliesTo: ["All Vehicles"],
    remarks: "Validated for standard fleet.",
    consent: true,
    consentTimestamp: "2023-08-20T14:20:00Z",
  },
  {
    id: "TAX-GST-881",
    documentName: "GST Registration",
    subLaw: "GST Act 2017",
    category: "Tax & Finance",
    authority: "Municipal Corporation",
    authorityContact: "taxdept@city.gov",
    issueDate: "2019-07-01",
    expiryDate: "2099-12-31",
    renewalReminderDays: "30",
    status: "Compliant",
    appliesTo: ["Management"],
    remarks: "Permanent registration.",
    consent: true,
    consentTimestamp: "2019-07-01T08:00:00Z",
  },
  {
    id: "LAB-2023-112",
    documentName: "Labour Law Registration",
    subLaw: "Shops and Establishments Act",
    category: "Labour",
    authority: "Labour Department",
    authorityContact: "labour@state.gov",
    issueDate: "2023-01-15",
    expiryDate: "2024-01-15",
    renewalReminderDays: "60",
    status: "Expiring",
    appliesTo: ["All Instructors", "All Staff"],
    remarks: "Needs renewal next month.",
    consent: true,
    consentTimestamp: "2023-01-15T10:45:00Z",
  },
  {
    id: "FIT-2023-999",
    documentName: "Vehicle Fitness Certificate",
    subLaw: "Motor Vehicles Act 1988",
    category: "Vehicle Certification",
    authority: "RTO Karnataka",
    authorityContact: "rto-ka@gov.in",
    issueDate: "2023-11-05",
    expiryDate: "2025-11-05",
    renewalReminderDays: "60",
    status: "Pending Review",
    appliesTo: ["All Vehicles"],
    remarks: "Recently submitted, waiting for final approval.",
    consent: true,
    consentTimestamp: "2023-11-05T16:00:00Z",
  },
];
