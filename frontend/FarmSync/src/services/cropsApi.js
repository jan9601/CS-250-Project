/*
  Initializes the crops dataset in localStorage
  if no crops are stored yet.
  This allows the app to simulate a database
  using the seed data during development.
* */

import {
  generateConfidenceScore,
  generateCropStatus,
  generatePredictedHarvestDate,
} from "../utils/mockPrediction";
import {cropsData} from "./seedCrops";
import {getData, setData} from "./storage";
const CROPS_KEY = "farmsync_fakeCrops";

export function initCrops() {
  try {
    const data = getData(CROPS_KEY);
    if (!data) setData(CROPS_KEY, cropsData);
  } catch (error) {
    console.error(error);
    throw new Error("Could not init crops data");
  }
}

export function getCrops() {
  initCrops();
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        const data = getData(CROPS_KEY);
        resolve(data);
      } catch (error) {
        console.error(error);
        reject(new Error("Could not get Crops"));
      }
    }, 300);
  });
}

export function deleteCrop(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        const crops = getData(CROPS_KEY);
        const newCrops = crops.filter((crop) => crop.id !== id);
        setData(CROPS_KEY, newCrops);
        resolve();
      } catch (error) {
        console.error(error);
        reject(new Error("Crop could not be deleted"));
      }
    }, 300);
  });
}

/*
  While the backend prediction service is not available,
  crop prediction fields are generated locally in the mock API.

  These derived fields are recalculated on both create and edit
  so the UI always stays in sync with the latest crop form data.
*/

export function createCrop(crop) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        const oldCrops = getData(CROPS_KEY) || [];

        const predictedHarvestDate = generatePredictedHarvestDate(
          crop.name,
          crop.plantingDate,
        );

        const confidenceScore = generateConfidenceScore();
        const status = generateCropStatus(predictedHarvestDate);

        const newCrop = {
          ...crop,
          id: Date.now(),
          predictedHarvestDate,
          confidenceScore,
          status,
        };
        const fullNewCropsData = [...oldCrops, newCrop];
        setData(CROPS_KEY, fullNewCropsData);
        resolve(newCrop);
      } catch (error) {
        console.error(error);
        reject(new Error("Crop could not be added"));
      }
    }, 500);
  });
}

export function updateExistingCrop(updatedCrop, id) {
  const crops = getData(CROPS_KEY) || [];

  const newCrops = crops.map((crop) => {
    if (crop.id !== id) return crop;

    const predictedHarvestDate = generatePredictedHarvestDate(
      updatedCrop.name,
      updatedCrop.plantingDate,
      updatedCrop.location,
    );

    const confidenceScore = generateConfidenceScore();
    const status = generateCropStatus(predictedHarvestDate);

    return {
      ...crop,
      ...updatedCrop,
      predictedHarvestDate,
      confidenceScore,
      status,
    };
  });

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        setData(CROPS_KEY, newCrops);
        resolve(newCrops);
      } catch (error) {
        console.error(error);
        reject(new Error("Crop could not be updated"));
      }
    }, 300);
  });
}
