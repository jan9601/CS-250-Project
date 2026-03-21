/**
 * mockPrediction
 * --------------
 * Temporary prediction helpers used while the backend AI service
 * is not available yet.
 *
 * These functions simulate:
 * - predicted harvest date
 * - confidence score
 * - crop status
 *
 * The logic is intentionally simple and based on crop type +
 * planting date so the UI can behave as if predictions already exist.
 */

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function formatDate(date) {
  return date.toISOString().split("T")[0];
}

function addDays(dateString, daysToAdd) {
  const date = new Date(dateString);
  date.setDate(date.getDate() + daysToAdd);
  return formatDate(date);
}

function getHarvestWindow(cropName) {
  if (cropName === "Almonds") return {min: 170, max: 220};
  if (cropName === "Table grapes") return {min: 110, max: 150};

  return {min: 90, max: 130};
}

export function generatePredictedHarvestDate(cropName, plantingDate) {
  const {min, max} = getHarvestWindow(cropName);
  const estimatedDays = getRandomInt(min, max);

  return addDays(plantingDate, estimatedDays);
}

export function generateConfidenceScore() {
  const value = Math.random() * (0.92 - 0.55) + 0.55;
  return Number(value.toFixed(2));
}

export function generateCropStatus(predictedHarvestDate) {
  const today = new Date();
  const harvestDate = new Date(predictedHarvestDate);

  const diffInMs = harvestDate - today;
  const diffInDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInDays <= 0) return "AVAILABLE";
  if (diffInDays <= 14) return "HARVEST_SOON";
  return "FUTURE";
}
