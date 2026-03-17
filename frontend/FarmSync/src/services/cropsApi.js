/*
  Initializes the crops dataset in localStorage
  if no crops are stored yet.
  This allows the app to simulate a database
  using the seed data during development.
* */

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

export function createCrop(crop) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        const oldCrops = getData(CROPS_KEY) || [];
        const newCrop = {
          ...crop,
          id: Date.now(),
          predictedHarvestDate: "2026-04-10",
          confidenceScore: 0.82,
          status: "FUTURE",
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

  const newCrops = crops.map((crop) =>
    crop.id === id ? {...crop, ...updatedCrop} : crop,
  );

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        setData(CROPS_KEY, newCrops);
        resolve(newCrops);
      } catch (error) {
        console.error(error);
        reject(new Error("Crop could not be added"));
      }
    }, 300);
  });
}
