/* ── Shared session types & seed data ── */

export interface Session {
  id: string;
  sessionTitle: string;
  guidelineRefId: string;
  category: string;
  dateTime: string;
  durationMinutes: number;
  description: string;
  status: "Scheduled" | "In Progress" | "Completed" | "Cancelled";
  instructor: string;
  traineeCount: number;
  venue: string;
}

export const sessionStatusVariant = (
  s: Session["status"],
): "blue" | "amber" | "green" | "red" => {
  switch (s) {
    case "Scheduled":
      return "blue";
    case "In Progress":
      return "amber";
    case "Completed":
      return "green";
    case "Cancelled":
      return "red";
  }
};

export const categoryVariant = (
  c: string,
): "purple" | "blue" | "amber" | "green" | "orange" | "slate" => {
  switch (c) {
    case "Defensive Driving":
      return "purple";
    case "Refresher Course":
      return "blue";
    case "HCV Certification":
      return "amber";
    case "Road Safety":
      return "green";
    case "Eco-Driving":
      return "green";
    case "Compliance Training":
      return "orange";
    default:
      return "slate";
  }
};

export const INITIAL_SESSIONS: Session[] = [
  {
    id: "SES-1001",
    sessionTitle: "Safety Workshop 2024",
    guidelineRefId: "SEC-SAF-021-V2",
    category: "Road Safety",
    dateTime: "2024-11-12T09:00",
    durationMinutes: 120,
    description:
      "Comprehensive road safety protocols covering defensive driving, hazard detection, and emergency braking techniques for commercial vehicles.",
    status: "Scheduled",
    instructor: "Ramesh Iyer",
    traineeCount: 24,
    venue: "Training Hall A",
  },
  {
    id: "SES-1002",
    sessionTitle: "Route Navigation Masterclass",
    guidelineRefId: "OPS-NAV-405",
    category: "Route Navigation",
    dateTime: "2024-11-15T14:00",
    durationMinutes: 90,
    description:
      "Advanced GPS and manual navigation for long-haul routes. Includes real-time route optimization and fuel-efficient path planning.",
    status: "Scheduled",
    instructor: "Kavita Das",
    traineeCount: 18,
    venue: "Simulation Lab",
  },
  {
    id: "SES-1003",
    sessionTitle: "Eco-Driving Techniques",
    guidelineRefId: "ENV-DRV-008",
    category: "Eco-Driving",
    dateTime: "2024-12-02T10:00",
    durationMinutes: 75,
    description:
      "Fuel-efficient driving techniques that reduce emissions and operating costs. Covers smooth acceleration, optimal gear shifting, and load management.",
    status: "Scheduled",
    instructor: "Sunil Verma",
    traineeCount: 15,
    venue: "Training Hall B",
  },
  {
    id: "SES-1004",
    sessionTitle: "Annual Compliance Review",
    guidelineRefId: "RTO-2024-GS-001",
    category: "Compliance Training",
    dateTime: "2024-10-20T09:30",
    durationMinutes: 180,
    description:
      "Mandatory annual compliance covering RTO regulations, license renewal protocols, vehicle fitness certificate requirements, and pollution norms.",
    status: "Completed",
    instructor: "Dr. Anand Kulkarni",
    traineeCount: 42,
    venue: "Auditorium",
  },
  {
    id: "SES-1005",
    sessionTitle: "Defensive Driving — Level 2",
    guidelineRefId: "DD-LVL2-019",
    category: "Defensive Driving",
    dateTime: "2024-11-08T11:00",
    durationMinutes: 120,
    description:
      "Advanced defensive driving covering night driving, highway merging, and adverse weather conditions.",
    status: "Completed",
    instructor: "Ramesh Iyer",
    traineeCount: 20,
    venue: "Driving Track",
  },
  {
    id: "SES-1006",
    sessionTitle: "HCV Night Ops Certification",
    guidelineRefId: "HCV-NIGHT-112",
    category: "HCV Certification",
    dateTime: "2024-11-18T20:00",
    durationMinutes: 150,
    description:
      "Specialized certification for heavy commercial vehicle operators covering night driving protocols, fatigue management, and lighting systems.",
    status: "Scheduled",
    instructor: "Manoj Tiwari",
    traineeCount: 12,
    venue: "Night Track Facility",
  },
  {
    id: "SES-1007",
    sessionTitle: "Refresher — Urban Driving",
    guidelineRefId: "REF-URB-044",
    category: "Refresher Course",
    dateTime: "2024-10-28T13:00",
    durationMinutes: 60,
    description:
      "Quick refresher on city driving: navigating congested roads, pedestrian zones, school zones, and one-way systems.",
    status: "Completed",
    instructor: "Kavita Das",
    traineeCount: 30,
    venue: "Training Hall A",
  },
  {
    id: "SES-1008",
    sessionTitle: "Emergency Response Training",
    guidelineRefId: "ERT-CORE-007",
    category: "Emergency Response",
    dateTime: "2024-11-25T08:00",
    durationMinutes: 180,
    description:
      "Hands-on emergency response covering fire extinguisher use, first aid, vehicle evacuation drills, and accident reporting procedures.",
    status: "Scheduled",
    instructor: "Dr. Anand Kulkarni",
    traineeCount: 35,
    venue: "Safety Ground",
  },
  {
    id: "SES-1009",
    sessionTitle: "Passenger Safety Protocols",
    guidelineRefId: "PAX-SAF-033",
    category: "Road Safety",
    dateTime: "2024-10-15T10:00",
    durationMinutes: 90,
    description:
      "Training for bus and cab operators on passenger handling, wheelchair accessibility, and conflict de-escalation.",
    status: "Cancelled",
    instructor: "Sunil Verma",
    traineeCount: 0,
    venue: "Training Hall B",
  },
  {
    id: "SES-1010",
    sessionTitle: "Defensive Driving — Beginners",
    guidelineRefId: "DD-BEG-001",
    category: "Defensive Driving",
    dateTime: "2024-12-05T09:00",
    durationMinutes: 120,
    description:
      "Foundation course for new drivers covering basic defensive techniques, mirror usage, blind spot awareness, and safe following distance.",
    status: "Scheduled",
    instructor: "Ramesh Iyer",
    traineeCount: 28,
    venue: "Training Hall A",
  },
  {
    id: "SES-1011",
    sessionTitle: "HCV Load Management",
    guidelineRefId: "HCV-LOAD-088",
    category: "HCV Certification",
    dateTime: "2024-11-22T14:30",
    durationMinutes: 90,
    description:
      "Proper cargo securing, weight distribution, and overload prevention for heavy commercial vehicles. Includes practical demonstrations.",
    status: "In Progress",
    instructor: "Manoj Tiwari",
    traineeCount: 16,
    venue: "Loading Bay",
  },
  {
    id: "SES-1012",
    sessionTitle: "Compliance — Emissions Standards",
    guidelineRefId: "RTO-EMI-2024",
    category: "Compliance Training",
    dateTime: "2024-12-10T11:00",
    durationMinutes: 60,
    description:
      "Updated BS-VI emission standards, PUC certificate requirements, and fleet-level compliance monitoring.",
    status: "Scheduled",
    instructor: "Dr. Anand Kulkarni",
    traineeCount: 22,
    venue: "Auditorium",
  },
];
