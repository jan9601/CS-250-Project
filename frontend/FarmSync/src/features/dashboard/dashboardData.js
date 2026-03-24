/**
 * dashboardData
 * -------------
 * Helper functions used to transform crops data into
 * dashboard-friendly statistics and chart datasets.
 *
 * Important:
 * - These functions DO NOT fetch data.
 * - They only compute derived values from the crops array.
 * - Used exclusively by the Dashboard feature.
 */
import {formatStatus} from "../../utils/formatStatus";

/**
 * getDashboardStats
 * -----------------
 * Computes high-level statistics displayed in dashboard cards.
 *
 * Returns:
 * - totalCrops → total number of crops
 * - totalQuantity → sum of all crop quantities
 * - totalInventoryValue → estimated value (price * quantity)
 * - harvestSoonCount → number of crops marked as HARVEST_SOON
 */
export function getDashboardStats(crops) {
  const totalCrops = crops?.length;

  const totalQuantity = crops?.reduce((accumulator, currentCrop) => {
    return accumulator + +currentCrop?.quantity || 0;
  }, 0);

  const totalInventoryValue = crops?.reduce((accumulator, currentCrop) => {
    return (
      accumulator + (+currentCrop?.price || 0) * (+currentCrop?.quantity || 0)
    );
  }, 0);

  const harvestSoonCount = crops?.filter(
    (crop) => crop?.status === "HARVEST_SOON",
  ).length;

  const statsData = {
    totalCrops,
    totalQuantity,
    totalInventoryValue,
    harvestSoonCount,
  };

  return statsData;
}

/**
 * getHarvestTimelineData
 * ----------------------
 * Prepares data for the line chart showing predicted harvest over time.
 *
 * Groups crops by predictedHarvestDate and aggregates:
 * - total quantity
 * - total estimated value
 *
 * Output format:
 * [
 *   { date: "2026-04-10", quantity: 120, value: 4800 },
 *   ...
 * ]
 */
export function getHarvestTimelineData(crops) {
  if (!crops || crops.length === 0) return [];

  const groupedByDate = crops.reduce((acc, crop) => {
    const date = crop.predictedHarvestDate;

    if (!acc[date]) {
      acc[date] = {
        date,
        quantity: 0,
        value: 0,
      };
    }

    acc[date].quantity += Number(crop.quantity);
    acc[date].value += Number(crop.quantity) * Number(crop.price);

    return acc;
  }, {});

  return Object.values(groupedByDate).sort(
    (a, b) => new Date(a.date) - new Date(b.date),
  );
}

/**
 * getCropsByStatusData
 * --------------------
 * Prepares data for the pie chart showing crop distribution by status.
 *
 * Groups crops by status and converts them into chart-friendly format:
 * [
 *   { name: "Available", value: 2 },
 *   { name: "Harvest soon", value: 3 },
 *   ...
 * ]
 */
export function getCropsByStatusData(crops) {
  if (!crops || crops.length === 0) return [];

  const groupedByStatus = crops?.reduce((acc, crop) => {
    const formattedStatus = formatStatus(crop.status);

    if (!acc[formattedStatus]) acc[formattedStatus] = 0;
    acc[formattedStatus] += 1;

    return acc;
  }, {});

  return Object.entries(groupedByStatus).map(([name, value]) => ({
    name,
    value,
  }));
}

export function getUpcomingCrops(crops) {
  if (!crops || crops.length === 0) return [];

  const today = new Date();

  const soonestCrops = crops
    .slice()
    .filter((crop) => new Date(crop.predictedHarvestDate) >= today)
    .sort(
      (a, b) =>
        new Date(a.predictedHarvestDate) - new Date(b.predictedHarvestDate),
    )
    .slice(0, 4);

  return soonestCrops;
}
