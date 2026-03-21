export default function getStatusStyles(status) {
  if (status === "AVAILABLE") return "bg-green-100 text-green-800";
  if (status === "HARVEST_SOON") return "bg-yellow-100 text-yellow-800";
  if (status === "FUTURE") return "bg-blue-100 text-blue-800";
  return "bg-gray-100 text-gray-700";
}
