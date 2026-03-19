export function formatStatus(status) {
  if (status === "HARVEST_SOON") return "Harvest soon";
  if (status === "AVAILABLE") return "Available";
  if (status === "FUTURE") return "Future";
  return status;
}
