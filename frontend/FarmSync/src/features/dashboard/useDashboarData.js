import {useCrops} from "../crops/useCrops";
import {
  getDashboardStats,
  getHarvestTimelineData,
  getCropsByStatusData,
} from "./dashboardData";

/**
 * useDashboardData
 * ----------------
 * Custom hook that prepares all data required for the Dashboard.
 *
 * Combines:
 * - data fetching (useCrops)
 * - data transformation (dashboardData helpers)
 *
 * Returns ready-to-use data for UI components.
 */
export function useDashboardData() {
  const {crops, isLoading} = useCrops();

  const stats = getDashboardStats(crops);
  const timelineData = getHarvestTimelineData(crops);
  const statusData = getCropsByStatusData(crops);

  return {
    isLoading,
    crops,
    stats,
    timelineData,
    statusData,
  };
}
