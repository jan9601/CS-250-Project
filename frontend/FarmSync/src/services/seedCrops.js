/**
 * Seed Crops (Mock Data)
 * -----------------------
 * Temporary dataset used to simulate database behavior.
 * Should be removed once real backend integration is completed.
 */

export const cropsData = [
  {
    id: 1,
    name: "Almonds",
    plantingDate: "2025-12-28",
    predictedHarvestDate: "2026-05-30",
    confidenceScore: 0.58,
    price: 4,
    quantity: 120,
    status: "FUTURE",
  },
  {
    id: 2,
    name: "Table grapes",
    plantingDate: "2025-11-27",
    predictedHarvestDate: "2026-03-26",
    confidenceScore: 0.72,
    price: 5,
    quantity: 80,
    status: "HARVEST_SOON",
  },
  {
    id: 3,
    name: "Table grapes",
    plantingDate: "2025-11-02",
    predictedHarvestDate: "2026-03-20",
    confidenceScore: 0.86,
    price: 3,
    quantity: 150,
    status: "AVAILABLE",
  },
];
