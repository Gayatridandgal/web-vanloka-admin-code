export interface PerformanceRecord {
  id: string; // Vehicle ID
  type: "Heavy Truck" | "Delivery Van" | "Commercial Sedan" | "Other";
  distance: number; // in km
  fuelCost: number; // in $
  revenue: number; // in $
  idleTime: number; // in hrs
  score: "Excellent" | "High Efficiency" | "Moderate" | "Low Utilization";
  dateRange: string;
}

export const scoreVariant = (
  score: PerformanceRecord["score"],
): "green" | "amber" | "red" => {
  if (score === "Excellent" || score === "High Efficiency") return "green";
  if (score === "Moderate") return "amber";
  return "red";
};

export const INITIAL_REPORT_DATA: PerformanceRecord[] = [
  {
    id: "TR-8821",
    type: "Heavy Truck",
    distance: 2450,
    fuelCost: 612.5,
    revenue: 2100.0,
    idleTime: 4.2,
    score: "High Efficiency",
    dateRange: "Oct 2023",
  },
  {
    id: "VN-4122",
    type: "Delivery Van",
    distance: 1890,
    fuelCost: 425.2,
    revenue: 1550.0,
    idleTime: 12.5,
    score: "Moderate",
    dateRange: "Oct 2023",
  },
  {
    id: "TR-9901",
    type: "Heavy Truck",
    distance: 3120,
    fuelCost: 780.0,
    revenue: 2840.0,
    idleTime: 2.1,
    score: "Excellent",
    dateRange: "Oct 2023",
  },
  {
    id: "VN-2234",
    type: "Delivery Van",
    distance: 840,
    fuelCost: 210.0,
    revenue: 540.0,
    idleTime: 32.8,
    score: "Low Utilization",
    dateRange: "Oct 2023",
  },
  {
    id: "SD-1190",
    type: "Commercial Sedan",
    distance: 3200,
    fuelCost: 320.0,
    revenue: 2500.0,
    idleTime: 8.5,
    score: "Excellent",
    dateRange: "Oct 2023",
  },
  {
    id: "TR-6644",
    type: "Heavy Truck",
    distance: 1200,
    fuelCost: 350.0,
    revenue: 900.0,
    idleTime: 20.0,
    score: "Low Utilization",
    dateRange: "Oct 2023",
  },
  {
    id: "VN-8877",
    type: "Delivery Van",
    distance: 2100,
    fuelCost: 480.0,
    revenue: 1900.0,
    idleTime: 6.0,
    score: "High Efficiency",
    dateRange: "Oct 2023",
  },
  {
    id: "SD-4455",
    type: "Commercial Sedan",
    distance: 1800,
    fuelCost: 210.0,
    revenue: 1400.0,
    idleTime: 11.2,
    score: "Moderate",
    dateRange: "Oct 2023",
  },
  {
    id: "TR-1122",
    type: "Heavy Truck",
    distance: 3500,
    fuelCost: 900.0,
    revenue: 3200.0,
    idleTime: 3.5,
    score: "Excellent",
    dateRange: "Oct 2023",
  },
  {
    id: "SD-9988",
    type: "Commercial Sedan",
    distance: 900,
    fuelCost: 110.0,
    revenue: 450.0,
    idleTime: 25.0,
    score: "Low Utilization",
    dateRange: "Oct 2023",
  },
  {
    id: "VN-3344",
    type: "Delivery Van",
    distance: 2800,
    fuelCost: 550.0,
    revenue: 2400.0,
    idleTime: 5.0,
    score: "Excellent",
    dateRange: "Oct 2023",
  },
  {
    id: "OT-5555",
    type: "Other",
    distance: 1500,
    fuelCost: 300.0,
    revenue: 1100.0,
    idleTime: 15.0,
    score: "Moderate",
    dateRange: "Oct 2023",
  },
];
